-- Flex fitness core tables: Int PKs -> prefixed String IDs

CREATE OR REPLACE FUNCTION flex_generate_prefixed_id(prefix TEXT, seed TEXT DEFAULT '')
RETURNS TEXT AS $$
DECLARE
  base TEXT;
BEGIN
  base := md5(random()::text || clock_timestamp()::text || seed);
  RETURN lower(prefix) || '_' ||
    upper(substr(base, 1, 4)) || '-' ||
    upper(substr(base, 5, 4)) || '-' ||
    upper(substr(base, 9, 4)) || '-' ||
    upper(substr(base, 13, 4));
END;
$$ LANGUAGE plpgsql VOLATILE;

-- exercises
ALTER TABLE "exercises" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "exercises" SET "id_str" = flex_generate_prefixed_id('exr', "id"::text);

CREATE TABLE "_flex_id_map_exercises" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);

INSERT INTO "_flex_id_map_exercises" ("old_id", "new_id")
SELECT "id", "id_str" FROM "exercises";

ALTER TABLE "planned_exercises" DROP CONSTRAINT "planned_exercises_exercise_id_fkey";
ALTER TABLE "excluded_exercises" DROP CONSTRAINT "excluded_exercises_exercise_id_fkey";

ALTER TABLE "planned_exercises" ADD COLUMN "exercise_id_str" VARCHAR(64);
UPDATE "planned_exercises" pe
SET "exercise_id_str" = m."new_id"
FROM "_flex_id_map_exercises" m
WHERE pe."exercise_id" = m."old_id";

ALTER TABLE "excluded_exercises" ADD COLUMN "exercise_id_str" VARCHAR(64);
UPDATE "excluded_exercises" ee
SET "exercise_id_str" = m."new_id"
FROM "_flex_id_map_exercises" m
WHERE ee."exercise_id" = m."old_id";

ALTER TABLE "session_sets" ADD COLUMN "exercise_id_str" VARCHAR(64);
UPDATE "session_sets" ss
SET "exercise_id_str" = m."new_id"
FROM "_flex_id_map_exercises" m
WHERE ss."exercise_id" = m."old_id";

ALTER TABLE "plan_change_log" ADD COLUMN "exercise_id_str" VARCHAR(64);
UPDATE "plan_change_log" pcl
SET "exercise_id_str" = m."new_id"
FROM "_flex_id_map_exercises" m
WHERE pcl."exercise_id" = m."old_id";

ALTER TABLE "exercises" DROP CONSTRAINT "exercises_pkey";
ALTER TABLE "exercises" DROP COLUMN "id";
ALTER TABLE "exercises" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_pkey" PRIMARY KEY ("id");

ALTER TABLE "planned_exercises" DROP COLUMN "exercise_id";
ALTER TABLE "planned_exercises" RENAME COLUMN "exercise_id_str" TO "exercise_id";
ALTER TABLE "planned_exercises" ALTER COLUMN "exercise_id" SET NOT NULL;

ALTER TABLE "excluded_exercises" DROP COLUMN "exercise_id";
ALTER TABLE "excluded_exercises" RENAME COLUMN "exercise_id_str" TO "exercise_id";

ALTER TABLE "session_sets" DROP COLUMN "exercise_id";
ALTER TABLE "session_sets" RENAME COLUMN "exercise_id_str" TO "exercise_id";
ALTER TABLE "session_sets" ALTER COLUMN "exercise_id" SET NOT NULL;

ALTER TABLE "plan_change_log" DROP COLUMN "exercise_id";
ALTER TABLE "plan_change_log" RENAME COLUMN "exercise_id_str" TO "exercise_id";

ALTER TABLE "planned_exercises"
ADD CONSTRAINT "planned_exercises_exercise_id_fkey"
FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "excluded_exercises"
ADD CONSTRAINT "excluded_exercises_exercise_id_fkey"
FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- training_plans
ALTER TABLE "training_plans" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "training_plans" SET "id_str" = flex_generate_prefixed_id('trn_pln', "id"::text);

CREATE TABLE "_flex_id_map_training_plans" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);

INSERT INTO "_flex_id_map_training_plans" ("old_id", "new_id")
SELECT "id", "id_str" FROM "training_plans";

ALTER TABLE "plan_phases" DROP CONSTRAINT "plan_phases_training_plan_id_fkey";
ALTER TABLE "planned_workouts" DROP CONSTRAINT "planned_workouts_training_plan_id_fkey";
ALTER TABLE "plan_change_log" DROP CONSTRAINT "plan_change_log_training_plan_id_fkey";
ALTER TABLE "workout_sessions" DROP CONSTRAINT "workout_sessions_training_plan_id_fkey";

ALTER TABLE "plan_phases" ADD COLUMN "training_plan_id_str" VARCHAR(64);
UPDATE "plan_phases" pp
SET "training_plan_id_str" = m."new_id"
FROM "_flex_id_map_training_plans" m
WHERE pp."training_plan_id" = m."old_id";

ALTER TABLE "planned_workouts" ADD COLUMN "training_plan_id_str" VARCHAR(64);
UPDATE "planned_workouts" pw
SET "training_plan_id_str" = m."new_id"
FROM "_flex_id_map_training_plans" m
WHERE pw."training_plan_id" = m."old_id";

ALTER TABLE "plan_change_log" ADD COLUMN "training_plan_id_str" VARCHAR(64);
UPDATE "plan_change_log" pcl
SET "training_plan_id_str" = m."new_id"
FROM "_flex_id_map_training_plans" m
WHERE pcl."training_plan_id" = m."old_id";

ALTER TABLE "workout_sessions" ADD COLUMN "training_plan_id_str" VARCHAR(64);
UPDATE "workout_sessions" ws
SET "training_plan_id_str" = m."new_id"
FROM "_flex_id_map_training_plans" m
WHERE ws."training_plan_id" = m."old_id";

UPDATE "training_plans" tp
SET "plan_json" = jsonb_set(
  tp."plan_json",
  '{workouts}',
  COALESCE(
    (
      SELECT jsonb_agg(
        jsonb_set(
          workout,
          '{exercises}',
          COALESCE(
            (
              SELECT jsonb_agg(
                CASE
                  WHEN m."new_id" IS NOT NULL THEN jsonb_set(exercise, '{exerciseId}', to_jsonb(m."new_id"))
                  ELSE exercise
                END
              )
              FROM jsonb_array_elements(workout->'exercises') AS exercise
              LEFT JOIN "_flex_id_map_exercises" m ON m."old_id" = (exercise->>'exerciseId')::integer
            ),
            '[]'::jsonb
          )
        )
      )
      FROM jsonb_array_elements(tp."plan_json"->'workouts') AS workout
    ),
    tp."plan_json"->'workouts'
  )
);

ALTER TABLE "training_plans" DROP CONSTRAINT "training_plans_pkey";
ALTER TABLE "training_plans" DROP COLUMN "id";
ALTER TABLE "training_plans" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "training_plans" ADD CONSTRAINT "training_plans_pkey" PRIMARY KEY ("id");

ALTER TABLE "plan_phases" DROP COLUMN "training_plan_id";
ALTER TABLE "plan_phases" RENAME COLUMN "training_plan_id_str" TO "training_plan_id";
ALTER TABLE "plan_phases" ALTER COLUMN "training_plan_id" SET NOT NULL;

ALTER TABLE "planned_workouts" DROP COLUMN "training_plan_id";
ALTER TABLE "planned_workouts" RENAME COLUMN "training_plan_id_str" TO "training_plan_id";
ALTER TABLE "planned_workouts" ALTER COLUMN "training_plan_id" SET NOT NULL;

ALTER TABLE "plan_change_log" DROP COLUMN "training_plan_id";
ALTER TABLE "plan_change_log" RENAME COLUMN "training_plan_id_str" TO "training_plan_id";
ALTER TABLE "plan_change_log" ALTER COLUMN "training_plan_id" SET NOT NULL;

ALTER TABLE "workout_sessions" DROP COLUMN "training_plan_id";
ALTER TABLE "workout_sessions" RENAME COLUMN "training_plan_id_str" TO "training_plan_id";
ALTER TABLE "workout_sessions" ALTER COLUMN "training_plan_id" SET NOT NULL;

ALTER TABLE "plan_phases"
ADD CONSTRAINT "plan_phases_training_plan_id_fkey"
FOREIGN KEY ("training_plan_id") REFERENCES "training_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "planned_workouts"
ADD CONSTRAINT "planned_workouts_training_plan_id_fkey"
FOREIGN KEY ("training_plan_id") REFERENCES "training_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "plan_change_log"
ADD CONSTRAINT "plan_change_log_training_plan_id_fkey"
FOREIGN KEY ("training_plan_id") REFERENCES "training_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "workout_sessions"
ADD CONSTRAINT "workout_sessions_training_plan_id_fkey"
FOREIGN KEY ("training_plan_id") REFERENCES "training_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- plan_phases
ALTER TABLE "plan_phases" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "plan_phases" SET "id_str" = flex_generate_prefixed_id('pln_phs', "id"::text);

CREATE TABLE "_flex_id_map_plan_phases" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);

INSERT INTO "_flex_id_map_plan_phases" ("old_id", "new_id")
SELECT "id", "id_str" FROM "plan_phases";

ALTER TABLE "plan_weeks" DROP CONSTRAINT "plan_weeks_plan_phase_id_fkey";

ALTER TABLE "plan_weeks" ADD COLUMN "plan_phase_id_str" VARCHAR(64);
UPDATE "plan_weeks" pw
SET "plan_phase_id_str" = m."new_id"
FROM "_flex_id_map_plan_phases" m
WHERE pw."plan_phase_id" = m."old_id";

ALTER TABLE "plan_phases" DROP CONSTRAINT "plan_phases_pkey";
ALTER TABLE "plan_phases" DROP COLUMN "id";
ALTER TABLE "plan_phases" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "plan_phases" ADD CONSTRAINT "plan_phases_pkey" PRIMARY KEY ("id");

ALTER TABLE "plan_weeks" DROP COLUMN "plan_phase_id";
ALTER TABLE "plan_weeks" RENAME COLUMN "plan_phase_id_str" TO "plan_phase_id";
ALTER TABLE "plan_weeks" ALTER COLUMN "plan_phase_id" SET NOT NULL;

-- plan_weeks
ALTER TABLE "plan_weeks" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "plan_weeks" SET "id_str" = flex_generate_prefixed_id('pln_wk', "id"::text);

CREATE TABLE "_flex_id_map_plan_weeks" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);

INSERT INTO "_flex_id_map_plan_weeks" ("old_id", "new_id")
SELECT "id", "id_str" FROM "plan_weeks";

ALTER TABLE "planned_workouts" DROP CONSTRAINT "planned_workouts_plan_week_id_fkey";

ALTER TABLE "planned_workouts" ADD COLUMN "plan_week_id_str" VARCHAR(64);
UPDATE "planned_workouts" pw
SET "plan_week_id_str" = m."new_id"
FROM "_flex_id_map_plan_weeks" m
WHERE pw."plan_week_id" = m."old_id";

ALTER TABLE "plan_weeks" DROP CONSTRAINT "plan_weeks_pkey";
ALTER TABLE "plan_weeks" DROP COLUMN "id";
ALTER TABLE "plan_weeks" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "plan_weeks" ADD CONSTRAINT "plan_weeks_pkey" PRIMARY KEY ("id");

ALTER TABLE "plan_weeks"
ADD CONSTRAINT "plan_weeks_plan_phase_id_fkey"
FOREIGN KEY ("plan_phase_id") REFERENCES "plan_phases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "planned_workouts" DROP COLUMN "plan_week_id";
ALTER TABLE "planned_workouts" RENAME COLUMN "plan_week_id_str" TO "plan_week_id";

ALTER TABLE "planned_workouts"
ADD CONSTRAINT "planned_workouts_plan_week_id_fkey"
FOREIGN KEY ("plan_week_id") REFERENCES "plan_weeks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- planned_workouts
ALTER TABLE "planned_workouts" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "planned_workouts" SET "id_str" = flex_generate_prefixed_id('pln_wkt', "id"::text);

CREATE TABLE "_flex_id_map_planned_workouts" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);

INSERT INTO "_flex_id_map_planned_workouts" ("old_id", "new_id")
SELECT "id", "id_str" FROM "planned_workouts";

ALTER TABLE "workout_sections" DROP CONSTRAINT "workout_sections_planned_workout_id_fkey";
ALTER TABLE "planned_exercises" DROP CONSTRAINT "planned_exercises_planned_workout_id_fkey";

ALTER TABLE "workout_sections" ADD COLUMN "planned_workout_id_str" VARCHAR(64);
UPDATE "workout_sections" ws
SET "planned_workout_id_str" = m."new_id"
FROM "_flex_id_map_planned_workouts" m
WHERE ws."planned_workout_id" = m."old_id";

ALTER TABLE "planned_exercises" ADD COLUMN "planned_workout_id_str" VARCHAR(64);
UPDATE "planned_exercises" pe
SET "planned_workout_id_str" = m."new_id"
FROM "_flex_id_map_planned_workouts" m
WHERE pe."planned_workout_id" = m."old_id";

ALTER TABLE "planned_workouts" DROP CONSTRAINT "planned_workouts_pkey";
ALTER TABLE "planned_workouts" DROP COLUMN "id";
ALTER TABLE "planned_workouts" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "planned_workouts" ADD CONSTRAINT "planned_workouts_pkey" PRIMARY KEY ("id");

ALTER TABLE "workout_sections" DROP COLUMN "planned_workout_id";
ALTER TABLE "workout_sections" RENAME COLUMN "planned_workout_id_str" TO "planned_workout_id";
ALTER TABLE "workout_sections" ALTER COLUMN "planned_workout_id" SET NOT NULL;

ALTER TABLE "planned_exercises" DROP COLUMN "planned_workout_id";
ALTER TABLE "planned_exercises" RENAME COLUMN "planned_workout_id_str" TO "planned_workout_id";
ALTER TABLE "planned_exercises" ALTER COLUMN "planned_workout_id" SET NOT NULL;

-- workout_sections
ALTER TABLE "workout_sections" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "workout_sections" SET "id_str" = flex_generate_prefixed_id('wkt_sec', "id"::text);

CREATE TABLE "_flex_id_map_workout_sections" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);

INSERT INTO "_flex_id_map_workout_sections" ("old_id", "new_id")
SELECT "id", "id_str" FROM "workout_sections";

ALTER TABLE "planned_exercises" DROP CONSTRAINT "planned_exercises_workout_section_id_fkey";

ALTER TABLE "planned_exercises" ADD COLUMN "workout_section_id_str" VARCHAR(64);
UPDATE "planned_exercises" pe
SET "workout_section_id_str" = m."new_id"
FROM "_flex_id_map_workout_sections" m
WHERE pe."workout_section_id" = m."old_id";

ALTER TABLE "workout_sections" DROP CONSTRAINT "workout_sections_pkey";
ALTER TABLE "workout_sections" DROP COLUMN "id";
ALTER TABLE "workout_sections" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "workout_sections" ADD CONSTRAINT "workout_sections_pkey" PRIMARY KEY ("id");

ALTER TABLE "workout_sections"
ADD CONSTRAINT "workout_sections_planned_workout_id_fkey"
FOREIGN KEY ("planned_workout_id") REFERENCES "planned_workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "planned_exercises" DROP COLUMN "workout_section_id";
ALTER TABLE "planned_exercises" RENAME COLUMN "workout_section_id_str" TO "workout_section_id";

ALTER TABLE "planned_exercises"
ADD CONSTRAINT "planned_exercises_workout_section_id_fkey"
FOREIGN KEY ("workout_section_id") REFERENCES "workout_sections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- planned_exercises
ALTER TABLE "planned_exercises" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "planned_exercises" SET "id_str" = flex_generate_prefixed_id('pln_exr', "id"::text);

ALTER TABLE "planned_exercises" DROP CONSTRAINT "planned_exercises_pkey";
ALTER TABLE "planned_exercises" DROP COLUMN "id";
ALTER TABLE "planned_exercises" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "planned_exercises" ADD CONSTRAINT "planned_exercises_pkey" PRIMARY KEY ("id");

ALTER TABLE "planned_exercises"
ADD CONSTRAINT "planned_exercises_planned_workout_id_fkey"
FOREIGN KEY ("planned_workout_id") REFERENCES "planned_workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- plan_change_log
ALTER TABLE "plan_change_log" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "plan_change_log" SET "id_str" = flex_generate_prefixed_id('pln_chg', "id"::text);

ALTER TABLE "plan_change_log" DROP CONSTRAINT "plan_change_log_pkey";
ALTER TABLE "plan_change_log" DROP COLUMN "id";
ALTER TABLE "plan_change_log" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "plan_change_log" ADD CONSTRAINT "plan_change_log_pkey" PRIMARY KEY ("id");

-- workout_sessions
ALTER TABLE "workout_sessions" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "workout_sessions" SET "id_str" = flex_generate_prefixed_id('wkt_ses', "id"::text);

CREATE TABLE "_flex_id_map_workout_sessions" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);

INSERT INTO "_flex_id_map_workout_sessions" ("old_id", "new_id")
SELECT "id", "id_str" FROM "workout_sessions";

ALTER TABLE "session_sets" DROP CONSTRAINT "session_sets_workout_session_id_fkey";

ALTER TABLE "session_sets" ADD COLUMN "workout_session_id_str" VARCHAR(64);
UPDATE "session_sets" ss
SET "workout_session_id_str" = m."new_id"
FROM "_flex_id_map_workout_sessions" m
WHERE ss."workout_session_id" = m."old_id";

UPDATE "workout_sessions" ws
SET "session_json" = jsonb_set(
  ws."session_json",
  '{exercises}',
  COALESCE(
    (
      SELECT jsonb_agg(
        jsonb_set(
          exercise,
          '{exerciseId}',
          to_jsonb(m."new_id")
        )
      )
      FROM jsonb_array_elements(ws."session_json"->'exercises') AS exercise
      JOIN "_flex_id_map_exercises" m ON m."old_id" = (exercise->>'exerciseId')::integer
    ),
    ws."session_json"->'exercises'
  )
);

ALTER TABLE "workout_sessions" DROP CONSTRAINT "workout_sessions_pkey";
ALTER TABLE "workout_sessions" DROP COLUMN "id";
ALTER TABLE "workout_sessions" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_pkey" PRIMARY KEY ("id");

ALTER TABLE "session_sets" DROP COLUMN "workout_session_id";
ALTER TABLE "session_sets" RENAME COLUMN "workout_session_id_str" TO "workout_session_id";
ALTER TABLE "session_sets" ALTER COLUMN "workout_session_id" SET NOT NULL;

-- session_sets
ALTER TABLE "session_sets" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "session_sets" SET "id_str" = flex_generate_prefixed_id('ses_set', "id"::text);

ALTER TABLE "session_sets" DROP CONSTRAINT "session_sets_pkey";
ALTER TABLE "session_sets" DROP COLUMN "id";
ALTER TABLE "session_sets" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "session_sets" ADD CONSTRAINT "session_sets_pkey" PRIMARY KEY ("id");

ALTER TABLE "session_sets"
ADD CONSTRAINT "session_sets_workout_session_id_fkey"
FOREIGN KEY ("workout_session_id") REFERENCES "workout_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

DROP TABLE "_flex_id_map_exercises";
DROP TABLE "_flex_id_map_training_plans";
DROP TABLE "_flex_id_map_plan_phases";
DROP TABLE "_flex_id_map_plan_weeks";
DROP TABLE "_flex_id_map_planned_workouts";
DROP TABLE "_flex_id_map_workout_sections";
DROP TABLE "_flex_id_map_workout_sessions";
DROP FUNCTION flex_generate_prefixed_id(TEXT, TEXT);

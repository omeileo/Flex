-- Flex fitness models

CREATE TABLE "fitness_profiles" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "goal" VARCHAR(255) NOT NULL,
    "experience_level" VARCHAR(50) NOT NULL,
    "days_per_week" INTEGER NOT NULL,
    "session_minutes" INTEGER NOT NULL,
    "equipment" JSONB NOT NULL DEFAULT '[]',
    "injuries" JSONB NOT NULL DEFAULT '[]',
    "preferences" JSONB,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "fitness_profiles_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "fitness_profiles_user_id_key" ON "fitness_profiles"("user_id");

CREATE TABLE "exercises" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "muscle_groups" JSONB NOT NULL DEFAULT '[]',
    "equipment" JSONB NOT NULL DEFAULT '[]',
    "video_url" VARCHAR(500),
    "contraindications" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "exercises_name_key" ON "exercises"("name");

CREATE TABLE "training_plans" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "fitness_profile_id" INTEGER NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "week_number" INTEGER NOT NULL DEFAULT 1,
    "plan_json" JSONB NOT NULL,
    "generation_changelog" JSONB,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "training_plans_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "index_training_plans_user_id" ON "training_plans"("user_id");

CREATE TABLE "plan_phases" (
    "id" SERIAL NOT NULL,
    "training_plan_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "week_start" INTEGER NOT NULL,
    "week_end" INTEGER NOT NULL,
    "goals" JSONB NOT NULL DEFAULT '[]',
    "rpe_range" VARCHAR(50),
    "rest_defaults" JSONB,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plan_phases_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "index_plan_phases_training_plan_id" ON "plan_phases"("training_plan_id");

CREATE TABLE "plan_weeks" (
    "id" SERIAL NOT NULL,
    "plan_phase_id" INTEGER NOT NULL,
    "week_number" INTEGER NOT NULL,

    CONSTRAINT "plan_weeks_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "index_plan_weeks_plan_phase_id" ON "plan_weeks"("plan_phase_id");

CREATE TABLE "planned_workouts" (
    "id" SERIAL NOT NULL,
    "training_plan_id" INTEGER NOT NULL,
    "plan_week_id" INTEGER,
    "day_index" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "warmup_notes" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "planned_workouts_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "index_planned_workouts_training_plan_id" ON "planned_workouts"("training_plan_id");

CREATE TABLE "workout_sections" (
    "id" SERIAL NOT NULL,
    "planned_workout_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "order_index" INTEGER NOT NULL,

    CONSTRAINT "workout_sections_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "index_workout_sections_planned_workout_id" ON "workout_sections"("planned_workout_id");

CREATE TABLE "planned_exercises" (
    "id" SERIAL NOT NULL,
    "planned_workout_id" INTEGER NOT NULL,
    "workout_section_id" INTEGER,
    "exercise_id" INTEGER NOT NULL,
    "order_index" INTEGER NOT NULL,
    "sets_json" JSONB NOT NULL,
    "rest_seconds" INTEGER NOT NULL DEFAULT 90,
    "notes" TEXT,
    "progression_template" JSONB,

    CONSTRAINT "planned_exercises_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "index_planned_exercises_planned_workout_id" ON "planned_exercises"("planned_workout_id");

CREATE TABLE "plan_change_log" (
    "id" SERIAL NOT NULL,
    "training_plan_id" INTEGER NOT NULL,
    "exercise_id" INTEGER,
    "field" VARCHAR(50) NOT NULL,
    "previous_value" VARCHAR(255),
    "next_value" VARCHAR(255),
    "reason" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plan_change_log_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "index_plan_change_log_training_plan_id" ON "plan_change_log"("training_plan_id");

CREATE TABLE "workout_sessions" (
    "id" SERIAL NOT NULL,
    "training_plan_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "workout_day_index" INTEGER NOT NULL,
    "started_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(6),
    "session_json" JSONB NOT NULL,

    CONSTRAINT "workout_sessions_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "index_workout_sessions_training_plan_id" ON "workout_sessions"("training_plan_id");

CREATE TABLE "session_sets" (
    "id" SERIAL NOT NULL,
    "workout_session_id" INTEGER NOT NULL,
    "exercise_id" INTEGER NOT NULL,
    "set_number" INTEGER NOT NULL,
    "reps_completed" INTEGER,
    "weight_kg" DOUBLE PRECISION,
    "rpe" DOUBLE PRECISION,
    "completed" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "session_sets_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "index_session_sets_workout_session_id" ON "session_sets"("workout_session_id");

ALTER TABLE "fitness_profiles" ADD CONSTRAINT "fitness_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "training_plans" ADD CONSTRAINT "training_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "training_plans" ADD CONSTRAINT "training_plans_fitness_profile_id_fkey" FOREIGN KEY ("fitness_profile_id") REFERENCES "fitness_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "plan_phases" ADD CONSTRAINT "plan_phases_training_plan_id_fkey" FOREIGN KEY ("training_plan_id") REFERENCES "training_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "plan_weeks" ADD CONSTRAINT "plan_weeks_plan_phase_id_fkey" FOREIGN KEY ("plan_phase_id") REFERENCES "plan_phases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "planned_workouts" ADD CONSTRAINT "planned_workouts_training_plan_id_fkey" FOREIGN KEY ("training_plan_id") REFERENCES "training_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "planned_workouts" ADD CONSTRAINT "planned_workouts_plan_week_id_fkey" FOREIGN KEY ("plan_week_id") REFERENCES "plan_weeks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "workout_sections" ADD CONSTRAINT "workout_sections_planned_workout_id_fkey" FOREIGN KEY ("planned_workout_id") REFERENCES "planned_workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "planned_exercises" ADD CONSTRAINT "planned_exercises_planned_workout_id_fkey" FOREIGN KEY ("planned_workout_id") REFERENCES "planned_workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "planned_exercises" ADD CONSTRAINT "planned_exercises_workout_section_id_fkey" FOREIGN KEY ("workout_section_id") REFERENCES "workout_sections"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "planned_exercises" ADD CONSTRAINT "planned_exercises_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "plan_change_log" ADD CONSTRAINT "plan_change_log_training_plan_id_fkey" FOREIGN KEY ("training_plan_id") REFERENCES "training_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_training_plan_id_fkey" FOREIGN KEY ("training_plan_id") REFERENCES "training_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "session_sets" ADD CONSTRAINT "session_sets_workout_session_id_fkey" FOREIGN KEY ("workout_session_id") REFERENCES "workout_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

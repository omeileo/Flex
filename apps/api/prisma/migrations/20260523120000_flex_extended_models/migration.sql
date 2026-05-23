-- Flex extended wellness, cycle, location, and settings models

ALTER TABLE "fitness_profiles"
ADD COLUMN "sex_at_birth" VARCHAR(30),
ADD COLUMN "age_band" VARCHAR(20),
ADD COLUMN "diet_preferences" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN "calorie_target" INTEGER;

CREATE TABLE "user_app_settings" (
    "id" VARCHAR(64) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "theme_mode" VARCHAR(20) NOT NULL DEFAULT 'light',
    "active_workout_location_id" VARCHAR(64),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "user_app_settings_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "user_app_settings_user_id_key" ON "user_app_settings"("user_id");
CREATE INDEX "index_user_app_settings_user_id" ON "user_app_settings"("user_id");

CREATE TABLE "workout_locations" (
    "id" VARCHAR(64) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "preset_type" VARCHAR(50) NOT NULL,
    "notes" TEXT,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "bodyweight_only" BOOLEAN NOT NULL DEFAULT false,
    "equipment" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "workout_locations_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "index_workout_locations_user_id" ON "workout_locations"("user_id");

CREATE TABLE "wellness_conditions" (
    "id" VARCHAR(64) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "body_area" VARCHAR(50) NOT NULL,
    "label" VARCHAR(255),
    "status" VARCHAR(30) NOT NULL,
    "last_flare_up_at" TIMESTAMP(6),
    "movement_restrictions" JSONB NOT NULL DEFAULT '[]',
    "aggravating_exercises" JSONB NOT NULL DEFAULT '[]',
    "notes" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "wellness_conditions_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "index_wellness_conditions_user_id" ON "wellness_conditions"("user_id");

CREATE TABLE "excluded_exercises" (
    "id" VARCHAR(64) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "exercise_id" INTEGER,
    "custom_label" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "excluded_exercises_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "index_excluded_exercises_user_id" ON "excluded_exercises"("user_id");
CREATE INDEX "index_excluded_exercises_exercise_id" ON "excluded_exercises"("exercise_id");

CREATE TABLE "cycle_profiles" (
    "id" VARCHAR(64) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "last_period_start_at" DATE NOT NULL,
    "avg_cycle_length_days" INTEGER NOT NULL DEFAULT 28,
    "avg_period_length_days" INTEGER NOT NULL DEFAULT 5,
    "contraception" VARCHAR(50),
    "tracked_symptoms" JSONB NOT NULL DEFAULT '[]',
    "data_source" VARCHAR(30) NOT NULL DEFAULT 'manual',
    "health_sync" JSONB,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "cycle_profiles_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "cycle_profiles_user_id_key" ON "cycle_profiles"("user_id");
CREATE INDEX "index_cycle_profiles_user_id" ON "cycle_profiles"("user_id");

CREATE TABLE "cycle_daily_logs" (
    "id" VARCHAR(64) NOT NULL,
    "cycle_profile_id" VARCHAR(64) NOT NULL,
    "log_date" DATE NOT NULL,
    "energy" VARCHAR(20),
    "flow_level" VARCHAR(20),
    "symptoms" JSONB NOT NULL DEFAULT '[]',
    "mood" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cycle_daily_logs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "index_cycle_daily_logs_profile_date" ON "cycle_daily_logs"("cycle_profile_id", "log_date");
CREATE INDEX "index_cycle_daily_logs_cycle_profile_id" ON "cycle_daily_logs"("cycle_profile_id");

ALTER TABLE "user_app_settings" ADD CONSTRAINT "user_app_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "workout_locations" ADD CONSTRAINT "workout_locations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "wellness_conditions" ADD CONSTRAINT "wellness_conditions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "excluded_exercises" ADD CONSTRAINT "excluded_exercises_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "excluded_exercises" ADD CONSTRAINT "excluded_exercises_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "cycle_profiles" ADD CONSTRAINT "cycle_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "cycle_daily_logs" ADD CONSTRAINT "cycle_daily_logs_cycle_profile_id_fkey" FOREIGN KEY ("cycle_profile_id") REFERENCES "cycle_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

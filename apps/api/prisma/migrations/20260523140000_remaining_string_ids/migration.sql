-- Remaining tables: Int PKs/FKs -> prefixed String IDs

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

-- Drop all FK constraints before PK/FK column type migrations (re-added below)
ALTER TABLE "audit_logs" DROP CONSTRAINT IF EXISTS "audit_logs_user_id_fkey";
ALTER TABLE "cycle_daily_logs" DROP CONSTRAINT IF EXISTS "cycle_daily_logs_cycle_profile_id_fkey";
ALTER TABLE "cycle_profiles" DROP CONSTRAINT IF EXISTS "cycle_profiles_user_id_fkey";
ALTER TABLE "email_verification_tokens" DROP CONSTRAINT IF EXISTS "email_verification_tokens_user_id_fkey";
ALTER TABLE "excluded_exercises" DROP CONSTRAINT IF EXISTS "excluded_exercises_exercise_id_fkey";
ALTER TABLE "excluded_exercises" DROP CONSTRAINT IF EXISTS "excluded_exercises_user_id_fkey";
ALTER TABLE "fitness_profiles" DROP CONSTRAINT IF EXISTS "fitness_profiles_user_id_fkey";
ALTER TABLE "notification_contents" DROP CONSTRAINT IF EXISTS "notification_contents_notification_id_fkey";
ALTER TABLE "notification_contents" DROP CONSTRAINT IF EXISTS "notification_contents_template_id_fkey";
ALTER TABLE "notifications" DROP CONSTRAINT IF EXISTS "notifications_delivery_status_id_fkey";
ALTER TABLE "notifications" DROP CONSTRAINT IF EXISTS "notifications_read_status_id_fkey";
ALTER TABLE "notifications" DROP CONSTRAINT IF EXISTS "notifications_recipient_id_fkey";
ALTER TABLE "password_reset_tokens" DROP CONSTRAINT IF EXISTS "password_reset_tokens_user_id_fkey";
ALTER TABLE "payment_changes" DROP CONSTRAINT IF EXISTS "payment_changes_change_initiator_id_fkey";
ALTER TABLE "payment_changes" DROP CONSTRAINT IF EXISTS "payment_changes_payment_id_fkey";
ALTER TABLE "payments" DROP CONSTRAINT IF EXISTS "payments_initiator_id_fkey";
ALTER TABLE "payments" DROP CONSTRAINT IF EXISTS "payments_status_id_fkey";
ALTER TABLE "plan_change_log" DROP CONSTRAINT IF EXISTS "plan_change_log_training_plan_id_fkey";
ALTER TABLE "plan_phases" DROP CONSTRAINT IF EXISTS "plan_phases_training_plan_id_fkey";
ALTER TABLE "plan_weeks" DROP CONSTRAINT IF EXISTS "plan_weeks_plan_phase_id_fkey";
ALTER TABLE "planned_exercises" DROP CONSTRAINT IF EXISTS "planned_exercises_exercise_id_fkey";
ALTER TABLE "planned_exercises" DROP CONSTRAINT IF EXISTS "planned_exercises_planned_workout_id_fkey";
ALTER TABLE "planned_exercises" DROP CONSTRAINT IF EXISTS "planned_exercises_workout_section_id_fkey";
ALTER TABLE "planned_workouts" DROP CONSTRAINT IF EXISTS "planned_workouts_plan_week_id_fkey";
ALTER TABLE "planned_workouts" DROP CONSTRAINT IF EXISTS "planned_workouts_training_plan_id_fkey";
ALTER TABLE "refund_requests" DROP CONSTRAINT IF EXISTS "refund_requests_external_system_payment_details_id_fkey";
ALTER TABLE "refund_requests" DROP CONSTRAINT IF EXISTS "refund_requests_paymentsId_fkey";
ALTER TABLE "refund_requests" DROP CONSTRAINT IF EXISTS "refund_requests_user_id_fkey";
ALTER TABLE "role_permissions" DROP CONSTRAINT IF EXISTS "role_permissions_permission_id_fkey";
ALTER TABLE "role_permissions" DROP CONSTRAINT IF EXISTS "role_permissions_role_id_fkey";
ALTER TABLE "session_sets" DROP CONSTRAINT IF EXISTS "session_sets_workout_session_id_fkey";
ALTER TABLE "status" DROP CONSTRAINT IF EXISTS "status_type_id_fkey";
ALTER TABLE "stripe_payment_details" DROP CONSTRAINT IF EXISTS "stripe_payment_details_payment_id_fkey";
ALTER TABLE "stripe_payment_intents" DROP CONSTRAINT IF EXISTS "stripe_payment_intents_user_id_fkey";
ALTER TABLE "tax_country_administrative_divisions" DROP CONSTRAINT IF EXISTS "tax_country_administrative_divisions_country_id_fkey";
ALTER TABLE "tax_exemptions" DROP CONSTRAINT IF EXISTS "tax_exemptions_administrative_division_id_fkey";
ALTER TABLE "tax_exemptions" DROP CONSTRAINT IF EXISTS "tax_exemptions_tax_country_id_fkey";
ALTER TABLE "tax_rates" DROP CONSTRAINT IF EXISTS "tax_rates_administrative_division_id_fkey";
ALTER TABLE "tax_rates" DROP CONSTRAINT IF EXISTS "tax_rates_country_id_fkey";
ALTER TABLE "training_plans" DROP CONSTRAINT IF EXISTS "training_plans_fitness_profile_id_fkey";
ALTER TABLE "training_plans" DROP CONSTRAINT IF EXISTS "training_plans_user_id_fkey";
ALTER TABLE "user_app_settings" DROP CONSTRAINT IF EXISTS "user_app_settings_user_id_fkey";
ALTER TABLE "user_permissions" DROP CONSTRAINT IF EXISTS "user_permissions_permission_id_fkey";
ALTER TABLE "user_permissions" DROP CONSTRAINT IF EXISTS "user_permissions_user_id_fkey";
ALTER TABLE "user_preferences" DROP CONSTRAINT IF EXISTS "user_preferences_preference_id_fkey";
ALTER TABLE "user_preferences" DROP CONSTRAINT IF EXISTS "user_preferences_user_id_fkey";
ALTER TABLE "user_roles" DROP CONSTRAINT IF EXISTS "user_roles_role_id_fkey";
ALTER TABLE "user_roles" DROP CONSTRAINT IF EXISTS "user_roles_user_id_fkey";
ALTER TABLE "user_sessions" DROP CONSTRAINT IF EXISTS "user_sessions_user_id_fkey";
ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "users_ibfk_1";
ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "users_user_profile_id_fkey";
ALTER TABLE "wellness_conditions" DROP CONSTRAINT IF EXISTS "wellness_conditions_user_id_fkey";
ALTER TABLE "workout_locations" DROP CONSTRAINT IF EXISTS "workout_locations_user_id_fkey";
ALTER TABLE "workout_sections" DROP CONSTRAINT IF EXISTS "workout_sections_planned_workout_id_fkey";
ALTER TABLE "workout_sessions" DROP CONSTRAINT IF EXISTS "workout_sessions_training_plan_id_fkey";
ALTER TABLE "workout_sessions" DROP CONSTRAINT IF EXISTS "workout_sessions_user_id_fkey";

-- === status_types ===
ALTER TABLE "status_types" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "status_types" SET "id_str" = flex_generate_prefixed_id('sts_typ', "id"::text);
CREATE TABLE "_flex_id_map_status_types" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_status_types" ("old_id", "new_id") SELECT "id", "id_str" FROM "status_types";
ALTER TABLE "status_types" DROP CONSTRAINT "status_types_pkey";
ALTER TABLE "status_types" DROP COLUMN "id";
ALTER TABLE "status_types" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "status_types" ADD CONSTRAINT "status_types_pkey" PRIMARY KEY ("id");

-- === roles ===
ALTER TABLE "roles" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "roles" SET "id_str" = flex_generate_prefixed_id('rol', "id"::text);
CREATE TABLE "_flex_id_map_roles" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_roles" ("old_id", "new_id") SELECT "id", "id_str" FROM "roles";
ALTER TABLE "roles" DROP CONSTRAINT "roles_pkey";
ALTER TABLE "roles" DROP COLUMN "id";
ALTER TABLE "roles" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "roles" ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");

-- === permissions ===
ALTER TABLE "permissions" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "permissions" SET "id_str" = flex_generate_prefixed_id('perm', "id"::text);
CREATE TABLE "_flex_id_map_permissions" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_permissions" ("old_id", "new_id") SELECT "id", "id_str" FROM "permissions";
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_pkey";
ALTER TABLE "permissions" DROP COLUMN "id";
ALTER TABLE "permissions" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_pkey" PRIMARY KEY ("id");

-- === preferences ===
ALTER TABLE "preferences" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "preferences" SET "id_str" = flex_generate_prefixed_id('prf', "id"::text);
CREATE TABLE "_flex_id_map_preferences" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_preferences" ("old_id", "new_id") SELECT "id", "id_str" FROM "preferences";
ALTER TABLE "preferences" DROP CONSTRAINT "preferences_pkey";
ALTER TABLE "preferences" DROP COLUMN "id";
ALTER TABLE "preferences" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "preferences" ADD CONSTRAINT "preferences_pkey" PRIMARY KEY ("id");

-- === notification_templates ===
ALTER TABLE "notification_templates" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "notification_templates" SET "id_str" = flex_generate_prefixed_id('notf_tpl', "id"::text);
CREATE TABLE "_flex_id_map_notification_templates" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_notification_templates" ("old_id", "new_id") SELECT "id", "id_str" FROM "notification_templates";
ALTER TABLE "notification_templates" DROP CONSTRAINT "notification_templates_pkey";
ALTER TABLE "notification_templates" DROP COLUMN "id";
ALTER TABLE "notification_templates" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "notification_templates" ADD CONSTRAINT "notification_templates_pkey" PRIMARY KEY ("id");

-- === systems ===
ALTER TABLE "systems" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "systems" SET "id_str" = flex_generate_prefixed_id('sys', "id"::text);
CREATE TABLE "_flex_id_map_systems" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_systems" ("old_id", "new_id") SELECT "id", "id_str" FROM "systems";
ALTER TABLE "systems" DROP CONSTRAINT "systems_pkey";
ALTER TABLE "systems" DROP COLUMN "id";
ALTER TABLE "systems" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "systems" ADD CONSTRAINT "systems_pkey" PRIMARY KEY ("id");

-- === blacklisted_tokens ===
ALTER TABLE "blacklisted_tokens" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "blacklisted_tokens" SET "id_str" = flex_generate_prefixed_id('blk_tok', "id"::text);
CREATE TABLE "_flex_id_map_blacklisted_tokens" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_blacklisted_tokens" ("old_id", "new_id") SELECT "id", "id_str" FROM "blacklisted_tokens";
ALTER TABLE "blacklisted_tokens" DROP CONSTRAINT "blacklisted_tokens_pkey";
ALTER TABLE "blacklisted_tokens" DROP COLUMN "id";
ALTER TABLE "blacklisted_tokens" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "blacklisted_tokens" ADD CONSTRAINT "blacklisted_tokens_pkey" PRIMARY KEY ("id");

-- === tax_countries ===
ALTER TABLE "tax_countries" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "tax_countries" SET "id_str" = flex_generate_prefixed_id('tx_cnt', "id"::text);
CREATE TABLE "_flex_id_map_tax_countries" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_tax_countries" ("old_id", "new_id") SELECT "id", "id_str" FROM "tax_countries";
ALTER TABLE "tax_countries" DROP CONSTRAINT "tax_countries_pkey";
ALTER TABLE "tax_countries" DROP COLUMN "id";
ALTER TABLE "tax_countries" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "tax_countries" ADD CONSTRAINT "tax_countries_pkey" PRIMARY KEY ("id");

-- === tax_country_administrative_divisions ===
ALTER TABLE "tax_country_administrative_divisions" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "tax_country_administrative_divisions" SET "id_str" = flex_generate_prefixed_id('tx_cnt_adm_div', "id"::text);
CREATE TABLE "_flex_id_map_tax_country_administrative_divisions" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_tax_country_administrative_divisions" ("old_id", "new_id") SELECT "id", "id_str" FROM "tax_country_administrative_divisions";
ALTER TABLE "tax_country_administrative_divisions" DROP CONSTRAINT IF EXISTS "tax_country_administrative_divisions_country_id_fkey";
ALTER TABLE "tax_country_administrative_divisions" ADD COLUMN "country_id_str" VARCHAR(64);
UPDATE "tax_country_administrative_divisions" t
SET "country_id_str" = m."new_id"
FROM "_flex_id_map_tax_countries" m
WHERE t."country_id" = m."old_id";
UPDATE "tax_country_administrative_divisions" SET "country_id_str" = "country_id"::text WHERE "country_id_str" IS NULL AND "country_id" IS NULL;
ALTER TABLE "tax_country_administrative_divisions" DROP CONSTRAINT "tax_country_administrative_divisions_pkey";
ALTER TABLE "tax_country_administrative_divisions" DROP COLUMN "id";
ALTER TABLE "tax_country_administrative_divisions" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "tax_country_administrative_divisions" ADD CONSTRAINT "tax_country_administrative_divisions_pkey" PRIMARY KEY ("id");
ALTER TABLE "tax_country_administrative_divisions" DROP COLUMN "country_id";
ALTER TABLE "tax_country_administrative_divisions" RENAME COLUMN "country_id_str" TO "country_id";
ALTER TABLE "tax_country_administrative_divisions" ALTER COLUMN "country_id" SET NOT NULL;
ALTER TABLE "tax_country_administrative_divisions" ADD CONSTRAINT "tax_country_administrative_divisions_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "tax_countries"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === status ===
ALTER TABLE "status" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "status" SET "id_str" = flex_generate_prefixed_id('sts', "id"::text);
CREATE TABLE "_flex_id_map_status" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_status" ("old_id", "new_id") SELECT "id", "id_str" FROM "status";
ALTER TABLE "status" DROP CONSTRAINT IF EXISTS "status_type_id_fkey";
ALTER TABLE "status" ADD COLUMN "type_id_str" VARCHAR(64);
UPDATE "status" t
SET "type_id_str" = m."new_id"
FROM "_flex_id_map_status_types" m
WHERE t."type_id" = m."old_id";
UPDATE "status" SET "type_id_str" = "type_id"::text WHERE "type_id_str" IS NULL AND "type_id" IS NULL;
ALTER TABLE "status" DROP CONSTRAINT "status_pkey";
ALTER TABLE "status" DROP COLUMN "id";
ALTER TABLE "status" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "status" ADD CONSTRAINT "status_pkey" PRIMARY KEY ("id");
ALTER TABLE "status" DROP COLUMN "type_id";
ALTER TABLE "status" RENAME COLUMN "type_id_str" TO "type_id";
ALTER TABLE "status" ALTER COLUMN "type_id" SET NOT NULL;
ALTER TABLE "status" ADD CONSTRAINT "status_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "status_types"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === user_profiles ===
ALTER TABLE "user_profiles" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "user_profiles" SET "id_str" = flex_generate_prefixed_id('usr_prof', "id"::text);
CREATE TABLE "_flex_id_map_user_profiles" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_user_profiles" ("old_id", "new_id") SELECT "id", "id_str" FROM "user_profiles";
ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "users_user_profile_id_fkey";
ALTER TABLE "user_profiles" DROP CONSTRAINT "user_profiles_pkey";
ALTER TABLE "user_profiles" DROP COLUMN "id";
ALTER TABLE "user_profiles" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id");
ALTER TABLE "users" ADD COLUMN "user_profile_id_str" VARCHAR(64);
UPDATE "users" c
SET "user_profile_id_str" = m."new_id"
FROM "_flex_id_map_user_profiles" m
WHERE c."user_profile_id" = m."old_id";
ALTER TABLE "users" DROP COLUMN "user_profile_id";
ALTER TABLE "users" RENAME COLUMN "user_profile_id_str" TO "user_profile_id";
ALTER TABLE "users" ALTER COLUMN "user_profile_id" SET NOT NULL;
ALTER TABLE "users" ADD CONSTRAINT "users_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === users ===
ALTER TABLE "users" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "users" SET "id_str" = flex_generate_prefixed_id('usr', "id"::text);
CREATE TABLE "_flex_id_map_users" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_users" ("old_id", "new_id") SELECT "id", "id_str" FROM "users";
ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "users_user_status_id_fkey";
ALTER TABLE "users" ADD COLUMN "user_status_id_str" VARCHAR(64);
UPDATE "users" t
SET "user_status_id_str" = m."new_id"
FROM "_flex_id_map_status" m
WHERE t."user_status_id" = m."old_id";
UPDATE "users" SET "user_status_id_str" = "user_status_id"::text WHERE "user_status_id_str" IS NULL AND "user_status_id" IS NULL;
ALTER TABLE "users" DROP CONSTRAINT "users_pkey";
ALTER TABLE "users" DROP COLUMN "id";
ALTER TABLE "users" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
ALTER TABLE "users" DROP COLUMN "user_status_id";
ALTER TABLE "users" RENAME COLUMN "user_status_id_str" TO "user_status_id";
ALTER TABLE "users" ALTER COLUMN "user_status_id" SET NOT NULL;
ALTER TABLE "users" ADD CONSTRAINT "users_user_status_id_fkey" FOREIGN KEY ("user_status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
-- === fitness_profiles ===
ALTER TABLE "fitness_profiles" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "fitness_profiles" SET "id_str" = flex_generate_prefixed_id('fit_prof', "id"::text);
CREATE TABLE "_flex_id_map_fitness_profiles" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_fitness_profiles" ("old_id", "new_id") SELECT "id", "id_str" FROM "fitness_profiles";
ALTER TABLE "training_plans" DROP CONSTRAINT IF EXISTS "training_plans_fitness_profile_id_fkey";
ALTER TABLE "fitness_profiles" DROP CONSTRAINT IF EXISTS "fitness_profiles_user_id_fkey";
ALTER TABLE "fitness_profiles" ADD COLUMN "user_id_str" VARCHAR(64);
UPDATE "fitness_profiles" t
SET "user_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."user_id" = m."old_id";
UPDATE "fitness_profiles" SET "user_id_str" = "user_id"::text WHERE "user_id_str" IS NULL AND "user_id" IS NULL;
ALTER TABLE "fitness_profiles" DROP CONSTRAINT "fitness_profiles_pkey";
ALTER TABLE "fitness_profiles" DROP COLUMN "id";
ALTER TABLE "fitness_profiles" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "fitness_profiles" ADD CONSTRAINT "fitness_profiles_pkey" PRIMARY KEY ("id");
ALTER TABLE "fitness_profiles" DROP COLUMN "user_id";
ALTER TABLE "fitness_profiles" RENAME COLUMN "user_id_str" TO "user_id";
ALTER TABLE "fitness_profiles" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "fitness_profiles" ADD CONSTRAINT "fitness_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "training_plans" ADD COLUMN "fitness_profile_id_str" VARCHAR(64);
UPDATE "training_plans" c
SET "fitness_profile_id_str" = m."new_id"
FROM "_flex_id_map_fitness_profiles" m
WHERE c."fitness_profile_id" = m."old_id";
ALTER TABLE "training_plans" DROP COLUMN "fitness_profile_id";
ALTER TABLE "training_plans" RENAME COLUMN "fitness_profile_id_str" TO "fitness_profile_id";
ALTER TABLE "training_plans" ALTER COLUMN "fitness_profile_id" SET NOT NULL;
ALTER TABLE "training_plans" ADD CONSTRAINT "training_plans_fitness_profile_id_fkey" FOREIGN KEY ("fitness_profile_id") REFERENCES "fitness_profiles"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === training_plans ===
ALTER TABLE "training_plans" DROP CONSTRAINT IF EXISTS "training_plans_user_id_fkey";
ALTER TABLE "training_plans" ADD COLUMN "user_id_str" VARCHAR(64);
UPDATE "training_plans" t
SET "user_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."user_id" = m."old_id";
UPDATE "training_plans" SET "user_id_str" = "user_id"::text WHERE "user_id_str" IS NULL AND "user_id" IS NULL;
ALTER TABLE "training_plans" DROP COLUMN "user_id";
ALTER TABLE "training_plans" RENAME COLUMN "user_id_str" TO "user_id";
ALTER TABLE "training_plans" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "training_plans" ADD CONSTRAINT "training_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === workout_sessions ===
ALTER TABLE "workout_sessions" DROP CONSTRAINT IF EXISTS "workout_sessions_user_id_fkey";
ALTER TABLE "workout_sessions" ADD COLUMN "user_id_str" VARCHAR(64);
UPDATE "workout_sessions" t
SET "user_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."user_id" = m."old_id";
UPDATE "workout_sessions" SET "user_id_str" = "user_id"::text WHERE "user_id_str" IS NULL AND "user_id" IS NULL;
ALTER TABLE "workout_sessions" DROP COLUMN "user_id";
ALTER TABLE "workout_sessions" RENAME COLUMN "user_id_str" TO "user_id";
ALTER TABLE "workout_sessions" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === user_app_settings ===
ALTER TABLE "user_app_settings" DROP CONSTRAINT IF EXISTS "user_app_settings_user_id_fkey";
ALTER TABLE "user_app_settings" ADD COLUMN "user_id_str" VARCHAR(64);
UPDATE "user_app_settings" t
SET "user_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."user_id" = m."old_id";
UPDATE "user_app_settings" SET "user_id_str" = "user_id"::text WHERE "user_id_str" IS NULL AND "user_id" IS NULL;
ALTER TABLE "user_app_settings" DROP COLUMN "user_id";
ALTER TABLE "user_app_settings" RENAME COLUMN "user_id_str" TO "user_id";
ALTER TABLE "user_app_settings" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "user_app_settings" ADD CONSTRAINT "user_app_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === workout_locations ===
ALTER TABLE "workout_locations" DROP CONSTRAINT IF EXISTS "workout_locations_user_id_fkey";
ALTER TABLE "workout_locations" ADD COLUMN "user_id_str" VARCHAR(64);
UPDATE "workout_locations" t
SET "user_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."user_id" = m."old_id";
UPDATE "workout_locations" SET "user_id_str" = "user_id"::text WHERE "user_id_str" IS NULL AND "user_id" IS NULL;
ALTER TABLE "workout_locations" DROP COLUMN "user_id";
ALTER TABLE "workout_locations" RENAME COLUMN "user_id_str" TO "user_id";
ALTER TABLE "workout_locations" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "workout_locations" ADD CONSTRAINT "workout_locations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === wellness_conditions ===
ALTER TABLE "wellness_conditions" DROP CONSTRAINT IF EXISTS "wellness_conditions_user_id_fkey";
ALTER TABLE "wellness_conditions" ADD COLUMN "user_id_str" VARCHAR(64);
UPDATE "wellness_conditions" t
SET "user_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."user_id" = m."old_id";
UPDATE "wellness_conditions" SET "user_id_str" = "user_id"::text WHERE "user_id_str" IS NULL AND "user_id" IS NULL;
ALTER TABLE "wellness_conditions" DROP COLUMN "user_id";
ALTER TABLE "wellness_conditions" RENAME COLUMN "user_id_str" TO "user_id";
ALTER TABLE "wellness_conditions" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "wellness_conditions" ADD CONSTRAINT "wellness_conditions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === excluded_exercises ===
ALTER TABLE "excluded_exercises" DROP CONSTRAINT IF EXISTS "excluded_exercises_user_id_fkey";
ALTER TABLE "excluded_exercises" ADD COLUMN "user_id_str" VARCHAR(64);
UPDATE "excluded_exercises" t
SET "user_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."user_id" = m."old_id";
UPDATE "excluded_exercises" SET "user_id_str" = "user_id"::text WHERE "user_id_str" IS NULL AND "user_id" IS NULL;
ALTER TABLE "excluded_exercises" DROP COLUMN "user_id";
ALTER TABLE "excluded_exercises" RENAME COLUMN "user_id_str" TO "user_id";
ALTER TABLE "excluded_exercises" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "excluded_exercises" ADD CONSTRAINT "excluded_exercises_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === cycle_profiles ===
ALTER TABLE "cycle_profiles" DROP CONSTRAINT IF EXISTS "cycle_profiles_user_id_fkey";
ALTER TABLE "cycle_profiles" ADD COLUMN "user_id_str" VARCHAR(64);
UPDATE "cycle_profiles" t
SET "user_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."user_id" = m."old_id";
UPDATE "cycle_profiles" SET "user_id_str" = "user_id"::text WHERE "user_id_str" IS NULL AND "user_id" IS NULL;
ALTER TABLE "cycle_profiles" DROP COLUMN "user_id";
ALTER TABLE "cycle_profiles" RENAME COLUMN "user_id_str" TO "user_id";
ALTER TABLE "cycle_profiles" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "cycle_profiles" ADD CONSTRAINT "cycle_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === audit_logs ===
ALTER TABLE "audit_logs" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "audit_logs" SET "id_str" = flex_generate_prefixed_id('aud_log', "id"::text);
CREATE TABLE "_flex_id_map_audit_logs" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_audit_logs" ("old_id", "new_id") SELECT "id", "id_str" FROM "audit_logs";
ALTER TABLE "audit_logs" DROP CONSTRAINT IF EXISTS "audit_logs_user_id_fkey";
ALTER TABLE "audit_logs" ADD COLUMN "user_id_str" VARCHAR(64);
UPDATE "audit_logs" t
SET "user_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."user_id" = m."old_id";
ALTER TABLE "audit_logs" DROP CONSTRAINT "audit_logs_pkey";
ALTER TABLE "audit_logs" DROP COLUMN "id";
ALTER TABLE "audit_logs" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id");
ALTER TABLE "audit_logs" DROP COLUMN "user_id";
ALTER TABLE "audit_logs" RENAME COLUMN "user_id_str" TO "user_id";
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- === email_verification_tokens ===
ALTER TABLE "email_verification_tokens" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "email_verification_tokens" SET "id_str" = flex_generate_prefixed_id('ev_tok', "id"::text);
CREATE TABLE "_flex_id_map_email_verification_tokens" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_email_verification_tokens" ("old_id", "new_id") SELECT "id", "id_str" FROM "email_verification_tokens";
ALTER TABLE "email_verification_tokens" DROP CONSTRAINT IF EXISTS "email_verification_tokens_user_id_fkey";
ALTER TABLE "email_verification_tokens" ADD COLUMN "user_id_str" VARCHAR(64);
UPDATE "email_verification_tokens" t
SET "user_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."user_id" = m."old_id";
UPDATE "email_verification_tokens" SET "user_id_str" = "user_id"::text WHERE "user_id_str" IS NULL AND "user_id" IS NULL;
ALTER TABLE "email_verification_tokens" DROP CONSTRAINT "email_verification_tokens_pkey";
ALTER TABLE "email_verification_tokens" DROP COLUMN "id";
ALTER TABLE "email_verification_tokens" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "email_verification_tokens" ADD CONSTRAINT "email_verification_tokens_pkey" PRIMARY KEY ("id");
ALTER TABLE "email_verification_tokens" DROP COLUMN "user_id";
ALTER TABLE "email_verification_tokens" RENAME COLUMN "user_id_str" TO "user_id";
ALTER TABLE "email_verification_tokens" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "email_verification_tokens" ADD CONSTRAINT "email_verification_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === password_reset_tokens ===
ALTER TABLE "password_reset_tokens" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "password_reset_tokens" SET "id_str" = flex_generate_prefixed_id('pwd_rst_tok', "id"::text);
CREATE TABLE "_flex_id_map_password_reset_tokens" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_password_reset_tokens" ("old_id", "new_id") SELECT "id", "id_str" FROM "password_reset_tokens";
ALTER TABLE "password_reset_tokens" DROP CONSTRAINT IF EXISTS "password_reset_tokens_user_id_fkey";
ALTER TABLE "password_reset_tokens" ADD COLUMN "user_id_str" VARCHAR(64);
UPDATE "password_reset_tokens" t
SET "user_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."user_id" = m."old_id";
UPDATE "password_reset_tokens" SET "user_id_str" = "user_id"::text WHERE "user_id_str" IS NULL AND "user_id" IS NULL;
ALTER TABLE "password_reset_tokens" DROP CONSTRAINT "password_reset_tokens_pkey";
ALTER TABLE "password_reset_tokens" DROP COLUMN "id";
ALTER TABLE "password_reset_tokens" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id");
ALTER TABLE "password_reset_tokens" DROP COLUMN "user_id";
ALTER TABLE "password_reset_tokens" RENAME COLUMN "user_id_str" TO "user_id";
ALTER TABLE "password_reset_tokens" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === notifications ===
ALTER TABLE "notifications" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "notifications" SET "id_str" = flex_generate_prefixed_id('notf', "id"::text);
CREATE TABLE "_flex_id_map_notifications" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_notifications" ("old_id", "new_id") SELECT "id", "id_str" FROM "notifications";
ALTER TABLE "notification_contents" DROP CONSTRAINT IF EXISTS "notification_contents_notification_id_fkey";
ALTER TABLE "notifications" DROP CONSTRAINT IF EXISTS "notifications_recipient_id_fkey";
ALTER TABLE "notifications" ADD COLUMN "recipient_id_str" VARCHAR(64);
UPDATE "notifications" t
SET "recipient_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."recipient_id" = m."old_id";
UPDATE "notifications" SET "recipient_id_str" = "recipient_id"::text WHERE "recipient_id_str" IS NULL AND "recipient_id" IS NULL;
ALTER TABLE "notifications" DROP CONSTRAINT IF EXISTS "notifications_author_id_fkey";
ALTER TABLE "notifications" ADD COLUMN "author_id_str" VARCHAR(64);
UPDATE "notifications" t
SET "author_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."author_id" = m."old_id";
UPDATE "notifications" SET "author_id_str" = "author_id"::text WHERE "author_id_str" IS NULL AND "author_id" IS NULL;
ALTER TABLE "notifications" DROP CONSTRAINT IF EXISTS "notifications_delivery_status_id_fkey";
ALTER TABLE "notifications" ADD COLUMN "delivery_status_id_str" VARCHAR(64);
UPDATE "notifications" t
SET "delivery_status_id_str" = m."new_id"
FROM "_flex_id_map_status" m
WHERE t."delivery_status_id" = m."old_id";
UPDATE "notifications" SET "delivery_status_id_str" = "delivery_status_id"::text WHERE "delivery_status_id_str" IS NULL AND "delivery_status_id" IS NULL;
ALTER TABLE "notifications" DROP CONSTRAINT IF EXISTS "notifications_read_status_id_fkey";
ALTER TABLE "notifications" ADD COLUMN "read_status_id_str" VARCHAR(64);
UPDATE "notifications" t
SET "read_status_id_str" = m."new_id"
FROM "_flex_id_map_status" m
WHERE t."read_status_id" = m."old_id";
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_pkey";
ALTER TABLE "notifications" DROP COLUMN "id";
ALTER TABLE "notifications" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");
ALTER TABLE "notifications" DROP COLUMN "recipient_id";
ALTER TABLE "notifications" RENAME COLUMN "recipient_id_str" TO "recipient_id";
ALTER TABLE "notifications" ALTER COLUMN "recipient_id" SET NOT NULL;
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "notifications" DROP COLUMN "author_id";
ALTER TABLE "notifications" RENAME COLUMN "author_id_str" TO "author_id";
ALTER TABLE "notifications" ALTER COLUMN "author_id" SET NOT NULL;
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "notifications" DROP COLUMN "delivery_status_id";
ALTER TABLE "notifications" RENAME COLUMN "delivery_status_id_str" TO "delivery_status_id";
ALTER TABLE "notifications" ALTER COLUMN "delivery_status_id" SET NOT NULL;
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_delivery_status_id_fkey" FOREIGN KEY ("delivery_status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "notifications" DROP COLUMN "read_status_id";
ALTER TABLE "notifications" RENAME COLUMN "read_status_id_str" TO "read_status_id";
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_read_status_id_fkey" FOREIGN KEY ("read_status_id") REFERENCES "status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "notification_contents" ADD COLUMN "notification_id_str" VARCHAR(64);
UPDATE "notification_contents" c
SET "notification_id_str" = m."new_id"
FROM "_flex_id_map_notifications" m
WHERE c."notification_id" = m."old_id";
ALTER TABLE "notification_contents" DROP COLUMN "notification_id";
ALTER TABLE "notification_contents" RENAME COLUMN "notification_id_str" TO "notification_id";
ALTER TABLE "notification_contents" ALTER COLUMN "notification_id" SET NOT NULL;
ALTER TABLE "notification_contents" ADD CONSTRAINT "notification_contents_notification_id_fkey" FOREIGN KEY ("notification_id") REFERENCES "notifications"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === notification_contents ===
ALTER TABLE "notification_contents" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "notification_contents" SET "id_str" = flex_generate_prefixed_id('notf_cnt', "id"::text);
CREATE TABLE "_flex_id_map_notification_contents" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_notification_contents" ("old_id", "new_id") SELECT "id", "id_str" FROM "notification_contents";
ALTER TABLE "notification_contents" DROP CONSTRAINT IF EXISTS "notification_contents_template_id_fkey";
ALTER TABLE "notification_contents" ADD COLUMN "template_id_str" VARCHAR(64);
UPDATE "notification_contents" t
SET "template_id_str" = m."new_id"
FROM "_flex_id_map_notification_templates" m
WHERE t."template_id" = m."old_id";
ALTER TABLE "notification_contents" DROP CONSTRAINT "notification_contents_pkey";
ALTER TABLE "notification_contents" DROP COLUMN "id";
ALTER TABLE "notification_contents" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "notification_contents" ADD CONSTRAINT "notification_contents_pkey" PRIMARY KEY ("id");
ALTER TABLE "notification_contents" DROP COLUMN "template_id";
ALTER TABLE "notification_contents" RENAME COLUMN "template_id_str" TO "template_id";
ALTER TABLE "notification_contents" ADD CONSTRAINT "notification_contents_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "notification_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- === payments ===
ALTER TABLE "payments" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "payments" SET "id_str" = flex_generate_prefixed_id('pmnt', "id"::text);
CREATE TABLE "_flex_id_map_payments" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_payments" ("old_id", "new_id") SELECT "id", "id_str" FROM "payments";
ALTER TABLE "payment_changes" DROP CONSTRAINT IF EXISTS "payment_changes_payment_id_fkey";
ALTER TABLE "stripe_payment_details" DROP CONSTRAINT IF EXISTS "stripe_payment_details_payment_id_fkey";
ALTER TABLE "refund_requests" DROP CONSTRAINT IF EXISTS "refund_requests_paymentsId_fkey";
ALTER TABLE "payments" DROP CONSTRAINT IF EXISTS "payments_initiator_id_fkey";
ALTER TABLE "payments" ADD COLUMN "initiator_id_str" VARCHAR(64);
UPDATE "payments" t
SET "initiator_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."initiator_id" = m."old_id";
UPDATE "payments" SET "initiator_id_str" = "initiator_id"::text WHERE "initiator_id_str" IS NULL AND "initiator_id" IS NULL;
ALTER TABLE "payments" DROP CONSTRAINT IF EXISTS "payments_status_id_fkey";
ALTER TABLE "payments" ADD COLUMN "status_id_str" VARCHAR(64);
UPDATE "payments" t
SET "status_id_str" = m."new_id"
FROM "_flex_id_map_status" m
WHERE t."status_id" = m."old_id";
UPDATE "payments" SET "status_id_str" = "status_id"::text WHERE "status_id_str" IS NULL AND "status_id" IS NULL;
ALTER TABLE "payments" DROP CONSTRAINT "payments_pkey";
ALTER TABLE "payments" DROP COLUMN "id";
ALTER TABLE "payments" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "payments" ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("id");
ALTER TABLE "payments" DROP COLUMN "initiator_id";
ALTER TABLE "payments" RENAME COLUMN "initiator_id_str" TO "initiator_id";
ALTER TABLE "payments" ALTER COLUMN "initiator_id" SET NOT NULL;
ALTER TABLE "payments" ADD CONSTRAINT "payments_initiator_id_fkey" FOREIGN KEY ("initiator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "payments" DROP COLUMN "status_id";
ALTER TABLE "payments" RENAME COLUMN "status_id_str" TO "status_id";
ALTER TABLE "payments" ALTER COLUMN "status_id" SET NOT NULL;
ALTER TABLE "payments" ADD CONSTRAINT "payments_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "payment_changes" ADD COLUMN "payment_id_str" VARCHAR(64);
UPDATE "payment_changes" c
SET "payment_id_str" = m."new_id"
FROM "_flex_id_map_payments" m
WHERE c."payment_id" = m."old_id";
ALTER TABLE "payment_changes" DROP COLUMN "payment_id";
ALTER TABLE "payment_changes" RENAME COLUMN "payment_id_str" TO "payment_id";
ALTER TABLE "payment_changes" ALTER COLUMN "payment_id" SET NOT NULL;
ALTER TABLE "payment_changes" ADD CONSTRAINT "payment_changes_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "stripe_payment_details" ADD COLUMN "payment_id_str" VARCHAR(64);
UPDATE "stripe_payment_details" c
SET "payment_id_str" = m."new_id"
FROM "_flex_id_map_payments" m
WHERE c."payment_id" = m."old_id";
ALTER TABLE "stripe_payment_details" DROP COLUMN "payment_id";
ALTER TABLE "stripe_payment_details" RENAME COLUMN "payment_id_str" TO "payment_id";
ALTER TABLE "stripe_payment_details" ALTER COLUMN "payment_id" SET NOT NULL;
ALTER TABLE "stripe_payment_details" ADD CONSTRAINT "stripe_payment_details_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "refund_requests" ADD COLUMN "paymentsId_str" VARCHAR(64);
UPDATE "refund_requests" c
SET "paymentsId_str" = m."new_id"
FROM "_flex_id_map_payments" m
WHERE c."paymentsId" = m."old_id";
ALTER TABLE "refund_requests" DROP COLUMN "paymentsId";
ALTER TABLE "refund_requests" RENAME COLUMN "paymentsId_str" TO "paymentsId";
ALTER TABLE "refund_requests" ADD CONSTRAINT "refund_requests_paymentsId_fkey" FOREIGN KEY ("paymentsId") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- === payment_changes ===
ALTER TABLE "payment_changes" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "payment_changes" SET "id_str" = flex_generate_prefixed_id('pay_ch', "id"::text);
CREATE TABLE "_flex_id_map_payment_changes" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_payment_changes" ("old_id", "new_id") SELECT "id", "id_str" FROM "payment_changes";
ALTER TABLE "payment_changes" DROP CONSTRAINT IF EXISTS "payment_changes_change_initiator_id_fkey";
ALTER TABLE "payment_changes" ADD COLUMN "change_initiator_id_str" VARCHAR(64);
UPDATE "payment_changes" t
SET "change_initiator_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."change_initiator_id" = m."old_id";
UPDATE "payment_changes" SET "change_initiator_id_str" = "change_initiator_id"::text WHERE "change_initiator_id_str" IS NULL AND "change_initiator_id" IS NULL;
ALTER TABLE "payment_changes" DROP CONSTRAINT "payment_changes_pkey";
ALTER TABLE "payment_changes" DROP COLUMN "id";
ALTER TABLE "payment_changes" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "payment_changes" ADD CONSTRAINT "payment_changes_pkey" PRIMARY KEY ("id");
ALTER TABLE "payment_changes" DROP COLUMN "change_initiator_id";
ALTER TABLE "payment_changes" RENAME COLUMN "change_initiator_id_str" TO "change_initiator_id";
ALTER TABLE "payment_changes" ALTER COLUMN "change_initiator_id" SET NOT NULL;
ALTER TABLE "payment_changes" ADD CONSTRAINT "payment_changes_change_initiator_id_fkey" FOREIGN KEY ("change_initiator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === stripe_payment_details ===
ALTER TABLE "stripe_payment_details" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "stripe_payment_details" SET "id_str" = flex_generate_prefixed_id('str_pay_det', "id"::text);
CREATE TABLE "_flex_id_map_stripe_payment_details" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_stripe_payment_details" ("old_id", "new_id") SELECT "id", "id_str" FROM "stripe_payment_details";
ALTER TABLE "refund_requests" DROP CONSTRAINT IF EXISTS "refund_requests_external_system_payment_details_id_fkey";
ALTER TABLE "stripe_payment_details" DROP CONSTRAINT "stripe_payment_details_pkey";
ALTER TABLE "stripe_payment_details" DROP COLUMN "id";
ALTER TABLE "stripe_payment_details" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "stripe_payment_details" ADD CONSTRAINT "stripe_payment_details_pkey" PRIMARY KEY ("id");
ALTER TABLE "refund_requests" ADD COLUMN "external_system_payment_details_id_str" VARCHAR(64);
UPDATE "refund_requests" c
SET "external_system_payment_details_id_str" = m."new_id"
FROM "_flex_id_map_stripe_payment_details" m
WHERE c."external_system_payment_details_id" = m."old_id";
ALTER TABLE "refund_requests" DROP COLUMN "external_system_payment_details_id";
ALTER TABLE "refund_requests" RENAME COLUMN "external_system_payment_details_id_str" TO "external_system_payment_details_id";
ALTER TABLE "refund_requests" ALTER COLUMN "external_system_payment_details_id" SET NOT NULL;
ALTER TABLE "refund_requests" ADD CONSTRAINT "refund_requests_external_system_payment_details_id_fkey" FOREIGN KEY ("external_system_payment_details_id") REFERENCES "stripe_payment_details"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === stripe_payment_intents ===
ALTER TABLE "stripe_payment_intents" DROP CONSTRAINT IF EXISTS "stripe_payment_intents_user_id_fkey";
ALTER TABLE "stripe_payment_intents" ADD COLUMN "user_id_str" VARCHAR(64);
UPDATE "stripe_payment_intents" t
SET "user_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."user_id" = m."old_id";
UPDATE "stripe_payment_intents" SET "user_id_str" = "user_id"::text WHERE "user_id_str" IS NULL AND "user_id" IS NULL;
ALTER TABLE "stripe_payment_intents" DROP COLUMN "user_id";
ALTER TABLE "stripe_payment_intents" RENAME COLUMN "user_id_str" TO "user_id";
ALTER TABLE "stripe_payment_intents" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "stripe_payment_intents" ADD CONSTRAINT "stripe_payment_intents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === refund_requests ===
ALTER TABLE "refund_requests" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "refund_requests" SET "id_str" = flex_generate_prefixed_id('rfnd_req', "id"::text);
CREATE TABLE "_flex_id_map_refund_requests" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_refund_requests" ("old_id", "new_id") SELECT "id", "id_str" FROM "refund_requests";
ALTER TABLE "refund_requests" DROP CONSTRAINT IF EXISTS "refund_requests_user_id_fkey";
ALTER TABLE "refund_requests" ADD COLUMN "user_id_str" VARCHAR(64);
UPDATE "refund_requests" t
SET "user_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."user_id" = m."old_id";
UPDATE "refund_requests" SET "user_id_str" = "user_id"::text WHERE "user_id_str" IS NULL AND "user_id" IS NULL;
ALTER TABLE "refund_requests" DROP CONSTRAINT "refund_requests_pkey";
ALTER TABLE "refund_requests" DROP COLUMN "id";
ALTER TABLE "refund_requests" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "refund_requests" ADD CONSTRAINT "refund_requests_pkey" PRIMARY KEY ("id");
ALTER TABLE "refund_requests" DROP COLUMN "user_id";
ALTER TABLE "refund_requests" RENAME COLUMN "user_id_str" TO "user_id";
ALTER TABLE "refund_requests" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "refund_requests" ADD CONSTRAINT "refund_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === role_permissions ===
ALTER TABLE "role_permissions" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "role_permissions" SET "id_str" = flex_generate_prefixed_id('rol_perm', "id"::text);
CREATE TABLE "_flex_id_map_role_permissions" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_role_permissions" ("old_id", "new_id") SELECT "id", "id_str" FROM "role_permissions";
ALTER TABLE "role_permissions" DROP CONSTRAINT IF EXISTS "role_permissions_role_id_fkey";
ALTER TABLE "role_permissions" ADD COLUMN "role_id_str" VARCHAR(64);
UPDATE "role_permissions" t
SET "role_id_str" = m."new_id"
FROM "_flex_id_map_roles" m
WHERE t."role_id" = m."old_id";
UPDATE "role_permissions" SET "role_id_str" = "role_id"::text WHERE "role_id_str" IS NULL AND "role_id" IS NULL;
ALTER TABLE "role_permissions" DROP CONSTRAINT IF EXISTS "role_permissions_permission_id_fkey";
ALTER TABLE "role_permissions" ADD COLUMN "permission_id_str" VARCHAR(64);
UPDATE "role_permissions" t
SET "permission_id_str" = m."new_id"
FROM "_flex_id_map_permissions" m
WHERE t."permission_id" = m."old_id";
UPDATE "role_permissions" SET "permission_id_str" = "permission_id"::text WHERE "permission_id_str" IS NULL AND "permission_id" IS NULL;
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_pkey";
ALTER TABLE "role_permissions" DROP COLUMN "id";
ALTER TABLE "role_permissions" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id");
ALTER TABLE "role_permissions" DROP COLUMN "role_id";
ALTER TABLE "role_permissions" RENAME COLUMN "role_id_str" TO "role_id";
ALTER TABLE "role_permissions" ALTER COLUMN "role_id" SET NOT NULL;
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "role_permissions" DROP COLUMN "permission_id";
ALTER TABLE "role_permissions" RENAME COLUMN "permission_id_str" TO "permission_id";
ALTER TABLE "role_permissions" ALTER COLUMN "permission_id" SET NOT NULL;
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === user_roles ===
ALTER TABLE "user_roles" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "user_roles" SET "id_str" = flex_generate_prefixed_id('usr_rol', "id"::text);
CREATE TABLE "_flex_id_map_user_roles" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_user_roles" ("old_id", "new_id") SELECT "id", "id_str" FROM "user_roles";
ALTER TABLE "user_roles" DROP CONSTRAINT IF EXISTS "user_roles_user_id_fkey";
ALTER TABLE "user_roles" ADD COLUMN "user_id_str" VARCHAR(64);
UPDATE "user_roles" t
SET "user_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."user_id" = m."old_id";
UPDATE "user_roles" SET "user_id_str" = "user_id"::text WHERE "user_id_str" IS NULL AND "user_id" IS NULL;
ALTER TABLE "user_roles" DROP CONSTRAINT IF EXISTS "user_roles_role_id_fkey";
ALTER TABLE "user_roles" ADD COLUMN "role_id_str" VARCHAR(64);
UPDATE "user_roles" t
SET "role_id_str" = m."new_id"
FROM "_flex_id_map_roles" m
WHERE t."role_id" = m."old_id";
UPDATE "user_roles" SET "role_id_str" = "role_id"::text WHERE "role_id_str" IS NULL AND "role_id" IS NULL;
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_pkey";
ALTER TABLE "user_roles" DROP COLUMN "id";
ALTER TABLE "user_roles" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id");
ALTER TABLE "user_roles" DROP COLUMN "user_id";
ALTER TABLE "user_roles" RENAME COLUMN "user_id_str" TO "user_id";
ALTER TABLE "user_roles" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "user_roles" DROP COLUMN "role_id";
ALTER TABLE "user_roles" RENAME COLUMN "role_id_str" TO "role_id";
ALTER TABLE "user_roles" ALTER COLUMN "role_id" SET NOT NULL;
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === user_permissions ===
ALTER TABLE "user_permissions" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "user_permissions" SET "id_str" = flex_generate_prefixed_id('usr_perm', "id"::text);
CREATE TABLE "_flex_id_map_user_permissions" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_user_permissions" ("old_id", "new_id") SELECT "id", "id_str" FROM "user_permissions";
ALTER TABLE "user_permissions" DROP CONSTRAINT IF EXISTS "user_permissions_user_id_fkey";
ALTER TABLE "user_permissions" ADD COLUMN "user_id_str" VARCHAR(64);
UPDATE "user_permissions" t
SET "user_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."user_id" = m."old_id";
UPDATE "user_permissions" SET "user_id_str" = "user_id"::text WHERE "user_id_str" IS NULL AND "user_id" IS NULL;
ALTER TABLE "user_permissions" DROP CONSTRAINT IF EXISTS "user_permissions_permission_id_fkey";
ALTER TABLE "user_permissions" ADD COLUMN "permission_id_str" VARCHAR(64);
UPDATE "user_permissions" t
SET "permission_id_str" = m."new_id"
FROM "_flex_id_map_permissions" m
WHERE t."permission_id" = m."old_id";
UPDATE "user_permissions" SET "permission_id_str" = "permission_id"::text WHERE "permission_id_str" IS NULL AND "permission_id" IS NULL;
ALTER TABLE "user_permissions" DROP CONSTRAINT "user_permissions_pkey";
ALTER TABLE "user_permissions" DROP COLUMN "id";
ALTER TABLE "user_permissions" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("id");
ALTER TABLE "user_permissions" DROP COLUMN "user_id";
ALTER TABLE "user_permissions" RENAME COLUMN "user_id_str" TO "user_id";
ALTER TABLE "user_permissions" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "user_permissions" DROP COLUMN "permission_id";
ALTER TABLE "user_permissions" RENAME COLUMN "permission_id_str" TO "permission_id";
ALTER TABLE "user_permissions" ALTER COLUMN "permission_id" SET NOT NULL;
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === user_preferences ===
ALTER TABLE "user_preferences" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "user_preferences" SET "id_str" = flex_generate_prefixed_id('usr_pref', "id"::text);
CREATE TABLE "_flex_id_map_user_preferences" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_user_preferences" ("old_id", "new_id") SELECT "id", "id_str" FROM "user_preferences";
ALTER TABLE "user_preferences" DROP CONSTRAINT IF EXISTS "user_preferences_user_id_fkey";
ALTER TABLE "user_preferences" ADD COLUMN "user_id_str" VARCHAR(64);
UPDATE "user_preferences" t
SET "user_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."user_id" = m."old_id";
UPDATE "user_preferences" SET "user_id_str" = "user_id"::text WHERE "user_id_str" IS NULL AND "user_id" IS NULL;
ALTER TABLE "user_preferences" DROP CONSTRAINT IF EXISTS "user_preferences_preference_id_fkey";
ALTER TABLE "user_preferences" ADD COLUMN "preference_id_str" VARCHAR(64);
UPDATE "user_preferences" t
SET "preference_id_str" = m."new_id"
FROM "_flex_id_map_preferences" m
WHERE t."preference_id" = m."old_id";
UPDATE "user_preferences" SET "preference_id_str" = "preference_id"::text WHERE "preference_id_str" IS NULL AND "preference_id" IS NULL;
ALTER TABLE "user_preferences" DROP CONSTRAINT "user_preferences_pkey";
ALTER TABLE "user_preferences" DROP COLUMN "id";
ALTER TABLE "user_preferences" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id");
ALTER TABLE "user_preferences" DROP COLUMN "user_id";
ALTER TABLE "user_preferences" RENAME COLUMN "user_id_str" TO "user_id";
ALTER TABLE "user_preferences" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "user_preferences" DROP COLUMN "preference_id";
ALTER TABLE "user_preferences" RENAME COLUMN "preference_id_str" TO "preference_id";
ALTER TABLE "user_preferences" ALTER COLUMN "preference_id" SET NOT NULL;
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_preference_id_fkey" FOREIGN KEY ("preference_id") REFERENCES "preferences"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === user_sessions ===
ALTER TABLE "user_sessions" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "user_sessions" SET "id_str" = flex_generate_prefixed_id('usr_sess', "id"::text);
CREATE TABLE "_flex_id_map_user_sessions" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_user_sessions" ("old_id", "new_id") SELECT "id", "id_str" FROM "user_sessions";
ALTER TABLE "user_sessions" DROP CONSTRAINT IF EXISTS "user_sessions_user_id_fkey";
ALTER TABLE "user_sessions" ADD COLUMN "user_id_str" VARCHAR(64);
UPDATE "user_sessions" t
SET "user_id_str" = m."new_id"
FROM "_flex_id_map_users" m
WHERE t."user_id" = m."old_id";
UPDATE "user_sessions" SET "user_id_str" = "user_id"::text WHERE "user_id_str" IS NULL AND "user_id" IS NULL;
ALTER TABLE "user_sessions" DROP CONSTRAINT "user_sessions_pkey";
ALTER TABLE "user_sessions" DROP COLUMN "id";
ALTER TABLE "user_sessions" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id");
ALTER TABLE "user_sessions" DROP COLUMN "user_id";
ALTER TABLE "user_sessions" RENAME COLUMN "user_id_str" TO "user_id";
ALTER TABLE "user_sessions" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- === tax_rates ===
ALTER TABLE "tax_rates" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "tax_rates" SET "id_str" = flex_generate_prefixed_id('tx_rt', "id"::text);
CREATE TABLE "_flex_id_map_tax_rates" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_tax_rates" ("old_id", "new_id") SELECT "id", "id_str" FROM "tax_rates";
ALTER TABLE "tax_rates" DROP CONSTRAINT IF EXISTS "tax_rates_country_id_fkey";
ALTER TABLE "tax_rates" ADD COLUMN "country_id_str" VARCHAR(64);
UPDATE "tax_rates" t
SET "country_id_str" = m."new_id"
FROM "_flex_id_map_tax_countries" m
WHERE t."country_id" = m."old_id";
ALTER TABLE "tax_rates" DROP CONSTRAINT IF EXISTS "tax_rates_administrative_division_id_fkey";
ALTER TABLE "tax_rates" ADD COLUMN "administrative_division_id_str" VARCHAR(64);
UPDATE "tax_rates" t
SET "administrative_division_id_str" = m."new_id"
FROM "_flex_id_map_tax_country_administrative_divisions" m
WHERE t."administrative_division_id" = m."old_id";
ALTER TABLE "tax_rates" DROP CONSTRAINT "tax_rates_pkey";
ALTER TABLE "tax_rates" DROP COLUMN "id";
ALTER TABLE "tax_rates" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "tax_rates" ADD CONSTRAINT "tax_rates_pkey" PRIMARY KEY ("id");
ALTER TABLE "tax_rates" DROP COLUMN "country_id";
ALTER TABLE "tax_rates" RENAME COLUMN "country_id_str" TO "country_id";
ALTER TABLE "tax_rates" ADD CONSTRAINT "tax_rates_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "tax_countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "tax_rates" DROP COLUMN "administrative_division_id";
ALTER TABLE "tax_rates" RENAME COLUMN "administrative_division_id_str" TO "administrative_division_id";
ALTER TABLE "tax_rates" ADD CONSTRAINT "tax_rates_administrative_division_id_fkey" FOREIGN KEY ("administrative_division_id") REFERENCES "tax_country_administrative_divisions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- === tax_exemptions ===
ALTER TABLE "tax_exemptions" ADD COLUMN "id_str" VARCHAR(64);
UPDATE "tax_exemptions" SET "id_str" = flex_generate_prefixed_id('tx_ex', "id"::text);
CREATE TABLE "_flex_id_map_tax_exemptions" (
  "old_id" INTEGER NOT NULL PRIMARY KEY,
  "new_id" VARCHAR(64) NOT NULL UNIQUE
);
INSERT INTO "_flex_id_map_tax_exemptions" ("old_id", "new_id") SELECT "id", "id_str" FROM "tax_exemptions";
ALTER TABLE "tax_exemptions" DROP CONSTRAINT IF EXISTS "tax_exemptions_administrative_division_id_fkey";
ALTER TABLE "tax_exemptions" ADD COLUMN "administrative_division_id_str" VARCHAR(64);
UPDATE "tax_exemptions" t
SET "administrative_division_id_str" = m."new_id"
FROM "_flex_id_map_tax_country_administrative_divisions" m
WHERE t."administrative_division_id" = m."old_id";
UPDATE "tax_exemptions" SET "administrative_division_id_str" = "administrative_division_id"::text WHERE "administrative_division_id_str" IS NULL AND "administrative_division_id" IS NULL;
ALTER TABLE "tax_exemptions" DROP CONSTRAINT IF EXISTS "tax_exemptions_tax_country_id_fkey";
ALTER TABLE "tax_exemptions" ADD COLUMN "tax_country_id_str" VARCHAR(64);
UPDATE "tax_exemptions" t
SET "tax_country_id_str" = m."new_id"
FROM "_flex_id_map_tax_countries" m
WHERE t."tax_country_id" = m."old_id";
ALTER TABLE "tax_exemptions" DROP CONSTRAINT "tax_exemptions_pkey";
ALTER TABLE "tax_exemptions" DROP COLUMN "id";
ALTER TABLE "tax_exemptions" RENAME COLUMN "id_str" TO "id";
ALTER TABLE "tax_exemptions" ADD CONSTRAINT "tax_exemptions_pkey" PRIMARY KEY ("id");
ALTER TABLE "tax_exemptions" DROP COLUMN "administrative_division_id";
ALTER TABLE "tax_exemptions" RENAME COLUMN "administrative_division_id_str" TO "administrative_division_id";
ALTER TABLE "tax_exemptions" ALTER COLUMN "administrative_division_id" SET NOT NULL;
ALTER TABLE "tax_exemptions" ADD CONSTRAINT "tax_exemptions_administrative_division_id_fkey" FOREIGN KEY ("administrative_division_id") REFERENCES "tax_country_administrative_divisions"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "tax_exemptions" DROP COLUMN "tax_country_id";
ALTER TABLE "tax_exemptions" RENAME COLUMN "tax_country_id_str" TO "tax_country_id";
ALTER TABLE "tax_exemptions" ADD CONSTRAINT "tax_exemptions_tax_country_id_fkey" FOREIGN KEY ("tax_country_id") REFERENCES "tax_countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;



-- Recreate unique indexes invalidated by column type migrations
CREATE UNIQUE INDEX IF NOT EXISTS "index_status_type_name" ON "status"("type_id", "name");
CREATE UNIQUE INDEX IF NOT EXISTS "index_role_permissions_unique" ON "role_permissions"("role_id", "permission_id");
CREATE UNIQUE INDEX IF NOT EXISTS "index_user_permissions_unique" ON "user_permissions"("user_id", "permission_id");
CREATE UNIQUE INDEX IF NOT EXISTS "index_user_roles_unique" ON "user_roles"("user_id", "role_id");
CREATE UNIQUE INDEX IF NOT EXISTS "users_user_profile_id_key" ON "users"("user_profile_id");

-- Drop ID map staging tables
DROP TABLE IF EXISTS "_flex_id_map_audit_logs";
DROP TABLE IF EXISTS "_flex_id_map_blacklisted_tokens";
DROP TABLE IF EXISTS "_flex_id_map_email_verification_tokens";
DROP TABLE IF EXISTS "_flex_id_map_fitness_profiles";
DROP TABLE IF EXISTS "_flex_id_map_notification_contents";
DROP TABLE IF EXISTS "_flex_id_map_notification_templates";
DROP TABLE IF EXISTS "_flex_id_map_notifications";
DROP TABLE IF EXISTS "_flex_id_map_password_reset_tokens";
DROP TABLE IF EXISTS "_flex_id_map_payment_changes";
DROP TABLE IF EXISTS "_flex_id_map_payments";
DROP TABLE IF EXISTS "_flex_id_map_permissions";
DROP TABLE IF EXISTS "_flex_id_map_preferences";
DROP TABLE IF EXISTS "_flex_id_map_refund_requests";
DROP TABLE IF EXISTS "_flex_id_map_role_permissions";
DROP TABLE IF EXISTS "_flex_id_map_roles";
DROP TABLE IF EXISTS "_flex_id_map_status";
DROP TABLE IF EXISTS "_flex_id_map_status_types";
DROP TABLE IF EXISTS "_flex_id_map_stripe_payment_details";
DROP TABLE IF EXISTS "_flex_id_map_systems";
DROP TABLE IF EXISTS "_flex_id_map_tax_countries";
DROP TABLE IF EXISTS "_flex_id_map_tax_country_administrative_divisions";
DROP TABLE IF EXISTS "_flex_id_map_tax_exemptions";
DROP TABLE IF EXISTS "_flex_id_map_tax_rates";
DROP TABLE IF EXISTS "_flex_id_map_user_permissions";
DROP TABLE IF EXISTS "_flex_id_map_user_preferences";
DROP TABLE IF EXISTS "_flex_id_map_user_profiles";
DROP TABLE IF EXISTS "_flex_id_map_user_roles";
DROP TABLE IF EXISTS "_flex_id_map_user_sessions";
DROP TABLE IF EXISTS "_flex_id_map_users";

DROP FUNCTION IF EXISTS flex_generate_prefixed_id(TEXT, TEXT);

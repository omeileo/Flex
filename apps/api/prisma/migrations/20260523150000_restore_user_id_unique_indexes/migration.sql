-- Restore user_id unique indexes dropped during string ID migrations

CREATE UNIQUE INDEX IF NOT EXISTS "fitness_profiles_user_id_key" ON "fitness_profiles"("user_id");
CREATE UNIQUE INDEX IF NOT EXISTS "user_app_settings_user_id_key" ON "user_app_settings"("user_id");
CREATE UNIQUE INDEX IF NOT EXISTS "cycle_profiles_user_id_key" ON "cycle_profiles"("user_id");

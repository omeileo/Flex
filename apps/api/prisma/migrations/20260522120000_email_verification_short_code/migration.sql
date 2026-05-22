-- AlterTable
ALTER TABLE "email_verification_tokens" ADD COLUMN "short_code" VARCHAR(6);

UPDATE "email_verification_tokens"
SET "short_code" = UPPER(SUBSTRING(MD5(RANDOM()::TEXT || "id"::TEXT) FROM 1 FOR 6))
WHERE "short_code" IS NULL;

ALTER TABLE "email_verification_tokens" ALTER COLUMN "short_code" SET NOT NULL;

CREATE UNIQUE INDEX "index_email_verification_tokens_short_code" ON "email_verification_tokens"("short_code");

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "user_role" TEXT,
    "action" VARCHAR(255) NOT NULL,
    "ip_address" VARCHAR(45),
    "initiator_type" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blacklisted_tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blacklisted_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_verification_tokens" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "email_verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "recipient_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,
    "author_type" VARCHAR(50) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "priority" VARCHAR(50) NOT NULL,
    "delivery_status_id" INTEGER NOT NULL,
    "read_status_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_contents" (
    "id" SERIAL NOT NULL,
    "notification_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "delivery_channel" VARCHAR(255) NOT NULL,
    "template_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "notification_contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_templates" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "template_content" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "notification_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_tokens" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_changes" (
    "id" SERIAL NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "change_initiator_type" VARCHAR(50) NOT NULL,
    "change_initiator_id" INTEGER NOT NULL,
    "change_type" VARCHAR(50) NOT NULL,
    "old_value" TEXT,
    "new_value" TEXT,
    "change_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_changes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "initiator_type" VARCHAR(50) NOT NULL,
    "initiator_id" INTEGER NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "tax" DECIMAL(10,2) NOT NULL,
    "fees" DECIMAL(10,2) NOT NULL,
    "stripe_fee" DECIMAL(10,2),
    "delivery_fee" DECIMAL(10,2),
    "discount" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(10) NOT NULL,
    "status_id" INTEGER NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe_payment_intents" (
    "id" TEXT NOT NULL,
    "payment_intent_id" VARCHAR(255) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "stripe_payment_intents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe_payment_details" (
    "id" SERIAL NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "payment_intent_id" VARCHAR(255) NOT NULL,
    "payment_status" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "canceled_at" TIMESTAMP(6),
    "cancellation_reason" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "stripe_payment_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preferences" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refund_requests" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "refund_id" VARCHAR(255) NOT NULL,
    "external_system_payment_details_id" INTEGER NOT NULL,
    "paymentsId" INTEGER,
    "status" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(10) NOT NULL,
    "refund_receipt_number" VARCHAR(255),
    "refund_reason" VARCHAR(255),
    "refund_failure_reason" VARCHAR(255),
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "refund_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "type_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "display_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_types" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "status_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_permissions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,
    "is_granted" BOOLEAN NOT NULL,
    "assigned_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_preferences" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "preference_id" INTEGER NOT NULL,
    "value" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" SERIAL NOT NULL,
    "stripe_customer_id" VARCHAR(255),
    "stripe_connect_account_id" VARCHAR(255),
    "firebase_user_id" VARCHAR(255),
    "mobile_number" VARCHAR(20),
    "first_name" VARCHAR(255) NOT NULL,
    "middle_name" VARCHAR(255),
    "last_name" VARCHAR(255) NOT NULL,
    "date_of_birth" DATE,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "assigned_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "session_token" VARCHAR(512) NOT NULL,
    "login_time" TIMESTAMP(6) NOT NULL,
    "logout_time" TIMESTAMP(6),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "user_status_id" INTEGER NOT NULL,
    "user_profile_id" INTEGER NOT NULL,
    "password_attempts" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "systems" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "is_internal" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "systems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "index_audit_logs_user_id" ON "audit_logs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "blacklisted_tokens_token_key" ON "blacklisted_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "index_email_verification_tokens_token" ON "email_verification_tokens"("token");

-- CreateIndex
CREATE INDEX "index_email_verification_tokens_user_id" ON "email_verification_tokens"("user_id");

-- CreateIndex
CREATE INDEX "index_notifications_delivery_status_id" ON "notifications"("delivery_status_id");

-- CreateIndex
CREATE INDEX "index_notifications_read_status_id" ON "notifications"("read_status_id");

-- CreateIndex
CREATE INDEX "index_notifications_recipient_id" ON "notifications"("recipient_id");

-- CreateIndex
CREATE INDEX "index_notification_contents_template_id" ON "notification_contents"("template_id");

-- CreateIndex
CREATE INDEX "index_notification_contents_notification_id" ON "notification_contents"("notification_id");

-- CreateIndex
CREATE INDEX "index_notification_contents_title" ON "notification_contents"("title");

-- CreateIndex
CREATE INDEX "index_notification_templates_name" ON "notification_templates"("name");

-- CreateIndex
CREATE UNIQUE INDEX "index_password_reset_tokens_token" ON "password_reset_tokens"("token");

-- CreateIndex
CREATE INDEX "index_password_reset_tokens_user_id" ON "password_reset_tokens"("user_id");

-- CreateIndex
CREATE INDEX "index_payment_changes_initiator" ON "payment_changes"("change_initiator_id", "change_initiator_type");

-- CreateIndex
CREATE INDEX "index_payment_changes_payment_id" ON "payment_changes"("payment_id");

-- CreateIndex
CREATE INDEX "index_payments_initiator" ON "payments"("initiator_id", "initiator_type");

-- CreateIndex
CREATE INDEX "index_payments_status_id" ON "payments"("status_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_payment_intents_payment_intent_id" ON "stripe_payment_intents"("payment_intent_id");

-- CreateIndex
CREATE INDEX "index_stripe_payment_intents_payment_intent_id" ON "stripe_payment_intents"("payment_intent_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_external_system_payment_details_payment_intent_id" ON "stripe_payment_details"("payment_intent_id");

-- CreateIndex
CREATE INDEX "index_external_system_payment_details_payment_id" ON "stripe_payment_details"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_permissions_name" ON "permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "index_refund_requests_refund_id" ON "refund_requests"("refund_id");

-- CreateIndex
CREATE INDEX "index_refund_requests_external_system_payment_details_id" ON "refund_requests"("external_system_payment_details_id");

-- CreateIndex
CREATE INDEX "index_refund_requests_user_id" ON "refund_requests"("user_id");

-- CreateIndex
CREATE INDEX "index_role_permissions_permission_id" ON "role_permissions"("permission_id");

-- CreateIndex
CREATE INDEX "index_role_permissions_role_id" ON "role_permissions"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_role_permissions_unique" ON "role_permissions"("role_id", "permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_roles_name" ON "roles"("name");

-- CreateIndex
CREATE INDEX "index_status_name" ON "status"("name");

-- CreateIndex
CREATE INDEX "index_status_type_id" ON "status"("type_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_status_type_name" ON "status"("type_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "index_status_types_type" ON "status_types"("type");

-- CreateIndex
CREATE INDEX "index_user_permissions_permission_id" ON "user_permissions"("permission_id");

-- CreateIndex
CREATE INDEX "index_user_permissions_user_id" ON "user_permissions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_user_permissions_unique" ON "user_permissions"("user_id", "permission_id");

-- CreateIndex
CREATE INDEX "index_user_preferences_preference_id" ON "user_preferences"("preference_id");

-- CreateIndex
CREATE INDEX "index_user_preferences_user_id" ON "user_preferences"("user_id");

-- CreateIndex
CREATE INDEX "index_user_profiles_first_name" ON "user_profiles"("first_name");

-- CreateIndex
CREATE INDEX "index_user_profiles_last_name" ON "user_profiles"("last_name");

-- CreateIndex
CREATE INDEX "index_user_roles_role_id" ON "user_roles"("role_id");

-- CreateIndex
CREATE INDEX "index_user_roles_user_id" ON "user_roles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_user_roles_unique" ON "user_roles"("user_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_user_sessions_session_token" ON "user_sessions"("session_token");

-- CreateIndex
CREATE INDEX "index_user_sessions_user_id" ON "user_sessions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_users_email" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_profile_id_key" ON "users"("user_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_systems_name" ON "systems"("name");

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "email_verification_tokens" ADD CONSTRAINT "email_verification_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_delivery_status_id_fkey" FOREIGN KEY ("delivery_status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_read_status_id_fkey" FOREIGN KEY ("read_status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification_contents" ADD CONSTRAINT "notification_contents_notification_id_fkey" FOREIGN KEY ("notification_id") REFERENCES "notifications"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment_changes" ADD CONSTRAINT "payment_changes_change_initiator_id_fkey" FOREIGN KEY ("change_initiator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment_changes" ADD CONSTRAINT "payment_changes_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_initiator_id_fkey" FOREIGN KEY ("initiator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stripe_payment_intents" ADD CONSTRAINT "stripe_payment_intents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stripe_payment_details" ADD CONSTRAINT "stripe_payment_details_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "refund_requests" ADD CONSTRAINT "refund_requests_external_system_payment_details_id_fkey" FOREIGN KEY ("external_system_payment_details_id") REFERENCES "stripe_payment_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "refund_requests" ADD CONSTRAINT "refund_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "refund_requests" ADD CONSTRAINT "refund_requests_paymentsId_fkey" FOREIGN KEY ("paymentsId") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "status" ADD CONSTRAINT "status_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "status_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_preference_id_fkey" FOREIGN KEY ("preference_id") REFERENCES "preferences"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_ibfk_1" FOREIGN KEY ("user_status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

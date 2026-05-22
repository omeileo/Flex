import { env } from '../../../../src/shared/functions/envConfig'

export default [
  {
    id: 0,
    email: env.SUPPORT_EMAIL_ADDRESS,
    password_hash: '$argon2id$v=19$m=19456,t=2,p=1$CZ8lE3Tg9cqEJxNRayetJg$qwnTsT7HPwu7RcdwE/Os8Vu3RIeDnlcl8ZxFhDlX8yo',
    user_status_id: 1,
    user_profile_id: 0,
    password_attempts: 0
  },
  {
    id: 1000000,
    email: env.ADMIN_EMAIL_ADDRESS,
    password_hash: '$argon2id$v=19$m=19456,t=2,p=1$CZ8lE3Tg9cqEJxNRayetJg$qwnTsT7HPwu7RcdwE/Os8Vu3RIeDnlcl8ZxFhDlX8yo',
    user_status_id: 1,
    user_profile_id: 1000000,
    password_attempts: 0
  },
  {
    id: 1000001,
    email: 'joel@hurrier.com',
    password_hash: '$argon2id$v=19$m=19456,t=2,p=1$CZ8lE3Tg9cqEJxNRayetJg$qwnTsT7HPwu7RcdwE/Os8Vu3RIeDnlcl8ZxFhDlX8yo',
    user_status_id: 1,
    user_profile_id: 1000001,
    password_attempts: 0
  },
  {
    id: 1000002,
    email: 'joel@hourrier.com',
    password_hash: '$argon2id$v=19$m=19456,t=2,p=1$CZ8lE3Tg9cqEJxNRayetJg$qwnTsT7HPwu7RcdwE/Os8Vu3RIeDnlcl8ZxFhDlX8yo',
    user_status_id: 1,
    user_profile_id: 1000002,
    password_attempts: 0
  },
  {
    id: 1000003,
    email: env.DEV_SUPPORT_EMAIL_ADDRESS,
    password_hash: '$argon2id$v=19$m=19456,t=2,p=1$CZ8lE3Tg9cqEJxNRayetJg$qwnTsT7HPwu7RcdwE/Os8Vu3RIeDnlcl8ZxFhDlX8yo',
    user_status_id: 1,
    user_profile_id: 1000003,
    password_attempts: 0
  }
]

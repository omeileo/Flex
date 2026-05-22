// model audit_logs {
//     id         Int      @id @default(autoincrement())
//     user_id    Int?
//     action     String   @db.VarChar(255)
//     ip_address String?  @db.VarChar(45)
//     user_agent String?
//     created_at DateTime @default(now()) @db.Timestamp(6)
//     users      users?   @relation(fields: [user_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

//     @@index([user_id], map: "index_audit_logs_user_id")
//   }

export type AuditLogAction = 'created' | 'updated' | 'deleted'

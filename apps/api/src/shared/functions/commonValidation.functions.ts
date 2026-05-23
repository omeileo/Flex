import { zodd } from './zod.functions'

/**
 * Custom validation functions.
 *
 * A collection of common validation functions.
 */
export const commonValidations = {
  /**
   * Validates a Hourrier-style prefixed string ID.
   */
  id: zodd
    .string()
    .min(1)
    .max(64)
    .regex(
      /^[a-z0-9_]+_[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/,
      'ID must be a valid prefixed string identifier'
    ),

  /**
   * Password Validation
   * - Ensures the password is at least 8 characters long.
   * - Contains at least one uppercase letter.
   * - Contains at least one lowercase letter.
   * - Contains at least one number.
   */
  password: zodd
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .refine((password: string) => /[A-Z]/.test(password), 'Password must contain at least one uppercase letter')
    .refine((password: string) => /[a-z]/.test(password), 'Password must contain at least one lowercase letter')
    .refine((password: string) => /[0-9]/.test(password), 'Password must contain at least one number'),

  date: zodd.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be in YYYY-MM-DD format')
}

// Example Use Case:
// export const GetUserSchema = z.object({
//   params: z.object({ id: commonValidations.id })
// })

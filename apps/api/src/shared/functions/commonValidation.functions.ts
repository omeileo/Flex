import { zodd } from './zod.functions'

/**
 * Custom validation functions.
 *
 * A collection of common validation functions.
 */
export const commonValidations = {
  /**
   * Validates an ID value.
   * @param data - The ID value to validate.
   * @returns The validated ID as a number.
   * @throws {Error} If the ID is not a numeric value or is not a positive number.
   */
  id: zodd
    .string()
    .refine((data: string) => !isNaN(Number(data)), 'ID must be a numeric value')
    .transform(Number)
    .refine((num: number) => num > 0, 'ID must be a positive number'),

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

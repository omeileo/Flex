import { zodd } from '../functions/zod.functions'

export const userContactDetailsSchema = zodd.object({
  id: zodd.number(),
  firstName: zodd.string(),
  lastName: zodd.string(),
  email: zodd.string().email(),
  phoneNumber: zodd.string().nullable()
})

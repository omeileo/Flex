import { zodd } from '@/shared/functions/zod.functions'

export const statusSchema = zodd
  .object({
    name: zodd.string(),
    displayName: zodd.string(),
    description: zodd.string()
  })
  .openapi({
    example: {
      name: 'pending',
      displayName: 'Pending',
      description: 'The request is pending'
    }
  })

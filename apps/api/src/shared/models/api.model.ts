import { zodd } from '@/shared/functions/zod.functions'
import { ZodTypeAny } from 'zod'

export const paginatedResponseSchema = <T extends ZodTypeAny>(dataSchema: T) =>
  zodd.object({
    currentPage: zodd.number(),
    totalPages: zodd.number(),
    totalRecords: zodd.number(),
    records: zodd.array(dataSchema)
  })

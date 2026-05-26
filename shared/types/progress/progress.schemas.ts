import { z } from 'zod'

export const progressWeeklyVolumeDaySchema = z.object({
  dayKey: z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']),
  volumeKg: z.number().nonnegative()
})

export const progressMetricsSchema = z.object({
  workoutsCompletedThisMonth: z.number().int().nonnegative(),
  totalVolumeKg: z.number().nonnegative(),
  currentStreakDays: z.number().int().nonnegative(),
  personalRecordsCount: z.number().int().nonnegative(),
  weeklyVolume: z.array(progressWeeklyVolumeDaySchema).length(7)
})

export type ProgressWeeklyVolumeDay = z.infer<typeof progressWeeklyVolumeDaySchema>
export type ProgressMetrics = z.infer<typeof progressMetricsSchema>

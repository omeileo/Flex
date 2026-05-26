import type { ProgressMetrics } from '@flex/shared/types/progress/progress.schemas'
import { ProgressBarChartDatum } from '@shared/components/ProgressBarChart/ProgressBarChart.types'

export type ProgressPresentationStat = {
  id: 'workouts' | 'volume' | 'streak' | 'prs'
  label: string
  value: string
  hint: string
}

export type ProgressPresentationInput = {
  metrics: ProgressMetrics | null
  labels: {
    workouts: string
    volume: string
    streak: string
    prs: string
    workoutsHint: string
    volumeHint: string
    streakHint: string
    prsHint: string
    weeklyDays: Record<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun', string>
  }
}

export type ProgressPresentation = {
  stats: ProgressPresentationStat[]
  featuredStatId: ProgressPresentationStat['id']
  weeklyVolume: ProgressBarChartDatum[]
}

export const formatProgressVolumeKg = (volumeKg: number) => {
  if (volumeKg >= 1000) {
    const compact = volumeKg / 1000
    const formatted = compact.toFixed(1)

    return `${formatted.replace(/\.0$/, '')}k`
  }

  return `${Math.round(volumeKg)}`
}

export const buildProgressPresentation = ({ metrics, labels }: ProgressPresentationInput): ProgressPresentation => {
  const safeMetrics = metrics ?? {
    workoutsCompletedThisMonth: 0,
    totalVolumeKg: 0,
    currentStreakDays: 0,
    personalRecordsCount: 0,
    weeklyVolume: [
      { dayKey: 'mon', volumeKg: 0 },
      { dayKey: 'tue', volumeKg: 0 },
      { dayKey: 'wed', volumeKg: 0 },
      { dayKey: 'thu', volumeKg: 0 },
      { dayKey: 'fri', volumeKg: 0 },
      { dayKey: 'sat', volumeKg: 0 },
      { dayKey: 'sun', volumeKg: 0 }
    ]
  }

  const stats: ProgressPresentationStat[] = [
    {
      id: 'workouts',
      label: labels.workouts,
      value: `${safeMetrics.workoutsCompletedThisMonth}`,
      hint: labels.workoutsHint
    },
    {
      id: 'volume',
      label: labels.volume,
      value: formatProgressVolumeKg(safeMetrics.totalVolumeKg),
      hint: labels.volumeHint
    },
    {
      id: 'streak',
      label: labels.streak,
      value: `${safeMetrics.currentStreakDays}`,
      hint: labels.streakHint
    },
    {
      id: 'prs',
      label: labels.prs,
      value: `${safeMetrics.personalRecordsCount}`,
      hint: labels.prsHint
    }
  ]

  return {
    stats,
    featuredStatId: 'streak',
    weeklyVolume: safeMetrics.weeklyVolume.map((entry) => ({
      id: entry.dayKey,
      label: labels.weeklyDays[entry.dayKey],
      value: entry.volumeKg
    }))
  }
}

import type {
  ProgressMetricsReferenceDate,
  ProgressMetricsResult,
  ProgressSession,
  ProgressSessionSet
} from './progress.types'

const WEEKDAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const

const toDateKey = (value: ProgressMetricsReferenceDate, timeZone: string) => {
  const date = value instanceof Date ? value : new Date(value)

  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date)
}

const toMonthKey = (value: ProgressMetricsReferenceDate, timeZone: string) => {
  const date = value instanceof Date ? value : new Date(value)

  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit'
  }).format(date)
}

const getWeekdayIndex = (value: ProgressMetricsReferenceDate, timeZone: string) => {
  const date = value instanceof Date ? value : new Date(value)
  const weekday = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'short' }).format(date)
  const lookup: Record<string, number> = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6
  }

  return lookup[weekday] ?? 0
}

const startOfWeekDateKey = (referenceDate: ProgressMetricsReferenceDate, timeZone: string) => {
  const referenceKey = toDateKey(referenceDate, timeZone)
  const weekdayIndex = getWeekdayIndex(referenceDate, timeZone)
  const referenceUtc = Date.parse(`${referenceKey}T12:00:00.000Z`)

  return toDateKey(new Date(referenceUtc - weekdayIndex * 24 * 60 * 60 * 1000), timeZone)
}

const addDaysToDateKey = (dateKey: string, days: number) => {
  const nextDate = Date.parse(`${dateKey}T12:00:00.000Z`) + days * 24 * 60 * 60 * 1000

  return toDateKey(new Date(nextDate), 'UTC')
}

export const calculateSetVolumeKg = (set: ProgressSessionSet) => {
  if (!set.completed) {
    return 0
  }

  const reps = set.repsCompleted ?? 0
  const weight = set.weightKg ?? 0

  if (reps <= 0 || weight <= 0) {
    return 0
  }

  return reps * weight
}

export const calculateSessionVolumeKg = (sets: ProgressSessionSet[]) =>
  sets.reduce((total, set) => total + calculateSetVolumeKg(set), 0)

export const computeProgressMetrics = (
  sessions: ProgressSession[],
  referenceDate: ProgressMetricsReferenceDate = new Date(),
  timeZone = 'UTC'
): ProgressMetricsResult => {
  const completedSessions = sessions
    .filter((session) => Boolean(session.completedAt))
    .sort((left, right) => left.completedAt.localeCompare(right.completedAt))

  const currentMonthKey = toMonthKey(referenceDate, timeZone)
  const weekStartKey = startOfWeekDateKey(referenceDate, timeZone)
  const weeklyVolumeMap = Object.fromEntries(WEEKDAY_KEYS.map((dayKey) => [dayKey, 0])) as Record<
    (typeof WEEKDAY_KEYS)[number],
    number
  >

  let totalVolumeKg = 0
  let workoutsCompletedThisMonth = 0
  const workoutDateKeys = new Set<string>()
  const bestWeightByExercise = new Map<string, number>()
  let personalRecordsCount = 0

  completedSessions.forEach((session) => {
    const sessionDateKey = toDateKey(session.completedAt, timeZone)
    const sessionVolumeKg = calculateSessionVolumeKg(session.sets)

    totalVolumeKg += sessionVolumeKg
    workoutDateKeys.add(sessionDateKey)

    if (toMonthKey(session.completedAt, timeZone) === currentMonthKey) {
      workoutsCompletedThisMonth += 1
    }

    for (let dayOffset = 0; dayOffset < 7; dayOffset += 1) {
      const dayKey = WEEKDAY_KEYS[dayOffset]
      const dayDateKey = addDaysToDateKey(weekStartKey, dayOffset)

      if (dayDateKey === sessionDateKey) {
        weeklyVolumeMap[dayKey] += sessionVolumeKg
      }
    }

    session.sets.forEach((set) => {
      if (!set.completed || set.weightKg == null || set.weightKg <= 0) {
        return
      }

      const previousBest = bestWeightByExercise.get(set.exerciseId) ?? 0

      if (set.weightKg > previousBest) {
        personalRecordsCount += 1
        bestWeightByExercise.set(set.exerciseId, set.weightKg)
      }
    })
  })

  const currentStreakDays = calculateWorkoutStreak(workoutDateKeys, referenceDate, timeZone)

  return {
    workoutsCompletedThisMonth,
    totalVolumeKg,
    currentStreakDays,
    personalRecordsCount,
    weeklyVolume: WEEKDAY_KEYS.map((dayKey) => ({
      dayKey,
      volumeKg: weeklyVolumeMap[dayKey]
    }))
  }
}

export const calculateWorkoutStreak = (
  workoutDateKeys: Set<string>,
  referenceDate: ProgressMetricsReferenceDate = new Date(),
  timeZone = 'UTC'
) => {
  if (workoutDateKeys.size === 0) {
    return 0
  }

  const todayKey = toDateKey(referenceDate, timeZone)
  const yesterdayKey = addDaysToDateKey(todayKey, -1)

  let cursorKey = todayKey

  if (!workoutDateKeys.has(todayKey)) {
    if (!workoutDateKeys.has(yesterdayKey)) {
      return 0
    }

    cursorKey = yesterdayKey
  }

  let streak = 0

  while (workoutDateKeys.has(cursorKey)) {
    streak += 1
    cursorKey = addDaysToDateKey(cursorKey, -1)
  }

  return streak
}

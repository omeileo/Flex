import { describe, expect, it } from 'vitest'

import { calculateWorkoutStreak, computeProgressMetrics } from './progress.metrics'
import type { ProgressSession } from './progress.types'

const buildSession = (id: string, completedAt: string, sets: ProgressSession['sets']): ProgressSession => ({
  id,
  completedAt,
  sets
})

describe('computeProgressMetrics', () => {
  it('returns zeroed metrics when no sessions exist', () => {
    const metrics = computeProgressMetrics([], '2026-05-24T12:00:00.000Z', 'UTC')

    expect(metrics).toEqual({
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
    })
  })

  it('aggregates monthly workouts, volume, weekly chart, streak, and PRs', () => {
    const sessions: ProgressSession[] = [
      buildSession('one', '2026-05-19T10:00:00.000Z', [
        {
          exerciseId: 'squat',
          setNumber: 1,
          repsCompleted: 8,
          weightKg: 60,
          completed: true
        }
      ]),
      buildSession('two', '2026-05-20T10:00:00.000Z', [
        {
          exerciseId: 'squat',
          setNumber: 1,
          repsCompleted: 5,
          weightKg: 62.5,
          completed: true
        }
      ]),
      buildSession('three', '2026-05-24T10:00:00.000Z', [
        {
          exerciseId: 'bench',
          setNumber: 1,
          repsCompleted: 10,
          weightKg: 40,
          completed: true
        }
      ])
    ]

    const metrics = computeProgressMetrics(sessions, '2026-05-24T12:00:00.000Z', 'UTC')

    expect(metrics.workoutsCompletedThisMonth).toBe(3)
    expect(metrics.totalVolumeKg).toBe(8 * 60 + 5 * 62.5 + 10 * 40)
    expect(metrics.currentStreakDays).toBe(1)
    expect(metrics.personalRecordsCount).toBe(3)
    expect(metrics.weeklyVolume).toEqual([
      { dayKey: 'mon', volumeKg: 0 },
      { dayKey: 'tue', volumeKg: 480 },
      { dayKey: 'wed', volumeKg: 312.5 },
      { dayKey: 'thu', volumeKg: 0 },
      { dayKey: 'fri', volumeKg: 0 },
      { dayKey: 'sat', volumeKg: 0 },
      { dayKey: 'sun', volumeKg: 400 }
    ])
  })
})

describe('calculateWorkoutStreak', () => {
  it('counts consecutive days ending today', () => {
    const streak = calculateWorkoutStreak(
      new Set(['2026-05-22', '2026-05-23', '2026-05-24']),
      '2026-05-24T18:00:00.000Z',
      'UTC'
    )

    expect(streak).toBe(3)
  })

  it('allows streak to continue from yesterday when today is empty', () => {
    const streak = calculateWorkoutStreak(
      new Set(['2026-05-22', '2026-05-23']),
      '2026-05-24T18:00:00.000Z',
      'UTC'
    )

    expect(streak).toBe(2)
  })
})

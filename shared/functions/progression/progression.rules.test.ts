import { describe, expect, it } from 'vitest'

import { RepsScheme } from '../../enums/repsScheme.enum'
import { applyWeeklyProgression } from './progression.rules'

describe('applyWeeklyProgression', () => {
  it('increases weight when all sets completed', () => {
    const result = applyWeeklyProgression(
      {
        weekNumber: 1,
        exercises: [
          {
            exerciseId: 1,
            exerciseName: 'Squat',
            orderIndex: 0,
            restSeconds: 90,
            sets: [
              {
                setNumber: 1,
                targetReps: 8,
                targetWeightKg: 60,
                repsScheme: RepsScheme.STRAIGHT
              }
            ]
          }
        ]
      },
      [{ exerciseId: 1, setNumber: 1, completed: true, repsCompleted: 8, weightKg: 60 }]
    )

    expect(result.exercises[0].sets[0].targetWeightKg).toBe(62.5)
    expect(result.changes).toHaveLength(1)
  })

  it('does not progress when sets incomplete', () => {
    const result = applyWeeklyProgression(
      {
        weekNumber: 1,
        exercises: [
          {
            exerciseId: 1,
            exerciseName: 'Squat',
            orderIndex: 0,
            restSeconds: 90,
            sets: [
              {
                setNumber: 1,
                targetReps: 8,
                targetWeightKg: 60,
                repsScheme: RepsScheme.STRAIGHT
              }
            ]
          }
        ]
      },
      [{ exerciseId: 1, setNumber: 1, completed: false }]
    )

    expect(result.exercises[0].sets[0].targetWeightKg).toBe(60)
    expect(result.changes).toHaveLength(0)
  })
})

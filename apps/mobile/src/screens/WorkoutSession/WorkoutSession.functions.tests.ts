import {
  calculateSessionVolumeKg,
  countCompletedSets,
  formatExerciseLogSummary,
  formatVolumeLabel
} from './WorkoutSession.functions'
import { SessionExercise } from './WorkoutSession.types'

const exercises: SessionExercise[] = [
  {
    exerciseId: 'sq',
    exerciseName: 'Barbell Squat',
    prescription: '3×8',
    sets: [
      {
        setNumber: 1,
        reps: 8,
        weightKg: 40,
        status: 'completed',
        previousLabel: '8×38'
      },
      {
        setNumber: 2,
        reps: 8,
        weightKg: 42,
        status: 'pending',
        previousLabel: '8×38'
      }
    ]
  }
]

describe('WorkoutSession.functions', () => {
  it('calculates completed set volume', () => {
    expect(calculateSessionVolumeKg(exercises)).toBe(320)
    expect(countCompletedSets(exercises)).toBe(1)
  })

  it('formats volume labels', () => {
    expect(formatVolumeLabel(4280)).toBe('4.3k kg')
    expect(formatVolumeLabel(320)).toBe('320 kg')
  })

  it('formats exercise log summaries', () => {
    expect(formatExerciseLogSummary(exercises[0])).toBe('8×40 kg')
  })
})

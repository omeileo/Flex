import { PlannedWorkout } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'

import { buildTrainingPlanPresentation, buildWeekStripDays } from './trainingPlanPresentation.functions'

const mockWorkout = (dayIndex: number, name: string): PlannedWorkout => ({
  dayIndex,
  name,
  exercises: [
    {
      exerciseId: `ex-${dayIndex}`,
      exerciseName: 'Squat',
      orderIndex: 0,
      sets: [{ setNumber: 1, targetReps: 8, targetWeightKg: 40, repsScheme: 'STRAIGHT' as never }],
      restSeconds: 90
    }
  ]
})

describe('trainingPlanPresentation.functions', () => {
  it('builds week strip with today marker', () => {
    const days = buildWeekStripDays([mockWorkout(0, 'Push')], 1)

    expect(days[0]?.isToday).toBe(true)
    expect(days[0]?.hasWorkout).toBe(true)
  })

  it('maps plan workouts into presentation model', () => {
    const presentation = buildTrainingPlanPresentation(
      {
        status: 'ACTIVE' as never,
        weekNumber: 2,
        workouts: [mockWorkout(0, 'Upper Push'), mockWorkout(2, 'Easy Run')]
      },
      {
        programTitle: 'Test Plan',
        blurb: 'Coach blurb',
        phases: [{ id: 'foundation', name: 'Foundation', weeks: 'W1–4' }],
        dateRange: 'May 19 – May 25'
      }
    )

    expect(presentation.weekNumber).toBe(2)
    expect(presentation.weekPlans[0]?.workoutCount).toBe(2)
    expect(presentation.todayWorkouts.length).toBeGreaterThan(0)
  })
})

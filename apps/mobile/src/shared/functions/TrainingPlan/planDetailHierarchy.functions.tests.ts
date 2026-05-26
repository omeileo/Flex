import { PlanStatus } from '@flex/shared/enums/planStatus.enum'

import { buildPlanDetailHierarchy } from './planDetailHierarchy.functions'

const mockPlan = {
  status: PlanStatus.ACTIVE,
  weekNumber: 1,
  workouts: [
    {
      dayIndex: 0,
      name: 'Upper Push',
      exercises: [
        {
          exerciseId: 'ohp',
          exerciseName: 'Standing Barbell OHP',
          orderIndex: 0,
          sets: [{ setNumber: 1, targetReps: 8, targetWeightKg: 40, repsScheme: 'STRAIGHT' as never }],
          restSeconds: 90
        }
      ]
    },
    {
      dayIndex: 5,
      name: 'Easy Run',
      exercises: [
        {
          exerciseId: 'run',
          exerciseName: '5K Easy Run',
          orderIndex: 0,
          sets: [{ setNumber: 1, targetSeconds: 1800, repsScheme: 'STRAIGHT' as never }],
          restSeconds: 0
        }
      ]
    }
  ]
}

const mockCopy = {
  programTitle: '12-Week Strength + 5K',
  blurb: 'Coach blurb',
  statsLabel: '12 weeks',
  deloadNote: 'Deload note',
  runningCopy: '2× easy runs',
  restDayLabel: 'Rest',
  totalWeeks: 12,
  phases: [
    {
      id: 'foundation',
      name: 'Foundation',
      weeksLabel: 'Weeks 1–4',
      weekStart: 1,
      weekEnd: 4,
      rpe: 'RPE 6–7',
      goal: 'Build volume',
      progression: '+2 reps',
      restCompounds: '2–3 min',
      restAccessories: '60s'
    }
  ]
}

describe('buildPlanDetailHierarchy', () => {
  it('builds program overview and week schedule days', () => {
    const hierarchy = buildPlanDetailHierarchy(mockPlan, mockCopy)

    expect(hierarchy.program.programTitle).toBe('12-Week Strength + 5K')
    expect(hierarchy.program.phases).toHaveLength(1)

    const week = hierarchy.getWeekSchedule(1)

    expect(week.weekNumber).toBe(1)
    expect(week.days.find((day) => day.dayLabel === 'Mon')?.hasWorkout).toBe(true)
    expect(week.days.find((day) => day.dayLabel === 'Sun')?.hasWorkout).toBe(false)
  })

  it('resolves phase for week number', () => {
    const hierarchy = buildPlanDetailHierarchy(mockPlan, mockCopy)

    expect(hierarchy.resolvePhaseForWeek(2).id).toBe('foundation')
  })
})

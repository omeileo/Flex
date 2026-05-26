import { buildExercisePreview, buildGeneratePlanRequest, buildPlanRecapItems } from '../planCreation.functions'

describe('planCreation.functions', () => {
  it('builds generate plan request from focus and profile', () => {
    const request = buildGeneratePlanRequest('hybrid', {
      goal: 'general fitness',
      experienceLevel: 'intermediate',
      daysPerWeek: 4,
      sessionMinutes: 60,
      equipment: ['barbell'],
      injuries: []
    })

    expect(request.profileOverride?.goal).toBe('Hybrid strength and running')
    expect(request.profileOverride?.daysPerWeek).toBe(4)
  })

  it('builds recap items from profile and focus', () => {
    const items = buildPlanRecapItems(
      {
        goal: 'strength',
        experienceLevel: 'intermediate',
        daysPerWeek: 5,
        sessionMinutes: 60,
        equipment: ['barbell', 'dumbbells'],
        injuries: ['shoulder']
      },
      'hybrid',
      (key, params) => {
        if (key === 'planHome.recap.goal') {
          return `Goal: ${params?.focus}`
        }

        if (key === 'planHome.focus.hybridRecap') {
          return 'Hybrid strength and running'
        }

        if (key === 'planHome.recap.injuries') {
          return `Injuries: ${params?.injuries}`
        }

        if (key === 'planHome.recap.equipment') {
          return `Equipment: ${params?.equipment}`
        }

        return key
      }
    )

    expect(items[0]).toBe('Goal: Hybrid strength and running')
    expect(items.some((item) => item.includes('shoulder'))).toBe(true)
  })

  it('builds exercise preview with overflow count', () => {
    const preview = buildExercisePreview({
      dayIndex: 0,
      name: 'Upper Push',
      exercises: [
        {
          exerciseId: '1',
          exerciseName: 'OHP',
          orderIndex: 0,
          sets: [{ setNumber: 1, targetReps: 8 }]
        },
        {
          exerciseId: '2',
          exerciseName: 'Incline DB',
          orderIndex: 1,
          sets: [{ setNumber: 1, targetReps: 10 }]
        },
        {
          exerciseId: '3',
          exerciseName: 'Fly',
          orderIndex: 2,
          sets: [{ setNumber: 1, targetReps: 12 }]
        },
        {
          exerciseId: '4',
          exerciseName: 'Triceps',
          orderIndex: 3,
          sets: [{ setNumber: 1, targetReps: 12 }]
        }
      ]
    })

    expect(preview).toBe('OHP · Incline DB · Fly +1')
  })
})

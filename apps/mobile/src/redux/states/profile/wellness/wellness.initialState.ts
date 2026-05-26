import { WellnessState } from '@shared/types/wellness.types'

const wellnessInitialState: WellnessState & { hydrated: boolean } = {
  conditions: [
    {
      id: 'cond-shoulder',
      bodyArea: 'shoulder',
      label: 'Left shoulder',
      status: 'managing',
      movementRestrictions: ['Overhead pressing', 'Pull-ups'],
      aggravatingExercises: [{ customLabel: 'Overhead press' }, { customLabel: 'Arnold press' }],
      createdAt: '2026-01-01T00:00:00.000Z'
    },
    {
      id: 'cond-back',
      bodyArea: 'lowerBack',
      label: 'Lower back',
      status: 'flareUp',
      movementRestrictions: ['Deep flexion'],
      aggravatingExercises: [{ customLabel: 'Barbell back squat' }],
      createdAt: '2026-01-15T00:00:00.000Z'
    }
  ],
  excludedExerciseIds: ['upright-row', 'box-jumps', 'barbell-back-squat'],
  hydrated: false
}

export default wellnessInitialState

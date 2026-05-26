export const onboardingGoals = [
  'Build muscle',
  'Lose fat',
  'Improve endurance',
  'Return from injury',
  'General fitness'
]

export const injuryAreas = ['Shoulder', 'Knee', 'Lower back', 'Hip', 'Ankle', 'Wrist', 'None']

export const dietPreferences = ['High protein', 'Plant-based', 'Calorie deficit', 'No preference']

export const ageBands = ['18–24', '25–34', '35–44', '45–54', '55+']

export const injuryStateOptions = [
  {
    id: 'recovered',
    labelKey: 'profileOnboarding.injuryStates.recovered.label',
    descriptionKey: 'profileOnboarding.injuryStates.recovered.description'
  },
  {
    id: 'managing',
    labelKey: 'profileOnboarding.injuryStates.managing.label',
    descriptionKey: 'profileOnboarding.injuryStates.managing.description'
  },
  {
    id: 'acute',
    labelKey: 'profileOnboarding.injuryStates.acute.label',
    descriptionKey: 'profileOnboarding.injuryStates.acute.description'
  }
] as const

export const restrictionMovements = ['Overhead press', 'Deep squat', 'Running impact', 'Heavy deadlift', 'Jumping']

export const fitnessLevelKeys = ['beginner', 'intermediate', 'advanced'] as const

export {
  commonEquipmentIds,
  equipmentPickerCategories,
  locationPresetOptions,
  predefinedEquipmentCatalog
} from '@shared/dictionary/equipmentCatalog.dictionary'

export const TOTAL_ONBOARDING_STEPS = 11
export const PROFILE_GYM_STEPS = 9
export const PLAN_GENERATING_STEP = 10

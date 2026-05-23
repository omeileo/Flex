import { WorkoutModality } from '@shared/types/workoutModality.types'

export type MockWeekPlan = {
  weekNumber: number
  dateRange: string
  workoutCount: number
  totalVolume: string
  isCurrent?: boolean
  workouts: Array<{
    id: string
    title: string
    modality: WorkoutModality
    durationMinutes: number
  }>
}

export const pillTabs = [
  { key: 'today' as const, label: 'Today' },
  { key: 'plan' as const, label: 'Plan' },
  { key: 'coach' as const, label: 'Coach' },
  { key: 'profile' as const, label: 'Profile' }
]

export const planProgramTitle = '12-Week Strength + 5K'

export const planBlurb =
  'This block builds pressing and pulling strength while keeping your shoulder happy — partial-ROM flies, strict OHP, Zercher squats (no rack). Two easy runs each week support your sub-25 5K without interfering with leg recovery.'

export const planFocusOptions = [
  {
    id: 'strength',
    title: 'Strength block',
    subtitle: '8–12 week progressive lifting'
  },
  {
    id: 'running',
    title: 'Running goal',
    subtitle: '5K / 10K / half marathon'
  },
  {
    id: 'hybrid',
    title: 'Hybrid',
    subtitle: 'Lift + run in one calendar'
  },
  {
    id: 'injury',
    title: 'Return from injury',
    subtitle: 'Lower volume, physio-safe'
  }
]

export const planInputsRecap = [
  'Goal: Build strength with joint-friendly volume',
  'Shoulder: partial-ROM pressing, no behind-neck work',
  'Equipment: Barbell, DBs, pull-up bar — no squat rack (Zercher)',
  'Running: 2×/week easy 5K toward sub-25',
  'Schedule: Lift Mon–Fri, run Sat/Sun'
]

export const planPhases = [
  {
    id: 'foundation',
    name: 'Foundation',
    weeks: 'Weeks 1–4',
    rpe: 'RPE 6–7',
    goal: 'Establish technique, build joint resilience, increase weekly volume.',
    progression: '+1–2 reps or 2.5–5 lb weekly',
    restCompounds: '2–3 min',
    restAccessories: '60–120s'
  },
  {
    id: 'strength',
    name: 'Strength',
    weeks: 'Weeks 5–8',
    rpe: 'RPE 7–8',
    goal: 'Increase absolute strength while maintaining joint tolerance.',
    progression: '+5 lb barbell lifts weekly',
    restCompounds: '2–3 min',
    restAccessories: '60–90s'
  },
  {
    id: 'peak',
    name: 'Peak',
    weeks: 'Weeks 9–12',
    rpe: 'RPE 8–9',
    goal: 'Peak strength and power while preserving muscle and joint health.',
    progression: 'Heavy singles/doubles on primary lifts',
    restCompounds: '3–4 min',
    restAccessories: '60–120s'
  }
]

export const planWeekDays = [
  {
    id: 'mon',
    dayLabel: 'Mon',
    title: 'Upper Push',
    preview: 'OHP 3×5–8 · Incline DB 3×10 · Flat DB…',
    modality: 'strength' as WorkoutModality
  },
  {
    id: 'tue',
    dayLabel: 'Tue',
    title: 'Lower Strength',
    preview: 'Zercher 3×6 · RDL 3×8 · Bulgarian…',
    modality: 'strength' as WorkoutModality
  },
  {
    id: 'wed',
    dayLabel: 'Wed',
    title: 'Upper Pull',
    preview: 'Pull-ups AMRAP · Row 4×6 · Curls…',
    modality: 'strength' as WorkoutModality
  },
  {
    id: 'thu',
    dayLabel: 'Thu',
    title: 'Power / Glutes',
    preview: 'Deadlift 4×3 · Z-press · Hip thrust…',
    modality: 'strength' as WorkoutModality
  },
  {
    id: 'fri',
    dayLabel: 'Fri',
    title: 'Upper Hypertrophy',
    preview: 'Incline DB 3×10 · Giant set shoulders…',
    modality: 'strength' as WorkoutModality
  },
  {
    id: 'sat',
    dayLabel: 'Sat',
    title: 'Easy Run',
    preview: '5K conversational pace',
    modality: 'energy' as WorkoutModality
  }
]

export const planDayWarmUp = ['Band external rotations', 'Scapular push-ups', 'Light DB presses (low incline)']

export const planDayExercises = [
  {
    id: 'ohp',
    name: 'Standing Barbell OHP',
    prescription: '3×5–8 · RIR 2–3, strict',
    modality: 'strength' as WorkoutModality
  },
  {
    id: 'incline',
    name: 'Low-Incline DB Bench',
    prescription: '3×10 → 4×10 by Week 4',
    modality: 'strength' as WorkoutModality
  },
  {
    id: 'flat',
    name: 'Flat DB Bench Press',
    prescription: '3×8–10',
    modality: 'strength' as WorkoutModality
  },
  {
    id: 'fly',
    name: 'Incline DB Fly (partial ROM)',
    prescription: '3×10–12 · shoulder-safe',
    modality: 'strength' as WorkoutModality
  }
]

export const mockWeekPlans: MockWeekPlan[] = [
  {
    weekNumber: 1,
    dateRange: 'May 19 – May 25',
    workoutCount: 6,
    totalVolume: '12,400 kg',
    isCurrent: true,
    workouts: [
      {
        id: 'w1-1',
        title: 'Day 1 — Upper Push',
        modality: 'strength',
        durationMinutes: 55
      },
      {
        id: 'w1-2',
        title: 'Day 2 — Lower Strength',
        modality: 'strength',
        durationMinutes: 50
      },
      {
        id: 'w1-3',
        title: 'Day 3 — Upper Pull',
        modality: 'strength',
        durationMinutes: 50
      },
      {
        id: 'w1-4',
        title: 'Easy Run',
        modality: 'energy',
        durationMinutes: 30
      }
    ]
  },
  {
    weekNumber: 2,
    dateRange: 'May 26 – Jun 1',
    workoutCount: 3,
    totalVolume: '13,100 kg',
    workouts: [
      {
        id: 'w2-1',
        title: 'Lower Strength',
        modality: 'strength',
        durationMinutes: 50
      },
      {
        id: 'w2-2',
        title: 'Tempo Run',
        modality: 'energy',
        durationMinutes: 35
      },
      {
        id: 'w2-3',
        title: 'Conditioning Circuit',
        modality: 'conditioning',
        durationMinutes: 30
      }
    ]
  },
  {
    weekNumber: 3,
    dateRange: 'Jun 2 – Jun 8',
    workoutCount: 3,
    totalVolume: '13,800 kg',
    workouts: [
      {
        id: 'w3-1',
        title: 'Push Day',
        modality: 'strength',
        durationMinutes: 45
      },
      {
        id: 'w3-2',
        title: 'Long Run',
        modality: 'energy',
        durationMinutes: 40
      },
      {
        id: 'w3-3',
        title: 'Recovery Flow',
        modality: 'mobility',
        durationMinutes: 20
      }
    ]
  }
]

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
    label: 'Fully recovered',
    description: 'No restrictions'
  },
  {
    id: 'managing',
    label: 'Managing',
    description: 'Some movements to avoid'
  },
  {
    id: 'acute',
    label: 'Acute',
    description: 'Need modified plan'
  }
]

export const restrictionMovements = ['Overhead press', 'Deep squat', 'Running impact', 'Heavy deadlift', 'Jumping']

export {
  commonEquipmentIds,
  equipmentCategoryTags,
  equipmentPickerCategories,
  locationPresetOptions,
  predefinedEquipmentCatalog
} from '@shared/dictionary/equipmentCatalog.dictionary'

export const mockWorkoutLocations = [
  {
    id: 'loc-home',
    name: 'Home Gym',
    presetType: 'home' as const,
    isDefault: true,
    equipmentCount: 8
  },
  {
    id: 'loc-gym',
    name: 'LA Fitness',
    presetType: 'commercial' as const,
    isDefault: false,
    equipmentCount: 24
  }
]

export const activeWorkoutPreviewExercises = [
  { id: 'sq', name: 'Barbell Squat', prescription: '3 × 8–10' },
  { id: 'rdl', name: 'Romanian Deadlift', prescription: '3 × 10' },
  { id: 'bp', name: 'Bench Press', prescription: '3 × 8' },
  { id: 'row', name: 'Cable Row', prescription: '3 × 12' }
]

export const activeWorkoutSwapOptions = [
  { id: 'front-squat', name: 'Front Squat', equipment: 'Barbell' },
  { id: 'goblet', name: 'Goblet Squat', equipment: 'Dumbbell' },
  { id: 'leg-press', name: 'Leg Press', equipment: 'Machine' },
  { id: 'box-squat', name: 'Box Squat', equipment: 'Barbell' }
]

export const activeWorkoutSwapChips = ['Similar', 'Quads', 'Barbell', 'Injury-safe']

export const activeWorkoutExerciseMenu = [
  'Instructions & video',
  'Replace exercise',
  'Delete from workout',
  'Rest timer · ON (90s)',
  'Exclude from future plans',
  'Add warm-up sets',
  'Units · kg'
]

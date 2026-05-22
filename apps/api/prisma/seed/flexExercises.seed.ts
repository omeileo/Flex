import { ExerciseCategory } from '@flex/shared/enums/exerciseCategory.enum'
import { PrismaClient } from '@prisma/client'

import { logger } from '../../src/app'

const flexExerciseSeedData = [
  {
    name: 'Barbell Back Squat',
    category: ExerciseCategory.COMPOUND,
    muscle_groups: ['quads', 'glutes', 'core'],
    equipment: ['barbell', 'rack'],
    video_url: 'https://cdn.flex.app/videos/barbell-back-squat.mp4',
    contraindications: ['acute knee pain']
  },
  {
    name: 'Romanian Deadlift',
    category: ExerciseCategory.COMPOUND,
    muscle_groups: ['hamstrings', 'glutes', 'lower back'],
    equipment: ['barbell'],
    video_url: 'https://cdn.flex.app/videos/romanian-deadlift.mp4',
    contraindications: ['acute lower back pain']
  },
  {
    name: 'Bench Press',
    category: ExerciseCategory.COMPOUND,
    muscle_groups: ['chest', 'triceps', 'shoulders'],
    equipment: ['barbell', 'bench'],
    video_url: 'https://cdn.flex.app/videos/bench-press.mp4',
    contraindications: ['shoulder impingement']
  },
  {
    name: 'Overhead Press',
    category: ExerciseCategory.COMPOUND,
    muscle_groups: ['shoulders', 'triceps', 'core'],
    equipment: ['barbell'],
    video_url: 'https://cdn.flex.app/videos/overhead-press.mp4',
    contraindications: ['shoulder instability']
  },
  {
    name: 'Barbell Row',
    category: ExerciseCategory.COMPOUND,
    muscle_groups: ['lats', 'upper back', 'biceps'],
    equipment: ['barbell'],
    video_url: 'https://cdn.flex.app/videos/barbell-row.mp4',
    contraindications: ['lower back flare-up']
  },
  {
    name: 'Pull-Up',
    category: ExerciseCategory.COMPOUND,
    muscle_groups: ['lats', 'biceps', 'upper back'],
    equipment: ['pull-up bar'],
    video_url: 'https://cdn.flex.app/videos/pull-up.mp4',
    contraindications: ['elbow tendinitis']
  },
  {
    name: 'Dumbbell Lunge',
    category: ExerciseCategory.COMPOUND,
    muscle_groups: ['quads', 'glutes'],
    equipment: ['dumbbells'],
    video_url: 'https://cdn.flex.app/videos/dumbbell-lunge.mp4',
    contraindications: ['knee instability']
  },
  {
    name: 'Dumbbell Curl',
    category: ExerciseCategory.ISOLATION,
    muscle_groups: ['biceps'],
    equipment: ['dumbbells'],
    video_url: 'https://cdn.flex.app/videos/dumbbell-curl.mp4',
    contraindications: ['elbow pain']
  },
  {
    name: 'Tricep Pushdown',
    category: ExerciseCategory.ISOLATION,
    muscle_groups: ['triceps'],
    equipment: ['cable machine'],
    video_url: 'https://cdn.flex.app/videos/tricep-pushdown.mp4',
    contraindications: ['elbow pain']
  },
  {
    name: 'Leg Press',
    category: ExerciseCategory.COMPOUND,
    muscle_groups: ['quads', 'glutes'],
    equipment: ['leg press machine'],
    video_url: 'https://cdn.flex.app/videos/leg-press.mp4',
    contraindications: ['knee pain']
  },
  {
    name: 'Lat Pulldown',
    category: ExerciseCategory.COMPOUND,
    muscle_groups: ['lats', 'biceps'],
    equipment: ['cable machine'],
    video_url: 'https://cdn.flex.app/videos/lat-pulldown.mp4',
    contraindications: ['shoulder pain']
  },
  {
    name: 'Plank',
    category: ExerciseCategory.MOBILITY,
    muscle_groups: ['core'],
    equipment: ['bodyweight'],
    video_url: 'https://cdn.flex.app/videos/plank.mp4',
    contraindications: ['wrist pain']
  },
  {
    name: 'Hip Thrust',
    category: ExerciseCategory.COMPOUND,
    muscle_groups: ['glutes', 'hamstrings'],
    equipment: ['barbell', 'bench'],
    video_url: 'https://cdn.flex.app/videos/hip-thrust.mp4',
    contraindications: ['hip pain']
  },
  {
    name: 'Lateral Raise',
    category: ExerciseCategory.ISOLATION,
    muscle_groups: ['shoulders'],
    equipment: ['dumbbells'],
    video_url: 'https://cdn.flex.app/videos/lateral-raise.mp4',
    contraindications: ['shoulder impingement']
  },
  {
    name: 'Standing Calf Raise',
    category: ExerciseCategory.ISOLATION,
    muscle_groups: ['calves'],
    equipment: ['bodyweight', 'machine'],
    video_url: 'https://cdn.flex.app/videos/standing-calf-raise.mp4',
    contraindications: ['achilles pain']
  }
]

export default async function flexExercisesSeed(prisma: PrismaClient) {
  logger.info('🌱 Seeding Flex exercises...')

  try {
    for (const exercise of flexExerciseSeedData) {
      await prisma.exercises.upsert({
        where: { name: exercise.name },
        update: {
          category: exercise.category,
          muscle_groups: exercise.muscle_groups,
          equipment: exercise.equipment,
          video_url: exercise.video_url,
          contraindications: exercise.contraindications
        },
        create: exercise
      })
    }

    logger.info('✅ Flex exercises seeding completed')
  } catch (error) {
    logger.error(`❌ Error seeding Flex exercises: ${error}`)
    throw error
  }
}

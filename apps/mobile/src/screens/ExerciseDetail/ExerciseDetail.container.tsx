import React, { useMemo } from 'react'

import router from '@router/functions/router.functions'
import { formatExercisePrescription } from '@shared/functions/TrainingPlan/trainingPlanPresentation.functions'
import { useActivePlanPresentation } from '@shared/hooks/useActivePlanPresentation/useActivePlanPresentation.hooks'
import { useTranslation } from 'react-i18next'

import ExerciseDetailComponent from './ExerciseDetail.component'

const ExerciseDetailContainer = () => {
  const { t } = useTranslation()
  const exerciseId = router.getUrlParam<string>('exerciseId')
  const dayIndex = router.getUrlParam<number>('dayIndex')
  const { loading, plan, error, retry } = useActivePlanPresentation()

  const exercise = useMemo(() => {
    const workout = plan?.workouts.find((entry) => entry.dayIndex === dayIndex)

    return workout?.exercises.find((entry) => String(entry.exerciseId) === String(exerciseId)) ?? null
  }, [plan, dayIndex, exerciseId])

  const prescription = useMemo(() => {
    if (!exercise) {
      return ''
    }

    return formatExercisePrescription(exercise.sets)
  }, [exercise])

  const instructions = exercise?.notes ?? t('exerciseDetail.defaultInstructions')
  const injuryNote = exercise?.notes?.toLowerCase().includes('shoulder') ? exercise.notes : null

  return (
    <ExerciseDetailComponent
      exercise={exercise}
      prescription={prescription}
      instructions={instructions}
      injuryNote={injuryNote}
      isLoading={loading}
      error={error}
      onRetry={retry}
    />
  )
}

export default ExerciseDetailContainer

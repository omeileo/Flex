import React, { useCallback, useEffect, useMemo } from 'react'

import { getProgressMetrics } from '@redux/states/workoutSession/getProgressMetrics/getProgressMetrics.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import { buildProgressPresentation } from '@shared/functions/Progress/progressPresentation.functions'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import ProgressComponent from './Progress.component'

const ProgressContainer = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()
  const { loading, success, error } = useSelector((state: RootState) => state.getProgressMetrics)

  const loadMetrics = useCallback(() => {
    dispatch(getProgressMetrics())
  }, [dispatch])

  useEffect(() => {
    loadMetrics()
  }, [loadMetrics])

  const presentation = useMemo(
    () =>
      buildProgressPresentation({
        metrics: success,
        labels: {
          workouts: t('progress.stats.workouts.label'),
          volume: t('progress.stats.volume.label'),
          streak: t('progress.stats.streak.label'),
          prs: t('progress.stats.prs.label'),
          workoutsHint: t('progress.stats.workouts.hint'),
          volumeHint: t('progress.stats.volume.hint'),
          streakHint: t('progress.stats.streak.hint'),
          prsHint: t('progress.stats.prs.hint'),
          weeklyDays: {
            mon: t('progress.weekly.days.mon'),
            tue: t('progress.weekly.days.tue'),
            wed: t('progress.weekly.days.wed'),
            thu: t('progress.weekly.days.thu'),
            fri: t('progress.weekly.days.fri'),
            sat: t('progress.weekly.days.sat'),
            sun: t('progress.weekly.days.sun')
          }
        }
      }),
    [success, t]
  )

  const featuredStat = useMemo(
    () => presentation.stats.find((stat) => stat.id === presentation.featuredStatId) ?? presentation.stats[2],
    [presentation]
  )

  return (
    <ProgressComponent
      title={t('progress.title')}
      subtitle={t('progress.subtitle')}
      heroEyebrow={t('progress.heroEyebrow')}
      featuredStat={featuredStat}
      chartTitle={t('progress.weekly.title')}
      chartBadge={t('progress.weekly.badge')}
      stats={presentation.stats}
      weeklyVolume={presentation.weeklyVolume}
      chartFootnote={t('progress.weekly.footnote')}
      isLoading={loading && !success}
      error={error}
      onRefresh={loadMetrics}
    />
  )
}

export default ProgressContainer

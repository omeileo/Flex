import React, { useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import ProgressComponent from './Progress.component'

import { ProgressStat } from './Progress.types'

const ProgressContainer = () => {
  const { t } = useTranslation()

  const stats = useMemo<ProgressStat[]>(
    () => [
      {
        id: 'workouts',
        label: t('progress.stats.workouts.label'),
        value: t('progress.stats.workouts.value'),
        hint: t('progress.stats.workouts.hint')
      },
      {
        id: 'volume',
        label: t('progress.stats.volume.label'),
        value: t('progress.stats.volume.value'),
        hint: t('progress.stats.volume.hint')
      },
      {
        id: 'streak',
        label: t('progress.stats.streak.label'),
        value: t('progress.stats.streak.value'),
        hint: t('progress.stats.streak.hint')
      },
      {
        id: 'prs',
        label: t('progress.stats.prs.label'),
        value: t('progress.stats.prs.value'),
        hint: t('progress.stats.prs.hint')
      }
    ],
    [t]
  )

  const weeklyVolume = useMemo(
    () => [
      { id: 'mon', label: t('progress.weekly.days.mon'), value: 40 },
      { id: 'tue', label: t('progress.weekly.days.tue'), value: 55 },
      { id: 'wed', label: t('progress.weekly.days.wed'), value: 30 },
      { id: 'thu', label: t('progress.weekly.days.thu'), value: 70 },
      { id: 'fri', label: t('progress.weekly.days.fri'), value: 45 },
      { id: 'sat', label: t('progress.weekly.days.sat'), value: 80 },
      { id: 'sun', label: t('progress.weekly.days.sun'), value: 60 }
    ],
    [t]
  )

  return (
    <ProgressComponent
      title={t('progress.title')}
      subtitle={t('progress.subtitle')}
      heroEyebrow={t('progress.heroEyebrow')}
      featuredStat={stats.find((stat) => stat.id === 'streak') ?? stats[2]}
      chartTitle={t('progress.weekly.title')}
      chartBadge={t('progress.weekly.badge')}
      stats={stats}
      weeklyVolume={weeklyVolume}
      chartFootnote={t('progress.weekly.footnote')}
    />
  )
}

export default ProgressContainer

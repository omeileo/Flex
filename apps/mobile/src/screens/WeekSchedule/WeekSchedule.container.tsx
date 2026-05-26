import React, { useCallback, useMemo, useState } from 'react'

import router from '@router/functions/router.functions'
import { useActivePlanPresentation } from '@shared/hooks/useActivePlanPresentation/useActivePlanPresentation.hooks'

import WeekScheduleComponent from './WeekSchedule.component'

const WeekScheduleContainer = () => {
  const navigate = router.navigate()
  const weekParam = router.getUrlParam<number>('weekNumber')
  const { loading, error, hierarchy, retry } = useActivePlanPresentation()
  const [weekNumber, setWeekNumber] = useState(weekParam ?? hierarchy?.program.currentWeekNumber ?? 1)

  const schedule = useMemo(() => {
    if (!hierarchy) {
      return null
    }

    return hierarchy.getWeekSchedule(weekNumber)
  }, [hierarchy, weekNumber])

  const handlePreviousWeek = useCallback(() => {
    setWeekNumber((current) => Math.max(1, current - 1))
  }, [])

  const handleNextWeek = useCallback(() => {
    const totalWeeks = hierarchy?.program.totalWeeks ?? 12

    setWeekNumber((current) => Math.min(totalWeeks, current + 1))
  }, [hierarchy])

  const handleDayPress = useCallback(
    (dayIndex: number, title: string) => {
      navigate('PlanDetail', {
        params: {
          dayIndex,
          weekNumber,
          workoutName: title
        }
      })
    },
    [navigate, weekNumber]
  )

  return (
    <WeekScheduleComponent
      schedule={schedule}
      isLoading={loading}
      error={error}
      onPreviousWeek={handlePreviousWeek}
      onNextWeek={handleNextWeek}
      onDayPress={handleDayPress}
      onRetry={retry}
    />
  )
}

export default WeekScheduleContainer

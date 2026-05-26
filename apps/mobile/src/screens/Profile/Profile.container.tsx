import React, { useCallback, useEffect, useMemo } from 'react'

import { useNavigation } from '@react-navigation/native'
import { getProfile } from '@redux/states/profile/getProfile/getProfile.slice'
import { buildExcludedPreview, buildWellnessPreview } from '@redux/states/profile/wellness/wellness.functions'
import { buildLocationPreview } from '@redux/states/profile/workoutLocations/workoutLocations.functions'
import { AppDispatch, RootState } from '@redux/store/store.types'
import { ProfileNavigation } from '@screens/Profile/Profile.types'
import { computeCycleState, formatCyclePreview } from '@shared/functions/Cycle/cycle.functions'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import ProfileComponent from './Profile.component'

const ProfileContainer = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation<ProfileNavigation>()
  const { loading, success, error } = useSelector((state: RootState) => state.getProfile)
  const themeMode = useSelector((state: RootState) => state.theme.mode)
  const locations = useSelector((state: RootState) => state.workoutLocations.locations)
  const wellness = useSelector((state: RootState) => state.wellness)
  const cycleProfile = useSelector((state: RootState) => state.cycleProfile)

  const loadProfile = useCallback(() => {
    dispatch(getProfile())
  }, [dispatch])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  const goalsPreview = useMemo(() => {
    if (!success) {
      return t('profileSettings.goalsPreviewFallback')
    }

    return t('profileSettings.goalsPreviewValue', {
      goal: success.goal,
      days: success.daysPerWeek
    })
  }, [success, t])

  const gymPreview = useMemo(
    () => buildLocationPreview(locations, t('profileSettings.gymPreviewFallback')),
    [locations, t]
  )

  const wellnessPreview = useMemo(
    () => buildWellnessPreview(wellness.conditions, t('profileSettings.wellnessPreviewEmpty')),
    [t, wellness.conditions]
  )

  const cyclePreview = useMemo(() => {
    const computed = computeCycleState(cycleProfile)
    const phaseLabels = {
      menstruation: t('cycleAware.phases.menstruation'),
      follicular: t('cycleAware.phases.follicular'),
      ovulation: t('cycleAware.phases.ovulation'),
      luteal: t('cycleAware.phases.luteal')
    }

    return formatCyclePreview(cycleProfile, computed, t('cycleAware.off'), phaseLabels)
  }, [cycleProfile, t])

  const excludedPreview = useMemo(
    () => buildExcludedPreview(wellness.excludedExerciseIds.length, t('profileSettings.excludedPreviewEmpty')),
    [t, wellness.excludedExerciseIds.length]
  )

  const themePreview = useMemo(() => t(`components.theme.${themeMode}`), [themeMode, t])

  const dietPreview = useMemo(() => {
    const preferences = (success?.preferences ?? {}) as { diet?: string | null; calorieTarget?: string }
    const diet = preferences.diet
    const calories = preferences.calorieTarget

    if (!diet) {
      return t('profileSettings.dietPreview')
    }

    if (calories) {
      return `${diet} · ${calories} kcal`
    }

    return diet
  }, [success?.preferences, t])

  const agePreview = useMemo(() => {
    const preferences = (success?.preferences ?? {}) as { ageBand?: string | null; fitnessLevel?: number }
    const ageBand = preferences.ageBand
    const levelKey =
      typeof preferences.fitnessLevel === 'number'
        ? (['beginner', 'intermediate', 'advanced'][preferences.fitnessLevel] ?? success?.experienceLevel)
        : success?.experienceLevel
    const levelLabel = levelKey ? t(`profileOnboarding.experienceLevels.${levelKey}`) : t('profileSettings.agePreview')

    if (!ageBand) {
      return t('profileSettings.agePreview')
    }

    return `${ageBand} · ${levelLabel}`
  }, [success?.experienceLevel, success?.preferences, t])

  return (
    <ProfileComponent
      displayName={t('profileSettings.displayName')}
      initials={t('profileSettings.initials')}
      memberSince={t('profileSettings.memberSince')}
      goalsPreview={goalsPreview}
      gymPreview={gymPreview}
      wellnessPreview={wellnessPreview}
      cyclePreview={cyclePreview}
      excludedPreview={excludedPreview}
      dietPreview={dietPreview}
      agePreview={agePreview}
      themePreview={themePreview}
      themeMode={themeMode}
      isLoading={loading}
      error={error}
      profile={success}
      onRefresh={loadProfile}
      onNavigateGoals={() => navigation.navigate('GoalsAndSchedule')}
      onNavigateGymLocations={() => navigation.navigate('GymLocationsList')}
      onNavigateWellness={() => navigation.navigate('WellnessOverview')}
      onNavigateCycle={() => navigation.navigate('CycleAwareSettings')}
      onNavigateExcluded={() => navigation.navigate('ExcludedExercises')}
      onNavigateAppearance={() => navigation.navigate('Appearance')}
      onNavigateDiet={() => navigation.navigate('DietPreferences')}
      onNavigateAge={() => navigation.navigate('AgeFitness')}
    />
  )
}

export default ProfileContainer

import React, { useCallback, useMemo, useState } from 'react'

import { Pressable, Text, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { saveProfile } from '@redux/states/profile/saveProfile/saveProfile.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import { ProfileNavigation } from '@router/navigators/ProfileStack.types'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { createProfileFlowStyles } from '@shared/styles/profileFlow.styles'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import FlowScreenScaffold from '@shared/components/FlowScreenScaffold/FlowScreenScaffold.component'
import PlanReadaptSheet from '@shared/components/PlanReadaptSheet/PlanReadaptSheet.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'
import SelectionCard from '@shared/components/SelectionCard/SelectionCard.component'

const goalOptions = ['Build muscle', 'Lose fat', 'Endurance', 'Return from injury', 'General fitness']
const experienceOptions = ['beginner', 'intermediate', 'advanced'] as const
const sessionOptions = [30, 45, 60, 75]

const GoalsAndScheduleContainer = () => {
  const { t } = useTranslation()
  const styles = useThemedStyles(createProfileFlowStyles)
  const navigation = useNavigation<ProfileNavigation>()
  const dispatch = useDispatch<AppDispatch>()
  const profile = useSelector((state: RootState) => state.getProfile.success)
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['Build muscle'])
  const [experience, setExperience] = useState<(typeof experienceOptions)[number]>('intermediate')
  const [daysPerWeek, setDaysPerWeek] = useState(profile?.daysPerWeek ?? 3)
  const [sessionMinutes, setSessionMinutes] = useState(profile?.sessionMinutes ?? 45)
  const [readaptVisible, setReadaptVisible] = useState(false)

  const toggleGoal = useCallback((goal: string) => {
    setSelectedGoals((current) =>
      current.includes(goal) ? current.filter((item) => item !== goal) : [...current, goal]
    )
  }, [])

  const handleSave = useCallback(async () => {
    if (!profile) {
      setReadaptVisible(true)

      return
    }

    try {
      await dispatch(
        saveProfile({
          goal: selectedGoals[0] ?? profile.goal,
          experienceLevel: experience,
          daysPerWeek,
          sessionMinutes,
          equipment: profile.equipment,
          injuries: profile.injuries
        })
      ).unwrap()
      setReadaptVisible(true)
    } catch {
      setReadaptVisible(true)
    }
  }, [daysPerWeek, dispatch, experience, profile, selectedGoals, sessionMinutes])

  const schedulePreview = useMemo(
    () => t('profileSettings.schedulePreview', { days: daysPerWeek, minutes: sessionMinutes }),
    [daysPerWeek, sessionMinutes, t]
  )

  return (
    <>
      <FlowScreenScaffold
        title={t('profileSettings.goalsTitle')}
        subtitle={schedulePreview}
        testID="goals-and-schedule-screen"
        footer={<PrimaryButton label={t('profileSettings.save')} onPress={handleSave} />}
      >
        <Text style={styles.fieldLabel}>{t('profileSettings.goalsLabel')}</Text>
        <View style={styles.chipRow}>
          {goalOptions.map((goal) => (
            <Pressable
              key={goal}
              style={[styles.chip, !selectedGoals.includes(goal) && styles.chipInactive]}
              onPress={() => toggleGoal(goal)}
            >
              <Text style={styles.chipText}>{goal}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.fieldLabel}>{t('profileSettings.experienceLabel')}</Text>
        {experienceOptions.map((level) => (
          <SelectionCard
            key={level}
            label={t(`profileOnboarding.experienceLevels.${level}`)}
            selected={experience === level}
            onPress={() => setExperience(level)}
          />
        ))}

        <Text style={styles.fieldLabel}>{t('profileSettings.daysLabel')}</Text>
        <View style={styles.chipRow}>
          <Pressable style={styles.chipInactive} onPress={() => setDaysPerWeek((value) => Math.max(2, value - 1))}>
            <Text style={styles.chipText}>−</Text>
          </Pressable>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{daysPerWeek}</Text>
          </View>
          <Pressable style={styles.chipInactive} onPress={() => setDaysPerWeek((value) => Math.min(6, value + 1))}>
            <Text style={styles.chipText}>+</Text>
          </Pressable>
        </View>

        <Text style={styles.fieldLabel}>{t('profileSettings.sessionLabel')}</Text>
        <View style={styles.chipRow}>
          {sessionOptions.map((minutes) => (
            <Pressable
              key={minutes}
              style={[styles.chip, sessionMinutes !== minutes && styles.chipInactive]}
              onPress={() => setSessionMinutes(minutes)}
            >
              <Text style={styles.chipText}>{minutes}m</Text>
            </Pressable>
          ))}
        </View>
      </FlowScreenScaffold>

      <PlanReadaptSheet
        visible={readaptVisible}
        title={t('profileSettings.readaptTitle')}
        subtitle={t('profileSettings.readaptSubtitle')}
        readaptLabel={t('profileSettings.readaptCta')}
        skipLabel={t('profileSettings.readaptSkip')}
        onReadapt={() => {
          setReadaptVisible(false)
          navigation.goBack()
        }}
        onSkip={() => {
          setReadaptVisible(false)
          navigation.goBack()
        }}
        testID="goals-readapt-sheet"
      />
    </>
  )
}

export default GoalsAndScheduleContainer

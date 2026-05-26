import React, { useCallback, useMemo, useState } from 'react'

import { Text, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { saveProfile } from '@redux/states/profile/saveProfile/saveProfile.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import { ageBands, fitnessLevelKeys } from '@screens/ProfileOnboarding/ProfileOnboarding.dictionary'
import { ProfileNavigation } from '@router/navigators/ProfileStack.types'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { createProfileFlowStyles } from '@shared/styles/profileFlow.styles'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import FlowScreenScaffold from '@shared/components/FlowScreenScaffold/FlowScreenScaffold.component'
import PlanReadaptSheet from '@shared/components/PlanReadaptSheet/PlanReadaptSheet.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'
import SelectionCard from '@shared/components/SelectionCard/SelectionCard.component'

type ProfilePreferences = {
  ageBand?: string | null
  fitnessLevel?: number
}

const resolveFitnessLevelIndex = (profileLevel: string | undefined, preferenceLevel: number | undefined) => {
  if (typeof preferenceLevel === 'number') {
    return preferenceLevel
  }

  const index = fitnessLevelKeys.indexOf((profileLevel ?? 'intermediate') as (typeof fitnessLevelKeys)[number])

  return index >= 0 ? index : 1
}

const AgeFitnessContainer = () => {
  const { t } = useTranslation()
  const styles = useThemedStyles(createProfileFlowStyles)
  const navigation = useNavigation<ProfileNavigation>()
  const dispatch = useDispatch<AppDispatch>()
  const profile = useSelector((state: RootState) => state.getProfile.success)
  const preferences = (profile?.preferences ?? {}) as ProfilePreferences

  const [selectedAge, setSelectedAge] = useState<string | null>(preferences.ageBand ?? null)
  const [fitnessLevel, setFitnessLevel] = useState(() =>
    resolveFitnessLevelIndex(profile?.experienceLevel, preferences.fitnessLevel)
  )
  const [readaptVisible, setReadaptVisible] = useState(false)

  const subtitle = useMemo(() => {
    const levelKey = fitnessLevelKeys[fitnessLevel] ?? 'intermediate'
    const levelLabel = t(`profileOnboarding.experienceLevels.${levelKey}`)

    if (!selectedAge) {
      return levelLabel
    }

    return `${selectedAge} · ${levelLabel}`
  }, [fitnessLevel, selectedAge, t])

  const handleSave = useCallback(async () => {
    if (!profile) {
      setReadaptVisible(true)

      return
    }

    const experienceLevel = fitnessLevelKeys[fitnessLevel] ?? profile.experienceLevel

    try {
      await dispatch(
        saveProfile({
          goal: profile.goal,
          experienceLevel,
          daysPerWeek: profile.daysPerWeek,
          sessionMinutes: profile.sessionMinutes,
          equipment: profile.equipment,
          injuries: profile.injuries,
          preferences: {
            ...profile.preferences,
            ageBand: selectedAge,
            fitnessLevel
          }
        })
      ).unwrap()
      setReadaptVisible(true)
    } catch {
      setReadaptVisible(true)
    }
  }, [dispatch, fitnessLevel, profile, selectedAge])

  return (
    <>
      <FlowScreenScaffold
        title={t('profileSettings.ageTitle')}
        subtitle={subtitle}
        testID="age-fitness-screen"
        footer={<PrimaryButton label={t('profileSettings.save')} onPress={handleSave} />}
      >
        <Text style={styles.fieldLabel}>{t('profileOnboarding.ageLabel')}</Text>
        <View style={styles.chipRow}>
          {ageBands.map((band) => (
            <SelectionCard
              key={band}
              label={band}
              selected={selectedAge === band}
              onPress={() => setSelectedAge(band)}
            />
          ))}
        </View>

        <Text style={styles.fieldLabel}>{t('profileOnboarding.fitnessLabel')}</Text>
        {fitnessLevelKeys.map((level, index) => (
          <SelectionCard
            key={level}
            label={t(`profileOnboarding.experienceLevels.${level}`)}
            selected={fitnessLevel === index}
            onPress={() => setFitnessLevel(index)}
          />
        ))}
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
        testID="age-readapt-sheet"
      />
    </>
  )
}

export default AgeFitnessContainer

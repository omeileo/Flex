import React, { useCallback, useMemo, useState } from 'react'

import { Text, TextInput, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { saveProfile } from '@redux/states/profile/saveProfile/saveProfile.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import { dietPreferences } from '@screens/ProfileOnboarding/ProfileOnboarding.dictionary'
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
  diet?: string | null
  calorieTarget?: string
}

const DietPreferencesContainer = () => {
  const { t } = useTranslation()
  const styles = useThemedStyles(createProfileFlowStyles)
  const navigation = useNavigation<ProfileNavigation>()
  const dispatch = useDispatch<AppDispatch>()
  const profile = useSelector((state: RootState) => state.getProfile.success)
  const preferences = (profile?.preferences ?? {}) as ProfilePreferences

  const [selectedDiet, setSelectedDiet] = useState<string | null>(preferences.diet ?? null)
  const [calorieTarget, setCalorieTarget] = useState(preferences.calorieTarget ?? '')
  const [readaptVisible, setReadaptVisible] = useState(false)

  const subtitle = useMemo(() => {
    if (!selectedDiet) {
      return t('profileOnboarding.dietHeadline')
    }

    if (calorieTarget) {
      return `${selectedDiet} · ${calorieTarget} kcal`
    }

    return selectedDiet
  }, [calorieTarget, selectedDiet, t])

  const handleSave = useCallback(async () => {
    if (!profile) {
      setReadaptVisible(true)

      return
    }

    try {
      await dispatch(
        saveProfile({
          goal: profile.goal,
          experienceLevel: profile.experienceLevel,
          daysPerWeek: profile.daysPerWeek,
          sessionMinutes: profile.sessionMinutes,
          equipment: profile.equipment,
          injuries: profile.injuries,
          preferences: {
            ...profile.preferences,
            diet: selectedDiet,
            calorieTarget: calorieTarget || undefined
          }
        })
      ).unwrap()
      setReadaptVisible(true)
    } catch {
      setReadaptVisible(true)
    }
  }, [calorieTarget, dispatch, profile, selectedDiet])

  return (
    <>
      <FlowScreenScaffold
        title={t('profileSettings.dietTitle')}
        subtitle={subtitle}
        testID="diet-preferences-screen"
        footer={<PrimaryButton label={t('profileSettings.save')} onPress={handleSave} />}
      >
        <Text style={styles.fieldLabel}>{t('profileOnboarding.dietHeadline')}</Text>
        <View style={styles.chipRow}>
          {dietPreferences.map((diet) => (
            <SelectionCard
              key={diet}
              label={diet}
              selected={selectedDiet === diet}
              onPress={() => setSelectedDiet(diet)}
            />
          ))}
        </View>

        <Text style={styles.fieldLabel}>{t('profileOnboarding.calorieLabel')}</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={calorieTarget}
          onChangeText={setCalorieTarget}
          placeholder={t('profileOnboarding.caloriePlaceholder')}
          placeholderTextColor={styles.subtitle.color}
        />
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
        testID="diet-readapt-sheet"
      />
    </>
  )
}

export default DietPreferencesContainer

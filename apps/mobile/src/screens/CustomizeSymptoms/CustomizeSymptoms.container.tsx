import React, { useCallback, useState } from 'react'

import { Switch, Text, View } from 'react-native'

import { DEFAULT_TRACKED_SYMPTOMS } from '@redux/states/profile/cycleProfile/cycleProfile.dictionary'
import { setTrackedSymptoms } from '@redux/states/profile/cycleProfile/cycleProfile.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { createProfileFlowStyles } from '@shared/styles/profileFlow.styles'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import FlowScreenScaffold from '@shared/components/FlowScreenScaffold/FlowScreenScaffold.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'

const symptomOptions = ['energy', 'cramps', 'flow', 'mood', 'bloating', 'headache', 'breastTenderness']

const CustomizeSymptomsContainer = () => {
  const { t } = useTranslation()
  const styles = useThemedStyles(createProfileFlowStyles)
  const dispatch = useDispatch<AppDispatch>()
  const trackedSymptoms = useSelector((state: RootState) => state.cycleProfile.trackedSymptoms)
  const [selected, setSelected] = useState<string[]>(
    trackedSymptoms.length > 0 ? trackedSymptoms : DEFAULT_TRACKED_SYMPTOMS
  )

  const toggleSymptom = useCallback((symptom: string) => {
    setSelected((current) =>
      current.includes(symptom) ? current.filter((item) => item !== symptom) : [...current, symptom]
    )
  }, [])

  const handleSave = useCallback(() => {
    dispatch(setTrackedSymptoms(selected))
  }, [dispatch, selected])

  return (
    <FlowScreenScaffold
      title={t('cycleAware.symptomsTitle')}
      subtitle={t('cycleAware.symptomsSubtitle')}
      testID="customize-symptoms-screen"
      footer={<PrimaryButton label={t('profileSettings.save')} onPress={handleSave} />}
    >
      {symptomOptions.map((symptom) => (
        <View key={symptom} style={styles.settingsRow}>
          <Text style={styles.settingsRowLabel}>{t(`cycleAware.symptoms.${symptom}`)}</Text>
          <Switch value={selected.includes(symptom)} onValueChange={() => toggleSymptom(symptom)} />
        </View>
      ))}
    </FlowScreenScaffold>
  )
}

export default CustomizeSymptomsContainer

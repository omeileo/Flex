import React, { useCallback, useMemo, useState } from 'react'

import { Text, View } from 'react-native'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { upsertCondition } from '@redux/states/profile/wellness/wellness.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import { ProfileNavigation, ProfileStackParamList } from '@router/navigators/ProfileStack.types'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { createProfileFlowStyles } from '@shared/styles/profileFlow.styles'
import { WellnessStatus } from '@shared/types/wellness.types'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import FlowScreenScaffold from '@shared/components/FlowScreenScaffold/FlowScreenScaffold.component'
import PlanReadaptSheet from '@shared/components/PlanReadaptSheet/PlanReadaptSheet.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'
import StatusSegment from '@shared/components/StatusSegment/StatusSegment.component'

type ConditionDetailRoute = RouteProp<ProfileStackParamList, 'ConditionDetail'>

const ConditionDetailContainer = () => {
  const { t } = useTranslation()
  const styles = useThemedStyles(createProfileFlowStyles)
  const navigation = useNavigation<ProfileNavigation>()
  const route = useRoute<ConditionDetailRoute>()
  const dispatch = useDispatch<AppDispatch>()
  const condition = useSelector((state: RootState) =>
    state.wellness.conditions.find((entry) => entry.id === route.params.conditionId)
  )
  const [status, setStatus] = useState<WellnessStatus>(condition?.status ?? 'managing')
  const [readaptVisible, setReadaptVisible] = useState(false)

  const aggravators = useMemo(
    () => condition?.aggravatingExercises.map((entry) => entry.customLabel ?? entry.predefinedId ?? '') ?? [],
    [condition]
  )

  const handleSave = useCallback(() => {
    if (!condition) {
      navigation.goBack()

      return
    }

    dispatch(
      upsertCondition({
        ...condition,
        status
      })
    )
    setReadaptVisible(true)
  }, [condition, dispatch, navigation, status])

  if (!condition) {
    return null
  }

  return (
    <>
      <FlowScreenScaffold
        title={condition.label ?? condition.bodyArea}
        subtitle={t('profileSettings.aggravatorsSubtitle')}
        testID="condition-detail-screen"
        footer={<PrimaryButton label={t('profileSettings.saveChanges')} onPress={handleSave} />}
      >
        <Text style={styles.fieldLabel}>{t('profileSettings.statusLabel')}</Text>
        <StatusSegment value={status} onChange={setStatus} />

        <Text style={styles.fieldLabel}>{t('profileSettings.aggravatorsLabel')}</Text>
        {aggravators.map((exercise) => (
          <View key={exercise} style={styles.exerciseRow}>
            <Text style={styles.exerciseName}>{exercise}</Text>
            <Text style={styles.rowAction}>×</Text>
          </View>
        ))}

        <View style={styles.coachCard}>
          <Text style={styles.coachLabel}>{t('profileSettings.coachLabel')}</Text>
          <Text style={styles.coachText}>{t('profileSettings.coachInsight')}</Text>
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
      />
    </>
  )
}

export default ConditionDetailContainer

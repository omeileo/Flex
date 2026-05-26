import React, { useCallback, useMemo, useState } from 'react'

import { Pressable, Switch, Text, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { resetCycleData, setCycleEnabled } from '@redux/states/profile/cycleProfile/cycleProfile.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import { ProfileNavigation } from '@router/navigators/ProfileStack.types'
import { computeCycleState } from '@shared/functions/Cycle/cycle.functions'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { createProfileFlowStyles } from '@shared/styles/profileFlow.styles'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import BottomSheet from '@shared/components/BottomSheet/BottomSheet.component'
import FlowScreenScaffold from '@shared/components/FlowScreenScaffold/FlowScreenScaffold.component'
import HealthSyncRow from '@shared/components/HealthSyncRow/HealthSyncRow.component'
import PlanReadaptSheet from '@shared/components/PlanReadaptSheet/PlanReadaptSheet.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'

const CycleAwareSettingsContainer = () => {
  const { t } = useTranslation()
  const styles = useThemedStyles(createProfileFlowStyles)
  const navigation = useNavigation<ProfileNavigation>()
  const dispatch = useDispatch<AppDispatch>()
  const cycleProfile = useSelector((state: RootState) => state.cycleProfile)
  const [disableSheetVisible, setDisableSheetVisible] = useState(false)
  const [readaptVisible, setReadaptVisible] = useState(false)

  const computed = useMemo(() => computeCycleState(cycleProfile), [cycleProfile])

  const lastPeriodLabel = useMemo(() => {
    if (!cycleProfile.lastPeriodStartAt) {
      return t('cycleAware.notSet')
    }

    return DateTime.fromISO(cycleProfile.lastPeriodStartAt).toFormat('MMM d, yyyy')
  }, [cycleProfile.lastPeriodStartAt, t])

  const handleToggle = useCallback(
    (enabled: boolean) => {
      if (!enabled) {
        setDisableSheetVisible(true)

        return
      }

      if (!cycleProfile.lastPeriodStartAt) {
        dispatch(setCycleEnabled(true))
        navigation.navigate('CycleSetup')

        return
      }

      dispatch(setCycleEnabled(true))
      setReadaptVisible(true)
    },
    [cycleProfile.lastPeriodStartAt, dispatch, navigation]
  )

  return (
    <>
      <FlowScreenScaffold title={t('cycleAware.settingsTitle')} testID="cycle-aware-settings-screen">
        <View style={styles.settingsRow}>
          <View>
            <Text style={styles.settingsRowLabel}>{t('cycleAware.masterToggle')}</Text>
            <Text style={styles.subtitle}>{t('cycleAware.masterToggleCopy')}</Text>
          </View>
          <Switch value={cycleProfile.enabled} onValueChange={handleToggle} />
        </View>

        <Text style={styles.sectionLabel}>{t('cycleAware.yourCycleSection')}</Text>
        <Pressable style={styles.settingsRow} onPress={() => navigation.navigate('CycleSetup')}>
          <Text style={styles.settingsRowLabel}>{t('cycleAware.lastPeriod')}</Text>
          <Text style={styles.settingsRowValue}>{lastPeriodLabel} ›</Text>
        </Pressable>
        <View style={styles.settingsRow}>
          <Text style={styles.settingsRowLabel}>{t('cycleAware.cycleLength')}</Text>
          <Text style={styles.settingsRowValue}>
            {cycleProfile.avgCycleLengthDays} {t('cycleAware.days')}
          </Text>
        </View>
        <View style={styles.settingsRow}>
          <Text style={styles.settingsRowLabel}>{t('cycleAware.periodLength')}</Text>
          <Text style={styles.settingsRowValue}>
            {cycleProfile.avgPeriodLengthDays} {t('cycleAware.days')}
          </Text>
        </View>

        {computed ? (
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>{t(`cycleAware.phases.${computed.phase}`)}</Text>
            <Text style={styles.infoCardText}>{t('cycleAware.currentDay', { day: computed.cycleDay })}</Text>
          </View>
        ) : null}

        <Text style={styles.sectionLabel}>{t('cycleAware.dataSourcesSection')}</Text>
        <View style={styles.settingsRow}>
          <Text style={styles.settingsRowLabel}>{t('cycleAware.manualLogging')}</Text>
          <Text style={styles.settingsRowValue}>✓</Text>
        </View>
        <HealthSyncRow provider="appleHealth" />
        <HealthSyncRow provider="healthConnect" />

        <Pressable style={styles.settingsRow} onPress={() => navigation.navigate('CustomizeSymptoms')}>
          <Text style={styles.settingsRowLabel}>{t('cycleAware.customizeSymptoms')}</Text>
          <Text style={styles.settingsRowValue}>›</Text>
        </Pressable>

        <PrimaryButton label={t('cycleAware.deleteData')} onPress={() => dispatch(resetCycleData())} />
      </FlowScreenScaffold>

      <BottomSheet visible={disableSheetVisible} onClose={() => setDisableSheetVisible(false)}>
        <Text style={styles.title}>{t('cycleAware.disableTitle')}</Text>
        <Text style={styles.subtitle}>{t('cycleAware.disableCopy')}</Text>
        <PrimaryButton
          label={t('cycleAware.disableConfirm')}
          onPress={() => {
            dispatch(setCycleEnabled(false))
            setDisableSheetVisible(false)
          }}
        />
      </BottomSheet>

      <PlanReadaptSheet
        visible={readaptVisible}
        title={t('cycleAware.readaptTitle')}
        subtitle={t('cycleAware.readaptSubtitle')}
        readaptLabel={t('profileSettings.readaptCta')}
        skipLabel={t('profileSettings.readaptSkip')}
        onReadapt={() => setReadaptVisible(false)}
        onSkip={() => setReadaptVisible(false)}
      />
    </>
  )
}

export default CycleAwareSettingsContainer

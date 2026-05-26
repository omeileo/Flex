import React, { useCallback, useMemo, useState } from 'react'

import { Pressable, Text, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { setCycleEnabled, updateCycleProfile } from '@redux/states/profile/cycleProfile/cycleProfile.slice'
import { AppDispatch } from '@redux/store/store.types'
import { ProfileNavigation } from '@router/navigators/ProfileStack.types'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { createProfileFlowStyles } from '@shared/styles/profileFlow.styles'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import CycleCalendarStrip from '@shared/components/CycleCalendarStrip/CycleCalendarStrip.component'
import FlowScreenScaffold from '@shared/components/FlowScreenScaffold/FlowScreenScaffold.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'

const CycleSetupContainer = () => {
  const { t } = useTranslation()
  const styles = useThemedStyles(createProfileFlowStyles)
  const navigation = useNavigation<ProfileNavigation>()
  const dispatch = useDispatch<AppDispatch>()
  const [step, setStep] = useState<'period' | 'lengths'>('period')
  const [selectedDate, setSelectedDate] = useState(DateTime.now().minus({ days: 7 }).toISODate())
  const [cycleLength, setCycleLength] = useState(28)
  const [periodLength, setPeriodLength] = useState(5)

  const calendarDays = useMemo(() => {
    const start = DateTime.fromISO(selectedDate ?? DateTime.now().toISODate()).startOf('week')

    return Array.from({ length: 7 }).map((_, index) => {
      const date = start.plus({ days: index })
      const iso = date.toISODate() ?? ''
      const dayInPeriod = index < periodLength

      return {
        key: iso,
        label: date.toFormat('ccc').slice(0, 1),
        isSelected: iso === selectedDate,
        isPeriodDay: dayInPeriod
      }
    })
  }, [periodLength, selectedDate])

  const handleContinue = useCallback(() => {
    if (step === 'period') {
      setStep('lengths')

      return
    }

    dispatch(
      updateCycleProfile({
        enabled: true,
        lastPeriodStartAt: selectedDate,
        avgCycleLengthDays: cycleLength,
        avgPeriodLengthDays: periodLength,
        dataSource: 'manual',
        trackedSymptoms: ['energy', 'cramps', 'flow', 'mood', 'bloating']
      })
    )
    dispatch(setCycleEnabled(true))
    navigation.goBack()
  }, [cycleLength, dispatch, navigation, periodLength, selectedDate, step])

  return (
    <FlowScreenScaffold
      title={t('cycleAware.setupTitle')}
      subtitle={step === 'period' ? t('cycleAware.setupPeriodSubtitle') : t('cycleAware.setupLengthsSubtitle')}
      testID="cycle-setup-screen"
      footer={<PrimaryButton label={t('cycleAware.continue')} onPress={handleContinue} />}
    >
      {step === 'period' ? (
        <>
          <Text style={styles.fieldLabel}>{t('cycleAware.lastPeriodHeadline')}</Text>
          <CycleCalendarStrip days={calendarDays} onDayPress={(key) => setSelectedDate(key)} />
          <Text style={styles.title}>
            {DateTime.fromISO(selectedDate ?? DateTime.now().toISODate()).toFormat('MMMM d, yyyy')}
          </Text>
        </>
      ) : (
        <>
          <View style={styles.settingsRow}>
            <Text style={styles.settingsRowLabel}>{t('cycleAware.cycleLength')}</Text>
            <View style={styles.chipRow}>
              <Pressable style={styles.chipInactive} onPress={() => setCycleLength((value) => Math.max(21, value - 1))}>
                <Text style={styles.chipText}>−</Text>
              </Pressable>
              <View style={styles.chip}>
                <Text style={styles.chipText}>{cycleLength}</Text>
              </View>
              <Pressable style={styles.chipInactive} onPress={() => setCycleLength((value) => Math.min(40, value + 1))}>
                <Text style={styles.chipText}>+</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.settingsRow}>
            <Text style={styles.settingsRowLabel}>{t('cycleAware.periodLength')}</Text>
            <View style={styles.chipRow}>
              <Pressable style={styles.chipInactive} onPress={() => setPeriodLength((value) => Math.max(3, value - 1))}>
                <Text style={styles.chipText}>−</Text>
              </Pressable>
              <View style={styles.chip}>
                <Text style={styles.chipText}>{periodLength}</Text>
              </View>
              <Pressable style={styles.chipInactive} onPress={() => setPeriodLength((value) => Math.min(8, value + 1))}>
                <Text style={styles.chipText}>+</Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.footerNote}>{t('cycleAware.setupFootnote')}</Text>
        </>
      )}
    </FlowScreenScaffold>
  )
}

export default CycleSetupContainer

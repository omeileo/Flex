import React from 'react'

import { FlatList, Pressable, Text, View } from 'react-native'

import { useTranslation } from 'react-i18next'

import ErrorView from '@shared/components/ErrorView/ErrorView.component'
import LoadingView from '@shared/components/LoadingView/LoadingView.component'

import styles from './PlanDetail.styles'
import { PlanDetailComponentProps } from './PlanDetail.types'

const PlanDetailComponent = ({
  workout,
  isLoading,
  error,
  onExercisePress,
  onStartWorkout
}: PlanDetailComponentProps) => {
  const { t } = useTranslation()

  if (isLoading && !workout) {
    return <LoadingView message={t('planDetail.loading')} />
  }

  if (error) {
    return <ErrorView message={error} onRetry={onStartWorkout} retryLabel={t('actions.retry')} />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout?.name ?? t('planDetail.title')}</Text>
      <FlatList
        data={workout?.exercises ?? []}
        keyExtractor={(item) => String(item.exerciseId)}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => onExercisePress(item)}>
            <Text style={styles.exerciseName}>{item.exerciseName}</Text>
            <Text style={styles.meta}>{t('planDetail.setsCount', { count: item.sets.length })}</Text>
          </Pressable>
        )}
      />
      <Pressable style={styles.startButton} onPress={onStartWorkout}>
        <Text style={styles.startButtonText}>{t('planDetail.startWorkout')}</Text>
      </Pressable>
    </View>
  )
}

export default PlanDetailComponent

import React from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import ErrorView from '@shared/components/ErrorView/ErrorView.component'
import LoadingView from '@shared/components/LoadingView/LoadingView.component'

import styles from './PlanHome.styles'
import { PlanHomeComponentProps } from './PlanHome.types'

const PlanHomeComponent = ({ plan, isLoading, error, onRefresh, onWorkoutPress }: PlanHomeComponentProps) => {
  const { t } = useTranslation()

  if (isLoading && !plan) {
    return <LoadingView message={ t('planHome.loading') } />
  }

  if (error) {
    return <ErrorView message={ error } onRetry={ onRefresh } retryLabel={ t('actions.retry') } />
  }

  const workouts = plan?.workouts ?? []

  return (
    <View style={ styles.container }>
      <Text style={ styles.heading }>{ t('planHome.title') }</Text>
      <FlatList
        data={ workouts }
        keyExtractor={ (item) => String(item.dayIndex) }
        renderItem={ ({ item }) => (
          <Pressable style={ styles.card } onPress={ () => onWorkoutPress(item) }>
            <Text style={ styles.cardTitle }>{ item.name }</Text>
            <Text style={ styles.cardMeta }>
              { t('planHome.exerciseCount', { count: item.exercises.length }) }
            </Text>
          </Pressable>
        ) }
        ListEmptyComponent={ <Text>{ t('planHome.empty') }</Text> }
      />
    </View>
  )
}

export default PlanHomeComponent

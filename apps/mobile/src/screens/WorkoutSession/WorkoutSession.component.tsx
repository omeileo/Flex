import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import styles from './WorkoutSession.styles'
import { WorkoutSessionComponentProps } from './WorkoutSession.types'

const WorkoutSessionComponent = ({
  workoutName,
  isSubmitting,
  error,
  onComplete,
}: WorkoutSessionComponentProps) => {
  const { t } = useTranslation()

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>{ workoutName }</Text>
      <Text style={ styles.subtitle }>{ t('workoutSession.instructions') }</Text>
      { error ? <Text style={ styles.error }>{ error }</Text> : null }
      <Pressable style={ styles.button } disabled={ isSubmitting } onPress={ onComplete }>
        <Text style={ styles.buttonText }>
          { isSubmitting ? t('workoutSession.completing') : t('workoutSession.complete') }
        </Text>
      </Pressable>
    </View>
  )
}

export default WorkoutSessionComponent

import React from 'react'
import { Text, View } from 'react-native'

import styles from './Coach.styles'
import { CoachComponentProps } from './Coach.types'

const CoachComponent = ({ title, message }: CoachComponentProps) => {
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>{ title }</Text>
      <Text style={ styles.message }>{ message }</Text>
    </View>
  )
}

export default CoachComponent

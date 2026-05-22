import React from 'react'
import { Text, View } from 'react-native'

import styles from './Progress.styles'
import { StubScreenComponentProps } from './Progress.types'

const ProgressComponent = ({ title, message }: StubScreenComponentProps) => {
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>{ title }</Text>
      <Text style={ styles.message }>{ message }</Text>
    </View>
  )
}

export default ProgressComponent

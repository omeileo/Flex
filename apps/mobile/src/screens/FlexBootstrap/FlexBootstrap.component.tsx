import React from 'react'
import { View } from 'react-native'

import LoadingView from '@shared/components/LoadingView/LoadingView.component'

import styles from './FlexBootstrap.styles'
import { FlexBootstrapComponentProps } from './FlexBootstrap.types'

const FlexBootstrapComponent = ({ message }: FlexBootstrapComponentProps) => {
  return (
    <View style={ styles.container }>
      <LoadingView message={ message } />
    </View>
  )
}

export default FlexBootstrapComponent

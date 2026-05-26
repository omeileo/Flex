import React from 'react'

import { View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import LoadingView from '@shared/components/LoadingView/LoadingView.component'

import { createFlexBootstrapStyles } from './FlexBootstrap.styles'
import { FlexBootstrapComponentProps } from './FlexBootstrap.types'

const FlexBootstrapComponent = ({ message }: FlexBootstrapComponentProps) => {
  const styles = useThemedStyles(createFlexBootstrapStyles)

  return (
    <View style={styles.container}>
      <LoadingView message={message} />
    </View>
  )
}

export default FlexBootstrapComponent

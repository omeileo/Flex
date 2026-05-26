import React from 'react'

import { ScrollView, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import { createFlowScreenScaffoldStyles } from './FlowScreenScaffold.styles'
import { FlowScreenScaffoldProps } from './FlowScreenScaffold.types'

const FlowScreenScaffold = ({ title, subtitle, children, testID, footer }: FlowScreenScaffoldProps) => {
  const styles = useThemedStyles(createFlowScreenScaffoldStyles)

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} testID={testID}>
      <View style={styles.headerBand}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {children}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </ScrollView>
  )
}

export default FlowScreenScaffold

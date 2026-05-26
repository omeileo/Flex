import React from 'react'

import { Pressable, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import { createProfileSectionRowStyles } from './ProfileSectionRow.styles'
import { ProfileSectionRowProps } from './ProfileSectionRow.types'

const ProfileSectionRow = ({ title, preview, onPress, trailing, testID }: ProfileSectionRowProps) => {
  const styles = useThemedStyles(createProfileSectionRowStyles)

  return (
    <Pressable style={styles.row} onPress={onPress} accessibilityRole="button" testID={testID} disabled={!onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.preview}>{preview}</Text>
        {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  )
}

export default ProfileSectionRow

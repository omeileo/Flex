import React from 'react'

import { Pressable, Text, View } from 'react-native'

import styles from './ProfileSectionRow.styles'
import { ProfileSectionRowProps } from './ProfileSectionRow.types'

const ProfileSectionRow = ({ title, preview, onPress }: ProfileSectionRowProps) => (
  <Pressable style={styles.row} onPress={onPress} accessibilityRole="button">
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.preview}>{preview}</Text>
    </View>
    <Text style={styles.chevron}>›</Text>
  </Pressable>
)

export default ProfileSectionRow

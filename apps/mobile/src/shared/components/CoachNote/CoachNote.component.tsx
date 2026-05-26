import React from 'react'

import { Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import { createCoachNoteStyles } from './CoachNote.styles'
import { CoachNoteProps } from './CoachNote.types'

const CoachNote = ({ message, coachName = 'Flex Coach' }: CoachNoteProps) => {
  const styles = useThemedStyles(createCoachNoteStyles)
  const initials = coachName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <Text style={styles.message} numberOfLines={3}>
        {message}
      </Text>
    </View>
  )
}

export default CoachNote

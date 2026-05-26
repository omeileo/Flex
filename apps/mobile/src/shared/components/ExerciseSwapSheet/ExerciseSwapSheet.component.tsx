import React from 'react'

import { Pressable, ScrollView, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import { createExerciseSwapSheetStyles } from './ExerciseSwapSheet.styles'
import { ExerciseSwapSheetProps } from './ExerciseSwapSheet.types'

const ExerciseSwapSheet = ({ options, filterChips, onSelect, onCancel }: ExerciseSwapSheetProps) => {
  const styles = useThemedStyles(createExerciseSwapSheetStyles)
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onCancel}>
          <Text style={styles.cancel}>{t('designPreview.activeWorkout.cancel')}</Text>
        </Pressable>
        <Text style={styles.title}>{t('designPreview.activeWorkout.replaceExercise')}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.search}>
        <Text style={styles.searchPlaceholder}>{t('designPreview.activeWorkout.searchExercises')}</Text>
      </View>

      <View style={styles.chips}>
        {filterChips.map((chip) => (
          <View key={chip} style={styles.chip}>
            <Text style={styles.chipText}>{chip}</Text>
          </View>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {options.map((option) => (
          <Pressable key={option.id} style={styles.option} onPress={() => onSelect(option.id)}>
            <View style={styles.thumb} />
            <View>
              <Text style={styles.optionName}>{option.name}</Text>
              <Text style={styles.optionMeta}>{option.equipment}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

export default ExerciseSwapSheet

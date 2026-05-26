import React, { useMemo } from 'react'

import { Pressable, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import EquipmentChip from '@shared/components/EquipmentChip/EquipmentChip.component'

import { createEquipmentPickerSheetStyles } from './EquipmentPickerSheet.styles'
import { EquipmentPickerSheetProps } from './EquipmentPickerSheet.types'

const EquipmentPickerSheet = ({
  locationName,
  categories,
  activeCategory,
  onCategoryChange,
  equipment,
  selectedIds,
  customLabels,
  onToggleEquipment,
  onAddCustomPress,
  onSelectCommon,
  onBodyweightOnly
}: EquipmentPickerSheetProps) => {
  const styles = useThemedStyles(createEquipmentPickerSheetStyles)
  const { t } = useTranslation()

  const filteredEquipment = useMemo(() => {
    if (activeCategory === 'All') {
      return equipment
    }

    return equipment.filter((item) => item.category === activeCategory)
  }, [activeCategory, equipment])

  return (
    <View>
      <Text style={styles.subheader}>
        {t('designPreview.gymLocations.equipmentSubcopy', {
          name: locationName
        })}
      </Text>

      <View style={styles.categoryRow}>
        {categories.map((category) => {
          const active = category === activeCategory

          return (
            <Pressable
              key={category}
              style={[styles.categoryPill, active && styles.categoryPillActive]}
              onPress={() => onCategoryChange(category)}
            >
              <Text style={[styles.categoryText, active && styles.categoryTextActive]}>{category}</Text>
            </Pressable>
          )
        })}
      </View>

      <View style={styles.quickRow}>
        <Pressable style={styles.quickLink} onPress={onSelectCommon}>
          <Text style={styles.quickText}>{t('designPreview.gymLocations.selectCommon')}</Text>
        </Pressable>
        <Pressable style={styles.quickLink} onPress={onBodyweightOnly}>
          <Text style={styles.quickText}>{t('designPreview.gymLocations.bodyweightOnly')}</Text>
        </Pressable>
      </View>

      <View style={styles.chipGrid}>
        {filteredEquipment.map((item) => (
          <EquipmentChip
            key={item.id}
            label={item.label}
            selected={selectedIds.includes(item.id)}
            onPress={() => onToggleEquipment(item.id)}
          />
        ))}
        {customLabels.map((label) => (
          <EquipmentChip key={label} label={label} selected onPress={onAddCustomPress} />
        ))}
      </View>

      <Pressable style={styles.addCustom} onPress={onAddCustomPress}>
        <Text style={styles.addCustomText}>{t('designPreview.gymLocations.addCustom')}</Text>
      </Pressable>
    </View>
  )
}

export default EquipmentPickerSheet

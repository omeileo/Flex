import React, { useCallback, useState } from 'react'

import { Modal, Pressable, Text, TextInput, View } from 'react-native'

import { equipmentCategoryTags } from '@shared/dictionary/equipmentCatalog.dictionary'
import { colors } from '@shared/styles/StyleConstants'
import { useTranslation } from 'react-i18next'

import EquipmentChip from '@shared/components/EquipmentChip/EquipmentChip.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'

import styles from './CustomEquipmentInput.styles'
import { CustomEquipmentInputProps } from './CustomEquipmentInput.types'

const CustomEquipmentInput = ({ visible, onAdd, onClose }: CustomEquipmentInputProps) => {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((current) => {
      if (current.includes(tag)) {
        return current.filter((item) => item !== tag)
      }

      return [...current, tag]
    })
  }, [])

  const handleAdd = useCallback(() => {
    const trimmed = name.trim()

    if (!trimmed) {
      return
    }

    onAdd(trimmed, selectedTags.length > 0 ? selectedTags : ['accessories'])
    setName('')
    setSelectedTags([])
    onClose()
  }, [name, onAdd, onClose, selectedTags])

  const handleClose = useCallback(() => {
    setName('')
    setSelectedTags([])
    onClose()
  }, [onClose])

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Pressable style={styles.sheet} onPress={(event) => event.stopPropagation()}>
          <Text style={styles.title}>{t('designPreview.gymLocations.customTitle')}</Text>
          <Text style={styles.label}>{t('designPreview.gymLocations.customNameLabel')}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder={t('designPreview.gymLocations.customNamePlaceholder')}
            placeholderTextColor={colors.textSecondary}
          />
          <Text style={styles.label}>{t('designPreview.gymLocations.customCategoryLabel')}</Text>
          <View style={styles.chipRow}>
            {equipmentCategoryTags.map((tag) => (
              <EquipmentChip
                key={tag}
                label={tag}
                selected={selectedTags.includes(tag)}
                onPress={() => toggleTag(tag)}
              />
            ))}
          </View>
          <View style={styles.actions}>
            <Pressable style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelText}>{t('designPreview.gymLocations.cancel')}</Text>
            </Pressable>
            <View style={styles.flexOne}>
              <PrimaryButton
                label={t('designPreview.gymLocations.customAdd')}
                onPress={handleAdd}
                disabled={!name.trim()}
              />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default CustomEquipmentInput

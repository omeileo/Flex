import React, { useCallback, useMemo, useState } from 'react'

import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'

import {
  commonEquipmentIds,
  equipmentPickerCategories,
  predefinedEquipmentCatalog
} from '@shared/dictionary/equipmentCatalog.dictionary'
import { colors } from '@shared/styles/StyleConstants'
import { WorkoutLocation } from '@shared/types/workoutEquipment.types'
import { useTranslation } from 'react-i18next'

import CustomEquipmentInput from '@shared/components/CustomEquipmentInput/CustomEquipmentInput.component'
import EquipmentPickerSheet from '@shared/components/EquipmentPickerSheet/EquipmentPickerSheet.component'
import LocationCard from '@shared/components/LocationCard/LocationCard.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'

import { mockWorkoutLocations } from '../designPreviewMock.data'
import styles from './GymLocationsSettingsPreview.styles'
import { GymLocationsSettingsPreviewComponentProps, GymLocationsView } from './GymLocationsSettingsPreview.types'

const buildLocationFromMock = (): WorkoutLocation[] =>
  mockWorkoutLocations.map((loc) => ({
    id: loc.id,
    name: loc.name,
    presetType: loc.presetType,
    isDefault: loc.isDefault,
    equipment: Array.from({ length: loc.equipmentCount }).map((_, index) => ({
      predefinedId: predefinedEquipmentCatalog[index]?.id,
      categoryTags: [predefinedEquipmentCatalog[index]?.category ?? 'Accessories']
    }))
  }))

const GymLocationsSettingsPreviewComponent = (_props: GymLocationsSettingsPreviewComponentProps) => {
  const { t } = useTranslation()
  const [view, setView] = useState<GymLocationsView>('list')
  const [locations, setLocations] = useState<WorkoutLocation[]>(buildLocationFromMock)
  const [activeLocationId, setActiveLocationId] = useState('loc-home')
  const [selectedEquipmentIds, setSelectedEquipmentIds] = useState<string[]>(commonEquipmentIds)
  const [customLabels, setCustomLabels] = useState<string[]>([])
  const [equipmentCategory, setEquipmentCategory] = useState('All')
  const [customModalOpen, setCustomModalOpen] = useState(false)
  const [newLocationName, setNewLocationName] = useState('')

  const activeLocation = useMemo(
    () => locations.find((loc) => loc.id === activeLocationId) ?? locations[0],
    [activeLocationId, locations]
  )

  const equipmentCount = selectedEquipmentIds.length + customLabels.length

  const openDetail = useCallback((id: string) => {
    setActiveLocationId(id)
    setView('detail')
  }, [])

  const toggleEquipment = useCallback((id: string) => {
    setSelectedEquipmentIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id)
      }

      return [...current, id]
    })
  }, [])

  const handleAddCustom = useCallback((name: string) => {
    setCustomLabels((current) => (current.includes(name) ? current : [...current, name]))
  }, [])

  const handleAddLocation = useCallback(() => {
    const trimmed = newLocationName.trim()

    if (!trimmed) {
      return
    }

    const id = `loc-${Date.now()}`
    setLocations((current) => [
      ...current,
      {
        id,
        name: trimmed,
        presetType: 'custom',
        isDefault: current.length === 0,
        equipment: []
      }
    ])
    setActiveLocationId(id)
    setNewLocationName('')
    setView('detail')
  }, [newLocationName])

  const renderList = () => (
    <>
      <Text style={styles.title}>{t('designPreview.gymLocations.listTitle')}</Text>
      <Text style={styles.subtitle}>{t('designPreview.gymLocations.listSubtitle')}</Text>
      {locations.map((loc) => (
        <LocationCard
          key={loc.id}
          name={loc.name}
          presetType={loc.presetType}
          equipmentCount={loc.equipment.length || (loc.id === 'loc-home' ? 8 : 24)}
          isDefault={loc.isDefault}
          onPress={() => openDetail(loc.id)}
        />
      ))}
      <Text style={styles.sectionLabel}>{t('designPreview.gymLocations.addLocationLabel')}</Text>
      <TextInput
        style={styles.input}
        value={newLocationName}
        onChangeText={setNewLocationName}
        placeholder={t('designPreview.gymLocations.locationNamePlaceholder')}
        placeholderTextColor={colors.textSecondary}
      />
      <PrimaryButton
        label={t('designPreview.gymLocations.addLocation')}
        onPress={handleAddLocation}
        disabled={!newLocationName.trim()}
      />
    </>
  )

  const renderDetail = () => (
    <>
      <Text style={styles.title}>{activeLocation?.name}</Text>
      <Pressable style={styles.row} onPress={() => setView('equipment')}>
        <Text style={styles.rowLabel}>{t('designPreview.gymLocations.equipmentRow')}</Text>
        <Text style={styles.rowValue}>
          {equipmentCount} {t('designPreview.gymLocations.selected')} ›
        </Text>
      </Pressable>
      <Pressable style={styles.row} onPress={() => setView('list')}>
        <Text style={styles.rowLabel}>{t('designPreview.gymLocations.setDefault')}</Text>
        <Text style={styles.rowValue}>{activeLocation?.isDefault ? '★' : '—'}</Text>
      </Pressable>
      <PrimaryButton label={t('designPreview.gymLocations.backToList')} onPress={() => setView('list')} />
    </>
  )

  const renderEquipment = () => (
    <>
      <Text style={styles.title}>{t('designPreview.gymLocations.equipmentTitle')}</Text>
      <EquipmentPickerSheet
        locationName={activeLocation?.name ?? ''}
        categories={equipmentPickerCategories}
        activeCategory={equipmentCategory}
        onCategoryChange={setEquipmentCategory}
        equipment={predefinedEquipmentCatalog}
        selectedIds={selectedEquipmentIds}
        customLabels={customLabels}
        onToggleEquipment={toggleEquipment}
        onAddCustomPress={() => setCustomModalOpen(true)}
        onSelectCommon={() => setSelectedEquipmentIds(commonEquipmentIds)}
        onBodyweightOnly={() => {
          setSelectedEquipmentIds([])
          setCustomLabels([])
        }}
      />
      <PrimaryButton label={t('designPreview.gymLocations.saveEquipment')} onPress={() => setView('detail')} />
    </>
  )

  const previewChips: Array<{ key: GymLocationsView; label: string }> = [
    { key: 'list', label: 'List' },
    { key: 'detail', label: 'Detail' },
    { key: 'equipment', label: 'Equipment' }
  ]

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.viewChips}>
          {previewChips.map((chip) => (
            <Pressable
              key={chip.key}
              style={[styles.viewChip, view === chip.key && styles.viewChipActive]}
              onPress={() => setView(chip.key)}
            >
              <Text style={[styles.viewChipText, view === chip.key && styles.viewChipTextActive]}>{chip.label}</Text>
            </Pressable>
          ))}
        </View>

        {view === 'list' ? renderList() : null}
        {view === 'detail' ? renderDetail() : null}
        {view === 'equipment' ? renderEquipment() : null}
      </ScrollView>

      <CustomEquipmentInput
        visible={customModalOpen}
        onAdd={handleAddCustom}
        onClose={() => setCustomModalOpen(false)}
      />
    </View>
  )
}

export default GymLocationsSettingsPreviewComponent

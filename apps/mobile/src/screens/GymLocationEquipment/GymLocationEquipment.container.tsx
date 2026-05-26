import React, { useCallback, useState } from 'react'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { setLocationEquipment } from '@redux/states/profile/workoutLocations/workoutLocations.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import { ProfileStackParamList } from '@router/navigators/ProfileStack.types'
import { ProfileNavigation } from '@router/navigators/ProfileStack.types'
import {
  commonEquipmentIds,
  equipmentPickerCategories,
  predefinedEquipmentCatalog
} from '@shared/dictionary/equipmentCatalog.dictionary'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import CustomEquipmentInput from '@shared/components/CustomEquipmentInput/CustomEquipmentInput.component'
import EquipmentPickerSheet from '@shared/components/EquipmentPickerSheet/EquipmentPickerSheet.component'
import FlowScreenScaffold from '@shared/components/FlowScreenScaffold/FlowScreenScaffold.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'

type GymLocationEquipmentRoute = RouteProp<ProfileStackParamList, 'GymLocationEquipment'>

const GymLocationEquipmentContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<ProfileNavigation>()
  const route = useRoute<GymLocationEquipmentRoute>()
  const dispatch = useDispatch<AppDispatch>()
  const location = useSelector((state: RootState) =>
    state.workoutLocations.locations.find((entry) => entry.id === route.params.locationId)
  )
  const [selectedEquipmentIds, setSelectedEquipmentIds] = useState<string[]>(
    location?.equipment.map((item) => item.predefinedId).filter(Boolean) as string[]
  )
  const [customLabels, setCustomLabels] = useState<string[]>(
    location?.equipment.map((item) => item.customLabel).filter(Boolean) as string[]
  )
  const [equipmentCategory, setEquipmentCategory] = useState('All')
  const [customModalOpen, setCustomModalOpen] = useState(false)

  const toggleEquipment = useCallback((id: string) => {
    setSelectedEquipmentIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    )
  }, [])

  const handleAddCustom = useCallback((name: string) => {
    setCustomLabels((current) => (current.includes(name) ? current : [...current, name]))
  }, [])

  const handleSave = useCallback(() => {
    if (!location) {
      navigation.goBack()

      return
    }

    const equipment = [
      ...selectedEquipmentIds.map((id) => ({
        predefinedId: id,
        categoryTags: [predefinedEquipmentCatalog.find((item) => item.id === id)?.category ?? 'Accessories']
      })),
      ...customLabels.map((label) => ({
        customLabel: label,
        categoryTags: ['Custom']
      }))
    ]

    dispatch(setLocationEquipment({ id: location.id, equipment }))
    navigation.goBack()
  }, [customLabels, dispatch, location, navigation, selectedEquipmentIds])

  if (!location) {
    return null
  }

  return (
    <FlowScreenScaffold
      title={t('gymLocations.equipmentTitle')}
      subtitle={location.name}
      testID="gym-location-equipment-screen"
      footer={<PrimaryButton label={t('gymLocations.saveEquipment')} onPress={handleSave} />}
    >
      <EquipmentPickerSheet
        locationName={location.name}
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

      <CustomEquipmentInput
        visible={customModalOpen}
        onAdd={handleAddCustom}
        onClose={() => setCustomModalOpen(false)}
      />
    </FlowScreenScaffold>
  )
}

export default GymLocationEquipmentContainer

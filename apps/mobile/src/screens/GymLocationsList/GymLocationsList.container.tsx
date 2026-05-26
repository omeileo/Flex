import React, { useCallback, useState } from 'react'

import { TextInput, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { addLocation } from '@redux/states/profile/workoutLocations/workoutLocations.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import { ProfileNavigation } from '@router/navigators/ProfileStack.types'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { createProfileFlowStyles } from '@shared/styles/profileFlow.styles'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import FlowScreenScaffold from '@shared/components/FlowScreenScaffold/FlowScreenScaffold.component'
import LocationCard from '@shared/components/LocationCard/LocationCard.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'

const GymLocationsListContainer = () => {
  const { t } = useTranslation()
  const styles = useThemedStyles(createProfileFlowStyles)
  const navigation = useNavigation<ProfileNavigation>()
  const dispatch = useDispatch<AppDispatch>()
  const locations = useSelector((state: RootState) => state.workoutLocations.locations)
  const [newLocationName, setNewLocationName] = useState('')

  const openDetail = useCallback(
    (locationId: string) => {
      navigation.navigate('GymLocationDetail', { locationId })
    },
    [navigation]
  )

  const handleAddLocation = useCallback(() => {
    const trimmed = newLocationName.trim()

    if (!trimmed) {
      return
    }

    dispatch(
      addLocation({
        name: trimmed,
        presetType: 'custom',
        isDefault: locations.length === 0,
        equipment: []
      })
    )
    setNewLocationName('')
  }, [dispatch, locations.length, newLocationName])

  return (
    <FlowScreenScaffold
      title={t('gymLocations.listTitle')}
      subtitle={t('gymLocations.listSubtitle')}
      testID="gym-locations-list-screen"
      footer={
        <PrimaryButton
          label={t('gymLocations.addLocation')}
          onPress={handleAddLocation}
          disabled={!newLocationName.trim()}
        />
      }
    >
      {locations.map((location) => (
        <LocationCard
          key={location.id}
          name={location.name}
          presetType={location.presetType}
          equipmentCount={location.equipment.length}
          isDefault={location.isDefault}
          onPress={() => openDetail(location.id)}
        />
      ))}

      <View>
        <TextInput
          style={styles.input}
          value={newLocationName}
          onChangeText={setNewLocationName}
          placeholder={t('gymLocations.locationNamePlaceholder')}
          placeholderTextColor={styles.subtitle.color}
          testID="gym-location-name-input"
        />
      </View>
    </FlowScreenScaffold>
  )
}

export default GymLocationsListContainer

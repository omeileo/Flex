import React, { useCallback } from 'react'

import { Pressable, Text } from 'react-native'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { setDefaultLocation } from '@redux/states/profile/workoutLocations/workoutLocations.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import { ProfileStackParamList } from '@router/navigators/ProfileStack.types'
import { ProfileNavigation } from '@router/navigators/ProfileStack.types'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { createProfileFlowStyles } from '@shared/styles/profileFlow.styles'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import FlowScreenScaffold from '@shared/components/FlowScreenScaffold/FlowScreenScaffold.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'

type GymLocationDetailRoute = RouteProp<ProfileStackParamList, 'GymLocationDetail'>

const GymLocationDetailContainer = () => {
  const { t } = useTranslation()
  const styles = useThemedStyles(createProfileFlowStyles)
  const navigation = useNavigation<ProfileNavigation>()
  const route = useRoute<GymLocationDetailRoute>()
  const dispatch = useDispatch<AppDispatch>()
  const location = useSelector((state: RootState) =>
    state.workoutLocations.locations.find((entry) => entry.id === route.params.locationId)
  )

  const openEquipment = useCallback(() => {
    navigation.navigate('GymLocationEquipment', { locationId: route.params.locationId })
  }, [navigation, route.params.locationId])

  const handleSetDefault = useCallback(() => {
    dispatch(setDefaultLocation(route.params.locationId))
  }, [dispatch, route.params.locationId])

  if (!location) {
    return null
  }

  return (
    <FlowScreenScaffold title={location.name} testID="gym-location-detail-screen">
      <Pressable style={styles.settingsRow} onPress={openEquipment}>
        <Text style={styles.settingsRowLabel}>{t('gymLocations.equipmentRow')}</Text>
        <Text style={styles.settingsRowValue}>
          {location.equipment.length} {t('gymLocations.selected')} ›
        </Text>
      </Pressable>

      <Pressable style={styles.settingsRow} onPress={handleSetDefault}>
        <Text style={styles.settingsRowLabel}>{t('gymLocations.setDefault')}</Text>
        <Text style={styles.settingsRowValue}>{location.isDefault ? '★' : '—'}</Text>
      </Pressable>

      <PrimaryButton label={t('gymLocations.backToList')} onPress={() => navigation.goBack()} />
    </FlowScreenScaffold>
  )
}

export default GymLocationDetailContainer

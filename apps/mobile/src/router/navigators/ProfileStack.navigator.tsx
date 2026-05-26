import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'

import Appearance from '@screens/Appearance/Appearance.container'
import AgeFitness from '@screens/AgeFitness/AgeFitness.container'
import ConditionDetail from '@screens/ConditionDetail/ConditionDetail.container'
import CustomizeSymptoms from '@screens/CustomizeSymptoms/CustomizeSymptoms.container'
import CycleAwareSettings from '@screens/CycleAwareSettings/CycleAwareSettings.container'
import CycleSetup from '@screens/CycleSetup/CycleSetup.container'
import DietPreferences from '@screens/DietPreferences/DietPreferences.container'
import ExcludedExercises from '@screens/ExcludedExercises/ExcludedExercises.container'
import GoalsAndSchedule from '@screens/GoalsAndSchedule/GoalsAndSchedule.container'
import GymLocationDetail from '@screens/GymLocationDetail/GymLocationDetail.container'
import GymLocationEquipment from '@screens/GymLocationEquipment/GymLocationEquipment.container'
import GymLocationsList from '@screens/GymLocationsList/GymLocationsList.container'
import Profile from '@screens/Profile/Profile.container'
import WellnessOverview from '@screens/WellnessOverview/WellnessOverview.container'

import { ProfileStackParamList } from './ProfileStack.types'

const Stack = createNativeStackNavigator<ProfileStackParamList>()

const ProfileStackNavigator = () => {
  const { t } = useTranslation()

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="TrainingProfile"
        component={Profile}
        options={{ title: t('tabs.profile'), headerShown: false }}
      />
      <Stack.Screen
        name="GoalsAndSchedule"
        component={GoalsAndSchedule}
        options={{ title: t('profileSettings.goalsTitle') }}
      />
      <Stack.Screen
        name="WellnessOverview"
        component={WellnessOverview}
        options={{ title: t('profileSettings.wellnessTitle') }}
      />
      <Stack.Screen
        name="ConditionDetail"
        component={ConditionDetail}
        options={{ title: t('profileSettings.conditionTitle') }}
      />
      <Stack.Screen
        name="ExcludedExercises"
        component={ExcludedExercises}
        options={{ title: t('profileSettings.excludedTitle') }}
      />
      <Stack.Screen
        name="Appearance"
        component={Appearance}
        options={{ title: t('profileSettings.appearanceTitle') }}
      />
      <Stack.Screen
        name="GymLocationsList"
        component={GymLocationsList}
        options={{ title: t('gymLocations.listTitle') }}
      />
      <Stack.Screen
        name="GymLocationDetail"
        component={GymLocationDetail}
        options={{ title: t('gymLocations.detailTitle') }}
      />
      <Stack.Screen
        name="GymLocationEquipment"
        component={GymLocationEquipment}
        options={{ title: t('gymLocations.equipmentTitle') }}
      />
      <Stack.Screen
        name="CycleAwareSettings"
        component={CycleAwareSettings}
        options={{ title: t('cycleAware.settingsTitle') }}
      />
      <Stack.Screen name="CycleSetup" component={CycleSetup} options={{ title: t('cycleAware.setupTitle') }} />
      <Stack.Screen
        name="CustomizeSymptoms"
        component={CustomizeSymptoms}
        options={{ title: t('cycleAware.symptomsTitle') }}
      />
      <Stack.Screen
        name="DietPreferences"
        component={DietPreferences}
        options={{ title: t('profileSettings.dietTitle') }}
      />
      <Stack.Screen name="AgeFitness" component={AgeFitness} options={{ title: t('profileSettings.ageTitle') }} />
    </Stack.Navigator>
  )
}

export default ProfileStackNavigator

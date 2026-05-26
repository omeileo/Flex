import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type ProfileStackParamList = {
  TrainingProfile: undefined
  GoalsAndSchedule: undefined
  WellnessOverview: undefined
  ConditionDetail: { conditionId: string }
  ExcludedExercises: undefined
  Appearance: undefined
  GymLocationsList: undefined
  GymLocationDetail: { locationId: string }
  GymLocationEquipment: { locationId: string }
  CycleAwareSettings: undefined
  CycleSetup: undefined
  CustomizeSymptoms: undefined
}

export type ProfileNavigation = NativeStackNavigationProp<ProfileStackParamList>

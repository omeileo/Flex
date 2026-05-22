import FlexBootstrap from '../screens/FlexBootstrap/FlexBootstrap.container'
import ProfileOnboarding from '../screens/ProfileOnboarding/ProfileOnboarding.container'
import PlanDetail from '../screens/PlanDetail/PlanDetail.container'
import WorkoutSession from '../screens/WorkoutSession/WorkoutSession.container'
import ExerciseDetail from '../screens/ExerciseDetail/ExerciseDetail.container'
import MainTabsNavigator from './navigators/MainTabs.navigator'

const routes = {
  flexBootstrap: {
    name: 'FlexBootstrap',
    path: 'FlexBootstrap',
    isAuthenticationRequired: false,
    component: FlexBootstrap,
    options: {
      headerShown: false,
      title: 'Flex',
    },
  },
  mainTabs: {
    name: 'MainTabs',
    path: 'MainTabs',
    isAuthenticationRequired: true,
    requiresFlexSetup: true,
    component: MainTabsNavigator,
    options: {
      headerShown: false,
      title: 'Flex',
    },
  },
  profileOnboarding: {
    name: 'ProfileOnboarding',
    path: 'ProfileOnboarding',
    isAuthenticationRequired: true,
    component: ProfileOnboarding,
    options: {
      headerShown: true,
      title: 'Profile',
    },
  },
  planDetail: {
    name: 'PlanDetail',
    path: 'PlanDetail',
    isAuthenticationRequired: true,
    requiresFlexSetup: true,
    component: PlanDetail,
    options: {
      headerShown: true,
      title: 'Workout',
    },
  },
  workoutSession: {
    name: 'WorkoutSession',
    path: 'WorkoutSession',
    isAuthenticationRequired: true,
    requiresFlexSetup: true,
    component: WorkoutSession,
    options: {
      headerShown: true,
      title: 'Session',
    },
  },
  exerciseDetail: {
    name: 'ExerciseDetail',
    path: 'ExerciseDetail',
    isAuthenticationRequired: true,
    requiresFlexSetup: true,
    component: ExerciseDetail,
    options: {
      headerShown: true,
      title: 'Exercise',
    },
  },
}

export default routes

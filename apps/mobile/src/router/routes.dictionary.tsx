import FlexBootstrap from '../screens/FlexBootstrap/FlexBootstrap.container'
import Landing from '../screens/Landing/Landing.container'
import Login from '../screens/Login/Login.container'
import SignUp from '../screens/SignUp/SignUp.container'
import VerifyEmail from '../screens/VerifyEmail/VerifyEmail.container'
import ProfileOnboarding from '../screens/ProfileOnboarding/ProfileOnboarding.container'
import PlanDetail from '../screens/PlanDetail/PlanDetail.container'
import WorkoutSession from '../screens/WorkoutSession/WorkoutSession.container'
import ExerciseDetail from '../screens/ExerciseDetail/ExerciseDetail.container'
import MainTabsNavigator from './navigators/MainTabs.navigator'

const routes = {
  landing: {
    name: 'Landing',
    path: 'Landing',
    isAuthenticationRequired: false,
    component: Landing,
    options: {
      headerShown: false,
      title: 'Flex',
    },
  },
  login: {
    name: 'Login',
    path: 'Login',
    isAuthenticationRequired: false,
    component: Login,
    options: {
      headerShown: true,
      title: 'Log in',
    },
  },
  signUp: {
    name: 'SignUp',
    path: 'SignUp',
    isAuthenticationRequired: false,
    component: SignUp,
    options: {
      headerShown: true,
      title: 'Sign up',
    },
  },
  verifyEmail: {
    name: 'VerifyEmail',
    path: 'VerifyEmail',
    isAuthenticationRequired: false,
    component: VerifyEmail,
    options: {
      headerShown: true,
      title: 'Verify email',
    },
  },
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

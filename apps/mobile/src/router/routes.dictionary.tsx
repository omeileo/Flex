import DesignPreviewHub from '../screens/DesignPreview/DesignPreviewHub/DesignPreviewHub.container';
import OnboardingFlowPreview from '../screens/DesignPreview/OnboardingFlowPreview/OnboardingFlowPreview.container';
import TrainingPlanFlowPreview from '../screens/DesignPreview/TrainingPlanFlowPreview/TrainingPlanFlowPreview.container';
import GymLocationsSettingsPreview from '../screens/DesignPreview/GymLocationsSettingsPreview/GymLocationsSettingsPreview.container';
import ActiveWorkoutFlowPreview from '../screens/DesignPreview/ActiveWorkoutFlowPreview/ActiveWorkoutFlowPreview.container';
import AuthFlowPreview from '../screens/DesignPreview/AuthFlowPreview/AuthFlowPreview.container';
import ProfileSettingsFlowPreview from '../screens/DesignPreview/ProfileSettingsFlowPreview/ProfileSettingsFlowPreview.container';
import FlexBootstrap from '../screens/FlexBootstrap/FlexBootstrap.container';
import Landing from '../screens/Landing/Landing.container';
import Login from '../screens/Login/Login.container';
import SignUp from '../screens/SignUp/SignUp.container';
import VerifyEmail from '../screens/VerifyEmail/VerifyEmail.container';
import ProfileOnboarding from '../screens/ProfileOnboarding/ProfileOnboarding.container';
import PlanDetail from '../screens/PlanDetail/PlanDetail.container';
import WorkoutSession from '../screens/WorkoutSession/WorkoutSession.container';
import ExerciseDetail from '../screens/ExerciseDetail/ExerciseDetail.container';
import MainTabsNavigator from './navigators/MainTabs.navigator';

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
  designPreviewHub: {
    name: 'DesignPreviewHub',
    path: 'DesignPreviewHub',
    isAuthenticationRequired: false,
    component: DesignPreviewHub,
    options: {
      headerShown: true,
      title: 'Design Preview',
    },
  },
  onboardingFlowPreview: {
    name: 'OnboardingFlowPreview',
    path: 'OnboardingFlowPreview',
    isAuthenticationRequired: false,
    component: OnboardingFlowPreview,
    options: {
      headerShown: true,
      title: 'Onboarding Preview',
    },
  },
  trainingPlanFlowPreview: {
    name: 'TrainingPlanFlowPreview',
    path: 'TrainingPlanFlowPreview',
    isAuthenticationRequired: false,
    component: TrainingPlanFlowPreview,
    options: {
      headerShown: true,
      title: 'Training Plan Preview',
    },
  },
  activeWorkoutFlowPreview: {
    name: 'ActiveWorkoutFlowPreview',
    path: 'ActiveWorkoutFlowPreview',
    isAuthenticationRequired: false,
    component: ActiveWorkoutFlowPreview,
    options: {
      headerShown: true,
      title: 'Active Workout Preview',
    },
  },
  gymLocationsSettingsPreview: {
    name: 'GymLocationsSettingsPreview',
    path: 'GymLocationsSettingsPreview',
    isAuthenticationRequired: false,
    component: GymLocationsSettingsPreview,
    options: {
      headerShown: true,
      title: 'Gym Locations Preview',
    },
  },
  authFlowPreview: {
    name: 'AuthFlowPreview',
    path: 'AuthFlowPreview',
    isAuthenticationRequired: false,
    component: AuthFlowPreview,
    options: {
      headerShown: true,
      title: 'Auth Preview',
    },
  },
  profileSettingsFlowPreview: {
    name: 'ProfileSettingsFlowPreview',
    path: 'ProfileSettingsFlowPreview',
    isAuthenticationRequired: false,
    component: ProfileSettingsFlowPreview,
    options: {
      headerShown: true,
      title: 'Profile Settings Preview',
    },
  },
};

export default routes;

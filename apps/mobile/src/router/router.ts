import router from './functions/router.functions'
import routes from './routes.dictionary'

const APP_ROUTES = [
  routes.landing,
  routes.login,
  routes.signUp,
  routes.verifyEmail,
  routes.forgetPassword,
  routes.flexBootstrap,
  routes.mainTabs,
  routes.profileOnboarding,
  routes.planDetail,
  routes.workoutSession,
  routes.exerciseDetail,
  routes.designPreviewHub,
  routes.onboardingFlowPreview,
  routes.trainingPlanFlowPreview,
  routes.activeWorkoutFlowPreview,
  routes.gymLocationsSettingsPreview
]

export const createAppRoutes = (initialRouteName: string) => router.generateRoutes(APP_ROUTES, { initialRouteName })

export default createAppRoutes(routes.landing.path)

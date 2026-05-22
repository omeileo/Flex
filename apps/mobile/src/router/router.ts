import router from './functions/router.functions'
import routes from './routes.dictionary'

const ROUTES = router.generateRoutes([
  routes.landing,
  routes.login,
  routes.signUp,
  routes.verifyEmail,
  routes.flexBootstrap,
  routes.mainTabs,
  routes.profileOnboarding,
  routes.planDetail,
  routes.workoutSession,
  routes.exerciseDetail,
], { initialRouteName: routes.landing.path })

export default ROUTES

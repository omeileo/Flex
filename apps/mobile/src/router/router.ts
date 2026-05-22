import router from './functions/router.functions'
import routes from './routes.dictionary'

const ROUTES = router.generateRoutes([
  routes.flexBootstrap,
  routes.mainTabs,
  routes.profileOnboarding,
  routes.planDetail,
  routes.workoutSession,
  routes.exerciseDetail,
], { initialRouteName: routes.flexBootstrap.path })

export default ROUTES

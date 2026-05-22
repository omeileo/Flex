import router from './functions/router.functions';
import routes from './routes.dictionary';

const ROUTES = router.generateRoutes(
  [
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
    routes.designPreviewHub,
    routes.onboardingFlowPreview,
    routes.trainingPlanFlowPreview,
    routes.activeWorkoutFlowPreview,
    routes.gymLocationsSettingsPreview,
  ],
  { initialRouteName: routes.landing.path },
);

export default ROUTES;

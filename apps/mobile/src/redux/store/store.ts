import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'

import forgetPasswordReducer from '../states/auth/forgetPassword/forgetPassword.slice'
import loginReducer from '../states/auth/login/login.slice'
import signUpReducer from '../states/auth/signUp/signUp.slice'
import verifyEmailReducer from '../states/auth/verifyEmail/verifyEmail.slice'
import cycleProfileReducer from '../states/profile/cycleProfile/cycleProfile.slice'
import getProfileReducer from '../states/profile/getProfile/getProfile.slice'
import saveProfileReducer from '../states/profile/saveProfile/saveProfile.slice'
import wellnessReducer from '../states/profile/wellness/wellness.slice'
import workoutLocationsReducer from '../states/profile/workoutLocations/workoutLocations.slice'
import themeReducer from '../states/settings/theme/theme.slice'
import generatePlanReducer from '../states/trainingPlan/generatePlan/generatePlan.slice'
import getActivePlanReducer from '../states/trainingPlan/getActivePlan/getActivePlan.slice'
import getPlanChangesReducer from '../states/trainingPlan/getPlanChanges/getPlanChanges.slice'
import completeWorkoutSessionReducer from '../states/workoutSession/completeWorkoutSession/completeWorkoutSession.slice'
import createWorkoutSessionReducer from '../states/workoutSession/createWorkoutSession/createWorkoutSession.slice'

const appReducer = combineReducers({
  login: loginReducer,
  forgetPassword: forgetPasswordReducer,
  signUp: signUpReducer,
  verifyEmail: verifyEmailReducer,
  getProfile: getProfileReducer,
  saveProfile: saveProfileReducer,
  workoutLocations: workoutLocationsReducer,
  wellness: wellnessReducer,
  cycleProfile: cycleProfileReducer,
  generatePlan: generatePlanReducer,
  getActivePlan: getActivePlanReducer,
  getPlanChanges: getPlanChangesReducer,
  createWorkoutSession: createWorkoutSessionReducer,
  completeWorkoutSession: completeWorkoutSessionReducer,
  theme: themeReducer
})

const RESET_APP = 'app/reset'

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
  if (action.type === RESET_APP) {
    state = undefined
  }

  return appReducer(state, action)
}

const store = configureStore({
  reducer: rootReducer
})

export default store

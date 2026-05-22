import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'

import loginReducer from '../states/auth/login/login.slice'
import signUpReducer from '../states/auth/signUp/signUp.slice'
import verifyEmailReducer from '../states/auth/verifyEmail/verifyEmail.slice'
import getProfileReducer from '../states/profile/getProfile/getProfile.slice'
import saveProfileReducer from '../states/profile/saveProfile/saveProfile.slice'
import generatePlanReducer from '../states/trainingPlan/generatePlan/generatePlan.slice'
import getActivePlanReducer from '../states/trainingPlan/getActivePlan/getActivePlan.slice'
import getPlanChangesReducer from '../states/trainingPlan/getPlanChanges/getPlanChanges.slice'
import createWorkoutSessionReducer from '../states/workoutSession/createWorkoutSession/createWorkoutSession.slice'
import completeWorkoutSessionReducer from '../states/workoutSession/completeWorkoutSession/completeWorkoutSession.slice'

const appReducer = combineReducers({
  login: loginReducer,
  signUp: signUpReducer,
  verifyEmail: verifyEmailReducer,
  getProfile: getProfileReducer,
  saveProfile: saveProfileReducer,
  generatePlan: generatePlanReducer,
  getActivePlan: getActivePlanReducer,
  getPlanChanges: getPlanChangesReducer,
  createWorkoutSession: createWorkoutSessionReducer,
  completeWorkoutSession: completeWorkoutSessionReducer
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

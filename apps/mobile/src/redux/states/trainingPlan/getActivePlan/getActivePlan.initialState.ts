import { GetActivePlanState } from './getActivePlan.types'

const initialState: GetActivePlanState = {
  loading: false,
  error: null,
  notFound: false,
  success: null
}

export default initialState

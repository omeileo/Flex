import { WorkoutLocation } from '@shared/types/workoutEquipment.types'

export type WorkoutLocationsState = {
  locations: WorkoutLocation[]
  activeLocationId: string | null
  hydrated: boolean
}

export type UpsertLocationPayload = Omit<WorkoutLocation, 'id' | 'isDefault'> & {
  id?: string
  isDefault?: boolean
}

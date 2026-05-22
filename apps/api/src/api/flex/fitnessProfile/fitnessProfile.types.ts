import { FitnessProfileUpsert } from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas'

export type UpsertFitnessProfileRequest = FitnessProfileUpsert

export type FitnessProfileResponse = FitnessProfileUpsert & {
  id: number
  userId: number
}

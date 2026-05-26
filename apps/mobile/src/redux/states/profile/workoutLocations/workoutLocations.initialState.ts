import { WorkoutLocation } from '@shared/types/workoutEquipment.types'

import { WorkoutLocationsState } from './workoutLocations.types'

const defaultLocations: WorkoutLocation[] = [
  {
    id: 'loc-home',
    name: 'Home Gym',
    presetType: 'home',
    isDefault: true,
    equipment: [
      { predefinedId: 'barbell', categoryTags: ['Free weights'] },
      { predefinedId: 'dumbbells', categoryTags: ['Free weights'] },
      { predefinedId: 'bench', categoryTags: ['Racks'] },
      { predefinedId: 'pull-up-bar', categoryTags: ['Accessories'] }
    ]
  },
  {
    id: 'loc-gym',
    name: 'LA Fitness',
    presetType: 'commercial',
    isDefault: false,
    equipment: [
      { predefinedId: 'barbell', categoryTags: ['Free weights'] },
      { predefinedId: 'dumbbells', categoryTags: ['Free weights'] },
      { predefinedId: 'cable-machine', categoryTags: ['Machines'] },
      { predefinedId: 'leg-press', categoryTags: ['Machines'] }
    ]
  }
]

const workoutLocationsInitialState: WorkoutLocationsState = {
  locations: defaultLocations,
  activeLocationId: 'loc-home',
  hydrated: false
}

export default workoutLocationsInitialState

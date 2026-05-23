export type EquipmentPresetType = 'home' | 'commercial' | 'travel' | 'custom'

export type PredefinedEquipment = {
  id: string
  label: string
  category: string
}

export type EquipmentItem = {
  predefinedId?: string
  customLabel?: string
  categoryTags: string[]
  quantity?: number
}

export type WorkoutLocation = {
  id: string
  name: string
  notes?: string
  presetType: EquipmentPresetType
  isDefault: boolean
  equipment: EquipmentItem[]
}

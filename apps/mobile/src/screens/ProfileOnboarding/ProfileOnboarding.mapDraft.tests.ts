import { mapOnboardingDraftToProfile } from './ProfileOnboarding.mapDraft'
import { ProfileOnboardingDraft } from './ProfileOnboarding.types'

describe('mapOnboardingDraftToProfile', () => {
  it('maps onboarding draft into fitness profile upsert payload', () => {
    const draft: ProfileOnboardingDraft = {
      goals: ['Build muscle', 'Lose fat'],
      injuries: ['Knee'],
      injuryState: 'managing',
      restrictions: ['Deep squat'],
      diet: 'High protein',
      calorieTarget: '2200',
      ageBand: '25–34',
      fitnessLevel: 2,
      sexAtBirth: 'female',
      defaultLocationId: 'loc-1',
      locations: [
        {
          id: 'loc-1',
          name: 'Home Gym',
          presetType: 'home',
          isDefault: true,
          equipment: [{ predefinedId: 'dumbbells', categoryTags: ['Free weights'] }]
        }
      ]
    }

    const profile = mapOnboardingDraftToProfile(draft)

    expect(profile.goal).toBe('Build muscle, Lose fat')
    expect(profile.experienceLevel).toBe('advanced')
    expect(profile.equipment).toEqual(['dumbbells'])
    expect(profile.preferences?.defaultLocationId).toBe('loc-1')
  })
})

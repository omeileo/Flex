import React, { useCallback } from 'react'

import { useNavigation } from '@react-navigation/native'
import { saveProfile } from '@redux/states/profile/saveProfile/saveProfile.slice'
import { generatePlan } from '@redux/states/trainingPlan/generatePlan/generatePlan.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import { RootStackNavigationProp } from '@router/router.types'
import { useDispatch, useSelector } from 'react-redux'

import ProfileOnboardingComponent from './ProfileOnboarding.component'

import { mapOnboardingDraftToProfile } from './ProfileOnboarding.mapDraft'
import { ProfileOnboardingDraft } from './ProfileOnboarding.types'

const ProfileOnboardingContainer = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation<RootStackNavigationProp>()
  const { loading, error } = useSelector((state: RootState) => state.saveProfile)

  const handleComplete = useCallback(
    async (draft: ProfileOnboardingDraft) => {
      try {
        await dispatch(saveProfile(mapOnboardingDraftToProfile(draft))).unwrap()
        await dispatch(generatePlan()).unwrap()
        navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] })
      } catch {
        // error surfaced via selector
      }
    },
    [dispatch, navigation]
  )

  return <ProfileOnboardingComponent isSubmitting={loading} error={error} onComplete={handleComplete} />
}

export default ProfileOnboardingContainer

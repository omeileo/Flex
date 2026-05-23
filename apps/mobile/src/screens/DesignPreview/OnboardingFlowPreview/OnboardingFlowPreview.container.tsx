import React, { useCallback } from 'react'

import { useNavigation } from '@react-navigation/native'
import { RootStackNavigationProp } from '@router/router.types'

import OnboardingFlowPreviewComponent from './OnboardingFlowPreview.component'

const OnboardingFlowPreviewContainer = () => {
  const navigation = useNavigation<RootStackNavigationProp>()

  const handleComplete = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const handleViewPlan = useCallback(() => {
    navigation.replace('TrainingPlanFlowPreview')
  }, [navigation])

  return <OnboardingFlowPreviewComponent onComplete={handleComplete} onViewPlan={handleViewPlan} />
}

export default OnboardingFlowPreviewContainer

import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { RootStackNavigationProp } from '@router/router.types';

import DesignPreviewHubComponent from './DesignPreviewHub.component';

const DesignPreviewHubContainer = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleOpenOnboarding = useCallback(() => {
    navigation.navigate('OnboardingFlowPreview');
  }, [navigation]);

  const handleOpenTrainingPlan = useCallback(() => {
    navigation.navigate('TrainingPlanFlowPreview');
  }, [navigation]);

  const handleOpenActiveWorkout = useCallback(() => {
    navigation.navigate('ActiveWorkoutFlowPreview');
  }, [navigation]);

  const handleOpenGymLocations = useCallback(() => {
    navigation.navigate('GymLocationsSettingsPreview');
  }, [navigation]);

  const handleOpenAuth = useCallback(() => {
    navigation.navigate('AuthFlowPreview');
  }, [navigation]);

  const handleOpenProfileSettings = useCallback(() => {
    navigation.navigate('ProfileSettingsFlowPreview');
  }, [navigation]);

  return (
    <DesignPreviewHubComponent
      onOpenOnboarding={handleOpenOnboarding}
      onOpenTrainingPlan={handleOpenTrainingPlan}
      onOpenActiveWorkout={handleOpenActiveWorkout}
      onOpenGymLocations={handleOpenGymLocations}
      onOpenAuth={handleOpenAuth}
      onOpenProfileSettings={handleOpenProfileSettings}
    />
  );
};

export default DesignPreviewHubContainer;

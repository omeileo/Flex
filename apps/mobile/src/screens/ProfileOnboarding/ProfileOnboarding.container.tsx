import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RootStackNavigationProp } from '@router/router.types';

import { saveProfile } from '@redux/states/profile/saveProfile/saveProfile.slice';
import { generatePlan } from '@redux/states/trainingPlan/generatePlan/generatePlan.slice';
import { AppDispatch, RootState } from '@redux/store/store.types';

import ProfileOnboardingComponent from './ProfileOnboarding.component';
import { ProfileOnboardingFormValues } from './ProfileOnboarding.types';

const ProfileOnboardingContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const { loading, error } = useSelector(
    (state: RootState) => state.saveProfile,
  );

  const handleSubmit = useCallback(
    async (values: ProfileOnboardingFormValues) => {
      try {
        await dispatch(saveProfile(values)).unwrap();
        await dispatch(generatePlan()).unwrap();
        navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
      } catch {
        // error surfaced via selector
      }
    },
    [dispatch, navigation],
  );

  return (
    <ProfileOnboardingComponent
      isSubmitting={loading}
      error={error}
      onSubmit={handleSubmit}
    />
  );
};

export default ProfileOnboardingContainer;

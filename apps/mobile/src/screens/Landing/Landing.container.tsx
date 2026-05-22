import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { RootStackNavigationProp } from '@router/router.types';

import LandingComponent from './Landing.component';

const LandingContainer = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const handleSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const handleDesignPreview = useCallback(() => {
    navigation.navigate('DesignPreviewHub');
  }, [navigation]);

  return (
    <LandingComponent
      onLogin={handleLogin}
      onSignUp={handleSignUp}
      onDesignPreview={handleDesignPreview}
      showDesignPreview={__DEV__}
    />
  );
};

export default LandingContainer;

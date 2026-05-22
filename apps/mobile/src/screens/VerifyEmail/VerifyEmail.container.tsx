import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

import { RootStackNavigationProp } from '@router/router.types';
import {
  resendVerifyEmail,
  verifyEmail,
  verifyEmailActions,
} from '@redux/states/auth/verifyEmail/verifyEmail.slice';
import { AppDispatch, RootState } from '@redux/store/store.types';

import VerifyEmailComponent from './VerifyEmail.component';
import { VerifyEmailRouteParams } from './VerifyEmail.types';
import { verifyEmailSchema } from './VerifyEmail.validation';

const VerifyEmailContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute();
  const routeParams = (route.params ?? {}) as VerifyEmailRouteParams;
  const deepLinkHandled = useRef(false);

  const [email, setEmail] = useState(routeParams.email ?? '');
  const [code, setCode] = useState((routeParams.code ?? '').toUpperCase());

  const { loading, resendLoading, error, resendMessage } = useSelector(
    (state: RootState) => state.verifyEmail,
  );

  const submitVerification = useCallback(
    async (emailValue: string, codeValue: string) => {
      try {
        const payload = {
          email: emailValue.trim(),
          code: codeValue.trim().toUpperCase(),
        };

        await verifyEmailSchema.validate(payload);
        await dispatch(verifyEmail(payload)).unwrap();

        navigation.navigate('Login', {
          successMessage: 'Your email is verified. You can log in now.',
        });
      } catch {
        // validation or API errors surfaced via state
      }
    },
    [dispatch, navigation],
  );

  useEffect(() => {
    if (deepLinkHandled.current || !routeParams.code) {
      return;
    }

    if (!routeParams.email) {
      return;
    }

    deepLinkHandled.current = true;
    submitVerification(routeParams.email, routeParams.code);
  }, [routeParams.code, routeParams.email, submitVerification]);

  const handleSubmit = useCallback(() => {
    submitVerification(email, code);
  }, [email, code, submitVerification]);

  const handleResendPress = useCallback(async () => {
    try {
      await verifyEmailSchema.pick(['email']).validate({ email });
      await dispatch(resendVerifyEmail({ email: email.trim() })).unwrap();
    } catch {
      // errors surfaced via selector
    }
  }, [dispatch, email]);

  const handleLoginPress = useCallback(() => {
    dispatch(verifyEmailActions.clearVerifyEmailState());
    navigation.navigate('Login');
  }, [dispatch, navigation]);

  return (
    <VerifyEmailComponent
      email={email}
      code={code}
      isSubmitting={loading}
      isResending={resendLoading}
      error={error}
      resendMessage={resendMessage}
      emailReadOnly={Boolean(routeParams.email)}
      onEmailChange={setEmail}
      onCodeChange={value => setCode(value.toUpperCase())}
      onSubmit={handleSubmit}
      onResendPress={handleResendPress}
      onLoginPress={handleLoginPress}
    />
  );
};

export default VerifyEmailContainer;

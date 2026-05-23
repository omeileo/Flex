import React, { useCallback } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'
import { login, loginActions } from '@redux/states/auth/login/login.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import { RootStackNavigationProp } from '@router/router.types'
import { isAccountNotVerifiedError } from '@shared/functions/Auth/auth.functions'
import { useDispatch, useSelector } from 'react-redux'

import LoginComponent from './Login.component'

import { LoginFormValues, LoginRouteParams } from './Login.types'

const LoginContainer = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation<RootStackNavigationProp>()
  const route = useRoute()
  const routeParams = (route.params ?? {}) as LoginRouteParams
  const { loading, error } = useSelector((state: RootState) => state.login)

  const handleSubmit = useCallback(
    async (values: LoginFormValues) => {
      try {
        await dispatch(login(values)).unwrap()
        navigation.reset({ index: 0, routes: [{ name: 'FlexBootstrap' }] })
      } catch (error) {
        const rejected = error as { message?: string; accountNotVerified?: boolean }

        if (isAccountNotVerifiedError(rejected)) {
          dispatch(loginActions.clearLoginError())
          navigation.navigate('VerifyEmail', {
            email: values.email.trim(),
            verificationEmailSent: true
          })
        }
      }
    },
    [dispatch, navigation]
  )

  const handleSignUpPress = useCallback(() => {
    dispatch(loginActions.clearLoginError())
    navigation.navigate('SignUp')
  }, [dispatch, navigation])

  const handleForgotPasswordPress = useCallback(
    (email: string) => {
      dispatch(loginActions.clearLoginError())
      navigation.navigate('ForgetPassword', { email: email.trim() })
    },
    [dispatch, navigation]
  )

  return (
    <LoginComponent
      isSubmitting={loading}
      error={error}
      successMessage={routeParams.successMessage ?? null}
      onSubmit={handleSubmit}
      onSignUpPress={handleSignUpPress}
      onForgotPasswordPress={handleForgotPasswordPress}
    />
  )
}

export default LoginContainer

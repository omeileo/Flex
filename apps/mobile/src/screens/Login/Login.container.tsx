import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'

import { login, loginActions } from '@redux/states/auth/login/login.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'

import LoginComponent from './Login.component'
import { LoginFormValues, LoginRouteParams } from './Login.types'

const LoginContainer = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation<any>()
  const route = useRoute()
  const routeParams = (route.params ?? {}) as LoginRouteParams
  const { loading, error } = useSelector((state: RootState) => state.login)

  const handleSubmit = useCallback(async (values: LoginFormValues) => {
    try {
      await dispatch(login(values)).unwrap()
      navigation.reset({ index: 0, routes: [{ name: 'FlexBootstrap' }] })
    } catch (error) {
      const message = (error as { message?: string })?.message ?? ''
      const isUnverifiedAccount = message.toLowerCase().includes('not been verified')

      if (isUnverifiedAccount) {
        navigation.navigate('VerifyEmail', { email: values.email })
      }
    }
  }, [dispatch, navigation])

  const handleSignUpPress = useCallback(() => {
    dispatch(loginActions.clearLoginError())
    navigation.navigate('SignUp')
  }, [dispatch, navigation])

  return (
    <LoginComponent
      isSubmitting={ loading }
      error={ error }
      successMessage={ routeParams.successMessage ?? null }
      onSubmit={ handleSubmit }
      onSignUpPress={ handleSignUpPress }
    />
  )
}

export default LoginContainer

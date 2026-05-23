import React, { useCallback } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'
import { forgetPassword, forgetPasswordActions } from '@redux/states/auth/forgetPassword/forgetPassword.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import { RootStackNavigationProp } from '@router/router.types'
import { useDispatch, useSelector } from 'react-redux'

import ForgetPasswordComponent from './ForgetPassword.component'

import { ForgetPasswordFormValues, ForgetPasswordRouteParams } from './ForgetPassword.types'

const ForgetPasswordContainer = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation<RootStackNavigationProp>()
  const route = useRoute()
  const routeParams = (route.params ?? {}) as ForgetPasswordRouteParams
  const { loading, error, successMessage } = useSelector((state: RootState) => state.forgetPassword)

  const handleSubmit = useCallback(
    async (values: ForgetPasswordFormValues) => {
      try {
        const message = await dispatch(forgetPassword({ email: values.email.trim() })).unwrap()

        navigation.navigate('Login', {
          successMessage: message
        })
      } catch {
        // errors surfaced via selector
      }
    },
    [dispatch, navigation]
  )

  const handleLoginPress = useCallback(() => {
    dispatch(forgetPasswordActions.clearForgetPasswordState())
    navigation.navigate('Login')
  }, [dispatch, navigation])

  return (
    <ForgetPasswordComponent
      isSubmitting={loading}
      error={error}
      successMessage={successMessage}
      defaultEmail={routeParams.email ?? ''}
      onSubmit={handleSubmit}
      onLoginPress={handleLoginPress}
    />
  )
}

export default ForgetPasswordContainer

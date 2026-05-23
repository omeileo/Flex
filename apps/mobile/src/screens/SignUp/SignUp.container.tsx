import React, { useCallback } from 'react'

import { useNavigation } from '@react-navigation/native'
import { signUp, signUpActions } from '@redux/states/auth/signUp/signUp.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import { RootStackNavigationProp } from '@router/router.types'
import { useDispatch, useSelector } from 'react-redux'

import SignUpComponent from './SignUp.component'

import { SignUpFormValues } from './SignUp.types'

const SignUpContainer = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation<RootStackNavigationProp>()
  const { loading, error, successMessage } = useSelector((state: RootState) => state.signUp)

  const handleSubmit = useCallback(
    async (values: SignUpFormValues) => {
      try {
        await dispatch(signUp({ ...values, wantsDealsAndDiscounts: false })).unwrap()
        navigation.navigate('VerifyEmail', { email: values.email })
      } catch (error) {
        const message = (error as { message?: string })?.message ?? ''
        const emailAlreadyExists = message.toLowerCase().includes('already exists')

        if (emailAlreadyExists) {
          navigation.navigate('VerifyEmail', { email: values.email })
        }
      }
    },
    [dispatch, navigation]
  )

  const handleLoginPress = useCallback(() => {
    dispatch(signUpActions.clearSignUpState())
    navigation.navigate('Login')
  }, [dispatch, navigation])

  return (
    <SignUpComponent
      isSubmitting={loading}
      error={error}
      successMessage={successMessage}
      onSubmit={handleSubmit}
      onLoginPress={handleLoginPress}
    />
  )
}

export default SignUpContainer

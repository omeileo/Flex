import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'

import LandingComponent from './Landing.component'

const LandingContainer = () => {
  const navigation = useNavigation<any>()

  const handleLogin = useCallback(() => {
    navigation.navigate('Login')
  }, [navigation])

  const handleSignUp = useCallback(() => {
    navigation.navigate('SignUp')
  }, [navigation])

  return (
    <LandingComponent
      onLogin={ handleLogin }
      onSignUp={ handleSignUp }
    />
  )
}

export default LandingContainer

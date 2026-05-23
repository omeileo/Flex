import React, { useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import { getProfile } from '@redux/states/profile/getProfile/getProfile.slice'
import { generatePlan } from '@redux/states/trainingPlan/generatePlan/generatePlan.slice'
import { getActivePlan } from '@redux/states/trainingPlan/getActivePlan/getActivePlan.slice'
import { AppDispatch } from '@redux/store/store.types'
import { RootStackNavigationProp } from '@router/router.types'
import { isAuthenticated } from '@shared/functions/Auth/auth.functions'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import FlexBootstrapComponent from './FlexBootstrap.component'

const FlexBootstrapContainer = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation<RootStackNavigationProp>()
  const { t } = useTranslation()

  useEffect(() => {
    let cancelled = false

    const bootstrap = async () => {
      const authenticated = await isAuthenticated()

      if (!authenticated) {
        if (!cancelled) {
          navigation.reset({ index: 0, routes: [{ name: 'Landing' }] })
        }

        return
      }

      try {
        await dispatch(getProfile()).unwrap()
      } catch {
        if (!cancelled) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'ProfileOnboarding' }]
          })
        }

        return
      }

      try {
        await dispatch(getActivePlan()).unwrap()

        if (!cancelled) {
          navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] })
        }

        return
      } catch {
        try {
          await dispatch(generatePlan()).unwrap()
        } catch {
          if (!cancelled) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'ProfileOnboarding' }]
            })
          }

          return
        }
      }

      if (!cancelled) {
        navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] })
      }
    }

    bootstrap()

    return () => {
      cancelled = true
    }
  }, [dispatch, navigation])

  return <FlexBootstrapComponent message={t('bootstrap.loading')} />
}

export default FlexBootstrapContainer

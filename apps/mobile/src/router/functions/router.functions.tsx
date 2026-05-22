import React, { JSX, useEffect } from 'react'
import { NavigationContainer, createNavigationContainerRef, useNavigation, useRoute } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch } from 'react-redux'

import { getProfile } from '@redux/states/profile/getProfile/getProfile.slice'
import { generatePlan } from '@redux/states/trainingPlan/generatePlan/generatePlan.slice'
import { getActivePlan } from '@redux/states/trainingPlan/getActivePlan/getActivePlan.slice'
import { AppDispatch } from '@redux/store/store.types'
import { isAuthenticated } from '@shared/functions/Auth/auth.functions'
import { getUserRole } from '@shared/functions/UserRole/userRoleManagment.functions'

import { AuthGateProps } from '../components/AuthGate.types'
import { Route as CustomRoute } from '../router.types'
import { linkingConfig } from '../linking.config'
import routes from '../routes.dictionary'

const Stack = createNativeStackNavigator()

export const navigationReference = createNavigationContainerRef()

const AuthGate = ({ route, children }: AuthGateProps) => {
  const navigation = useNavigation<any>()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    let cancelled = false

    const validate = async () => {
      if (route.isAuthenticationRequired && !(await isAuthenticated())) {
        if (!cancelled) {
          navigation.reset({ index: 0, routes: [{ name: 'Landing' }] })
        }

        return
      }

      if (route.userRole?.length) {
        const role = await getUserRole()

        if (!role || !route.userRole.includes(role)) {
          if (!cancelled) {
            navigation.goBack()
          }
        }
      }

      if (!route.requiresFlexSetup) {
        return
      }

      try {
        await dispatch(getProfile()).unwrap()
      } catch {
        if (!cancelled) {
          navigation.reset({ index: 0, routes: [{ name: 'ProfileOnboarding' }] })
        }

        return
      }

      try {
        await dispatch(getActivePlan()).unwrap()
      } catch {
        try {
          await dispatch(generatePlan()).unwrap()
        } catch {
          if (!cancelled) {
            navigation.reset({ index: 0, routes: [{ name: 'ProfileOnboarding' }] })
          }
        }
      }
    }

    validate()

    return () => {
      cancelled = true
    }
  }, [route, navigation, dispatch])

  return <>{ children }</>
}

type GenerateRoutesOptions = {
  initialRouteName?: string
}

const generateRoutes = (customRoutes: CustomRoute[], options?: GenerateRoutesOptions): JSX.Element => {
  return (
    <NavigationContainer ref={ navigationReference } linking={ linkingConfig }>
      <Stack.Navigator initialRouteName={ options?.initialRouteName }>
        { customRoutes.map((route) => {
          const Component = route.component

          if (!Component) return null

          return (
            <Stack.Screen
              key={ route.path }
              name={ route.path }
              options={ route.options }
            >
              { () => (
                <AuthGate route={ route }>
                  <Component />
                </AuthGate>
              ) }
            </Stack.Screen>
          )
        }) }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const useCustomNavigate = () => {
  const navigation = useNavigation<any>()

  const customNavigate = (
    path: string,
    options?: {
      replace?: boolean
      params?: Record<string, unknown>
    }
  ) => {
    if (options?.replace) {
      navigation.replace(path, options?.params)
    } else {
      navigation.navigate(path, options?.params)
    }
  }

  return customNavigate
}

const useCurrentRoute = (): CustomRoute => {
  const route = useRoute()
  const currentRoute = Object.values(routes).find((entry) => entry.path === route.name)

  return (currentRoute ?? routes.flexBootstrap) as CustomRoute
}

const usePreviousRoute = () => {
  const navigation = useNavigation<any>()

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }

  return {
    goBack,
  }
}

const useUrlParam = <T = string>(paramName: string): T | undefined => {
  const route = useRoute()
  const params = route.params as Record<string, T> | undefined

  return params?.[paramName]
}

const router = {
  navigate: useCustomNavigate,
  generateRoutes,
  getCurrentRoute: useCurrentRoute,
  getPreviousRoute: usePreviousRoute,
  getUrlParam: useUrlParam,
}

export default router

import React, { useCallback, useMemo } from 'react'

import { View } from 'react-native'

import { NavigationRoute, ParamListBase } from '@react-navigation/native'
import { PillTab, PillTabKey } from '@shared/components/PillTabBar/PillTabBar.types'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import PillTabBar from '@shared/components/PillTabBar/PillTabBar.component'

import { createMainTabsTabBarStyles } from './MainTabsTabBar.styles'
import { MainTabsTabBarProps } from './MainTabsTabBar.types'

const ROUTE_TO_TAB_KEY: Record<string, PillTabKey> = {
  Today: 'today',
  PlanHome: 'plan',
  Progress: 'progress',
  Coach: 'coach',
  Profile: 'profile'
}

const TAB_KEY_TO_ROUTE: Record<PillTabKey, string> = {
  today: 'Today',
  plan: 'PlanHome',
  progress: 'Progress',
  coach: 'Coach',
  profile: 'Profile'
}

const TAB_ORDER: PillTabKey[] = ['today', 'plan', 'progress', 'coach', 'profile']

const MainTabsTabBar = ({ state, navigation }: MainTabsTabBarProps) => {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const styles = useThemedStyles(createMainTabsTabBarStyles)

  const tabs = useMemo<PillTab[]>(
    () =>
      TAB_ORDER.map((key) => ({
        key,
        label: t(`tabs.${key}`)
      })),
    [t]
  )

  const activeRoute = state.routes[state.index]
  const activeTab = ROUTE_TO_TAB_KEY[activeRoute.name] ?? 'today'

  const handleTabPress = useCallback(
    (key: PillTabKey) => {
      const routeName = TAB_KEY_TO_ROUTE[key]
      const route = state.routes.find((item: NavigationRoute<ParamListBase, string>) => item.name === routeName)

      if (!route) {
        return
      }

      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true
      })

      if (!event.defaultPrevented) {
        navigation.navigate(routeName)
      }
    },
    [navigation, state.routes]
  )

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
      <PillTabBar tabs={tabs} activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  )
}

export default MainTabsTabBar

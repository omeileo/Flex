import React from 'react'

import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTranslation } from 'react-i18next'

import Coach from '@screens/Coach/Coach.container'
import PlanHome from '@screens/PlanHome/PlanHome.container'
import Progress from '@screens/Progress/Progress.container'
import Today from '@screens/Today/Today.container'

import MainTabsTabBar from './MainTabsTabBar/MainTabsTabBar.component'
import ProfileStackNavigator from './ProfileStack.navigator'

const Tab = createBottomTabNavigator()

const MainTabsNavigator = () => {
  const { t } = useTranslation()

  return (
    <Tab.Navigator
      tabBar={(props: BottomTabBarProps) => <MainTabsTabBar {...props} />}
      screenOptions={{ headerShown: true }}
    >
      <Tab.Screen name="Today" component={Today} options={{ title: t('tabs.today') }} />
      <Tab.Screen name="PlanHome" component={PlanHome} options={{ title: t('tabs.plan') }} />
      <Tab.Screen name="Progress" component={Progress} options={{ title: t('tabs.progress') }} />
      <Tab.Screen name="Coach" component={Coach} options={{ title: t('tabs.coach') }} />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{ title: t('tabs.profile'), headerShown: false }}
      />
    </Tab.Navigator>
  )
}

export default MainTabsNavigator

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTranslation } from 'react-i18next'

import PlanHome from '@screens/PlanHome/PlanHome.container'
import Progress from '@screens/Progress/Progress.container'
import Coach from '@screens/Coach/Coach.container'
import Profile from '@screens/Profile/Profile.container'

const Tab = createBottomTabNavigator()

const MainTabsNavigator = () => {
  const { t } = useTranslation()

  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen
        name='PlanHome'
        component={ PlanHome }
        options={{ title: t('tabs.plan') }}
      />
      <Tab.Screen
        name='Progress'
        component={ Progress }
        options={{ title: t('tabs.progress') }}
      />
      <Tab.Screen
        name='Coach'
        component={ Coach }
        options={{ title: t('tabs.coach') }}
      />
      <Tab.Screen
        name='Profile'
        component={ Profile }
        options={{ title: t('tabs.profile') }}
      />
    </Tab.Navigator>
  )
}

export default MainTabsNavigator

import React from 'react'

import { Pressable, Text, View } from 'react-native'

import { useThemeColors } from '@shared/hooks/useThemeColors/useThemeColors.hooks'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import PillTabBarIcon from './PillTabBarIcon/PillTabBarIcon.component'

import { createPillTabBarStyles } from './PillTabBar.styles'
import { PillTabBarProps } from './PillTabBar.types'

const PillTabBar = ({ tabs, activeTab, onTabPress }: PillTabBarProps) => {
  const styles = useThemedStyles(createPillTabBarStyles)
  const colors = useThemeColors()

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab
        const iconColor = isActive ? colors.textInverse : colors.textSecondary

        return (
          <Pressable
            key={tab.key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onTabPress(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
          >
            <View style={styles.tabContent}>
              <PillTabBarIcon tabKey={tab.key} color={iconColor} />
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
            </View>
          </Pressable>
        )
      })}
    </View>
  )
}

export default PillTabBar

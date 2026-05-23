import React from 'react'

import { Pressable, Text, View } from 'react-native'

import styles from './PillTabBar.styles'
import { PillTabBarProps } from './PillTabBar.types'

const PillTabBar = ({ tabs, activeTab, onTabPress }: PillTabBarProps) => (
  <View style={styles.container}>
    {tabs.map((tab) => {
      const isActive = tab.key === activeTab

      return (
        <Pressable
          key={tab.key}
          style={[styles.tab, isActive && styles.tabActive]}
          onPress={() => onTabPress(tab.key)}
          accessibilityRole="tab"
          accessibilityState={{ selected: isActive }}
        >
          <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
        </Pressable>
      )
    })}
  </View>
)

export default PillTabBar

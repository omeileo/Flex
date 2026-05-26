import React from 'react'

import { ScrollView, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import ProgressBarChart from '@shared/components/ProgressBarChart/ProgressBarChart.component'
import StatCard from '@shared/components/StatCard/StatCard.component'

import { createProgressStyles } from './Progress.styles'
import { ProgressComponentProps } from './Progress.types'

const chunkStats = <T,>(items: T[], size: number): T[][] => {
  const rows: T[][] = []

  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size))
  }

  return rows
}

const ProgressComponent = ({
  title,
  subtitle,
  heroEyebrow,
  featuredStat,
  chartTitle,
  chartBadge,
  stats,
  weeklyVolume,
  chartFootnote
}: ProgressComponentProps) => {
  const styles = useThemedStyles(createProgressStyles)
  const secondaryStats = stats.filter((stat) => stat.id !== featuredStat.id)
  const statRows = chunkStats(secondaryStats, 2)

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} testID="progress-screen">
      <View style={styles.heroBand}>
        <Text style={styles.heroEyebrow}>{heroEyebrow}</Text>
        <Text style={styles.title} testID="progress-title">
          {title}
        </Text>
        <Text style={styles.subtitle} testID="progress-subtitle">
          {subtitle}
        </Text>
      </View>

      <View style={styles.featuredCard} testID={`progress-stat-${featuredStat.id}`}>
        <Text style={styles.featuredLabel}>{featuredStat.label}</Text>
        <Text style={styles.featuredValue}>{featuredStat.value}</Text>
        {featuredStat.hint ? <Text style={styles.featuredHint}>{featuredStat.hint}</Text> : null}
      </View>

      <View style={styles.statGrid} testID="progress-stat-grid">
        {statRows.map((row, rowIndex) => (
          <View key={`stat-row-${rowIndex}`} style={styles.statRow}>
            {row.map((stat) => (
              <StatCard
                key={stat.id}
                label={stat.label}
                value={stat.value}
                hint={stat.hint}
                testID={`progress-stat-${stat.id}`}
              />
            ))}
          </View>
        ))}
      </View>

      <View style={styles.chartSection}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>{chartTitle}</Text>
          <Text style={styles.chartBadge}>{chartBadge}</Text>
        </View>
        <ProgressBarChart data={weeklyVolume} footnote={chartFootnote} testID="progress-weekly-chart" />
      </View>
    </ScrollView>
  )
}

export default ProgressComponent

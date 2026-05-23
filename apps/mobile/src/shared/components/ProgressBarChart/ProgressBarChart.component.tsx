import React, { useMemo } from 'react'

import { Text, View } from 'react-native'

import styles from './ProgressBarChart.styles'
import { ProgressBarChartProps } from './ProgressBarChart.types'

const ProgressBarChart = ({ data, maxValue, footnote, style }: ProgressBarChartProps) => {
  const resolvedMax = useMemo(() => {
    if (maxValue !== undefined) {
      return maxValue
    }

    return Math.max(...data.map((datum) => datum.value), 1)
  }, [data, maxValue])

  return (
    <View style={[styles.container, style]}>
      <View style={styles.chartRow}>
        {data.map((datum) => {
          const heightPercent = Math.max((datum.value / resolvedMax) * 100, 8)

          return (
            <View key={datum.label} style={styles.barColumn}>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { height: `${heightPercent}%` }]} />
              </View>
              <Text style={styles.barLabel}>{datum.label}</Text>
            </View>
          )
        })}
      </View>

      {footnote ? <Text style={styles.footnote}>{footnote}</Text> : null}
    </View>
  )
}

export default ProgressBarChart

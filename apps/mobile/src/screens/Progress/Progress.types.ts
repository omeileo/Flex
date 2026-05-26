import { ProgressBarChartDatum } from '@shared/components/ProgressBarChart/ProgressBarChart.types'

export type ProgressStat = {
  id: string
  label: string
  value: string
  hint: string
}

export type ProgressComponentProps = {
  title: string
  subtitle: string
  heroEyebrow: string
  featuredStat: ProgressStat
  chartTitle: string
  chartBadge: string
  stats: ProgressStat[]
  weeklyVolume: ProgressBarChartDatum[]
  chartFootnote: string
  isLoading?: boolean
  error?: string | null
  onRefresh?: () => void
}

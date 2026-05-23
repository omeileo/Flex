export type ProfileSettingsView = 'hub' | 'goals' | 'wellness' | 'conditionDetail' | 'excluded' | 'readapt'

export type ProfileSettingsFlowPreviewComponentProps = Record<string, never>

export type MockCondition = {
  id: string
  title: string
  status: 'recovered' | 'managing' | 'flareUp'
  subtitle: string
}

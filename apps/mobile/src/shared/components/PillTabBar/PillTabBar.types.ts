export type PillTabKey = 'today' | 'plan' | 'progress' | 'coach' | 'profile'

export type PillTab = {
  key: PillTabKey
  label: string
}

export type PillTabBarProps = {
  tabs: PillTab[]
  activeTab: PillTabKey
  onTabPress: (key: PillTabKey) => void
}

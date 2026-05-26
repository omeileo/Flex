export type PlanReadaptSheetProps = {
  visible: boolean
  title: string
  subtitle: string
  readaptLabel: string
  skipLabel: string
  onReadapt: () => void
  onSkip: () => void
  testID?: string
}

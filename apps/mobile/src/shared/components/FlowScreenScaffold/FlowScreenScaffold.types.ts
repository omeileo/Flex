import type { ReactNode } from 'react'

export type FlowScreenScaffoldProps = {
  title: string
  subtitle?: string
  children: ReactNode
  testID?: string
  footer?: ReactNode
}

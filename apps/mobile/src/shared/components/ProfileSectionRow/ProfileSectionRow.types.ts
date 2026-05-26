import type { ReactNode } from 'react'

export type ProfileSectionRowProps = {
  title: string
  preview: string
  onPress?: () => void
  trailing?: ReactNode
  testID?: string
}

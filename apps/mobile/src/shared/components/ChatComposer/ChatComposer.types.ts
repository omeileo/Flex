export type ChatComposerProps = {
  value: string
  onChangeText: (text: string) => void
  onSend: () => void
  onAttachPress?: () => void
  placeholder?: string
  attachLabel?: string
  sendLabel?: string
  disabled?: boolean
}

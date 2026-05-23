export type ActiveWorkoutView =
  | 'preStart'
  | 'active'
  | 'rest'
  | 'paused'
  | 'exerciseMenu'
  | 'swap'
  | 'finishSheet'
  | 'save'
  | 'saved'
  | 'discarded'

export type ActiveWorkoutFlowPreviewComponentProps = {
  initialView?: ActiveWorkoutView
}

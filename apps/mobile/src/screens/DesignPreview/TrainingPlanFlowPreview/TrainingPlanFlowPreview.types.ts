export type TrainingPlanView =
  | 'empty'
  | 'focus'
  | 'chat'
  | 'recap'
  | 'generating'
  | 'intro'
  | 'planOverview'
  | 'today'
  | 'weekly'

export type TrainingPlanFlowPreviewComponentProps = {
  initialView?: TrainingPlanView
}

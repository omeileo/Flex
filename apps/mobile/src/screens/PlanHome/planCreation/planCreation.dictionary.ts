import { PlanFocusOption } from './planCreation.types'

export const planFocusOptions: PlanFocusOption[] = [
  {
    id: 'strength',
    titleKey: 'planHome.focus.strengthTitle',
    subtitleKey: 'planHome.focus.strengthSubtitle'
  },
  {
    id: 'running',
    titleKey: 'planHome.focus.runningTitle',
    subtitleKey: 'planHome.focus.runningSubtitle'
  },
  {
    id: 'hybrid',
    titleKey: 'planHome.focus.hybridTitle',
    subtitleKey: 'planHome.focus.hybridSubtitle'
  },
  {
    id: 'injury',
    titleKey: 'planHome.focus.injuryTitle',
    subtitleKey: 'planHome.focus.injurySubtitle'
  }
]

export const planCreationStarterPromptKeys = [
  'planHome.chat.promptSplit',
  'planHome.chat.promptRuns',
  'planHome.chat.promptShoulder'
]

export const generatingStatusKeys = [
  'planHome.generatingStatus.constraints',
  'planHome.generatingStatus.runs',
  'planHome.generatingStatus.progressions'
]

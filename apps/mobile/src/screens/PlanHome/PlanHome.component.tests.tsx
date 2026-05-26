import React from 'react'

import { renderWithTheme } from '@shared/functions/TestRender/renderWithTheme'

import PlanHomeComponent from './PlanHome.component'

import { planFocusOptions } from './planCreation/planCreation.dictionary'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => {
      if (key === 'planHome.weekSheetTitle') {
        return `Week ${params?.week}`
      }

      if (key === 'planHome.focus.strengthTitle') {
        return 'Strength block'
      }

      if (key === 'planHome.focus.strengthSubtitle') {
        return '8–12 week progressive lifting'
      }

      return key
    }
  })
}))

const baseProps = {
  programTitle: '12-Week Hybrid',
  blurb: 'Coach blurb',
  phases: [{ id: 'foundation', name: 'Foundation', weeks: 'Weeks 1–4' }],
  weekPlans: [],
  selectedWeek: null,
  weekSheetOpen: false,
  adjustModalOpen: false,
  isLoading: false,
  isGenerating: false,
  generatingStatus: '',
  error: null,
  generateError: null,
  focusOptions: planFocusOptions,
  selectedFocusId: null,
  chatMessages: [{ id: 'intro', role: 'coach' as const, text: 'Hello' }],
  chatComposerValue: '',
  chatStarterPrompts: ['Split'],
  recapItems: ['Goal: Hybrid'],
  recapStats: '12 weeks · 5 lift days · 2 runs/week',
  weeklyCoachNote: 'Weekly note',
  weekPhaseLabel: 'Week 1 · Foundation Phase',
  weekPhaseRules: 'RPE 6–7',
  selectedWeekNumber: 1,
  totalWeeks: 12,
  onRefresh: jest.fn(),
  onCreatePlan: jest.fn(),
  onSelectFocus: jest.fn(),
  onContinueFromFocus: jest.fn(),
  onChatComposerChange: jest.fn(),
  onChatSend: jest.fn(),
  onChatPromptPress: jest.fn(),
  onReviewInputs: jest.fn(),
  onBackToChat: jest.fn(),
  onGeneratePlan: jest.fn(),
  onViewFullPlan: jest.fn(),
  onWeekPress: jest.fn(),
  onCloseWeekSheet: jest.fn(),
  onViewFullWeek: jest.fn(),
  onViewProgram: jest.fn(),
  onOpenAdjust: jest.fn(),
  onCloseAdjust: jest.fn(),
  onReadaptPlan: jest.fn(),
  onTalkToCoach: jest.fn(),
  onWorkoutPress: jest.fn(),
  onPreviousWeek: jest.fn(),
  onNextWeek: jest.fn(),
  onGoToCurrentWeek: jest.fn()
}

describe('PlanHomeComponent', () => {
  it('renders empty state when no plan exists', () => {
    const { getByTestId } = renderWithTheme(<PlanHomeComponent {...baseProps} view="empty" />)

    expect(getByTestId('plan-home-empty')).toBeTruthy()
  })

  it('renders plan focus step', () => {
    const { getByTestId } = renderWithTheme(<PlanHomeComponent {...baseProps} view="focus" />)

    expect(getByTestId('plan-home-focus')).toBeTruthy()
    expect(getByTestId('plan-focus-strength')).toBeTruthy()
  })

  it('renders coach chat step', () => {
    const { getByTestId } = renderWithTheme(<PlanHomeComponent {...baseProps} view="chat" />)

    expect(getByTestId('plan-home-chat')).toBeTruthy()
  })

  it('renders inputs recap step', () => {
    const { getByTestId } = renderWithTheme(<PlanHomeComponent {...baseProps} view="recap" />)

    expect(getByTestId('plan-home-recap')).toBeTruthy()
  })

  it('renders plan introduction step', () => {
    const { getByTestId } = renderWithTheme(<PlanHomeComponent {...baseProps} view="intro" />)

    expect(getByTestId('plan-home-intro')).toBeTruthy()
  })

  it('renders weekly progression step', () => {
    const { getByTestId } = renderWithTheme(
      <PlanHomeComponent
        {...baseProps}
        view="weekly"
        selectedWeek={{
          weekNumber: 1,
          dateRange: 'Jan 1–7',
          workoutCount: 2,
          totalVolume: '4,800 kg',
          isCurrent: true,
          workouts: [
            {
              id: 'day-0',
              dayIndex: 0,
              title: 'Upper Push',
              modality: 'strength',
              durationMinutes: 55,
              exerciseCount: 4,
              exercisePreview: 'OHP · Incline DB'
            }
          ]
        }}
      />
    )

    expect(getByTestId('plan-home-weekly')).toBeTruthy()
  })

  it('renders generating state', () => {
    const { getByTestId } = renderWithTheme(
      <PlanHomeComponent {...baseProps} view="generating" generatingStatus="Scheduling run sessions…" />
    )

    expect(getByTestId('plan-home-generating')).toBeTruthy()
  })
})

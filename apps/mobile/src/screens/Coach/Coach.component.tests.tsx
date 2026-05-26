import React from 'react'

import { renderWithTheme } from '@shared/functions/TestRender/renderWithTheme'

import CoachComponent from './Coach.component'

describe('CoachComponent', () => {
  it('renders coach header and starter prompts', () => {
    const { getByTestId, getByText } = renderWithTheme(
      <CoachComponent
        title="Plan coach"
        statusLabel="Active"
        messages={[{ id: '1', role: 'coach', text: 'Hello' }]}
        starterPrompts={['12-week split']}
        composerValue=""
        onComposerChange={jest.fn()}
        onSend={jest.fn()}
        onPromptPress={jest.fn()}
      />
    )

    expect(getByTestId('coach-screen')).toBeTruthy()
    expect(getByTestId('coach-title')).toHaveTextContent('Plan coach')
    expect(getByText('12-week split')).toBeTruthy()
  })
})

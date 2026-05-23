import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import ExerciseExcludeRow from './ExerciseExcludeRow.component'

describe('ExerciseExcludeRow', () => {
  it('calls onToggle when pressed', () => {
    const onToggle = jest.fn()
    const { getByText } = render(
      <ExerciseExcludeRow name="Behind-the-neck press" equipment="Barbell" excluded={false} onToggle={onToggle} />
    )

    fireEvent.press(getByText('Behind-the-neck press'))

    expect(onToggle).toHaveBeenCalled()
  })
})

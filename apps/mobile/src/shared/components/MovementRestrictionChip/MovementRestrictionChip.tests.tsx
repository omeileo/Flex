import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import MovementRestrictionChip from './MovementRestrictionChip.component'

describe('MovementRestrictionChip', () => {
  it('calls onPress when pressed', () => {
    const onPress = jest.fn()
    const { getByText } = render(<MovementRestrictionChip label="Overhead" selected={false} onPress={onPress} />)

    fireEvent.press(getByText('Overhead'))

    expect(onPress).toHaveBeenCalled()
  })
})

import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import SecondaryButton from './SecondaryButton.component'

describe('SecondaryButton', () => {
  it('calls onPress when pressed', () => {
    const onPress = jest.fn()
    const { getByText } = render(<SecondaryButton label="Not now" onPress={onPress} />)

    fireEvent.press(getByText('Not now'))

    expect(onPress).toHaveBeenCalled()
  })
})

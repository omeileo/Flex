import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import SymptomLogChip from './SymptomLogChip.component'

describe('SymptomLogChip', () => {
  it('calls onPress when pressed', () => {
    const onPress = jest.fn()
    const { getByText } = render(<SymptomLogChip label="Cramps" selected={false} onPress={onPress} />)

    fireEvent.press(getByText('Cramps'))

    expect(onPress).toHaveBeenCalled()
  })
})

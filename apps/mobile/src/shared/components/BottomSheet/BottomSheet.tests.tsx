import React from 'react'

import { Text } from 'react-native'

import { render } from '@testing-library/react-native'

import BottomSheet from './BottomSheet.component'

describe('BottomSheet', () => {
  it('renders children when visible', () => {
    const { getByText } = render(
      <BottomSheet visible onClose={jest.fn()}>
        <Text>Sheet content</Text>
      </BottomSheet>
    )

    expect(getByText('Sheet content')).toBeTruthy()
  })
})

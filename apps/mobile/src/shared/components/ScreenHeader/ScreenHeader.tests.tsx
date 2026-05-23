import React from 'react'

import { render } from '@testing-library/react-native'

import ScreenHeader from './ScreenHeader.component'

describe('ScreenHeader', () => {
  it('renders the title', () => {
    const { getByText } = render(<ScreenHeader title="Cycle settings" />)

    expect(getByText('Cycle settings')).toBeTruthy()
  })
})

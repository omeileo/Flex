import React from 'react'

import { render } from '@testing-library/react-native'

import CyclePhaseChip from './CyclePhaseChip.component'

describe('CyclePhaseChip', () => {
  it('renders the phase label', () => {
    const { getByText } = render(<CyclePhaseChip label="Luteal · Day 22" variant="default" />)

    expect(getByText('Luteal · Day 22')).toBeTruthy()
  })
})

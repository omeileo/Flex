import React from 'react'

import { render } from '@testing-library/react-native'

import StatCard from './StatCard.component'

describe('StatCard', () => {
  it('renders label and value', () => {
    const { getByText } = render(<StatCard label="Workouts" value="12" />)

    expect(getByText('Workouts')).toBeTruthy()
    expect(getByText('12')).toBeTruthy()
  })
})

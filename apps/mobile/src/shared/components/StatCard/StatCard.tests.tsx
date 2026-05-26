import React from 'react'

import { render } from '@testing-library/react-native'

import StatCard from './StatCard.component'

describe('StatCard', () => {
  it('renders label and value', () => {
    const { getByText } = render(<StatCard label="Workouts" value="12" />)

    expect(getByText('Workouts')).toBeTruthy()
    expect(getByText('12')).toBeTruthy()
  })

  it('renders optional hint text', () => {
    const { getByText } = render(<StatCard label="Workouts" value="12" hint="This month" />)

    expect(getByText('This month')).toBeTruthy()
  })

  it('applies testID when provided', () => {
    const { getByTestId } = render(<StatCard label="Workouts" value="12" testID="stat-workouts" />)

    expect(getByTestId('stat-workouts')).toBeTruthy()
  })
})

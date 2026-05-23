import React from 'react'

import { render } from '@testing-library/react-native'

import ThemeSwatchRow from './ThemeSwatchRow.component'

describe('ThemeSwatchRow', () => {
  it('renders without crashing for all theme modes', () => {
    const { toJSON } = render(<ThemeSwatchRow modes={['light', 'dark', 'pink']} activeMode="light" />)

    expect(toJSON()).toBeTruthy()
  })
})

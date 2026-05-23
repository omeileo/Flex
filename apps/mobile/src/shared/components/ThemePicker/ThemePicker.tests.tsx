import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import ThemePicker from './ThemePicker.component'

describe('ThemePicker', () => {
  it('calls onSelect when an option is pressed', () => {
    const onSelect = jest.fn()

    const { getByText } = render(
      <ThemePicker
        selectedMode="light"
        onSelect={onSelect}
        options={[
          {
            mode: 'dark',
            label: 'Dark',
            previewBackground: '#0F1117',
            previewSurface: '#1A1F2E',
            previewAccent: '#F9FAFB',
            previewText: '#F9FAFB'
          }
        ]}
      />
    )

    fireEvent.press(getByText('Dark'))

    expect(onSelect).toHaveBeenCalledWith('dark')
  })
})

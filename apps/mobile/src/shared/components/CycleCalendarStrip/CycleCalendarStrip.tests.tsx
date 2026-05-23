import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import CycleCalendarStrip from './CycleCalendarStrip.component'

describe('CycleCalendarStrip', () => {
  it('calls onDayPress when a day is pressed', () => {
    const onDayPress = jest.fn()
    const { getByText } = render(
      <CycleCalendarStrip
        days={[
          { key: 'mon', label: 'M', isPeriodDay: true },
          { key: 'tue', label: 'T' }
        ]}
        onDayPress={onDayPress}
      />
    )

    fireEvent.press(getByText('M'))

    expect(onDayPress).toHaveBeenCalledWith('mon')
  })
})

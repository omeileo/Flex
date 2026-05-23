import React from 'react'

import { render } from '@testing-library/react-native'

import ProgressBarChart from './ProgressBarChart.component'

describe('ProgressBarChart', () => {
  it('renders chart labels', () => {
    const { getByText } = render(
      <ProgressBarChart
        data={[
          { label: 'Mon', value: 4 },
          { label: 'Tue', value: 6 }
        ]}
        footnote="Weekly volume"
      />
    )

    expect(getByText('Mon')).toBeTruthy()
    expect(getByText('Weekly volume')).toBeTruthy()
  })
})

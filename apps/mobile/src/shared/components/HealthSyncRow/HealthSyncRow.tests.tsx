import React from 'react'

import { render } from '@testing-library/react-native'

import HealthSyncRow from './HealthSyncRow.component'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))

describe('HealthSyncRow', () => {
  it('renders a disabled coming soon row', () => {
    const { getByText } = render(<HealthSyncRow provider="appleHealth" />)

    expect(getByText('components.healthSync.appleHealth')).toBeTruthy()
    expect(getByText('components.healthSync.comingSoon')).toBeTruthy()
  })
})

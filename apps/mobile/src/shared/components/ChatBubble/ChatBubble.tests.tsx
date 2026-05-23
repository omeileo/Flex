import React from 'react'

import { render } from '@testing-library/react-native'

import ChatBubble from './ChatBubble.component'

describe('ChatBubble', () => {
  it('renders user messages', () => {
    const { getByText } = render(<ChatBubble role="user" message="12-week split please" />)

    expect(getByText('12-week split please')).toBeTruthy()
  })

  it('renders coach messages', () => {
    const { getByText } = render(<ChatBubble role="coach" message="Happy to help plan that." coachName="Flex Coach" />)

    expect(getByText('Happy to help plan that.')).toBeTruthy()
    expect(getByText('FC')).toBeTruthy()
  })
})

import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import ChatComposer from './ChatComposer.component'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))

describe('ChatComposer', () => {
  it('calls onSend when text is entered', () => {
    const onSend = jest.fn()
    const onChangeText = jest.fn()

    const { getByText } = render(
      <ChatComposer value="Build strength" onChangeText={onChangeText} onSend={onSend} sendLabel="Send" />
    )

    fireEvent.press(getByText('Send'))

    expect(onSend).toHaveBeenCalled()
  })
})

/* eslint-disable react-refresh/only-export-components */
import { fireEvent, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { Provider as StateProvider, createStore } from 'jotai'
import { SocketProvider } from '@app/providers'

interface TestProviders {
  children: ReactNode
}

export function TestProviders({ children }: TestProviders) {
  return (
    <StateProvider store={testStore}>
      <SocketProvider>{children}</SocketProvider>
    </StateProvider>
  )
}

export function loginTestUser({ username = 'test' }: { username?: string }) {
  const usernameInput = screen.getByPlaceholderText(/username/i)
  const loginButton = screen.getByRole('button', { name: /login/i })

  fireEvent.change(usernameInput, { target: { value: username } })
  fireEvent.click(loginButton)
}

/**
 * Create a test store for use in testing
 */
const testStore = createStore()

export function getTestStore() {
  return testStore
}

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import App from '@/App'
import { TestProviders, loginTestUser } from './test-utils'

jest.mock('@/services/roomService', () => {
  return {
    getRooms: [],
  }
})

describe('<App />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render login view if not authenticated', async () => {
    render(
      <TestProviders>
        <App />
      </TestProviders>,
    )

    expect(screen.queryByTestId('LoginView')).toBeInTheDocument()
  })

  it('should render games view if authenticated', async () => {
    render(
      <TestProviders>
        <App />
      </TestProviders>,
    )

    loginTestUser({ username: 'Test User' })

    expect(screen.queryByTestId('GamesView')).toBeInTheDocument()
    expect(screen.queryByTestId('LoginView')).not.toBeInTheDocument()
  })
})

import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestProviders, getTestStore, loginTestUser } from '@app/test-utils'
import { LoginView } from '@app/views'
import { socket } from '@app/libs'
import { authUserAtom } from '@app/store'

describe('<LoginView />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render login view', async () => {
    render(
      <TestProviders>
        <LoginView />
      </TestProviders>,
    )

    expect(screen.queryByTestId('LoginView')).toBeInTheDocument()
  })

  it('should disable button unless username is entered', async () => {
    render(
      <TestProviders>
        <LoginView />
      </TestProviders>,
    )

    const loginButton = screen.getByRole('button', { name: /login/i })
    expect(loginButton).toBeDisabled()

    const usernameInput = screen.getByPlaceholderText(/username/i)
    fireEvent.change(usernameInput, { target: { value: 'test' } })

    expect(loginButton).toBeEnabled()
  })

  it('should emit socket event on login and update authUser atom', async () => {
    render(
      <TestProviders>
        <LoginView />
      </TestProviders>,
    )

    loginTestUser({ username: 'Test User' })

    const spy = jest.spyOn(socket, 'emit')
    expect(spy).toHaveBeenCalledWith('login', { username: 'Test User' })

    const store = getTestStore()
    expect(store.get(authUserAtom)).toMatchObject({ username: 'Test User' })
  })
})

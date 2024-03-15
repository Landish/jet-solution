import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { GameOver } from './GameOver'
import { TestProviders, getTestStore } from '@/test-utils'
import { authUserAtom, gameOverAtom, gameReadyAtom } from '@/store/store'
import { socket } from '@/libs/socket'

describe('<GameOver />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render game over screen', async () => {
    render(
      <TestProviders>
        <GameOver />
      </TestProviders>,
    )

    expect(screen.queryByTestId('GameOver')).not.toBeInTheDocument()

    const store = getTestStore()
    act(() => {
      store.set(gameOverAtom, { isOver: true, user: '123' })
    })

    expect(screen.queryByTestId('GameOver')).toBeInTheDocument()
  })

  it('should should display winner', async () => {
    render(
      <TestProviders>
        <GameOver />
      </TestProviders>,
    )

    const store = getTestStore()
    act(() => {
      store.set(authUserAtom, { socketId: '123', username: '123' })
      store.set(gameOverAtom, { isOver: true, user: '123' })
    })

    expect(screen.queryByText(/you won/i)).toBeInTheDocument()
    expect(screen.queryByText(/you lost/i)).not.toBeInTheDocument()
  })

  it('should should display looser', async () => {
    render(
      <TestProviders>
        <GameOver />
      </TestProviders>,
    )

    const store = getTestStore()
    act(() => {
      store.set(authUserAtom, { socketId: '123', username: '123' })
      store.set(gameOverAtom, { isOver: true, user: '222' })
    })

    expect(screen.queryByText(/you won/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/you lost/i)).toBeInTheDocument()
  })

  it('should should emit socket event `letsPlay` when click on new game', async () => {
    render(
      <TestProviders>
        <GameOver />
      </TestProviders>,
    )

    const store = getTestStore()
    act(() => {
      store.set(gameReadyAtom, true)
      store.set(gameOverAtom, { isOver: true, user: '222' })
    })

    const button = screen.getByRole('button', { name: /new game/i })
    fireEvent.click(button)

    const spy = jest.spyOn(socket, 'emit')
    expect(spy).toHaveBeenCalledWith('letsPlay')
  })
})

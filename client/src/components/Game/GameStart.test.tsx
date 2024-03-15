import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { GameStart } from '@app/components/Game/GameStart'
import { TestProviders, getTestStore } from '@app/test-utils'
import { gameReadyAtom } from '@app/store/store'
import { socket } from '@app/libs/socket'

describe('<GameStart />', () => {
  it('should render children', () => {
    render(
      <TestProviders>
        <GameStart />
      </TestProviders>,
    )
    expect(screen.getByTestId('GameStart')).toBeInTheDocument()
  })

  it('should display button as disabled if game is not ready', () => {
    render(
      <TestProviders>
        <GameStart />
      </TestProviders>,
    )
    expect(screen.queryByRole('button')).toBeDisabled()

    const store = getTestStore()
    act(() => {
      store.set(gameReadyAtom, true)
    })

    expect(screen.queryByRole('button')).toBeEnabled()
  })

  it('should emit a socket event with `letsPlay`', () => {
    render(
      <TestProviders>
        <GameStart />
      </TestProviders>,
    )
    const store = getTestStore()
    act(() => {
      store.set(gameReadyAtom, true)
    })

    fireEvent.click(screen.getByRole('button'))

    const spy = jest.spyOn(socket, 'emit')
    expect(spy).toHaveBeenCalledWith('letsPlay')
  })
})

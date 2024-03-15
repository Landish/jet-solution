import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { GameControls } from '@app/components'
import { TestProviders, getTestStore } from '@app/test-utils'
import {
  authUserAtom,
  currentNumberAtom,
  currentTurnAtom,
  gameReadyAtom,
} from '@app/store'
import { socket } from '@app/libs'

describe('<GameControls />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render game controls', async () => {
    render(
      <TestProviders>
        <GameControls />
      </TestProviders>,
    )

    expect(screen.queryByTestId('GameControls')).toBeInTheDocument()
  })

  it('should have 3 control buttons', async () => {
    render(
      <TestProviders>
        <GameControls />
      </TestProviders>,
    )

    expect(screen.queryAllByRole('button')).toHaveLength(3)
  })

  it('should be enabled only if its my turn', async () => {
    const store = getTestStore()

    render(
      <TestProviders>
        <GameControls />
      </TestProviders>,
    )

    expect(screen.queryAllByRole('button')[0]).toBeDisabled()

    act(() => {
      store.set(gameReadyAtom, true)
      store.set(authUserAtom, { socketId: '123', username: 'test' })
      store.set(currentTurnAtom, { user: '123', state: 'play' })
    })

    expect(screen.queryAllByRole('button')[0]).toBeEnabled()
  })

  it('click it should emit a socket event `sendNumber`', async () => {
    const store = getTestStore()

    render(
      <TestProviders>
        <GameControls />
      </TestProviders>,
    )

    act(() => {
      store.set(gameReadyAtom, true)
      store.set(currentNumberAtom, 123)
      store.set(authUserAtom, { socketId: '123', username: 'test' })
      store.set(currentTurnAtom, { user: '123', state: 'play' })
    })

    fireEvent.click(
      screen.getByRole('button', {
        name: /-1/i,
      }),
    )

    const spy = jest.spyOn(socket, 'emit')
    expect(spy).toHaveBeenCalledWith('sendNumber', {
      number: 123,
      selectedNumber: -1,
    })
  })
})

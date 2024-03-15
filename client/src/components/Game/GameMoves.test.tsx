import { act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TestProviders, getTestStore } from '@app/test-utils'
import { GameMoves } from '@app/components'
import { gameMovesAtom } from '@app/store'

describe('<GameMoves />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render game moves', async () => {
    render(
      <TestProviders>
        <GameMoves />
      </TestProviders>,
    )

    expect(screen.queryByTestId('GameMoves')).toBeInTheDocument()
    expect(screen.queryByTestId('GameMovesScroll')).not.toBeInTheDocument()
  })

  it('should render game correct amount of moves', async () => {
    render(
      <TestProviders>
        <GameMoves />
      </TestProviders>,
    )

    const store = getTestStore()
    act(() => {
      store.set(gameMovesAtom, [
        {
          isFirst: true,
          isCorrectResult: true,
          number: 19,
          selectedNumber: -1,
          user: '123',
        },
        {
          isFirst: true,
          isCorrectResult: false,
          number: 6,
          selectedNumber: -1,
          user: 'CPU',
        },
        {
          isFirst: true,
          isCorrectResult: true,
          number: 6,
          selectedNumber: 0,
          user: '123',
        },
      ])
    })

    expect(screen.queryAllByTestId('GameMove')).toHaveLength(3)
  })
})

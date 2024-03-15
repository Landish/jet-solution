import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import { TestProviders, getTestStore } from '../test-utils'
import { GamesView } from './GamesView'
// import { act } from 'react-dom/test-utils'
import { currentRoomAtom, gameReadyAtom } from '../store/store'

jest.mock('../services/roomService', () => {
  return {
    getRooms: [
      {
        id: 'd2726a4a',
        name: 'Room Berlin CPU',
        owner: 'I0yZ-jSTAGV8xTNkAAAD',
        type: 'cpu',
      },
      {
        id: 'aa0c86fa',
        name: 'Room Izmir CPU',
        owner: 'lqcflVIEANZWYkmAAAAC',
        type: 'cpu',
      },
      {
        id: 'aa0c86f9',
        name: 'Room Amsterdam',
        owner: 'lqcflVIEANZWYkmAAADD',
        type: 'human',
      },
    ],
  }
})

describe('<GamesView />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render games view', async () => {
    render(
      <TestProviders>
        <GamesView />
      </TestProviders>,
    )

    expect(screen.queryByTestId('GamesView')).toBeInTheDocument()
  })

  it('should render games lobby if game not selected', async () => {
    render(
      <TestProviders>
        <GamesView />
      </TestProviders>,
    )

    expect(screen.queryByTestId('GameLobby')).toBeInTheDocument()
    expect(screen.queryByTestId('GameDetails')).not.toBeInTheDocument()
  })

  it('should render start game if game is selected', async () => {
    render(
      <TestProviders>
        <GamesView />
      </TestProviders>,
    )

    act(() => {
      // Join room Berlin CPU
      const gameRoom = screen.getAllByRole('button', {
        name: /Room Berlin CPU/i,
      })[0]
      gameRoom.click()
    })

    const store = getTestStore()
    expect(store.get(currentRoomAtom)).toMatchObject({
      name: 'Room Berlin CPU',
    })

    expect(screen.queryByTestId('GameNotStarted')).toBeInTheDocument()
    expect(screen.queryByTestId('GameLobby')).not.toBeInTheDocument()
  })

  it.skip('should render game controls if started', async () => {
    render(
      <TestProviders>
        <GamesView />
      </TestProviders>,
    )

    const store = getTestStore()

    act(() => {
      // Join room Berlin CPU
      const gameRoom = screen.getAllByRole('button', {
        name: /Room Berlin CPU/i,
      })[0]
      gameRoom.click()

      // Set game ready
      store.set(gameReadyAtom, true)
    })

    // Start the game
    const startGameButton = screen.getByRole('button', {
      name: /start game/i,
    })

    startGameButton.click()

    // expect(screen.queryByTestId('GameControls')).toBeInTheDocument()
    screen.debug()
    // expect(screen.queryByTestId('GameNotStarted')).not.toBeInTheDocument()
  })
})
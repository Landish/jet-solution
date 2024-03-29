import { act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TestProviders, getTestStore } from '@app/test-utils'
import { GamesView } from '@app/views'
import { currentRoomAtom } from '@app/store'

jest.mock('@app/services/roomService', () => {
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

    expect(screen.queryByTestId('GameStart')).toBeInTheDocument()
    expect(screen.queryByTestId('GameLobby')).not.toBeInTheDocument()
  })
})

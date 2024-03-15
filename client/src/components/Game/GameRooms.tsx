import { useAtom, useAtomValue } from 'jotai'
import { ReactNode } from 'react'
import {
  IRoom,
  authUserAtom,
  currentNumberAtom,
  currentRoomAtom,
  gameMovesAtom,
  gameOverAtom,
  gameReadyAtom,
  roomsAtom,
} from '../../store/store'
import { useSocket } from '../../hooks/useSocket'
import { IconArrow } from '../Icons/IconArrow'

export function GameRooms(): ReactNode {
  const rooms = useAtomValue(roomsAtom)

  return (
    <div data-testid="GameRooms">
      <h3 className="text-sm text-green font-bold">Choose you game room</h3>
      <ul className="mt-4 divide-y divide-grey-dark divide-opacity-50">
        {rooms.map((room) => (
          <li key={room.owner}>
            <GameRoomItem room={room} />
          </li>
        ))}
      </ul>
    </div>
  )
}

interface GameRoomItemProps {
  room: IRoom
}

export function GameRoomItem({ room }: GameRoomItemProps): ReactNode {
  const { socket } = useSocket()
  const [, setGameReady] = useAtom(gameReadyAtom)
  const [currentRoom, setCurrentRoom] = useAtom(currentRoomAtom)
  const [gameMoves, setGameMoves] = useAtom(gameMovesAtom)
  const [gameOver, setGameOver] = useAtom(gameOverAtom)
  const [currentNumber, setCurrentNumber] = useAtom(currentNumberAtom)
  const authUser = useAtomValue(authUserAtom)
  const isCurrent = currentRoom?.id === room.id

  const isGameStarted = currentNumber !== null || gameMoves.length > 0

  function handleJoinRoom(room: IRoom) {
    setGameReady(false)
    setGameOver(null)
    setGameMoves([])
    setCurrentNumber(null)

    setCurrentRoom(room)

    socket.emit('joinRoom', {
      username: authUser?.username,
      room: room.id,
      roomType: room.type,
    })
  }

  const classNames = isCurrent ? 'bg-blue text-white' : 'bg-white text-green'
  const iconClassNames = isCurrent
    ? 'text-white group-hover:text-white'
    : 'text-blue group-hover:text-white'

  return (
    <button
      onClick={() => handleJoinRoom(room)}
      disabled={isGameStarted && !gameOver?.isOver}
      className={`w-full disabled:pointer-events-none group hover:bg-blue transition-colors flex items-center justify-between p-6 group ${classNames}`}
    >
      <span className="font-bold text-sm group-hover:text-white">
        {room.name}
      </span>
      <span className={iconClassNames}>
        <IconArrow />
      </span>
    </button>
  )
}

export function GameRoomsSkeleton(): ReactNode {
  return <h3 className="text-sm text-green font-bold">Loading...</h3>
}

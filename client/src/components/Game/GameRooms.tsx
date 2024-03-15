import { ReactNode } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { IconArrow } from '@app/components'
import {
  IRoom,
  authUserAtom,
  currentNumberAtom,
  currentRoomAtom,
  gameMovesAtom,
  gameOverAtom,
  gameReadyAtom,
  roomsAtom,
} from '@app/store'
import { cn } from '@app/utils'
import { useSocket } from '@app/hooks'

export function GameRooms(): ReactNode {
  const rooms = useAtomValue(roomsAtom)

  return (
    <div data-testid="GameRooms">
      <h3 className="text-sm font-bold text-green">Choose you game room</h3>
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

  return (
    <button
      onClick={() => handleJoinRoom(room)}
      disabled={isGameStarted && !gameOver?.isOver}
      className={cn(
        'group flex w-full items-center justify-between p-6 transition-colors',
        'hover:bg-blue disabled:pointer-events-none',
        isCurrent ? 'bg-blue text-white' : 'bg-white text-green',
      )}
    >
      <span className="text-sm font-bold group-hover:text-white">
        {room.name}
      </span>
      <span
        className={cn(
          isCurrent
            ? 'text-white group-hover:text-white'
            : 'text-blue group-hover:text-white',
        )}
      >
        <IconArrow />
      </span>
    </button>
  )
}

export function GameRoomsSkeleton(): ReactNode {
  return <h3 className="text-sm font-bold text-green">Loading...</h3>
}

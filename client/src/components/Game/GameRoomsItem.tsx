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
  gameStartedAtom,
} from '@app/store'
import { cn } from '@app/utils'
import { useSocket } from '@app/hooks'

interface GameRoomsItemProps {
  room: IRoom
}

export function GameRoomsItem({ room }: GameRoomsItemProps): ReactNode {
  const { socket } = useSocket()
  const [, setGameReady] = useAtom(gameReadyAtom)
  const [currentRoom, setCurrentRoom] = useAtom(currentRoomAtom)
  const [, setGameMoves] = useAtom(gameMovesAtom)
  const [gameOver, setGameOver] = useAtom(gameOverAtom)
  const [, setCurrentNumber] = useAtom(currentNumberAtom)
  const authUser = useAtomValue(authUserAtom)
  const gameStarted = useAtomValue(gameStartedAtom)
  const isCurrent = currentRoom?.id === room.id

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
      disabled={gameStarted && !gameOver?.isOver}
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

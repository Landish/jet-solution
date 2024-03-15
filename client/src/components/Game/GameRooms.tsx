import { ReactNode } from 'react'
import { useAtomValue } from 'jotai'
import { roomsAtom } from '@app/store'
import { GameRoomItem } from '@app/components'

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

export function GameRoomsSkeleton(): ReactNode {
  return (
    <div>
      <h3 className="text-sm font-bold text-green">Loading...</h3>
    </div>
  )
}

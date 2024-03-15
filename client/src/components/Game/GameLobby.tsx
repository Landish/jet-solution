import { ReactNode, Suspense } from 'react'
import { GameRooms, GameRoomsSkeleton } from '@app/components'

export function GameLobby(): ReactNode {
  return (
    <div className="h-full p-4" data-testid="GameLobby">
      <div className="md:hidden">
        <Suspense fallback={<GameRoomsSkeleton />}>
          <GameRooms />
        </Suspense>
      </div>
      <div className="hidden h-full items-center justify-center md:flex">
        <h3 className="font-bold text-green">Choose you game room</h3>
      </div>
    </div>
  )
}

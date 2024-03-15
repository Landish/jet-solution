import { ReactNode, Suspense } from 'react'
import { useAtomValue } from 'jotai'
import {
  Container,
  GameDetails,
  GameOver,
  GameRooms,
  GameRoomsSkeleton,
} from '@app/components'
import { currentRoomAtom } from '@app/store'

export function GameLobby(): ReactNode {
  return (
    <div className="p-4 h-full" data-testid="GameLobby">
      <div className="md:hidden">
        <Suspense fallback={<GameRoomsSkeleton />}>
          <GameRooms />
        </Suspense>
      </div>
      <div className="hidden h-full md:flex justify-center items-center">
        <h3 className="text-green font-bold">Choose you game room</h3>
      </div>
    </div>
  )
}

export function GamesView(): ReactNode {
  const currentRoom = useAtomValue(currentRoomAtom)
  return (
    <Container className="flex-1 grid grid-cols-3" data-testid="GamesView">
      <aside className="hidden md:block md:col-span-1 p-4">
        <Suspense fallback={<GameRoomsSkeleton />}>
          <GameRooms />
        </Suspense>
      </aside>
      <main className="bg-white col-span-3 md:col-span-2 relative">
        <GameOver />
        {currentRoom ? <GameDetails /> : <GameLobby />}
      </main>
    </Container>
  )
}

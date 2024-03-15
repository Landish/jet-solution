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

export function GamesView(): ReactNode {
  const currentRoom = useAtomValue(currentRoomAtom)
  return (
    <Container className="grid flex-1 grid-cols-3" data-testid="GamesView">
      <aside className="hidden p-4 md:col-span-1 md:block">
        <Suspense fallback={<GameRoomsSkeleton />}>
          <GameRooms />
        </Suspense>
      </aside>
      <main className="relative col-span-3 bg-white md:col-span-2">
        <GameOver />
        {currentRoom ? <GameDetails /> : <GameLobby />}
      </main>
    </Container>
  )
}

import { ReactNode, Suspense } from 'react'
import { useAtomValue } from 'jotai'
import {
  Container,
  GameDetails,
  GameLobby,
  GameOver,
  GameRooms,
  GameRoomsSkeleton,
} from '@app/components'
import { currentRoomAtom } from '@app/store'

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

import { ReactNode } from 'react'
import { useAtomValue } from 'jotai'
import { Button } from '@app/components'
import { gameReadyAtom } from '@app/store'
import { useSocket } from '@app/hooks'

export function GameStart(): ReactNode {
  const { socket } = useSocket()
  const isGameReady = useAtomValue(gameReadyAtom)

  function handleGameStart() {
    socket.emit('letsPlay')
  }

  return (
    <div
      className="flex h-full items-center justify-center"
      data-testid="GameStart"
    >
      <Button onClick={handleGameStart} disabled={!isGameReady}>
        Start Game
      </Button>
    </div>
  )
}

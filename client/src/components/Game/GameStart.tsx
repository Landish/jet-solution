import { ReactNode } from 'react'
import { useSocket } from '@/hooks/useSocket'
import { gameReadyAtom } from '@/store/store'
import { useAtomValue } from 'jotai'
import { Button } from '@/components/Button/Button'

export function GameStart(): ReactNode {
  const { socket } = useSocket()
  const isGameReady = useAtomValue(gameReadyAtom)

  function handleGameStart() {
    socket.emit('letsPlay')
  }

  return (
    <div
      className="flex items-center justify-center h-full"
      data-testid="GameStart"
    >
      <Button onClick={handleGameStart} disabled={!isGameReady}>
        Start Game
      </Button>
    </div>
  )
}

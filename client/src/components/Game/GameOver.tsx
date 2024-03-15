import { useAtom, useAtomValue } from 'jotai'
import { Button, WinAnimation, LooseAnimation } from '@app/components'
import {
  gameMovesAtom,
  gameOverAtom,
  gameReadyAtom,
  isWinnerAtom,
} from '@app/store'
import { logger } from '@app/utils'
import { useSocket } from '@app/hooks'

export function GameOver() {
  const { socket } = useSocket()
  const [, setGameMoves] = useAtom(gameMovesAtom)
  const isGameReady = useAtomValue(gameReadyAtom)
  const [gameOver, setGameOver] = useAtom(gameOverAtom)
  const isWinner = useAtomValue(isWinnerAtom)
  const isGameOver = gameOver?.isOver || false

  function handleNewGame() {
    logger('handleNewGame')

    setGameOver(null)
    setGameMoves([])

    socket.emit('letsPlay')
  }

  if (!isGameOver) return null

  return (
    <div
      className="absolute inset-0 z-50 bg-black bg-opacity-50"
      data-testid="GameOver"
    >
      <div className="flex h-full justify-center pt-[15%]">
        <div className="space-y-4">
          <div className="flex justify-center">
            {isWinner ? <WinAnimation /> : <LooseAnimation />}
          </div>
          <h2 className="text-center text-[40px] font-bold leading-[50px] text-white">
            {isWinner ? 'You Won!' : 'You lost!'}
          </h2>
          <Button onClick={handleNewGame} disabled={!isGameReady}>
            New Game
          </Button>
        </div>
      </div>
    </div>
  )
}

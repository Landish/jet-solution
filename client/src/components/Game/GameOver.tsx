import { useAtom, useAtomValue } from 'jotai'
import {
  gameMovesAtom,
  gameOverAtom,
  gameReadyAtom,
  isWinnerAtom,
} from '../../store/store'
import { LooseAnimation } from '../Animations/LooseAnimation'
import { WinAnimation } from '../Animations/WinAnimation'
import { useSocket } from '../../hooks/useSocket'
import { logger } from '../../utils/utils'
import { Button } from '../Button/Button'

export function GameOver() {
  const { socket } = useSocket()
  const [, setGameMoves] = useAtom(gameMovesAtom)
  const isGameReady = useAtomValue(gameReadyAtom)
  const [gameOver, setGameOver] = useAtom(gameOverAtom)
  const isWinner = useAtomValue(isWinnerAtom)
  const isGameOver = gameOver?.isOver || false

  if (!isGameOver) return null

  function handleNewGame() {
    logger('handleNewGame')

    setGameOver(null)
    setGameMoves([])

    socket.emit('letsPlay')
  }

  return (
    <div
      className="absolute inset-0 bg-black bg-opacity-50 z-50"
      data-testid="GameOver"
    >
      <div className="flex pt-[15%] justify-center h-full">
        <div className="space-y-4">
          <div className="flex justify-center">
            {isWinner ? <WinAnimation /> : <LooseAnimation />}
          </div>
          <h2 className="text-white text-center font-bold text-[40px] leading-[50px]">
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

import { ReactNode } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { GameControls, GameMoves, GameStart } from '@app/components'
import {
  IGameMove,
  IGameOver,
  ITurn,
  currentNumberAtom,
  currentTurnAtom,
  gameMovesAtom,
  gameOverAtom,
  gameReadyAtom,
  gameStartedAtom,
} from '@app/store'
import { logger } from '@app/utils'
import { useSocketCallback } from '@app/hooks'

export function GameDetails(): ReactNode {
  const setCurrentNumber = useSetAtom(currentNumberAtom)
  const setGameMoves = useSetAtom(gameMovesAtom)
  const setCurrentTurn = useSetAtom(currentTurnAtom)
  const setGameReady = useSetAtom(gameReadyAtom)
  const gameStarted = useAtomValue(gameStartedAtom)
  const [gameOver, setGameOver] = useAtom(gameOverAtom)

  useSocketCallback<{ state: boolean }>('onReady', (data) => {
    logger('onReady', data)
    setGameReady(data.state)
  })

  useSocketCallback<ITurn>('activateYourTurn', (data) => {
    if (gameOver?.isOver) return
    logger('activateYourTurn', data)
    setCurrentTurn(data)
  })

  useSocketCallback<IGameOver>('gameOver', (data) => {
    if (gameOver?.isOver) return
    logger('gameOver', data)

    setGameOver(data)
    setCurrentNumber(null)
    setCurrentTurn(null)
  })

  useSocketCallback<IGameMove>('randomNumber', (data) => {
    if (gameOver?.isOver) return

    logger('randomNumber', data)
    setCurrentNumber(data.number)

    if (!data.isFirst) {
      setGameMoves((oldMoves) => [...oldMoves, data])
    }
  })

  if (!gameStarted) {
    return <GameStart />
  }

  return (
    <div className="h-full" data-testid="GameDetails">
      <GameMoves />
      <GameControls />
    </div>
  )
}

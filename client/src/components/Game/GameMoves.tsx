import { ReactNode, useEffect, useRef } from 'react'
import { gameMovesAtom } from '../../store/store'
import { useAtomValue } from 'jotai'
import { GameMove } from './GameMove'

export function GameMoves(): ReactNode {
  const scrollRef = useRef<HTMLDivElement>(null)
  const gameMoves = useAtomValue(gameMovesAtom)

  useEffect(() => {
    if (gameMoves.length === 0) return
    // Without timeout, the scrollIntoView does not work!
    const timeOut = setTimeout(() => {
      scrollRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
    return () => clearTimeout(timeOut)
  }, [gameMoves])

  return (
    /**
     * Max-Height: 100% - header - footer - game controls
     */
    <div
      className="empty:hidden max-h-[calc(100vh_-_88px_-_72px_-_72px)] overflow-hidden overflow-y-auto space-y-4 p-4"
      data-testid="GameMoves"
    >
      {gameMoves.map((move, index) => (
        <GameMove move={move} key={index} />
      ))}
      {gameMoves?.length > 0 && (
        <div ref={scrollRef} data-testid="GameMovesScroll" />
      )}
    </div>
  )
}

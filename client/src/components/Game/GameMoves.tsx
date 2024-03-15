import { ReactNode, useEffect, useRef } from 'react'
import { useAtomValue } from 'jotai'
import { GameMove } from '@app/components'
import { gameMovesAtom } from '@app/store'

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
      className="max-h-[calc(100vh_-_88px_-_72px_-_72px)] space-y-4 overflow-hidden overflow-y-auto p-4 empty:hidden"
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

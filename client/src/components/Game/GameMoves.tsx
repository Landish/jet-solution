import { ReactNode, useEffect, useRef } from 'react'
import { IconPlayer } from '../Icons/IconPlayer'
import { IconCPU } from '../Icons/IconCPU'
import { IGameMove, authUserAtom, gameMovesAtom } from '../../store/store'
import { useAtomValue } from 'jotai'
import { calculateResult } from '../../utils/utils'

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
    <div className="empty:hidden max-h-[calc(100vh_-_88px_-_72px_-_72px)] overflow-hidden overflow-y-auto space-y-4 p-4">
      {gameMoves.map((move, index) => (
        <GameMove move={move} key={index} />
      ))}
      {gameMoves?.length > 0 && <div ref={scrollRef} />}
    </div>
  )
}

export function GameMove({ move }: { move: IGameMove }): ReactNode {
  const { number, selectedNumber, isCorrectResult, user } = move
  const authUser = useAtomValue(authUserAtom)

  const isRightDirection = authUser?.username === move.user

  function formulaFormatted() {
    return `[ ( ${selectedNumber} + ${number} ) / 3 ] = ${calculateResult({
      number,
      selectedNumber,
    })}`
  }

  return (
    <div
      className={
        isRightDirection
          ? 'flex space-x-4 flex-row-reverse space-x-reverse'
          : 'flex space-x-4'
      }
    >
      {user === 'CPU' ? <IconCPU /> : <IconPlayer />}
      <div
        className={
          isRightDirection
            ? 'flex-1 flex justify-end text-right'
            : 'flex-1 flex'
        }
      >
        <div className="space-y-2 w-full sm:w-1/2">
          <div
            className={`${
              isCorrectResult ? 'bg-blue' : 'bg-green'
            } h-14 w-14 rounded-full inline-flex items-center justify-center text-white font-bold text-2xl`}
          >
            {selectedNumber}
          </div>
          <div className="bg-grey truncate text-green rounded-sm px-4 h-8 flex items-center">
            {formulaFormatted()}
          </div>
          <div className="bg-grey text-green rounded-sm px-4 h-8 flex items-center">
            {calculateResult({ number, selectedNumber })}
          </div>
        </div>
      </div>
    </div>
  )
}

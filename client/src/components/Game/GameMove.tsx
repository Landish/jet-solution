import { ReactNode } from 'react'
import { useAtomValue } from 'jotai'
import { IconPlayer } from '@app/components/Icons/IconPlayer'
import { IconCPU } from '@app/components/Icons/IconCPU'
import { IGameMove, authUserAtom } from '@app/store/store'
import { calculateResult, formulaFormatted } from '@app/utils/utils'

export function GameMove({ move }: { move: IGameMove }): ReactNode {
  const { number, selectedNumber, isCorrectResult, user } = move
  const authUser = useAtomValue(authUserAtom)

  const isRightDirection = authUser?.username === move.user

  return (
    <div
      className={
        isRightDirection
          ? 'flex space-x-4 flex-row-reverse space-x-reverse'
          : 'flex space-x-4'
      }
      data-testid="GameMove"
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
            {formulaFormatted({ number, selectedNumber })}
          </div>
          <div className="bg-grey text-green rounded-sm px-4 h-8 flex items-center">
            {calculateResult({ number, selectedNumber })}
          </div>
        </div>
      </div>
    </div>
  )
}

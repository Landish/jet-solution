import { ReactNode } from 'react'
import { useAtomValue } from 'jotai'
import { IconPlayer, IconCPU } from '@app/components'
import { IGameMove, authUserAtom } from '@app/store'
import { calculateResult, cn, formulaFormatted } from '@app/utils'

export function GameMove({ move }: { move: IGameMove }): ReactNode {
  const { number, selectedNumber, isCorrectResult, user } = move
  const authUser = useAtomValue(authUserAtom)

  const isRightDirection = authUser?.username === move.user

  return (
    <div
      className={cn(
        'flex space-x-4',
        isRightDirection && 'flex-row-reverse space-x-reverse',
      )}
      data-testid="GameMove"
    >
      {user === 'CPU' ? <IconCPU /> : <IconPlayer />}
      <div
        className={cn(
          'flex flex-1',
          isRightDirection && 'justify-end text-right',
        )}
      >
        <div className="w-full space-y-2 sm:w-1/2">
          <div
            className={cn(
              'inline-flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold text-white',
              isCorrectResult ? 'bg-blue' : 'bg-green',
            )}
          >
            {selectedNumber}
          </div>
          <div className="flex h-8 items-center truncate rounded-sm bg-grey px-4 text-green">
            {formulaFormatted({ number, selectedNumber })}
          </div>
          <div className="flex h-8 items-center rounded-sm bg-grey px-4 text-green">
            {calculateResult({ number, selectedNumber })}
          </div>
        </div>
      </div>
    </div>
  )
}

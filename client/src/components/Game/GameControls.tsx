import { ReactNode } from 'react'
import { useAtomValue } from 'jotai'
import { Button } from '@app/components'
import { currentNumberAtom, isMyTurnAtom } from '@app/store'
import { useSocket } from '@app/hooks'

export function GameControls(): ReactNode {
  const { socket } = useSocket()

  const numbers = [-1, 0, 1]
  const currentNumber = useAtomValue(currentNumberAtom)
  const isMyTurn = useAtomValue(isMyTurnAtom)

  function handleSendNumber(selectedNumber: number) {
    socket.emit('sendNumber', {
      number: currentNumber,
      selectedNumber: selectedNumber,
    })
  }

  return (
    <div
      className="flex justify-center space-x-8 p-4"
      data-testid="GameControls"
    >
      {numbers.map((number) => (
        <Button
          key={number}
          disabled={!isMyTurn}
          onClick={() => handleSendNumber(number)}
          size="circle"
        >
          {number}
        </Button>
      ))}
    </div>
  )
}

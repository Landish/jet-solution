import { ReactNode } from 'react'
import { useAtomValue } from 'jotai'
import { useSocket } from '../../hooks/useSocket'
import { currentNumberAtom, myTurnAtom } from '../../store/store'
import { Button } from '../Button/Button'

export function GameControls(): ReactNode {
  const { socket } = useSocket()

  const numbers = [-1, 0, 1]
  const currentNumber = useAtomValue(currentNumberAtom)
  const isMyTurn = useAtomValue(myTurnAtom)

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
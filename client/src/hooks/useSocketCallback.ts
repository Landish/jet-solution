import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { IGameMove, IGameOver, ITurn, isSocketConnectedAtom } from '@app/store'
import { useSocket } from '@app/hooks'

export interface ISocketServerEventsMap {
  randomNumber: IGameMove
  activateYourTurn: ITurn
  gameOver: IGameOver
  onReady: { state: boolean }
  message: { message: string }
  listTrigger: 'true'
}

type EventData<T extends keyof ISocketServerEventsMap> =
  ISocketServerEventsMap[T]

export function useSocketCallback<TEvent extends keyof ISocketServerEventsMap>(
  event: TEvent,
  callback: (data: EventData<TEvent>) => void,
) {
  const { socket } = useSocket()
  const connected = useAtomValue(isSocketConnectedAtom)

  useEffect(() => {
    if (!connected) return

    function handleCallback(data: EventData<TEvent>) {
      callback(data)
    }

    socket.on(event, handleCallback)

    return () => {
      socket.off(event, handleCallback)
    }
  }, [callback, connected, event, socket])
}

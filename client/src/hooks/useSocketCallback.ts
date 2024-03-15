import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { IGameMove, IGameOver, isSocketConnectedAtom } from '@app/store/store'
import { useSocket } from '@app/hooks/useSocket'

export interface ISocketServerEventsMap {
  randomNumber: (data: IGameMove) => void
  activateYourTurn: (data: { user: string; state: string }) => void
  gameOver: (data: IGameOver) => void
  onReady: (data: { state: boolean }) => void
  listTrigger: (data: 'true' | 'false') => void
  message: (data: { message: string }) => void
}

export function useSocketCallback<TData>(
  event: keyof ISocketServerEventsMap,
  callback: (data: TData) => void,
) {
  const { socket } = useSocket()
  const connected = useAtomValue(isSocketConnectedAtom)

  useEffect(() => {
    if (!connected) return

    function handleCallback(data: TData) {
      callback(data)
    }

    socket.on(event, handleCallback)

    return () => {
      socket.off(event, handleCallback)
    }
  }, [callback, connected, event, socket])
}

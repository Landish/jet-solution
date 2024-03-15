import { createContext, useEffect } from 'react'
import { useAtom } from 'jotai'

import { logger } from '@app/utils/utils'
import { socket } from '@app/libs/socket'
import { isSocketConnectedAtom } from '@app/store/store'

export const SocketContext = createContext({
  socket,
})

interface SocketProviderProps {
  children: React.ReactNode
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [connected, setConnected] = useAtom(isSocketConnectedAtom)

  useEffect(() => {
    if (connected) return

    socket.connect()

    function handleConnect() {
      logger('Socket connected!')
      setConnected(true)
    }

    function handleError() {
      logger('Socket error!')
      setConnected(false)
    }

    function handleDisconnect() {
      logger('Socket disconnected!')
      setConnected(false)
    }

    socket.on('connect', handleConnect)
    socket.on('error', handleError)
    socket.on('connect_error', handleError)
    socket.on('disconnect', handleDisconnect)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('error', handleError)
      socket.off('connect_error', handleError)
      socket.off('disconnect', handleDisconnect)
    }
  }, [connected, setConnected])

  useEffect(() => {
    if (!connected) return

    function handleMessage(data: unknown) {
      logger('useMessage: ', data)
    }

    socket.on('message', handleMessage)

    return () => {
      socket.off('message', handleMessage)
    }
  }, [connected])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

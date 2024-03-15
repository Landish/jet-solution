import { useContext } from 'react'
import { SocketContext } from '@app/providers/SocketProvider'

export function useSocket() {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket() must be used within a <SocketProvider />')
  }
  return context
}

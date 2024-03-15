/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'socket.io-client' {
  interface Socket {
    connect(): void
    on(event: string, callback: (...args: any[]) => void): this
    emit(event: string, ...args: any[]): this
    off(event: string, callback: (...args: any[]) => void): this
    disconnect(): void
    id: string
  }

  interface SocketManager {
    new (uri: string, opts?: any): Socket
  }

  const io: {
    (uri: string, opts?: any): Socket
    Socket: SocketManager
  }

  export = io
}

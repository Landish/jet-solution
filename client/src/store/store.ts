import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { getRooms } from '@/services/roomService'

/**
 * Socket State
 */
export const isSocketConnectedAtom = atom(false)

/**
 * Auth State
 */
export interface IAuthUser {
  socketId: string
  username: string
}

export const usernameAtom = atomWithStorage('username', '')

export const authUserAtom = atom<IAuthUser | null>(null)
export const isAuthenticatedAtom = atom((get) => get(authUserAtom) !== null)

export interface IRoom {
  id: string
  name: string
  owner: string // Socket.id of the owner
  type: 'cpu' | 'human'
}

export const roomsAtom = atom<Promise<IRoom[]>>(getRooms)

/**
 * Game state
 */
export const currentRoomAtom = atom<IRoom | null>(null)
export const gameReadyAtom = atom(false)
export const currentNumberAtom = atom<number | null>(null)

// ID's of current players (if CPU, only one will be, if human, two will be)
export const currentPlayers = atom<string[]>([])

export interface IGameOver {
  isOver: boolean
  user: string // username or 'CPU'
}

export const gameOverAtom = atom<IGameOver | null>(null)
export const isWinnerAtom = atom((get) => {
  const authUser = get(authUserAtom)
  const gameOver = get(gameOverAtom)
  return gameOver?.user === authUser?.username
})

export interface ITurn {
  user: string // socketId
  state: 'play' | 'wait'
}

export const currentTurnAtom = atom<ITurn | null>(null)

export const isMyTurnAtom = atom<boolean>((get) => {
  const authUser = get(authUserAtom)
  const currentRoom = get(currentRoomAtom)
  const currentTurn = get(currentTurnAtom)

  if (currentRoom?.type === 'human') {
    if (
      currentTurn?.user !== authUser?.socketId &&
      currentTurn?.state === 'wait'
    ) {
      return true
    }
  }

  if (currentRoom?.type === 'cpu') {
    if (currentTurn == null) {
      return true
    }
  }

  if (
    currentTurn?.user === authUser?.socketId &&
    currentTurn?.state === 'play'
  ) {
    return true
  }

  return false
})

export interface IGameMove {
  isFirst: boolean
  user: string // username
  number: number
  selectedNumber: number
  isCorrectResult: boolean
}

export const gameMovesAtom = atom<IGameMove[]>([])

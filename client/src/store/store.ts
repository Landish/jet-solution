import { getRooms } from '@app/services'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

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

/**
 * Store only `username` in localStorage.
 */
export const usernameAtom = atomWithStorage('username', '')
export const authUserAtom = atom<IAuthUser | null>(null)
export const isAuthenticatedAtom = atom((get) => get(authUserAtom) !== null)

/**
 * Room state
 */
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
export const currentNumberAtom = atom<number | null>(null)

export const gameReadyAtom = atom(false)
export const gameStartedAtom = atom((get) => {
  const moves = get(gameMovesAtom)
  const number = get(currentNumberAtom)
  return moves?.length > 0 || number !== null
})

/**
 * Game Moves state
 */
export interface IGameMove {
  isFirst: boolean
  user: string // username
  number: number
  selectedNumber: number
  isCorrectResult: boolean
}

export const gameMovesAtom = atom<IGameMove[]>([])

/**
 * Game Over state
 */
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

/**
 * Turn state
 */
export interface ITurn {
  user: string // socketId
  state: 'play' | 'wait'
}

export const currentTurnAtom = atom<ITurn | null>(null)
export const isMyTurnAtom = atom<boolean>((get) => {
  const user = get(authUserAtom)
  const room = get(currentRoomAtom)
  const turn = get(currentTurnAtom)

  if (room?.type === 'human') {
    if (turn?.user !== user?.socketId && turn?.state === 'wait') {
      return true
    }
  }

  if (room?.type === 'cpu') {
    if (turn === null) {
      return true
    }
  }

  if (turn?.user === user?.socketId && turn?.state === 'play') {
    return true
  }

  return false
})

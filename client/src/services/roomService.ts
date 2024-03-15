import { IRoom } from '@app/store/store'

/**
 * Get list of rooms
 * @returns {Promise<IRoom[]>} - List of rooms
 */
export async function getRooms(): Promise<IRoom[]> {
  const response = await fetch('http://localhost:3004/rooms')
  const rooms = await response.json()
  return rooms as IRoom[]
}

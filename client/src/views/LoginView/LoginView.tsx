import { ReactNode } from 'react'
import { useAtom } from 'jotai'
import { Container, Button } from '@app/components'
import { authUserAtom, usernameAtom } from '@app/store'
import { logger } from '@app/utils'
import { useSocket } from '@app/hooks'

export function LoginView(): ReactNode {
  const { socket } = useSocket()
  const [, setAuthUser] = useAtom(authUserAtom)
  const [username, setUsername] = useAtom(usernameAtom)

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const authUser = { socketId: socket.id, username }

    socket.emit('login', { username })
    setAuthUser(authUser)

    logger('handleLogin', authUser)
  }

  return (
    <Container className="grid flex-1" data-testid="LoginView">
      <main className="bg-white">
        <form
          onSubmit={handleLogin}
          className="flex h-full w-full flex-col items-center justify-center space-y-4"
        >
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            type="text"
            placeholder="Username"
            className="h-14 min-w-60 rounded-full bg-grey px-6 text-base text-green shadow focus:outline-none"
          />
          <Button disabled={!username} type="submit">
            Login
          </Button>
        </form>
      </main>
    </Container>
  )
}

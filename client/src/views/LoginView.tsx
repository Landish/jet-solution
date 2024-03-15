import { ReactNode } from 'react'
import { useAtom } from 'jotai'
import { useSocket } from '@/hooks/useSocket'
import { authUserAtom, usernameAtom } from '@/store/store'
import { Container } from '@/components/Container/Container'
import { Button } from '@/components/Button/Button'
import { logger } from '@/utils/utils'

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
    <Container className="flex-1 grid" data-testid="LoginView">
      <main className="bg-white">
        <form
          onSubmit={handleLogin}
          className="flex flex-col space-y-4 items-center justify-center h-full w-full"
        >
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            type="text"
            placeholder="Username"
            className="bg-grey rounded-full h-14 text-green text-base shadow min-w-60 focus:outline-none px-6"
          />
          <Button disabled={!username} type="submit">
            Login
          </Button>
        </form>
      </main>
    </Container>
  )
}

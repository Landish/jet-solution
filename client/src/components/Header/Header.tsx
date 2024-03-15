import { ReactNode } from 'react'
import { Logo } from '../Logo/Logo'
import { Container } from '../Container/Container'

export function Header(): ReactNode {
  return (
    <header className="bg-brand shadow relative z-10 py-4">
      <Container>
        <div className="flex space-x-3">
          <Logo />
          <div className="h-10">
            <h1 className="text-white font-bold text-lg leading-5">
              {/* TODO: Make player name dynamic. */}
              Playing with Sabrican
            </h1>
            <h2 className="text-white font-normal text-sm leading-6">
              Win the game or win the job.
            </h2>
          </div>
        </div>
      </Container>
    </header>
  )
}

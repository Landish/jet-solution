import { ReactNode } from 'react'
import { Logo, Container } from '@app/components'

export function Header(): ReactNode {
  return (
    <header className="relative z-10 bg-brand py-4 shadow">
      <Container>
        <div className="flex space-x-3">
          <Logo />
          <div className="h-10">
            <h1 className="text-lg font-bold leading-5 text-white">
              Playing with Sabrican
            </h1>
            <h2 className="text-sm font-normal leading-6 text-white">
              Win the game or win the job.
            </h2>
          </div>
        </div>
      </Container>
    </header>
  )
}

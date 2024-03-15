import { ReactNode } from 'react'
import { LogoFull, Container } from '@app/components'

export function Footer(): ReactNode {
  return (
    <footer className="bg-green-dark py-4">
      <Container>
        <div className="flex items-center justify-between">
          <LogoFull />
          <div className="flex items-center space-x-10">
            <a href="#" className="text-white text-xs hover:underline">
              Cookie statement
            </a>
            <p className="text-xs text-white text-opacity-40">
              &copy; 2024 Takeaway.com
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

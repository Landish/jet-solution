import { ReactNode } from 'react'
import { Header, Footer } from '@app/components'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps): ReactNode {
  return (
    <div className="min-h-screen flex flex-col bg-grey">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

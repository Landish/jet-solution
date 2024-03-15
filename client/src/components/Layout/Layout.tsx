import { ReactNode } from 'react'
import { Header, Footer } from '@app/components'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps): ReactNode {
  return (
    <div className="flex min-h-screen flex-col bg-grey">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

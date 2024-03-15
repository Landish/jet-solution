import { ReactNode } from 'react'
import { Header } from '@app/components/Header/Header'
import { Footer } from '@app/components/Footer/Footer'

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

import { ReactNode } from 'react'
import { useAtomValue } from 'jotai'
import { Layout } from './components/Layout/Layout'
import { isAuthenticatedAtom } from './store/store'
import { GamesView } from './views/GamesView'
import { LoginView } from './views/LoginView'
import { useSocketCallback } from './hooks/useSocketCallback'
import { logger } from './utils/utils'

export default function App(): ReactNode {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)

  useSocketCallback('listTrigger', (data) => {
    logger('listTrigger', data)
  })

  return (
    <Layout>
      <>{isAuthenticated ? <GamesView /> : <LoginView />}</>
    </Layout>
  )
}

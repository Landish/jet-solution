import { ReactNode } from 'react'
import { useAtomValue } from 'jotai'
import { Layout } from '@app/components/Layout/Layout'
import { GamesView } from '@app/views/GamesView'
import { LoginView } from '@app/views/LoginView'
import { useSocketCallback } from '@app/hooks/useSocketCallback'
import { isAuthenticatedAtom } from '@app/store/store'
import { logger } from '@app/utils/utils'

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

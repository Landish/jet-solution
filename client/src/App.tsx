import { ReactNode } from 'react'
import { useAtomValue } from 'jotai'
import { Layout } from '@app/components'
import { GamesView, LoginView } from '@app/views'
import { useSocketCallback } from '@app/hooks'
import { isAuthenticatedAtom } from '@app/store'
import { logger } from '@app/utils'

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

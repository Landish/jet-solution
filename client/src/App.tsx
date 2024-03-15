import { ReactNode } from 'react'
import { useAtomValue } from 'jotai'
import { GamesView, LoginView } from '@app/views'
import { Layout } from '@app/components'
import { isAuthenticatedAtom } from '@app/store'
import { logger } from '@app/utils'
import { useSocketCallback } from '@app/hooks'

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

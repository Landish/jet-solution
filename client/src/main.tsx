import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@app/App'
import '@app/assets/css/index.css'

import { SocketProvider } from '@app/providers/SocketProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>,
)

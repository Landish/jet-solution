import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import '@/assets/css/index.css'

import { SocketProvider } from '@/providers/SocketProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>,
)

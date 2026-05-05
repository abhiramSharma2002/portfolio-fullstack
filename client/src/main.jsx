import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>

        <App />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#0f1829',
              color:      '#e2e8f0',
              border:     '1px solid rgba(0,255,170,0.2)',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize:   '0.85rem',
            },
            success: {
              iconTheme: { primary: '#00ffaa', secondary: '#050810' },
            },
            error: {
              iconTheme: { primary: '#ff6b6b', secondary: '#050810' },
            },
          }}
        />

      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
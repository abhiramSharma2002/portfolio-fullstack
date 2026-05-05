import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1', //  FIXED
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ───────── REQUEST INTERCEPTOR ─────────
axiosInstance.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: Date.now() }
    return config
  },
  (error) => Promise.reject(error)
)

// ───────── RESPONSE INTERCEPTOR ─────────
axiosInstance.interceptors.response.use(

  // SUCCESS
  (response) => {
    const start = response.config.metadata?.startTime || Date.now()
    const duration = Date.now() - start

    console.log(
      `%c${response.config.method?.toUpperCase()} ${response.config.url} — ${duration}ms`,
      'color: #00ffaa; font-family: monospace'
    )

    return response
  },

  // ERROR
  (error) => {
    const status = error.response?.status
    const method = error.config?.method?.toUpperCase() || 'UNKNOWN'
    const url = error.config?.url || 'UNKNOWN'

    console.error(
      `%c ${method} ${url} — ${status}`,
      'color: #ff6b6b; font-family: monospace'
    )

    // 401 — unauthorized
    if (status === 401) {
      if (!url.includes('/auth/me') && !url.includes('/auth/login')) {
        window.location.href = '/login'
      }
    }

    // 🚫 403
    if (status === 403) {
      console.warn('Access denied')
    }

    // 🐢 429
    if (status === 429) {
      console.warn('Too many requests — slow down!')
    }

    // 💥 500
    if (status >= 500) {
      console.error('Server error occurred')
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
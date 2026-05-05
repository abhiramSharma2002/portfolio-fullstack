import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axiosInstance from '../api/axiosInstance'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get('/auth/me')
      setUser(res.data.user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // ✅ REGISTER
  const register = useCallback(async ({ name, email, password }) => {
    setLoading(true)
    try {
      const res = await axiosInstance.post('/auth/register', {
        name,
        email,
        password,
      })

      setUser(res.data.user)
      toast.success(`Welcome, ${res.data.user.name}! 🎉`)

      return { success: true, user: res.data.user } // ✅ FIXED
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed'
      toast.error(msg)
      return { success: false, message: msg }
    } finally {
      setLoading(false)
    }
  }, [])

  // ✅ LOGIN
  const login = useCallback(async ({ email, password }) => {
    setLoading(true)
    try {
      const res = await axiosInstance.post('/auth/login', {
        email,
        password,
      })

      setUser(res.data.user)
      toast.success(`Welcome back, ${res.data.user.name}! 👋`)

      return { success: true, user: res.data.user } // ✅ FIXED
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed'
      toast.error(msg)
      return { success: false, message: msg }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post('/auth/logout')
      setUser(null)
      toast.success('Logged out successfully')
      return { success: true }
    } catch {
      toast.error('Logout failed')
      return { success: false }
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        register,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

export default AuthContext
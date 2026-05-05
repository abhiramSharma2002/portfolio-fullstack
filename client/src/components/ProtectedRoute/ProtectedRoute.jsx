import { Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence }        from 'framer-motion'
import { useAuth }                from '../../context/AuthContext'
import Loader                     from '../Loader/Loader'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location                     = useLocation()

  // ── Auth check chal raha hai ──
  if (loading) {
    return (
      <AnimatePresence>
        <Loader fullScreen text="Checking session..." />
      </AnimatePresence>
    )
  }

  // ── Login nahi hai — redirect to login ──
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}   // login ke baad wapas yahan aayega
        replace
      />
    )
  }

  // ── Authenticated — render children ──
  return children
}

export default ProtectedRoute
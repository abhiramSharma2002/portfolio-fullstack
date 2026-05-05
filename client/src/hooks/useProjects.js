import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'

// ── Projects ──
export const useProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    axiosInstance.get('/projects')
      .then(res => setProjects(res.data.projects))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { projects, loading, error }
}

// ── Skills ──
export const useSkills = () => {
  const [skills,  setSkills]  = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    axiosInstance.get('/skills')
      .then(res => setSkills(res.data.skills))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { skills, loading, error }
}

// ── Experience ──
export const useExperience = () => {
  const [experience, setExperience] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)

  useEffect(() => {
    axiosInstance.get('/experience')
      .then(res => setExperience(res.data.experience))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { experience, loading, error }
}
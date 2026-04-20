import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import Navbar from './components/ui/Navbar'
import Home from './pages/Home'
import Professor from './pages/Professor'
import Course from './pages/Course'
import Login from './pages/Login'

function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) return <div>Loading...</div>
  if (!session) return <Navigate to="/login" />

  return children
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/professor/:id" element={<ProtectedRoute><Professor /></ProtectedRoute>} />
        <Route path="/course/:id" element={<ProtectedRoute><Course /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
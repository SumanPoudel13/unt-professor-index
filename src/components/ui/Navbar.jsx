import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../../supabase'

function Navbar() {
  const [session, setSession] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <nav className="bg-[#00853E] text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-xl font-bold tracking-tight">
        UNT Grades
      </Link>
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-green-200 transition-colors">
          Home
        </Link>
        {session ? (
          <button
            onClick={handleLogout}
            className="bg-white text-[#00853E] px-4 py-1.5 rounded-full font-semibold hover:bg-green-100 transition-colors"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="bg-white text-[#00853E] px-4 py-1.5 rounded-full font-semibold hover:bg-green-100 transition-colors">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
import { useState } from 'react'

function Home() {
  const [tab, setTab] = useState('professor')
  const [search, setSearch] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!search) return
    
    setLoading(true)
    setResults(null) // Clear old results while searching

    try {
      // 1. Fetch from your Next.js backend (Port 3002)
      const response = await fetch(`http://localhost:3002/api/search?name=${search}`)
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`)
      }

      const data = await response.json()
      
      // 2. Store the raw JSON object in our state
      setResults(data)
    } catch (error) {
      console.error("Connection failed:", error)
      setResults({ error: "Could not connect to the backend. Is it running on port 3002?" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <div className="bg-[#00853E] text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-3">UNT Grade Explorer</h1>
        <p className="text-green-100 text-lg mb-8">
          Find grade distributions for UNT professors and courses
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setTab('professor')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              tab === 'professor'
                ? 'bg-white text-[#00853E]'
                : 'bg-green-700 text-white hover:bg-green-600'
            }`}
          >
            Professor
          </button>
          <button
            onClick={() => setTab('course')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              tab === 'course'
                ? 'bg-white text-[#00853E]'
                : 'bg-green-700 text-white hover:bg-green-600'
            }`}
          >
            Course
          </button>
        </div>

        {/* Search Bar - Wrapped in a form so 'Enter' works */}
        <form onSubmit={handleSearch} className="flex justify-center">
          <div className="flex w-full max-w-xl shadow-lg rounded-full overflow-hidden">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                tab === 'professor'
                  ? 'Search by professor name...'
                  : 'Search by course name or code...'
              }
              className="flex-1 px-6 py-4 text-gray-800 outline-none text-base bg-gray-50"
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 transition-colors disabled:bg-gray-400"
            >
              {loading ? '...' : 'Search'}
            </button>
          </div>
        </form>
      </div>

      {/* Results Area - This shows the JSON */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {results ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-4 border-b pb-2 border-gray-100">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Raw JSON Response
              </h2>
              <button 
                onClick={() => setResults(null)}
                className="text-xs text-red-500 hover:underline"
              >
                Clear Data
              </button>
            </div>
            
            {/* Dark code block for the JSON data */}
            <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl overflow-hidden border border-gray-800">
              <pre className="text-blue-300 font-mono text-sm overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              {loading 
                ? 'Fetching latest data from Neon...' 
                : `Enter a ${tab} name above to view the database record.`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
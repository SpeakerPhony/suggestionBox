// src/components/SuggestionFeed.jsx
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import dayjs from 'dayjs' // Optional: for prettier dates

export default function SuggestionFeed() {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSuggestions = async () => {
      const { data, error } = await supabase
        .from('suggestions')
        .select('*')
        .eq('status', 'approved')
        .order('timestamp', { ascending: false })

      if (error) {
        console.error('Error fetching approved suggestions:', error)
      } else {
        setSuggestions(data)
      }

      setLoading(false)
    }

    fetchSuggestions()
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-4">
      <h2 className="text-xl font-bold mb-4">See what other students want...</h2>

      {loading && <p className="text-gray-500">Loading suggestions...</p>}

      {!loading && suggestions.length === 0 && (
        <p className="text-gray-500">No approved suggestions yet.</p>
      )}

      {suggestions.map((item) => (
        <div key={item.id} className="p-4 bg-white shadow rounded-md">
          <p className="text-gray-800 mb-2 whitespace-pre-wrap">{item.suggestion}</p>
          <div className="text-sm text-gray-500 flex justify-between">
            <span>{item.name || 'Anonymous'}</span>
            <span>{dayjs(item.timestamp).format('MMM D, YYYY h:mm A')}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

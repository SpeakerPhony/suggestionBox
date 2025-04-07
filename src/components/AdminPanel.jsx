// src/components/AdminPanel.jsx
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function AdminPanel() {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch all suggestions with status 'pending'
// src/components/AdminPanel.jsx
useEffect(() => {
    const fetchSuggestions = async () => {
        const { data, error } = await supabase
          .from('suggestions')
          .select('*')
          .in('status', ['pending']) 
          .order('timestamp', { ascending: false })
      
        if (error) {
          console.error('Error fetching suggestions:', error)
        } else {
          console.log('Fetched suggestions:', data)  // Debugging log
          setSuggestions(data)
        }
      
        setLoading(false)
      }
      
  
    fetchSuggestions()
  }, [])
  

  // Approve or Reject suggestion
  const handleStatusChange = async (id, newStatus) => {
    const { data, error } = await supabase
      .from('suggestions')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      console.error('Error updating status:', error)
    } else {
      // Update local state to reflect the change
      setSuggestions((prevSuggestions) =>
        prevSuggestions.map((item) =>
          item.status === id ? { ...item, status: newStatus } : item
        )
      )
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel - Approve or Reject Suggestions</h2>

      {loading && <p className="text-gray-500">Loading suggestions...</p>}

      {!loading && suggestions.length === 0 && (
        <p className="text-gray-500">No suggestions to review.</p>
      )}

      {suggestions.map((item) => (
        <div key={item.id} className="p-4 bg-white shadow rounded-md">
          <p className="text-gray-800 mb-2 whitespace-pre-wrap">{item.suggestion}</p>
          <div className="text-sm text-gray-500 flex justify-between">
            <span>{item.name || 'Anonymous'}</span>
            <span>{new Date(item.timestamp).toLocaleString()}</span>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handleStatusChange(item.id, 'approved')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Approve
            </button>
            <button
              onClick={() => handleStatusChange(item.id, 'rejected')}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

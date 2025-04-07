// src/components/SuggestionForm.jsx
import { useState } from 'react'
import { supabase } from './supabaseClient' // make sure this is set up

export default function SuggestionForm() {
  const [name, setName] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!suggestion.trim()) {
      setMessage({ type: 'error', text: 'Suggestion cannot be empty.' })
      return
    }
    if (!name.trim()) {
      setMessage({ type: 'error', text: 'Please provide a name to be associated with the suggestion' })
      return
    }
    setIsSubmitting(true)
    setMessage(null)

    const { data, error } = await supabase.from('suggestions').insert([
      {
        name: name.trim() || null, 
        suggestion: suggestion.trim(),
        status: 'pending',
      },
    ])

    if (error) {
      setMessage({ type: 'error', text: 'Failed to submit suggestion. Try again later.' })
      console.error('Supabase error:', error)
    } else {
      setMessage({ type: 'success', text: 'Suggestion submitted! Suggestions will be reviewed within 24 hours. Check back then! 😊' })
      setName('')
      setSuggestion('')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Submit a Suggestion</h2>
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Please summarize your suggestion for what ASB should do..."
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          rows={5}
          className="border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

// src/components/AuthForm.jsx
import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function AuthForm({ onAuthSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignIn = async (e) => {
    e.preventDefault()

    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      onAuthSuccess(user) // Trigger parent callback
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded mt-4 hover:bg-blue-600">Sign In</button>
      </form>
    </div>
  )
}

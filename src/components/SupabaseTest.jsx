// src/components/SupabaseTest.jsx
import { useEffect } from 'react'
import { supabase } from '../supabaseClient'

export default function SupabaseTest() {
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.from('suggestions').select('*')

      if (error) {
        console.error('❌ Supabase connection error:', error)
      } else {
        console.log('✅ Supabase connected! Fetched data:', data)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4 bg-yellow-100 rounded-md">
      <p className="text-yellow-800 font-semibold">Check the console for Supabase test results.</p>
    </div>
  )
}

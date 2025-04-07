// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Replace these with your actual project details from Supabase
const supabaseUrl = 'https://tmakgyscqjugxykjdaos.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYWtneXNjcWp1Z3h5a2pkYW9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MDk4NjksImV4cCI6MjA1OTQ4NTg2OX0.li1YqoY1-E619dIwdgOpHYZpM5dYZN7HGOS4rUQ1wXU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ewymlyjyjrtmztzlnywz.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3eW1seWp5anJ0bXp0emxueXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5MjkzMzYsImV4cCI6MjA5NzUwNTMzNn0.tvH8csqJjK9duJh7Z3JskUTQ6dSvOVZ48NONxRJlMPo'

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseKey)
}
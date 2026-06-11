import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mqodfbrqdsmotpyjwxtp.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xb2RmYnJxZHNtb3RweWp3eHRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NzAxNTAsImV4cCI6MjA4OTU0NjE1MH0.yPzs4VF-800xOkKmYzWRgkNlKbM9QnzH2GDMtOhl6cY'

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseKey)
}
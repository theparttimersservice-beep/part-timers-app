'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const supabase = createClient()
  const router = useRouter()

  async function sendOTP() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setMsg('ଭୁଲ ହେଲା — ' + error.message)
    else { setStep('otp'); setMsg('OTP ପଠାଗଲା! ✅') }
    setLoading(false)
  }

  async function verifyOTP() {
    setLoading(true)
    const { error } = await supabase.auth.verifyOtp({
      email, token: otp, type: 'email'
    })
    if (error) setMsg('OTP ଭୁଲ — ' + error.message)
    else router.push('/')
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#F1F8E9', padding: '20px'
    }}>
      <div style={{
        background: 'white', borderRadius: '20px', padding: '32px',
        width: '100%', maxWidth: '400px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '48px' }}>🌾</div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1B5E20', margin: '8px 0 4px' }}>
            The Part-Timers
          </h1>
          <p style={{ color: '#5D5D5D', fontSize: '14px' }}>
            ଗ୍ରାମୀଣ ସେବା ମଞ୍ଚ — Rural Services Platform
          </p>
        </div>

        {step === 'email' ? (
          <>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }}>
              ଇମେଲ — Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="aapana@email.com"
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '12px',
                border: '1.5px solid #E0E0E0', fontSize: '16px',
                marginTop: '6px', marginBottom: '16px', boxSizing: 'border-box'
              }}
            />
            <button
              onClick={sendOTP}
              disabled={loading || !email}
              style={{
                width: '100%', padding: '14px', borderRadius: '12px',
                background: '#2E7D32', color: 'white', border: 'none',
                fontSize: '16px', fontWeight: 700, cursor: 'pointer'
              }}
            >
              {loading ? 'ପଠାଉଛି...' : 'OTP ପଠାନ୍ତୁ →'}
            </button>
          </>
        ) : (
          <>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }}>
              OTP — ଆପଣଙ୍କ ଇମେଲକୁ ଆସିଛି
            </label>
            <input
              type="text"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              placeholder="000000"
              maxLength={6}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '12px',
                border: '1.5px solid #E0E0E0', fontSize: '24px', letterSpacing: '8px',
                textAlign: 'center', marginTop: '6px', marginBottom: '16px',
                boxSizing: 'border-box'
              }}
            />
            <button
              onClick={verifyOTP}
              disabled={loading || otp.length < 6}
              style={{
                width: '100%', padding: '14px', borderRadius: '12px',
                background: '#2E7D32', color: 'white', border: 'none',
                fontSize: '16px', fontWeight: 700, cursor: 'pointer'
              }}
            >
              {loading ? 'ଯାଞ୍ଚ କରୁଛି...' : 'ଲଗଇନ କରନ୍ତୁ ✓'}
            </button>
            <button
              onClick={() => setStep('email')}
              style={{
                width: '100%', padding: '10px', marginTop: '8px',
                background: 'none', border: 'none', color: '#2E7D32',
                fontSize: '14px', cursor: 'pointer'
              }}
            >
              ← ଫେରନ୍ତୁ
            </button>
          </>
        )}

        {msg && (
          <p style={{
            marginTop: '12px', textAlign: 'center', fontSize: '13px',
            color: msg.includes('✅') ? '#2E7D32' : '#C62828'
          }}>
            {msg}
          </p>
        )}
      </div>
    </div>
  )
}
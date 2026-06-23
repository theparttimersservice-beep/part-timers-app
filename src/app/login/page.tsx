'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Step = 'welcome' | 'login' | 'register'
type UserType = 'customer' | 'worker' | 'vendor' | 'vehicle' | ''

export default function LoginPage() {
  const [step, setStep] = useState<Step>('welcome')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [district, setDistrict] = useState('')
  const [village, setVillage] = useState('')
  const [userType, setUserType] = useState<UserType>('')
  const [skill, setSkill] = useState('')
  const [rate, setRate] = useState('')
  const [exp, setExp] = useState('')
  const [shop, setShop] = useState('')
  const [biz, setBiz] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const supabase = createClient()
  const router = useRouter()

  const districts = ['Khurda','Cuttack','Puri','Ganjam','Balasore','Mayurbhanj','Kendrapara','Jagatsinghpur','Jajpur','Bhadrak','Nayagarh','Bargarh','Koraput','Sundargarh','Sambalpur','Angul','Dhenkanal','Keonjhar']

  async function doRegister() {
    if (!name || !email || !district || !userType) return setMsg('ସବୁ ଭରନ୍ତୁ — Fill all fields')
    setLoading(true); setMsg('')
    try {
      // Save to users table directly (no auth)
      const { error } = await supabase.from('users').insert({
        name,
        email,
        phone: phone || null,
        district,
        village: village || null,
        type: userType,
        skill: skill || null,
        rate: rate || null,
        experience: exp || null,
        shop_name: shop || null,
        business_type: biz || null,
        status: 'active',
        plan: 'free',
      })
      if (error) {
        // If already exists, just go home
        if (error.code === '23505') {
          setMsg('ଇମେଲ ପୂର୍ବରୁ ଅଛି — Email exists, going to home...')
          setTimeout(() => router.push('/'), 1000)
        } else {
          setMsg('ଭୁଲ: ' + error.message)
        }
      } else {
        // Save to localStorage for session
        localStorage.setItem('pt_user', JSON.stringify({ name, email, type: userType, district, village }))
        router.push('/')
      }
    } catch (e: any) {
      setMsg('ଭୁଲ: ' + e.message)
    }
    setLoading(false)
  }

  async function doLogin() {
    if (!email) return setMsg('ଇମେଲ ଲିଖନ୍ତୁ — Enter email')
    setLoading(true); setMsg('')
    try {
      const { data, error } = await supabase.from('users').select('*').eq('email', email).single()
      if (error || !data) {
        setMsg('ଇମେଲ ମିଳିଲା ନାହିଁ — Email not found. Please register.')
      } else {
        localStorage.setItem('pt_user', JSON.stringify(data))
        router.push('/')
      }
    } catch (e: any) {
      setMsg('ଭୁଲ: ' + e.message)
    }
    setLoading(false)
  }

  return (
    <div className="auth-wrap" style={{ minHeight: '100vh' }}>

      {/* WELCOME */}
      {step === 'welcome' && (
        <div style={{ maxWidth: 400, width: '100%', margin: 'auto', padding: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ width: 88, height: 88, background: 'linear-gradient(135deg,#FF6B00,#D4A017)', borderRadius: 22, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem', marginBottom: 18, boxShadow: '0 12px 36px rgba(255,107,0,.4)' }}>🌾</div>
            <h1 style={{ fontFamily: "'Tiro Oriya', serif", fontSize: '2rem', color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,.2)', display: 'block' }}>ଦ ପାର୍ଟ-ଟାଇମର୍ସ</h1>
            <p style={{ color: 'rgba(255,255,255,.85)', marginTop: 5, fontSize: '.95rem' }}>ଗ୍ରାମୀଣ ଓଡ଼ିଶା ଶକ୍ତି</p>
            <p style={{ color: 'rgba(255,255,255,.65)', marginTop: 3, fontSize: '.8rem' }}>Empowering Rural Odisha, One Job at a Time</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
            <div onClick={() => setStep('register')} style={{ background: '#fff', borderRadius: 17, padding: '22px 14px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,.15)' }}>
              <div style={{ fontSize: '2.3rem', marginBottom: 7 }}>🆕</div>
              <div style={{ fontWeight: 800, fontSize: '.9rem' }}>ନୂତନ ଉପଯୋଗ</div>
              <div style={{ fontSize: '.72rem', color: '#888', marginTop: 2 }}>New User</div>
            </div>
            <div onClick={() => setStep('login')} style={{ background: 'rgba(255,255,255,.15)', border: '2px solid rgba(255,255,255,.3)', borderRadius: 17, padding: '22px 14px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: '2.3rem', marginBottom: 7 }}>🔑</div>
              <div style={{ fontWeight: 800, fontSize: '.9rem', color: '#fff' }}>ଲଗ ଇନ୍</div>
              <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.7)', marginTop: 2 }}>Login</div>
            </div>
          </div>

          <Link href="/" style={{ display: 'block', textAlign: 'center', background: 'rgba(255,255,255,.1)', border: '2px solid rgba(255,255,255,.3)', color: '#fff', padding: '10px 22px', borderRadius: 12, fontWeight: 700, fontSize: '.85rem', textDecoration: 'none' }}>
            🎯 ଡେମୋ ଦେଖନ୍ତୁ — Browse App
          </Link>
        </div>
      )}

      {/* LOGIN */}
      {step === 'login' && (
        <div className="auth-card">
          <div className="logo-wrap">
            <div className="logo-icon">🌾</div>
            <h2>ଦ ପାର୍ଟ-ଟାଇମର୍ସ</h2>
            <p>ଲଗ ଇନ୍ | Sign In</p>
          </div>
          <div className="fg">
            <label>ଇମେଲ <span>/ Email Address</span></label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
          </div>
          <button className="btn btn-p" onClick={doLogin} disabled={loading}>
            {loading ? 'ଯାଞ୍ଚ କରୁଛି...' : '🔑 ଲଗ ଇନ୍ | Login'}
          </button>
          {msg && <p style={{ color: '#FF4444', fontSize: '.82rem', marginTop: 8, textAlign: 'center' }}>{msg}</p>}
          <p style={{ textAlign: 'center', marginTop: 14, fontSize: '.82rem', color: 'var(--muted)' }}>
            ନୂତନ? <span onClick={() => setStep('register')} style={{ color: 'var(--saffron)', fontWeight: 700, cursor: 'pointer' }}>ଯୋଗ ଦିଅନ୍ତୁ →</span>
          </p>
          <p style={{ textAlign: 'center', marginTop: 8, fontSize: '.78rem' }}>
            <span onClick={() => setStep('welcome')} style={{ color: 'var(--muted)', cursor: 'pointer' }}>← Back</span>
          </p>
        </div>
      )}

      {/* REGISTER */}
      {step === 'register' && (
        <div style={{ width: '100%', maxWidth: 400, margin: 'auto' }}>
          <div style={{ padding: '18px 18px 0', display: 'flex', alignItems: 'center', gap: 11 }}>
            <button onClick={() => setStep('welcome')} style={{ background: 'rgba(255,255,255,.2)', border: 'none', color: '#fff', width: 34, height: 34, borderRadius: 9, cursor: 'pointer', fontSize: '1.05rem' }}>←</button>
            <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '.97rem' }}>ଯୋଗ ଦିଅନ୍ତୁ | Register</h3>
          </div>
          <div className="auth-card" style={{ margin: 14 }}>
            <p style={{ fontSize: '.82rem', color: 'var(--muted)', marginBottom: 14 }}>ଆପଣ କିଏ? | Who are you?</p>
            <div className="ut-grid">
              {[
                { type: 'customer', icon: '👤', odia: 'ଗ୍ରାହକ', en: 'Customer' },
                { type: 'worker', icon: '👷', odia: 'କର୍ମୀ', en: 'Worker/Helper' },
                { type: 'vendor', icon: '🏪', odia: 'ବିକ୍ରେତା', en: 'Vendor/Seller' },
                { type: 'vehicle', icon: '🚜', odia: 'ଯାନ ମାଲିକ', en: 'Vehicle Owner' },
              ].map(u => (
                <div key={u.type} className={`ut-card ${userType === u.type ? 'sel' : ''}`} onClick={() => setUserType(u.type as UserType)}>
                  <div className="ui">{u.icon}</div>
                  <div className="un">{u.odia}</div>
                  <div className="us">{u.en}</div>
                </div>
              ))}
            </div>

            {userType && (
              <>
                <div className="fg"><label>ପୂରା ନାମ <span>/ Full Name</span></label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" /></div>
                <div className="fg"><label>ଇମେଲ <span>/ Email</span></label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" /></div>
                <div className="fg"><label>ମୋବାଇଲ <span>/ Mobile (optional)</span></label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="10-digit mobile" /></div>
                <div className="fg">
                  <label>ଜିଲ୍ଲା <span>/ District</span></label>
                  <select value={district} onChange={e => setDistrict(e.target.value)}>
                    <option value="">ଜିଲ୍ଲା ଚୁଣନ୍ତୁ</option>
                    {districts.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="fg"><label>ଗ୍ରାମ <span>/ Village</span></label><input type="text" value={village} onChange={e => setVillage(e.target.value)} placeholder="Your village name" /></div>

                {userType === 'worker' && (
                  <>
                    <div className="fg">
                      <label>ଦକ୍ଷତା <span>/ Skill</span></label>
                      <select value={skill} onChange={e => setSkill(e.target.value)}>
                        <option value="">Select skill</option>
                        <option>ଶସ୍ୟ ଚାଷ / Crop Farming</option>
                        <option>ମତ୍ସ୍ୟ ଚାଷ / Fish & Aqua</option>
                        <option>ମୁର୍ଗୀ ପାଳନ / Poultry</option>
                        <option>ନିର୍ମାଣ / Construction</option>
                        <option>ଇଲେକ୍ଟ୍ରିସିଆନ / Electrician</option>
                        <option>ଜଳ ସଂଯୋଗ / Plumber</option>
                        <option>ଟ୍ରାକ୍ଟର / Tractor Driver</option>
                        <option>ଫଟୋ / Photo-Video</option>
                        <option>ଶିକ୍ଷା / Tuition</option>
                        <option>ଡ୍ରାଇଭର / Driver</option>
                        <option>ଅନ୍ୟ / Other</option>
                      </select>
                    </div>
                    <div className="fg"><label>ଦୈନିକ ମଜୁରି <span>/ Daily Rate (₹)</span></label><input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="e.g. 400" /></div>
                    <div className="fg"><label>ଅଭିଜ୍ଞତା <span>/ Experience (years)</span></label><input type="number" value={exp} onChange={e => setExp(e.target.value)} placeholder="e.g. 3" /></div>
                  </>
                )}

                {userType === 'vendor' && (
                  <>
                    <div className="fg"><label>ଦୋକାନ ନାମ <span>/ Shop Name</span></label><input type="text" value={shop} onChange={e => setShop(e.target.value)} placeholder="Your shop name" /></div>
                    <div className="fg">
                      <label>ବ୍ୟବସାୟ <span>/ Business Type</span></label>
                      <select value={biz} onChange={e => setBiz(e.target.value)}>
                        <option value="">Select type</option>
                        <option>ଖାଦ୍ୟ / Food Shop</option>
                        <option>ଚାଷ ଉପକରଣ / Agri Tools</option>
                        <option>ମତ୍ସ୍ୟ / Fish Shop</option>
                        <option>ଔଷଧ / Pharmacy</option>
                        <option>ଅନ୍ୟ / Other</option>
                      </select>
                    </div>
                  </>
                )}

                <button className="btn btn-p" onClick={doRegister} disabled={loading}>
                  {loading ? 'ସେଭ ହେଉଛି...' : '✅ ଯୋଗ ଦିଅନ୍ତୁ | Register'}
                </button>
                {msg && <p style={{ color: '#FF4444', fontSize: '.82rem', marginTop: 8, textAlign: 'center' }}>{msg}</p>}
                <p style={{ textAlign: 'center', marginTop: 12, fontSize: '.82rem', color: 'var(--muted)' }}>
                  ଆଗରୁ ଯୋଗ ଦେଇଛନ୍ତି? <span onClick={() => setStep('login')} style={{ color: 'var(--saffron)', fontWeight: 700, cursor: 'pointer' }}>Login →</span>
                </p>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
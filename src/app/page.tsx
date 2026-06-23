'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const CATEGORIES = [
  { icon: '🌾', cn: 'ଚାଷ', cor: 'Farming', slug: 'farming' },
  { icon: '🐟', cn: 'ମାଛ', cor: 'Fish & Aqua', slug: 'fish' },
  { icon: '🐔', cn: 'ପୋଲ୍ଟ୍ରି', cor: 'Poultry', slug: 'poultry' },
  { icon: '🪡', cn: 'SHG', cor: 'Women Groups', slug: 'shg' },
  { icon: '📚', cn: 'ଶିକ୍ଷା', cor: 'Tuition', slug: 'education' },
  { icon: '🔧', cn: 'ମିସ୍ତ୍ରି', cor: 'Repair', slug: 'repair' },
  { icon: '🚜', cn: 'ଟ୍ରାକ୍ଟର', cor: 'Tractor', slug: 'tractor' },
  { icon: '📷', cn: 'ଫଟୋ', cor: 'Photo/Video', slug: 'photo' },
  { icon: '🏗️', cn: 'ନିର୍ମାଣ', cor: 'Construction', slug: 'construction' },
  { icon: '🚗', cn: 'ଯାନ', cor: 'Transport', slug: 'transport' },
  { icon: '🍽️', cn: 'ଖାଦ୍ୟ', cor: 'Food', slug: 'food' },
  { icon: '⚡', cn: 'ଇଲେକ୍ଟ୍ରିକ', cor: 'Electrician', slug: 'electric' },
  { icon: '💧', cn: 'ଜଳ', cor: 'Plumber', slug: 'plumber' },
  { icon: '🎪', cn: 'ଟେଣ୍ଟ', cor: 'Tent & Events', slug: 'tent' },
  { icon: '🏥', cn: 'ଡାକ୍ତର', cor: 'Doctor/Health', slug: 'health' },
  { icon: '🛒', cn: 'ବଜାର', cor: 'Buy & Sell', slug: 'marketplace' },
  { icon: '🪣', cn: 'ହାଟ', cor: 'Weekly Haata', slug: 'haata' },
  { icon: '🎨', cn: 'ଚିତ୍ରକ', cor: 'Painter', slug: 'painter' },
  { icon: '🌿', cn: 'ଔଷଧ', cor: 'Pharmacy', slug: 'pharmacy' },
  { icon: '🤝', cn: 'ଅନ୍ୟ', cor: 'Other', slug: 'other' },
]

const WORKERS = [
  { icon: '🌾', name: 'Ramesh Behera', skill: 'ଶସ୍ୟ ଚାଷ', rate: '₹350/day', rating: '⭐ 4.9' },
  { icon: '🐟', name: 'Bijay Parida', skill: 'ମତ୍ସ୍ୟ ଚାଷ', rate: '₹400/day', rating: '⭐ 4.8' },
  { icon: '🔧', name: 'Sukant Sahoo', skill: 'ମିସ୍ତ୍ରି', rate: '₹450/day', rating: '⭐ 4.7' },
  { icon: '📷', name: 'Prafull Das', skill: 'ଫଟୋ/ଭିଡ଼ିଓ', rate: '₹1200/event', rating: '⭐ 5.0' },
  { icon: '🚜', name: 'Durga Nayak', skill: 'ଟ୍ରାକ୍ଟର', rate: '₹800/day', rating: '⭐ 4.6' },
]

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('home')
  const [toast, setToast] = useState('')
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user)
    })
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    setUser(null)
    showToast('ଲଗଆଉଟ ସଫଳ — Logged out!')
  }

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const filtered = CATEGORIES.filter(c =>
    search === '' || c.cn.includes(search) || c.cor.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app">

      {/* TOAST */}
      {toast && <div className="toast show">{toast}</div>}

      {/* HERO */}
      <div className="hero">
        <div className="hero-top">
          <div>
            <div className="hero-gr">ନମସ୍କାର 🙏 {user ? user.email?.split('@')[0] : 'ଅତିଥି'}</div>
            <div className="hero-nm" style={{ fontFamily: "'Tiro Oriya', serif" }}>ଦ ପାର୍ଟ-ଟାଇମର୍ସ</div>
          </div>
          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            <div className="loc-chip">📍 Odisha</div>
            {user ? (
              <button onClick={logout} style={{
                background: 'rgba(255,255,255,.2)', border: '1px solid rgba(255,255,255,.4)',
                color: '#fff', padding: '6px 12px', borderRadius: 20, fontSize: '.72rem',
                fontWeight: 700, cursor: 'pointer', fontFamily: "'Baloo 2', sans-serif"
              }}>ଲଗଆଉଟ</button>
            ) : (
              <Link href="/login" style={{
                background: 'rgba(255,255,255,.2)', border: '1px solid rgba(255,255,255,.4)',
                color: '#fff', padding: '6px 12px', borderRadius: 20, fontSize: '.72rem', fontWeight: 700,
                textDecoration: 'none'
              }}>ଲଗଇନ</Link>
            )}
          </div>
        </div>

        <div style={{ marginTop: 12, position: 'relative', zIndex: 1 }}>
          <div className="hsearch">
            <span style={{ fontSize: '1.1rem' }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ସେବା ଖୋଜନ୍ତୁ — Search services..."
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>✕</button>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 7, marginTop: 11, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          {['🌾 ଚାଷ', '🐟 ମାଛ', '🪡 SHG', '🚜 ଟ୍ରାକ୍ଟର', '🏥 ଡାକ୍ତର'].map(chip => (
            <button key={chip} onClick={() => setSearch(chip.split(' ')[1])} style={{
              background: 'rgba(255,255,255,.2)', border: '1px solid rgba(255,255,255,.3)',
              color: '#fff', padding: '5px 13px', borderRadius: 20, fontSize: '.73rem',
              fontWeight: 600, cursor: 'pointer', fontFamily: "'Baloo 2', sans-serif"
            }}>{chip}</button>
          ))}
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{ display: 'flex', background: '#1B5E20' }}>
        {[['55+', 'Workers'], ['20', 'ବର୍ଗ'], ['0%', 'Commission'], ['₹10', 'ଆରମ୍ଭ']].map(([n, l]) => (
          <div key={l} style={{ flex: 1, textAlign: 'center', padding: '8px 4px', borderRight: '1px solid rgba(255,255,255,.15)' }}>
            <div style={{ color: '#FFD54F', fontWeight: 800, fontSize: '1rem' }}>{n}</div>
            <div style={{ color: 'rgba(255,255,255,.75)', fontSize: '.6rem', fontWeight: 600 }}>{l}</div>
          </div>
        ))}
      </div>

      <div className="ca">

        {/* HAATA LIVE BANNER */}
        <div style={{ padding: '14px 14px 0' }}>
          <div className="hbanner">
            <div className="live-dot">🔴 LIVE</div>
            <h3>ଆଜିର ହାଟ ବଜାର</h3>
            <p>Kendrapara Haata • 12 vendors online • Today 6AM–2PM</p>
            <button style={{ marginTop: 10, background: '#fff', color: '#1B6B3A', border: 'none', borderRadius: 9, padding: '7px 16px', fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: '.8rem', cursor: 'pointer' }}>
              ହାଟ ଦେଖନ୍ତୁ →
            </button>
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="sec">
          <div className="sec-hd">
            <div className="sec-t">
              ସମସ୍ତ ସେବା
              <span>All Services • {filtered.length} categories</span>
            </div>
          </div>
          <div className="cat-grid">
            {filtered.map(cat => (
              <Link key={cat.slug} href={`/services/${cat.slug}`} style={{ textDecoration: 'none' }}>
                <div className="cc">
                  <div className="ci">{cat.icon}</div>
                  <div className="cn">{cat.cn}</div>
                  <div className="cor">{cat.cor}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FEATURED WORKERS */}
        <div className="sec" style={{ paddingTop: 0 }}>
          <div className="sec-hd">
            <div className="sec-t">
              ଉପଲବ୍ଧ କର୍ମୀ
              <span>Available Workers Near You</span>
            </div>
            <button className="see-all">ସବୁ ଦେଖ →</button>
          </div>
          <div className="hs">
            {WORKERS.map(w => (
              <div key={w.name} className="wc">
                <div className="wav">{w.icon}</div>
                <h4>{w.name}</h4>
                <div className="wsk">{w.skill}</div>
                <div className="wrt">{w.rating}</div>
                <div className="wpr">{w.rate}</div>
                <button
                  onClick={() => user ? showToast('ବୁକିଂ ଖୋଲୁଛି...') : router.push('/login')}
                  className="bb" style={{ marginTop: 9, padding: '7px 0', fontSize: '.72rem' }}>
                  ବୁକ କରନ୍ତୁ
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PROMO BANNER */}
        <div style={{ padding: '0 14px 14px' }}>
          <div className="pbanner">
            <div style={{ fontSize: '2.2rem' }}>🎉</div>
            <div>
              <h4>0% Commission!</h4>
              <p>ଆଜି ଯୋଗ ଦିଅନ୍ତୁ — Join FREE today</p>
              {!user && (
                <Link href="/login" style={{ display: 'inline-block', marginTop: 8, background: '#fff', color: '#1A6FA8', padding: '6px 16px', borderRadius: 20, fontWeight: 700, fontSize: '.78rem', textDecoration: 'none' }}>
                  ଯୋଗ ଦିଅନ୍ତୁ →
                </Link>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM NAV */}
      <nav className="bnav">
        {[
          { icon: '🏠', lb: 'ଘର', tab: 'home', href: '/' },
          { icon: '🔍', lb: 'ଖୋଜ', tab: 'search', href: '/search' },
          { icon: '📋', lb: 'ଅର୍ଡ଼ର', tab: 'orders', href: '/orders' },
          { icon: '🔔', lb: 'ଖବର', tab: 'notif', href: '/notifications' },
          { icon: '👤', lb: 'ପ୍ରୋଫାଇଲ', tab: 'profile', href: '/profile' },
        ].map(item => (
          <Link key={item.tab} href={item.href}
            className={`ni ${activeTab === item.tab ? 'on' : ''}`}
            onClick={() => setActiveTab(item.tab)}>
            <span className="ic">{item.icon}</span>
            <span className="lb">{item.lb}</span>
          </Link>
        ))}
      </nav>

    </div>
  )
}
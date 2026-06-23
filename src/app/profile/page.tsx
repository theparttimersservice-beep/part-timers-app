'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState('')
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('pt_user')
    if (!stored) { router.push('/login'); return }
    setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  function logout() {
    localStorage.removeItem('pt_user')
    router.push('/login')
  }

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  function getAvatar(type: string) {
    const map: Record<string, string> = { worker: '👷', vendor: '🏪', vehicle: '🚜', customer: '👤' }
    return map[type] || '👤'
  }

  function getRoleLabel(type: string) {
    const map: Record<string, string> = {
      worker: 'କର୍ମୀ | Worker',
      vendor: 'ବିକ୍ରେତା | Vendor',
      vehicle: 'ଯାନ ମାଲିକ | Vehicle Owner',
      customer: 'ଗ୍ରାହକ | Customer'
    }
    return map[type] || 'ଗ୍ରାହକ | Customer'
  }

  function getPTId(email: string) {
    return 'PT-' + email?.slice(0, 6)?.toUpperCase().replace(/[^A-Z0-9]/g, 'X') || '000000'
  }

  if (loading) {
    return (
      <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🌾</div>
          <div style={{ color: 'var(--muted)', fontSize: '.9rem' }}>ଲୋଡ଼ ହେଉଛି...</div>
        </div>
      </div>
    )
  }

  const name = user?.name || user?.email?.split('@')[0] || 'User'
  const type = user?.type || 'customer'
  const district = user?.district || 'Odisha'
  const village = user?.village || ''
  const ptId = getPTId(user?.email || '')

  return (
    <div className="app">

      {toast && <div className="toast show">{toast}</div>}

      {/* PROFILE HERO */}
      <div className="prof-hero">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, position: 'relative', zIndex: 1 }}>
          <Link href="/" style={{ background: 'rgba(255,255,255,.2)', color: '#fff', width: 32, height: 32, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '1rem' }}>←</Link>
          <button onClick={() => showToast('ଶୀଘ୍ର ଆସୁଛି — Edit coming soon!')}
            style={{ background: 'rgba(255,255,255,.2)', border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '6px 14px', borderRadius: 20, fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: '.78rem', cursor: 'pointer' }}>
            ✏️ Edit
          </button>
        </div>
        <div className="pav-wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="pav">{getAvatar(type)}</div>
          <div className="prof-info">
            <h2>{name}</h2>
            <p>{getRoleLabel(type)}</p>
            <div className="pbrow">
              <span className="pb">📍 {village ? `${village}, ` : ''}{district}</span>
              <span className="pb">Free Plan</span>
            </div>
          </div>
        </div>
      </div>

      {/* DIGITAL ID CARD */}
      <div className="did-card">
        <div className="did-hd">
          <span>THE PART-TIMER'S • DIGITAL ID</span>
          <span>✅ VERIFIED</span>
        </div>
        <div className="did-body">
          <div className="did-row">
            <div className="did-info">
              <div className="did-id">{ptId}</div>
              <h3>{name}</h3>
              <div className="did-role">{getRoleLabel(type)}</div>
              <div className="did-loc">📍 {village ? `${village}, ` : ''}{district}, Odisha</div>
            </div>
            <div style={{ width: 70, height: 70, background: 'var(--bg)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.55rem', color: 'var(--muted)', textAlign: 'center', border: '1px solid var(--border)', flexShrink: 0 }}>
              QR<br/>Code
            </div>
          </div>
          {user?.skill && (
            <div className="did-skills">
              {user.skill.split(',').map((s: string) => (
                <span key={s} className="dtag">{s.trim()}</span>
              ))}
            </div>
          )}
        </div>
        <div className="did-ft">
          <span className="ver">✅ Verified Member</span>
          <span className="rt">⭐ New Member</span>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-row">
        <div className="sb"><div className="sn">0</div><div className="sl">Jobs / Orders</div></div>
        <div className="sb"><div className="sn">—</div><div className="sl">Avg Rating</div></div>
        <div className="sb"><div className="sn">New</div><div className="sl">Member Since</div></div>
      </div>

      {/* VENDOR PLAN */}
      {type === 'vendor' && (
        <div style={{ padding: '0 15px 14px' }}>
          <div style={{ background: 'linear-gradient(135deg,var(--saffron),var(--gold))', borderRadius: 14, padding: 16 }}>
            <div style={{ color: 'rgba(255,255,255,.8)', fontSize: '.72rem', fontWeight: 700, letterSpacing: 1 }}>CURRENT PLAN</div>
            <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 800, marginTop: 4 }}>Free Plan</div>
            <div style={{ color: 'rgba(255,255,255,.85)', fontSize: '.77rem', marginTop: 3 }}>Basic listing • Local reach</div>
            <button onClick={() => showToast('Plan upgrade — ଶୀଘ୍ର ଆସୁଛି!')}
              style={{ marginTop: 11, background: '#fff', color: 'var(--saffron)', border: 'none', borderRadius: 8, padding: '7px 16px', fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '.78rem', cursor: 'pointer' }}>
              ⬆️ Upgrade Plan
            </button>
          </div>
        </div>
      )}

      {/* ACCOUNT MENU */}
      <div className="mg">
        <div className="mg-title">Account</div>
        <div className="mi" onClick={() => showToast('ଶୀଘ୍ର ଆସୁଛି!')}>
          <div className="mic">✏️</div>
          <div className="mit"><h4>Edit Profile</h4><p>ଆପଣଙ୍କ ତଥ୍ୟ ଅପଡ଼େଟ କରନ୍ତୁ</p></div>
          <div className="mia">›</div>
        </div>
        <Link href="/orders" style={{ textDecoration: 'none' }}>
          <div className="mi">
            <div className="mic">📋</div>
            <div className="mit"><h4>My Bookings & Orders</h4><p>ମୋ ସମସ୍ତ ଅର୍ଡ଼ର ଦେଖନ୍ତୁ</p></div>
            <div className="mia">›</div>
          </div>
        </Link>
        <div className="mi" onClick={() => showToast('Plan upgrade — ଶୀଘ୍ର ଆସୁଛି!')}>
          <div className="mic">💎</div>
          <div className="mit"><h4>Upgrade Plan</h4><p>ଅଧିକ ଦୃଶ୍ୟତା ପାଆନ୍ତୁ</p></div>
          <div className="mia">›</div>
        </div>
      </div>

      {/* SETTINGS MENU */}
      <div className="mg">
        <div className="mg-title">Settings</div>
        <div className="mi" onClick={() => showToast('ଭାଷା: Odia (Primary)')}>
          <div className="mic">🌐</div>
          <div className="mit"><h4>Language / ଭାଷା</h4><p>Odia (Primary)</p></div>
          <div className="mia">›</div>
        </div>
        <div className="mi" onClick={() => {
          if (navigator.share) navigator.share({ title: 'The Part-Timers', text: `${name} — ${ptId}`, url: window.location.href })
          else showToast('Profile link copied!')
        }}>
          <div className="mic">📤</div>
          <div className="mit"><h4>Share Digital ID</h4><p>ଆପଣଙ୍କ ପ୍ରୋଫାଇଲ ଶେୟାର କରନ୍ତୁ</p></div>
          <div className="mia">›</div>
        </div>
        <div className="mi" onClick={logout} style={{ border: '2px solid #FFE8E8' }}>
          <div className="mic">🚪</div>
          <div className="mit"><h4 style={{ color: '#FF4444' }}>Logout</h4><p>ଆକାଉଣ୍ଟ ଛାଡ଼ନ୍ତୁ</p></div>
          <div className="mia">›</div>
        </div>
      </div>

      <div style={{ height: 16 }} />

      {/* BOTTOM NAV */}
      <nav className="bnav">
        {[
          { icon: '🏠', lb: 'ଘର', href: '/' },
          { icon: '🔍', lb: 'ଖୋଜ', href: '/search' },
          { icon: '📋', lb: 'ଅର୍ଡ଼ର', href: '/orders' },
          { icon: '🔔', lb: 'ଖବର', href: '/notifications' },
          { icon: '👤', lb: 'ପ୍ରୋଫାଇଲ', href: '/profile' },
        ].map(item => (
          <Link key={item.href} href={item.href}
            className={`ni ${item.href === '/profile' ? 'on' : ''}`}
            style={{ textDecoration: 'none' }}>
            <span className="ic">{item.icon}</span>
            <span className="lb">{item.lb}</span>
          </Link>
        ))}
      </nav>

    </div>
  )
}
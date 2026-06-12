import Link from 'next/link'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh', background: '#F1F8E9',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* HEADER */}
      <header style={{
        background: '#2E7D32', padding: '16px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px' }}>🌾</span>
          <div>
            <div style={{ color: 'white', fontWeight: 800, fontSize: '16px' }}>
              The Part-Timers
            </div>
            <div style={{ color: '#A5D6A7', fontSize: '11px' }}>
              ଗ୍ରାମୀଣ ସେବା ମଞ୍ଚ
            </div>
          </div>
        </div>
        <Link href="/login" style={{
          background: 'white', color: '#2E7D32', padding: '8px 16px',
          borderRadius: '20px', fontWeight: 700, fontSize: '13px',
          textDecoration: 'none'
        }}>
          ଲଗଇନ — Login
        </Link>
      </header>

      {/* HERO */}
      <div style={{
        background: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
        padding: '40px 20px', textAlign: 'center', color: 'white'
      }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 8px' }}>
          ଗ୍ରାମୀଣ ସେବା ଖୋଜନ୍ତୁ
        </h1>
        <p style={{ fontSize: '14px', opacity: 0.9, margin: '0 0 24px' }}>
          Find Workers • Book Services • Sell Products
        </p>
        <div style={{
          display: 'flex', background: 'white', borderRadius: '12px',
          overflow: 'hidden', maxWidth: '400px', margin: '0 auto'
        }}>
          <input
            placeholder="ଚାଷ, ମାଛ, SHG, ଡାକ୍ତର..."
            style={{
              flex: 1, padding: '14px 16px', border: 'none',
              fontSize: '14px', outline: 'none'
            }}
          />
          <button style={{
            background: '#FF6F00', color: 'white', border: 'none',
            padding: '14px 20px', fontSize: '18px', cursor: 'pointer'
          }}>🔍</button>
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
          {['🌾 ଚାଷ', '🐟 ମାଛ', '🪡 SHG', '🏥 ଡାକ୍ତର', '🔧 ମିସ୍ତ୍ରି'].map(chip => (
            <span key={chip} style={{
              background: 'rgba(255,255,255,0.2)', color: 'white',
              padding: '6px 14px', borderRadius: '20px', fontSize: '12px',
              cursor: 'pointer'
            }}>{chip}</span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div style={{
        display: 'flex', background: '#1B5E20',
        padding: '12px 0', overflowX: 'auto'
      }}>
        {[
          { n: '55+', l: 'Workers' },
          { n: '20', l: 'ବର୍ଗ' },
          { n: '0%', l: 'Commission' },
          { n: '₹10', l: 'ଆରମ୍ଭ' },
        ].map(s => (
          <div key={s.l} style={{
            flex: 1, minWidth: '80px', textAlign: 'center',
            color: 'white', borderRight: '1px solid rgba(255,255,255,0.2)',
            padding: '4px 8px'
          }}>
            <div style={{ fontSize: '18px', fontWeight: 800 }}>{s.n}</div>
            <div style={{ fontSize: '10px', opacity: 0.8 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* CATEGORIES */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#1A1A1A', margin: 0 }}>
            ସମସ୍ତ ସେବା — All Services
          </h2>
          <span style={{ fontSize: '12px', color: '#2E7D32', fontWeight: 600 }}>20 ବର୍ଗ</span>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px'
        }}>
          {[
            { icon: '🌾', label: 'ଚାଷ', sub: 'Farming', color: '#388E3C' },
            { icon: '🐟', label: 'ମାଛ', sub: 'Fish', color: '#0277BD' },
            { icon: '🐓', label: 'ପୋଲ୍ଟ୍ରି', sub: 'Poultry', color: '#E65100' },
            { icon: '🪡', label: 'SHG', sub: 'Women', color: '#AD1457' },
            { icon: '📚', label: 'ଶିକ୍ଷା', sub: 'Tuition', color: '#4527A0' },
            { icon: '🔧', label: 'ମିସ୍ତ୍ରି', sub: 'Repair', color: '#006064' },
            { icon: '🚗', label: 'ଯାନ', sub: 'Transport', color: '#1565C0' },
            { icon: '🏗️', label: 'ଠିକା', sub: 'Contractor', color: '#4E342E' },
            { icon: '⚙️', label: 'ଯନ୍ତ୍ର', sub: 'Equipment', color: '#37474F' },
            { icon: '🍽️', label: 'ଖାଦ୍ୟ', sub: 'Food', color: '#BF360C' },
            { icon: '🛒', label: 'ବଜାର', sub: 'Marketplace', color: '#6A1B9A' },
            { icon: '🏪', label: 'ହାଟ', sub: 'Haata', color: '#FF6F00' },
          ].map(cat => (
            <div key={cat.label} style={{
              background: 'white', borderRadius: '12px', padding: '12px 8px',
              textAlign: 'center', cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: cat.color, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '22px', margin: '0 auto 6px'
              }}>{cat.icon}</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#1A1A1A' }}>{cat.label}</div>
              <div style={{ fontSize: '10px', color: '#9E9E9E' }}>{cat.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* JOIN BANNER */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #2E7D32, #4CAF50)',
          borderRadius: '16px', padding: '20px', color: 'white', textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎉</div>
          <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '4px' }}>
            0% Commission — ଶୂନ୍ୟ ଦଲାଲ!
          </div>
          <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '16px' }}>
            ଆଜି ଯୋଗ ଦିଅନ୍ତୁ — Join FREE today
          </div>
          <Link href="/login" style={{
            background: 'white', color: '#2E7D32', padding: '10px 24px',
            borderRadius: '20px', fontWeight: 700, fontSize: '14px',
            textDecoration: 'none', display: 'inline-block'
          }}>
            ଯୋଗ ଦିଅନ୍ତୁ →
          </Link>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'white', borderTop: '1px solid #E0E0E0',
        display: 'flex', padding: '8px 0'
      }}>
        {[
          { icon: '🏠', label: 'ଘର', href: '/' },
          { icon: '🔍', label: 'ଖୋଜ', href: '/search' },
          { icon: '🛒', label: 'ବଜାର', href: '/marketplace' },
          { icon: '📋', label: 'ଅର୍ଡର', href: '/orders' },
          { icon: '👤', label: 'ପ୍ରୋଫାଇଲ', href: '/profile' },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '2px', textDecoration: 'none'
          }}>
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            <span style={{ fontSize: '10px', color: '#5D5D5D', fontWeight: 600 }}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      <div style={{ height: '70px' }} />
    </div>
  )
}
import { useState } from 'react'

const TIER_STYLES = {
  classic: { badge: 'CLASSIC', badgeBg: '#9CA3AF', badgeColor: '#fff' },
  gold:    { badge: 'GOLD',    badgeBg: '#FFD100', badgeColor: '#1A1A1A' },
  platinum:{ badge: 'PLATINUM',badgeBg: '#E2E8F0', badgeColor: '#1A2B4A' },
}

export default function MemberCard({ name, memberNumber, tier = 'gold', memberSince, renewsYear, compact = false }) {
  const [revealed, setReveal] = useState(false)
  const lastFour = memberNumber?.slice(-4) ?? '0000'
  const masked = `●●●● ●●●● ${lastFour}`
  const { badge, badgeBg, badgeColor } = TIER_STYLES[tier] ?? TIER_STYLES.gold

  if (compact) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
        borderRadius: 12, padding: '10px 12px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#FFD100', textTransform: 'uppercase', letterSpacing: '0.1em' }}>RAA Member</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginTop: 2 }}>{name}</div>
        </div>
        <div style={{ background: badgeBg, borderRadius: 6, padding: '3px 7px', fontSize: 10, fontWeight: 800, color: badgeColor }}>{badge}</div>
      </div>
    )
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
      borderRadius: 16, padding: 20, position: 'relative', overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', right: -20, bottom: -20, width: 130, height: 130, borderRadius: 65, background: 'rgba(255,209,0,0.12)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 20, top: -10, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,209,0,0.08)', pointerEvents: 'none' }} />

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.10em', color: '#FFD100', textTransform: 'uppercase' }}>RAA Member</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 2 }}>{name}</div>
        </div>
        <div style={{ background: badgeBg, borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 800, color: badgeColor, flexShrink: 0 }}>{badge}</div>
      </div>

      {/* Member number */}
      <div style={{ fontSize: 12, color: '#9CA3AF', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Member Number</div>
      <div
        aria-label={`Membership number ending in ${lastFour}`}
        style={{ fontSize: 18, fontWeight: 600, color: '#fff', letterSpacing: '0.08em', fontVariantNumeric: 'tabular-nums' }}
      >
        {revealed ? memberNumber : masked}
      </div>
      <button
        onClick={() => setReveal(r => !r)}
        aria-label={revealed ? 'Hide membership number' : 'Reveal full membership number'}
        style={{ background: 'none', border: 'none', color: '#FFD100', fontSize: 11, cursor: 'pointer', padding: '4px 0', marginTop: 2 }}
      >
        {revealed ? 'Hide' : 'Tap to reveal'}
      </button>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
        {memberSince && (
          <div>
            <div style={{ fontSize: 11, color: '#9CA3AF' }}>Member since</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{memberSince}</div>
          </div>
        )}
        {renewsYear && (
          <div>
            <div style={{ fontSize: 11, color: '#9CA3AF' }}>Renews</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{renewsYear}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SavingsHeroBanner({ memberName, savings, subtitle, fillUps, stations }) {
  const hasSavings = savings > 0

  return (
    <div
      style={{
        background: '#FFD100',
        borderRadius: 16,
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Decorative circles */}
      <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: 60, background: 'rgba(255,255,255,0.15)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 10, top: 30, width: 70, height: 70, borderRadius: 35, background: 'rgba(255,255,255,0.20)', pointerEvents: 'none' }} />

      {/* Message label */}
      <div style={{ fontSize: 12, fontWeight: 700, color: '#7A4F00', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
        {memberName ? `${memberName}'s savings this year` : 'Your savings this year'}
      </div>

      {/* Amount */}
      <div
        aria-label={`$${savings} saved this year`}
        style={{ fontSize: 42, fontWeight: 800, color: '#1A1A1A', lineHeight: 1, marginBottom: 4 }}
      >
        ${savings}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div style={{ fontSize: 14, color: '#5A3600', marginBottom: hasSavings ? 14 : 0 }}>
          {subtitle}
        </div>
      )}

      {/* Stat chips */}
      {hasSavings && (
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          {fillUps != null && (
            <div style={{ background: 'rgba(0,0,0,0.10)', borderRadius: 10, padding: '6px 12px', fontSize: 12, fontWeight: 600, color: '#1A1A1A' }}>
              ⛽ {fillUps} fill-ups
            </div>
          )}
          {stations != null && (
            <div style={{ background: 'rgba(0,0,0,0.10)', borderRadius: 10, padding: '6px 12px', fontSize: 12, fontWeight: 600, color: '#1A1A1A' }}>
              📍 {stations} stations
            </div>
          )}
        </div>
      )}

      {/* No-data CTA */}
      {!hasSavings && (
        <div style={{ marginTop: 14 }}>
          <div style={{ background: 'rgba(0,0,0,0.10)', borderRadius: 10, padding: '8px 14px', fontSize: 13, fontWeight: 600, color: '#1A1A1A', display: 'inline-block' }}>
            Find cheap fuel near you →
          </div>
        </div>
      )}
    </div>
  )
}

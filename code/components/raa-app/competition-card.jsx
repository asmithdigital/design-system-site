export default function CompetitionCard({
  winLabel = 'Win Big',
  prize,
  mechanic,
  daysLeft,
  description,
  state = 'active',
  onEnter,
  onTCs,
}) {
  const entered = state === 'entered'
  const closed  = state === 'closed'

  return (
    <div style={{
      background: closed ? '#F4F5F7' : '#FFFFFF',
      borderRadius: 16,
      border: '1px solid #E5E7EB',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Header band */}
      <div style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #3D2B00 100%)',
        padding: '20px 16px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circle */}
        <div style={{ position: 'absolute', right: -15, top: -15, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,209,0,0.15)', pointerEvents: 'none' }} />

        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#FFD100', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
            {closed ? 'Competition Closed' : winLabel}
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1.15 }}>{prize}</div>
          {mechanic && (
            <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>{mechanic}</div>
          )}
        </div>

        {/* Countdown or result badge */}
        {!closed && daysLeft != null && (
          <div
            style={{ background: '#FFD100', borderRadius: 10, padding: '6px 10px', textAlign: 'center', flexShrink: 0 }}
            aria-label={`${daysLeft} days remaining`}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: '#1A1A1A', lineHeight: 1 }}>{daysLeft}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#7A4F00', textTransform: 'uppercase' }}>days left</div>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '14px 16px' }}>
        {description && (
          <p style={{ margin: '0 0 12px', fontSize: 13, color: '#6B7280', lineHeight: 1.4 }}>{description}</p>
        )}

        {/* CTA row */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={onEnter}
            disabled={closed || entered}
            aria-label={
              entered ? 'Competition entered' :
              closed  ? 'Competition closed'  :
              `Enter the ${prize} competition`
            }
            style={{
              flex: 1,
              background: closed ? '#E5E7EB' : entered ? '#0D9488' : '#FFD100',
              color: closed ? '#9CA3AF' : entered ? '#fff' : '#1A1A1A',
              borderRadius: 10,
              padding: '10px 20px',
              fontWeight: 700,
              fontSize: 14,
              border: 'none',
              cursor: closed || entered ? 'default' : 'pointer',
              textAlign: 'center',
            }}
          >
            {closed ? 'Competition Closed' : entered ? 'Entered ✓' : 'Enter Now'}
          </button>

          {onTCs && (
            <button
              onClick={onTCs}
              aria-label={`View terms and conditions for ${prize}`}
              style={{ border: '1px solid #E5E7EB', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#6B7280', background: '#fff', cursor: 'pointer' }}
            >
              T&amp;Cs
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

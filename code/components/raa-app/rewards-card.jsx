function StatusBadge({ status, points }) {
  if (status === 'active') {
    return (
      <div style={{ background: '#F0FDF4', color: '#16A34A', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 8 }}>
        Active
      </div>
    )
  }
  if (status === 'free') {
    return (
      <div style={{ background: '#FFD100', color: '#1A1A1A', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 8 }}>
        Free
      </div>
    )
  }
  return (
    <div style={{ fontSize: 12, fontWeight: 700, color: status === 'insufficient' ? '#9CA3AF' : '#0D9488' }}>
      {points} pts
    </div>
  )
}

export default function RewardsCard({ icon, title, partner, status = 'available', points, onClick }) {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={`${title} at ${partner}${status === 'active' ? ', active' : status === 'free' ? ', free' : status === 'insufficient' ? `, ${points} points needed` : `, ${points} points`}`}
      style={{
        background: status === 'insufficient' ? '#FAFAFA' : '#FFFFFF',
        borderRadius: 12,
        border: '1px solid #E5E7EB',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        cursor: onClick ? 'pointer' : 'default',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Icon */}
      <div style={{ width: 40, height: 40, borderRadius: 20, background: '#F5F5F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }} aria-hidden="true">
        {icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: status === 'insufficient' ? '#9CA3AF' : '#1A1A1A' }}>{title}</div>
        <div style={{ fontSize: 12, color: '#9CA3AF' }}>{partner}</div>
      </div>

      {/* Badge */}
      <div style={{ flexShrink: 0 }}>
        <StatusBadge status={status} points={points} />
      </div>
    </div>
  )
}

export function RewardsList({ points, rewards, onRedeem }) {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Points header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Your Points</div>
          <div
            aria-live="polite"
            aria-label={`Your points balance: ${points.toLocaleString()} points`}
            style={{ fontSize: 28, fontWeight: 800, color: '#1A1A1A', lineHeight: 1 }}
          >
            {points.toLocaleString()} <span style={{ fontSize: 14, fontWeight: 500, color: '#9CA3AF' }}>pts</span>
          </div>
        </div>
        {onRedeem && (
          <button onClick={onRedeem} style={{ background: '#FFD100', borderRadius: 10, padding: '8px 14px', fontSize: 13, fontWeight: 700, color: '#1A1A1A', border: 'none', cursor: 'pointer' }}>
            Redeem
          </button>
        )}
      </div>

      {/* Card list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rewards.map((r) => (
          <RewardsCard key={r.title} {...r} />
        ))}
      </div>
    </div>
  )
}

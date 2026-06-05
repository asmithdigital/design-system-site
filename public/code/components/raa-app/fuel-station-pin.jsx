export default function FuelStationPin({ price, cheapest, closed, selected, onClick }) {
  const bg = closed ? '#E5E7EB' : cheapest ? '#FFD100' : '#FFFFFF'
  const border = cheapest ? '2px solid #1A1A1A' : '1.5px solid #9CA3AF'
  const textColor = closed ? '#9CA3AF' : '#1A1A1A'
  const anchorColor = cheapest ? '#1A1A1A' : '#9CA3AF'

  return (
    <button
      onClick={onClick}
      aria-label={closed ? `Closed` : `${price} cents per litre${cheapest ? ', cheapest' : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        background: 'none',
        border: 'none',
        cursor: onClick ? 'pointer' : 'default',
        padding: 0,
        transform: cheapest ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      {/* Pin label */}
      <div style={{
        background: bg,
        border,
        borderRadius: 10,
        padding: '5px 10px',
        fontSize: 13,
        fontWeight: 700,
        color: textColor,
        boxShadow: cheapest ? '0 2px 8px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.08)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        whiteSpace: 'nowrap',
      }}>
        {closed ? '—' : `${price}¢`}
      </div>

      {/* Triangle anchor */}
      <div style={{
        width: 0, height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: `6px solid ${anchorColor}`,
      }} />
    </button>
  )
}

export function FuelStationListRow({ name, price, open, cheapest, distance, onClick }) {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={`${name}, ${price} cents per litre, ${open ? 'open' : 'closed'}, ${distance}${cheapest ? ', cheapest' : ''}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '11px 14px',
        background: '#fff',
        borderBottom: '1px solid #E5E7EB',
        cursor: onClick ? 'pointer' : 'default',
        gap: 8,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{name}</span>
          {cheapest && (
            <span style={{ fontSize: 10, fontWeight: 700, background: '#FFD100', color: '#1A1A1A', padding: '1px 6px', borderRadius: 6 }}>CHEAPEST</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
          <span style={{ fontSize: 12, color: open ? '#16A34A' : '#DC2626', fontWeight: 600 }}>{open ? 'Open' : 'Closed'}</span>
          <span style={{ fontSize: 12, color: '#9CA3AF' }}>{distance}</span>
        </div>
      </div>
      <span style={{ fontSize: 17, fontWeight: 800, color: '#1A1A1A', fontVariantNumeric: 'tabular-nums' }}>
        {price}¢
      </span>
    </div>
  )
}

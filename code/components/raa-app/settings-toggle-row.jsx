export function SettingsSectionHeader({ label }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
      textTransform: 'uppercase', color: '#9CA3AF',
      padding: '14px 16px 6px',
      background: '#F5F5F0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {label}
    </div>
  )
}

export default function SettingsToggleRow({ label, subtitle, value, onChange }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      minHeight: 52,
      background: '#FFFFFF',
      borderBottom: '1px solid #F5F5F0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Label area */}
      <div style={{ flex: 1, paddingRight: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 400, color: '#1A1A1A' }}>{label}</div>
        {subtitle && (
          <div style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>{subtitle}</div>
        )}
      </div>

      {/* Toggle */}
      <button
        role="switch"
        aria-checked={value}
        aria-label={label}
        onClick={() => onChange?.(!value)}
        style={{
          width: 48, height: 28,
          borderRadius: 14,
          background: value ? '#0D9488' : '#E5E7EB',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          flexShrink: 0,
          transition: 'background 0.2s ease',
          padding: 0,
        }}
      >
        <div style={{
          position: 'absolute',
          top: 3,
          left: value ? 23 : 3,
          width: 22, height: 22,
          borderRadius: 11,
          background: '#FFFFFF',
          boxShadow: '0 1px 3px rgba(0,0,0,0.20)',
          transition: 'left 0.2s ease',
        }} />
      </button>
    </div>
  )
}

export function SettingsGroup({ header, rows }) {
  return (
    <div style={{ background: '#F5F5F0' }}>
      {header && <SettingsSectionHeader label={header} />}
      <div style={{ borderRadius: '0 0 10px 10px', overflow: 'hidden', border: '1px solid #E5E7EB', borderTop: 'none' }}>
        {rows.map((row) => (
          <SettingsToggleRow key={row.label} {...row} />
        ))}
      </div>
    </div>
  )
}

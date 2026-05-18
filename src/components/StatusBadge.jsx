const styles = {
  stable: { background: '#e8f4f0', color: '#0a6b54', label: 'Stable' },
  draft: { background: '#fef9e7', color: '#7d6608', label: 'Draft' },
  deprecated: { background: '#fdeaea', color: '#8a2020', label: 'Deprecated' },
}

export default function StatusBadge({ status }) {
  const s = styles[status] || styles.stable
  return (
    <span style={{
      display: 'inline-block',
      background: s.background,
      color: s.color,
      fontSize: '11px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      padding: '3px 8px',
      borderRadius: '4px',
    }}>
      {s.label}
    </span>
  )
}

const styles = {
  stable:     { background: '#E3FCEF', color: '#006644', label: 'Stable' },
  draft:      { background: '#FFF0B3', color: '#5E4701', label: 'Draft' },
  deprecated: { background: '#FFEBE6', color: '#BF2600', label: 'Deprecated' },
}

export default function StatusBadge({ status }) {
  const s = styles[status] || styles.stable
  return (
    <span style={{
      display: 'inline-block',
      background: s.background,
      color: s.color,
      fontSize: '11px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      padding: '3px 8px',
      borderRadius: '3px',
    }}>
      {s.label}
    </span>
  )
}

export default function TokenSwatch({ name, value, usage }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #DFE1E6',
      borderRadius: 8,
      padding: '16px',
    }}>
      <div style={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        backgroundColor: value,
        border: '1px solid #DFE1E6',
        marginBottom: 10,
      }} />
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12.5,
        color: '#172B4D',
        marginBottom: 4,
      }}>
        {name}
      </div>
      <div style={{
        fontSize: 12,
        color: '#0052CC',
        marginBottom: 4,
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        {value}
      </div>
      <div style={{
        fontSize: 12,
        color: '#6B778C',
        lineHeight: 1.5,
      }}>
        {usage}
      </div>
    </div>
  )
}

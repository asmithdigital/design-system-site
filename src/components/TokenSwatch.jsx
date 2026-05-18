export default function TokenSwatch({ name, value, usage }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #ddd8c8',
      borderRadius: '10px',
      padding: '16px',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: value,
        border: '1px solid #ddd8c8',
        marginBottom: '10px',
      }} />
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '13px',
        color: '#0f1f3d',
        marginBottom: '4px',
      }}>
        {name}
      </div>
      <div style={{
        fontSize: '12px',
        color: '#72706a',
        marginBottom: '4px',
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '12px',
        color: '#72706a',
        lineHeight: '1.5',
      }}>
        {usage}
      </div>
    </div>
  )
}

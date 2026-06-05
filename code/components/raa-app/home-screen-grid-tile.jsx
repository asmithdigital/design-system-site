import { useState } from 'react'

const TILE_VARIANTS = {
  default: { background: '#F5F5F0', color: '#1A1A1A' },
  highlight: { background: '#FFD100', color: '#1A1A1A' },
  dark: { background: '#1A1A1A', color: '#FFFFFF' },
}

export default function HomeScreenGridTile({ icon, label, variant = 'default', onClick }) {
  const [pressed, setPressed] = useState(false)
  const { background, color } = TILE_VARIANTS[variant] ?? TILE_VARIANTS.default

  return (
    <button
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      aria-label={label}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background,
        borderRadius: 14,
        padding: '14px 8px 10px',
        gap: 6,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: 'none',
        cursor: 'pointer',
        minHeight: 80,
        transform: pressed ? 'scale(0.94)' : 'scale(1)',
        transition: 'transform 100ms ease-out',
        width: '100%',
      }}
    >
      <span style={{ fontSize: 28, lineHeight: 1 }} aria-hidden="true">{icon}</span>
      <span style={{ fontSize: 11, fontWeight: 600, color, textAlign: 'center', lineHeight: 1.2, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {label}
      </span>
    </button>
  )
}

// Example usage
export function HomeScreenGrid() {
  const tiles = [
    { icon: '⛽', label: 'Fuel Prices', variant: 'highlight' },
    { icon: '🗺️', label: 'Trip Planner', variant: 'dark' },
    { icon: '🛡️', label: 'Insurance', variant: 'default' },
    { icon: '🏆', label: 'Competitions', variant: 'default' },
    { icon: '💰', label: 'Savings', variant: 'default' },
    { icon: '👤', label: 'My Account', variant: 'default' },
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 10,
      padding: 16,
      background: '#F5F5F0',
      borderRadius: 12,
    }}>
      {tiles.map((t) => (
        <HomeScreenGridTile key={t.label} {...t} onClick={() => console.log(t.label)} />
      ))}
    </div>
  )
}

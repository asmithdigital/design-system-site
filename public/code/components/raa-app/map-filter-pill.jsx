// Single pill
export function MapFilterPill({ label, icon, selected, onClick }) {
  return (
    <button
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        height: 34,
        padding: '0 14px',
        borderRadius: 17,
        border: selected ? 'none' : '1px solid #E5E7EB',
        background: selected ? '#FFD100' : '#FFFFFF',
        color: '#1A1A1A',
        fontSize: 14,
        fontWeight: selected ? 700 : 500,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        cursor: 'pointer',
        boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
        flexShrink: 0,
        transition: 'background 0.1s, border 0.1s',
      }}
    >
      {selected && (
        <span style={{ color: '#0D9488', fontWeight: 800, fontSize: 12 }}>✓ </span>
      )}
      {icon && <span aria-hidden="true">{icon}</span>}
      {label}
    </button>
  )
}

// Pill row group
import { useState } from 'react'

export default function MapFilterPillGroup({ options, defaultSelected }) {
  const [selected, setSelected] = useState(defaultSelected ?? options[0]?.value)

  return (
    <div
      role="radiogroup"
      aria-label="Filter by"
      style={{
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        padding: '0 16px',
        scrollbarWidth: 'none',
      }}
    >
      {options.map((opt) => (
        <MapFilterPill
          key={opt.value}
          label={opt.label}
          icon={opt.icon}
          selected={selected === opt.value}
          onClick={() => setSelected(opt.value)}
        />
      ))}
    </div>
  )
}

// Example usage
export function FuelFilterPills() {
  return (
    <MapFilterPillGroup
      options={[
        { value: 'cheapest', label: 'Cheapest' },
        { value: 'nearest', label: 'Nearest' },
        { value: 'open', label: 'Open Now' },
        { value: 'bp', label: 'BP', icon: '⛽' },
        { value: 'shell', label: 'Shell', icon: '⛽' },
      ]}
      defaultSelected="cheapest"
    />
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import componentsData from '../../data/components.json'
import StatusBadge from '../components/StatusBadge.jsx'
import ComponentPreview from '../components/ComponentPreview.jsx'

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export function getComponentSlug(c) {
  return `${c.product}-${slugify(c.name)}`
}

const PRODUCT_BADGE = {
  'raa-web': { bg: '#FFFAE6', color: '#7A4F00', border: '#FFD100' },
  'taskly':  { bg: '#EAF0FF', color: '#0747A6', border: '#4C9AFF' },
}

const PRODUCT_LABELS = {
  'raa-web': 'RAA Web',
  'taskly': 'Taskly',
}

export default function ComponentsListPage() {
  const [activeProduct, setActiveProduct] = useState('all')

  const filtered = activeProduct === 'all'
    ? componentsData.components
    : componentsData.components.filter(c => c.product === activeProduct)

  const grouped = filtered.reduce((acc, c) => {
    if (!acc[c.category]) acc[c.category] = []
    acc[c.category].push(c)
    return acc
  }, {})

  const filterButtons = [
    { id: 'all', name: 'All' },
    ...componentsData.products,
  ]

  return (
    <div>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: '#172B4D', marginBottom: 8, lineHeight: 1.2 }}>
        Components
      </h1>
      <p style={{ fontSize: 15, color: '#6B778C', marginBottom: 28, lineHeight: 1.7 }}>
        UI components across the RAA Web and Taskly design systems.
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
        {filterButtons.map(p => {
          const active = activeProduct === p.id
          return (
            <button
              key={p.id}
              onClick={() => setActiveProduct(p.id)}
              style={{
                padding: '7px 16px',
                borderRadius: 4,
                border: `1px solid ${active ? '#0052CC' : '#DFE1E6'}`,
                background: active ? '#0052CC' : '#ffffff',
                color: active ? '#ffffff' : '#42526E',
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.1s',
              }}
            >
              {p.name}
            </button>
          )
        })}
      </div>

      {Object.entries(grouped).map(([category, comps]) => (
        <div key={category} style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 12, fontWeight: 700, color: '#6B778C', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {category}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 14,
          }}>
            {comps.map(c => {
              const badge = PRODUCT_BADGE[c.product]
              return (
                <Link
                  key={getComponentSlug(c)}
                  to={`/components/${getComponentSlug(c)}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      background: '#ffffff',
                      border: '1px solid #DFE1E6',
                      borderRadius: 8,
                      overflow: 'hidden',
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'box-shadow 0.15s, border-color 0.15s',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,82,204,0.1)'
                      e.currentTarget.style.borderColor = '#4C9AFF'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.borderColor = '#DFE1E6'
                    }}
                  >
                    <ComponentPreview component={c} thumbnail />
                    <div style={{ padding: '14px 16px', flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#172B4D', lineHeight: 1.3 }}>
                          {c.name}
                        </span>
                        <span style={{
                          flexShrink: 0,
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: 3,
                          background: badge.bg,
                          color: badge.color,
                          border: `1px solid ${badge.border}`,
                          whiteSpace: 'nowrap',
                        }}>
                          {PRODUCT_LABELS[c.product]}
                        </span>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <StatusBadge status={c.status} />
                      </div>
                      <p style={{ fontSize: 12, color: '#6B778C', lineHeight: 1.5, margin: 0 }}>
                        {c.description.length > 90 ? c.description.slice(0, 90) + '…' : c.description}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

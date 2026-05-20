import { useState } from 'react'
import { Link } from 'react-router-dom'
import componentsData from '../../data/components.json'
import StatusBadge from '../components/StatusBadge.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import ComponentPreview from '../components/ComponentPreview.jsx'

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export function getComponentSlug(c) {
  return `${c.product}-${slugify(c.name)}`
}

const PRODUCT_BADGE = {
  'raa-web': { bg: '#FFFBEB', color: '#92400E', border: '#FCD34D' },
  'taskly':  { bg: '#EEF4FF', color: '#1A2B4A', border: '#2B7DE9' },
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
      <Breadcrumb crumbs={[{ label: 'Components' }]} />
      <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#0f1f3d', marginBottom: '8px' }}>
        Components
      </h1>
      <p style={{ fontSize: '15px', color: '#72706a', marginBottom: '24px', lineHeight: '1.6' }}>
        UI components across the RAA Web and Taskly design systems.
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '36px', flexWrap: 'wrap' }}>
        {filterButtons.map(p => {
          const active = activeProduct === p.id
          return (
            <button
              key={p.id}
              onClick={() => setActiveProduct(p.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: active ? '#0a6b54' : '#ddd8c8',
                background: active ? '#0a6b54' : '#ffffff',
                color: active ? '#ffffff' : '#0f1f3d',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
                fontWeight: active ? '600' : '400',
                cursor: 'pointer',
              }}
            >
              {p.name}
            </button>
          )
        })}
      </div>

      {Object.entries(grouped).map(([category, comps]) => (
        <div key={category} style={{ marginBottom: '44px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#0f1f3d', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            {category}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '14px',
          }}>
            {comps.map(c => {
              const badge = PRODUCT_BADGE[c.product]
              return (
                <Link
                  key={getComponentSlug(c)}
                  to={`/components/${getComponentSlug(c)}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #ddd8c8',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    height: '100%',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.15s, border-color 0.15s',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                      e.currentTarget.style.borderColor = '#b8b4a8'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.borderColor = '#ddd8c8'
                    }}
                  >
                    <ComponentPreview component={c} thumbnail />
                    <div style={{ padding: '14px 16px', flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#0f1f3d', lineHeight: '1.3' }}>
                          {c.name}
                        </span>
                        <span style={{
                          flexShrink: 0,
                          fontSize: '11px',
                          fontWeight: '600',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: badge.bg,
                          color: badge.color,
                          border: `1px solid ${badge.border}`,
                          whiteSpace: 'nowrap',
                        }}>
                          {PRODUCT_LABELS[c.product]}
                        </span>
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <StatusBadge status={c.status} />
                      </div>
                      <p style={{ fontSize: '12px', color: '#72706a', lineHeight: '1.5', margin: 0 }}>
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

import { Link } from 'react-router-dom'
import patternsData from '../../data/patterns.json'

const PRODUCT_DOT = {
  'quote-to-buy': '#FFD100',
  'my-account': '#FF8B00',
  'renewals': '#36B37E',
  'claims': '#FF5630',
  'taskly': '#2B7DE9',
  'raa-public-site': '#6554C0',
}

const SCOPE_BADGE = {
  'cross-product': { bg: '#EAF0FF', color: '#0747A6', label: 'Cross-product' },
  'product-specific': { bg: '#F4F5F7', color: '#42526E', label: 'Product-specific' },
}

function ProductDots({ products }) {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      {products.map(p => (
        <span
          key={p}
          title={p.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
          style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: PRODUCT_DOT[p] || '#DFE1E6',
          }}
        />
      ))}
    </div>
  )
}

export default function PatternsListPage() {
  return (
    <div>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: '#172B4D', marginBottom: 12, lineHeight: 1.2 }}>
        Patterns
      </h1>
      <p style={{ fontSize: 16, color: '#6B778C', marginBottom: 40, lineHeight: 1.7 }}>
        Reusable interaction patterns documented with rules, product variants, and component references.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {patternsData.patterns.map(pattern => {
          const scopeBadge = SCOPE_BADGE[pattern.scope] || SCOPE_BADGE['product-specific']
          return (
            <Link
              key={pattern.id}
              to={`/patterns/${pattern.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #DFE1E6',
                  borderRadius: 8,
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.15s, border-color 0.15s',
                  height: '100%',
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
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: '#172B4D', lineHeight: 1.3 }}>{pattern.name}</h3>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 3,
                    background: scopeBadge.bg,
                    color: scopeBadge.color,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}>
                    {scopeBadge.label}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <ProductDots products={pattern.products} />
                  <span style={{ fontSize: 12, color: '#6B778C' }}>
                    {pattern.components.length} components
                  </span>
                </div>

                <p style={{ fontSize: 13, color: '#6B778C', lineHeight: 1.6, flex: 1, marginBottom: 14 }}>
                  {pattern.description.length > 120 ? pattern.description.slice(0, 120) + '…' : pattern.description}
                </p>

                <span style={{ fontSize: 13, color: '#0052CC', fontWeight: 500 }}>View pattern →</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

import { useParams, Link } from 'react-router-dom'
import patternsData from '../../data/patterns.json'
import componentsData from '../../data/components.json'

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function getComponentSlug(c) {
  return `${c.product}-${slugify(c.name)}`
}

function findComponent(name) {
  return componentsData.components.find(c => c.name === name)
}

const SCOPE_BADGE = {
  'cross-product': { bg: '#EAF0FF', color: '#0747A6', label: 'Cross-product' },
  'product-specific': { bg: '#F4F5F7', color: '#42526E', label: 'Product-specific' },
}

const TYPE_BADGE = {
  added:   { bg: '#E3FCEF', color: '#006644' },
  changed: { bg: '#EAF0FF', color: '#0747A6' },
  fixed:   { bg: '#FFF0B3', color: '#5E4701' },
  removed: { bg: '#FFEBE6', color: '#BF2600' },
}

const PRODUCT_LABELS = {
  'quote-to-buy': 'Quote to Buy',
  'my-account': 'My Account',
  'renewals': 'Renewals',
  'claims': 'Claims',
  'taskly': 'Taskly',
  'raa-public-site': 'RAA Public Site',
}

export default function PatternDetailPage() {
  const { id } = useParams()
  const pattern = patternsData.patterns.find(p => p.id === id)

  if (!pattern) {
    return (
      <div style={{ padding: '48px 0' }}>
        <p style={{ color: '#6B778C' }}>Pattern not found.</p>
      </div>
    )
  }

  const scopeBadge = SCOPE_BADGE[pattern.scope] || SCOPE_BADGE['product-specific']
  const changelog = [...(pattern.changelog || [])].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div>
      <nav style={{ fontSize: 13, color: '#6B778C', marginBottom: 20 }}>
        <Link to="/patterns" style={{ color: '#0052CC' }}>Patterns</Link>
        <span style={{ margin: '0 6px' }}>›</span>
        <span style={{ color: '#172B4D' }}>{pattern.name}</span>
      </nav>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#172B4D', lineHeight: 1.2, flex: 1 }}>
          {pattern.name}
        </h1>
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          padding: '4px 10px',
          borderRadius: 3,
          background: scopeBadge.bg,
          color: scopeBadge.color,
          flexShrink: 0,
          marginTop: 8,
        }}>
          {scopeBadge.label}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
        {pattern.products.map(p => (
          <span key={p} style={{
            fontSize: 12,
            padding: '3px 10px',
            borderRadius: 3,
            background: '#F4F5F7',
            color: '#42526E',
            border: '1px solid #DFE1E6',
          }}>
            {PRODUCT_LABELS[p] || p}
          </span>
        ))}
      </div>

      {/* Description */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#172B4D', marginBottom: 14 }}>Description</h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: '#42526E' }}>{pattern.description}</p>
      </section>

      {/* Components Used */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#172B4D', marginBottom: 14 }}>Components Used</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {pattern.components.map(name => {
            const comp = findComponent(name)
            const slug = comp ? getComponentSlug(comp) : null
            return slug ? (
              <Link
                key={name}
                to={`/components/${slug}`}
                style={{
                  fontSize: 13,
                  padding: '5px 12px',
                  borderRadius: 4,
                  border: '1px solid #DFE1E6',
                  color: '#0052CC',
                  textDecoration: 'none',
                  fontWeight: 500,
                  background: '#ffffff',
                }}
              >
                {name}
              </Link>
            ) : (
              <span key={name} style={{
                fontSize: 13,
                padding: '5px 12px',
                borderRadius: 4,
                border: '1px solid #DFE1E6',
                color: '#6B778C',
                background: '#F4F5F7',
              }}>
                {name}
              </span>
            )
          })}
        </div>
      </section>

      {/* Product Variants */}
      {pattern.variants && pattern.variants.length > 0 && (
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#172B4D', marginBottom: 14 }}>Product Variants</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {pattern.variants.map((v, i) => (
              <div key={i} style={{
                border: '1px solid #DFE1E6',
                borderRadius: 8,
                padding: '20px 24px',
              }}>
                <div style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#42526E',
                  marginBottom: 8,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  {PRODUCT_LABELS[v.product] || v.product}
                </div>
                <p style={{ fontSize: 14, color: '#42526E', lineHeight: 1.6 }}>{v.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Rules */}
      {pattern.rules && pattern.rules.length > 0 && (
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#172B4D', marginBottom: 14 }}>Rules</h2>
          <div style={{ border: '1px solid #DFE1E6', borderRadius: 8, overflow: 'hidden' }}>
            {pattern.rules.map((rule, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '14px 20px',
                borderBottom: i < pattern.rules.length - 1 ? '1px solid #F4F5F7' : 'none',
                backgroundColor: i % 2 === 1 ? '#FAFBFC' : '#ffffff',
              }}>
                <span style={{ color: '#0052CC', fontWeight: 700, fontSize: 14, flexShrink: 0, marginTop: 1 }}>•</span>
                <span style={{ fontSize: 14, color: '#42526E', lineHeight: 1.6 }}>{rule}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Changelog */}
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#172B4D', marginBottom: 14 }}>Changelog</h2>
        {changelog.map((entry, i) => {
          const typeBadge = TYPE_BADGE[entry.type] || TYPE_BADGE.added
          return (
            <div key={i} style={{
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
              padding: '12px 0',
              borderBottom: i < changelog.length - 1 ? '1px solid #F4F5F7' : 'none',
            }}>
              <span style={{ fontSize: 13, color: '#6B778C', whiteSpace: 'nowrap', minWidth: 90 }}>{entry.date}</span>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 3,
                background: typeBadge.bg,
                color: typeBadge.color,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}>
                {entry.type}
              </span>
              <span style={{ fontSize: 14, color: '#172B4D', lineHeight: 1.5 }}>{entry.description}</span>
            </div>
          )
        })}
      </section>
    </div>
  )
}

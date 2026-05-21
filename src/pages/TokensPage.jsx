import { useState } from 'react'
import tokensData from '../../data/tokens.json'
import TokenSwatch from '../components/TokenSwatch.jsx'

function ProductTabs({ activeId, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
      {tokensData.products.map(p => {
        const active = activeId === p.id
        return (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
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
            }}
          >
            {p.name}
          </button>
        )
      })}
    </div>
  )
}

function ColoursSection() {
  const [activeId, setActiveId] = useState(tokensData.products[0].id)
  const product = tokensData.products.find(p => p.id === activeId)
  const colors = Object.entries(product.tokens.colors).map(([name, t]) => ({ name, ...t }))

  return (
    <div>
      <nav style={{ fontSize: 13, color: '#6B778C', marginBottom: 20 }}>
        <span>Tokens</span>
        <span style={{ margin: '0 6px' }}>›</span>
        <span style={{ color: '#172B4D' }}>Colours</span>
      </nav>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: '#172B4D', marginBottom: 8, lineHeight: 1.2 }}>
        Colour Tokens
      </h1>
      <p style={{ fontSize: 15, color: '#6B778C', marginBottom: 28, lineHeight: 1.7 }}>
        Colour tokens for each product in the design system.
      </p>
      <ProductTabs activeId={activeId} onChange={setActiveId} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
        gap: 16,
      }}>
        {colors.map(t => (
          <TokenSwatch key={t.name} name={t.name} value={t.value} usage={t.usage} />
        ))}
      </div>
    </div>
  )
}

function TypographySection() {
  const [activeId, setActiveId] = useState(tokensData.products[0].id)
  const product = tokensData.products.find(p => p.id === activeId)
  const tokens = Object.entries(product.tokens.typography).map(([name, t]) => ({ name, ...t }))

  return (
    <div>
      <nav style={{ fontSize: 13, color: '#6B778C', marginBottom: 20 }}>
        <span>Tokens</span>
        <span style={{ margin: '0 6px' }}>›</span>
        <span style={{ color: '#172B4D' }}>Typography</span>
      </nav>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: '#172B4D', marginBottom: 8, lineHeight: 1.2 }}>
        Typography Tokens
      </h1>
      <p style={{ fontSize: 15, color: '#6B778C', marginBottom: 28, lineHeight: 1.7 }}>
        Type styles for each product. Select a product to see its type scale.
      </p>
      <ProductTabs activeId={activeId} onChange={setActiveId} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {tokens.map(t => (
          <div key={t.name} style={{
            background: '#ffffff',
            border: '1px solid #DFE1E6',
            borderRadius: 8,
            padding: '20px 24px',
          }}>
            <div style={{
              fontFamily: t.family,
              fontSize: t.size,
              fontWeight: t.weight,
              color: '#172B4D',
              marginBottom: 12,
              lineHeight: 1.3,
            }}>
              {t.usage}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#0052CC', marginBottom: 3 }}>
              {t.name}
            </div>
            <div style={{ fontSize: 12, color: '#6B778C' }}>
              font-size {t.size} · font-weight {t.weight} · font-family {t.family}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SpacingSection() {
  const [activeId, setActiveId] = useState(tokensData.products[0].id)
  const product = tokensData.products.find(p => p.id === activeId)
  const tokens = Object.entries(product.tokens.spacing).map(([name, value]) => ({ name, value }))

  return (
    <div>
      <nav style={{ fontSize: 13, color: '#6B778C', marginBottom: 20 }}>
        <span>Tokens</span>
        <span style={{ margin: '0 6px' }}>›</span>
        <span style={{ color: '#172B4D' }}>Spacing</span>
      </nav>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: '#172B4D', marginBottom: 8, lineHeight: 1.2 }}>
        Spacing Tokens
      </h1>
      <p style={{ fontSize: 15, color: '#6B778C', marginBottom: 28, lineHeight: 1.7 }}>
        Spacing scale for each product. Always use a spacing token instead of arbitrary pixel values.
      </p>
      <ProductTabs activeId={activeId} onChange={setActiveId} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {tokens.map(t => {
          const px = parseInt(t.value, 10)
          const barWidth = Math.max(px * 3, 4)
          return (
            <div key={t.name} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: '#172B4D',
                width: 120,
                flexShrink: 0,
              }}>
                {t.name}
              </div>
              <div style={{
                background: '#0052CC',
                height: 18,
                borderRadius: 3,
                width: `${barWidth}px`,
                minWidth: 4,
                flexShrink: 0,
              }} />
              <div style={{ fontSize: 13, color: '#6B778C', marginLeft: 12, flexShrink: 0 }}>
                {t.value}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function TokensPage({ section }) {
  if (section === 'colours') return <ColoursSection />
  if (section === 'typography') return <TypographySection />
  if (section === 'spacing') return <SpacingSection />
  return null
}

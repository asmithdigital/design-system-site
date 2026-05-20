import { useState } from 'react'
import tokensData from '../../data/tokens.json'
import Breadcrumb from '../components/Breadcrumb.jsx'
import TokenSwatch from '../components/TokenSwatch.jsx'

function ProductTabs({ activeId, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
      {tokensData.products.map(p => {
        const active = activeId === p.id
        return (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
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
  )
}

function ColoursSection() {
  const [activeId, setActiveId] = useState(tokensData.products[0].id)
  const product = tokensData.products.find(p => p.id === activeId)
  const colors = Object.entries(product.tokens.colors).map(([name, t]) => ({ name, ...t }))

  return (
    <div>
      <Breadcrumb crumbs={[{ label: 'Tokens' }, { label: 'Colours' }]} />
      <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#0f1f3d', marginBottom: '8px' }}>
        Colour Tokens
      </h1>
      <p style={{ fontSize: '15px', color: '#72706a', marginBottom: '24px', lineHeight: '1.6' }}>
        Colour tokens for each product in the design system.
      </p>
      <ProductTabs activeId={activeId} onChange={setActiveId} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
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
      <Breadcrumb crumbs={[{ label: 'Tokens' }, { label: 'Typography' }]} />
      <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#0f1f3d', marginBottom: '8px' }}>
        Typography Tokens
      </h1>
      <p style={{ fontSize: '15px', color: '#72706a', marginBottom: '24px', lineHeight: '1.6' }}>
        Type styles for each product. Select a product to see its type scale.
      </p>
      <ProductTabs activeId={activeId} onChange={setActiveId} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {tokens.map(t => (
          <div key={t.name} style={{
            background: '#ffffff',
            border: '1px solid #ddd8c8',
            borderRadius: '10px',
            padding: '20px 24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}>
            <div style={{
              fontFamily: t.family,
              fontSize: t.size,
              fontWeight: t.weight,
              color: '#0f1f3d',
              marginBottom: '12px',
              lineHeight: '1.3',
            }}>
              {t.usage}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#0f1f3d', marginBottom: '2px' }}>
              {t.name}
            </div>
            <div style={{ fontSize: '12px', color: '#72706a' }}>
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
      <Breadcrumb crumbs={[{ label: 'Tokens' }, { label: 'Spacing' }]} />
      <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#0f1f3d', marginBottom: '8px' }}>
        Spacing Tokens
      </h1>
      <p style={{ fontSize: '15px', color: '#72706a', marginBottom: '24px', lineHeight: '1.6' }}>
        Spacing scale for each product. Always use a spacing token instead of arbitrary pixel values.
      </p>
      <ProductTabs activeId={activeId} onChange={setActiveId} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {tokens.map(t => {
          const px = parseInt(t.value, 10)
          const barWidth = Math.max(px * 3, 4)
          return (
            <div key={t.name} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px',
                color: '#0f1f3d',
                width: '120px',
                flexShrink: 0,
              }}>
                {t.name}
              </div>
              <div style={{
                background: '#0a6b54',
                height: '20px',
                borderRadius: '4px',
                width: `${barWidth}px`,
                minWidth: '4px',
                flexShrink: 0,
              }} />
              <div style={{ fontSize: '13px', color: '#72706a', marginLeft: '12px', flexShrink: 0 }}>
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

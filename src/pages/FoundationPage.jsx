import foundationsData from '../../data/foundations.json'
import Breadcrumb from '../components/Breadcrumb.jsx'

const SECTION_LABELS = {
  layout: 'Layout',
  accessibility: 'Accessibility',
  patterns: 'Patterns',
}

const PRODUCT_ACCENT = {
  'raa-web': '#FFD100',
  'taskly': '#1A2B4A',
}

export default function FoundationPage() {
  return (
    <div>
      <Breadcrumb crumbs={[{ label: 'Foundations' }]} />
      <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#0f1f3d', marginBottom: '8px' }}>
        Foundations
      </h1>
      <p style={{ fontSize: '15px', color: '#72706a', marginBottom: '40px', lineHeight: '1.6' }}>
        Layout, accessibility, and pattern guidelines for each product in the design system.
      </p>

      {foundationsData.products.map((product, pi) => (
        <div key={product.id}>
          {pi > 0 && (
            <hr style={{ border: 'none', borderTop: '1px solid #ddd8c8', margin: '48px 0' }} />
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <div style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: PRODUCT_ACCENT[product.id] || '#ddd8c8',
              border: product.id === 'taskly' ? '1px solid #9ca3af' : 'none',
              flexShrink: 0,
            }} />
            <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#0f1f3d', margin: 0 }}>
              {product.name}
            </h2>
          </div>

          {Object.entries(product.foundations).map(([sectionKey, sectionData]) => {
            const entries = Object.entries(sectionData)
            return (
              <div key={sectionKey} style={{ marginBottom: '28px' }}>
                <h3 style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#72706a',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}>
                  {SECTION_LABELS[sectionKey] || sectionKey}
                </h3>
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #ddd8c8',
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}>
                  {entries.map(([key, value], i) => (
                    <div key={key} style={{
                      display: 'flex',
                      padding: '12px 16px',
                      borderBottom: i < entries.length - 1 ? '1px solid #f0ede4' : 'none',
                      backgroundColor: i % 2 === 1 ? '#fafaf8' : 'transparent',
                      gap: '16px',
                    }}>
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '12.5px',
                        color: '#0a6b54',
                        width: '200px',
                        flexShrink: 0,
                        paddingTop: '1px',
                      }}>
                        {key}
                      </div>
                      <div style={{ fontSize: '14px', color: '#0f1f3d', lineHeight: '1.6' }}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

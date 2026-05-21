import { Link } from 'react-router-dom'
import foundationsData from '../../data/foundations.json'

const SECTION_LABELS = {
  layout: 'Layout',
  accessibility: 'Accessibility',
  patterns: 'Patterns',
}

const PRODUCT_ACCENT = {
  'raa-web': '#FFD100',
  'taskly': '#2B7DE9',
}

export default function FoundationPage() {
  return (
    <div>
      <nav style={{ fontSize: 13, color: '#6B778C', marginBottom: 20 }}>
        <span style={{ color: '#172B4D' }}>Foundations</span>
      </nav>

      <h1 style={{ fontSize: 36, fontWeight: 700, color: '#172B4D', marginBottom: 8, lineHeight: 1.2 }}>
        Foundations
      </h1>
      <p style={{ fontSize: 15, color: '#6B778C', marginBottom: 40, lineHeight: 1.7 }}>
        Layout, accessibility, and pattern guidelines for each product in the design system.
      </p>

      {foundationsData.products.map((product, pi) => (
        <div key={product.id}>
          {pi > 0 && (
            <hr style={{ border: 'none', borderTop: '1px solid #DFE1E6', margin: '48px 0' }} />
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: PRODUCT_ACCENT[product.id] || '#DFE1E6',
              flexShrink: 0,
            }} />
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#172B4D', margin: 0 }}>
              {product.name}
            </h2>
          </div>

          {Object.entries(product.foundations).map(([sectionKey, sectionData]) => {
            const entries = Object.entries(sectionData)
            return (
              <div key={sectionKey} style={{ marginBottom: 28 }}>
                <h3 style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#6B778C',
                  marginBottom: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                }}>
                  {SECTION_LABELS[sectionKey] || sectionKey}
                </h3>
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #DFE1E6',
                  borderRadius: 8,
                  overflow: 'hidden',
                }}>
                  {entries.map(([key, value], i) => (
                    <div key={key} style={{
                      display: 'flex',
                      padding: '12px 16px',
                      borderBottom: i < entries.length - 1 ? '1px solid #F4F5F7' : 'none',
                      backgroundColor: i % 2 === 1 ? '#FAFBFC' : 'transparent',
                      gap: 16,
                    }}>
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '12.5px',
                        color: '#0052CC',
                        width: 200,
                        flexShrink: 0,
                        paddingTop: 1,
                      }}>
                        {key}
                      </div>
                      <div style={{ fontSize: 14, color: '#172B4D', lineHeight: 1.6 }}>
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

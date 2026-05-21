import { Link } from 'react-router-dom'
import componentsData from '../../data/components.json'
import patternsData from '../../data/patterns.json'
import templatesData from '../../data/templates.json'

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function getComponentSlug(c) {
  return `${c.product}-${slugify(c.name)}`
}

const PRODUCTS = [
  {
    id: 'raa-web',
    name: 'RAA Web',
    description: 'Core design system for raa.com.au, My Account, and Quote to Buy applications. Covers the full customer journey from public marketing pages through to policy purchase and self-service management.',
    status: 'production',
    statusStyle: { bg: '#E3FCEF', color: '#006644' },
    accent: '#FFD100',
    subProducts: [
      { id: 'quote-to-buy', label: 'Quote to Buy' },
      { id: 'my-account', label: 'My Account' },
      { id: 'renewals', label: 'Renewals' },
      { id: 'claims', label: 'Claims' },
      { id: 'raa-public-site', label: 'RAA Public Site' },
    ],
  },
  {
    id: 'taskly',
    name: 'Taskly',
    description: 'White label task management application built as a third-party product. Uses its own token set (Primary Navy, Inter typography) that is separate from the RAA Web system.',
    status: 'beta',
    statusStyle: { bg: '#EAF0FF', color: '#0747A6' },
    accent: '#2B7DE9',
    subProducts: [
      { id: 'taskly', label: 'Taskly' },
    ],
  },
]

function getComponentsForProduct(productId) {
  return componentsData.components.filter(c => c.product === productId)
}

function getComponentsUsedIn(subProductId) {
  return componentsData.components.filter(c => c.usedIn && c.usedIn.includes(subProductId))
}

function getPatternsForSubProduct(subProductId) {
  return patternsData.patterns.filter(p => p.products && p.products.includes(subProductId))
}

function getTemplatesForSubProduct(subProductId) {
  return templatesData.templates.filter(t => t.product === subProductId)
}

export default function ProductsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: '#172B4D', marginBottom: 12, lineHeight: 1.2 }}>
        Products
      </h1>
      <p style={{ fontSize: 16, color: '#6B778C', marginBottom: 48, lineHeight: 1.7 }}>
        Components, patterns, and templates scoped to each product in the design system.
      </p>

      {PRODUCTS.map((product, pi) => {
        const productComponents = getComponentsForProduct(product.id)

        return (
          <div key={product.id} style={{ marginBottom: pi < PRODUCTS.length - 1 ? 72 : 0 }}>
            {/* Product header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 8,
            }}>
              <div style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: product.accent,
                flexShrink: 0,
              }} />
              <h2 style={{ fontSize: 26, fontWeight: 700, color: '#172B4D' }}>{product.name}</h2>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: 3,
                background: product.statusStyle.bg,
                color: product.statusStyle.color,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>
                {product.status}
              </span>
            </div>

            <p style={{ fontSize: 15, color: '#42526E', lineHeight: 1.7, marginBottom: 32, maxWidth: 640 }}>
              {product.description}
            </p>

            {/* Product library components */}
            <section style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: 12, fontWeight: 600, color: '#6B778C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
                Component Library ({productComponents.length})
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {productComponents.map(c => (
                  <Link
                    key={getComponentSlug(c)}
                    to={`/components/${getComponentSlug(c)}`}
                    style={{
                      fontSize: 13,
                      padding: '4px 12px',
                      borderRadius: 4,
                      border: '1px solid #DFE1E6',
                      color: '#0052CC',
                      textDecoration: 'none',
                      fontWeight: 500,
                      background: '#ffffff',
                    }}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </section>

            {/* Sub-products */}
            {product.subProducts.length > 1 && (
              <div>
                <h3 style={{ fontSize: 12, fontWeight: 600, color: '#6B778C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
                  Applications
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {product.subProducts.map(sub => {
                    const usedComponents = getComponentsUsedIn(sub.id)
                    const patterns = getPatternsForSubProduct(sub.id)
                    const templates = getTemplatesForSubProduct(sub.id)

                    if (usedComponents.length === 0 && patterns.length === 0 && templates.length === 0) return null

                    return (
                      <div key={sub.id} style={{
                        border: '1px solid #DFE1E6',
                        borderRadius: 8,
                        padding: '20px 24px',
                      }}>
                        <h4 style={{ fontSize: 15, fontWeight: 600, color: '#172B4D', marginBottom: 16 }}>
                          {sub.label}
                        </h4>

                        {usedComponents.length > 0 && (
                          <div style={{ marginBottom: 14 }}>
                            <p style={{ fontSize: 11, fontWeight: 600, color: '#6B778C', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                              Components ({usedComponents.length})
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                              {usedComponents.map(c => (
                                <Link
                                  key={getComponentSlug(c)}
                                  to={`/components/${getComponentSlug(c)}`}
                                  style={{
                                    fontSize: 12,
                                    padding: '3px 10px',
                                    borderRadius: 4,
                                    border: '1px solid #DFE1E6',
                                    color: '#0052CC',
                                    textDecoration: 'none',
                                    background: '#ffffff',
                                  }}
                                >
                                  {c.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {patterns.length > 0 && (
                          <div style={{ marginBottom: 14 }}>
                            <p style={{ fontSize: 11, fontWeight: 600, color: '#6B778C', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                              Patterns
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                              {patterns.map(p => (
                                <Link
                                  key={p.id}
                                  to={`/patterns/${p.id}`}
                                  style={{
                                    fontSize: 12,
                                    padding: '3px 10px',
                                    borderRadius: 4,
                                    border: '1px solid #DDD6FE',
                                    color: '#5B21B6',
                                    textDecoration: 'none',
                                    background: '#F5F3FF',
                                  }}
                                >
                                  {p.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {templates.length > 0 && (
                          <div>
                            <p style={{ fontSize: 11, fontWeight: 600, color: '#6B778C', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                              Templates
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                              {templates.map(t => (
                                <Link
                                  key={t.id}
                                  to={`/templates/${t.id}`}
                                  style={{
                                    fontSize: 12,
                                    padding: '3px 10px',
                                    borderRadius: 4,
                                    border: '1px solid #BBF7D0',
                                    color: '#166534',
                                    textDecoration: 'none',
                                    background: '#F0FDF4',
                                  }}
                                >
                                  {t.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Taskly is simple - just show components */}
            {product.subProducts.length === 1 && (
              <div>
                {(() => {
                  const sub = product.subProducts[0]
                  const patterns = getPatternsForSubProduct(sub.id)
                  const templates = getTemplatesForSubProduct(sub.id)
                  if (patterns.length === 0 && templates.length === 0) return null
                  return (
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                      {patterns.length > 0 && (
                        <div>
                          <p style={{ fontSize: 12, fontWeight: 600, color: '#6B778C', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Patterns</p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {patterns.map(p => (
                              <Link key={p.id} to={`/patterns/${p.id}`} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 4, border: '1px solid #DDD6FE', color: '#5B21B6', textDecoration: 'none', background: '#F5F3FF' }}>
                                {p.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>
            )}

            {pi < PRODUCTS.length - 1 && (
              <hr style={{ marginTop: 56, border: 'none', borderTop: '1px solid #DFE1E6' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

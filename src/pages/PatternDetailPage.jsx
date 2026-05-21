import { useState } from 'react'
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
  'cross-product':    { bg: '#EAF0FF', color: '#0747A6', label: 'Cross-product' },
  'product-specific': { bg: '#F4F5F7', color: '#42526E', label: 'Product-specific' },
}

const TYPE_BADGE = {
  added:   { bg: '#E3FCEF', color: '#006644' },
  changed: { bg: '#EAF0FF', color: '#0747A6' },
  fixed:   { bg: '#FFF0B3', color: '#5E4701' },
  removed: { bg: '#FFEBE6', color: '#BF2600' },
}

const PRODUCT_LABELS = {
  'quote-to-buy':   'Quote to Buy',
  'my-account':     'My Account',
  'renewals':       'Renewals',
  'claims':         'Claims',
  'taskly':         'Taskly',
  'raa-public-site':'RAA Public Site',
}

// Yellow for RAA Web products, blue for Taskly
const PRODUCT_ACCENT = {
  'quote-to-buy':    '#FFD100',
  'my-account':      '#FFD100',
  'renewals':        '#FFD100',
  'claims':          '#FFD100',
  'raa-public-site': '#FFD100',
  'taskly':          '#2B7DE9',
}

const TABS = [
  { id: 'overview',    label: 'Overview' },
  { id: 'components',  label: 'Components Used' },
  { id: 'variants',    label: 'Product Variants' },
  { id: 'rules',       label: 'Rules' },
  { id: 'changelog',   label: 'Changelog' },
]

function FlowDiagram({ components }) {
  return (
    <div style={{
      border: '1px solid #DFE1E6',
      borderRadius: '8px',
      padding: '24px',
      backgroundColor: '#FAFBFC',
      overflowX: 'auto',
    }}>
      <p style={{ fontSize: '11px', fontWeight: '700', color: '#5E6C84', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>
        Component flow
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0', flexWrap: 'nowrap', minWidth: 'max-content' }}>
        {components.map((name, i) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              padding: '8px 14px',
              border: '1.5px solid #DFE1E6',
              borderRadius: '6px',
              backgroundColor: '#ffffff',
              fontSize: '13px',
              fontWeight: '500',
              color: '#172B4D',
              whiteSpace: 'nowrap',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}>
              {name}
            </div>
            {i < components.length - 1 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 6px',
                color: '#5E6C84',
                fontSize: '16px',
                fontWeight: '300',
              }}>
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PatternDetailPage() {
  const { id } = useParams()
  const pattern = patternsData.patterns.find(p => p.id === id)
  const [activeTab, setActiveTab] = useState('overview')

  if (!pattern) {
    return (
      <div style={{ padding: '48px 40px', maxWidth: 960, margin: '0 auto' }}>
        <p style={{ color: '#5E6C84' }}>Pattern not found.</p>
      </div>
    )
  }

  const scopeBadge = SCOPE_BADGE[pattern.scope] || SCOPE_BADGE['product-specific']
  const changelog = [...(pattern.changelog || [])].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div>
      {/* ── Banner ─────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#FAFBFC', borderBottom: '1px solid #DFE1E6' }}>
        <div className="page-banner-inner" style={{ maxWidth: 1040, margin: '0 auto', padding: '40px 40px 0' }}>
          {/* Breadcrumb */}
          <nav style={{ fontSize: '13px', color: '#5E6C84', marginBottom: '20px' }}>
            <Link to="/patterns" style={{ color: '#0052CC' }}>Patterns</Link>
            <span style={{ margin: '0 6px' }}>›</span>
            <span style={{ color: '#172B4D' }}>{pattern.name}</span>
          </nav>

          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#172B4D', marginBottom: '14px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            {pattern.name}
          </h1>

          {/* Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '12px', fontWeight: '600', padding: '3px 10px', borderRadius: '3px',
              background: scopeBadge.bg, color: scopeBadge.color,
            }}>
              {scopeBadge.label}
            </span>
            {pattern.products.map(p => (
              <span key={p} style={{
                fontSize: '12px', padding: '3px 10px', borderRadius: '3px',
                background: '#F4F5F7', color: '#172B4D', border: '1px solid #DFE1E6',
              }}>
                {PRODUCT_LABELS[p] || p}
              </span>
            ))}
          </div>

          <p style={{ fontSize: '15px', color: '#172B4D', lineHeight: '1.6', maxWidth: '720px', marginBottom: '28px' }}>
            {pattern.description}
          </p>

          {/* Tabs */}
          <div className="tab-bar" style={{ display: 'flex', gap: 0, marginBottom: '-1px' }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '10px 18px', fontSize: '14px',
                  fontWeight: activeTab === tab.id ? '600' : '400',
                  color: activeTab === tab.id ? '#0052CC' : '#5E6C84',
                  borderBottom: activeTab === tab.id ? '2px solid #0052CC' : '2px solid transparent',
                  transition: 'color 0.1s', fontFamily: 'inherit', whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.color = '#172B4D' }}
                onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.color = '#5E6C84' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="page-detail-content" style={{ maxWidth: 1040, margin: '0 auto', padding: '40px 40px 80px' }}>

        {activeTab === 'overview' && (
          <div>
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ marginBottom: '12px' }}>Description</h2>
              <p style={{ lineHeight: '1.7', color: '#172B4D' }}>{pattern.description}</p>
            </section>

            {pattern.components && pattern.components.length > 0 && (
              <section style={{ marginBottom: '40px' }}>
                <h2 style={{ marginBottom: '16px' }}>Component Flow</h2>
                <FlowDiagram components={pattern.components} />
              </section>
            )}

            {pattern.rules && pattern.rules.length > 0 && (
              <section>
                <h2 style={{ marginBottom: '16px' }}>Key Rules</h2>
                <div style={{ border: '1px solid #DFE1E6', borderRadius: '8px', overflow: 'hidden' }}>
                  {pattern.rules.slice(0, 3).map((rule, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '12px',
                      padding: '14px 20px',
                      borderBottom: i < Math.min(pattern.rules.length, 3) - 1 ? '1px solid #F4F5F7' : 'none',
                      backgroundColor: i % 2 === 1 ? '#FAFBFC' : '#ffffff',
                    }}>
                      <span style={{ color: '#0052CC', fontWeight: '700', fontSize: '14px', flexShrink: 0, marginTop: 1 }}>•</span>
                      <span style={{ fontSize: '14px', color: '#172B4D', lineHeight: '1.6' }}>{rule}</span>
                    </div>
                  ))}
                </div>
                {pattern.rules.length > 3 && (
                  <button onClick={() => setActiveTab('rules')} style={{
                    marginTop: '10px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '13px', color: '#0052CC', fontFamily: 'inherit', padding: 0,
                  }}>
                    View all {pattern.rules.length} rules →
                  </button>
                )}
              </section>
            )}
          </div>
        )}

        {activeTab === 'components' && (
          <section>
            <h2 style={{ marginBottom: '20px' }}>Components Used</h2>
            <div style={{ marginBottom: '28px' }}>
              <FlowDiagram components={pattern.components} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {pattern.components.map(name => {
                const comp = findComponent(name)
                const slug = comp ? getComponentSlug(comp) : null
                return slug ? (
                  <Link key={name} to={`/components/${slug}`} style={{
                    fontSize: '14px', padding: '8px 16px', borderRadius: '6px',
                    border: '1px solid #DFE1E6', color: '#0052CC', textDecoration: 'none',
                    fontWeight: '500', background: '#ffffff',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  }}>
                    {name}
                  </Link>
                ) : (
                  <span key={name} style={{
                    fontSize: '14px', padding: '8px 16px', borderRadius: '6px',
                    border: '1px solid #DFE1E6', color: '#5E6C84', background: '#F4F5F7',
                  }}>
                    {name}
                  </span>
                )
              })}
            </div>
          </section>
        )}

        {activeTab === 'variants' && (
          <section>
            <h2 style={{ marginBottom: '20px' }}>Product Variants</h2>
            {pattern.variants && pattern.variants.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {pattern.variants.map((v, i) => {
                  const accent = PRODUCT_ACCENT[v.product] || '#DFE1E6'
                  return (
                    <div key={i} style={{
                      border: '1px solid #DFE1E6',
                      borderLeft: `4px solid ${accent}`,
                      borderRadius: '6px',
                      padding: '18px 22px',
                      backgroundColor: '#ffffff',
                    }}>
                      <div style={{
                        fontSize: '11px', fontWeight: '700', color: '#5E6C84',
                        marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em',
                      }}>
                        {PRODUCT_LABELS[v.product] || v.product}
                      </div>
                      <p style={{ fontSize: '14px', color: '#172B4D', lineHeight: '1.6' }}>{v.description}</p>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p style={{ color: '#5E6C84' }}>No product variants documented for this pattern.</p>
            )}
          </section>
        )}

        {activeTab === 'rules' && (
          <section>
            <h2 style={{ marginBottom: '20px' }}>Rules</h2>
            {pattern.rules && pattern.rules.length > 0 ? (
              <div style={{ border: '1px solid #DFE1E6', borderRadius: '8px', overflow: 'hidden' }}>
                {pattern.rules.map((rule, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '12px',
                    padding: '14px 20px',
                    borderBottom: i < pattern.rules.length - 1 ? '1px solid #F4F5F7' : 'none',
                    backgroundColor: i % 2 === 1 ? '#FAFBFC' : '#ffffff',
                  }}>
                    <span style={{ color: '#0052CC', fontWeight: '700', fontSize: '14px', flexShrink: 0, marginTop: 1 }}>•</span>
                    <span style={{ fontSize: '14px', color: '#172B4D', lineHeight: '1.6' }}>{rule}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#5E6C84' }}>No rules documented.</p>
            )}
          </section>
        )}

        {activeTab === 'changelog' && (
          <section>
            <h2 style={{ marginBottom: '20px' }}>Changelog</h2>
            {changelog.map((entry, i) => {
              const typeBadge = TYPE_BADGE[entry.type] || TYPE_BADGE.added
              return (
                <div key={i} style={{
                  display: 'flex', gap: '16px', alignItems: 'flex-start',
                  padding: '12px 0',
                  borderBottom: i < changelog.length - 1 ? '1px solid #F4F5F7' : 'none',
                }}>
                  <span style={{ fontSize: '13px', color: '#5E6C84', whiteSpace: 'nowrap', minWidth: 90 }}>{entry.date}</span>
                  <span style={{
                    fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '3px',
                    background: typeBadge.bg, color: typeBadge.color,
                    textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0,
                  }}>
                    {entry.type}
                  </span>
                  <span style={{ fontSize: '14px', color: '#172B4D', lineHeight: 1.5 }}>{entry.description}</span>
                </div>
              )
            })}
          </section>
        )}
      </div>
    </div>
  )
}

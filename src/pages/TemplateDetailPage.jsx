import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import templatesData from '../../data/templates.json'
import componentsData from '../../data/components.json'
import {
  QuoteToBuyTemplateMockup,
  MyAccountTemplateMockup,
  RAAWebsiteTemplateMockup,
} from '../components/RAAMockups.jsx'

const TEMPLATE_MOCKUPS = {
  'quote-step-page':  QuoteToBuyTemplateMockup,
  'my-account-page':  MyAccountTemplateMockup,
  'raa-website':      RAAWebsiteTemplateMockup,
}

const PRODUCT_BADGE_EXTENDED = {
  'quote-to-buy': { bg: '#FFFAE6', color: '#7A4F00', border: '#FFD100', label: 'Quote to Buy' },
  'my-account':   { bg: '#E3FCEF', color: '#006644', border: '#79F2C0', label: 'My Account' },
  'raa-website':  { bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE', label: 'RAA Website' },
}

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function getComponentSlug(c) {
  return `${c.product}-${slugify(c.name)}`
}

function findComponent(name) {
  return componentsData.components.find(c => c.name === name)
}

const PRODUCT_BADGE = {
  'quote-to-buy': { bg: '#FFFAE6', color: '#7A4F00', border: '#FFD100', label: 'Quote to Buy' },
  'my-account':   { bg: '#E3FCEF', color: '#006644', border: '#79F2C0', label: 'My Account' },
}

const TYPE_BADGE = {
  added:   { bg: '#E3FCEF', color: '#006644' },
  changed: { bg: '#EAF0FF', color: '#0747A6' },
  fixed:   { bg: '#FFF0B3', color: '#5E4701' },
  removed: { bg: '#FFEBE6', color: '#BF2600' },
}

const TABS = [
  { id: 'overview',    label: 'Overview' },
  { id: 'layout',      label: 'Layout' },
  { id: 'components',  label: 'Components' },
  { id: 'rules',       label: 'Rules' },
  { id: 'changelog',   label: 'Changelog' },
]

const REGION_PALETTE = [
  { bg: '#EFF6FF', border: '#BFDBFE', text: '#1E40AF' },
  { bg: '#F5F3FF', border: '#DDD6FE', text: '#5B21B6' },
  { bg: '#F0FDF4', border: '#BBF7D0', text: '#166534' },
  { bg: '#FFFBEB', border: '#FDE68A', text: '#92400E' },
  { bg: '#FFF1F2', border: '#FECDD3', text: '#9F1239' },
  { bg: '#F0F9FF', border: '#BAE6FD', text: '#075985' },
]

function LayoutWireframe({ regions }) {
  return (
    <div
      className="layout-wireframe"
      style={{
        border: '1px solid #DFE1E6',
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: '#F7F8F9',
      }}
    >
      <p style={{ fontSize: '11px', fontWeight: '700', color: '#5E6C84', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>
        Layout wireframe
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {regions.map((region, i) => {
          const palette = REGION_PALETTE[i % REGION_PALETTE.length]
          const label = region.split('(')[0].trim()
          const meta = region.match(/\(([^)]+)\)/)?.[1] || ''
          // First region (usually banner) spans full width; sidebar-like regions are narrower
          const isNarrow = /left|right|gutter|nav/i.test(region)
          const isWide = i === 0 // full-width top region
          return (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'stretch',
              gap: '6px',
            }}>
              <div style={{
                flex: isNarrow ? '0 0 120px' : 1,
                minHeight: isWide ? '40px' : '60px',
                border: `1.5px dashed ${palette.border}`,
                borderRadius: '5px',
                backgroundColor: palette.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '2px',
                padding: '8px',
              }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: palette.text, textAlign: 'center' }}>
                  {label}
                </span>
                {meta && (
                  <span style={{ fontSize: '10px', color: palette.text, opacity: 0.7, textAlign: 'center' }}>
                    {meta}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function TemplateDetailPage() {
  const { id } = useParams()
  const template = templatesData.templates.find(t => t.id === id)
  const [activeTab, setActiveTab] = useState('overview')

  if (!template) {
    return (
      <div style={{ padding: '48px 40px', maxWidth: 960, margin: '0 auto' }}>
        <p style={{ color: '#5E6C84' }}>Template not found.</p>
      </div>
    )
  }

  const badge = PRODUCT_BADGE_EXTENDED[template.product] || PRODUCT_BADGE[template.product] || { bg: '#F4F5F7', color: '#42526E', border: '#DFE1E6', label: template.product }
  const changelog = [...(template.changelog || [])].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div>
      {/* ── Banner ─────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#FAFBFC', borderBottom: '1px solid #DFE1E6' }}>
        <div className="page-banner-inner" style={{ maxWidth: 1040, margin: '0 auto', padding: '40px 40px 0' }}>
          {/* Breadcrumb */}
          <nav style={{ fontSize: '13px', color: '#5E6C84', marginBottom: '20px' }}>
            <Link to="/templates" style={{ color: '#0052CC' }}>Templates</Link>
            <span style={{ margin: '0 6px' }}>›</span>
            <span style={{ color: '#172B4D' }}>{template.name}</span>
          </nav>

          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#172B4D', marginBottom: '14px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            {template.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '12px', fontWeight: '600', padding: '3px 10px', borderRadius: '3px',
              background: badge.bg, color: badge.color, border: `1px solid ${badge.border}`,
            }}>
              {badge.label}
            </span>
            <span style={{ fontSize: '13px', color: '#5E6C84' }}>
              {template.layout.regions.length} regions · {template.components.length} components · max {template.layout.maxContentWidth}
            </span>
          </div>

          <p style={{ fontSize: '15px', color: '#172B4D', lineHeight: '1.6', maxWidth: '720px', marginBottom: '28px' }}>
            {template.description}
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
              <p style={{ lineHeight: '1.7', color: '#172B4D' }}>{template.description}</p>
            </section>

            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ marginBottom: '16px' }}>UI Mockup</h2>
              {TEMPLATE_MOCKUPS[template.id]
                ? (() => { const M = TEMPLATE_MOCKUPS[template.id]; return <M /> })()
                : <LayoutWireframe regions={template.layout.regions} />
              }
              {template.layout.responsive && (
                <div style={{
                  marginTop: '12px', padding: '12px 16px', background: '#F4F5F7',
                  borderRadius: '6px', fontSize: '14px', color: '#172B4D', lineHeight: '1.6',
                }}>
                  <strong>Responsive:</strong> {template.layout.responsive}
                </div>
              )}
            </section>

            {template.rules && template.rules.length > 0 && (
              <section>
                <h2 style={{ marginBottom: '16px' }}>Key Rules</h2>
                <div style={{ border: '1px solid #DFE1E6', borderRadius: '8px', overflow: 'hidden' }}>
                  {template.rules.slice(0, 3).map((rule, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '12px',
                      padding: '14px 20px',
                      borderBottom: i < 2 ? '1px solid #F4F5F7' : 'none',
                      backgroundColor: i % 2 === 1 ? '#FAFBFC' : '#ffffff',
                    }}>
                      <span style={{ color: '#0052CC', fontWeight: '700', fontSize: '14px', flexShrink: 0, marginTop: 1 }}>•</span>
                      <span style={{ fontSize: '14px', color: '#172B4D', lineHeight: '1.6' }}>{rule}</span>
                    </div>
                  ))}
                </div>
                {template.rules.length > 3 && (
                  <button onClick={() => setActiveTab('rules')} style={{
                    marginTop: '10px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '13px', color: '#0052CC', fontFamily: 'inherit', padding: 0,
                  }}>
                    View all {template.rules.length} rules →
                  </button>
                )}
              </section>
            )}
          </div>
        )}

        {activeTab === 'layout' && (
          <section>
            <h2 style={{ marginBottom: '20px' }}>Layout</h2>
            {TEMPLATE_MOCKUPS[template.id]
              ? (() => { const M = TEMPLATE_MOCKUPS[template.id]; return <M /> })()
              : <LayoutWireframe regions={template.layout.regions} />
            }

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {template.layout.regions.map((region, i) => {
                const palette = REGION_PALETTE[i % REGION_PALETTE.length]
                const label = region.split('(')[0].trim()
                const meta = region.match(/\(([^)]+)\)/)?.[1] || ''
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      width: '12px', height: '12px', borderRadius: '2px',
                      backgroundColor: palette.bg, border: `1px solid ${palette.border}`,
                      flexShrink: 0, marginTop: '3px',
                    }} />
                    <div>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#172B4D' }}>{label}</span>
                      {meta && <span style={{ fontSize: '13px', color: '#5E6C84', marginLeft: '8px' }}>{meta}</span>}
                    </div>
                  </div>
                )
              })}
            </div>

            {template.layout.responsive && (
              <div style={{
                marginTop: '24px', padding: '16px 20px',
                background: '#F4F5F7', borderRadius: '8px',
                fontSize: '14px', color: '#172B4D', lineHeight: '1.6',
              }}>
                <p style={{ fontSize: '12px', fontWeight: '700', color: '#5E6C84', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Responsive behaviour
                </p>
                {template.layout.responsive}
              </div>
            )}

            {/* Layout Specs */}
            {template.layoutSpecs && (
              <div style={{ marginTop: '40px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#172B4D', marginBottom: '14px' }}>
                  Layout Specifications
                </h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #DFE1E6', borderRadius: '8px', overflow: 'hidden' }}>
                  <tbody>
                    {Object.entries(template.layoutSpecs).map(([key, val], i) => (
                      <tr key={key} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#FAFBFC' }}>
                        <td style={{ padding: '10px 16px', borderBottom: '1px solid #F4F5F7', fontWeight: '600', color: '#5E6C84', fontSize: '13px', width: '30%', whiteSpace: 'nowrap' }}>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                        </td>
                        <td style={{ padding: '10px 16px', borderBottom: '1px solid #F4F5F7', color: '#172B4D', fontSize: '14px', lineHeight: '1.5' }}>
                          {val}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Responsive Behaviour */}
            {template.responsiveBehavior && template.responsiveBehavior.length > 0 && (
              <div style={{ marginTop: '40px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#172B4D', marginBottom: '14px' }}>
                  Responsive Behaviour
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {template.responsiveBehavior.map((bp, i) => {
                    const colors = [
                      { bg: '#EFF6FF', border: '#BFDBFE', header: '#1E40AF' },
                      { bg: '#F5F3FF', border: '#DDD6FE', header: '#5B21B6' },
                      { bg: '#F0FDF4', border: '#BBF7D0', header: '#166534' },
                    ]
                    const c = colors[i] || colors[0]
                    return (
                      <div key={i} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: '8px', padding: '14px 18px' }}>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: c.header, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                          {bp.breakpoint}
                        </div>
                        <p style={{ fontSize: '14px', color: '#172B4D', lineHeight: '1.6', margin: 0 }}>
                          {bp.layout}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Page Composition */}
            {template.pageComposition && template.pageComposition.length > 0 && (
              <div style={{ marginTop: '40px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#172B4D', marginBottom: '14px' }}>
                  Page Composition
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {template.pageComposition.map((zone, i) => {
                    const palette = REGION_PALETTE[i % REGION_PALETTE.length]
                    return (
                      <div key={i} style={{
                        border: `1.5px solid ${palette.border}`, borderRadius: '8px',
                        padding: '16px 20px', backgroundColor: palette.bg,
                      }}>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: palette.text, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                          {zone.zone}
                        </div>
                        <p style={{ fontSize: '14px', color: '#172B4D', lineHeight: '1.6', marginBottom: '12px' }}>
                          {zone.description}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {zone.components.map(name => {
                            const comp = findComponent(name)
                            const slug = comp ? getComponentSlug(comp) : null
                            return slug ? (
                              <Link key={name} to={`/components/${slug}`} style={{
                                fontSize: '12px', padding: '3px 8px', borderRadius: '3px',
                                background: '#ffffff', border: '1px solid #DFE1E6',
                                color: '#0052CC', textDecoration: 'none', fontWeight: '500',
                              }}>
                                {name}
                              </Link>
                            ) : (
                              <span key={name} style={{
                                fontSize: '12px', padding: '3px 8px', borderRadius: '3px',
                                background: '#ffffff', border: '1px solid #DFE1E6', color: '#5E6C84',
                              }}>
                                {name}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </section>
        )}

        {activeTab === 'components' && (
          <section>
            <h2 style={{ marginBottom: '20px' }}>Components Used</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {template.components.map(name => {
                const comp = findComponent(name)
                const slug = comp ? getComponentSlug(comp) : null
                return slug ? (
                  <Link key={name} to={`/components/${slug}`} style={{
                    fontSize: '14px', padding: '8px 16px', borderRadius: '6px',
                    border: '1px solid #DFE1E6', color: '#0052CC',
                    textDecoration: 'none', fontWeight: '500', background: '#ffffff',
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

        {activeTab === 'rules' && (
          <section>
            <h2 style={{ marginBottom: '20px' }}>Rules</h2>
            {template.rules && template.rules.length > 0 ? (
              <div style={{ border: '1px solid #DFE1E6', borderRadius: '8px', overflow: 'hidden' }}>
                {template.rules.map((rule, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '12px',
                    padding: '14px 20px',
                    borderBottom: i < template.rules.length - 1 ? '1px solid #F4F5F7' : 'none',
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

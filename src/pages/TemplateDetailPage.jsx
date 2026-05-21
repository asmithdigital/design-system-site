import { useParams, Link } from 'react-router-dom'
import templatesData from '../../data/templates.json'
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

function LayoutWireframe({ regions }) {
  const REGION_COLORS = ['#BFDBFE', '#DDD6FE', '#BBF7D0', '#FDE68A', '#FECACA', '#E9D5FF']
  return (
    <div style={{
      background: '#F4F5F7',
      border: '1px solid #DFE1E6',
      borderRadius: 8,
      padding: 20,
      marginBottom: 40,
    }}>
      <p style={{ fontSize: 12, color: '#6B778C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
        Layout Regions
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {regions.map((region, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              height: i === 0 ? 32 : 24,
              borderRadius: 4,
              backgroundColor: REGION_COLORS[i % REGION_COLORS.length],
              flex: i === 1 ? '0 0 100px' : 1,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 8,
            }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#172B4D', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {region.split('(')[0].trim()}
              </span>
            </div>
            <span style={{ fontSize: 12, color: '#6B778C', flexShrink: 0 }}>
              {region.match(/\(([^)]+)\)/)?.[1] || ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TemplateDetailPage() {
  const { id } = useParams()
  const template = templatesData.templates.find(t => t.id === id)

  if (!template) {
    return (
      <div style={{ padding: '48px 0' }}>
        <p style={{ color: '#6B778C' }}>Template not found.</p>
      </div>
    )
  }

  const badge = PRODUCT_BADGE[template.product] || { bg: '#F4F5F7', color: '#42526E', border: '#DFE1E6', label: template.product }
  const changelog = [...(template.changelog || [])].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div>
      <nav style={{ fontSize: 13, color: '#6B778C', marginBottom: 20 }}>
        <Link to="/templates" style={{ color: '#0052CC' }}>Templates</Link>
        <span style={{ margin: '0 6px' }}>›</span>
        <span style={{ color: '#172B4D' }}>{template.name}</span>
      </nav>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#172B4D', lineHeight: 1.2, flex: 1 }}>
          {template.name}
        </h1>
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          padding: '4px 10px',
          borderRadius: 3,
          background: badge.bg,
          color: badge.color,
          border: `1px solid ${badge.border}`,
          flexShrink: 0,
          marginTop: 8,
        }}>
          {badge.label}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#6B778C', marginBottom: 36 }}>
        <span>{template.layout.regions.length} layout regions</span>
        <span>·</span>
        <span>{template.components.length} components</span>
        <span>·</span>
        <span>Max {template.layout.maxContentWidth}</span>
      </div>

      {/* Description */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#172B4D', marginBottom: 12 }}>Description</h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: '#42526E' }}>{template.description}</p>
      </section>

      {/* Layout wireframe */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#172B4D', marginBottom: 12 }}>Layout</h2>
        <LayoutWireframe regions={template.layout.regions} />
        {template.layout.responsive && (
          <div style={{ padding: '12px 16px', background: '#F4F5F7', borderRadius: 6, fontSize: 13, color: '#42526E', lineHeight: 1.6 }}>
            <strong style={{ color: '#172B4D' }}>Responsive:</strong> {template.layout.responsive}
          </div>
        )}
      </section>

      {/* Components Used */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#172B4D', marginBottom: 12 }}>Components Used</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {template.components.map(name => {
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

      {/* Rules */}
      {template.rules && template.rules.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#172B4D', marginBottom: 12 }}>Rules</h2>
          <div style={{ border: '1px solid #DFE1E6', borderRadius: 8, overflow: 'hidden' }}>
            {template.rules.map((rule, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '14px 20px',
                borderBottom: i < template.rules.length - 1 ? '1px solid #F4F5F7' : 'none',
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
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#172B4D', marginBottom: 12 }}>Changelog</h2>
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

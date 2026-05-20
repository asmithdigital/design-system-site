import { useParams } from 'react-router-dom'
import componentsData from '../../data/components.json'
import Breadcrumb from '../components/Breadcrumb.jsx'
import StatusBadge from '../components/StatusBadge.jsx'

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function getSlug(c) {
  return `${c.product}-${slugify(c.name)}`
}

const PRODUCT_BADGE = {
  'raa-web': { bg: '#FFFBEB', color: '#92400E', border: '#FCD34D', label: 'RAA Web' },
  'taskly':  { bg: '#EEF4FF', color: '#1A2B4A', border: '#2B7DE9', label: 'Taskly' },
}

const tableHeaderStyle = {
  background: '#f7f5ee',
  fontWeight: '600',
  textAlign: 'left',
  padding: '10px 14px',
  borderBottom: '2px solid #ddd8c8',
  fontSize: '14px',
}

const tableCellStyle = (i) => ({
  padding: '10px 14px',
  borderBottom: '1px solid #f0ede4',
  fontSize: '14px',
  backgroundColor: i % 2 === 1 ? '#fafaf8' : 'transparent',
})

export default function ComponentPage() {
  const { slug } = useParams()
  const component = componentsData.components.find(c => getSlug(c) === slug)

  if (!component) {
    return <div style={{ color: '#72706a', padding: '48px 0' }}>Component not found.</div>
  }

  const badge = PRODUCT_BADGE[component.product] || PRODUCT_BADGE['raa-web']

  return (
    <div>
      <Breadcrumb crumbs={[
        { label: 'Components', href: '/components' },
        { label: component.category },
        { label: component.name },
      ]} />

      <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#0f1f3d', marginBottom: '10px' }}>
        {component.name}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <StatusBadge status={component.status} />
        <span style={{
          fontSize: '12px',
          fontWeight: '600',
          padding: '3px 10px',
          borderRadius: '4px',
          background: badge.bg,
          color: badge.color,
          border: `1px solid ${badge.border}`,
        }}>
          {badge.label}
        </span>
        <span style={{ fontSize: '13px', color: '#72706a' }}>{component.category}</span>
      </div>

      <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#0f1f3d', marginBottom: '32px' }}>
        {component.description}
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid #ddd8c8', marginBottom: '32px' }} />

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px' }}>Variants</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px' }}>
        <thead>
          <tr>
            <th style={{ ...tableHeaderStyle, width: '30%' }}>Variant</th>
            <th style={tableHeaderStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          {component.variants.map((v, i) => (
            <tr key={i}>
              <td style={{ ...tableCellStyle(i), fontWeight: '500' }}>{v.name}</td>
              <td style={tableCellStyle(i)}>{v.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr style={{ border: 'none', borderTop: '1px solid #ddd8c8', marginBottom: '32px' }} />

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px' }}>Properties</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px' }}>
        <thead>
          <tr>
            <th style={{ ...tableHeaderStyle, width: '30%' }}>Property</th>
            <th style={tableHeaderStyle}>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(component.properties).map(([key, val], i) => (
            <tr key={key}>
              <td style={{ ...tableCellStyle(i), fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px' }}>{key}</td>
              <td style={{ ...tableCellStyle(i), fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px', color: '#0a6b54' }}>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr style={{ border: 'none', borderTop: '1px solid #ddd8c8', marginBottom: '32px' }} />

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Usage</h2>
      <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#0f1f3d', marginBottom: '32px' }}>
        {component.usage}
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid #ddd8c8', marginBottom: '32px' }} />

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Accessibility</h2>
      <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#0f1f3d', marginBottom: '32px' }}>
        {component.accessibility}
      </p>
    </div>
  )
}

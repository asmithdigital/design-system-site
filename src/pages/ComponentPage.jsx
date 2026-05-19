import { useParams, Link } from 'react-router-dom'
import componentsData from '../../data/components.json'
import Breadcrumb from '../components/Breadcrumb.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

function getTokenHref(token) {
  if (token.startsWith('color-')) return '/tokens/colours'
  if (token.startsWith('spacing-')) return '/tokens/spacing'
  if (token.startsWith('heading-') || token === 'body' || token === 'caption' || token === 'code') return '/tokens/typography'
  return '/tokens/colours'
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
  const { id } = useParams()
  const component = componentsData.components.find((c) => c.id === id)

  if (!component) {
    return <div style={{ color: '#72706a' }}>Component not found.</div>
  }

  return (
    <div>
      <Breadcrumb crumbs={[
        { label: 'Components' },
        { label: component.subcategory },
        { label: component.name },
      ]} />

      <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#0f1f3d', marginBottom: '10px' }}>
        {component.name}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <StatusBadge status={component.status} />
        <span style={{ fontSize: '13px', color: '#72706a' }}>
          Last updated {component.lastUpdated}
        </span>
      </div>

      <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#0f1f3d', marginBottom: '32px' }}>
        {component.description}
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid #ddd8c8', marginBottom: '32px' }} />

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px' }}>Preview</h2>
      <div style={{
        background: '#f0ede4',
        border: '1px solid #ddd8c8',
        borderRadius: '10px',
        padding: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '32px',
        minHeight: '120px',
      }}>
        <img
          src={`/design-system-site/images/${component.id}.png`}
          alt={`${component.name} component preview`}
          style={{ maxWidth: '100%', maxHeight: '320px', objectFit: 'contain' }}
        />
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #ddd8c8', marginBottom: '32px' }} />

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px' }}>Variants</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginBottom: '32px' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Variant</th>
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
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginBottom: '32px' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Property</th>
            <th style={tableHeaderStyle}>Type</th>
            <th style={tableHeaderStyle}>Required</th>
            <th style={tableHeaderStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          {component.properties.map((p, i) => (
            <tr key={i}>
              <td style={{ ...tableCellStyle(i), fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px' }}>{p.name}</td>
              <td style={{ ...tableCellStyle(i), fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px', color: '#0a6b54' }}>{p.type}</td>
              <td style={{ ...tableCellStyle(i), color: p.required ? '#0a6b54' : '#72706a' }}>
                {p.required ? '✓' : '—'}
              </td>
              <td style={tableCellStyle(i)}>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr style={{ border: 'none', borderTop: '1px solid #ddd8c8', marginBottom: '32px' }} />

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px' }}>Tokens Used</h2>
      <div style={{ marginBottom: '32px', display: 'flex', flexWrap: 'wrap' }}>
        {component.tokens.map((token) => (
          <Link
            key={token}
            to={getTokenHref(token)}
            style={{
              display: 'inline-block',
              background: '#f0ede4',
              border: '1px solid #ddd8c8',
              borderRadius: '4px',
              padding: '4px 10px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: '#0f1f3d',
              textDecoration: 'none',
              marginRight: '6px',
              marginBottom: '6px',
            }}
          >
            {token}
          </Link>
        ))}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #ddd8c8', marginBottom: '32px' }} />

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px' }}>Usage Guidelines</h2>
      <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: '#0a6b54', marginBottom: '12px' }}>
            Do
          </div>
          {component.usage.do.map((item, i) => (
            <div key={i} style={{
              borderLeft: '3px solid #0a6b54',
              paddingLeft: '12px',
              marginBottom: '8px',
              fontSize: '14px',
              lineHeight: '1.5',
            }}>
              {item}
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: '#8a2020', marginBottom: '12px' }}>
            Don't
          </div>
          {component.usage.dont.map((item, i) => (
            <div key={i} style={{
              borderLeft: '3px solid #8a2020',
              paddingLeft: '12px',
              marginBottom: '8px',
              fontSize: '14px',
              lineHeight: '1.5',
            }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #ddd8c8', marginBottom: '32px' }} />

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px' }}>Code Snippet</h2>
      <CodeBlock code={component.codeSnippet} />
    </div>
  )
}

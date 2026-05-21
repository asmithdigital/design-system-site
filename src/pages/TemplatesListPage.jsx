import { Link } from 'react-router-dom'
import templatesData from '../../data/templates.json'

const PRODUCT_BADGE = {
  'quote-to-buy': { bg: '#FFFAE6', color: '#7A4F00', border: '#FFD100', label: 'Quote to Buy' },
  'my-account':   { bg: '#E3FCEF', color: '#006644', border: '#79F2C0', label: 'My Account' },
}

export default function TemplatesListPage() {
  return (
    <div>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: '#172B4D', marginBottom: 12, lineHeight: 1.2 }}>
        Templates
      </h1>
      <p style={{ fontSize: 16, color: '#6B778C', marginBottom: 40, lineHeight: 1.7 }}>
        Full page layout templates for product flows. Use these as starting points for new screens.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {templatesData.templates.map(template => {
          const badge = PRODUCT_BADGE[template.product] || { bg: '#F4F5F7', color: '#42526E', border: '#DFE1E6', label: template.product }
          return (
            <Link
              key={template.id}
              to={`/templates/${template.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #DFE1E6',
                  borderRadius: 8,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.15s, border-color 0.15s',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,82,204,0.1)'
                  e.currentTarget.style.borderColor = '#4C9AFF'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = '#DFE1E6'
                }}
              >
                {/* Wireframe thumbnail */}
                <div style={{
                  background: '#F4F5F7',
                  padding: '16px',
                  borderBottom: '1px solid #DFE1E6',
                  height: 100,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}>
                  {template.layout.regions.slice(0, 4).map((region, i) => (
                    <div key={i} style={{
                      height: i === 0 ? 18 : 12,
                      borderRadius: 3,
                      background: i === 0 ? '#DFE1E6' : '#E8EAED',
                      width: i % 2 === 0 ? '100%' : '65%',
                    }} />
                  ))}
                </div>

                <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: '#172B4D', lineHeight: 1.3 }}>{template.name}</h3>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: 3,
                      background: badge.bg,
                      color: badge.color,
                      border: `1px solid ${badge.border}`,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}>
                      {badge.label}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#6B778C', marginBottom: 10 }}>
                    <span>{template.layout.regions.length} regions</span>
                    <span>{template.components.length} components</span>
                  </div>

                  <p style={{ fontSize: 13, color: '#6B778C', lineHeight: 1.6, flex: 1, marginBottom: 14 }}>
                    {template.description.length > 100 ? template.description.slice(0, 100) + '…' : template.description}
                  </p>

                  <span style={{ fontSize: 13, color: '#0052CC', fontWeight: 500 }}>View template →</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

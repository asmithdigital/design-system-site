import { useSearchParams, Link } from 'react-router-dom'
import componentsData from '../../data/components.json'
import foundationsData from '../../data/foundations.json'
import tokensData from '../../data/tokens.json'

function truncate(text, max) {
  if (!text) return ''
  if (text.length <= max) return text
  return text.slice(0, max) + '…'
}

function buildResults(query) {
  const q = query.toLowerCase()
  const results = []

  componentsData.components.forEach((c) => {
    if (c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) {
      results.push({
        name: c.name,
        href: `/components/${c.id}`,
        type: 'Component',
        description: c.description,
      })
    }
  })

  foundationsData.foundations.forEach((f) => {
    if (f.title.toLowerCase().includes(q) || f.content.toLowerCase().includes(q)) {
      results.push({
        name: f.title,
        href: `/foundations/${f.id}`,
        type: 'Foundation',
        description: f.content,
      })
    }
  })

  const allTokens = [
    ...tokensData.colors.map((t) => ({ ...t, href: '/tokens/colours' })),
    ...tokensData.typography.map((t) => ({ ...t, href: '/tokens/typography', description: t.usage })),
    ...tokensData.spacing.map((t) => ({ ...t, href: '/tokens/spacing', description: t.usage })),
  ]

  allTokens.forEach((t) => {
    const desc = t.usage || t.description || ''
    if (t.name.toLowerCase().includes(q) || desc.toLowerCase().includes(q)) {
      results.push({
        name: t.name,
        href: t.href,
        type: 'Token',
        description: desc,
      })
    }
  })

  return results
}

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const results = query ? buildResults(query) : []

  return (
    <div>
      <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '24px', color: '#0f1f3d' }}>
        Results for '{query}'
      </h2>

      {results.length === 0 ? (
        <div style={{ color: '#72706a', fontSize: '16px', textAlign: 'center', marginTop: '48px' }}>
          No results for '{query}'
        </div>
      ) : (
        results.map((result, i) => (
          <div key={i} style={{
            background: '#ffffff',
            border: '1px solid #ddd8c8',
            borderRadius: '10px',
            padding: '16px 20px',
            marginBottom: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <Link to={result.href} style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#0f1f3d',
                textDecoration: 'none',
              }}>
                {result.name}
              </Link>
              <span style={{
                background: '#f0ede4',
                fontSize: '11px',
                color: '#72706a',
                padding: '2px 8px',
                borderRadius: '4px',
              }}>
                {result.type}
              </span>
            </div>
            <div style={{ fontSize: '14px', color: '#72706a', lineHeight: '1.5' }}>
              {truncate(result.description, 120)}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

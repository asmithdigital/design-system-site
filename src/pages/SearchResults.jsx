import { useSearchParams, Link } from 'react-router-dom'
import componentsData from '../../data/components.json'
import foundationsData from '../../data/foundations.json'
import tokensData from '../../data/tokens.json'

function truncate(text, max) {
  if (!text) return ''
  if (text.length <= max) return text
  return text.slice(0, max) + '…'
}

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function getComponentSlug(c) {
  return `${c.product}-${slugify(c.name)}`
}

const PRODUCT_LABELS = { 'raa-web': 'RAA Web', 'taskly': 'Taskly' }

function buildResults(query) {
  const q = query.toLowerCase()
  const results = []

  componentsData.components.forEach(c => {
    if (c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) {
      results.push({
        name: c.name,
        href: `/components/${getComponentSlug(c)}`,
        type: 'Component',
        description: c.description,
        product: PRODUCT_LABELS[c.product],
      })
    }
  })

  foundationsData.products.forEach(product => {
    const allText = JSON.stringify(product.foundations).toLowerCase()
    if (product.name.toLowerCase().includes(q) || allText.includes(q)) {
      results.push({
        name: `${product.name} — Foundations`,
        href: '/foundations',
        type: 'Foundation',
        description: `Layout, accessibility, and patterns for ${product.name}`,
        product: product.name,
      })
    }
  })

  const seenTokens = new Set()
  tokensData.products.forEach(product => {
    Object.entries(product.tokens.colors).forEach(([name, t]) => {
      const key = `color|${name}`
      if (!seenTokens.has(key) && (name.toLowerCase().includes(q) || (t.usage || '').toLowerCase().includes(q))) {
        seenTokens.add(key)
        results.push({ name, href: '/tokens/colours', type: 'Token', description: t.usage, product: product.name })
      }
    })
    Object.entries(product.tokens.typography).forEach(([name, t]) => {
      const key = `type|${name}|${product.id}`
      if (!seenTokens.has(key) && (name.toLowerCase().includes(q) || (t.usage || '').toLowerCase().includes(q))) {
        seenTokens.add(key)
        results.push({ name, href: '/tokens/typography', type: 'Token', description: t.usage, product: product.name })
      }
    })
    Object.entries(product.tokens.spacing).forEach(([name, value]) => {
      const key = `spacing|${name}|${product.id}`
      if (!seenTokens.has(key) && (name.toLowerCase().includes(q) || value.toLowerCase().includes(q))) {
        seenTokens.add(key)
        results.push({ name, href: '/tokens/spacing', type: 'Token', description: value, product: product.name })
      }
    })
  })

  return results
}

const TYPE_BADGE = {
  Component: { bg: '#e8f4f0', color: '#0a6b54' },
  Foundation: { bg: '#f0ede4', color: '#72706a' },
  Token: { bg: '#f0f0ff', color: '#4040a0' },
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
        results.map((result, i) => {
          const typeBadge = TYPE_BADGE[result.type] || TYPE_BADGE.Token
          return (
            <div key={i} style={{
              background: '#ffffff',
              border: '1px solid #ddd8c8',
              borderRadius: '10px',
              padding: '16px 20px',
              marginBottom: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                <Link to={result.href} style={{ fontSize: '16px', fontWeight: '600', color: '#0f1f3d', textDecoration: 'none' }}>
                  {result.name}
                </Link>
                <span style={{
                  background: typeBadge.bg,
                  fontSize: '11px',
                  color: typeBadge.color,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: '600',
                }}>
                  {result.type}
                </span>
                {result.product && (
                  <span style={{
                    background: '#f7f5ee',
                    fontSize: '11px',
                    color: '#72706a',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}>
                    {result.product}
                  </span>
                )}
              </div>
              <div style={{ fontSize: '14px', color: '#72706a', lineHeight: '1.5' }}>
                {truncate(result.description, 120)}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

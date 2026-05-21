import { useSearchParams, Link } from 'react-router-dom'
import componentsData from '../../data/components.json'
import foundationsData from '../../data/foundations.json'
import tokensData from '../../data/tokens.json'
import patternsData from '../../data/patterns.json'
import templatesData from '../../data/templates.json'

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

  patternsData.patterns.forEach(p => {
    if (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.components.some(c => c.toLowerCase().includes(q)) ||
      (p.rules || []).some(r => r.toLowerCase().includes(q))
    ) {
      results.push({
        name: p.name,
        href: `/patterns/${p.id}`,
        type: 'Pattern',
        description: p.description,
        product: p.scope === 'cross-product' ? 'Cross-product' : p.products.join(', '),
      })
    }
  })

  templatesData.templates.forEach(t => {
    if (
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.components.some(c => c.toLowerCase().includes(q))
    ) {
      results.push({
        name: t.name,
        href: `/templates/${t.id}`,
        type: 'Template',
        description: t.description,
        product: t.product.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
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
  Component: { bg: '#EAF0FF', color: '#0747A6' },
  Pattern:   { bg: '#F3F0FF', color: '#5B21B6' },
  Template:  { bg: '#E3FCEF', color: '#006644' },
  Foundation:{ bg: '#F4F5F7', color: '#42526E' },
  Token:     { bg: '#FFF0B3', color: '#5E4701' },
}

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const results = query ? buildResults(query) : []

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: '#172B4D', marginBottom: 24, lineHeight: 1.2 }}>
        {query ? `Results for "${query}"` : 'Search'}
      </h1>

      {query && results.length === 0 ? (
        <div style={{ color: '#6B778C', fontSize: 15, marginTop: 32 }}>
          No results for "{query}"
        </div>
      ) : (
        results.map((result, i) => {
          const typeBadge = TYPE_BADGE[result.type] || TYPE_BADGE.Token
          return (
            <div key={i} style={{
              background: '#ffffff',
              border: '1px solid #DFE1E6',
              borderRadius: 8,
              padding: '16px 20px',
              marginBottom: 10,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                <Link to={result.href} style={{ fontSize: 15, fontWeight: 600, color: '#0052CC', textDecoration: 'none' }}>
                  {result.name}
                </Link>
                <span style={{
                  background: typeBadge.bg,
                  fontSize: 11,
                  color: typeBadge.color,
                  padding: '2px 8px',
                  borderRadius: 3,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>
                  {result.type}
                </span>
                {result.product && (
                  <span style={{
                    background: '#F4F5F7',
                    fontSize: 11,
                    color: '#6B778C',
                    padding: '2px 8px',
                    borderRadius: 3,
                  }}>
                    {result.product}
                  </span>
                )}
              </div>
              <div style={{ fontSize: 13, color: '#6B778C', lineHeight: 1.6 }}>
                {truncate(result.description, 140)}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

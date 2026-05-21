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

const TYPE_BADGE = {
  added:   { bg: '#E3FCEF', color: '#006644', label: 'Added' },
  changed: { bg: '#EAF0FF', color: '#0747A6', label: 'Changed' },
  fixed:   { bg: '#FFF0B3', color: '#5E4701', label: 'Fixed' },
  removed: { bg: '#FFEBE6', color: '#BF2600', label: 'Removed' },
}

function buildAllChangelogs() {
  const entries = []

  componentsData.components.forEach(c => {
    if (c.changelog) {
      c.changelog.forEach(entry => {
        entries.push({
          date: entry.date,
          type: entry.type,
          description: entry.description,
          itemName: c.name,
          itemType: 'Component',
          href: `/components/${getComponentSlug(c)}`,
        })
      })
    }
  })

  patternsData.patterns.forEach(p => {
    if (p.changelog) {
      p.changelog.forEach(entry => {
        entries.push({
          date: entry.date,
          type: entry.type,
          description: entry.description,
          itemName: p.name,
          itemType: 'Pattern',
          href: `/patterns/${p.id}`,
        })
      })
    }
  })

  templatesData.templates.forEach(t => {
    if (t.changelog) {
      t.changelog.forEach(entry => {
        entries.push({
          date: entry.date,
          type: entry.type,
          description: entry.description,
          itemName: t.name,
          itemType: 'Template',
          href: `/templates/${t.id}`,
        })
      })
    }
  })

  return entries.sort((a, b) => b.date.localeCompare(a.date))
}

function groupByMonth(entries) {
  const months = {}
  entries.forEach(entry => {
    const d = new Date(entry.date + 'T00:00:00')
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = d.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })
    if (!months[key]) months[key] = { label, entries: [] }
    months[key].entries.push(entry)
  })
  return Object.entries(months).sort((a, b) => b[0].localeCompare(a[0])).map(([, v]) => v)
}

const ITEM_TYPE_STYLE = {
  Component: { bg: '#F4F5F7', color: '#42526E' },
  Pattern:   { bg: '#EAF0FF', color: '#0747A6' },
  Template:  { bg: '#E3FCEF', color: '#006644' },
}

export default function WhatsNewPage() {
  const allEntries = buildAllChangelogs()
  const grouped = groupByMonth(allEntries)

  return (
    <div>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: '#172B4D', marginBottom: 12, lineHeight: 1.2 }}>
        What's New
      </h1>
      <p style={{ fontSize: 16, color: '#6B778C', marginBottom: 48, lineHeight: 1.7 }}>
        All changes across components, patterns, and templates — sorted newest first.
      </p>

      {grouped.map(month => (
        <div key={month.label} style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#172B4D', marginBottom: 16, paddingBottom: 12, borderBottom: '2px solid #DFE1E6' }}>
            {month.label}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {month.entries.map((entry, i) => {
              const typeBadge = TYPE_BADGE[entry.type] || TYPE_BADGE.added
              const itemStyle = ITEM_TYPE_STYLE[entry.itemType] || ITEM_TYPE_STYLE.Component
              return (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  padding: '14px 0',
                  borderBottom: i < month.entries.length - 1 ? '1px solid #F4F5F7' : 'none',
                }}>
                  <span style={{ fontSize: 13, color: '#97A0AF', whiteSpace: 'nowrap', minWidth: 84, paddingTop: 2 }}>
                    {new Date(entry.date + 'T00:00:00').toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                  </span>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 3,
                    background: typeBadge.bg,
                    color: typeBadge.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    marginTop: 1,
                  }}>
                    {typeBadge.label}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                      <Link to={entry.href} style={{ fontSize: 14, fontWeight: 600, color: '#0052CC', textDecoration: 'none' }}>
                        {entry.itemName}
                      </Link>
                      <span style={{
                        fontSize: 11,
                        padding: '2px 7px',
                        borderRadius: 3,
                        background: itemStyle.bg,
                        color: itemStyle.color,
                        fontWeight: 600,
                      }}>
                        {entry.itemType}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: '#42526E', lineHeight: 1.5, margin: 0 }}>
                      {entry.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {allEntries.length === 0 && (
        <p style={{ color: '#6B778C', textAlign: 'center', marginTop: 48 }}>No changelog entries found.</p>
      )}
    </div>
  )
}

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import componentsData from '../../data/components.json'
import StatusBadge from '../components/StatusBadge.jsx'
import ComponentPreview from '../components/ComponentPreview.jsx'

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function getSlug(c) {
  return `${c.product}-${slugify(c.name)}`
}

const PRODUCT_BADGE = {
  'raa-web': { bg: '#FFFAE6', color: '#7A4F00', border: '#FFD100', label: 'RAA Web' },
  'taskly':  { bg: '#EAF0FF', color: '#0747A6', border: '#4C9AFF', label: 'Taskly' },
}

const TYPE_BADGE = {
  added:   { bg: '#E3FCEF', color: '#006644' },
  changed: { bg: '#EAF0FF', color: '#0747A6' },
  fixed:   { bg: '#FFF0B3', color: '#5E4701' },
  removed: { bg: '#FFEBE6', color: '#BF2600' },
}

const TABS = [
  { id: 'overview',    label: 'Overview' },
  { id: 'variants',   label: 'Variants' },
  { id: 'properties', label: 'Properties' },
  { id: 'usage',      label: 'Usage' },
  { id: 'code',       label: 'Code' },
  { id: 'changelog',  label: 'Changelog' },
]

const TAB_SECTIONS = {
  overview:    [{ id: 'description', label: 'Description' }, { id: 'preview', label: 'Preview' }, { id: 'accessibility', label: 'Accessibility' }],
  variants:    [{ id: 'variants', label: 'Variants' }],
  properties:  [{ id: 'properties', label: 'Properties' }],
  usage:       [{ id: 'usage-guidelines', label: 'Usage Guidelines' }],
  code:        [{ id: 'code-source', label: 'Source' }, { id: 'code-import', label: 'Import' }],
  changelog:   [{ id: 'changelog', label: 'Changelog' }],
}

function TableOfContents({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id)

  useEffect(() => {
    setActiveId(sections[0]?.id)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-10% 0px -60% 0px', threshold: 0.1 }
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  return (
    <div style={{ position: 'sticky', top: 24 }}>
      <p style={{
        fontSize: '11px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: '#6B778C',
        marginBottom: '10px',
      }}>
        On this page
      </p>
      {sections.map(s => (
        <a
          key={s.id}
          href={`#${s.id}`}
          onClick={e => {
            e.preventDefault()
            const el = document.getElementById(s.id)
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setActiveId(s.id)
          }}
          style={{
            display: 'block',
            fontSize: '13px',
            padding: '4px 0 4px 10px',
            color: activeId === s.id ? '#0052CC' : '#6B778C',
            fontWeight: activeId === s.id ? '600' : '400',
            textDecoration: 'none',
            borderLeft: `2px solid ${activeId === s.id ? '#0052CC' : '#DFE1E6'}`,
            marginBottom: 2,
            transition: 'color 0.1s, border-color 0.1s',
          }}
        >
          {s.label}
        </a>
      ))}
    </div>
  )
}

const cellBase = {
  padding: '12px 16px',
  fontSize: '14px',
  borderBottom: '1px solid #F4F5F7',
  verticalAlign: 'top',
}

export default function ComponentPage() {
  const { slug } = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [codeSource, setCodeSource] = useState(null)
  const [codeLoading, setCodeLoading] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)
  const component = componentsData.components.find(c => getSlug(c) === slug)

  useEffect(() => {
    if (activeTab !== 'code' || !component?.codeFile || codeSource !== null) return
    setCodeLoading(true)
    fetch(import.meta.env.BASE_URL + component.codeFile)
      .then(r => r.ok ? r.text() : Promise.reject(r.status))
      .then(text => setCodeSource(text))
      .catch(() => setCodeSource('// Source file not found.'))
      .finally(() => setCodeLoading(false))
  }, [activeTab, component])

  function handleCopy() {
    if (!codeSource) return
    navigator.clipboard.writeText(codeSource).then(() => {
      setCodeCopied(true)
      setTimeout(() => setCodeCopied(false), 2000)
    })
  }

  if (!component) {
    return (
      <div style={{ padding: '48px 40px', maxWidth: 720, margin: '0 auto' }}>
        <p style={{ color: '#6B778C' }}>Component not found.</p>
      </div>
    )
  }

  const badge = PRODUCT_BADGE[component.product] || PRODUCT_BADGE['raa-web']
  const changelog = [...(component.changelog || [])].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div style={{ display: 'flex', gap: 0 }}>
      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0, maxWidth: 720, padding: '40px 40px 80px' }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: '13px', color: '#6B778C', marginBottom: '20px' }}>
          <Link to="/components" style={{ color: '#0052CC' }}>Components</Link>
          <span style={{ margin: '0 6px' }}>›</span>
          <span>{component.category}</span>
          <span style={{ margin: '0 6px' }}>›</span>
          <span style={{ color: '#172B4D' }}>{component.name}</span>
        </nav>

        {/* Heading */}
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#172B4D', marginBottom: '12px', lineHeight: 1.2 }}>
          {component.name}
        </h1>

        {/* Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <StatusBadge status={component.status} />
          <span style={{
            fontSize: '12px',
            fontWeight: '600',
            padding: '3px 10px',
            borderRadius: '3px',
            background: badge.bg,
            color: badge.color,
            border: `1px solid ${badge.border}`,
          }}>
            {badge.label}
          </span>
          <span style={{ fontSize: '13px', color: '#6B778C' }}>{component.category}</span>
        </div>

        {/* Tab bar */}
        <div style={{
          display: 'flex',
          borderBottom: '2px solid #DFE1E6',
          marginBottom: '36px',
          gap: 0,
        }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '10px 16px',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? '600' : '400',
                color: activeTab === tab.id ? '#0052CC' : '#6B778C',
                borderBottom: activeTab === tab.id ? '2px solid #0052CC' : '2px solid transparent',
                marginBottom: '-2px',
                transition: 'color 0.1s',
                fontFamily: 'inherit',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'overview' && (
          <div>
            <section id="description" style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Description</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#172B4D' }}>
                {component.description}
              </p>
            </section>

            <section id="preview" style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Preview</h2>
              <ComponentPreview component={component} />
            </section>

            <section id="accessibility">
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Accessibility</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#172B4D' }}>
                {component.accessibility}
              </p>
            </section>
          </div>
        )}

        {activeTab === 'variants' && (
          <div>
            <section id="variants">
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Variants</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F4F5F7' }}>
                    <th style={{ ...cellBase, fontWeight: '600', fontSize: '13px', color: '#6B778C', textAlign: 'left', width: '35%', borderBottom: '2px solid #DFE1E6' }}>Variant</th>
                    <th style={{ ...cellBase, fontWeight: '600', fontSize: '13px', color: '#6B778C', textAlign: 'left', borderBottom: '2px solid #DFE1E6' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {component.variants.map((v, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 1 ? '#FAFBFC' : '#ffffff' }}>
                      <td style={{ ...cellBase, fontWeight: '500', color: '#172B4D' }}>{v.name}</td>
                      <td style={{ ...cellBase, color: '#42526E' }}>{v.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        )}

        {activeTab === 'properties' && (
          <div>
            <section id="properties">
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Properties</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F4F5F7' }}>
                    <th style={{ ...cellBase, fontWeight: '600', fontSize: '13px', color: '#6B778C', textAlign: 'left', width: '40%', borderBottom: '2px solid #DFE1E6' }}>Property</th>
                    <th style={{ ...cellBase, fontWeight: '600', fontSize: '13px', color: '#6B778C', textAlign: 'left', borderBottom: '2px solid #DFE1E6' }}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(component.properties).map(([key, val], i) => (
                    <tr key={key} style={{ backgroundColor: i % 2 === 1 ? '#FAFBFC' : '#ffffff' }}>
                      <td style={{ ...cellBase }}>
                        <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px', color: '#172B4D', background: '#F4F5F7', padding: '2px 6px', borderRadius: 3 }}>{key}</code>
                      </td>
                      <td style={{ ...cellBase }}>
                        <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px', color: '#0052CC' }}>{val}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        )}

        {activeTab === 'usage' && (
          <div>
            <section id="usage-guidelines">
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Usage Guidelines</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#172B4D' }}>
                {component.usage}
              </p>
              {component.usedIn && component.usedIn.length > 0 && (
                <div style={{ marginTop: '32px' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: '600', marginBottom: '10px', color: '#6B778C', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Used in</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {component.usedIn.map(product => (
                      <span key={product} style={{
                        fontSize: '13px',
                        padding: '4px 10px',
                        borderRadius: '3px',
                        background: '#F4F5F7',
                        color: '#42526E',
                        border: '1px solid #DFE1E6',
                      }}>
                        {product.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'code' && (
          <div>
            <section id="code-source" style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Source</h2>
                <button
                  onClick={handleCopy}
                  disabled={!codeSource || codeLoading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    fontSize: '13px',
                    fontWeight: '500',
                    backgroundColor: codeCopied ? '#E3FCEF' : '#F4F5F7',
                    color: codeCopied ? '#006644' : '#42526E',
                    border: '1px solid',
                    borderColor: codeCopied ? '#ABF5D1' : '#DFE1E6',
                    borderRadius: '4px',
                    cursor: codeSource ? 'pointer' : 'default',
                    fontFamily: 'inherit',
                    transition: 'background-color 0.15s',
                  }}
                >
                  {codeCopied ? '✓ Copied' : 'Copy'}
                </button>
              </div>

              {codeLoading && (
                <div style={{ padding: '32px', textAlign: 'center', color: '#6B778C', fontSize: '14px' }}>
                  Loading source…
                </div>
              )}

              {!codeLoading && codeSource && (
                <div style={{
                  backgroundColor: '#1E2030',
                  borderRadius: '6px',
                  overflow: 'auto',
                  maxHeight: '600px',
                }}>
                  <pre style={{
                    margin: 0,
                    padding: '20px 24px',
                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                    fontSize: '12.5px',
                    lineHeight: '1.7',
                    color: '#CDD6F4',
                    whiteSpace: 'pre',
                    overflowX: 'auto',
                  }}>
                    <code>{codeSource}</code>
                  </pre>
                </div>
              )}

              {!codeLoading && !codeSource && (
                <p style={{ color: '#6B778C', fontSize: '14px' }}>No source file available for this component.</p>
              )}
            </section>

            <section id="code-import">
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Import</h2>
              {component.codeFile ? (
                <div>
                  <p style={{ fontSize: '14px', color: '#42526E', marginBottom: '12px', lineHeight: '1.6' }}>
                    Copy the source file into your project, then import it using the path below.
                  </p>
                  <div style={{
                    backgroundColor: '#F4F5F7',
                    borderRadius: '4px',
                    padding: '12px 16px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '13px',
                    color: '#172B4D',
                  }}>
                    {`import { ${component.name.replace(/\s+/g, '')} } from './${component.codeFile.split('/').pop().replace('.jsx', '')}'`}
                  </div>
                  <p style={{ fontSize: '13px', color: '#6B778C', marginTop: '10px' }}>
                    File: <code style={{ fontSize: '12px', color: '#0052CC' }}>{component.codeFile}</code>
                  </p>
                </div>
              ) : (
                <p style={{ fontSize: '14px', color: '#6B778C' }}>Import path not available.</p>
              )}
            </section>
          </div>
        )}

        {activeTab === 'changelog' && (
          <div>
            <section id="changelog">
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Changelog</h2>
              {changelog.length === 0 ? (
                <p style={{ color: '#6B778C' }}>No changelog entries.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {changelog.map((entry, i) => {
                    const typeBadge = TYPE_BADGE[entry.type] || TYPE_BADGE.added
                    return (
                      <div key={i} style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'flex-start',
                        padding: '14px 0',
                        borderBottom: i < changelog.length - 1 ? '1px solid #F4F5F7' : 'none',
                      }}>
                        <span style={{ fontSize: '13px', color: '#6B778C', whiteSpace: 'nowrap', minWidth: '90px' }}>
                          {entry.date}
                        </span>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '2px 8px',
                          borderRadius: '3px',
                          background: typeBadge.bg,
                          color: typeBadge.color,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                        }}>
                          {entry.type}
                        </span>
                        <span style={{ fontSize: '14px', color: '#172B4D', lineHeight: '1.5' }}>
                          {entry.description}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </section>
          </div>
        )}
      </div>

      {/* Right TOC */}
      <div style={{
        width: 200,
        flexShrink: 0,
        padding: '40px 24px 80px 0',
        display: 'none',
      }} className="toc-column">
        <TableOfContents sections={TAB_SECTIONS[activeTab] || []} />
      </div>

      <style>{`
        @media (min-width: 1100px) {
          .toc-column { display: block !important; }
        }
      `}</style>
    </div>
  )
}

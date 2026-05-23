import { useState, useEffect } from 'react'
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
  overview:    [
    { id: 'description',   label: 'Description' },
    { id: 'preview',       label: 'Preview' },
    { id: 'states',        label: 'States' },
    { id: 'anatomy',       label: 'Anatomy' },
    { id: 'accessibility', label: 'Accessibility' },
  ],
  variants:    [{ id: 'variants', label: 'Variants' }],
  properties:  [{ id: 'properties', label: 'Properties' }],
  usage:       [
    { id: 'usage-guidelines', label: 'Usage Guidelines' },
    { id: 'dos-donts',        label: "Do's & Don'ts" },
  ],
  code:        [{ id: 'code-source', label: 'Source' }, { id: 'code-import', label: 'Import' }],
  changelog:   [{ id: 'changelog', label: 'Changelog' }],
}

// ─── Helpers for state card display ──────────────────────────────────────────

function parseBorderCss(borderStr) {
  if (!borderStr || borderStr === 'none' || borderStr === 'n/a') return 'none'
  const first = borderStr.split(/\s*\+\s*/)[0].trim()
  if (/^box-shadow/.test(first)) return 'none'
  const clean = first.replace(/\([^)]*\)/g, '').trim()
  return clean || 'none'
}

function parseBgCss(bgStr) {
  if (!bgStr || bgStr === 'n/a' || bgStr === 'Varies' || bgStr === 'transparent') return '#F4F5F7'
  return bgStr.replace(/\([^)]*\)/g, '').trim() || '#F4F5F7'
}

function parseTextCss(tc) {
  if (!tc || tc === 'n/a' || tc === 'Varies') return '#5E6C84'
  return tc.split(' ')[0]
}

// ─── Syntax Highlighter ──────────────────────────────────────────────────────

const KEYWORDS = new Set(['import','from','export','default','return','const','let','var','function','if','else','new','typeof','instanceof','class','extends','this','super','switch','case','break','continue','for','while','do','try','catch','finally','throw','yield','async','await','of','in'])
const BOOLEANS = new Set(['true','false','null','undefined','NaN'])

function tokenize(code) {
  const tokens = []
  let i = 0
  while (i < code.length) {
    if (code[i] === '/' && code[i+1] === '*') {
      const end = code.indexOf('*/', i + 2)
      const text = end === -1 ? code.slice(i) : code.slice(i, end + 2)
      tokens.push({ type: 'comment', text }); i += text.length; continue
    }
    if (code[i] === '/' && code[i+1] === '/') {
      const end = code.indexOf('\n', i)
      const text = end === -1 ? code.slice(i) : code.slice(i, end)
      tokens.push({ type: 'comment', text }); i += text.length; continue
    }
    if (code[i] === '`') {
      let j = i + 1
      while (j < code.length && code[j] !== '`') { if (code[j] === '\\') j++; j++ }
      tokens.push({ type: 'string', text: code.slice(i, j + 1) }); i = j + 1; continue
    }
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i]; let j = i + 1
      while (j < code.length && code[j] !== q && code[j] !== '\n') { if (code[j] === '\\') j++; j++ }
      tokens.push({ type: 'string', text: code.slice(i, j + 1) }); i = j + 1; continue
    }
    if (code[i] === '/' && code[i+1] === '>') {
      tokens.push({ type: 'jsx', text: '/>' }); i += 2; continue
    }
    if (code[i] === '<') {
      let j = i + 1
      const isClose = code[j] === '/'
      if (isClose) j++
      if (j < code.length && /[a-zA-Z]/.test(code[j])) {
        tokens.push({ type: 'jsx', text: code.slice(i, j) })
        i = j
        let k = i
        while (k < code.length && /[a-zA-Z0-9_.]/.test(code[k])) k++
        tokens.push({ type: 'jsx-tag', text: code.slice(i, k) }); i = k; continue
      }
    }
    if (/[0-9]/.test(code[i]) && (i === 0 || /[^a-zA-Z_$]/.test(code[i-1]))) {
      let j = i
      while (j < code.length && /[0-9.xa-fA-F]/.test(code[j])) j++
      tokens.push({ type: 'number', text: code.slice(i, j) }); i = j; continue
    }
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++
      const word = code.slice(i, j)
      const type = KEYWORDS.has(word) ? 'keyword' : BOOLEANS.has(word) ? 'boolean' : 'ident'
      tokens.push({ type, text: word }); i = j; continue
    }
    tokens.push({ type: 'other', text: code[i] }); i++
  }
  return tokens
}

const TOKEN_STYLE = {
  keyword:   { color: '#0052CC', fontWeight: '600' },
  boolean:   { color: '#BF2600' },
  number:    { color: '#BF2600' },
  string:    { color: '#36B37E' },
  comment:   { color: '#8993A4', fontStyle: 'italic' },
  jsx:       { color: '#6554C0' },
  'jsx-tag': { color: '#6554C0' },
  ident:     {},
  other:     {},
}

function SyntaxCode({ code }) {
  const tokens = tokenize(code)
  return (
    <code style={{ display: 'block' }}>
      {tokens.map((tok, i) => {
        const s = TOKEN_STYLE[tok.type] || {}
        return Object.keys(s).length
          ? <span key={i} style={s}>{tok.text}</span>
          : tok.text
      })}
    </code>
  )
}

function CodeBlock({ code, filename, onCopy, copied }) {
  return (
    <div style={{ border: '1px solid #DFE1E6', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#F7F8F9' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid #DFE1E6', backgroundColor: '#FAFBFC' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#5E6C84' }}>{filename}</span>
        <button
          onClick={onCopy}
          style={{
            padding: '4px 12px', fontSize: '12px', fontWeight: '500',
            backgroundColor: copied ? '#E3FCEF' : '#ffffff',
            color: copied ? '#006644' : '#42526E',
            border: '1px solid', borderColor: copied ? '#ABF5D1' : '#DFE1E6',
            borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
          }}
        >
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
      <div style={{ overflowX: 'auto', maxHeight: '560px', overflowY: 'auto' }}>
        <pre style={{ margin: 0, padding: '18px 20px', fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '13px', lineHeight: '1.65', color: '#172B4D', whiteSpace: 'pre', minWidth: 'max-content' }}>
          <SyntaxCode code={code} />
        </pre>
      </div>
    </div>
  )
}

// ─── Table of Contents ───────────────────────────────────────────────────────

function TableOfContents({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id)

  useEffect(() => {
    setActiveId(sections[0]?.id)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-10% 0px -60% 0px', threshold: 0.1 }
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  if (!sections.length) return null

  return (
    <div style={{ position: 'sticky', top: 24 }}>
      <p style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5E6C84', marginBottom: '10px' }}>
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
            display: 'block', fontSize: '13px', padding: '4px 0 4px 10px',
            color: activeId === s.id ? '#0052CC' : '#5E6C84',
            fontWeight: activeId === s.id ? '600' : '400',
            textDecoration: 'none',
            borderLeft: `2px solid ${activeId === s.id ? '#0052CC' : '#DFE1E6'}`,
            marginBottom: 2, transition: 'color 0.1s, border-color 0.1s',
          }}
        >
          {s.label}
        </a>
      ))}
    </div>
  )
}

// ─── Table styles ─────────────────────────────────────────────────────────────

const cellBase = {
  padding: '12px 16px',
  fontSize: '14px',
  borderBottom: '1px solid #F4F5F7',
  verticalAlign: 'top',
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ComponentPage() {
  const { slug } = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [codeSource, setCodeSource] = useState(null)
  const [codeLoading, setCodeLoading] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)

  useEffect(() => {
    setActiveTab('overview')
    setCodeSource(null)
    setCodeCopied(false)
  }, [slug])

  const component = componentsData.components.find(c => getSlug(c) === slug)

  useEffect(() => {
    if (activeTab !== 'code' || !component?.codeFile || codeSource !== null) return
    setCodeLoading(true)
    fetch(import.meta.env.BASE_URL + component.codeFile)
      .then(r => r.ok ? r.text() : Promise.reject(r.status))
      .then(text => setCodeSource(text))
      .catch(() => setCodeSource('// Source file not found.'))
      .finally(() => setCodeLoading(false))
  }, [activeTab, component, codeSource])

  function handleCopy() {
    if (!codeSource) return
    navigator.clipboard.writeText(codeSource).then(() => {
      setCodeCopied(true)
      setTimeout(() => setCodeCopied(false), 2000)
    })
  }

  if (!component) {
    return (
      <div style={{ padding: '48px 40px', maxWidth: 800, margin: '0 auto' }}>
        <p style={{ color: '#5E6C84' }}>Component not found.</p>
      </div>
    )
  }

  const badge = PRODUCT_BADGE[component.product] || PRODUCT_BADGE['raa-web']
  const changelog = [...(component.changelog || [])].sort((a, b) => b.date.localeCompare(a.date))
  const codeFilename = component.codeFile ? component.codeFile.split('/').pop() : null

  return (
    <div>
      {/* ── Banner ─────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#FAFBFC', borderBottom: '1px solid #DFE1E6' }}>
        <div className="page-banner-inner" style={{ maxWidth: 960, margin: '0 auto', padding: '40px 40px 0' }}>
          {/* Breadcrumb */}
          <nav style={{ fontSize: '13px', color: '#5E6C84', marginBottom: '20px' }}>
            <Link to="/components" style={{ color: '#0052CC' }}>Components</Link>
            <span style={{ margin: '0 6px' }}>›</span>
            <span>{component.category}</span>
            <span style={{ margin: '0 6px' }}>›</span>
            <span style={{ color: '#172B4D' }}>{component.name}</span>
          </nav>

          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#172B4D', marginBottom: '14px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            {component.name}
          </h1>

          {/* Badges row — status, product, category, Figma link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <StatusBadge status={component.status} />
            <span style={{
              fontSize: '12px', fontWeight: '600', padding: '3px 10px', borderRadius: '3px',
              background: badge.bg, color: badge.color, border: `1px solid ${badge.border}`,
            }}>
              {badge.label}
            </span>
            <span style={{ fontSize: '13px', color: '#5E6C84' }}>{component.category}</span>
            {component.figmaUrl && (
              <a
                href={component.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '12px', color: '#6554C0', textDecoration: 'none', fontWeight: '500',
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  padding: '3px 10px', borderRadius: '3px',
                  border: '1px solid #C0B6F2', background: '#F3F0FF',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                View in Figma
              </a>
            )}
          </div>

          <p style={{ fontSize: '15px', color: '#172B4D', lineHeight: '1.6', maxWidth: '680px', marginBottom: '28px' }}>
            {component.description}
          </p>

          {/* Tab bar */}
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

      {/* ── Content area ──────────────────────────────────────────── */}
      <div style={{ display: 'flex', maxWidth: 960, margin: '0 auto' }}>
        {/* Main content */}
        <div className="page-content-inner" style={{ flex: 1, minWidth: 0, padding: '40px 40px 80px' }}>

          {/* ── OVERVIEW TAB ─────────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div>
              <section id="description" style={{ marginBottom: '40px' }}>
                <h2 style={{ marginBottom: '12px' }}>Description</h2>
                <p style={{ lineHeight: '1.7', color: '#172B4D' }}>{component.description}</p>
              </section>

              <section id="preview" style={{ marginBottom: '40px' }}>
                <h2 style={{ marginBottom: '16px' }}>Preview</h2>
                <ComponentPreview component={component} />
              </section>

              {/* States */}
              {component.states && component.states.length > 0 && (
                <section id="states" style={{ marginBottom: '40px' }}>
                  <h2 style={{ marginBottom: '16px' }}>States</h2>
                  <div className="states-grid">
                    {component.states.map((state, i) => {
                      const bg = parseBgCss(state.background)
                      const border = parseBorderCss(state.border)
                      const textColor = parseTextCss(state.textColor)
                      return (
                        <div key={i} style={{
                          border: '1px solid #DFE1E6', borderRadius: '8px',
                          overflow: 'hidden', backgroundColor: '#ffffff',
                        }}>
                          {/* Color swatch */}
                          <div style={{
                            height: '48px', backgroundColor: bg,
                            border: border !== 'none' ? border : undefined,
                            borderRadius: '4px', margin: '12px 12px 0',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <span style={{ fontSize: '12px', fontWeight: '700', color: textColor, opacity: bg === '#F4F5F7' ? 0.4 : 1 }}>
                              Aa
                            </span>
                          </div>
                          {/* Text */}
                          <div style={{ padding: '10px 14px 14px' }}>
                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#172B4D', marginBottom: '4px' }}>
                              {state.state}
                            </div>
                            <div style={{ fontSize: '12px', color: '#5E6C84', lineHeight: '1.5' }}>
                              {state.description}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}

              {/* Anatomy */}
              {component.anatomy && component.anatomy.length > 0 && (
                <section id="anatomy" style={{ marginBottom: '40px' }}>
                  <h2 style={{ marginBottom: '16px' }}>Anatomy</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {component.anatomy.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '26px', height: '26px', borderRadius: '50%',
                          background: '#0052CC', color: '#ffffff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '12px', fontWeight: '700', flexShrink: 0, marginTop: '1px',
                        }}>
                          {i + 1}
                        </div>
                        <div style={{ paddingTop: '3px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: '#172B4D' }}>
                            {item.part}
                          </span>
                          <span style={{ fontSize: '14px', color: '#5E6C84', marginLeft: '8px', lineHeight: '1.6' }}>
                            {item.description}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section id="accessibility">
                <h2 style={{ marginBottom: '12px' }}>Accessibility</h2>
                <p style={{ lineHeight: '1.7', color: '#172B4D' }}>{component.accessibility}</p>
              </section>
            </div>
          )}

          {/* ── VARIANTS TAB ─────────────────────────────────────── */}
          {activeTab === 'variants' && (
            <section id="variants">
              <h2 style={{ marginBottom: '16px' }}>Variants</h2>
              <div className="table-scroll-wrapper">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F4F5F7' }}>
                      <th style={{ ...cellBase, fontWeight: '600', fontSize: '13px', color: '#5E6C84', textAlign: 'left', width: '35%', borderBottom: '2px solid #DFE1E6' }}>Variant</th>
                      <th style={{ ...cellBase, fontWeight: '600', fontSize: '13px', color: '#5E6C84', textAlign: 'left', borderBottom: '2px solid #DFE1E6' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {component.variants.map((v, i) => (
                      <tr key={i} style={{ backgroundColor: i % 2 === 1 ? '#FAFBFC' : '#ffffff' }}>
                        <td style={{ ...cellBase, fontWeight: '500', color: '#172B4D' }}>{v.name}</td>
                        <td style={{ ...cellBase, color: '#172B4D' }}>{v.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ── PROPERTIES TAB ───────────────────────────────────── */}
          {activeTab === 'properties' && (
            <section id="properties">
              <h2 style={{ marginBottom: '16px' }}>Properties</h2>
              <div className="table-scroll-wrapper">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F4F5F7' }}>
                      <th style={{ ...cellBase, fontWeight: '600', fontSize: '13px', color: '#5E6C84', textAlign: 'left', width: '40%', borderBottom: '2px solid #DFE1E6' }}>Property</th>
                      <th style={{ ...cellBase, fontWeight: '600', fontSize: '13px', color: '#5E6C84', textAlign: 'left', borderBottom: '2px solid #DFE1E6' }}>Value</th>
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
              </div>
            </section>
          )}

          {/* ── USAGE TAB ────────────────────────────────────────── */}
          {activeTab === 'usage' && (
            <div>
              <section id="usage-guidelines" style={{ marginBottom: '0' }}>
                <h2 style={{ marginBottom: '12px' }}>Usage Guidelines</h2>
                <p style={{ lineHeight: '1.7', color: '#172B4D' }}>{component.usage}</p>
              </section>

              {/* Do's and Don'ts */}
              {component.dosDonts && component.dosDonts.length > 0 && (
                <section id="dos-donts" style={{ marginTop: '36px', marginBottom: '36px' }}>
                  <h2 style={{ marginBottom: '16px' }}>Do's and Don'ts</h2>
                  <div className="dos-donts-grid">
                    {/* Do column */}
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: '#36B37E', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                        Do
                      </div>
                      {component.dosDonts.filter(d => d.type === 'do').map((item, i) => (
                        <div key={i} style={{
                          borderLeft: '3px solid #36B37E', padding: '11px 14px',
                          background: '#F6FFF9', borderRadius: '0 6px 6px 0', marginBottom: '8px',
                          display: 'flex', gap: '10px', alignItems: 'flex-start',
                        }}>
                          <span style={{ color: '#36B37E', fontWeight: '700', fontSize: '15px', lineHeight: 1.4, flexShrink: 0 }}>✓</span>
                          <span style={{ fontSize: '14px', color: '#172B4D', lineHeight: '1.6' }}>{item.text}</span>
                        </div>
                      ))}
                    </div>
                    {/* Don't column */}
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: '#FF5630', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                        Don't
                      </div>
                      {component.dosDonts.filter(d => d.type === 'dont').map((item, i) => (
                        <div key={i} style={{
                          borderLeft: '3px solid #FF5630', padding: '11px 14px',
                          background: '#FFF5F3', borderRadius: '0 6px 6px 0', marginBottom: '8px',
                          display: 'flex', gap: '10px', alignItems: 'flex-start',
                        }}>
                          <span style={{ color: '#FF5630', fontWeight: '700', fontSize: '15px', lineHeight: 1.4, flexShrink: 0 }}>✕</span>
                          <span style={{ fontSize: '14px', color: '#172B4D', lineHeight: '1.6' }}>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Used in */}
              {component.usedIn && component.usedIn.length > 0 && (
                <div style={{ marginTop: component.dosDonts ? '0' : '32px' }}>
                  <h3 style={{ marginBottom: '10px', color: '#5E6C84', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '12px' }}>Used in</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {component.usedIn.map(product => (
                      <span key={product} style={{
                        fontSize: '13px', padding: '4px 10px', borderRadius: '3px',
                        background: '#F4F5F7', color: '#172B4D', border: '1px solid #DFE1E6',
                      }}>
                        {product.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── CODE TAB ─────────────────────────────────────────── */}
          {activeTab === 'code' && (
            <div>
              <section id="code-source" style={{ marginBottom: '40px' }}>
                <h2 style={{ marginBottom: '16px' }}>Source</h2>
                {codeLoading && (
                  <div style={{ padding: '32px', textAlign: 'center', color: '#5E6C84', fontSize: '14px' }}>Loading source…</div>
                )}
                {!codeLoading && codeSource && (
                  <CodeBlock code={codeSource} filename={codeFilename} onCopy={handleCopy} copied={codeCopied} />
                )}
                {!codeLoading && !codeSource && (
                  <p style={{ color: '#5E6C84', fontSize: '14px' }}>No source file available for this component.</p>
                )}
              </section>

              <section id="code-import">
                <h2 style={{ marginBottom: '12px' }}>Import</h2>
                {component.codeFile ? (
                  <div>
                    <p style={{ fontSize: '14px', color: '#172B4D', marginBottom: '12px', lineHeight: '1.6' }}>
                      Copy the source file into your project, then import it using the path below.
                    </p>
                    <div style={{ border: '1px solid #DFE1E6', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#F7F8F9' }}>
                      <div style={{ padding: '8px 16px', borderBottom: '1px solid #DFE1E6', backgroundColor: '#FAFBFC' }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#5E6C84' }}>Usage</span>
                      </div>
                      <pre style={{ margin: 0, padding: '14px 16px', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', lineHeight: '1.65', color: '#172B4D', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                        <SyntaxCode code={`import { ${component.name.replace(/\s+/g, '')} } from './${codeFilename?.replace('.jsx', '') || ''}'`} />
                      </pre>
                    </div>
                    <p style={{ fontSize: '13px', color: '#5E6C84', marginTop: '10px' }}>
                      File: <code style={{ fontSize: '12px', color: '#0052CC' }}>{component.codeFile}</code>
                    </p>
                  </div>
                ) : (
                  <p style={{ fontSize: '14px', color: '#5E6C84' }}>Import path not available.</p>
                )}
              </section>
            </div>
          )}

          {/* ── CHANGELOG TAB ────────────────────────────────────── */}
          {activeTab === 'changelog' && (
            <section id="changelog">
              <h2 style={{ marginBottom: '20px' }}>Changelog</h2>
              {changelog.length === 0 ? (
                <p style={{ color: '#5E6C84' }}>No changelog entries.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {changelog.map((entry, i) => {
                    const typeBadge = TYPE_BADGE[entry.type] || TYPE_BADGE.added
                    return (
                      <div key={i} style={{
                        display: 'flex', gap: '16px', alignItems: 'flex-start',
                        padding: '14px 0',
                        borderBottom: i < changelog.length - 1 ? '1px solid #F4F5F7' : 'none',
                      }}>
                        <span style={{ fontSize: '13px', color: '#5E6C84', whiteSpace: 'nowrap', minWidth: '90px' }}>{entry.date}</span>
                        <span style={{
                          fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '3px',
                          background: typeBadge.bg, color: typeBadge.color,
                          textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap', flexShrink: 0,
                        }}>
                          {entry.type}
                        </span>
                        <span style={{ fontSize: '14px', color: '#172B4D', lineHeight: '1.5' }}>{entry.description}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </section>
          )}
        </div>

        {/* Right TOC */}
        <div style={{ width: 200, flexShrink: 0, padding: '40px 0 80px 24px', display: 'none' }} className="toc-column">
          <TableOfContents sections={TAB_SECTIONS[activeTab] || []} />
        </div>
      </div>

      <style>{`
        @media (min-width: 1100px) {
          .toc-column { display: block !important; }
        }
        .states-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 768px) {
          .states-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 500px) {
          .states-grid { grid-template-columns: 1fr; }
        }
        .dos-donts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 600px) {
          .dos-donts-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

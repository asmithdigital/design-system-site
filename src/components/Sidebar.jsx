import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import componentsData from '../../data/components.json'
import patternsData from '../../data/patterns.json'
import templatesData from '../../data/templates.json'

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function getComponentSlug(c) {
  return `${c.product}-${slugify(c.name)}`
}

const PRODUCT_DOT = {
  'raa-web': '#FFD100',
  'taskly': '#2B7DE9',
}

const componentsByCategory = componentsData.components.reduce((acc, c) => {
  if (!acc[c.category]) acc[c.category] = []
  acc[c.category].push(c)
  return acc
}, {})

function getSectionForPath(pathname) {
  if (pathname === '/whats-new') return 'whats-new'
  if (pathname === '/getting-started' || pathname === '/about') return 'getting-started'
  if (pathname === '/foundations') return 'foundations'
  if (pathname.startsWith('/tokens')) return 'tokens'
  if (pathname.startsWith('/components')) return 'components'
  if (pathname.startsWith('/patterns')) return 'patterns'
  if (pathname.startsWith('/templates')) return 'templates'
  return null
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s', flexShrink: 0 }}
    >
      <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NavLink({ to, label, dot, indent = 0, exact = false }) {
  const location = useLocation()
  const active = exact ? location.pathname === to : location.pathname === to

  return (
    <Link
      to={to}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        fontSize: '13px',
        color: active ? '#0052CC' : '#172B4D',
        fontWeight: active ? '600' : '400',
        padding: `7px 16px 7px ${16 + indent * 12}px`,
        borderLeft: active ? '3px solid #0052CC' : '3px solid transparent',
        textDecoration: 'none',
        borderRadius: '0 4px 4px 0',
        backgroundColor: active ? '#DEEBFF' : 'transparent',
        transition: 'background-color 0.1s',
        lineHeight: 1.4,
        marginRight: '8px',
      }}
      onMouseEnter={e => {
        if (!active) e.currentTarget.style.backgroundColor = '#F4F5F7'
      }}
      onMouseLeave={e => {
        if (!active) e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      {dot && (
        <span style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          backgroundColor: dot,
          flexShrink: 0,
          display: 'inline-block',
        }} />
      )}
      {label}
    </Link>
  )
}

function SectionHeader({ label, open, onClick, sectionId }) {
  return (
    <button
      onClick={() => onClick(sectionId)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '10px 16px 6px',
        fontSize: '11px',
        fontWeight: '700',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#5E6C84',
        marginTop: '8px',
        textAlign: 'left',
      }}
    >
      {label}
      <ChevronIcon open={open} />
    </button>
  )
}

function CategorySection({ label, links, open, onToggle }) {
  return (
    <div>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '6px 16px 6px 28px',
          fontSize: '11px',
          fontWeight: '600',
          letterSpacing: '0.05em',
          color: '#5E6C84',
          textAlign: 'left',
        }}
      >
        {label}
        <ChevronIcon open={open} />
      </button>
      {open && links.map(link => (
        <NavLink key={link.href} to={link.href} label={link.label} dot={link.dot} indent={2} />
      ))}
    </div>
  )
}

export default function Sidebar({ searchRef, isOpen, onClose }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')

  const activeSection = getSectionForPath(location.pathname)

  const [openSections, setOpenSections] = useState(() => {
    const initial = {
      'whats-new': false,
      'getting-started': false,
      foundations: false,
      tokens: false,
      components: false,
      patterns: false,
      templates: false,
    }
    if (activeSection) initial[activeSection] = true
    return initial
  })

  const [openCategories, setOpenCategories] = useState(() => {
    if (activeSection === 'components') {
      const current = location.pathname
      const active = {}
      Object.entries(componentsByCategory).forEach(([cat, comps]) => {
        if (comps.some(c => `/components/${getComponentSlug(c)}` === current)) {
          active[cat] = true
        }
      })
      return active
    }
    return {}
  })

  useEffect(() => {
    const newSection = getSectionForPath(location.pathname)
    if (newSection && !openSections[newSection]) {
      setOpenSections(prev => ({ ...prev, [newSection]: true }))
    }
    if (onClose) onClose()
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  function toggleSection(id) {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function toggleCategory(cat) {
    setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }))
  }

  function handleSearch(e) {
    const val = e.target.value
    setSearchValue(val)
    if (val.trim()) {
      navigate(`/search?q=${encodeURIComponent(val.trim())}`)
    }
  }

  return (
    <>
      {/* Backdrop — mobile only, covers content when sidebar is open */}
      <div
        className={`sidebar-backdrop${isOpen ? ' sidebar-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <nav
        className={`sidebar-nav${isOpen ? ' sidebar-open' : ''}`}
        style={{
          position: 'fixed',
          top: 52,
          left: 0,
          bottom: 0,
          width: 260,
          backgroundColor: '#FAFBFC',
          borderRight: '1px solid #DFE1E6',
          overflowY: 'auto',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Close button row — visible only on mobile via CSS */}
        <div
          className="sidebar-close-row"
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            borderBottom: '1px solid #DFE1E6',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#172B4D' }}>Navigation</span>
          <button
            onClick={onClose}
            aria-label="Close navigation"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#5E6C84',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '4px',
              lineHeight: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

      <div style={{ padding: '12px 12px 8px' }}>
        <div style={{ position: 'relative' }}>
          <svg
            style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#6B778C', pointerEvents: 'none' }}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={searchRef}
            type="text"
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search…"
            style={{
              width: '100%',
              padding: '8px 12px 8px 30px',
              border: '1px solid #DFE1E6',
              borderRadius: '4px',
              fontSize: '13px',
              color: '#172B4D',
              backgroundColor: '#ffffff',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      <div style={{ flex: 1, paddingBottom: 16 }}>
        {/* What's New */}
        <SectionHeader label="What's New" open={openSections['whats-new']} onClick={toggleSection} sectionId="whats-new" />
        {openSections['whats-new'] && (
          <NavLink to="/whats-new" label="What's New" />
        )}

        {/* Getting Started */}
        <SectionHeader label="Getting Started" open={openSections['getting-started']} onClick={toggleSection} sectionId="getting-started" />
        {openSections['getting-started'] && (
          <>
            <NavLink to="/getting-started" label="Getting Started" />
            <NavLink to="/about" label="About" />
          </>
        )}

        {/* Foundations */}
        <SectionHeader label="Foundations" open={openSections.foundations} onClick={toggleSection} sectionId="foundations" />
        {openSections.foundations && (
          <NavLink to="/foundations" label="Foundations" />
        )}

        {/* Tokens */}
        <SectionHeader label="Tokens" open={openSections.tokens} onClick={toggleSection} sectionId="tokens" />
        {openSections.tokens && (
          <>
            <NavLink to="/tokens/colours" label="Colours" />
            <NavLink to="/tokens/typography" label="Typography" />
            <NavLink to="/tokens/spacing" label="Spacing" />
          </>
        )}

        {/* Components */}
        <SectionHeader label="Components" open={openSections.components} onClick={toggleSection} sectionId="components" />
        {openSections.components && (
          <>
            <NavLink to="/components" label="All Components" exact />
            {Object.entries(componentsByCategory).map(([cat, comps]) => (
              <CategorySection
                key={cat}
                label={cat}
                open={!!openCategories[cat]}
                onToggle={() => toggleCategory(cat)}
                links={comps.map(c => ({
                  label: c.name,
                  href: `/components/${getComponentSlug(c)}`,
                  dot: PRODUCT_DOT[c.product],
                }))}
              />
            ))}
          </>
        )}

        {/* Patterns */}
        <SectionHeader label="Patterns" open={openSections.patterns} onClick={toggleSection} sectionId="patterns" />
        {openSections.patterns && (
          <>
            <NavLink to="/patterns" label="All Patterns" exact />
            {patternsData.patterns.map(p => (
              <NavLink key={p.id} to={`/patterns/${p.id}`} label={p.name} indent={1} />
            ))}
          </>
        )}

        {/* Templates */}
        <SectionHeader label="Templates" open={openSections.templates} onClick={toggleSection} sectionId="templates" />
        {openSections.templates && (
          <>
            <NavLink to="/templates" label="All Templates" exact />
            {templatesData.templates.map(t => (
              <NavLink key={t.id} to={`/templates/${t.id}`} label={t.name} indent={1} />
            ))}
          </>
        )}

      </div>
    </nav>
    </>
  )
}

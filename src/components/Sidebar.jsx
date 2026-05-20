import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import componentsData from '../../data/components.json'

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function getSlug(c) {
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

const navStructure = [
  {
    section: 'Foundations',
    links: [
      { label: 'Foundations', href: '/foundations' },
    ],
  },
  {
    section: 'Tokens',
    links: [
      { label: 'Colours', href: '/tokens/colours' },
      { label: 'Typography', href: '/tokens/typography' },
      { label: 'Spacing', href: '/tokens/spacing' },
    ],
  },
  {
    section: 'Components',
    links: [
      { label: 'All Components', href: '/components' },
    ],
    subcategories: Object.entries(componentsByCategory).map(([cat, comps]) => ({
      label: cat,
      links: comps.map(c => ({
        label: c.name,
        href: `/components/${getSlug(c)}`,
        product: c.product,
      })),
    })),
  },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')

  function handleSearchChange(e) {
    const val = e.target.value
    setSearchValue(val)
    if (val.trim()) {
      navigate(`/search?q=${encodeURIComponent(val.trim())}`)
    }
  }

  function isActive(href) {
    return location.pathname === href
  }

  const linkStyle = (href, indent) => ({
    display: 'block',
    fontSize: '14px',
    color: isActive(href) ? '#0a6b54' : '#0f1f3d',
    fontWeight: isActive(href) ? '600' : '400',
    padding: '7px 16px 7px ' + indent,
    borderLeft: isActive(href) ? '2px solid #0a6b54' : '2px solid transparent',
    textDecoration: 'none',
    backgroundColor: isActive(href) ? '#f7f5ee' : 'transparent',
    transition: 'background-color 0.1s',
    cursor: 'pointer',
  })

  return (
    <nav style={{
      width: '240px',
      minWidth: '240px',
      height: '100vh',
      overflowY: 'auto',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #ddd8c8',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      <div style={{
        backgroundColor: '#0f1f3d',
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: '700',
        padding: '20px',
        flexShrink: 0,
      }}>
        Design System
      </div>

      <div style={{ padding: '12px 12px 8px' }}>
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search…"
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd8c8',
            borderRadius: '6px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            color: '#0f1f3d',
            backgroundColor: '#ffffff',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ flex: 1 }}>
        {navStructure.map((group) => (
          <div key={group.section}>
            <div style={{
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#72706a',
              marginTop: '16px',
              marginBottom: '4px',
              paddingLeft: '16px',
            }}>
              {group.section}
            </div>

            {group.links && group.links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                style={linkStyle(link.href, '16px')}
                onMouseEnter={(e) => {
                  if (!isActive(link.href)) e.currentTarget.style.backgroundColor = '#f7f5ee'
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.href)) e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                {link.label}
              </Link>
            ))}

            {group.subcategories && group.subcategories.map((sub) => (
              <div key={sub.label}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#b0ad9e',
                  paddingLeft: '24px',
                  paddingTop: '10px',
                  paddingBottom: '4px',
                }}>
                  {sub.label}
                </div>
                {sub.links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    style={linkStyle(link.href, '28px')}
                    onMouseEnter={(e) => {
                      if (!isActive(link.href)) e.currentTarget.style.backgroundColor = '#f7f5ee'
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(link.href)) e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      {link.product && (
                        <span style={{
                          display: 'inline-block',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: PRODUCT_DOT[link.product] || '#ddd8c8',
                          flexShrink: 0,
                        }} />
                      )}
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </nav>
  )
}

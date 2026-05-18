import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navStructure = [
  {
    section: 'Foundations',
    links: [
      { label: 'Principles', href: '/foundations/principles' },
      { label: 'Grid & Layout', href: '/foundations/grid-layout' },
      { label: 'Accessibility', href: '/foundations/accessibility' },
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
    subcategories: [
      {
        label: 'Buttons',
        links: [{ label: 'Primary Button', href: '/components/primary-button' }],
      },
      {
        label: 'Cards',
        links: [{ label: 'Plan Comparison Card', href: '/components/plan-comparison-card' }],
      },
      {
        label: 'Forms',
        links: [{ label: 'Form Field', href: '/components/form-field' }],
      },
      {
        label: 'Navigation',
        links: [{ label: 'Progress Stepper', href: '/components/progress-stepper' }],
      },
      {
        label: 'Feedback',
        links: [{ label: 'Alert Banner', href: '/components/alert-banner' }],
      },
    ],
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
    padding: '8px 16px 8px ' + indent,
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
              marginBottom: '6px',
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
                  fontSize: '13px',
                  color: '#72706a',
                  paddingLeft: '24px',
                  paddingTop: '6px',
                  paddingBottom: '6px',
                }}>
                  {sub.label}
                </div>
                {sub.links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    style={linkStyle(link.href, '32px')}
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
              </div>
            ))}
          </div>
        ))}
      </div>
    </nav>
  )
}

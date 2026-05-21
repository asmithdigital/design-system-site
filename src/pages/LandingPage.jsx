import { Link } from 'react-router-dom'
import componentsData from '../../data/components.json'
import patternsData from '../../data/patterns.json'
import templatesData from '../../data/templates.json'

const DISCOVER_CARDS = [
  {
    emoji: '🏛',
    title: 'Foundations',
    description: 'Layout principles, accessibility guidelines, and design philosophy for each product.',
    href: '/foundations',
  },
  {
    emoji: '🎨',
    title: 'Tokens',
    description: 'Colour, typography, and spacing tokens that power consistency across every screen.',
    href: '/tokens/colours',
  },
  {
    emoji: '🧩',
    title: 'Components',
    description: `${componentsData.components.length} documented UI components with interactive previews, properties, and usage rules.`,
    href: '/components',
  },
  {
    emoji: '🔁',
    title: 'Patterns',
    description: 'Reusable interaction patterns — form validation, payment flows, progressive disclosure, and more.',
    href: '/patterns',
  },
  {
    emoji: '📐',
    title: 'Templates',
    description: 'Full page layout templates for Quote to Buy, My Account, and other product contexts.',
    href: '/templates',
  },
  {
    emoji: '📦',
    title: 'Products',
    description: 'Browse components, patterns, and templates scoped to each RAA product.',
    href: '/products',
  },
]

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0747A6 0%, #0A3880 50%, #172B4D 100%)',
        padding: '80px 64px 72px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Geometric decoration */}
        <div style={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: -40,
          right: 120,
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }} />
        <div style={{
          position: 'absolute',
          top: 40,
          right: 200,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(255,209,0,0.15)',
        }} />

        <div style={{ position: 'relative', maxWidth: 720 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.12)',
            borderRadius: 6,
            padding: '6px 14px',
            marginBottom: 24,
          }}>
            <span style={{ background: '#FFD100', borderRadius: 3, padding: '1px 6px', fontSize: 12, fontWeight: 700, color: '#172B4D' }}>RAA</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>Design System</span>
          </div>

          <h1 style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: 20,
            letterSpacing: '-0.02em',
          }}>
            One design language.<br />Every RAA product.
          </h1>
          <p style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.6,
            marginBottom: 36,
            maxWidth: 520,
          }}>
            A unified design language for RAA digital products and services — built for designers, developers, and product teams.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link
              to="/getting-started"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: '#FFD100',
                color: '#172B4D',
                fontWeight: 700,
                fontSize: 14,
                padding: '12px 24px',
                borderRadius: 6,
                textDecoration: 'none',
              }}
            >
              Get started →
            </Link>
            <Link
              to="/components"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(255,255,255,0.12)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: 14,
                padding: '12px 24px',
                borderRadius: 6,
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              Browse components
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        background: '#F4F5F7',
        borderBottom: '1px solid #DFE1E6',
        padding: '16px 64px',
        display: 'flex',
        gap: 32,
        flexWrap: 'wrap',
      }}>
        {[
          { value: componentsData.components.length, label: 'Components' },
          { value: patternsData.patterns.length, label: 'Patterns' },
          { value: templatesData.templates.length, label: 'Templates' },
          { value: 2, label: 'Products' },
          { value: 89, label: 'Journey Insights' },
        ].map(stat => (
          <div key={stat.label} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#0052CC' }}>{stat.value}</span>
            <span style={{ fontSize: 13, color: '#6B778C' }}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Discover section */}
      <div style={{ padding: '64px 64px 0' }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#172B4D', marginBottom: 8 }}>
          Discover the system
        </h2>
        <p style={{ fontSize: 15, color: '#6B778C', marginBottom: 36, lineHeight: 1.6 }}>
          Everything you need to design and build consistent RAA digital experiences.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          maxWidth: 960,
        }}>
          {DISCOVER_CARDS.map(card => (
            <Link
              key={card.href}
              to={card.href}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #DFE1E6',
                  borderRadius: 8,
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.15s, border-color 0.15s',
                  height: '100%',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,82,204,0.12)'
                  e.currentTarget.style.borderColor = '#4C9AFF'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = '#DFE1E6'
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{card.emoji}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#172B4D', marginBottom: 8 }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: 13, color: '#6B778C', lineHeight: 1.6, marginBottom: 16 }}>
                  {card.description}
                </p>
                <span style={{ fontSize: 13, color: '#0052CC', fontWeight: 500 }}>Browse →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        margin: '80px 0 0',
        padding: '32px 64px',
        borderTop: '1px solid #DFE1E6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div style={{ display: 'flex', gap: 24 }}>
          <Link to="/getting-started" style={{ fontSize: 13, color: '#6B778C' }}>Getting Started</Link>
          <Link to="/about" style={{ fontSize: 13, color: '#6B778C' }}>About</Link>
          <a href="https://github.com/asmithdigital/design-system-site" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#6B778C' }}>GitHub ↗</a>
        </div>
        <span style={{ fontSize: 12, color: '#97A0AF' }}>© 2026 RAA — EXD Design Team</span>
      </div>
    </div>
  )
}

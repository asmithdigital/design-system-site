import React from 'react'
import PropTypes from 'prop-types'

/**
 * Quick Action Card — RAA Web
 *
 * Compact action card used in the My Account dashboard for high-frequency tasks.
 * Displays an icon, label, and optional description. Entire card is clickable.
 *
 * Import path: @raa-web/components/QuickActionCard
 */

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px 20px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    textDecoration: 'none',
    cursor: 'pointer',
    fontFamily: 'Arial, Helvetica, sans-serif',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  },
  iconWrap: {
    width: '44px',
    height: '44px',
    borderRadius: '8px',
    backgroundColor: '#F5F5F5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: '20px',
  },
  content: { flex: 1 },
  label: { fontSize: '14px', fontWeight: '600', color: '#1A1A1A', marginBottom: '2px' },
  description: { fontSize: '12px', color: '#5C5C5C' },
  chevron: { color: '#A3A3A3', flexShrink: 0 },
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function QuickActionCard({ label, description, icon, href, onClick, style }) {
  const Tag = href ? 'a' : 'button'
  const tagProps = href ? { href } : { type: 'button', onClick }

  return (
    <Tag
      {...tagProps}
      style={styles.card}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#1A1A1A'
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#E5E5E5'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={styles.iconWrap}>{icon}</div>
      <div style={styles.content}>
        <div style={styles.label}>{label}</div>
        {description && <div style={styles.description}>{description}</div>}
      </div>
      <span style={styles.chevron}><ChevronRight /></span>
    </Tag>
  )
}

QuickActionCard.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.node,
  href: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
}

export default QuickActionCard

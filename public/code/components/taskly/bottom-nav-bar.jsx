import React from 'react'
import PropTypes from 'prop-types'

/**
 * Bottom Nav Bar — Taskly
 *
 * Fixed bottom navigation for the Taskly mobile app. Displays up to 5 tabs
 * with icon and label. Active tab has a navy background indicator.
 * Height is 64px; sits above device safe area via padding-bottom.
 *
 * Import path: @taskly/components/BottomNavBar
 */

const styles = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '64px',
    backgroundColor: '#1A2B4A',
    display: 'flex',
    alignItems: 'center',
    zIndex: 1000,
    fontFamily: "'Inter', sans-serif",
    paddingBottom: 'env(safe-area-inset-bottom)',
    boxSizing: 'content-box',
    boxShadow: '0 -1px 0 rgba(255,255,255,0.08)',
  },
  tab: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '8px 4px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    position: 'relative',
    minWidth: 0,
    height: '100%',
    fontFamily: "'Inter', sans-serif",
  },
  icon: { fontSize: '20px', lineHeight: 1 },
  label: {
    fontSize: '10px',
    fontWeight: '500',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: '0.02em',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  },
  labelActive: { color: '#FFFFFF', fontWeight: '600' },
  indicator: {
    position: 'absolute',
    top: '8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '44px',
    height: '36px',
    backgroundColor: '#2B7DE9',
    borderRadius: '10px',
    zIndex: -1,
  },
  badge: {
    position: 'absolute',
    top: '6px',
    right: 'calc(50% - 14px)',
    width: '16px',
    height: '16px',
    backgroundColor: '#DC2626',
    borderRadius: '50%',
    border: '2px solid #1A2B4A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '9px',
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 1,
  },
}

export function BottomNavBar({ items = [], activeId, onChange, style }) {
  return (
    <nav aria-label="Main navigation" style={{ ...styles.nav, ...style }}>
      {items.map(item => {
        const isActive = item.id === activeId
        return (
          <button
            key={item.id}
            style={styles.tab}
            onClick={() => onChange?.(item.id)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            {isActive && <div style={styles.indicator} aria-hidden="true" />}
            <span style={styles.icon} aria-hidden="true">{item.icon}</span>
            <span style={{ ...styles.label, ...(isActive ? styles.labelActive : {}) }}>
              {item.label}
            </span>
            {item.badge != null && item.badge > 0 && (
              <span style={styles.badge} aria-label={`${item.badge} notifications`}>
                {item.badge > 9 ? '9+' : item.badge}
              </span>
            )}
          </button>
        )
      })}
    </nav>
  )
}

BottomNavBar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    /** React node — recommended: emoji or SVG icon at ~20px */
    icon: PropTypes.node.isRequired,
    /** Notification count. Shows a red badge when > 0. */
    badge: PropTypes.number,
  })),
  activeId: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
}

export default BottomNavBar

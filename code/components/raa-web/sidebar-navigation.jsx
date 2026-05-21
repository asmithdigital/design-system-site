import React, { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Sidebar Navigation — RAA Web
 *
 * Fixed left-side navigation used in My Account. Groups nav items into sections.
 * Active item is indicated by a yellow left border. Collapsible on mobile.
 *
 * Import path: @raa-web/components/SidebarNavigation
 */

const styles = {
  sidebar: {
    width: '240px',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRight: '1px solid #E5E5E5',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Arial, Helvetica, sans-serif',
    overflowY: 'auto',
  },
  sectionLabel: {
    padding: '20px 16px 6px',
    fontSize: '11px',
    fontWeight: '700',
    color: '#A3A3A3',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    fontSize: '14px',
    color: '#1A1A1A',
    textDecoration: 'none',
    borderLeft: '3px solid transparent',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    fontFamily: 'Arial, Helvetica, sans-serif',
    transition: 'background-color 0.1s',
  },
  itemActive: {
    borderLeft: '3px solid #FFD100',
    backgroundColor: '#FFFBE6',
    fontWeight: '600',
    color: '#1A1A1A',
  },
  itemHover: { backgroundColor: '#F5F5F5' },
  divider: { height: '1px', backgroundColor: '#E5E5E5', margin: '8px 0' },
}

export function SidebarNavigation({ sections = [], activeId, onNavigate, style }) {
  return (
    <nav aria-label="Account navigation" style={{ ...styles.sidebar, ...style }}>
      {sections.map((section, si) => (
        <div key={si}>
          {section.label && (
            <div style={styles.sectionLabel}>{section.label}</div>
          )}
          {section.items.map(item => {
            const isActive = item.id === activeId
            return (
              <a
                key={item.id}
                href={item.href || '#'}
                onClick={e => { if (!item.href) { e.preventDefault(); onNavigate?.(item.id) } }}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  ...styles.item,
                  ...(isActive ? styles.itemActive : {}),
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = '#F5F5F5' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = '' }}
              >
                {item.icon && <span aria-hidden="true">{item.icon}</span>}
                {item.label}
              </a>
            )
          })}
          {si < sections.length - 1 && section.dividerAfter && <div style={styles.divider} />}
        </div>
      ))}
    </nav>
  )
}

SidebarNavigation.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    dividerAfter: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      icon: PropTypes.node,
    })).isRequired,
  })),
  activeId: PropTypes.string,
  onNavigate: PropTypes.func,
  style: PropTypes.object,
}

export default SidebarNavigation

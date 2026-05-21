import React from 'react'
import PropTypes from 'prop-types'

/**
 * Breadcrumb — RAA Web
 *
 * Navigation trail showing the user's location within the site hierarchy.
 * Used across My Account sub-pages. Current page is not a link.
 *
 * Import path: @raa-web/components/Breadcrumb
 */

const styles = {
  nav: { fontFamily: 'Arial, Helvetica, sans-serif' },
  list: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '4px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: { display: 'flex', alignItems: 'center', gap: '4px' },
  link: {
    fontSize: '13px',
    color: '#1A1A1A',
    textDecoration: 'none',
    fontWeight: '500',
  },
  current: { fontSize: '13px', color: '#5C5C5C' },
  separator: { color: '#D9D9D9', flexShrink: 0 },
}

function Separator() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={styles.separator}>
      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Breadcrumb({ items = [], style }) {
  return (
    <nav aria-label="Breadcrumb" style={{ ...styles.nav, ...style }}>
      <ol style={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} style={styles.item}>
              {isLast ? (
                <span aria-current="page" style={styles.current}>{item.label}</span>
              ) : (
                <>
                  <a
                    href={item.href || '#'}
                    style={styles.link}
                    onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline' }}
                    onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none' }}
                  >
                    {item.label}
                  </a>
                  <Separator />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
  })),
  style: PropTypes.object,
}

export default Breadcrumb

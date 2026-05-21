import React from 'react'
import PropTypes from 'prop-types'

/**
 * Footer — RAA Web
 *
 * Site-wide footer with link columns, legal text, and social links.
 * Used at the bottom of all raa.com.au pages.
 *
 * Import path: @raa-web/components/Footer
 */

const styles = {
  footer: {
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    fontFamily: 'Arial, Helvetica, sans-serif',
    padding: '48px 24px 24px',
  },
  inner: { maxWidth: '1200px', margin: '0 auto' },
  columns: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '32px',
    marginBottom: '40px',
  },
  columnTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: '14px',
  },
  link: {
    display: 'block',
    fontSize: '14px',
    color: 'rgba(255,255,255,0.75)',
    textDecoration: 'none',
    marginBottom: '10px',
    transition: 'color 0.15s',
  },
  divider: { height: '1px', backgroundColor: 'rgba(255,255,255,0.12)', marginBottom: '24px' },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  },
  legal: { fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6' },
  legalLinks: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  legalLink: { fontSize: '12px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' },
}

export function Footer({ columns = [], legalLinks = [], legalText, style }) {
  return (
    <footer style={{ ...styles.footer, ...style }}>
      <div style={styles.inner}>
        {columns.length > 0 && (
          <div style={styles.columns}>
            {columns.map((col, i) => (
              <div key={i}>
                <div style={styles.columnTitle}>{col.title}</div>
                {col.links.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    style={styles.link}
                    onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        )}

        <div style={styles.divider} />

        <div style={styles.bottom}>
          {legalText && <p style={styles.legal}>{legalText}</p>}
          {legalLinks.length > 0 && (
            <div style={styles.legalLinks}>
              {legalLinks.map(link => (
                <a key={link.label} href={link.href} style={styles.legalLink}
                  onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })).isRequired,
  })),
  legalLinks: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  })),
  legalText: PropTypes.string,
  style: PropTypes.object,
}

export default Footer

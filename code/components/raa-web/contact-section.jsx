import React from 'react'
import PropTypes from 'prop-types'

/**
 * Contact Section — RAA Web
 *
 * Contact options block displayed at the bottom of My Account pages and
 * after key flow completions. Lists phone, email, and chat contact methods
 * with their availability hours.
 *
 * Import path: @raa-web/components/ContactSection
 */

const DEFAULT_CHANNELS = [
  {
    id: 'phone',
    icon: '📞',
    label: 'Call us',
    value: '1300 722 999',
    href: 'tel:1300722999',
    availability: 'Mon–Fri 8:30am–5:30pm ACST',
  },
  {
    id: 'chat',
    icon: '💬',
    label: 'Live chat',
    value: 'Start chat',
    href: '#chat',
    availability: 'Mon–Fri 9am–5pm ACST',
  },
  {
    id: 'email',
    icon: '✉️',
    label: 'Email us',
    value: 'Send a message',
    href: 'mailto:help@raa.com.au',
    availability: 'Response within 2 business days',
  },
]

const styles = {
  section: { fontFamily: 'Arial, Helvetica, sans-serif' },
  heading: { fontSize: '16px', fontWeight: '700', color: '#1A1A1A', marginBottom: '16px' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '12px',
  },
  card: {
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    padding: '16px 18px',
    backgroundColor: '#FFFFFF',
  },
  iconRow: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' },
  icon: { fontSize: '18px' },
  channelLabel: { fontSize: '12px', fontWeight: '700', color: '#5C5C5C', textTransform: 'uppercase', letterSpacing: '0.05em' },
  link: {
    display: 'inline-block',
    fontSize: '15px',
    fontWeight: '600',
    color: '#1A1A1A',
    textDecoration: 'none',
    marginBottom: '4px',
  },
  availability: { fontSize: '12px', color: '#A3A3A3' },
}

export function ContactSection({ heading = 'Get in touch', channels = DEFAULT_CHANNELS, style }) {
  return (
    <section style={{ ...styles.section, ...style }}>
      <h2 style={styles.heading}>{heading}</h2>
      <div style={styles.grid}>
        {channels.map(ch => (
          <div key={ch.id} style={styles.card}>
            <div style={styles.iconRow}>
              <span style={styles.icon} aria-hidden="true">{ch.icon}</span>
              <span style={styles.channelLabel}>{ch.label}</span>
            </div>
            <a href={ch.href} style={styles.link}
              onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline' }}
              onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none' }}
            >
              {ch.value}
            </a>
            {ch.availability && <div style={styles.availability}>{ch.availability}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}

ContactSection.propTypes = {
  heading: PropTypes.string,
  channels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.node,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    href: PropTypes.string,
    availability: PropTypes.string,
  })),
  style: PropTypes.object,
}

export default ContactSection

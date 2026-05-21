import React from 'react'
import PropTypes from 'prop-types'

/**
 * Feature Card — RAA Web
 *
 * Marketing card used on the public-facing RAA site to highlight a product
 * or service. Supports an image or icon, title, description, and CTA link.
 *
 * Import path: @raa-web/components/FeatureCard
 */

const styles = {
  card: {
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    display: 'block',
  },
  imagePlaceholder: {
    width: '100%',
    height: '180px',
    backgroundColor: '#F5F5F5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
  },
  body: { padding: '20px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' },
  tag: {
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: '700',
    color: '#5C5C5C',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  title: { fontSize: '18px', fontWeight: '700', color: '#1A1A1A', lineHeight: '1.3' },
  description: { fontSize: '14px', color: '#5C5C5C', lineHeight: '1.6', flex: 1 },
  cta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A1A1A',
    textDecoration: 'none',
    marginTop: '4px',
  },
}

export function FeatureCard({ title, description, tag, image, imageAlt = '', icon, ctaLabel, ctaHref, style }) {
  return (
    <div style={{ ...styles.card, ...style }}>
      {image ? (
        <img src={image} alt={imageAlt} style={styles.image} />
      ) : icon ? (
        <div style={styles.imagePlaceholder}>{icon}</div>
      ) : null}

      <div style={styles.body}>
        {tag && <span style={styles.tag}>{tag}</span>}
        <h3 style={styles.title}>{title}</h3>
        {description && <p style={styles.description}>{description}</p>}
        {ctaLabel && (
          <a href={ctaHref || '#'} style={styles.cta}
            onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline' }}
            onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none' }}
          >
            {ctaLabel}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  tag: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  icon: PropTypes.node,
  ctaLabel: PropTypes.string,
  ctaHref: PropTypes.string,
  style: PropTypes.object,
}

export default FeatureCard

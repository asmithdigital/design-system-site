import React, { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Promo Banner — RAA Web
 *
 * Dismissible promotional banner. Used in My Account to surface offers,
 * renewal reminders, and value-add information. Yellow accent variant
 * for high-priority messages; neutral for informational.
 *
 * Import path: @raa-web/components/PromoBanner
 */

const VARIANTS = {
  promo:       { bg: '#FFFBE6', border: '#FFD100', accent: '#FFD100' },
  info:        { bg: '#EFF6FF', border: '#BFDBFE', accent: '#2563EB' },
  success:     { bg: '#F0FDF4', border: '#BBF7D0', accent: '#16A34A' },
  warning:     { bg: '#FFFBEB', border: '#FDE68A', accent: '#D97706' },
}

const styles = {
  banner: {
    borderRadius: '8px',
    borderLeft: '4px solid',
    padding: '16px 20px',
    display: 'flex',
    gap: '14px',
    alignItems: 'flex-start',
    fontFamily: 'Arial, Helvetica, sans-serif',
    position: 'relative',
  },
  icon: { fontSize: '20px', flexShrink: 0, lineHeight: 1 },
  content: { flex: 1 },
  title: { fontSize: '15px', fontWeight: '700', color: '#1A1A1A', marginBottom: '4px' },
  body: { fontSize: '14px', color: '#5C5C5C', lineHeight: '1.6' },
  ctaLink: { display: 'inline-block', marginTop: '10px', fontSize: '13px', fontWeight: '600', textDecoration: 'none', color: '#1A1A1A' },
  closeBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#A3A3A3',
    padding: '4px',
    borderRadius: '4px',
    display: 'flex',
    lineHeight: 1,
  },
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function PromoBanner({
  title,
  body,
  variant = 'promo',
  icon,
  ctaLabel,
  ctaHref,
  onCtaClick,
  dismissible = true,
  style,
}) {
  const [dismissed, setDismissed] = useState(false)
  const v = VARIANTS[variant] || VARIANTS.promo

  if (dismissed) return null

  return (
    <div style={{
      ...styles.banner,
      backgroundColor: v.bg,
      borderLeftColor: v.border,
      paddingRight: dismissible ? '40px' : '20px',
      ...style,
    }}>
      {icon && <span style={styles.icon} aria-hidden="true">{icon}</span>}

      <div style={styles.content}>
        {title && <div style={styles.title}>{title}</div>}
        {body && <div style={styles.body}>{body}</div>}
        {ctaLabel && (
          <a href={ctaHref || '#'} style={{ ...styles.ctaLink, color: v.accent }}
            onClick={onCtaClick}
          >
            {ctaLabel} →
          </a>
        )}
      </div>

      {dismissible && (
        <button
          style={styles.closeBtn}
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  )
}

PromoBanner.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  variant: PropTypes.oneOf(['promo', 'info', 'success', 'warning']),
  icon: PropTypes.node,
  ctaLabel: PropTypes.string,
  ctaHref: PropTypes.string,
  onCtaClick: PropTypes.func,
  dismissible: PropTypes.bool,
  style: PropTypes.object,
}

export default PromoBanner

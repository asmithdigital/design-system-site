import React, { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Mascot Tip — RAA Web
 *
 * Contextual help tip displayed in the right gutter of Quote to Buy steps.
 * Features the RAA mascot and provides friendly guidance on complex decisions.
 * At most one per step, positioned next to the most complex form field.
 *
 * Import path: @raa-web/components/MascotTip
 */

const styles = {
  container: {
    backgroundColor: '#FFFBE6',
    border: '1px solid #FFD100',
    borderRadius: '10px',
    padding: '16px',
    fontFamily: 'Arial, Helvetica, sans-serif',
    position: 'relative',
    maxWidth: '220px',
  },
  mascot: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#FFD100',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    marginBottom: '10px',
    border: '3px solid #FFFFFF',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  title: { fontSize: '13px', fontWeight: '700', color: '#1A1A1A', marginBottom: '6px' },
  body: { fontSize: '13px', color: '#5C5C5C', lineHeight: '1.6' },
  link: { fontSize: '12px', fontWeight: '600', color: '#1A1A1A', textDecoration: 'underline', marginTop: '8px', display: 'inline-block', cursor: 'pointer' },
  dismissBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#A3A3A3',
    padding: '2px',
    display: 'flex',
    borderRadius: '3px',
  },
}

export function MascotTip({
  title,
  body,
  mascotEmoji = '🦘',
  learnMoreLabel,
  onLearnMore,
  dismissible = true,
  style,
}) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <aside style={{ ...styles.container, ...style }}>
      {dismissible && (
        <button style={styles.dismissBtn} onClick={() => setDismissed(true)} aria-label="Dismiss tip">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      )}

      <div style={styles.mascot} aria-hidden="true">{mascotEmoji}</div>

      {title && <div style={styles.title}>{title}</div>}
      <div style={styles.body}>{body}</div>

      {learnMoreLabel && (
        <button style={{ ...styles.link, background: 'none', border: 'none', fontFamily: 'inherit' }} onClick={onLearnMore}>
          {learnMoreLabel} →
        </button>
      )}
    </aside>
  )
}

MascotTip.propTypes = {
  title: PropTypes.string,
  body: PropTypes.node.isRequired,
  mascotEmoji: PropTypes.string,
  learnMoreLabel: PropTypes.string,
  onLearnMore: PropTypes.func,
  dismissible: PropTypes.bool,
  style: PropTypes.object,
}

export default MascotTip

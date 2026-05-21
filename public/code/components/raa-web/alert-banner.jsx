import React, { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Alert Banner — RAA Web
 *
 * Full-width inline notification. Used for form error summaries, coverage
 * limitations, success confirmations, and system messages.
 * Appears inline within the content area — not as a toast/overlay.
 *
 * Import path: @raa-web/components/AlertBanner
 */

const TYPES = {
  error:   { bg: '#FEF2F2', border: '#FECACA', icon: '✕', iconColor: '#DC2626', titleColor: '#DC2626' },
  warning: { bg: '#FFFBEB', border: '#FDE68A', icon: '!',  iconColor: '#D97706', titleColor: '#92400E' },
  success: { bg: '#F0FDF4', border: '#BBF7D0', icon: '✓', iconColor: '#16A34A', titleColor: '#166534' },
  info:    { bg: '#EFF6FF', border: '#BFDBFE', icon: 'i',  iconColor: '#2563EB', titleColor: '#1E40AF' },
}

const styles = {
  banner: {
    borderRadius: '6px',
    border: '1px solid',
    padding: '14px 16px',
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  iconCircle: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '900',
    flexShrink: 0,
    marginTop: '1px',
    color: '#FFFFFF',
  },
  content: { flex: 1 },
  title: { fontSize: '14px', fontWeight: '700', marginBottom: '4px' },
  body: { fontSize: '14px', color: '#5C5C5C', lineHeight: '1.6' },
  list: { margin: '8px 0 0', padding: '0 0 0 16px', fontSize: '14px', color: '#5C5C5C', lineHeight: '1.8' },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#A3A3A3',
    padding: '2px',
    flexShrink: 0,
    display: 'flex',
  },
}

export function AlertBanner({
  type = 'info',
  title,
  message,
  errors,
  dismissible = false,
  onDismiss,
  style,
}) {
  const [dismissed, setDismissed] = useState(false)
  const t = TYPES[type] || TYPES.info

  if (dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      style={{
        ...styles.banner,
        backgroundColor: t.bg,
        borderColor: t.border,
        ...style,
      }}
    >
      <div style={{ ...styles.iconCircle, backgroundColor: t.iconColor }}>
        {t.icon}
      </div>

      <div style={styles.content}>
        {title && <div style={{ ...styles.title, color: t.titleColor }}>{title}</div>}
        {message && <div style={styles.body}>{message}</div>}
        {errors && errors.length > 0 && (
          <ul style={styles.list}>
            {errors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        )}
      </div>

      {dismissible && (
        <button style={styles.closeBtn} onClick={handleDismiss} aria-label="Dismiss">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}

AlertBanner.propTypes = {
  type: PropTypes.oneOf(['error', 'warning', 'success', 'info']),
  title: PropTypes.string,
  message: PropTypes.string,
  /** List of error messages — renders as a bullet list below title */
  errors: PropTypes.arrayOf(PropTypes.string),
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  style: PropTypes.object,
}

export default AlertBanner

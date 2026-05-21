import React from 'react'
import PropTypes from 'prop-types'

/**
 * Primary Button — RAA Web
 *
 * Main call-to-action button. Yellow background with dark text.
 * Use for the single most important action on any screen.
 * Only one Primary Button should appear per view.
 *
 * Import path: @raa-web/components/PrimaryButton
 */

const styles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    height: '48px',
    padding: '0 24px',
    minWidth: '120px',
    backgroundColor: '#FFD100',
    color: '#1A1A1A',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '1',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.15s ease',
    outline: 'none',
  },
  hover: { backgroundColor: '#E6BC00' },
  disabled: {
    backgroundColor: '#E5E5E5',
    color: '#A3A3A3',
    cursor: 'not-allowed',
  },
  loading: { cursor: 'wait' },
}

function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"
      style={{ animation: 'spin 0.8s linear infinite' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <circle cx="9" cy="9" r="7" stroke="#1A1A1A" strokeWidth="2" strokeOpacity="0.25" />
      <path d="M9 2a7 7 0 0 1 7 7" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PrimaryButton({
  children,
  variant = 'default',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  style,
  ...props
}) {
  const isDisabled = disabled || loading

  const computedStyle = {
    ...styles.base,
    ...(isDisabled ? (loading ? styles.loading : styles.disabled) : {}),
    ...style,
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      style={computedStyle}
      onMouseEnter={e => { if (!isDisabled) e.currentTarget.style.backgroundColor = '#E6BC00' }}
      onMouseLeave={e => { if (!isDisabled) e.currentTarget.style.backgroundColor = '#FFD100' }}
      onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 209, 0, 0.4)' }}
      onBlur={e => { e.currentTarget.style.boxShadow = 'none' }}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {variant === 'with-checkmark' && <CheckIcon />}
          {children}
          {variant === 'with-arrow' && <ArrowIcon />}
        </>
      )}
    </button>
  )
}

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  /** Visual variant of the button */
  variant: PropTypes.oneOf(['default', 'with-arrow', 'with-checkmark']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  style: PropTypes.object,
}

export default PrimaryButton

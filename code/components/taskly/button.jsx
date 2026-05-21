import React from 'react'
import PropTypes from 'prop-types'

/**
 * Button — Taskly
 *
 * Primary interactive control for the Taskly app. Supports primary (navy),
 * accent (blue), ghost, and danger variants. Inter font, 44px touch target.
 *
 * Import path: @taskly/components/Button
 */

const VARIANTS = {
  primary: {
    backgroundColor: '#1A2B4A',
    color: '#FFFFFF',
    border: 'none',
    hoverBg: '#14223A',
  },
  accent: {
    backgroundColor: '#2B7DE9',
    color: '#FFFFFF',
    border: 'none',
    hoverBg: '#2060C9',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#1A2B4A',
    border: '1.5px solid #E2E8F0',
    hoverBg: '#F8F9FA',
  },
  danger: {
    backgroundColor: '#DC2626',
    color: '#FFFFFF',
    border: 'none',
    hoverBg: '#B91C1C',
  },
}

const sizes = {
  sm: { height: '36px', padding: '0 14px', fontSize: '13px' },
  md: { height: '44px', padding: '0 20px', fontSize: '15px' },
  lg: { height: '52px', padding: '0 28px', fontSize: '16px' },
}

const baseStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  minWidth: '80px',
  borderRadius: '8px',
  fontFamily: "'Inter', -apple-system, sans-serif",
  fontWeight: '600',
  lineHeight: '1',
  cursor: 'pointer',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  transition: 'background-color 0.15s ease, opacity 0.15s ease',
  outline: 'none',
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
      style={{ animation: 'spin 0.8s linear infinite' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
      <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  style,
  ...props
}) {
  const v = VARIANTS[variant] || VARIANTS.primary
  const s = sizes[size] || sizes.md
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      style={{
        ...baseStyle,
        ...s,
        backgroundColor: v.backgroundColor,
        color: v.color,
        border: v.border || 'none',
        width: fullWidth ? '100%' : undefined,
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? (loading ? 'wait' : 'not-allowed') : 'pointer',
        ...style,
      }}
      onMouseEnter={e => { if (!isDisabled) e.currentTarget.style.backgroundColor = v.hoverBg }}
      onMouseLeave={e => { if (!isDisabled) e.currentTarget.style.backgroundColor = v.backgroundColor }}
      onFocus={e => { e.currentTarget.style.boxShadow = `0 0 0 3px ${variant === 'accent' ? 'rgba(43,125,233,0.35)' : 'rgba(26,43,74,0.25)'}` }}
      onBlur={e => { e.currentTarget.style.boxShadow = 'none' }}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'accent', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  style: PropTypes.object,
}

export default Button

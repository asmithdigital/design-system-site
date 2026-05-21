import React from 'react'
import PropTypes from 'prop-types'

/**
 * Secondary Button — RAA Web
 *
 * Outlined button for secondary actions. White background, dark border.
 * Can appear multiple times on a page alongside a Primary Button.
 *
 * Import path: @raa-web/components/SecondaryButton
 */

const styles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    height: '44px',
    padding: '0 20px',
    backgroundColor: '#FFFFFF',
    color: '#1A1A1A',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '1',
    borderRadius: '8px',
    border: '1px solid #1A1A1A',
    cursor: 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.15s ease',
    outline: 'none',
  },
  small: { height: '36px', padding: '0 14px', fontSize: '14px' },
  disabled: { borderColor: '#D9D9D9', color: '#A3A3A3', cursor: 'not-allowed' },
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M6 2H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V8M8 1h5v5M13 1 6 8"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SecondaryButton({
  children,
  variant = 'default',
  size = 'default',
  disabled = false,
  type = 'button',
  href,
  target,
  onClick,
  style,
  ...props
}) {
  const computedStyle = {
    ...styles.base,
    ...(size === 'small' ? styles.small : {}),
    ...(disabled ? styles.disabled : {}),
    ...style,
  }

  const content = (
    <>
      {children}
      {variant === 'with-external-icon' && <ExternalIcon />}
    </>
  )

  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        style={computedStyle}
        onMouseEnter={e => { if (!disabled) e.currentTarget.style.backgroundColor = '#F5F5F5' }}
        onMouseLeave={e => { if (!disabled) e.currentTarget.style.backgroundColor = '#FFFFFF' }}
        onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 0, 0, 0.15)' }}
        onBlur={e => { e.currentTarget.style.boxShadow = 'none' }}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      style={computedStyle}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.backgroundColor = '#F5F5F5' }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.backgroundColor = '#FFFFFF' }}
      onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 0, 0, 0.15)' }}
      onBlur={e => { e.currentTarget.style.boxShadow = 'none' }}
      {...props}
    >
      {content}
    </button>
  )
}

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'with-external-icon']),
  size: PropTypes.oneOf(['default', 'small']),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Renders as an anchor tag when provided */
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
}

export default SecondaryButton

import React, { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Header Bar — RAA Web
 *
 * Fixed top navigation bar with RAA logo, primary nav links, and member actions.
 * Used on raa.com.au public pages and at the top of My Account.
 *
 * Import path: @raa-web/components/HeaderBar
 */

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '64px',
    backgroundColor: '#1A1A1A',
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    zIndex: 1000,
    fontFamily: 'Arial, Helvetica, sans-serif',
    boxSizing: 'border-box',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    color: '#FFFFFF',
  },
  logoMark: {
    width: '36px',
    height: '36px',
    backgroundColor: '#FFD100',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '900',
    fontSize: '18px',
    color: '#1A1A1A',
    flexShrink: 0,
  },
  logoText: { fontSize: '16px', fontWeight: '700', color: '#FFFFFF' },
  nav: { display: 'flex', alignItems: 'center', gap: '4px' },
  navLink: {
    padding: '8px 14px',
    color: 'rgba(255,255,255,0.8)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '6px',
    transition: 'background-color 0.15s',
  },
  actions: { display: 'flex', alignItems: 'center', gap: '10px' },
  signInBtn: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: '1px solid rgba(255,255,255,0.4)',
    borderRadius: '6px',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  joinBtn: {
    padding: '8px 16px',
    backgroundColor: '#FFD100',
    border: 'none',
    borderRadius: '6px',
    color: '#1A1A1A',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
}

export function HeaderBar({
  navItems = [],
  onSignIn,
  onJoin,
  isAuthenticated = false,
  memberName,
  logoHref = '/',
  style,
}) {
  return (
    <header style={{ ...styles.header, ...style }}>
      <div style={styles.inner}>
        <a href={logoHref} style={styles.logo} aria-label="RAA Home">
          <div style={styles.logoMark}>R</div>
          <span style={styles.logoText}>RAA</span>
        </a>

        {navItems.length > 0 && (
          <nav aria-label="Main navigation" style={styles.nav}>
            {navItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                style={styles.navLink}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '' }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div style={styles.actions}>
          {isAuthenticated ? (
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
              Hi, {memberName}
            </span>
          ) : (
            <>
              <button style={styles.signInBtn} onClick={onSignIn}>Sign in</button>
              <button style={styles.joinBtn} onClick={onJoin}>Join RAA</button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

HeaderBar.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  })),
  onSignIn: PropTypes.func,
  onJoin: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  memberName: PropTypes.string,
  logoHref: PropTypes.string,
  style: PropTypes.object,
}

export default HeaderBar

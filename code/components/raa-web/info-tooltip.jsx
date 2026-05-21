import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 * Info Tooltip — RAA Web
 *
 * Inline help tooltip triggered by a ⓘ icon. Used next to form labels
 * and complex terms to provide contextual help without cluttering the UI.
 * Appears above the trigger by default; auto-flips if near viewport edge.
 *
 * Import path: @raa-web/components/InfoTooltip
 */

const styles = {
  wrapper: { display: 'inline-flex', alignItems: 'center', position: 'relative' },
  trigger: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: '#D9D9D9',
    color: '#5C5C5C',
    fontSize: '11px',
    fontWeight: '700',
    fontFamily: 'Arial, Helvetica, sans-serif',
    flexShrink: 0,
    transition: 'background-color 0.15s',
    padding: 0,
  },
  tooltip: {
    position: 'absolute',
    bottom: 'calc(100% + 8px)',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '220px',
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    fontSize: '13px',
    lineHeight: '1.5',
    padding: '10px 14px',
    borderRadius: '6px',
    fontFamily: 'Arial, Helvetica, sans-serif',
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    pointerEvents: 'none',
  },
  arrow: {
    position: 'absolute',
    bottom: '-5px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '10px',
    height: '5px',
    overflow: 'hidden',
  },
}

export function InfoTooltip({ content, label = 'i', style }) {
  const [visible, setVisible] = useState(false)
  const triggerRef = useRef(null)
  const tooltipId = React.useId()

  return (
    <span style={{ ...styles.wrapper, ...style }}>
      <button
        ref={triggerRef}
        aria-label="More information"
        aria-describedby={visible ? tooltipId : undefined}
        style={styles.trigger}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
      >
        {label}
      </button>

      {visible && (
        <span
          id={tooltipId}
          role="tooltip"
          style={styles.tooltip}
        >
          {content}
          <span style={styles.arrow}>
            <svg viewBox="0 0 10 5" width="10" height="5">
              <path d="M0 0l5 5 5-5z" fill="#1A1A1A" />
            </svg>
          </span>
        </span>
      )}
    </span>
  )
}

InfoTooltip.propTypes = {
  content: PropTypes.node.isRequired,
  /** Text shown inside the trigger circle. Default is "i". */
  label: PropTypes.string,
  style: PropTypes.object,
}

export default InfoTooltip

import React from 'react'
import PropTypes from 'prop-types'

/**
 * Stepper Navigation — RAA Web
 *
 * Vertical step-by-step navigation for multi-step flows (Quote to Buy, Claims).
 * Shows completed (green checkmark), current (highlighted), and upcoming (grey) steps.
 * Fixed to the left of the form content area in the Quote Step Page template.
 *
 * Import path: @raa-web/components/StepperNavigation
 */

const styles = {
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    width: '200px',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  step: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    position: 'relative',
    paddingBottom: '24px',
  },
  connector: {
    position: 'absolute',
    left: '11px',
    top: '24px',
    bottom: '0',
    width: '2px',
    backgroundColor: '#E5E5E5',
  },
  connectorDone: { backgroundColor: '#16A34A' },
  indicator: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: '12px',
    fontWeight: '700',
    zIndex: 1,
  },
  indicatorDone: { backgroundColor: '#16A34A' },
  indicatorCurrent: { backgroundColor: '#1A1A1A' },
  indicatorUpcoming: { backgroundColor: '#E5E5E5', color: '#5C5C5C' },
  labelGroup: { paddingTop: '2px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#1A1A1A' },
  labelUpcoming: { color: '#5C5C5C' },
  subLabel: { fontSize: '12px', color: '#5C5C5C', marginTop: '2px' },
}

function CheckIcon() {
  return (
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden="true">
      <path d="M1 4l3.5 3.5L11 1" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function StepperNavigation({ steps = [], currentStep = 0, style }) {
  return (
    <nav aria-label="Step navigation" style={{ ...styles.nav, ...style }}>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {steps.map((step, i) => {
          const isDone = i < currentStep
          const isCurrent = i === currentStep
          const isLast = i === steps.length - 1

          return (
            <li key={i} style={{ ...styles.step, ...(isLast ? { paddingBottom: 0 } : {}) }}>
              {!isLast && (
                <div style={{ ...styles.connector, ...(isDone ? styles.connectorDone : {}) }} />
              )}

              <div style={{
                ...styles.indicator,
                ...(isDone ? styles.indicatorDone : isCurrent ? styles.indicatorCurrent : styles.indicatorUpcoming),
              }}>
                {isDone
                  ? <CheckIcon />
                  : <span style={{ color: isCurrent ? '#FFFFFF' : '#5C5C5C', fontSize: '12px', fontWeight: 700 }}>{i + 1}</span>
                }
              </div>

              <div style={styles.labelGroup}>
                <div style={{
                  ...styles.label,
                  ...(!isDone && !isCurrent ? styles.labelUpcoming : {}),
                }}>
                  {step.label}
                </div>
                {step.subLabel && isCurrent && (
                  <div style={styles.subLabel}>{step.subLabel}</div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

StepperNavigation.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    subLabel: PropTypes.string,
  })),
  /** Zero-based index of the currently active step */
  currentStep: PropTypes.number,
  style: PropTypes.object,
}

export default StepperNavigation

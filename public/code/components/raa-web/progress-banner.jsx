import React from 'react'
import PropTypes from 'prop-types'

/**
 * Progress Banner — RAA Web
 *
 * Full-width banner shown at the top of each Quote to Buy step.
 * Displays the current step number, step title, and a progress bar.
 *
 * Import path: @raa-web/components/ProgressBanner
 */

const styles = {
  banner: {
    width: '100%',
    backgroundColor: '#1A1A1A',
    padding: '14px 24px',
    boxSizing: 'border-box',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  inner: {
    maxWidth: '960px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepLabel: { fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  title: { fontSize: '15px', color: '#FFFFFF', fontWeight: '600' },
  track: {
    width: '100%',
    height: '4px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: '9999px',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#FFD100',
    borderRadius: '9999px',
    transition: 'width 0.3s ease',
  },
}

export function ProgressBanner({
  currentStep,
  totalSteps,
  title,
  style,
}) {
  const percent = Math.round((currentStep / totalSteps) * 100)

  return (
    <div style={{ ...styles.banner, ...style }}>
      <div style={styles.inner}>
        <div style={styles.top}>
          <span style={styles.stepLabel}>Step {currentStep} of {totalSteps}</span>
          <span style={styles.title}>{title}</span>
        </div>
        <div style={styles.track} role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
          <div style={{ ...styles.fill, width: `${percent}%` }} />
        </div>
      </div>
    </div>
  )
}

ProgressBanner.propTypes = {
  /** The current step number (1-based) */
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
}

export default ProgressBanner

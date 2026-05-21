import React, { useId } from 'react'
import PropTypes from 'prop-types'

/**
 * Toggle Switch — RAA Web
 *
 * Binary on/off control. Use in place of a checkbox when the action takes
 * immediate effect (e.g. enabling a feature, opting into a preference).
 * Do not use for form submissions — use a Checkbox instead.
 *
 * Import path: @raa-web/components/ToggleSwitch
 */

const TRACK_W = 44
const TRACK_H = 24
const THUMB_SIZE = 18
const THUMB_OFFSET = 3

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontFamily: 'Arial, Helvetica, sans-serif',
    cursor: 'pointer',
  },
  hiddenInput: { position: 'absolute', opacity: 0, width: 0, height: 0 },
  track: {
    position: 'relative',
    width: TRACK_W + 'px',
    height: TRACK_H + 'px',
    borderRadius: '9999px',
    backgroundColor: '#D9D9D9',
    transition: 'background-color 0.2s ease',
    flexShrink: 0,
  },
  trackOn: { backgroundColor: '#1A1A1A' },
  thumb: {
    position: 'absolute',
    top: THUMB_OFFSET + 'px',
    left: THUMB_OFFSET + 'px',
    width: THUMB_SIZE + 'px',
    height: THUMB_SIZE + 'px',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
    transition: 'left 0.2s ease',
  },
  thumbOn: { left: (TRACK_W - THUMB_SIZE - THUMB_OFFSET) + 'px' },
  label: { fontSize: '15px', color: '#1A1A1A' },
  description: { fontSize: '13px', color: '#5C5C5C', marginTop: '2px' },
  disabled: { opacity: 0.5, cursor: 'not-allowed' },
}

export function ToggleSwitch({
  label,
  description,
  id: idProp,
  name,
  checked = false,
  onChange,
  disabled = false,
  style,
}) {
  const generatedId = useId()
  const id = idProp || generatedId

  return (
    <label
      htmlFor={id}
      style={{
        ...styles.wrapper,
        ...(disabled ? styles.disabled : {}),
        ...style,
      }}
    >
      <input
        id={id}
        type="checkbox"
        role="switch"
        name={name}
        checked={checked}
        onChange={disabled ? undefined : onChange}
        disabled={disabled}
        aria-checked={checked}
        style={styles.hiddenInput}
      />

      <span
        style={{ ...styles.track, ...(checked ? styles.trackOn : {}) }}
        aria-hidden="true"
      >
        <span style={{ ...styles.thumb, ...(checked ? styles.thumbOn : {}) }} />
      </span>

      {(label || description) && (
        <div>
          {label && <div style={styles.label}>{label}</div>}
          {description && <div style={styles.description}>{description}</div>}
        </div>
      )}
    </label>
  )
}

ToggleSwitch.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
}

export default ToggleSwitch

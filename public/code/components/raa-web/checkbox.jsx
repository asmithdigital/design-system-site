import React, { useId } from 'react'
import PropTypes from 'prop-types'

/**
 * Checkbox — RAA Web
 *
 * Standard checkbox with label. Supports indeterminate state for parent checkboxes
 * in a hierarchical list. Validates on blur in form contexts.
 *
 * Import path: @raa-web/components/Checkbox
 */

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    cursor: 'pointer',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  hiddenInput: { position: 'absolute', opacity: 0, width: 0, height: 0 },
  box: {
    width: '20px',
    height: '20px',
    borderRadius: '3px',
    border: '2px solid #D9D9D9',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '1px',
    transition: 'border-color 0.15s, background-color 0.15s',
  },
  boxChecked: { backgroundColor: '#1A1A1A', borderColor: '#1A1A1A' },
  boxIndeterminate: { backgroundColor: '#1A1A1A', borderColor: '#1A1A1A' },
  boxError: { borderColor: '#DC2626' },
  label: { fontSize: '15px', color: '#1A1A1A', lineHeight: '1.5', flex: 1 },
  labelDisabled: { color: '#A3A3A3' },
  errorText: { fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', color: '#DC2626', marginTop: '4px' },
}

function CheckIcon() {
  return (
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden="true">
      <path d="M1 4l3.5 3.5L11 1" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DashIcon() {
  return (
    <svg width="10" height="2" viewBox="0 0 10 2" fill="none" aria-hidden="true">
      <line x1="1" y1="1" x2="9" y2="1" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function Checkbox({
  label,
  id: idProp,
  name,
  checked = false,
  defaultChecked,
  indeterminate = false,
  onChange,
  disabled = false,
  error,
  style,
}) {
  const generatedId = useId()
  const id = idProp || generatedId

  const isChecked = indeterminate ? false : checked

  return (
    <div>
      <label
        htmlFor={id}
        style={{
          ...styles.wrapper,
          ...(disabled ? { cursor: 'not-allowed', opacity: 0.5 } : {}),
          ...style,
        }}
      >
        <input
          id={id}
          type="checkbox"
          name={name}
          checked={isChecked}
          defaultChecked={defaultChecked}
          onChange={disabled ? undefined : onChange}
          disabled={disabled}
          aria-invalid={!!error}
          ref={el => { if (el) el.indeterminate = indeterminate }}
          style={styles.hiddenInput}
        />
        <span style={{
          ...styles.box,
          ...(checked || indeterminate ? styles.boxChecked : {}),
          ...(error ? styles.boxError : {}),
        }}>
          {indeterminate ? <DashIcon /> : checked ? <CheckIcon /> : null}
        </span>
        {label && (
          <span style={{ ...styles.label, ...(disabled ? styles.labelDisabled : {}) }}>
            {label}
          </span>
        )}
      </label>
      {error && <p role="alert" style={styles.errorText}>{error}</p>}
    </div>
  )
}

Checkbox.propTypes = {
  label: PropTypes.node,
  id: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  /** When true, shows a dash and sets aria-checked to "mixed" */
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  style: PropTypes.object,
}

export default Checkbox

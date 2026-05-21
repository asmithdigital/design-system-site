import React, { useState, useId } from 'react'
import PropTypes from 'prop-types'

/**
 * Text Input — RAA Web
 *
 * Single-line text input with label above and optional helper/error text.
 * Validates on blur. Supports error, success, and disabled states.
 *
 * Import path: @raa-web/components/TextInput
 */

const inputStyles = {
  wrapper: { display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' },
  label: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A1A1A',
  },
  labelDisabled: { color: '#A3A3A3' },
  input: {
    height: '52px',
    padding: '0 14px',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '16px',
    color: '#1A1A1A',
    backgroundColor: '#FFFFFF',
    border: '1px solid #D9D9D9',
    borderRadius: '4px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  },
  inputError: { borderColor: '#DC2626', backgroundColor: '#FEF2F2' },
  inputSuccess: { borderColor: '#16A34A' },
  inputDisabled: { backgroundColor: '#F5F5F5', color: '#A3A3A3', cursor: 'not-allowed' },
  helper: { fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', color: '#5C5C5C' },
  errorText: { color: '#DC2626' },
  successText: { color: '#16A34A' },
  optional: { fontWeight: '400', color: '#5C5C5C', marginLeft: '4px' },
}

export function TextInput({
  label,
  id: idProp,
  name,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  disabled = false,
  required = false,
  error,
  success,
  helperText,
  maxLength,
  autoComplete,
  style,
  inputStyle,
  ...props
}) {
  const generatedId = useId()
  const id = idProp || generatedId
  const errorId = `${id}-error`
  const helperId = `${id}-helper`

  const [focused, setFocused] = useState(false)

  const stateStyle = error
    ? inputStyles.inputError
    : success
    ? inputStyles.inputSuccess
    : {}

  const focusStyle = focused && !error && !success
    ? { borderColor: '#1A1A1A', boxShadow: '0 0 0 3px rgba(26, 26, 26, 0.12)' }
    : {}

  return (
    <div style={{ ...inputStyles.wrapper, ...style }}>
      {label && (
        <label htmlFor={id} style={{ ...inputStyles.label, ...(disabled ? inputStyles.labelDisabled : {}) }}>
          {label}
          {!required && <span style={inputStyles.optional}>(optional)</span>}
        </label>
      )}

      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        style={{
          ...inputStyles.input,
          ...stateStyle,
          ...focusStyle,
          ...(disabled ? inputStyles.inputDisabled : {}),
          ...inputStyle,
        }}
        onFocus={() => setFocused(true)}
        onBlur={e => { setFocused(false); onBlur?.(e) }}
        {...props}
      />

      {error && (
        <span id={errorId} role="alert" style={{ ...inputStyles.helper, ...inputStyles.errorText }}>
          {error}
        </span>
      )}
      {success && !error && (
        <span style={{ ...inputStyles.helper, ...inputStyles.successText }}>{success}</span>
      )}
      {helperText && !error && !success && (
        <span id={helperId} style={inputStyles.helper}>{helperText}</span>
      )}
    </div>
  )
}

TextInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  /** Error message shown below input; switches input to error state */
  error: PropTypes.string,
  /** Success message shown below input; switches input to success state */
  success: PropTypes.string,
  helperText: PropTypes.string,
  maxLength: PropTypes.number,
  autoComplete: PropTypes.string,
  style: PropTypes.object,
  inputStyle: PropTypes.object,
}

export default TextInput

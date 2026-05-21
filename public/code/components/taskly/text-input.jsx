import React, { useState, useId } from 'react'
import PropTypes from 'prop-types'

/**
 * Text Input — Taskly
 *
 * Single-line text input styled to the Taskly design language.
 * Uses Inter font, navy focus ring, and rounded corners.
 * Supports error and disabled states.
 *
 * Import path: @taskly/components/TextInput
 */

const styles = {
  wrapper: { display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' },
  label: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    fontWeight: '600',
    color: '#1A2B4A',
    letterSpacing: '-0.01em',
  },
  input: {
    height: '44px',
    padding: '0 14px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '15px',
    color: '#1A2B4A',
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #E2E8F0',
    borderRadius: '8px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  },
  inputFocus: {
    borderColor: '#2B7DE9',
    boxShadow: '0 0 0 3px rgba(43, 125, 233, 0.2)',
  },
  inputError: { borderColor: '#DC2626', backgroundColor: '#FEF2F2' },
  inputDisabled: { backgroundColor: '#F8F9FA', color: '#94A3B8', cursor: 'not-allowed' },
  helper: { fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#64748B' },
  errorText: { color: '#DC2626' },
  iconWrapper: { position: 'relative' },
  iconLeft: { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' },
  iconRight: { position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' },
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
  helperText,
  iconLeft,
  iconRight,
  onIconRightClick,
  maxLength,
  autoComplete,
  style,
  inputStyle,
  ...props
}) {
  const generatedId = useId()
  const id = idProp || generatedId
  const [focused, setFocused] = useState(false)

  const hasLeftIcon = Boolean(iconLeft)
  const hasRightIcon = Boolean(iconRight)

  const computedInputStyle = {
    ...styles.input,
    ...(focused && !error ? styles.inputFocus : {}),
    ...(error ? styles.inputError : {}),
    ...(disabled ? styles.inputDisabled : {}),
    ...(hasLeftIcon ? { paddingLeft: '40px' } : {}),
    ...(hasRightIcon ? { paddingRight: '40px' } : {}),
    ...inputStyle,
  }

  return (
    <div style={{ ...styles.wrapper, ...style }}>
      {label && (
        <label htmlFor={id} style={styles.label}>
          {label}{required && <span style={{ color: '#DC2626', marginLeft: '2px' }}>*</span>}
        </label>
      )}

      <div style={hasLeftIcon || hasRightIcon ? styles.iconWrapper : undefined}>
        {hasLeftIcon && <span style={styles.iconLeft} aria-hidden="true">{iconLeft}</span>}

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
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          style={computedInputStyle}
          onFocus={() => setFocused(true)}
          onBlur={e => { setFocused(false); onBlur?.(e) }}
          {...props}
        />

        {hasRightIcon && (
          <button
            type="button"
            tabIndex={onIconRightClick ? 0 : -1}
            onClick={onIconRightClick}
            style={{
              ...styles.iconRight,
              background: 'none',
              border: 'none',
              cursor: onIconRightClick ? 'pointer' : 'default',
              padding: 0,
              display: 'flex',
            }}
            aria-label="Input action"
          >
            {iconRight}
          </button>
        )}
      </div>

      {error && <span id={`${id}-error`} role="alert" style={{ ...styles.helper, ...styles.errorText }}>{error}</span>}
      {helperText && !error && <span id={`${id}-helper`} style={styles.helper}>{helperText}</span>}
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
  error: PropTypes.string,
  helperText: PropTypes.string,
  /** Icon element shown on the left inside the input */
  iconLeft: PropTypes.node,
  /** Icon element shown on the right inside the input */
  iconRight: PropTypes.node,
  onIconRightClick: PropTypes.func,
  maxLength: PropTypes.number,
  autoComplete: PropTypes.string,
  style: PropTypes.object,
  inputStyle: PropTypes.object,
}

export default TextInput

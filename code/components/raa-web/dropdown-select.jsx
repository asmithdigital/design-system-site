import React, { useId } from 'react'
import PropTypes from 'prop-types'

/**
 * Dropdown Select — RAA Web
 *
 * Native select element styled to match the RAA Web design system.
 * Use when there are 5 or more options. For fewer options, prefer Radio Cards.
 *
 * Import path: @raa-web/components/DropdownSelect
 */

const styles = {
  wrapper: { display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' },
  label: { fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px', fontWeight: '600', color: '#1A1A1A' },
  selectWrapper: { position: 'relative', width: '100%' },
  select: {
    appearance: 'none',
    WebkitAppearance: 'none',
    width: '100%',
    height: '52px',
    padding: '0 44px 0 14px',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '16px',
    color: '#1A1A1A',
    backgroundColor: '#FFFFFF',
    border: '1px solid #D9D9D9',
    borderRadius: '4px',
    cursor: 'pointer',
    outline: 'none',
    boxSizing: 'border-box',
  },
  icon: {
    position: 'absolute',
    right: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: '#5C5C5C',
  },
  error: { borderColor: '#DC2626', backgroundColor: '#FEF2F2' },
  disabled: { backgroundColor: '#F5F5F5', color: '#A3A3A3', cursor: 'not-allowed' },
  helper: { fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', color: '#5C5C5C' },
  errorText: { color: '#DC2626' },
  optional: { fontWeight: '400', color: '#5C5C5C', marginLeft: '4px' },
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={styles.icon}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function DropdownSelect({
  label,
  id: idProp,
  name,
  value,
  defaultValue,
  onChange,
  options = [],
  placeholder = 'Select an option',
  disabled = false,
  required = false,
  error,
  helperText,
  style,
  ...props
}) {
  const generatedId = useId()
  const id = idProp || generatedId

  return (
    <div style={{ ...styles.wrapper, ...style }}>
      {label && (
        <label htmlFor={id} style={styles.label}>
          {label}
          {!required && <span style={styles.optional}>(optional)</span>}
        </label>
      )}

      <div style={styles.selectWrapper}>
        <select
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          style={{
            ...styles.select,
            ...(error ? styles.error : {}),
            ...(disabled ? styles.disabled : {}),
          }}
          onFocus={e => { e.currentTarget.style.borderColor = '#1A1A1A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26,26,26,0.12)' }}
          onBlur={e => { e.currentTarget.style.borderColor = error ? '#DC2626' : '#D9D9D9'; e.currentTarget.style.boxShadow = 'none' }}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map(opt => {
            const value = typeof opt === 'string' ? opt : opt.value
            const label = typeof opt === 'string' ? opt : opt.label
            return <option key={value} value={value}>{label}</option>
          })}
        </select>
        <ChevronDown />
      </div>

      {error && (
        <span role="alert" style={{ ...styles.helper, ...styles.errorText }}>{error}</span>
      )}
      {helperText && !error && (
        <span style={styles.helper}>{helperText}</span>
      )}
    </div>
  )
}

DropdownSelect.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  /**
   * Array of options. Each item is either a string or { value, label }.
   */
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
    ])
  ),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  style: PropTypes.object,
}

export default DropdownSelect

import React, { useId } from 'react'
import PropTypes from 'prop-types'

/**
 * Radio Card — RAA Web
 *
 * Large tappable card used for mutually exclusive choices.
 * Prefer over a native radio button when each option needs a description or icon.
 * Used in Quote to Buy for cover type and excess selection.
 *
 * Import path: @raa-web/components/RadioCard
 */

const styles = {
  card: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
    padding: '16px 20px',
    border: '2px solid #D9D9D9',
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
    transition: 'border-color 0.15s ease, background-color 0.15s ease',
    width: '100%',
    textAlign: 'left',
    fontFamily: 'Arial, Helvetica, sans-serif',
    outline: 'none',
  },
  cardSelected: { borderColor: '#1A1A1A', backgroundColor: '#FAFAFA' },
  cardDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  radio: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid #D9D9D9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '2px',
  },
  radioSelected: { border: '2px solid #1A1A1A' },
  radioDot: { width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#1A1A1A' },
  content: { flex: 1 },
  label: { fontSize: '15px', fontWeight: '600', color: '#1A1A1A', marginBottom: '4px' },
  description: { fontSize: '13px', color: '#5C5C5C', lineHeight: '1.5' },
  badge: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '4px',
    backgroundColor: '#FFD100',
    color: '#1A1A1A',
    fontSize: '11px',
    fontWeight: '700',
    marginLeft: '8px',
  },
}

export function RadioCard({
  label,
  description,
  value,
  checked = false,
  onChange,
  disabled = false,
  badge,
  icon,
  name,
  style,
}) {
  const id = useId()

  return (
    <label
      htmlFor={id}
      style={{
        ...styles.card,
        ...(checked ? styles.cardSelected : {}),
        ...(disabled ? styles.cardDisabled : {}),
        ...style,
      }}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />

      <div style={{ ...styles.radio, ...(checked ? styles.radioSelected : {}) }}>
        {checked && <div style={styles.radioDot} />}
      </div>

      <div style={styles.content}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
          {icon && <span style={{ display: 'flex', marginRight: '6px' }}>{icon}</span>}
          <span style={styles.label}>{label}</span>
          {badge && <span style={styles.badge}>{badge}</span>}
        </div>
        {description && <p style={styles.description}>{description}</p>}
      </div>
    </label>
  )
}

RadioCard.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  /** Short highlight label (e.g. "Most popular") */
  badge: PropTypes.string,
  /** Optional icon element displayed before the label */
  icon: PropTypes.node,
  name: PropTypes.string,
  style: PropTypes.object,
}

/**
 * RadioCardGroup — wraps multiple RadioCards with a shared name and onChange.
 */
export function RadioCardGroup({ label, name, value: groupValue, onChange, options = [], style }) {
  return (
    <fieldset style={{ border: 'none', padding: 0, margin: 0, ...style }}>
      {label && (
        <legend style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px', fontWeight: '600', color: '#1A1A1A', marginBottom: '10px' }}>
          {label}
        </legend>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {options.map(opt => (
          <RadioCard
            key={opt.value}
            name={name}
            value={opt.value}
            label={opt.label}
            description={opt.description}
            badge={opt.badge}
            icon={opt.icon}
            disabled={opt.disabled}
            checked={groupValue === opt.value}
            onChange={() => onChange?.(opt.value)}
          />
        ))}
      </div>
    </fieldset>
  )
}

RadioCardGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    badge: PropTypes.string,
    icon: PropTypes.node,
    disabled: PropTypes.bool,
  })),
  style: PropTypes.object,
}

export default RadioCard

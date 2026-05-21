import React from 'react'
import PropTypes from 'prop-types'

/**
 * Person Card — RAA Web
 *
 * Compact card for displaying a person listed on a policy (e.g. listed driver,
 * joint policyholder). Shows name, relationship, date of birth, and edit action.
 * Used in the Quote to Buy driver details step and My Account policy view.
 *
 * Import path: @raa-web/components/PersonCard
 */

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 18px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#F5F5F5',
    border: '1px solid #E5E5E5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '15px',
    fontWeight: '700',
    color: '#5C5C5C',
    flexShrink: 0,
  },
  info: { flex: 1 },
  name: { fontSize: '15px', fontWeight: '600', color: '#1A1A1A', marginBottom: '2px' },
  meta: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  metaItem: { fontSize: '12px', color: '#5C5C5C' },
  badge: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '4px',
    backgroundColor: '#F5F5F5',
    color: '#5C5C5C',
    fontSize: '11px',
    fontWeight: '600',
  },
  actions: { display: 'flex', gap: '8px', flexShrink: 0 },
  actionBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    color: '#1A1A1A',
    textDecoration: 'underline',
    fontFamily: 'Arial, Helvetica, sans-serif',
    padding: '4px',
  },
}

export function PersonCard({
  firstName,
  lastName,
  relationship,
  dateOfBirth,
  isPrimary = false,
  onEdit,
  onRemove,
  style,
}) {
  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()

  return (
    <div style={{ ...styles.card, ...style }}>
      <div style={styles.avatar} aria-hidden="true">{initials}</div>

      <div style={styles.info}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={styles.name}>{firstName} {lastName}</span>
          {isPrimary && <span style={styles.badge}>Primary</span>}
        </div>
        <div style={styles.meta}>
          {relationship && <span style={styles.metaItem}>{relationship}</span>}
          {dateOfBirth && <span style={styles.metaItem}>DOB: {dateOfBirth}</span>}
        </div>
      </div>

      <div style={styles.actions}>
        {onEdit && (
          <button style={styles.actionBtn} onClick={onEdit} aria-label={`Edit ${firstName} ${lastName}`}>
            Edit
          </button>
        )}
        {onRemove && !isPrimary && (
          <button style={{ ...styles.actionBtn, color: '#DC2626' }} onClick={onRemove} aria-label={`Remove ${firstName} ${lastName}`}>
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

PersonCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  relationship: PropTypes.string,
  dateOfBirth: PropTypes.string,
  isPrimary: PropTypes.bool,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  style: PropTypes.object,
}

export default PersonCard

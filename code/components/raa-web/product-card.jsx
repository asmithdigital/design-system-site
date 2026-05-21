import React from 'react'
import PropTypes from 'prop-types'

/**
 * Product Card — RAA Web
 *
 * Summary card for an insurance product (policy). Displayed in the My Account
 * dashboard. Shows product name, policy number, renewal date, and quick actions.
 *
 * Import path: @raa-web/components/ProductCard
 */

const STATUS_STYLES = {
  active:   { bg: '#F0FDF4', color: '#16A34A', dot: '#16A34A', label: 'Active' },
  expiring: { bg: '#FFFBEB', color: '#D97706', dot: '#D97706', label: 'Expiring soon' },
  expired:  { bg: '#FEF2F2', color: '#DC2626', dot: '#DC2626', label: 'Expired' },
  pending:  { bg: '#EFF6FF', color: '#2563EB', dot: '#2563EB', label: 'Pending' },
}

const styles = {
  card: {
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    padding: '20px 24px',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Arial, Helvetica, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: '17px', fontWeight: '700', color: '#1A1A1A', marginBottom: '4px' },
  policyNumber: { fontSize: '12px', color: '#A3A3A3' },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '600',
  },
  dot: { width: '6px', height: '6px', borderRadius: '50%' },
  meta: { display: 'flex', flexWrap: 'wrap', gap: '20px' },
  metaItem: {},
  metaLabel: { fontSize: '11px', color: '#A3A3A3', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' },
  metaValue: { fontSize: '14px', color: '#1A1A1A', fontWeight: '500' },
  actions: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  actionBtn: {
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: 'Arial, Helvetica, sans-serif',
    border: '1px solid #1A1A1A',
    backgroundColor: '#FFFFFF',
    color: '#1A1A1A',
    textDecoration: 'none',
  },
}

export function ProductCard({
  productName,
  policyNumber,
  status = 'active',
  renewalDate,
  premium,
  actions = [],
  style,
}) {
  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.active

  return (
    <div style={{ ...styles.card, ...style }}>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>{productName}</div>
          {policyNumber && <div style={styles.policyNumber}>Policy {policyNumber}</div>}
        </div>
        <div style={{ ...styles.badge, backgroundColor: statusStyle.bg, color: statusStyle.color }}>
          <div style={{ ...styles.dot, backgroundColor: statusStyle.dot }} />
          {statusStyle.label}
        </div>
      </div>

      <div style={styles.meta}>
        {renewalDate && (
          <div style={styles.metaItem}>
            <div style={styles.metaLabel}>Renewal date</div>
            <div style={styles.metaValue}>{renewalDate}</div>
          </div>
        )}
        {premium && (
          <div style={styles.metaItem}>
            <div style={styles.metaLabel}>Premium</div>
            <div style={styles.metaValue}>{premium}</div>
          </div>
        )}
      </div>

      {actions.length > 0 && (
        <div style={styles.actions}>
          {actions.map((action, i) => (
            <a
              key={i}
              href={action.href || '#'}
              onClick={action.onClick}
              style={styles.actionBtn}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F5F5F5' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF' }}
            >
              {action.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

ProductCard.propTypes = {
  productName: PropTypes.string.isRequired,
  policyNumber: PropTypes.string,
  status: PropTypes.oneOf(['active', 'expiring', 'expired', 'pending']),
  renewalDate: PropTypes.string,
  premium: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    onClick: PropTypes.func,
  })),
  style: PropTypes.object,
}

export default ProductCard

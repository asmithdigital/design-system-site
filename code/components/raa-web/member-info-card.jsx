import React from 'react'
import PropTypes from 'prop-types'

/**
 * Member Info Card — RAA Web
 *
 * Card displayed at the top of the My Account dashboard showing the member's
 * name, membership number, join date, and membership tier.
 *
 * Import path: @raa-web/components/MemberInfoCard
 */

const TIER_STYLES = {
  standard: { bg: '#F5F5F5', color: '#5C5C5C', label: 'Standard' },
  premium:  { bg: '#FFFBE6', color: '#92400E', label: 'Premium' },
  gold:     { bg: '#FEF9C3', color: '#713F12', label: 'Gold' },
}

const styles = {
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: '10px',
    padding: '24px 28px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    fontFamily: 'Arial, Helvetica, sans-serif',
    flexWrap: 'wrap',
    gap: '16px',
  },
  avatar: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    backgroundColor: '#FFD100',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: '700',
    color: '#1A1A1A',
    flexShrink: 0,
  },
  info: { flex: 1 },
  name: { fontSize: '20px', fontWeight: '700', color: '#FFFFFF', marginBottom: '4px' },
  memberNumber: { fontSize: '12px', color: 'rgba(255,255,255,0.5)' },
  meta: { display: 'flex', gap: '24px', marginTop: '16px', flexWrap: 'wrap' },
  metaItem: {},
  metaLabel: { fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' },
  metaValue: { fontSize: '14px', color: 'rgba(255,255,255,0.85)', fontWeight: '500' },
  tierBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '700',
  },
  left: { display: 'flex', alignItems: 'flex-start', gap: '16px' },
}

export function MemberInfoCard({
  firstName,
  lastName,
  membershipNumber,
  joinDate,
  tier = 'standard',
  nextRenewalDate,
  style,
}) {
  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
  const tierStyle = TIER_STYLES[tier] || TIER_STYLES.standard

  return (
    <div style={{ ...styles.card, ...style }}>
      <div style={styles.left}>
        <div style={styles.avatar} aria-hidden="true">{initials}</div>
        <div style={styles.info}>
          <div style={styles.name}>{firstName} {lastName}</div>
          {membershipNumber && <div style={styles.memberNumber}>Member #{membershipNumber}</div>}

          <div style={styles.meta}>
            {joinDate && (
              <div style={styles.metaItem}>
                <div style={styles.metaLabel}>Member since</div>
                <div style={styles.metaValue}>{joinDate}</div>
              </div>
            )}
            {nextRenewalDate && (
              <div style={styles.metaItem}>
                <div style={styles.metaLabel}>Next renewal</div>
                <div style={styles.metaValue}>{nextRenewalDate}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ ...styles.tierBadge, backgroundColor: tierStyle.bg, color: tierStyle.color }}>
        {tierStyle.label}
      </div>
    </div>
  )
}

MemberInfoCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  membershipNumber: PropTypes.string,
  joinDate: PropTypes.string,
  tier: PropTypes.oneOf(['standard', 'premium', 'gold']),
  nextRenewalDate: PropTypes.string,
  style: PropTypes.object,
}

export default MemberInfoCard

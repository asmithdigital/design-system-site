import React from 'react'
import PropTypes from 'prop-types'

/**
 * Cover Option Card — RAA Web
 *
 * Selectable card for presenting insurance cover tiers (e.g. Comprehensive,
 * Third Party). Shows name, price, key inclusions, and a recommended badge.
 * Used in the Quote to Buy cover selection step.
 *
 * Import path: @raa-web/components/CoverOptionCard
 */

const styles = {
  card: {
    border: '2px solid #E5E5E5',
    borderRadius: '10px',
    overflow: 'hidden',
    cursor: 'pointer',
    fontFamily: 'Arial, Helvetica, sans-serif',
    transition: 'border-color 0.15s',
    backgroundColor: '#FFFFFF',
  },
  cardSelected: { borderColor: '#1A1A1A' },
  cardRecommended: { borderColor: '#FFD100' },
  badge: {
    backgroundColor: '#FFD100',
    padding: '6px 20px',
    fontSize: '11px',
    fontWeight: '700',
    color: '#1A1A1A',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    textAlign: 'center',
  },
  body: { padding: '20px 20px 24px' },
  nameRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' },
  name: { fontSize: '17px', fontWeight: '700', color: '#1A1A1A' },
  radioIndicator: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    border: '2px solid #D9D9D9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioIndicatorSelected: { borderColor: '#1A1A1A' },
  radioDot: { width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#1A1A1A' },
  price: { marginBottom: '16px' },
  priceAmount: { fontSize: '22px', fontWeight: '700', color: '#1A1A1A' },
  pricePer: { fontSize: '13px', color: '#5C5C5C', marginLeft: '2px' },
  inclusion: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    fontSize: '13px',
    color: '#5C5C5C',
    marginBottom: '8px',
    lineHeight: '1.4',
  },
  checkIcon: { color: '#16A34A', flexShrink: 0, marginTop: '1px' },
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7l4 4 6-7" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CoverOptionCard({
  name,
  monthlyPrice,
  inclusions = [],
  recommended = false,
  selected = false,
  onChange,
  style,
}) {
  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      style={{
        ...styles.card,
        ...(recommended ? styles.cardRecommended : {}),
        ...(selected ? styles.cardSelected : {}),
        ...style,
      }}
      onClick={onChange}
      onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') onChange?.() }}
    >
      {recommended && <div style={styles.badge}>Most popular</div>}

      <div style={styles.body}>
        <div style={styles.nameRow}>
          <div style={styles.name}>{name}</div>
          <div style={{ ...styles.radioIndicator, ...(selected ? styles.radioIndicatorSelected : {}) }}>
            {selected && <div style={styles.radioDot} />}
          </div>
        </div>

        <div style={styles.price}>
          <span style={styles.priceAmount}>{monthlyPrice}</span>
          <span style={styles.pricePer}>/mo</span>
        </div>

        {inclusions.map((item, i) => (
          <div key={i} style={styles.inclusion}>
            <span style={styles.checkIcon}><CheckIcon /></span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

CoverOptionCard.propTypes = {
  name: PropTypes.string.isRequired,
  monthlyPrice: PropTypes.string.isRequired,
  inclusions: PropTypes.arrayOf(PropTypes.string),
  recommended: PropTypes.bool,
  selected: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.object,
}

export default CoverOptionCard

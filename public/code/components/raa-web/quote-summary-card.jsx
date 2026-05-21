import React, { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Quote Summary Card — RAA Web
 *
 * Sticky right-column card that summarises the current quote during the
 * Quote to Buy flow. Shows cover type, excess, premium breakdown, and
 * payment frequency toggle.
 *
 * Import path: @raa-web/components/QuoteSummaryCard
 */

const styles = {
  card: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '10px',
    overflow: 'hidden',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  header: {
    backgroundColor: '#1A1A1A',
    padding: '14px 20px',
    color: '#FFFFFF',
  },
  headerTitle: { fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' },
  productName: { fontSize: '16px', fontWeight: '700' },
  body: { padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' },
  freqToggle: {
    display: 'flex',
    backgroundColor: '#F5F5F5',
    borderRadius: '6px',
    padding: '3px',
  },
  freqBtn: {
    flex: 1,
    padding: '7px 0',
    border: 'none',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: '#5C5C5C',
    fontFamily: 'Arial, Helvetica, sans-serif',
    transition: 'background-color 0.15s, color 0.15s',
  },
  freqBtnActive: { backgroundColor: '#FFFFFF', color: '#1A1A1A', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' },
  rowLabel: { fontSize: '13px', color: '#5C5C5C' },
  rowValue: { fontSize: '13px', fontWeight: '600', color: '#1A1A1A', textAlign: 'right' },
  divider: { height: '1px', backgroundColor: '#E5E5E5', margin: '2px 0' },
  priceRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' },
  priceLabel: { fontSize: '13px', fontWeight: '700', color: '#1A1A1A' },
  price: { fontSize: '22px', fontWeight: '700', color: '#1A1A1A' },
  pricePer: { fontSize: '13px', fontWeight: '400', color: '#5C5C5C' },
  saveTag: {
    display: 'inline-block',
    backgroundColor: '#F0FDF4',
    color: '#16A34A',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '11px',
    fontWeight: '700',
  },
}

export function QuoteSummaryCard({
  productName,
  coverType,
  excess,
  monthlyPremium,
  annualPremium,
  annualSaving,
  details = [],
  style,
}) {
  const [freq, setFreq] = useState('monthly')
  const isAnnual = freq === 'annual'
  const displayPrice = isAnnual ? annualPremium : monthlyPremium
  const perLabel = isAnnual ? '/ year' : '/ month'

  return (
    <div style={{ ...styles.card, ...style }}>
      <div style={styles.header}>
        <div style={styles.headerTitle}>Your quote</div>
        <div style={styles.productName}>{productName}</div>
      </div>

      <div style={styles.body}>
        <div style={styles.freqToggle}>
          <button style={{ ...styles.freqBtn, ...(!isAnnual ? styles.freqBtnActive : {}) }} onClick={() => setFreq('monthly')}>Monthly</button>
          <button style={{ ...styles.freqBtn, ...(isAnnual ? styles.freqBtnActive : {}) }} onClick={() => setFreq('annual')}>Annual</button>
        </div>

        {coverType && (
          <div style={styles.row}>
            <span style={styles.rowLabel}>Cover type</span>
            <span style={styles.rowValue}>{coverType}</span>
          </div>
        )}
        {excess && (
          <div style={styles.row}>
            <span style={styles.rowLabel}>Excess</span>
            <span style={styles.rowValue}>{excess}</span>
          </div>
        )}

        {details.map((d, i) => (
          <div key={i} style={styles.row}>
            <span style={styles.rowLabel}>{d.label}</span>
            <span style={styles.rowValue}>{d.value}</span>
          </div>
        ))}

        <div style={styles.divider} />

        <div>
          <div style={styles.priceRow}>
            <span style={styles.priceLabel}>Total</span>
            <div style={{ textAlign: 'right' }}>
              <span style={styles.price}>{displayPrice}</span>
              <span style={styles.pricePer}> {perLabel}</span>
            </div>
          </div>
          {isAnnual && annualSaving && (
            <div style={{ textAlign: 'right', marginTop: '4px' }}>
              <span style={styles.saveTag}>Save {annualSaving}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

QuoteSummaryCard.propTypes = {
  productName: PropTypes.string.isRequired,
  coverType: PropTypes.string,
  excess: PropTypes.string,
  monthlyPremium: PropTypes.string.isRequired,
  annualPremium: PropTypes.string.isRequired,
  /** Amount saved with annual payment (e.g. "$120") */
  annualSaving: PropTypes.string,
  details: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  style: PropTypes.object,
}

export default QuoteSummaryCard

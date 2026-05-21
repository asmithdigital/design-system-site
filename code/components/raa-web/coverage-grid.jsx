import React from 'react'
import PropTypes from 'prop-types'

/**
 * Coverage Grid — RAA Web
 *
 * Comparison table showing which features are included in each cover tier.
 * Rows are coverage features; columns are cover options. Used in Quote to Buy
 * to help users compare Comprehensive vs Third Party cover.
 *
 * Import path: @raa-web/components/CoverageGrid
 */

const styles = {
  wrapper: { width: '100%', overflowX: 'auto', fontFamily: 'Arial, Helvetica, sans-serif' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: '480px' },
  headerCell: {
    padding: '12px 16px',
    textAlign: 'center',
    fontSize: '13px',
    fontWeight: '700',
    color: '#1A1A1A',
    borderBottom: '2px solid #1A1A1A',
    backgroundColor: '#FFFFFF',
  },
  headerCellFirst: { textAlign: 'left', minWidth: '180px' },
  row: {},
  rowEven: { backgroundColor: '#FAFAFA' },
  cell: {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#5C5C5C',
    borderBottom: '1px solid #E5E5E5',
    verticalAlign: 'middle',
  },
  cellCenter: { textAlign: 'center' },
  featureLabel: { fontSize: '13px', color: '#1A1A1A', fontWeight: '500' },
  featureGroup: {
    padding: '10px 16px 4px',
    fontSize: '11px',
    fontWeight: '700',
    color: '#A3A3A3',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    borderBottom: '1px solid #E5E5E5',
    backgroundColor: '#FFFFFF',
  },
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-label="Included">
      <circle cx="9" cy="9" r="8" fill="#F0FDF4" stroke="#BBF7D0" />
      <path d="M5.5 9l2.5 2.5 5-5" stroke="#16A34A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-label="Not included">
      <circle cx="9" cy="9" r="8" fill="#F5F5F5" stroke="#E5E5E5" />
      <path d="M6 6l6 6M12 6l-6 6" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function CoverageGrid({ columns = [], rows = [], style }) {
  return (
    <div style={{ ...styles.wrapper, ...style }}>
      <table style={styles.table} role="table">
        <thead>
          <tr>
            <th style={{ ...styles.headerCell, ...styles.headerCellFirst }}>Feature</th>
            {columns.map(col => (
              <th key={col.id} style={styles.headerCell}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            if (row.type === 'group') {
              return (
                <tr key={ri}>
                  <td colSpan={columns.length + 1} style={styles.featureGroup}>{row.label}</td>
                </tr>
              )
            }
            return (
              <tr key={ri} style={ri % 2 === 1 ? styles.rowEven : styles.row}>
                <td style={styles.cell}>
                  <span style={styles.featureLabel}>{row.label}</span>
                </td>
                {columns.map(col => {
                  const val = row.values?.[col.id]
                  return (
                    <td key={col.id} style={{ ...styles.cell, ...styles.cellCenter }}>
                      {val === true ? <CheckIcon /> : val === false ? <XIcon /> : (
                        <span style={{ fontSize: '12px', color: '#5C5C5C' }}>{val || '–'}</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

CoverageGrid.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  rows: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({ type: PropTypes.oneOf(['group']), label: PropTypes.string }),
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      /** Keyed by column id. true = checkmark, false = cross, string = custom text */
      values: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.string])),
    }),
  ])),
  style: PropTypes.object,
}

export default CoverageGrid

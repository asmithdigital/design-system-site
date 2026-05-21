import React from 'react'
import PropTypes from 'prop-types'

/**
 * Summary Table — RAA Web
 *
 * Two-column key-value table for displaying a summary of entered data
 * or policy details. Used on confirmation and review steps in Quote to Buy
 * and in the policy details view in My Account.
 *
 * Import path: @raa-web/components/SummaryTable
 */

const styles = {
  table: {
    width: '100%',
    fontFamily: 'Arial, Helvetica, sans-serif',
    borderCollapse: 'collapse',
  },
  sectionTitle: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '700',
    color: '#A3A3A3',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    padding: '16px 0 8px',
    borderBottom: '1px solid #E5E5E5',
  },
  row: {},
  cell: {
    padding: '12px 0',
    borderBottom: '1px solid #F5F5F5',
    verticalAlign: 'top',
  },
  label: {
    fontSize: '13px',
    color: '#5C5C5C',
    width: '45%',
    paddingRight: '16px',
  },
  value: { fontSize: '14px', color: '#1A1A1A', fontWeight: '500' },
  editLink: {
    display: 'inline-block',
    marginLeft: '8px',
    fontSize: '12px',
    color: '#1A1A1A',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  total: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1A1A1A',
    borderTop: '2px solid #1A1A1A',
    paddingTop: '14px',
  },
}

export function SummaryTable({ sections = [], style }) {
  return (
    <div style={style}>
      {sections.map((section, si) => (
        <div key={si}>
          {section.title && (
            <span style={styles.sectionTitle}>{section.title}</span>
          )}
          <table style={styles.table}>
            <tbody>
              {section.rows.map((row, ri) => (
                <tr key={ri} style={styles.row}>
                  <td style={{ ...styles.cell, ...styles.label }}>{row.label}</td>
                  <td style={{
                    ...styles.cell,
                    ...styles.value,
                    ...(row.total ? styles.total : {}),
                  }}>
                    {row.value}
                    {row.onEdit && (
                      <button
                        style={{ ...styles.editLink, background: 'none', border: 'none', fontFamily: 'Arial', fontSize: '12px' }}
                        onClick={row.onEdit}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

SummaryTable.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    rows: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.node.isRequired,
      onEdit: PropTypes.func,
      /** When true, applies bold total styling */
      total: PropTypes.bool,
    })).isRequired,
  })),
  style: PropTypes.object,
}

export default SummaryTable

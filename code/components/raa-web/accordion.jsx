import React, { useState, useId } from 'react'
import PropTypes from 'prop-types'

/**
 * Accordion — RAA Web
 *
 * Collapsible content sections. Used for FAQs, coverage details, and lengthy
 * supplementary content. Supports single-open (exclusive) and multi-open modes.
 *
 * Import path: @raa-web/components/Accordion
 */

const styles = {
  wrapper: { fontFamily: 'Arial, Helvetica, sans-serif', width: '100%' },
  item: { borderBottom: '1px solid #E5E5E5' },
  trigger: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'Arial, Helvetica, sans-serif',
    gap: '12px',
  },
  triggerLabel: { fontSize: '15px', fontWeight: '600', color: '#1A1A1A', flex: 1 },
  chevron: { flexShrink: 0, color: '#5C5C5C', transition: 'transform 0.2s ease' },
  chevronOpen: { transform: 'rotate(180deg)' },
  panel: { overflow: 'hidden', transition: 'max-height 0.25s ease' },
  panelInner: { paddingBottom: '16px', fontSize: '14px', color: '#5C5C5C', lineHeight: '1.7' },
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function AccordionItem({ item, isOpen, onToggle }) {
  const triggerId = useId()
  const panelId = useId()

  return (
    <div style={styles.item}>
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        style={styles.trigger}
        onClick={onToggle}
      >
        <span style={styles.triggerLabel}>{item.title}</span>
        <span style={{ ...styles.chevron, ...(isOpen ? styles.chevronOpen : {}) }}>
          <ChevronDown />
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        style={{ ...styles.panel, maxHeight: isOpen ? '600px' : '0px' }}
      >
        <div style={styles.panelInner}>
          {typeof item.content === 'string'
            ? <p style={{ margin: 0 }}>{item.content}</p>
            : item.content
          }
        </div>
      </div>
    </div>
  )
}

export function Accordion({ items = [], exclusive = false, defaultOpen = [], style }) {
  const [openItems, setOpenItems] = useState(new Set(defaultOpen))

  function toggle(id) {
    setOpenItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (exclusive) next.clear()
        next.add(id)
      }
      return next
    })
  }

  return (
    <div style={{ ...styles.wrapper, borderTop: '1px solid #E5E5E5', ...style }}>
      {items.map(item => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openItems.has(item.id)}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  )
}

Accordion.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  })),
  /** When true, opening one item closes all others */
  exclusive: PropTypes.bool,
  /** Array of item ids that should be open by default */
  defaultOpen: PropTypes.arrayOf(PropTypes.string),
  style: PropTypes.object,
}

export default Accordion

import React from 'react'
import PropTypes from 'prop-types'

/**
 * Card — Taskly
 *
 * Container component used to group related content (tasks, projects, settings).
 * Supports a header with title/actions, body content, and optional footer.
 * Variants: default (subtle shadow), outlined (no shadow), flat (no border).
 *
 * Import path: @taskly/components/Card
 */

const VARIANTS = {
  default:  { border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(26,43,74,0.08)' },
  outlined: { border: '1px solid #E2E8F0', boxShadow: 'none' },
  flat:     { border: 'none', boxShadow: 'none' },
}

const styles = {
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    fontFamily: "'Inter', sans-serif",
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid #F1F3F5',
  },
  title: { fontSize: '15px', fontWeight: '600', color: '#1A2B4A' },
  subtitle: { fontSize: '12px', color: '#64748B', marginTop: '2px' },
  actions: { display: 'flex', gap: '8px', alignItems: 'center' },
  body: { padding: '20px' },
  bodyNoPadding: { padding: '0' },
  footer: {
    padding: '12px 20px',
    borderTop: '1px solid #F1F3F5',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    backgroundColor: '#F8F9FA',
  },
}

export function Card({
  title,
  subtitle,
  actions,
  children,
  footer,
  variant = 'default',
  noPadding = false,
  style,
  bodyStyle,
}) {
  const v = VARIANTS[variant] || VARIANTS.default

  return (
    <div style={{ ...styles.card, ...v, ...style }}>
      {(title || actions) && (
        <div style={styles.header}>
          <div>
            {title && <div style={styles.title}>{title}</div>}
            {subtitle && <div style={styles.subtitle}>{subtitle}</div>}
          </div>
          {actions && <div style={styles.actions}>{actions}</div>}
        </div>
      )}

      <div style={{ ...(noPadding ? styles.bodyNoPadding : styles.body), ...bodyStyle }}>
        {children}
      </div>

      {footer && <div style={styles.footer}>{footer}</div>}
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.string,
  /** Action elements rendered in the header right side */
  actions: PropTypes.node,
  children: PropTypes.node,
  /** Footer content — typically action buttons */
  footer: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'outlined', 'flat']),
  /** Removes body padding — use when rendering a table or list that needs edge-to-edge layout */
  noPadding: PropTypes.bool,
  style: PropTypes.object,
  bodyStyle: PropTypes.object,
}

/**
 * TaskCard — Specialised card variant for displaying a single task item.
 */
export function TaskCard({
  title,
  description,
  status = 'todo',
  priority,
  assignee,
  dueDate,
  tags = [],
  onClick,
  style,
}) {
  const STATUS_COLORS = {
    todo:       { color: '#64748B', bg: '#F1F3F5' },
    inprogress: { color: '#2B7DE9', bg: '#EFF6FF' },
    done:       { color: '#059669', bg: '#ECFDF5' },
    blocked:    { color: '#DC2626', bg: '#FEF2F2' },
  }
  const statusStyle = STATUS_COLORS[status] || STATUS_COLORS.todo
  const statusLabel = { todo: 'To do', inprogress: 'In progress', done: 'Done', blocked: 'Blocked' }[status] || status

  const PRIORITY_ICONS = { high: '🔴', medium: '🟡', low: '🟢' }

  return (
    <div
      style={{
        ...styles.card,
        ...VARIANTS.default,
        padding: '14px 16px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.15s',
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.boxShadow = '0 4px 12px rgba(26,43,74,0.1)' }}
      onMouseLeave={e => { if (onClick) e.currentTarget.style.boxShadow = '0 1px 3px rgba(26,43,74,0.08)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1A2B4A', lineHeight: '1.4' }}>{title}</div>
        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
          {priority && <span title={`Priority: ${priority}`}>{PRIORITY_ICONS[priority]}</span>}
          <span style={{
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: '600',
            backgroundColor: statusStyle.bg,
            color: statusStyle.color,
          }}>
            {statusLabel}
          </span>
        </div>
      </div>

      {description && (
        <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5', margin: '0 0 10px' }}>{description}</p>
      )}

      {(tags.length > 0 || assignee || dueDate) && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {tags.map(tag => (
            <span key={tag} style={{
              padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '500',
              backgroundColor: '#F1F3F5', color: '#64748B',
            }}>
              {tag}
            </span>
          ))}
          {dueDate && <span style={{ fontSize: '11px', color: '#94A3B8', marginLeft: 'auto' }}>Due {dueDate}</span>}
        </div>
      )}
    </div>
  )
}

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  status: PropTypes.oneOf(['todo', 'inprogress', 'done', 'blocked']),
  priority: PropTypes.oneOf(['high', 'medium', 'low']),
  assignee: PropTypes.string,
  dueDate: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  style: PropTypes.object,
}

export default Card

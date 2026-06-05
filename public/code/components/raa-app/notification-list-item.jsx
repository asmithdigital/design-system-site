export default function NotificationListItem({ icon, title, body, timestamp, unread, onClick }) {
  return (
    <li
      style={{
        display: 'flex',
        gap: 12,
        padding: '14px 16px',
        background: unread ? '#FFFDE7' : '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        cursor: onClick ? 'pointer' : 'default',
        listStyle: 'none',
      }}
      onClick={onClick}
      aria-label={`${unread ? 'Unread: ' : ''}${title}. ${body}. ${timestamp}`}
    >
      {/* Category icon */}
      <div style={{
        width: 40, height: 40, borderRadius: 20,
        background: '#F5F5F0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, flexShrink: 0,
      }} aria-hidden="true">
        {icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Title + unread dot */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <span style={{
            fontSize: 14,
            fontWeight: unread ? 700 : 500,
            color: '#1A1A1A',
            lineHeight: 1.3,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}>
            {unread && <span className="sr-only">Unread: </span>}
            {title}
          </span>
          {unread && (
            <span
              aria-hidden="true"
              style={{ width: 8, height: 8, borderRadius: 4, background: '#FFD100', flexShrink: 0, marginTop: 4 }}
            />
          )}
        </div>

        {/* Body */}
        <p style={{
          margin: '2px 0 0',
          fontSize: 13, color: '#6B7280',
          lineHeight: 1.35,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          {body}
        </p>

        {/* Timestamp */}
        <time
          dateTime={timestamp}
          style={{ display: 'block', marginTop: 4, fontSize: 11, color: '#9CA3AF', fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          {timestamp}
        </time>
      </div>
    </li>
  )
}

export function NotificationList({ notifications }) {
  return (
    <ul aria-label="Notifications" style={{ margin: 0, padding: 0, borderRadius: 12, overflow: 'hidden', border: '1px solid #E5E7EB' }}>
      {notifications.map((n) => (
        <NotificationListItem key={n.id} {...n} />
      ))}
    </ul>
  )
}

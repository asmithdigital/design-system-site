import { Link } from 'react-router-dom'

export default function Breadcrumb({ crumbs }) {
  return (
    <nav style={{ marginBottom: '24px', fontSize: '13px', color: '#72706a' }}>
      {crumbs.map((crumb, i) => (
        <span key={i}>
          {i > 0 && <span style={{ margin: '0 6px' }}>›</span>}
          {crumb.href ? (
            <Link to={crumb.href} style={{ color: '#72706a', textDecoration: 'none' }}>
              {crumb.label}
            </Link>
          ) : (
            <span style={{ color: '#0f1f3d' }}>{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

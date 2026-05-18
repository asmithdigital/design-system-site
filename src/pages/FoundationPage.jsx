import { useParams } from 'react-router-dom'
import foundationsData from '../../data/foundations.json'
import Breadcrumb from '../components/Breadcrumb.jsx'

export default function FoundationPage() {
  const { id } = useParams()
  const foundation = foundationsData.foundations.find((f) => f.id === id)

  if (!foundation) {
    return <div style={{ color: '#72706a' }}>Foundation not found.</div>
  }

  return (
    <div>
      <Breadcrumb crumbs={[{ label: 'Foundations' }, { label: foundation.title }]} />

      <h1 style={{
        fontSize: '36px',
        fontWeight: '700',
        color: '#0f1f3d',
        marginBottom: '8px',
      }}>
        {foundation.title}
      </h1>

      <p style={{
        fontSize: '17px',
        color: '#72706a',
        marginBottom: '32px',
        lineHeight: '1.6',
      }}>
        {foundation.content}
      </p>

      {foundation.sections.map((section, i) => (
        <div key={i}>
          <h2 style={{
            fontSize: '22px',
            fontWeight: '700',
            color: '#0f1f3d',
            marginTop: '32px',
            marginBottom: '8px',
          }}>
            {section.title}
          </h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#0f1f3d' }}>
            {section.body}
          </p>
          {i < foundation.sections.length - 1 && (
            <hr style={{ border: 'none', borderTop: '1px solid #ddd8c8', marginTop: '32px' }} />
          )}
        </div>
      ))}
    </div>
  )
}

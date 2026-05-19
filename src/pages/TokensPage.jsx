import tokensData from '../../data/tokens.json'
import Breadcrumb from '../components/Breadcrumb.jsx'
import TokenSwatch from '../components/TokenSwatch.jsx'

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const g = item[key]
    if (!acc[g]) acc[g] = []
    acc[g].push(item)
    return acc
  }, {})
}

function ColoursSection() {
  const grouped = groupBy(tokensData.colors, 'category')
  return (
    <div>
      <Breadcrumb crumbs={[{ label: 'Tokens' }, { label: 'Colours' }]} />
      <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#0f1f3d', marginBottom: '8px' }}>
        Colour Tokens
      </h1>
      <p style={{ fontSize: '15px', color: '#72706a', marginBottom: '32px', lineHeight: '1.6' }}>
        All colour tokens in the design system. Nine tokens cover brand, surface, feedback, text, and border roles.
      </p>
      {Object.entries(grouped).map(([category, tokens]) => (
        <div key={category} style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px' }}>{category}</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
          }}>
            {tokens.map((token) => (
              <TokenSwatch
                key={token.name}
                name={token.name}
                value={token.value}
                category={token.category}
                usage={token.usage}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function TypographySection() {
  return (
    <div>
      <Breadcrumb crumbs={[{ label: 'Tokens' }, { label: 'Typography' }]} />
      <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#0f1f3d', marginBottom: '8px' }}>
        Typography Tokens
      </h1>
      <p style={{ fontSize: '15px', color: '#72706a', marginBottom: '32px', lineHeight: '1.6' }}>
        Type styles used across the design system. All body text uses Inter. Code and technical values use JetBrains Mono.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {tokensData.typography.map((token) => (
          <div key={token.name} style={{
            background: '#ffffff',
            border: '1px solid #ddd8c8',
            borderRadius: '10px',
            padding: '20px 24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}>
            <div style={{
              fontFamily: token.fontFamily === 'JetBrains Mono' ? "'JetBrains Mono', monospace" : "'Inter', sans-serif",
              fontSize: token.fontSize,
              fontWeight: token.fontWeight,
              lineHeight: token.lineHeight,
              color: '#0f1f3d',
              marginBottom: '12px',
            }}>
              {token.usage}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#0f1f3d', marginBottom: '2px' }}>
              {token.name}
            </div>
            <div style={{ fontSize: '12px', color: '#72706a' }}>
              font-size {token.fontSize} · font-weight {token.fontWeight} · line-height {token.lineHeight}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SpacingSection() {
  return (
    <div>
      <Breadcrumb crumbs={[{ label: 'Tokens' }, { label: 'Spacing' }]} />
      <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#0f1f3d', marginBottom: '8px' }}>
        Spacing Tokens
      </h1>
      <p style={{ fontSize: '15px', color: '#72706a', marginBottom: '32px', lineHeight: '1.6' }}>
        The spacing scale used for all padding, margin, and gap values. Never use arbitrary pixel values — always use a spacing token.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {tokensData.spacing.map((token) => {
          const px = parseInt(token.value, 10)
          const barWidth = Math.max(px * 3, 4)
          return (
            <div key={token.name} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px',
                color: '#0f1f3d',
                width: '140px',
                flexShrink: 0,
              }}>
                {token.name}
              </div>
              <div style={{
                background: '#0a6b54',
                height: '20px',
                borderRadius: '4px',
                width: `${barWidth}px`,
                minWidth: '4px',
                flexShrink: 0,
              }} />
              <div style={{
                fontSize: '13px',
                color: '#72706a',
                marginLeft: '12px',
                flexShrink: 0,
              }}>
                {token.value}
              </div>
              <div style={{
                fontSize: '13px',
                color: '#72706a',
                marginLeft: '24px',
              }}>
                {token.usage}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function TokensPage({ section }) {
  if (section === 'colours') return <ColoursSection />
  if (section === 'typography') return <TypographySection />
  if (section === 'spacing') return <SpacingSection />
  return null
}

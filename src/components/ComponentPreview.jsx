// Visual preview renderers for each design system component.
// Keyed by "product:componentName" — must match JSON exactly.

// ─── RAA Web previews ───────────────────────────────────────────────────────

function PrimaryButtonPreview() {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: '#FFD100', color: '#1A1A1A', height: '48px', padding: '0 24px',
        borderRadius: '8px', fontSize: '16px', fontWeight: '600', fontFamily: 'Arial, sans-serif',
        whiteSpace: 'nowrap',
      }}>Get a quote →</div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: '#FFD100', color: '#1A1A1A', height: '48px', padding: '0 24px',
        borderRadius: '8px', fontSize: '16px', fontWeight: '600', fontFamily: 'Arial, sans-serif',
        whiteSpace: 'nowrap',
      }}>✓ This is correct</div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: '#E5E5E5', color: '#9CA3AF', height: '48px', padding: '0 24px',
        borderRadius: '8px', fontSize: '16px', fontWeight: '600', fontFamily: 'Arial, sans-serif',
        whiteSpace: 'nowrap', cursor: 'not-allowed',
      }}>Next</div>
    </div>
  )
}

function SecondaryButtonPreview() {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: '#FFFFFF', border: '1px solid #1A1A1A', color: '#1A1A1A', height: '44px',
        padding: '0 20px', borderRadius: '8px', fontSize: '16px', fontWeight: '500',
        fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap',
      }}>View details</div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: '#FFFFFF', border: '1px solid #1A1A1A', color: '#1A1A1A', height: '44px',
        padding: '0 20px', borderRadius: '8px', fontSize: '16px', fontWeight: '500',
        fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap',
      }}>Save quote ↗</div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: '#FFFFFF', border: '1px solid #E5E5E5', color: '#9CA3AF', height: '36px',
        padding: '0 14px', borderRadius: '8px', fontSize: '14px', fontWeight: '500',
        fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap', cursor: 'not-allowed',
      }}>Disabled</div>
    </div>
  )
}

function TextInputRAAPreview() {
  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 180px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '6px', fontFamily: 'Arial, sans-serif', color: '#1A1A1A' }}>Email address</div>
        <div style={{ height: '48px', border: '1px solid #D1D5DB', borderRadius: '4px', padding: '0 16px', display: 'flex', alignItems: 'center', background: '#fff', fontSize: '16px', color: '#9CA3AF', fontFamily: 'Arial, sans-serif' }}>
          you@example.com
        </div>
      </div>
      <div style={{ flex: '1 1 180px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '6px', fontFamily: 'Arial, sans-serif', color: '#DC2626' }}>Date of birth</div>
        <div style={{ height: '48px', border: '1px solid #DC2626', borderRadius: '4px', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', fontFamily: 'Arial, sans-serif' }}>
          <span style={{ color: '#9CA3AF', fontSize: '15px' }}>DD/MM/YYYY</span>
          <span style={{ color: '#DC2626', fontSize: '18px' }}>⚠</span>
        </div>
        <div style={{ color: '#DC2626', fontSize: '13px', marginTop: '5px', fontFamily: 'Arial, sans-serif' }}>Please enter a valid date</div>
      </div>
    </div>
  )
}

function DropdownSelectPreview() {
  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 180px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '6px', fontFamily: 'Arial, sans-serif' }}>Building type</div>
        <div style={{ height: '48px', border: '1px solid #D1D5DB', borderRadius: '4px', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', fontSize: '16px', fontFamily: 'Arial, sans-serif' }}>
          <span>House</span>
          <span style={{ color: '#6B7280', fontSize: '12px' }}>▾</span>
        </div>
      </div>
      <div style={{ flex: '1 1 180px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', fontFamily: 'Arial, sans-serif' }}>Excess amount</span>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#2563EB', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700' }}>i</div>
        </div>
        <div style={{ height: '48px', border: '1px solid #D1D5DB', borderRadius: '4px', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', fontSize: '16px', fontFamily: 'Arial, sans-serif' }}>
          <span>$500</span>
          <span style={{ color: '#6B7280', fontSize: '12px' }}>▾</span>
        </div>
      </div>
    </div>
  )
}

function RadioCardPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{ flex: 1, border: '2px solid #0D9488', borderRadius: '8px', padding: '12px 16px', background: '#F0FDFA', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>
          <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #0D9488', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0D9488' }} />
          </div>
          Yes
        </div>
        <div style={{ flex: 1, border: '1px solid #D1D5DB', borderRadius: '8px', padding: '12px 16px', background: '#fff', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>
          <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #D1D5DB', flexShrink: 0 }} />
          No
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {['Home and Contents', 'Home only', 'Contents only'].map((label, i) => (
          <div key={i} style={{ border: i === 0 ? '2px solid #0D9488' : '1px solid #D1D5DB', borderRadius: '8px', padding: '11px 16px', background: i === 0 ? '#F0FDFA' : '#fff', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'Arial, sans-serif', fontSize: '15px' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${i === 0 ? '#0D9488' : '#D1D5DB'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {i === 0 && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0D9488' }} />}
            </div>
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

function CheckboxPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontFamily: 'Arial, sans-serif', fontSize: '15px', color: '#1A1A1A' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
          <span style={{ color: '#fff', fontSize: '13px', lineHeight: 1 }}>✓</span>
        </div>
        <span>I have read and accept the Product Disclosure Statement</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: '1.5px solid #D1D5DB', flexShrink: 0 }} />
        <span>Send me marketing and promotional emails</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: '1.5px solid #DC2626', flexShrink: 0, marginTop: '1px' }} />
        <div>
          <div>You must agree before continuing</div>
          <div style={{ color: '#DC2626', fontSize: '13px', marginTop: '3px' }}>You must check this to continue</div>
        </div>
      </div>
    </div>
  )
}

function ToggleSwitchPreview() {
  const items = [
    { label: 'Accidental Damage Cover', on: true },
    { label: 'Pet Cover', on: false },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {items.map(({ label, on }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '48px', height: '24px', background: on ? '#0D9488' : '#D1D5DB', borderRadius: '12px', padding: '2px', display: 'flex', justifyContent: on ? 'flex-end' : 'flex-start', boxSizing: 'border-box', flexShrink: 0 }}>
            <div style={{ width: '20px', height: '20px', background: '#fff', borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
          </div>
          <span style={{ fontSize: '15px', fontFamily: 'Arial, sans-serif', color: '#1A1A1A' }}>
            {label} — <span style={{ color: on ? '#0D9488' : '#6B7280', fontWeight: '600' }}>{on ? 'On' : 'Off'}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

function StepperNavigationPreview() {
  const steps = [
    { label: 'General information', state: 'done' },
    { label: 'Your home', state: 'done' },
    { label: 'Your contents', state: 'active' },
    { label: 'Policy holders', state: 'upcoming' },
    { label: 'Your quote', state: 'upcoming' },
  ]
  const colors = { done: '#16A34A', active: '#1A1A1A', upcoming: '#9CA3AF' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step.state === 'upcoming' ? '#fff' : colors[step.state], border: `2px solid ${colors[step.state]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: step.state === 'upcoming' ? '#9CA3AF' : '#fff', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
              {step.state === 'done' ? '✓' : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: '2px', height: '24px', background: step.state === 'done' ? '#16A34A' : '#D1D5DB' }} />
            )}
          </div>
          <div style={{ paddingTop: '5px', paddingBottom: i < steps.length - 1 ? '0' : '0', fontSize: '14px', fontFamily: 'Arial, sans-serif', fontWeight: step.state === 'active' ? '600' : '400', color: colors[step.state] }}>
            {step.label}
          </div>
        </div>
      ))}
    </div>
  )
}

function ProgressBannerPreview() {
  return (
    <div style={{ background: '#FFD100', padding: '24px 32px', borderRadius: '8px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ fontSize: '14px', color: '#1A1A1A', marginBottom: '6px' }}>Step 1 of 5</div>
      <div style={{ fontSize: '28px', fontWeight: '700', color: '#1A1A1A' }}>General information</div>
    </div>
  )
}

function SidebarNavigationPreview() {
  const items = [
    { label: 'My Account home', active: false },
    { label: 'My details', active: false },
    { label: 'My products', active: true, sub: true },
    { label: 'Home Insurance', active: true, indent: true },
    { label: 'Car Insurance', active: false, indent: true },
    { label: 'My claims', active: false },
    { label: 'My member benefits', active: false },
  ]
  return (
    <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden', width: '220px', fontFamily: 'Arial, sans-serif' }}>
      {items.map((item, i) => (
        <div key={i} style={{ padding: `8px ${item.indent ? '32px' : '16px'}`, borderBottom: i < items.length - 1 ? '1px solid #F3F4F6' : 'none', borderLeft: item.active ? '3px solid #1A1A1A' : '3px solid transparent', background: item.active ? '#F9FAFB' : '#fff', fontSize: item.indent ? '13px' : '14px', fontWeight: item.active && !item.indent ? '600' : '400', color: '#1A1A1A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {item.label}
          {item.sub && <span style={{ color: '#6B7280', fontSize: '12px' }}>▾</span>}
        </div>
      ))}
    </div>
  )
}

function HeaderBarPreview() {
  return (
    <div style={{ height: '64px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between', gap: '16px', overflow: 'hidden' }}>
      <div style={{ fontWeight: '900', fontSize: '20px', color: '#1A1A1A', letterSpacing: '-1px', flexShrink: 0 }}>
        <span style={{ background: '#FFD100', padding: '2px 6px', borderRadius: '3px' }}>RAA</span>
      </div>
      <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#1A1A1A', fontFamily: 'Arial, sans-serif' }}>
        {['Membership', 'Motor', 'Home', 'Travel'].map(n => <span key={n}>{n}</span>)}
      </div>
      <div style={{ display: 'flex', gap: '10px', fontSize: '13px', color: '#1A1A1A', fontFamily: 'Arial, sans-serif', alignItems: 'center', flexShrink: 0 }}>
        <span>Contact ▾</span>
        <span style={{ fontSize: '16px' }}>🔍</span>
        <span style={{ fontSize: '16px' }}>👤</span>
      </div>
    </div>
  )
}

function FooterPreview() {
  return (
    <div style={{ background: '#F4F4F4', borderRadius: '8px', padding: '16px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '12px', fontSize: '14px', color: '#1A1A1A' }}>
        {['Membership', 'Motor', 'Home', 'Travel'].map(cat => (
          <div key={cat}>
            <div style={{ fontWeight: '700', marginBottom: '4px' }}>{cat}</div>
            <div style={{ color: '#6B7280', fontSize: '13px', lineHeight: '1.8' }}>
              {cat === 'Membership' && <><div>Join RAA</div><div>Member card</div></>}
              {cat === 'Motor' && <><div>Car insurance</div><div>Roadside</div></>}
              {cat === 'Home' && <><div>Home insurance</div><div>Get a quote</div></>}
              {cat === 'Travel' && <><div>Travel insurance</div><div>Destinations</div></>}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '10px', display: 'flex', gap: '16px', fontSize: '13px', color: '#6B7280', flexWrap: 'wrap' }}>
        <span>Privacy Policy</span><span>Cookie Policy</span><span>Terms and Conditions</span>
        <span style={{ marginLeft: 'auto' }}>© 2026 RAA</span>
      </div>
    </div>
  )
}

function ProductCardPreview() {
  const cards = [
    { icon: '🏠', title: '32 King William St, Adelaide', sub: 'Home and Contents Insurance', num: 'POL-7823401' },
    { icon: '🚗', title: 'Toyota Camry · 1ABC123', sub: 'Car Insurance: Standard Comprehensive', num: 'POL-6612984' },
    { icon: '🛣', title: 'Road Service', sub: 'Premium Membership', num: 'MBR-0019234' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {cards.map((c, i) => (
        <div key={i} style={{ border: '1px solid #E5E7EB', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', background: '#fff', fontFamily: 'Arial, sans-serif' }}>
          <div style={{ width: '40px', height: '40px', background: '#F0FDFA', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{c.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: '700', fontSize: '14px', color: '#1A1A1A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</div>
            <div style={{ color: '#6B7280', fontSize: '12px', marginTop: '2px' }}>{c.sub}</div>
            <div style={{ color: '#9CA3AF', fontSize: '11px', marginTop: '1px' }}>{c.num}</div>
          </div>
          <div style={{ border: '1px solid #1A1A1A', borderRadius: '8px', padding: '7px 12px', fontSize: '13px', fontWeight: '500', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap', flexShrink: 0 }}>View details</div>
        </div>
      ))}
    </div>
  )
}

function QuickActionCardPreview() {
  const actions = [
    { icon: '💳', title: 'Change payment details', desc: 'Update your direct debit or card' },
    { icon: '📋', title: 'Make a claim', desc: 'Lodge a new insurance claim' },
    { icon: '✏️', title: 'Update contact details', desc: 'Change your email or phone' },
    { icon: '🏆', title: 'See competitions', desc: 'Enter member-exclusive draws' },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
      {actions.map((a, i) => (
        <div key={i} style={{ border: '1px solid #E5E7EB', borderRadius: '8px', padding: '14px 16px', background: '#fff', fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <span style={{ fontSize: '20px', flexShrink: 0 }}>{a.icon}</span>
          <div>
            <div style={{ fontWeight: '600', fontSize: '13px', color: '#1A1A1A' }}>{a.title}</div>
            <div style={{ color: '#6B7280', fontSize: '12px', marginTop: '2px' }}>{a.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function FeatureCardPreview() {
  const cards = [
    { icon: '🚗', color: '#FEF3C7', title: 'Learner driver test', body: 'Practice for your licence with free online tests.' },
    { icon: '⭐', color: '#F0FDFA', title: 'RAA Rewards', body: 'Exclusive discounts on fuel, dining and more.' },
    { icon: '⛽', color: '#EFF6FF', title: 'Live fuel prices', body: 'Find the cheapest petrol near you right now.' },
  ]
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      {cards.map((c, i) => (
        <div key={i} style={{ flex: 1, border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden', background: '#fff', fontFamily: 'Arial, sans-serif' }}>
          <div style={{ background: c.color, height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>{c.icon}</div>
          <div style={{ padding: '12px 14px' }}>
            <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>{c.title}</div>
            <div style={{ color: '#6B7280', fontSize: '12px', marginBottom: '10px', lineHeight: '1.4' }}>{c.body}</div>
            <div style={{ background: '#FFD100', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', display: 'inline-block' }}>Learn more</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function PromoBannerPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', fontFamily: 'Arial, sans-serif', gap: '16px' }}>
        <div>
          <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '6px' }}>Get a quote online</div>
          <div style={{ color: '#6B7280', fontSize: '13px', marginBottom: '12px' }}>Protect your home in minutes</div>
          <div style={{ background: '#FFD100', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', display: 'inline-block' }}>Get a quote</div>
        </div>
        <div style={{ fontSize: '48px', opacity: 0.25, flexShrink: 0 }}>🏡</div>
      </div>
      <div style={{ borderRadius: '12px', padding: '20px 24px', background: '#FFD100', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '4px' }}>Save on fuel with RAA</div>
        <div style={{ fontSize: '13px', marginBottom: '10px' }}>Members save up to 4¢/L at participating stations</div>
        <div style={{ background: '#1A1A1A', color: '#FFD100', padding: '7px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', display: 'inline-block' }}>Find stations</div>
      </div>
    </div>
  )
}

function AccordionPreview() {
  const items = ['About your home', 'About your contents', 'Claims history', 'FAQ: What does my policy cover?']
  return (
    <div style={{ border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}>
      {items.map((item, i) => (
        <div key={i}>
          <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: i === 0 ? '#FAFAF8' : '#fff', borderBottom: '1px solid #E5E7EB' }}>
            <span style={{ fontSize: '15px', fontWeight: i === 0 ? '500' : '400', color: '#1A1A1A' }}>{item}</span>
            <span style={{ color: '#6B7280', fontSize: '20px', lineHeight: 1, marginLeft: '12px' }}>{i === 0 ? '−' : '+'}</span>
          </div>
          {i === 0 && (
            <div style={{ padding: '14px 20px', background: '#FAFAF8', fontSize: '14px', color: '#1A1A1A', lineHeight: '1.6', borderBottom: '1px solid #E5E7EB' }}>
              Your building at 32 King William St is a single-storey brick house, built in 1980. Roof material: Colorbond steel.
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function AlertBannerPreview() {
  const variants = [
    { bg: '#FEF3C7', border: '#FCD34D', icon: '⚠', color: '#92400E', title: 'Important notice', body: 'Flood cover is not included in your selected excess tier.' },
    { bg: '#FEE2E2', border: '#FCA5A5', icon: '✕', color: '#7F1D1D', title: 'Unable to continue online', body: 'Your property type requires a manual assessment. Please call us.' },
    { bg: '#EFF6FF', border: '#BFDBFE', icon: 'ℹ', color: '#1E3A5F', title: 'Policy information', body: 'Your policy automatically renews each year unless you cancel.' },
    { bg: '#F0FDF4', border: '#86EFAC', icon: '✓', color: '#14532D', title: 'Address confirmed', body: 'We found your property at 32 King William St, Adelaide SA 5000.' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {variants.map((v, i) => (
        <div key={i} style={{ background: v.bg, border: `1px solid ${v.border}`, borderRadius: '10px', padding: '14px 18px', display: 'flex', gap: '12px', alignItems: 'flex-start', fontFamily: 'Arial, sans-serif' }}>
          <span style={{ fontSize: '18px', color: v.color, flexShrink: 0, marginTop: '1px' }}>{v.icon}</span>
          <div>
            <div style={{ fontWeight: '700', fontSize: '14px', color: v.color, marginBottom: '2px' }}>{v.title}</div>
            <div style={{ fontSize: '13px', color: v.color, lineHeight: '1.5' }}>{v.body}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function InfoTooltipPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>Building type</span>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#2563EB', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', flexShrink: 0, cursor: 'pointer' }}>i</div>
        </div>
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#1E3A5F', maxWidth: '300px', lineHeight: '1.5' }}>
          The type of building affects your premium and coverage. A free-standing house is the most common type.
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#2563EB', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', flexShrink: 0 }}>i</div>
        <span style={{ color: '#2563EB', fontSize: '14px', textDecoration: 'underline', cursor: 'pointer' }}>Excess explained</span>
      </div>
    </div>
  )
}

function ChatWidgetPreview() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', gap: '12px', padding: '8px 0' }}>
      <div style={{ fontSize: '14px', color: '#6B7280', fontFamily: 'Arial, sans-serif', fontStyle: 'italic' }}>Need help? Chat with us →</div>
      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px', boxShadow: '0 4px 16px rgba(37,99,235,0.4)', flexShrink: 0 }}>💬</div>
    </div>
  )
}

function MascotTipPreview() {
  return (
    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', maxWidth: '380px' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E9D5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0, border: '2px solid #C4B5FD' }}>🦘</div>
      <div style={{ background: '#F3F0FF', borderRadius: '0 12px 12px 12px', padding: '12px 16px', fontSize: '14px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#1A1A1A', flex: 1 }}>
        <strong>Helpful tip:</strong> Your building sum insured should cover the full cost to rebuild — not the market value. Don't forget to include fixtures like kitchens and bathrooms.
      </div>
    </div>
  )
}

function QuoteSummaryCardPreview() {
  return (
    <div style={{ border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', background: '#fff', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '20px' }}>🏠</span>
            <span style={{ fontSize: '14px', color: '#6B7280' }}>Home and Contents Insurance</span>
          </div>
          <div style={{ fontSize: '36px', fontWeight: '700', color: '#1A1A1A', lineHeight: 1 }}>$89<span style={{ fontSize: '20px' }}>.50</span><span style={{ fontSize: '15px', fontWeight: '400', color: '#6B7280' }}>/month</span></div>
          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>$1,074/year · <span style={{ color: '#16A34A', fontWeight: '600' }}>Save $78 with RAA membership</span></div>
        </div>
        <div style={{ background: '#FFD100', borderRadius: '8px', padding: '10px 20px', fontSize: '15px', fontWeight: '700', flexShrink: 0, marginLeft: '16px' }}>Buy now</div>
      </div>
      <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '14px', display: 'flex', gap: '20px', fontSize: '13px', color: '#6B7280', flexWrap: 'wrap' }}>
        <span>Ref: QUO-2026-001</span>
        <span>Starts: 01/06/2026</span>
        <span>Building excess: $500</span>
        <span>Contents excess: $250</span>
      </div>
    </div>
  )
}

function CoverOptionCardPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {[{ label: 'Accidental Damage Cover', desc: 'Cover for accidental damage to your contents', on: true, price: '+$8.50/month' },
        { label: 'Pet Cover', desc: 'Vet expenses for accidents at home', on: false, price: '+$5.20/month' }].map(({ label, desc, on, price }) => (
        <div key={label} style={{ border: `1px solid ${on ? '#0D9488' : '#E5E7EB'}`, borderRadius: '12px', padding: '16px 20px', background: on ? '#F0FDFA' : '#fff', fontFamily: 'Arial, sans-serif' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '44px', height: '22px', background: on ? '#0D9488' : '#D1D5DB', borderRadius: '11px', padding: '2px', display: 'flex', justifyContent: on ? 'flex-end' : 'flex-start', boxSizing: 'border-box', flexShrink: 0, marginTop: '3px' }}>
                <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>{label}</div>
                <div style={{ color: '#6B7280', fontSize: '12px', marginTop: '2px' }}>{desc}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: on ? '#0D9488' : '#1A1A1A' }}>{price}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function CoverageGridPreview() {
  const items = [
    { icon: '🔥', title: 'Fire damage', desc: 'Includes bushfire' },
    { icon: '🌊', title: 'Flood & storm', desc: 'Natural disasters' },
    { icon: '📍', title: 'SA claims team', desc: 'Local support' },
    { icon: '🔒', title: 'Burglary', desc: 'Theft & break-in' },
    { icon: '🗝', title: 'Lock replacement', desc: 'After break-in' },
    { icon: '🏨', title: 'Accommodation', desc: 'If home is unlivable' },
    { icon: '💰', title: 'Loss of rent', desc: 'For landlords' },
    { icon: '⚡', title: 'Motor burnout', desc: 'Appliance damage' },
    { icon: '🪟', title: 'Glass breakage', desc: 'Windows & doors' },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontFamily: 'Arial, sans-serif' }}>
      {items.map(({ icon, title, desc }) => (
        <div key={title} style={{ textAlign: 'center', padding: '12px 8px' }}>
          <div style={{ fontSize: '24px', marginBottom: '6px' }}>{icon}</div>
          <div style={{ fontWeight: '600', fontSize: '13px', color: '#1A1A1A' }}>{title}</div>
          <div style={{ color: '#6B7280', fontSize: '12px', marginTop: '2px' }}>{desc}</div>
        </div>
      ))}
    </div>
  )
}

function SummaryTablePreview() {
  const rows = [
    ['Building sum insured', '$450,000'],
    ['Contents sum insured', '$80,000'],
    ['Building excess', '$500'],
    ['Contents excess', '$250'],
    ['Portable valuables', 'Not included'],
  ]
  return (
    <div style={{ borderRadius: '4px', overflow: 'hidden', fontFamily: 'Arial, sans-serif', border: '1px solid #E5E7EB', borderLeft: '3px solid #FFD100' }}>
      {rows.map(([label, value], i) => (
        <div key={i} style={{ display: 'flex', padding: '10px 16px', borderBottom: i < rows.length - 1 ? '1px solid #F0EDE4' : 'none', background: i % 2 === 1 ? '#FAFAF8' : '#fff' }}>
          <div style={{ flex: 1, fontSize: '14px', color: '#6B7280' }}>{label}</div>
          <div style={{ fontWeight: '600', fontSize: '14px', color: '#1A1A1A' }}>{value}</div>
        </div>
      ))}
    </div>
  )
}

function BreadcrumbPreview() {
  const crumbs = ['Home', 'My Account', 'My products', 'Home Insurance']
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <nav style={{ fontSize: '14px', fontFamily: 'Arial, sans-serif', display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
        {crumbs.map((c, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {i > 0 && <span style={{ color: '#9CA3AF' }}>›</span>}
            <span style={{ color: i === crumbs.length - 1 ? '#1A1A1A' : '#2563EB', textDecoration: i < crumbs.length - 1 ? 'underline' : 'none', cursor: i < crumbs.length - 1 ? 'pointer' : 'default' }}>{c}</span>
          </span>
        ))}
      </nav>
      <nav style={{ fontSize: '14px', fontFamily: 'Arial, sans-serif', display: 'flex', gap: '6px', alignItems: 'center' }}>
        <span style={{ fontSize: '16px' }}>🏠</span>
        <span style={{ color: '#9CA3AF' }}>›</span>
        <span style={{ color: '#2563EB', textDecoration: 'underline', cursor: 'pointer' }}>My Account</span>
        <span style={{ color: '#9CA3AF' }}>›</span>
        <span style={{ color: '#1A1A1A' }}>My claims</span>
      </nav>
    </div>
  )
}

function MemberInfoCardPreview() {
  return (
    <div style={{ border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', background: '#fff', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ fontWeight: '700', fontSize: '18px', color: '#1A1A1A', marginBottom: '4px' }}>Jane Smith</div>
      <div style={{ color: '#6B7280', fontSize: '14px', marginBottom: '2px' }}>Member #0019234 · Member since 2017</div>
      <div style={{ color: '#16A34A', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>Saved $342.00 this year</div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ border: '1px solid #1A1A1A', borderRadius: '8px', padding: '9px 16px', fontSize: '14px', fontWeight: '500', display: 'inline-block', cursor: 'pointer' }}>Show Card</div>
        <div style={{ background: '#FFD100', borderRadius: '8px', padding: '9px 16px', fontSize: '14px', fontWeight: '600', display: 'inline-block', cursor: 'pointer' }}>Renew membership</div>
      </div>
    </div>
  )
}

function ContactSectionPreview() {
  const contacts = [
    { icon: '📞', heading: 'Call us', desc: '08 8202 4600', link: '24/7 for emergencies' },
    { icon: '✉️', heading: 'Enquire online', desc: 'Send us a message', link: 'Response within 2 business days' },
    { icon: '📍', heading: 'Visit an RAA shop', desc: '10 locations across SA', link: 'Find your nearest shop →' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}>
      {contacts.map((c, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '16px 20px', borderBottom: i < contacts.length - 1 ? '1px solid #E5E7EB' : 'none', background: '#fff' }}>
          <span style={{ fontSize: '22px', flexShrink: 0 }}>{c.icon}</span>
          <div>
            <div style={{ fontWeight: '600', fontSize: '14px', color: '#1A1A1A' }}>{c.heading}</div>
            <div style={{ fontSize: '14px', color: '#2563EB', marginTop: '2px', textDecoration: 'underline' }}>{c.desc}</div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>{c.link}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function PersonCardPreview() {
  const people = [
    { name: 'Jane Smith', details: 'Female · Age 34 · RAA Member' },
    { name: 'Michael Smith', details: 'Male · Age 36 · Non-member' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {people.map((p, i) => (
        <div key={i} style={{ border: '1px solid #E5E7EB', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', background: '#fff', fontFamily: 'Arial, sans-serif' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>👤</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '700', fontSize: '15px', color: '#1A1A1A' }}>{p.name}</div>
            <div style={{ color: '#6B7280', fontSize: '13px', marginTop: '2px' }}>{p.details}</div>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '14px' }}>✏️</div>
            <div style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '14px' }}>🗑️</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Taskly previews ─────────────────────────────────────────────────────────

function TasklyButtonPreview() {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ background: '#1A2B4A', color: '#fff', height: '40px', padding: '0 20px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', fontSize: '14px', fontWeight: '600', fontFamily: 'Inter, sans-serif' }}>Save task</div>
      <div style={{ background: '#1A2B4A', color: '#fff', height: '40px', padding: '0 20px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', fontSize: '14px', fontWeight: '600', fontFamily: 'Inter, sans-serif' }}>Create project</div>
      <div style={{ background: '#1A2B4A', color: '#fff', height: '40px', padding: '0 20px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', fontSize: '14px', fontWeight: '600', fontFamily: 'Inter, sans-serif', opacity: 0.4, cursor: 'not-allowed' }}>Disabled</div>
    </div>
  )
}

function TasklyTextInputPreview() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 180px' }}>
        <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '6px', fontFamily: 'Inter, sans-serif', color: '#1A1A2E' }}>Task name</div>
        <div style={{ height: '40px', border: '1px solid #E0E2E6', borderRadius: '8px', padding: '0 12px', display: 'flex', alignItems: 'center', background: '#fff', fontSize: '14px', color: '#6B7280', fontFamily: 'Inter, sans-serif' }}>
          Enter task name…
        </div>
      </div>
      <div style={{ flex: '1 1 180px' }}>
        <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '6px', fontFamily: 'Inter, sans-serif', color: '#1A1A2E' }}>Due date</div>
        <div style={{ height: '40px', border: '1px solid #E0E2E6', borderRadius: '8px', padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', fontSize: '14px', color: '#1A1A2E', fontFamily: 'Inter, sans-serif' }}>
          <span>25 May 2026</span>
          <span style={{ color: '#6B7280' }}>📅</span>
        </div>
      </div>
    </div>
  )
}

function TasklyCardPreview() {
  const tasks = [
    { title: 'Design review', body: 'Review the updated component specs and provide feedback.', status: 'In progress', statusColor: '#22A86B', statusBg: '#F0FDF4', statusBorder: '#86EFAC', due: 'Due: 25 May' },
    { title: 'Update documentation', body: 'Add new token examples to the foundations page.', status: 'To do', statusColor: '#2B7DE9', statusBg: '#EFF6FF', statusBorder: '#BFDBFE', due: 'Due: 27 May' },
    { title: 'QA testing sprint', body: 'Run accessibility checks on all new components.', status: 'Overdue', statusColor: '#D93636', statusBg: '#FEF2F2', statusBorder: '#FCA5A5', due: 'Due: 18 May' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {tasks.map((t, i) => (
        <div key={i} style={{ border: '1px solid #E0E2E6', borderRadius: '12px', padding: '14px 16px', background: '#fff', fontFamily: 'Inter, sans-serif' }}>
          <div style={{ fontWeight: '600', fontSize: '15px', color: '#1A1A2E', marginBottom: '5px' }}>{t.title}</div>
          <div style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.5', marginBottom: '10px' }}>{t.body}</div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ background: t.statusBg, border: `1px solid ${t.statusBorder}`, color: t.statusColor, borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: '600' }}>{t.status}</span>
            <span style={{ color: '#9CA3AF', fontSize: '12px' }}>{t.due}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function TasklyBottomNavPreview() {
  const items = [
    { icon: '🏠', label: 'Home', active: true },
    { icon: '🔍', label: 'Search', active: false },
    { icon: '📋', label: 'Activity', active: false },
    { icon: '👤', label: 'Profile', active: false },
  ]
  return (
    <div style={{ background: '#fff', border: '1px solid #E0E2E6', borderRadius: '12px', overflow: 'hidden', fontFamily: 'Inter, sans-serif', maxWidth: '360px' }}>
      <div style={{ background: '#F4F5F7', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E0E2E6' }}>
        <span style={{ fontSize: '16px', fontWeight: '600', color: '#1A1A2E' }}>My tasks</span>
        <span style={{ fontSize: '20px' }}>⊕</span>
      </div>
      <div style={{ padding: '12px 16px', fontSize: '13px', color: '#6B7280', borderBottom: '1px solid #E0E2E6' }}>3 tasks due this week</div>
      <div style={{ display: 'flex', height: '56px', borderTop: '1px solid #E0E2E6' }}>
        {items.map((item, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', color: item.active ? '#1A2B4A' : '#6B7280', borderTop: item.active ? '2px solid #1A2B4A' : '2px solid transparent' }}>
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span style={{ fontSize: '10px', fontWeight: item.active ? '600' : '400' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── RAA App previews ────────────────────────────────────────────────────────

function RaaAppHomeScreenGridTilePreview() {
  const tiles = [
    { icon: '⛽', label: 'Fuel Prices', bg: '#FFD100' },
    { icon: '🗺️', label: 'Trip Planner', bg: '#1A1A1A', light: true },
    { icon: '🛡️', label: 'Insurance', bg: '#F5F5F0' },
    { icon: '🏆', label: 'Competitions', bg: '#F5F5F0' },
    { icon: '💰', label: 'Savings', bg: '#F5F5F0' },
    { icon: '👤', label: 'My Account', bg: '#F5F5F0' },
  ]
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#F5F5F0', padding: '16px', borderRadius: '12px', maxWidth: '340px' }}>
      <div style={{ fontSize: '13px', fontWeight: '600', color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Quick Actions</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {tiles.map((t, i) => (
          <div key={i} style={{
            background: t.bg, borderRadius: '14px', padding: '14px 8px 10px', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '6px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}>
            <span style={{ fontSize: '22px', lineHeight: 1 }}>{t.icon}</span>
            <span style={{ fontSize: '11px', fontWeight: '600', color: t.light ? '#fff' : '#1A1A1A', textAlign: 'center', lineHeight: '1.2' }}>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RaaAppBottomSheetPreview() {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#1A1A1A80', borderRadius: '12px', overflow: 'hidden', maxWidth: '340px', minHeight: '200px', position: 'relative' }}>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '20px 20px 0 0', padding: '0 0 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
          <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: '#E5E7EB' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px 12px' }}>
          <span style={{ fontSize: '17px', fontWeight: '700', color: '#1A1A1A' }}>Filter Results</span>
          <button style={{ background: 'none', border: 'none', fontSize: '15px', color: '#9CA3AF', cursor: 'pointer', padding: 0 }}>✕</button>
        </div>
        {[
          { label: 'Fuel Type', value: 'Unleaded 91' },
          { label: 'Max Distance', value: '5 km' },
          { label: 'Sort By', value: 'Cheapest' },
        ].map((row, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderTop: '1px solid #E5E7EB' }}>
            <span style={{ fontSize: '15px', color: '#1A1A1A' }}>{row.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '15px', color: '#0D9488', fontWeight: '600' }}>{row.value}</span>
              <span style={{ color: '#9CA3AF', fontSize: '12px' }}>›</span>
            </div>
          </div>
        ))}
        <div style={{ padding: '12px 16px 4px' }}>
          <div style={{ background: '#1A1A1A', borderRadius: '12px', padding: '14px', textAlign: 'center', color: '#fff', fontWeight: '700', fontSize: '16px' }}>Apply Filters</div>
        </div>
      </div>
    </div>
  )
}

function RaaAppMapFilterPillPreview() {
  const pills = [
    { label: 'Cheapest', active: true },
    { label: 'Nearest' },
    { label: 'Open Now' },
    { label: 'BP' },
    { label: 'Shell' },
  ]
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#F5F5F0', padding: '16px', borderRadius: '12px' }}>
      <div style={{ fontSize: '13px', fontWeight: '600', color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>Filter Pills</div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {pills.map((p, i) => (
          <div key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            padding: '7px 14px', borderRadius: '20px',
            background: p.active ? '#FFD100' : '#fff',
            border: p.active ? 'none' : '1px solid #E5E7EB',
            fontSize: '14px', fontWeight: p.active ? '700' : '500',
            color: '#1A1A1A',
            boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
          }}>
            {p.active && <span style={{ color: '#0D9488', fontWeight: '800', fontSize: '12px' }}>✓ </span>}
            {p.label}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '14px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
        <span style={{ fontSize: '11px', color: '#9CA3AF' }}>Active filter changes map results</span>
        <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
      </div>
    </div>
  )
}

function RaaAppNotificationListItemPreview() {
  const items = [
    { icon: '⛽', title: 'Fuel prices updated', body: 'New prices in your area from 7am today', time: '2m ago', unread: true },
    { icon: '🏆', title: 'You entered a competition!', body: 'Win a $500 fuel card — results 30 June', time: '1h ago', unread: true },
    { icon: '🛡️', title: 'Renewal reminder', body: 'Your home insurance renews in 14 days', time: 'Yesterday', unread: false },
  ]
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E5E7EB', maxWidth: '360px' }}>
      {items.map((n, i) => (
        <div key={i} style={{ display: 'flex', gap: '12px', padding: '14px 16px', background: n.unread ? '#FFFDE7' : '#fff', borderBottom: i < items.length - 1 ? '1px solid #E5E7EB' : 'none' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: '#F5F5F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{n.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: n.unread ? '700' : '500', color: '#1A1A1A', lineHeight: '1.3' }}>{n.title}</span>
              {n.unread && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFD100', flexShrink: 0, marginTop: '4px' }} />}
            </div>
            <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px', lineHeight: '1.35' }}>{n.body}</div>
            <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function RaaAppSavingsHeroBannerPreview() {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#FFD100', borderRadius: '16px', padding: '20px 20px 16px', maxWidth: '340px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -20, top: -20, width: '120px', height: '120px', borderRadius: '60px', background: 'rgba(255,255,255,0.15)' }} />
      <div style={{ position: 'absolute', right: 10, top: 30, width: '70px', height: '70px', borderRadius: '35px', background: 'rgba(255,255,255,0.2)' }} />
      <div style={{ fontSize: '12px', fontWeight: '700', color: '#7A4F00', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>Your savings this year</div>
      <div style={{ fontSize: '42px', fontWeight: '800', color: '#1A1A1A', lineHeight: '1', marginBottom: '4px' }}>$183</div>
      <div style={{ fontSize: '14px', color: '#5A3600', marginBottom: '14px' }}>on fuel vs. national average</div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{ background: 'rgba(0,0,0,0.1)', borderRadius: '10px', padding: '6px 12px', fontSize: '12px', fontWeight: '600', color: '#1A1A1A' }}>⛽ 23 fill-ups</div>
        <div style={{ background: 'rgba(0,0,0,0.1)', borderRadius: '10px', padding: '6px 12px', fontSize: '12px', fontWeight: '600', color: '#1A1A1A' }}>📍 4 stations</div>
      </div>
    </div>
  )
}

function RaaAppSettingsToggleRowPreview() {
  const rows = [
    { section: 'NOTIFICATIONS', label: 'Fuel price alerts', on: true },
    { label: 'Competition updates', on: true },
    { label: 'Insurance reminders', on: false },
    { section: 'PRIVACY', label: 'Location tracking', on: true },
    { label: 'Analytics', on: false },
  ]
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#F5F5F0', borderRadius: '12px', overflow: 'hidden', maxWidth: '340px' }}>
      {rows.map((row, i) => (
        <div key={i}>
          {row.section && (
            <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9CA3AF', padding: '14px 16px 6px', background: '#F5F5F0' }}>{row.section}</div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#fff', borderBottom: '1px solid #F5F5F0' }}>
            <span style={{ fontSize: '15px', color: '#1A1A1A' }}>{row.label}</span>
            <div style={{ width: '48px', height: '28px', borderRadius: '14px', background: row.on ? '#0D9488' : '#E5E7EB', position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}>
              <div style={{ position: 'absolute', top: '3px', left: row.on ? '23px' : '3px', width: '22px', height: '22px', borderRadius: '11px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function RaaAppMemberCardPreview() {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '340px' }}>
      <div style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)', borderRadius: '16px', padding: '20px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, bottom: -20, width: '130px', height: '130px', borderRadius: '65px', background: 'rgba(255,209,0,0.12)' }} />
        <div style={{ position: 'absolute', right: 20, top: -10, width: '80px', height: '80px', borderRadius: '40px', background: 'rgba(255,209,0,0.08)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.1em', color: '#FFD100', textTransform: 'uppercase' }}>RAA Member</div>
            <div style={{ fontSize: '20px', fontWeight: '700', marginTop: '2px' }}>Sarah Johnson</div>
          </div>
          <div style={{ background: '#FFD100', borderRadius: '8px', padding: '6px 10px', fontSize: '12px', fontWeight: '800', color: '#1A1A1A' }}>GOLD</div>
        </div>
        <div style={{ fontSize: '12px', color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: '4px' }}>MEMBER NUMBER</div>
        <div style={{ fontSize: '18px', fontWeight: '600', letterSpacing: '0.08em', fontVariantNumeric: 'tabular-nums' }}>●●●● ●●●● 4521</div>
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#9CA3AF' }}>Member since</div>
            <div style={{ fontSize: '13px', fontWeight: '600' }}>2019</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#9CA3AF' }}>Renews</div>
            <div style={{ fontSize: '13px', fontWeight: '600' }}>Dec 2026</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RaaAppFuelStationPinPreview() {
  const stations = [
    { name: 'BP Aldgate', price: '179.9', open: true, cheapest: true, distance: '1.2 km' },
    { name: 'Shell Burnside', price: '183.5', open: true, cheapest: false, distance: '2.8 km' },
    { name: 'Caltex Norwood', price: '186.2', open: false, cheapest: false, distance: '3.4 km' },
  ]
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#F5F5F0', borderRadius: '12px', padding: '12px', maxWidth: '340px' }}>
      <div style={{ fontSize: '13px', fontWeight: '600', color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>Fuel Station Pins</div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        {[{ label: '179.9', cheapest: true }, { label: '183.5', cheapest: false }, { label: '●', cheapest: false, closed: true }].map((pin, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <div style={{
              background: pin.cheapest ? '#FFD100' : pin.closed ? '#E5E7EB' : '#fff',
              border: pin.cheapest ? '2px solid #1A1A1A' : '1.5px solid #9CA3AF',
              borderRadius: '10px', padding: '5px 10px',
              fontSize: '13px', fontWeight: '700',
              color: pin.closed ? '#9CA3AF' : '#1A1A1A',
              boxShadow: pin.cheapest ? '0 2px 8px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.08)',
              transform: pin.cheapest ? 'scale(1.05)' : 'scale(1)',
            }}>{pin.label}</div>
            <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `6px solid ${pin.cheapest ? '#1A1A1A' : '#9CA3AF'}` }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
        {stations.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', background: '#fff', gap: '8px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>{s.name}</span>
                {s.cheapest && <span style={{ fontSize: '10px', fontWeight: '700', background: '#FFD100', color: '#1A1A1A', padding: '1px 6px', borderRadius: '6px' }}>CHEAPEST</span>}
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                <span style={{ fontSize: '12px', color: s.open ? '#16A34A' : '#DC2626', fontWeight: '600' }}>{s.open ? 'Open' : 'Closed'}</span>
                <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{s.distance}</span>
              </div>
            </div>
            <span style={{ fontSize: '17px', fontWeight: '800', color: '#1A1A1A', fontVariantNumeric: 'tabular-nums' }}>{s.price}¢</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RaaAppCompetitionCardPreview() {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '340px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>
        <div style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #3D2B00 100%)', padding: '20px 16px 16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -15, top: -15, width: '100px', height: '100px', borderRadius: '50px', background: 'rgba(255,209,0,0.15)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#FFD100', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>Win Big</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff', lineHeight: '1.15' }}>$5,000 Fuel Card</div>
              <div style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '4px' }}>Enter with every refuel</div>
            </div>
            <div style={{ background: '#FFD100', borderRadius: '10px', padding: '6px 10px', textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#1A1A1A', lineHeight: 1 }}>3</div>
              <div style={{ fontSize: '9px', fontWeight: '700', color: '#7A4F00', textTransform: 'uppercase' }}>days left</div>
            </div>
          </div>
        </div>
        <div style={{ padding: '14px 16px' }}>
          <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '12px', lineHeight: '1.4' }}>Use the RAA App to locate a participating BP or Shell station and scan your member card to enter automatically.</div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ background: '#FFD100', borderRadius: '10px', padding: '10px 20px', fontWeight: '700', fontSize: '14px', color: '#1A1A1A', flex: 1, textAlign: 'center' }}>Enter Now</div>
            <div style={{ border: '1px solid #E5E7EB', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#6B7280' }}>T&Cs</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RaaAppRewardsCardPreview() {
  const rewards = [
    { icon: '⛽', title: '2¢/L fuel discount', partner: 'All BP stations', points: 500, redeemed: true },
    { icon: '🛒', title: '$10 Coles voucher', partner: 'Coles supermarkets', points: 1000, redeemed: false },
    { icon: '🏨', title: '15% hotel discount', partner: 'RAA Travel', points: 0, redeemed: false },
  ]
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '340px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Your Points</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#1A1A1A', lineHeight: 1 }}>2,450 <span style={{ fontSize: '14px', fontWeight: '500', color: '#9CA3AF' }}>pts</span></div>
        </div>
        <div style={{ background: '#FFD100', borderRadius: '10px', padding: '8px 14px', fontSize: '13px', fontWeight: '700', color: '#1A1A1A' }}>Redeem</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {rewards.map((r, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '12px 14px', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: '#F5F5F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{r.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>{r.title}</div>
              <div style={{ fontSize: '12px', color: '#9CA3AF' }}>{r.partner}</div>
            </div>
            <div style={{ flexShrink: 0, textAlign: 'right' }}>
              {r.redeemed
                ? <div style={{ background: '#F0FDF4', color: '#16A34A', fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '8px' }}>Active</div>
                : r.points > 0
                  ? <div style={{ fontSize: '12px', fontWeight: '700', color: '#0D9488' }}>{r.points} pts</div>
                  : <div style={{ background: '#FFD100', color: '#1A1A1A', fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '8px' }}>Free</div>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Preview registry ─────────────────────────────────────────────────────────

const PREVIEWS = {
  'raa-web:Primary Button':      PrimaryButtonPreview,
  'raa-web:Secondary Button':    SecondaryButtonPreview,
  'raa-web:Text Input':          TextInputRAAPreview,
  'raa-web:Dropdown Select':     DropdownSelectPreview,
  'raa-web:Radio Card':          RadioCardPreview,
  'raa-web:Checkbox':            CheckboxPreview,
  'raa-web:Toggle Switch':       ToggleSwitchPreview,
  'raa-web:Stepper Navigation':  StepperNavigationPreview,
  'raa-web:Progress Banner':     ProgressBannerPreview,
  'raa-web:Sidebar Navigation':  SidebarNavigationPreview,
  'raa-web:Header Bar':          HeaderBarPreview,
  'raa-web:Footer':              FooterPreview,
  'raa-web:Product Card':        ProductCardPreview,
  'raa-web:Quick Action Card':   QuickActionCardPreview,
  'raa-web:Feature Card':        FeatureCardPreview,
  'raa-web:Promo Banner':        PromoBannerPreview,
  'raa-web:Accordion':           AccordionPreview,
  'raa-web:Alert Banner':        AlertBannerPreview,
  'raa-web:Info Tooltip':        InfoTooltipPreview,
  'raa-web:Chat Widget':         ChatWidgetPreview,
  'raa-web:Mascot Tip':          MascotTipPreview,
  'raa-web:Quote Summary Card':  QuoteSummaryCardPreview,
  'raa-web:Cover Option Card':   CoverOptionCardPreview,
  'raa-web:Coverage Grid':       CoverageGridPreview,
  'raa-web:Summary Table':       SummaryTablePreview,
  'raa-web:Breadcrumb':          BreadcrumbPreview,
  'raa-web:Member Info Card':    MemberInfoCardPreview,
  'raa-web:Contact Section':     ContactSectionPreview,
  'raa-web:Person Card':         PersonCardPreview,
  'taskly:Button':               TasklyButtonPreview,
  'taskly:Text Input':           TasklyTextInputPreview,
  'taskly:Card':                 TasklyCardPreview,
  'taskly:Bottom Nav Bar':       TasklyBottomNavPreview,
  'raa-app:Home Screen Grid Tile':   RaaAppHomeScreenGridTilePreview,
  'raa-app:Bottom Sheet':            RaaAppBottomSheetPreview,
  'raa-app:Map Filter Pill':         RaaAppMapFilterPillPreview,
  'raa-app:Notification List Item':  RaaAppNotificationListItemPreview,
  'raa-app:Savings Hero Banner':     RaaAppSavingsHeroBannerPreview,
  'raa-app:Settings Toggle Row':     RaaAppSettingsToggleRowPreview,
  'raa-app:Member Card':             RaaAppMemberCardPreview,
  'raa-app:Fuel Station Pin':        RaaAppFuelStationPinPreview,
  'raa-app:Competition Card':        RaaAppCompetitionCardPreview,
  'raa-app:Rewards Card':            RaaAppRewardsCardPreview,
}

// ─── Public component ─────────────────────────────────────────────────────────

export default function ComponentPreview({ component, thumbnail = false }) {
  const key = `${component.product}:${component.name}`
  const PreviewComponent = PREVIEWS[key]

  if (!PreviewComponent) return null

  if (thumbnail) {
    return (
      <div style={{
        width: '100%',
        height: '100px',
        overflow: 'hidden',
        background: '#F4F5F7',
        borderRadius: '8px 8px 0 0',
        borderBottom: '1px solid #DFE1E6',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          transformOrigin: 'top center',
          transform: 'scale(0.54)',
          padding: '14px 16px 0',
          pointerEvents: 'none',
          width: '100%',
        }}>
          <PreviewComponent />
        </div>
      </div>
    )
  }

  return (
    <div style={{
      background: '#F4F5F7',
      border: '1px solid #DFE1E6',
      borderRadius: '10px',
      padding: '36px 32px',
      marginBottom: '32px',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
    }}>
      <div style={{ width: '100%', maxWidth: '560px' }}>
        <PreviewComponent />
      </div>
    </div>
  )
}

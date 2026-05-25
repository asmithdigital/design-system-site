// RAA UI mockup SVGs — pixel-accurate representations of production screens

const C = {
  yellow:      '#FFD000',
  teal:        '#00857A',
  tealLight:   '#E6F4F2',
  dark:        '#1A1A2E',
  grey:        '#6B7280',
  greyLight:   '#9CA3AF',
  border:      '#E5E7EB',
  pink:        '#FFF0EE',
  pinkBorder:  '#FECACA',
  white:       '#ffffff',
  pageBg:      '#F9FAFB',
  sidebarBg:   '#F8F9FA',
  red:         '#DC2626',
  redLight:    '#FEF2F2',
  green:       '#16A34A',
  greenLight:  '#F0FDF4',
  black:       '#000000',
  darkOverlay: 'rgba(0,0,0,0.55)',
  disabled:    '#E5E7EB',
  disabledTxt: '#9CA3AF',
  yellow4:     '#FFD100',
  infoBlue:    '#EFF6FF',
  infoBlueBdr: '#BFDBFE',
  infoBlueText:'#1E40AF',
}

const CAPTION = 'Visual representation based on production UI — in production this connects directly to Figma'

function Caption() {
  return (
    <p style={{
      fontSize: '12px', color: C.grey, marginTop: '10px',
      fontStyle: 'italic', textAlign: 'center', lineHeight: '1.5',
    }}>
      {CAPTION}
    </p>
  )
}

// ── Shared sub-elements ────────────────────────────────────────────────────

function RAALogo({ x = 20, cy = 26 }) {
  return (
    <g>
      <polygon
        points={`${x},${cy-10} ${x+8},${cy} ${x},${cy+10} ${x+4},${cy+10} ${x+12},${cy} ${x+4},${cy-10}`}
        fill={C.yellow}
      />
      <text x={x+16} y={cy+5} fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill={C.dark}>RAA</text>
    </g>
  )
}

function HeaderBar({ title = 'Home Insurance Quote', y = 0, width = 900 }) {
  return (
    <g>
      <rect x={0} y={y} width={width} height={52} fill={C.white}/>
      <line x1={0} y1={y+52} x2={width} y2={y+52} stroke={C.border} strokeWidth={1}/>
      <RAALogo x={20} cy={y+26}/>
      <text x={90} y={y+30} fontFamily="Arial,sans-serif" fontSize="12" fill="#374151">{title}</text>
      <text x={width-16} y={y+30} fontFamily="Arial,sans-serif" fontSize="11" fill={C.teal} textAnchor="end">Need help ›</text>
    </g>
  )
}

function YellowBand({ step, stepTotal, heading, y = 52, width = 900, height = 96 }) {
  return (
    <g>
      <rect x={0} y={y} width={width} height={height} fill={C.yellow}/>
      <text x={width/2} y={y+28} fontFamily="Arial,sans-serif" fontSize="11" fill={C.dark} textAnchor="middle" fontWeight="400">
        {`Step ${step} of ${stepTotal}`}
      </text>
      <text x={width/2} y={y+58} fontFamily="Arial,sans-serif" fontSize="22" fontWeight="700" fill={C.dark} textAnchor="middle">{heading}</text>
    </g>
  )
}

function StepCircle({ cx, cy, num, state }) {
  // state: 'active' | 'complete' | 'upcoming'
  if (state === 'active') {
    return (
      <g>
        <circle cx={cx} cy={cy} r={16} fill={C.teal}/>
        <text x={cx} y={cy+5} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill={C.white} textAnchor="middle">{num}</text>
      </g>
    )
  }
  if (state === 'complete') {
    return (
      <g>
        <circle cx={cx} cy={cy} r={16} fill={C.yellow}/>
        <text x={cx} y={cy+5} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill={C.dark} textAnchor="middle">✓</text>
      </g>
    )
  }
  // upcoming
  return (
    <g>
      <circle cx={cx} cy={cy} r={16} fill={C.white} stroke={C.border} strokeWidth="1.5"/>
      <text x={cx} y={cy+5} fontFamily="Arial,sans-serif" fontSize="13" fill={C.greyLight} textAnchor="middle">{num}</text>
    </g>
  )
}

function Stepper({ steps, topY, width = 186 }) {
  const cx = width / 2 - 14
  const labelX = cx + 24
  const startY = topY + 38
  const spacing = 72

  return (
    <g>
      <rect x={0} y={topY} width={width} height={Math.max(400, steps.length * spacing + 40)} fill={C.sidebarBg}/>
      <line x1={width} y1={topY} x2={width} y2={topY + steps.length * spacing + 60} stroke={C.border} strokeWidth={1}/>
      {steps.map((step, i) => {
        const cy = startY + i * spacing
        const isLast = i === steps.length - 1
        return (
          <g key={i}>
            {!isLast && (
              <line x1={cx} y1={cy + 16} x2={cx} y2={cy + spacing - 16} stroke={C.border} strokeWidth={2}/>
            )}
            <StepCircle cx={cx} cy={cy} num={i + 1} state={step.state}/>
            {step.label2 ? (
              <>
                <text x={labelX} y={cy - 4} fontFamily="Arial,sans-serif" fontSize="11" fontWeight={step.state === 'active' ? '600' : '400'} fill={step.state === 'active' ? C.dark : C.greyLight}>{step.label}</text>
                <text x={labelX} y={cy + 10} fontFamily="Arial,sans-serif" fontSize="11" fontWeight={step.state === 'active' ? '600' : '400'} fill={step.state === 'active' ? C.dark : C.greyLight}>{step.label2}</text>
              </>
            ) : (
              <text x={labelX} y={cy + 5} fontFamily="Arial,sans-serif" fontSize="11" fontWeight={step.state === 'active' ? '600' : '400'} fill={step.state === 'active' ? C.dark : C.greyLight}>{step.label}</text>
            )}
          </g>
        )
      })}
    </g>
  )
}

function RadioCard({ x, y, w = 600, h = 54, selected = false, label, sublabel }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={selected ? C.tealLight : C.white} stroke={selected ? C.teal : C.border} strokeWidth={selected ? 2 : 1}/>
      {selected ? (
        <g>
          <circle cx={x+24} cy={y+h/2} r={10} fill={C.teal}/>
          <circle cx={x+24} cy={y+h/2} r={4} fill={C.white}/>
        </g>
      ) : (
        <circle cx={x+24} cy={y+h/2} r={10} fill="none" stroke={C.greyLight} strokeWidth={1.5}/>
      )}
      <text x={x+44} y={y+h/2-5} fontFamily="Arial,sans-serif" fontSize="13" fontWeight={selected ? '600' : '500'} fill={selected ? C.teal : C.dark}>{label}</text>
      {sublabel && (
        <text x={x+44} y={y+h/2+10} fontFamily="Arial,sans-serif" fontSize="11" fill={C.grey}>{sublabel}</text>
      )}
    </g>
  )
}

function PinkCallout({ x, y, w = 600, title, body, link }) {
  const h = link ? 80 : 64
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={C.pink} stroke={C.pinkBorder} strokeWidth={1}/>
      <circle cx={x+22} cy={y+h/2} r={12} fill="#FECACA"/>
      <text x={x+22} y={y+h/2+5} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#991B1B" textAnchor="middle">!</text>
      <text x={x+44} y={y+20} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#991B1B">{title}</text>
      <text x={x+44} y={y+36} fontFamily="Arial,sans-serif" fontSize="11" fill="#7F1D1D">{body}</text>
      {link && (
        <text x={x+44} y={y+54} fontFamily="Arial,sans-serif" fontSize="11" fill={C.teal} textDecoration="underline">{link}</text>
      )}
    </g>
  )
}

function GreyButton({ x, y, label = 'Next →', w = 160, h = 44 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={22} fill={C.disabled}/>
      <text x={x+w/2} y={y+h/2+5} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="600" fill={C.disabledTxt} textAnchor="middle">{label}</text>
    </g>
  )
}

function YellowButton({ x, y, label, w = 160, h = 44 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={C.yellow}/>
      <text x={x+w/2} y={y+h/2+5} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="600" fill={C.dark} textAnchor="middle">{label}</text>
    </g>
  )
}

function SecondaryButton({ x, y, label, w = 160, h = 44 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={C.white} stroke={C.border} strokeWidth={1}/>
      <text x={x+w/2} y={y+h/2+5} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="500" fill={C.dark} textAnchor="middle">{label}</text>
    </g>
  )
}

function SectionHeading({ x, y, label, lineEnd }) {
  return (
    <g>
      <text x={x} y={y} fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill={C.dark}>{label}</text>
      <line x1={x} y1={y+8} x2={lineEnd} y2={y+8} stroke={C.border} strokeWidth={1}/>
    </g>
  )
}

function Footer({ y = 628, width = 900 }) {
  return (
    <g>
      <line x1={0} y1={y} x2={width} y2={y} stroke={C.border} strokeWidth={1}/>
      <text x={width/2} y={y+18} fontFamily="Arial,sans-serif" fontSize="9" fill={C.greyLight} textAnchor="middle">Privacy Policy  ·  Cookie Policy  ·  Terms and Conditions  ·  © 2026 RAA Insurance</text>
    </g>
  )
}

function AnnotationLabel({ x, y, label, lineFromX, lineFromY }) {
  const boxW = label.length * 6.4 + 16
  return (
    <g>
      {lineFromX !== undefined && (
        <line x1={lineFromX} y1={lineFromY} x2={x} y2={y} stroke="#475569" strokeWidth={1} strokeDasharray="3,2"/>
      )}
      <rect x={x} y={y - 10} width={boxW} height={20} rx={3} fill={C.dark}/>
      <text x={x + 8} y={y + 4} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="600" fill={C.white}>{label}</text>
    </g>
  )
}

// ── 1. Quote Flow Pattern Mockup ────────────────────────────────────────────

export function QuoteFlowMockup() {
  const W = 900; const H = 660
  const STEP_W = 186
  const BAND_H = 96
  const HEADER_H = 52
  const CONTENT_Y = HEADER_H + BAND_H  // = 148
  const CONTENT_X = STEP_W
  const INNER_X = CONTENT_X + 46
  const CARD_W = 598

  const steps = [
    { label: 'General', label2: 'information', state: 'active' },
    { label: 'Your home', state: 'upcoming' },
    { label: 'Your contents', state: 'upcoming' },
    { label: 'Policy holders', state: 'upcoming' },
    { label: 'Your quote', state: 'upcoming' },
  ]

  return (
    <div style={{ border: '1px solid #DFE1E6', borderRadius: '8px', overflow: 'hidden', backgroundColor: C.pageBg }}>
      <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
        <rect width={W} height={H} fill={C.pageBg}/>

        <HeaderBar title="Home Insurance Quote" y={0} width={W}/>
        <YellowBand step={1} stepTotal={5} heading="General information" y={HEADER_H} width={W} height={BAND_H}/>
        <Stepper steps={steps} topY={CONTENT_Y} width={STEP_W}/>

        {/* Content area */}
        <rect x={CONTENT_X} y={CONTENT_Y} width={W - CONTENT_X} height={H - CONTENT_Y - 32} fill={C.white}/>

        <SectionHeading x={INNER_X} y={184} label="Home use" lineEnd={INNER_X + CARD_W}/>

        <RadioCard x={INNER_X} y={202} w={CARD_W} selected label="Owner-occupied" sublabel="This is my main place of residence"/>
        <RadioCard x={INNER_X} y={264} w={CARD_W} label="Rental property" sublabel="I rent this property to others"/>
        <RadioCard x={INNER_X} y={322} w={CARD_W} label="Holiday home" sublabel="Used as a holiday or investment home"/>

        {/* Yes/No question */}
        <text x={INNER_X} y={394} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="600" fill={C.dark}>Is this building under construction or renovation?</text>
        <rect x={INNER_X} y={404} width={292} height={44} rx={6} fill={C.white} stroke={C.border} strokeWidth={1}/>
        <text x={INNER_X+146} y={430} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="500" fill={C.dark} textAnchor="middle">Yes</text>
        <rect x={INNER_X+298} y={404} width={300} height={44} rx={6} fill={C.white} stroke={C.border} strokeWidth={1}/>
        <text x={INNER_X+448} y={430} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="500" fill={C.dark} textAnchor="middle">No</text>

        <PinkCallout
          x={INNER_X} y={462} w={CARD_W}
          title="Important information"
          body="Properties under construction may have limited cover available."
          link="Learn more about cover during renovation →"
        />

        <GreyButton x={INNER_X + CARD_W - 160} y={558} label="Next →" w={160}/>

        <Footer y={626} width={W}/>
      </svg>
      <Caption/>
    </div>
  )
}

// ── 2. Form Validation Pattern Mockup ────────────────────────────────────────

export function FormValidationMockup() {
  const W = 900; const H = 580
  const STEP_W = 186
  const BAND_H = 80
  const HEADER_H = 52
  const CONTENT_Y = HEADER_H + BAND_H
  const INNER_X = STEP_W + 46
  const FIELD_W = 560

  const steps = [
    { label: 'General', label2: 'information', state: 'complete' },
    { label: 'Your home', state: 'active' },
    { label: 'Your contents', state: 'upcoming' },
    { label: 'Policy holders', state: 'upcoming' },
    { label: 'Your quote', state: 'upcoming' },
  ]

  return (
    <div style={{ border: '1px solid #DFE1E6', borderRadius: '8px', overflow: 'hidden', backgroundColor: C.pageBg }}>
      <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
        <rect width={W} height={H} fill={C.pageBg}/>

        <HeaderBar title="Home Insurance Quote" y={0} width={W}/>

        {/* Smaller yellow band */}
        <rect x={0} y={HEADER_H} width={W} height={BAND_H} fill={C.yellow}/>
        <text x={W/2} y={HEADER_H+22} fontFamily="Arial,sans-serif" fontSize="11" fill={C.dark} textAnchor="middle">Step 2 of 5</text>
        <text x={W/2} y={HEADER_H+52} fontFamily="Arial,sans-serif" fontSize="20" fontWeight="700" fill={C.dark} textAnchor="middle">Your home</text>

        <Stepper steps={steps} topY={CONTENT_Y} width={STEP_W}/>

        {/* Content area */}
        <rect x={STEP_W} y={CONTENT_Y} width={W - STEP_W} height={H - CONTENT_Y - 32} fill={C.white}/>

        <SectionHeading x={INNER_X} y={160} label="Home details" lineEnd={INNER_X + FIELD_W}/>

        {/* Valid field */}
        <text x={INNER_X} y={184} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="600" fill={C.dark}>Year built *</text>
        <rect x={INNER_X} y={192} width={FIELD_W} height={44} rx={6} fill={C.white} stroke={C.teal} strokeWidth={2}/>
        <text x={INNER_X+14} y={218} fontFamily="Arial,sans-serif" fontSize="13" fill={C.dark}>1987</text>
        {/* Green checkmark circle */}
        <circle cx={INNER_X + FIELD_W - 20} cy={214} r={11} fill={C.green}/>
        <text x={INNER_X + FIELD_W - 20} y={219} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill={C.white} textAnchor="middle">✓</text>
        {/* Success hint */}
        <text x={INNER_X} y={248} fontFamily="Arial,sans-serif" fontSize="11" fill={C.green}>Looks good</text>

        {/* Error field */}
        <text x={INNER_X} y={270} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="600" fill={C.dark}>Sum insured *</text>
        <rect x={INNER_X} y={278} width={FIELD_W} height={44} rx={6} fill={C.redLight} stroke={C.red} strokeWidth={2}/>
        <text x={INNER_X+14} y={304} fontFamily="Arial,sans-serif" fontSize="13" fill={C.dark}>$350</text>
        {/* Error icon */}
        <circle cx={INNER_X + FIELD_W - 20} cy={300} r={11} fill={C.red}/>
        <text x={INNER_X + FIELD_W - 20} y={305} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill={C.white} textAnchor="middle">✕</text>
        {/* Error message */}
        <text x={INNER_X} y={334} fontFamily="Arial,sans-serif" fontSize="11" fill={C.red}>Enter a sum insured amount between $50,000 and $2,000,000</text>

        {/* Unselected radio card */}
        <text x={INNER_X} y={360} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="600" fill={C.dark}>Building type</text>
        <RadioCard x={INNER_X} y={368} w={FIELD_W} selected={false} label="Freestanding house" sublabel="Single residential dwelling on its own land"/>

        {/* Helper text example */}
        <text x={INNER_X} y={444} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="600" fill={C.dark}>
          What sum insured do I need?
        </text>
        <rect x={INNER_X} y={452} width={FIELD_W} height={52} rx={6} fill={C.infoBlue} stroke={C.infoBlueBdr} strokeWidth={1}/>
        <circle cx={INNER_X+22} cy={478} r={11} fill={C.infoBlueText}/>
        <text x={INNER_X+22} y={483} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill={C.white} textAnchor="middle">i</text>
        <text x={INNER_X+44} y={470} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="600" fill={C.infoBlueText}>Helper text</text>
        <text x={INNER_X+44} y={485} fontFamily="Arial,sans-serif" fontSize="11" fill={C.infoBlueText}>The sum insured should cover full rebuilding cost, not market value.</text>

        <GreyButton x={INNER_X + FIELD_W - 160} y={524} label="Next →" w={160}/>

        <Footer y={548} width={W}/>
      </svg>
      <Caption/>
    </div>
  )
}

// ── 3. Disclosure / Legal Pattern Mockup ─────────────────────────────────────

export function DisclosureLegalMockup() {
  const W = 900; const H = 720
  const STEP_W = 186
  const BAND_H = 96
  const HEADER_H = 52
  const CONTENT_Y = HEADER_H + BAND_H
  const INNER_X = STEP_W + 46
  const CARD_W = 598

  const steps = [
    { label: 'Your car', state: 'active' },
    { label: 'About you', state: 'upcoming' },
    { label: 'Your cover', state: 'upcoming' },
    { label: 'Your quote', state: 'upcoming' },
  ]

  return (
    <div style={{ border: '1px solid #DFE1E6', borderRadius: '8px', overflow: 'hidden', backgroundColor: C.pageBg }}>
      <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
        <rect width={W} height={H} fill={C.pageBg}/>

        <HeaderBar title="Car Insurance Quote" y={0} width={W}/>
        <YellowBand step={1} stepTotal={4} heading="Your car" y={HEADER_H} width={W} height={BAND_H}/>
        <Stepper steps={steps} topY={CONTENT_Y} width={STEP_W}/>

        {/* Content area */}
        <rect x={STEP_W} y={CONTENT_Y} width={W - STEP_W} height={H - CONTENT_Y - 32} fill={C.white}/>

        <SectionHeading x={INNER_X} y={172} label="Start your quote" lineEnd={INNER_X + CARD_W}/>

        {/* Info callout: Log in to save time */}
        <rect x={INNER_X} y={182} width={CARD_W} height={52} rx={6} fill={C.infoBlue} stroke={C.infoBlueBdr} strokeWidth={1}/>
        <circle cx={INNER_X+20} cy={208} r={11} fill={C.infoBlueText}/>
        <text x={INNER_X+20} y={213} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill={C.white} textAnchor="middle">i</text>
        <text x={INNER_X+40} y={202} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill={C.infoBlueText}>Log in to save time</text>
        <text x={INNER_X+40} y={217} fontFamily="Arial,sans-serif" fontSize="11" fill={C.infoBlueText}>As an RAA member, your details will be pre-filled. <tspan textDecoration="underline">Log in now</tspan></text>

        {/* Accordion: Duty of disclosure - EXPANDED */}
        <rect x={INNER_X} y={242} width={CARD_W} height={32} rx={0} fill={C.sidebarBg} stroke={C.border} strokeWidth={1}/>
        <text x={INNER_X+14} y={262} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill={C.dark}>Duty of disclosure</text>
        <text x={INNER_X + CARD_W - 14} y={262} fontFamily="Arial,sans-serif" fontSize="14" fill={C.grey} textAnchor="end">▲</text>

        {/* Expanded body */}
        <rect x={INNER_X} y={274} width={CARD_W} height={72} fill={C.white} stroke={C.border} strokeWidth={1} strokeTop="none"/>
        <line x1={INNER_X} y1={274} x2={INNER_X+CARD_W} y2={274} stroke="none"/>
        <text x={INNER_X+14} y={292} fontFamily="Arial,sans-serif" fontSize="11" fill={C.dark}>Before you enter into this insurance contract, you have a duty to tell us anything you know, or could</text>
        <text x={INNER_X+14} y={307} fontFamily="Arial,sans-serif" fontSize="11" fill={C.dark}>reasonably be expected to know, that may affect our decision to insure you and on what terms.</text>
        <text x={INNER_X+14} y={322} fontFamily="Arial,sans-serif" fontSize="11" fill={C.dark}>You have this duty until we agree to insure you. <tspan fill={C.teal} textDecoration="underline">Read more about your disclosure obligations</tspan></text>
        <line x1={INNER_X} y1={346} x2={INNER_X+CARD_W} y2={346} stroke={C.border} strokeWidth={1}/>

        {/* Accordion: Privacy Notice - COLLAPSED */}
        <rect x={INNER_X} y={346} width={CARD_W} height={32} rx={0} fill={C.sidebarBg} stroke={C.border} strokeWidth={1}/>
        <text x={INNER_X+14} y={366} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill={C.dark}>Privacy Notice</text>
        <text x={INNER_X + CARD_W - 14} y={366} fontFamily="Arial,sans-serif" fontSize="14" fill={C.grey} textAnchor="end">▼</text>

        {/* Two checkbox cards */}
        <text x={INNER_X} y={400} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="600" fill={C.dark}>I acknowledge I have read and understood the above</text>

        {/* Checkbox card 1 - checked (teal) */}
        <rect x={INNER_X} y={410} width={CARD_W} height={42} rx={6} fill={C.tealLight} stroke={C.teal} strokeWidth={2}/>
        <rect x={INNER_X+14} y={423} width={16} height={16} rx={3} fill={C.teal}/>
        <text x={INNER_X+22} y={434} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill={C.white} textAnchor="middle">✓</text>
        <text x={INNER_X+40} y={435} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="500" fill={C.teal}>I agree to the Duty of Disclosure</text>

        {/* Checkbox card 2 - unchecked */}
        <rect x={INNER_X} y={460} width={CARD_W} height={42} rx={6} fill={C.white} stroke={C.border} strokeWidth={1}/>
        <rect x={INNER_X+14} y={473} width={16} height={16} rx={3} fill={C.white} stroke={C.greyLight} strokeWidth={1.5}/>
        <text x={INNER_X+40} y={485} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="500" fill={C.dark}>I agree to the Privacy Notice</text>

        {/* Registration section */}
        <SectionHeading x={INNER_X} y={520} label="Your vehicle registration" lineEnd={INNER_X + CARD_W}/>

        {/* State dropdown + rego input */}
        <rect x={INNER_X} y={530} width={100} height={40} rx={6} fill={C.white} stroke={C.border} strokeWidth={1}/>
        <text x={INNER_X+14} y={554} fontFamily="Arial,sans-serif" fontSize="12" fill={C.dark}>SA ▼</text>

        <rect x={INNER_X+108} y={530} width={240} height={40} rx={6} fill={C.white} stroke={C.border} strokeWidth={1}/>
        <text x={INNER_X+122} y={554} fontFamily="Arial,sans-serif" fontSize="14" fontWeight="600" fill={C.dark} letterSpacing="4">ABC 123</text>

        {/* Find my car / Don't know */}
        <YellowButton x={INNER_X+356} y={530} label="Find my car" w={136} h={40}/>
        <rect x={INNER_X+500} y={530} width={96} height={40} rx={8} fill={C.white} stroke={C.border} strokeWidth={1}/>
        <text x={INNER_X+548} y={554} fontFamily="Arial,sans-serif" fontSize="12" fill={C.grey} textAnchor="middle">Don't know</text>

        {/* Vehicle confirmation card */}
        <rect x={INNER_X} y={584} width={CARD_W} height={52} rx={6} fill={C.tealLight} stroke={C.teal} strokeWidth={1.5}/>
        <rect x={INNER_X+14} y={598} width={24} height={18} rx={2} fill={C.teal}/>
        <text x={INNER_X+49} y={606} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill={C.dark}>2019 Volkswagen Golf 110TSI Comfortline</text>
        <text x={INNER_X+49} y={622} fontFamily="Arial,sans-serif" fontSize="11" fill={C.grey}>Petrol · Automatic · Hatchback  —  <tspan fill={C.teal} textDecoration="underline">Not your car?</tspan></text>

        <Footer y={688} width={W}/>
      </svg>
      <Caption/>
    </div>
  )
}

// ── 4. Radio Selection Pattern Mockup ────────────────────────────────────────

export function RadioSelectionMockup() {
  const W = 900; const H = 500
  const PAD = 48
  const CARD_W = 380
  const CARD_H = 68

  return (
    <div style={{ border: '1px solid #DFE1E6', borderRadius: '8px', overflow: 'hidden', backgroundColor: C.white }}>
      <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
        <rect width={W} height={H} fill={C.white}/>

        {/* Heading */}
        <text x={PAD} y={40} fontFamily="Arial,sans-serif" fontSize="16" fontWeight="700" fill={C.dark}>Radio Card States</text>
        <line x1={PAD} y1={50} x2={W-PAD} y2={50} stroke={C.border} strokeWidth={1}/>

        {/* State labels row */}
        <text x={PAD+CARD_W/2} y={74} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="600" fill={C.grey} textAnchor="middle">DEFAULT</text>
        <text x={PAD+CARD_W+20+CARD_W/2} y={74} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="600" fill={C.grey} textAnchor="middle">SELECTED</text>

        {/* Default card */}
        <rect x={PAD} y={82} width={CARD_W} height={CARD_H} rx={6} fill={C.white} stroke={C.border} strokeWidth={1}/>
        <circle cx={PAD+24} cy={82+CARD_H/2} r={10} fill="none" stroke={C.greyLight} strokeWidth={1.5}/>
        <text x={PAD+44} y={82+CARD_H/2-4} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="500" fill={C.dark}>Standard option</text>
        <text x={PAD+44} y={82+CARD_H/2+11} fontFamily="Arial,sans-serif" fontSize="11" fill={C.grey}>Not yet selected by user</text>

        {/* Selected card */}
        <rect x={PAD+CARD_W+20} y={82} width={CARD_W} height={CARD_H} rx={6} fill={C.tealLight} stroke={C.teal} strokeWidth={2}/>
        <circle cx={PAD+CARD_W+20+24} cy={82+CARD_H/2} r={10} fill={C.teal}/>
        <circle cx={PAD+CARD_W+20+24} cy={82+CARD_H/2} r={4} fill={C.white}/>
        <text x={PAD+CARD_W+20+44} y={82+CARD_H/2-4} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="600" fill={C.teal}>Standard option</text>
        <text x={PAD+CARD_W+20+44} y={82+CARD_H/2+11} fontFamily="Arial,sans-serif" fontSize="11" fill={C.grey}>User has selected this option</text>

        {/* Second row labels */}
        <text x={PAD+CARD_W/2} y={178} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="600" fill={C.grey} textAnchor="middle">HOVER</text>
        <text x={PAD+CARD_W+20+CARD_W/2} y={178} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="600" fill={C.grey} textAnchor="middle">DISABLED</text>

        {/* Hover card */}
        <rect x={PAD} y={186} width={CARD_W} height={CARD_H} rx={6} fill={C.white} stroke="#9CA3AF" strokeWidth={1.5}/>
        <rect x={PAD-1} y={185} width={CARD_W+2} height={CARD_H+2} rx={7} fill="none" stroke="#9CA3AF" strokeWidth={0.5} opacity={0.4}/>
        <circle cx={PAD+24} cy={186+CARD_H/2} r={10} fill="none" stroke="#9CA3AF" strokeWidth={1.5}/>
        <circle cx={PAD+24} cy={186+CARD_H/2} r={5} fill="#F3F4F6"/>
        <text x={PAD+44} y={186+CARD_H/2-4} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="500" fill={C.dark}>Standard option</text>
        <text x={PAD+44} y={186+CARD_H/2+11} fontFamily="Arial,sans-serif" fontSize="11" fill={C.grey}>Cursor hovering — ready to select</text>

        {/* Disabled card */}
        <rect x={PAD+CARD_W+20} y={186} width={CARD_W} height={CARD_H} rx={6} fill="#F3F4F6" stroke={C.border} strokeWidth={1}/>
        <circle cx={PAD+CARD_W+20+24} cy={186+CARD_H/2} r={10} fill="none" stroke="#D1D5DB" strokeWidth={1.5}/>
        <text x={PAD+CARD_W+20+44} y={186+CARD_H/2-4} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="500" fill={C.greyLight}>Standard option</text>
        <text x={PAD+CARD_W+20+44} y={186+CARD_H/2+11} fontFamily="Arial,sans-serif" fontSize="11" fill="#D1D5DB">Not available for selection</text>

        {/* Yes / No variant section */}
        <text x={PAD} y={288} fontFamily="Arial,sans-serif" fontSize="16" fontWeight="700" fill={C.dark}>Yes / No Button Pair Variant</text>
        <line x1={PAD} y1={298} x2={W-PAD} y2={298} stroke={C.border} strokeWidth={1}/>

        <text x={PAD} y={322} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="600" fill={C.dark}>Has the vehicle been modified from factory specifications?</text>

        {/* Yes (unselected) */}
        <rect x={PAD} y={334} width={382} height={52} rx={6} fill={C.white} stroke={C.border} strokeWidth={1}/>
        <circle cx={PAD+24} cy={334+26} r={10} fill="none" stroke={C.greyLight} strokeWidth={1.5}/>
        <text x={PAD+44} y={334+30} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="500" fill={C.dark}>Yes</text>

        {/* No (selected) */}
        <rect x={PAD+398} y={334} width={382} height={52} rx={6} fill={C.tealLight} stroke={C.teal} strokeWidth={2}/>
        <circle cx={PAD+398+24} cy={334+26} r={10} fill={C.teal}/>
        <circle cx={PAD+398+24} cy={334+26} r={4} fill={C.white}/>
        <text x={PAD+398+44} y={334+30} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="600" fill={C.teal}>No</text>

        {/* Rule note */}
        <text x={PAD} y={412} fontFamily="Arial,sans-serif" fontSize="11" fill={C.grey}>Yes/No buttons use the same card style but at half-width, presented side-by-side. Never pre-select.</text>
        <text x={PAD} y={428} fontFamily="Arial,sans-serif" fontSize="11" fill={C.grey}>The selected state mirrors the standard radio card: teal background (#E6F4F2), teal border, filled radio dot.</text>

        {/* Color tokens */}
        <text x={PAD} y={460} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="600" fill={C.dark}>Colour tokens — </text>
        <rect x={PAD+108} y={449} width={12} height={12} rx={2} fill={C.teal}/>
        <text x={PAD+124} y={460} fontFamily="Arial,sans-serif" fontSize="11" fill={C.grey}>#00857A selected border  </text>
        <rect x={PAD+280} y={449} width={12} height={12} rx={2} fill={C.tealLight}/>
        <text x={PAD+296} y={460} fontFamily="Arial,sans-serif" fontSize="11" fill={C.grey}>#E6F4F2 selected bg  </text>
        <rect x={PAD+450} y={449} width={12} height={12} rx={2} fill={C.border}/>
        <text x={PAD+466} y={460} fontFamily="Arial,sans-serif" fontSize="11" fill={C.grey}>#E5E7EB default border</text>
      </svg>
      <Caption/>
    </div>
  )
}

// ── 5. Quote to Buy Template Mockup ──────────────────────────────────────────

export function QuoteToBuyTemplateMockup() {
  const W = 900; const H = 700
  const LAYOUT_W = 760
  const STEP_W = 160
  const CONTENT_X = STEP_W
  const BAND_H = 84
  const HEADER_H = 48

  return (
    <div style={{ border: '1px solid #DFE1E6', borderRadius: '8px', overflow: 'hidden', backgroundColor: C.pageBg }}>
      <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
        <rect width={W} height={H} fill={C.pageBg}/>

        {/* ---- Main layout area (0 to LAYOUT_W) ---- */}

        {/* Header bar */}
        <rect x={0} y={0} width={LAYOUT_W} height={HEADER_H} fill={C.white}/>
        <line x1={0} y1={HEADER_H} x2={LAYOUT_W} y2={HEADER_H} stroke={C.border} strokeWidth={1}/>
        <RAALogo x={18} cy={HEADER_H/2}/>
        <text x={90} y={HEADER_H/2+4} fontFamily="Arial,sans-serif" fontSize="11" fill="#374151">Home Insurance Quote</text>
        <text x={LAYOUT_W-14} y={HEADER_H/2+4} fontFamily="Arial,sans-serif" fontSize="10" fill={C.teal} textAnchor="end">Need help ›</text>

        {/* Yellow progress band */}
        <rect x={0} y={HEADER_H} width={LAYOUT_W} height={BAND_H} fill={C.yellow}/>
        <text x={LAYOUT_W/2} y={HEADER_H+22} fontFamily="Arial,sans-serif" fontSize="10" fill={C.dark} textAnchor="middle">Step 2 of 5</text>
        <text x={LAYOUT_W/2} y={HEADER_H+50} fontFamily="Arial,sans-serif" fontSize="18" fontWeight="700" fill={C.dark} textAnchor="middle">Your home</text>

        {/* Stepper sidebar */}
        <rect x={0} y={HEADER_H+BAND_H} width={STEP_W} height={H-HEADER_H-BAND_H-40} fill={C.sidebarBg}/>
        <line x1={STEP_W} y1={HEADER_H+BAND_H} x2={STEP_W} y2={H-40} stroke={C.border} strokeWidth={1}/>
        {[
          {label:'General info', state:'complete', y: HEADER_H+BAND_H+36},
          {label:'Your home', state:'active', y: HEADER_H+BAND_H+96},
          {label:'Your contents', state:'upcoming', y: HEADER_H+BAND_H+156},
          {label:'Policy holders', state:'upcoming', y: HEADER_H+BAND_H+216},
          {label:'Your quote', state:'upcoming', y: HEADER_H+BAND_H+276},
        ].map((step, i, arr) => {
          const cx = STEP_W/2 - 18
          const isLast = i === arr.length-1
          return (
            <g key={i}>
              {!isLast && <line x1={cx} y1={step.y+13} x2={cx} y2={step.y+48} stroke={C.border} strokeWidth={2}/>}
              <StepCircle cx={cx} cy={step.y} num={i+1} state={step.state}/>
              <text x={cx+22} y={step.y+4} fontFamily="Arial,sans-serif" fontSize="10" fontWeight={step.state==='active'?'600':'400'} fill={step.state==='upcoming'?C.greyLight:C.dark}>{step.label}</text>
            </g>
          )
        })}

        {/* Content area */}
        <rect x={STEP_W} y={HEADER_H+BAND_H} width={LAYOUT_W-STEP_W} height={H-HEADER_H-BAND_H-40} fill={C.white}/>
        {/* Form content placeholder lines */}
        {[0,1,2,3,4].map(i => (
          <g key={i}>
            <rect x={STEP_W+28} y={HEADER_H+BAND_H+28+i*64} width={280} height={10} rx={4} fill="#F3F4F6"/>
            <rect x={STEP_W+28} y={HEADER_H+BAND_H+46+i*64} width={440} height={32} rx={6} fill={C.white} stroke={C.border} strokeWidth={1}/>
          </g>
        ))}
        {/* Next button */}
        <rect x={LAYOUT_W-148} y={H-100} width={130} height={38} rx={6} fill={C.yellow}/>
        <text x={LAYOUT_W-83} y={H-76} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="600" fill={C.dark} textAnchor="middle">Next →</text>

        {/* Footer */}
        <rect x={0} y={H-40} width={LAYOUT_W} height={40} fill={C.sidebarBg}/>
        <line x1={0} y1={H-40} x2={LAYOUT_W} y2={H-40} stroke={C.border} strokeWidth={1}/>
        <text x={LAYOUT_W/2} y={H-17} fontFamily="Arial,sans-serif" fontSize="9" fill={C.greyLight} textAnchor="middle">Privacy Policy  ·  Terms and Conditions  ·  © 2026 RAA Insurance</text>

        {/* ---- Annotation area (LAYOUT_W to W) ---- */}
        <rect x={LAYOUT_W} y={0} width={W-LAYOUT_W} height={H} fill="#F1F5F9"/>
        <line x1={LAYOUT_W} y1={0} x2={LAYOUT_W} y2={H} stroke="#CBD5E1" strokeWidth={1}/>

        {/* Annotation labels + dashed connector lines */}
        {/* Progress header */}
        <line x1={LAYOUT_W/2} y1={HEADER_H + BAND_H/2} x2={LAYOUT_W} y2={HEADER_H + BAND_H/2} stroke="#94A3B8" strokeWidth={1} strokeDasharray="3,2"/>
        <rect x={LAYOUT_W+4} y={HEADER_H + BAND_H/2 - 10} width={130} height={20} rx={3} fill="#1E293B"/>
        <text x={LAYOUT_W+12} y={HEADER_H + BAND_H/2 + 4} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="600" fill={C.white}>Progress header</text>

        {/* Stepper navigation */}
        <line x1={STEP_W/2} y1={HEADER_H+BAND_H+180} x2={LAYOUT_W} y2={HEADER_H+BAND_H+180} stroke="#94A3B8" strokeWidth={1} strokeDasharray="3,2"/>
        <rect x={LAYOUT_W+4} y={HEADER_H+BAND_H+170} width={130} height={20} rx={3} fill="#1E293B"/>
        <text x={LAYOUT_W+12} y={HEADER_H+BAND_H+184} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="600" fill={C.white}>Stepper navigation</text>

        {/* Content area */}
        <line x1={(STEP_W+LAYOUT_W)/2} y1={HEADER_H+BAND_H+280} x2={LAYOUT_W} y2={HEADER_H+BAND_H+280} stroke="#94A3B8" strokeWidth={1} strokeDasharray="3,2"/>
        <rect x={LAYOUT_W+4} y={HEADER_H+BAND_H+270} width={130} height={20} rx={3} fill="#1E293B"/>
        <text x={LAYOUT_W+12} y={HEADER_H+BAND_H+284} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="600" fill={C.white}>Content area</text>

        {/* Footer */}
        <line x1={LAYOUT_W/2} y1={H-20} x2={LAYOUT_W} y2={H-20} stroke="#94A3B8" strokeWidth={1} strokeDasharray="3,2"/>
        <rect x={LAYOUT_W+4} y={H-30} width={130} height={20} rx={3} fill="#1E293B"/>
        <text x={LAYOUT_W+12} y={H-16} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="600" fill={C.white}>Footer</text>

        {/* Usage note */}
        <text x={LAYOUT_W+8} y={H/2+60} fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" fontStyle="italic">Used across:</text>
        <text x={LAYOUT_W+8} y={H/2+74} fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" fontStyle="italic">Quote to Buy</text>
        <text x={LAYOUT_W+8} y={H/2+88} fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" fontStyle="italic">Renewals</text>
        <text x={LAYOUT_W+8} y={H/2+102} fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" fontStyle="italic">Claims</text>
      </svg>
      <Caption/>
    </div>
  )
}

// ── 6. My Account Template Mockup ────────────────────────────────────────────

export function MyAccountTemplateMockup() {
  const W = 900; const H = 700
  const LAYOUT_W = 760
  const SIDEBAR_W = 190
  const HEADER_H = 52
  const CONTENT_X = SIDEBAR_W

  return (
    <div style={{ border: '1px solid #DFE1E6', borderRadius: '8px', overflow: 'hidden', backgroundColor: C.pageBg }}>
      <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
        <rect width={W} height={H} fill={C.pageBg}/>

        {/* ---- Header bar ---- */}
        <rect x={0} y={0} width={LAYOUT_W} height={HEADER_H} fill={C.white}/>
        <line x1={0} y1={HEADER_H} x2={LAYOUT_W} y2={HEADER_H} stroke={C.border} strokeWidth={1}/>
        <RAALogo x={18} cy={HEADER_H/2}/>
        <text x={90} y={HEADER_H/2+4} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="600" fill={C.dark}>My Account</text>
        <text x={LAYOUT_W-130} y={HEADER_H/2+4} fontFamily="Arial,sans-serif" fontSize="11" fill={C.teal}>Need help</text>
        <rect x={LAYOUT_W-72} y={HEADER_H/2-12} width={58} height={24} rx={4} fill={C.border}/>
        <text x={LAYOUT_W-43} y={HEADER_H/2+4} fontFamily="Arial,sans-serif" fontSize="11" fill={C.grey} textAnchor="middle">Log out</text>

        {/* ---- Sidebar ---- */}
        <rect x={0} y={HEADER_H} width={SIDEBAR_W} height={H-HEADER_H} fill={C.white}/>
        <line x1={SIDEBAR_W} y1={HEADER_H} x2={SIDEBAR_W} y2={H} stroke={C.border} strokeWidth={1}/>

        {/* Nav items */}
        {[
          {label:'My Account home', y: HEADER_H+20, active:false},
          {label:'My details', y: HEADER_H+52, active:false, expanded:true},
          {label:'Personal details', y: HEADER_H+74, sub:true, active:true},
          {label:'Payment details', y: HEADER_H+94, sub:true},
          {label:'Communication prefs', y: HEADER_H+114, sub:true},
          {label:'Change password', y: HEADER_H+134, sub:true},
          {label:'My products', y: HEADER_H+162},
          {label:'My claims', y: HEADER_H+184},
          {label:'My member benefits', y: HEADER_H+206},
        ].map((item, i) => (
          <g key={i}>
            {item.active && <rect x={0} y={item.y-4} width={3} height={18} fill={C.yellow}/>}
            {item.active && <rect x={0} y={item.y-4} width={SIDEBAR_W} height={18} fill="#FFFDE7" opacity={0.6}/>}
            <text
              x={item.sub ? 24 : 14}
              y={item.y+9}
              fontFamily="Arial,sans-serif"
              fontSize={item.sub ? 10 : 11}
              fontWeight={item.active ? '600' : '400'}
              fill={item.active ? C.dark : item.sub ? C.grey : C.dark}
            >{item.label}</text>
            {item.expanded && (
              <text x={SIDEBAR_W-16} y={item.y+9} fontFamily="Arial,sans-serif" fontSize="10" fill={C.grey} textAnchor="end">▼</text>
            )}
          </g>
        ))}

        {/* ---- Content area ---- */}
        <rect x={CONTENT_X} y={HEADER_H} width={LAYOUT_W-CONTENT_X} height={H-HEADER_H} fill="#F8F9FA"/>

        {/* Hi greeting */}
        <text x={CONTENT_X+24} y={HEADER_H+40} fontFamily="Arial,sans-serif" fontSize="20" fontWeight="700" fill={C.dark}>Hi Sarah,</text>
        <text x={CONTENT_X+24} y={HEADER_H+58} fontFamily="Arial,sans-serif" fontSize="12" fill={C.grey}>Welcome to your RAA Account</text>

        {/* Quick actions: 2-column grid */}
        <text x={CONTENT_X+24} y={HEADER_H+86} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill={C.dark}>Quick actions</text>
        {[
          {label:'Update details', sub:'Change your contact info', x:CONTENT_X+24, y:HEADER_H+96},
          {label:'Make a claim', sub:'Lodge a new insurance claim', x:CONTENT_X+24+((LAYOUT_W-CONTENT_X-48)/2)+8, y:HEADER_H+96},
          {label:'Change payment', sub:'Update billing or frequency', x:CONTENT_X+24, y:HEADER_H+96+74},
          {label:'View documents', sub:'Download your policy docs', x:CONTENT_X+24+((LAYOUT_W-CONTENT_X-48)/2)+8, y:HEADER_H+96+74},
        ].map((card, i) => {
          const cw = (LAYOUT_W-CONTENT_X-48)/2
          return (
            <g key={i}>
              <rect x={card.x} y={card.y} width={cw} height={66} rx={6} fill={C.white} stroke={C.border} strokeWidth={1}/>
              <text x={card.x+14} y={card.y+22} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill={C.dark}>{card.label}</text>
              <text x={card.x+14} y={card.y+38} fontFamily="Arial,sans-serif" fontSize="10" fill={C.grey}>{card.sub}</text>
            </g>
          )
        })}

        {/* Member card */}
        <text x={CONTENT_X+24} y={HEADER_H+258} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill={C.dark}>Member summary</text>
        <rect x={CONTENT_X+24} y={HEADER_H+268} width={LAYOUT_W-CONTENT_X-48} height={72} rx={6} fill={C.white} stroke={C.border} strokeWidth={1}/>
        <rect x={CONTENT_X+24} y={HEADER_H+268} width={4} height={72} rx={2} fill={C.yellow}/>
        <text x={CONTENT_X+40} y={HEADER_H+290} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill={C.dark}>Sarah Thompson</text>
        <text x={CONTENT_X+40} y={HEADER_H+308} fontFamily="Arial,sans-serif" fontSize="11" fill={C.grey}>Member #  ██████  ·  Since 2014  ·  Savings: $142.00</text>
        <rect x={LAYOUT_W-114} y={HEADER_H+288} width={80} height={28} rx={4} fill={C.border}/>
        <text x={LAYOUT_W-74} y={HEADER_H+306} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="600" fill={C.grey} textAnchor="middle">Show Card</text>

        {/* Products list */}
        <text x={CONTENT_X+24} y={HEADER_H+360} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill={C.dark}>My products</text>
        {[
          {name:'Home Insurance', desc:'Contents + Building', num:'HIN-20241204-0012', y:0},
          {name:'Car Insurance', desc:'RAA Comprehensive', num:'CIN-20240601-0841', y:62},
        ].map((prod, i) => (
          <g key={i}>
            <rect x={CONTENT_X+24} y={HEADER_H+370+prod.y} width={LAYOUT_W-CONTENT_X-48} height={54} rx={6} fill={C.white} stroke={C.border} strokeWidth={1}/>
            <rect x={CONTENT_X+24} y={HEADER_H+370+prod.y} width={44} height={54} rx={6} fill={C.sidebarBg}/>
            <text x={CONTENT_X+46} y={HEADER_H+402+prod.y} fontFamily="Arial,sans-serif" fontSize="16" fill={C.teal} textAnchor="middle">🏠</text>
            <text x={CONTENT_X+80} y={HEADER_H+388+prod.y} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill={C.dark}>{prod.name}</text>
            <text x={CONTENT_X+80} y={HEADER_H+403+prod.y} fontFamily="Arial,sans-serif" fontSize="10" fill={C.grey}>{prod.desc}  ·  {prod.num}</text>
            <rect x={LAYOUT_W-104} y={HEADER_H+380+prod.y} width={70} height={26} rx={4} fill={C.yellow}/>
            <text x={LAYOUT_W-69} y={HEADER_H+396+prod.y} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="600" fill={C.dark} textAnchor="middle">View details</text>
          </g>
        ))}

        {/* ---- Annotation area ---- */}
        <rect x={LAYOUT_W} y={0} width={W-LAYOUT_W} height={H} fill="#F1F5F9"/>
        <line x1={LAYOUT_W} y1={0} x2={LAYOUT_W} y2={H} stroke="#CBD5E1" strokeWidth={1}/>

        {[
          {label:'Top navigation', fromY: HEADER_H/2},
          {label:'Sidebar navigation', fromY: HEADER_H+130},
          {label:'Quick actions', fromY: HEADER_H+130},
          {label:'Member summary', fromY: HEADER_H+304},
          {label:'Products list', fromY: HEADER_H+397},
        ].map((ann, i) => {
          const annotY = 30 + i * 120
          return (
            <g key={i}>
              <line x1={LAYOUT_W} y1={ann.fromY} x2={LAYOUT_W+8} y2={annotY} stroke="#94A3B8" strokeWidth={1} strokeDasharray="3,2"/>
              <rect x={LAYOUT_W+8} y={annotY-10} width={Math.min(ann.label.length*6.4+16, 128)} height={20} rx={3} fill="#1E293B"/>
              <text x={LAYOUT_W+16} y={annotY+4} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="600" fill={C.white}>{ann.label}</text>
            </g>
          )
        })}
      </svg>
      <Caption/>
    </div>
  )
}

// ── 7. RAA Website Template Mockup ───────────────────────────────────────────

export function RAAWebsiteTemplateMockup() {
  const W = 900; const H = 700
  const LAYOUT_W = 760
  const NAV_H = 56
  const HERO_H = 160
  const SUBNAV_H = 44
  const CARDS_Y = NAV_H + HERO_H + SUBNAV_H

  return (
    <div style={{ border: '1px solid #DFE1E6', borderRadius: '8px', overflow: 'hidden', backgroundColor: C.pageBg }}>
      <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
        <rect width={W} height={H} fill={C.pageBg}/>

        {/* ---- Main layout area (0 to LAYOUT_W) ---- */}

        {/* Primary navigation */}
        <rect x={0} y={0} width={LAYOUT_W} height={NAV_H} fill={C.white}/>
        <line x1={0} y1={NAV_H} x2={LAYOUT_W} y2={NAV_H} stroke={C.border} strokeWidth={1}/>
        <RAALogo x={20} cy={NAV_H/2}/>
        {['Membership','Motor','Home','Travel'].map((link, i) => (
          <text key={i} x={110+i*68} y={NAV_H/2+5} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="500" fill={C.dark}>{link}</text>
        ))}
        <text x={LAYOUT_W-16} y={NAV_H/2+5} fontFamily="Arial,sans-serif" fontSize="11" fill={C.teal} textAnchor="end">Contact Us  ⚙</text>

        {/* Hero image area */}
        <rect x={0} y={NAV_H} width={LAYOUT_W} height={HERO_H} fill="#374151"/>
        {/* Hero image texture */}
        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(i => (
          <rect key={i} x={(i%8)*95} y={NAV_H+(Math.floor(i/8)*80)} width={95} height={80} fill={`hsl(${210+i*3},20%,${20+i*2}%)`} opacity={0.6}/>
        ))}
        {/* Dark overlay */}
        <rect x={0} y={NAV_H} width={LAYOUT_W} height={HERO_H} fill="rgba(0,0,0,0.45)"/>
        <text x={LAYOUT_W/2} y={NAV_H+60} fontFamily="Arial,sans-serif" fontSize="22" fontWeight="700" fill={C.white} textAnchor="middle">Protecting what matters most</text>
        <text x={LAYOUT_W/2} y={NAV_H+86} fontFamily="Arial,sans-serif" fontSize="13" fill="rgba(255,255,255,0.85)" textAnchor="middle">Insurance, motoring and membership — all in one place</text>
        {/* Hero CTA */}
        <rect x={LAYOUT_W/2-60} y={NAV_H+104} width={120} height={34} rx={4} fill={C.yellow}/>
        <text x={LAYOUT_W/2} y={NAV_H+126} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill={C.dark} textAnchor="middle">Get a quote</text>

        {/* Black sub-nav bar */}
        <rect x={0} y={NAV_H+HERO_H} width={LAYOUT_W} height={SUBNAV_H} fill="#111827"/>
        {['Get insurance','Make a claim','Road Service','Renew or pay'].map((link, i) => (
          <g key={i}>
            {i > 0 && <line x1={i*(LAYOUT_W/4)} y1={NAV_H+HERO_H+8} x2={i*(LAYOUT_W/4)} y2={NAV_H+HERO_H+SUBNAV_H-8} stroke="#374151" strokeWidth={1}/>}
            <text x={i*(LAYOUT_W/4)+(LAYOUT_W/4)/2} y={NAV_H+HERO_H+SUBNAV_H/2+5} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="500" fill={C.white} textAnchor="middle">{link}</text>
          </g>
        ))}

        {/* Feature cards: 3 columns */}
        <text x={24} y={CARDS_Y+30} fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill={C.dark}>How we can help</text>
        {[
          {title:'Car Insurance', desc:'Compare and buy cover tailored to your vehicle and budget.'},
          {title:'Home Insurance', desc:'Protect your home and contents with flexible cover options.'},
          {title:'Road Service', desc:'24/7 emergency roadside assistance across South Australia.'},
        ].map((card, i) => {
          const cw = (LAYOUT_W - 48) / 3
          const cx = 24 + i*(cw+12)
          return (
            <g key={i}>
              <rect x={cx} y={CARDS_Y+44} width={cw} height={160} rx={6} fill={C.white} stroke={C.border} strokeWidth={1}/>
              <rect x={cx} y={CARDS_Y+44} width={cw} height={64} rx={6} fill="#F3F4F6"/>
              <rect x={cx} y={CARDS_Y+44+54} width={cw} height={10} fill="#F3F4F6"/>
              <text x={cx+cw/2} y={CARDS_Y+86} fontFamily="Arial,sans-serif" fontSize="22" fill={C.teal} textAnchor="middle">🛡</text>
              <text x={cx+14} y={CARDS_Y+126} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill={C.dark}>{card.title}</text>
              <text x={cx+14} y={CARDS_Y+142} fontFamily="Arial,sans-serif" fontSize="10" fill={C.grey}>{card.desc.substring(0,40)}</text>
              <text x={cx+14} y={CARDS_Y+156} fontFamily="Arial,sans-serif" fontSize="10" fill={C.grey}>{card.desc.substring(40)}</text>
              <rect x={cx+14} y={CARDS_Y+170} width={cw-28} height={26} rx={4} fill={C.yellow}/>
              <text x={cx+cw/2} y={CARDS_Y+187} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="600" fill={C.dark} textAnchor="middle">Learn more</text>
            </g>
          )
        })}

        {/* Stay updated section */}
        <rect x={0} y={CARDS_Y+216} width={LAYOUT_W} height={60} fill="#FFFDE7"/>
        <line x1={0} y1={CARDS_Y+216} x2={LAYOUT_W} y2={CARDS_Y+216} stroke="#FDE68A" strokeWidth={1}/>
        <text x={24} y={CARDS_Y+244} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill={C.dark}>Stay updated</text>
        <text x={24} y={CARDS_Y+260} fontFamily="Arial,sans-serif" fontSize="11" fill={C.grey}>Get RAA news, tips and member offers delivered to your inbox</text>
        <rect x={LAYOUT_W-148} y={CARDS_Y+226} width={130} height={34} rx={4} fill={C.yellow}/>
        <text x={LAYOUT_W-83} y={CARDS_Y+247} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="600" fill={C.dark} textAnchor="middle">Subscribe</text>

        {/* Yellow footer */}
        <rect x={0} y={CARDS_Y+280} width={LAYOUT_W} height={36} fill={C.yellow}/>
        <RAALogo x={20} cy={CARDS_Y+298}/>
        {['About RAA','Careers','Media','Sitemap'].map((link, i) => (
          <text key={i} x={100+i*74} y={CARDS_Y+302} fontFamily="Arial,sans-serif" fontSize="10" fill={C.dark}>{link}</text>
        ))}
        <text x={LAYOUT_W-14} y={CARDS_Y+302} fontFamily="Arial,sans-serif" fontSize="10" fill={C.dark} textAnchor="end">© 2026 RAA</text>

        {/* ---- Annotation area ---- */}
        <rect x={LAYOUT_W} y={0} width={W-LAYOUT_W} height={H} fill="#F1F5F9"/>
        <line x1={LAYOUT_W} y1={0} x2={LAYOUT_W} y2={H} stroke="#CBD5E1" strokeWidth={1}/>

        {[
          {label:'Primary navigation', fromY: NAV_H/2},
          {label:'Hero area', fromY: NAV_H+HERO_H/2},
          {label:'Quick links', fromY: NAV_H+HERO_H+SUBNAV_H/2},
          {label:'Feature cards', fromY: CARDS_Y+124},
        ].map((ann, i) => {
          const annotY = 40 + i * 130
          return (
            <g key={i}>
              <line x1={LAYOUT_W} y1={ann.fromY} x2={LAYOUT_W+8} y2={annotY} stroke="#94A3B8" strokeWidth={1} strokeDasharray="3,2"/>
              <rect x={LAYOUT_W+8} y={annotY-10} width={Math.min(ann.label.length*6.4+16, 128)} height={20} rx={3} fill="#1E293B"/>
              <text x={LAYOUT_W+16} y={annotY+4} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="600" fill={C.white}>{ann.label}</text>
            </g>
          )
        })}
      </svg>
      <Caption/>
    </div>
  )
}

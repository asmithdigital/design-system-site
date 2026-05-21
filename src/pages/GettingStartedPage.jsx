function Section({ id, title, children }) {
  return (
    <section id={id} style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#172B4D', marginBottom: 16, paddingTop: 8 }}>{title}</h2>
      {children}
    </section>
  )
}

function StepList({ steps }) {
  return (
    <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {steps.map((step, i) => (
        <li key={i} style={{ fontSize: 15, color: '#172B4D', lineHeight: 1.7 }}>{step}</li>
      ))}
    </ol>
  )
}

function RoleCard({ emoji, role, children }) {
  return (
    <div style={{
      border: '1px solid #DFE1E6',
      borderRadius: 8,
      padding: '24px',
      marginBottom: 28,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 24 }}>{emoji}</span>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: '#172B4D' }}>{role}</h3>
      </div>
      {children}
    </div>
  )
}

export default function GettingStartedPage() {
  return (
    <div>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: '#172B4D', marginBottom: 12, lineHeight: 1.2 }}>
        Getting Started
      </h1>
      <p style={{ fontSize: 16, color: '#6B778C', marginBottom: 48, lineHeight: 1.7 }}>
        Everything you need to start using Apiary — whether you're designing, building, or planning.
      </p>

      <RoleCard emoji="🎨" role="For Designers">
        <p style={{ fontSize: 15, color: '#42526E', lineHeight: 1.7, marginBottom: 16 }}>
          The design system lives in Figma as a shared component library. All components, tokens, and patterns are available to pull directly into your designs.
        </p>
        <StepList steps={[
          'Open the Apiary Figma library and enable it for your project file.',
          'Use the Assets panel to search for components by name — they match the names in this documentation.',
          'Follow the patterns documented here for consistency. If you\'re building a new step in Quote to Buy, start from the Quote Step Page template.',
          'When you create a new component variant, document it in this system and push the updated component back to the Figma library.',
          'Reference the Quote to Buy and My Account templates for new product work — these define the page layout rules before you even place a component.',
        ]} />
        <div style={{ marginTop: 20, padding: '14px 18px', background: '#EAF0FF', borderRadius: 6, fontSize: 14, color: '#0747A6', lineHeight: 1.6 }}>
          <strong>Tip:</strong> The Figma library uses the same naming convention as this documentation. If a component is called "Alert Banner" here, it's "Alert Banner" in Figma.
        </div>
      </RoleCard>

      <RoleCard emoji="💻" role="For Developers">
        <p style={{ fontSize: 15, color: '#42526E', lineHeight: 1.7, marginBottom: 16 }}>
          This documentation is your source of truth for component specifications, design tokens, and behaviour rules. Use it alongside the Figma designs.
        </p>
        <StepList steps={[
          'Find the component you need in the Components section. Each page documents properties, variants, and accessibility requirements.',
          'Check the Properties tab on any component page for exact values — border radius, colours, font sizes, spacing.',
          'Reference the Patterns section for implementation guidance on complex interactions like form validation and multi-step flows.',
          'Use the Changelog tab on component pages to see what\'s changed recently — particularly important before a release.',
          'Code snippets will be added as products are built. The Taskly components include basic React examples to illustrate the pattern.',
        ]} />
        <div style={{ marginTop: 20, padding: '14px 18px', background: '#E3FCEF', borderRadius: 6, fontSize: 14, color: '#006644', lineHeight: 1.6 }}>
          <strong>Token values:</strong> All design token values (colours, spacing, typography) are documented in the Tokens section and should be referenced rather than hard-coding values.
        </div>
      </RoleCard>

      <RoleCard emoji="📋" role="For Product Managers">
        <p style={{ fontSize: 15, color: '#42526E', lineHeight: 1.7, marginBottom: 16 }}>
          The design system helps you understand what can be self-served and what requires a designer or developer to create something new.
        </p>
        <StepList steps={[
          'Browse Patterns and Templates to understand what can be built without a new design — if an existing pattern covers your use case, reference it in your brief.',
          'If you\'re creating a new screen that follows an existing template (e.g. a new step in Quote to Buy), reference the template documentation directly in your story.',
          'Check the Products section to see which components and patterns apply to your product — this helps scope design and dev work accurately.',
          'Only engage design when there\'s a genuinely new pattern or component needed. If it fits an existing template, use it.',
          'For questions about whether something is truly new, check with the EXD team in #exd-design-research-updates.',
        ]} />
      </RoleCard>

      <Section id="contributing" title="Contributing">
        <p style={{ fontSize: 15, color: '#42526E', lineHeight: 1.7, marginBottom: 20 }}>
          The design system is a shared responsibility. Here's how updates flow from idea to documentation.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { step: '1', title: 'New components start in Figma', body: 'Build and validate the component in Figma first. Get sign-off from the design lead before documenting it here.' },
            { step: '2', title: 'Document in the design system', body: 'Add the component to components.json with full variants, properties, usage guidelines, and accessibility notes. Include a changelog entry.' },
            { step: '3', title: 'Changelogs track changes', body: 'Every update — added, changed, fixed, or removed — is tracked in the component\'s changelog array. This feeds the What\'s New page automatically.' },
            { step: '4', title: 'Share in Slack', body: 'Post updates in #exd-design-research-updates with a summary of what changed and why. Tag the relevant product teams.' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: '#0052CC',
                color: '#fff',
                fontSize: 13,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>{item.step}</div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#172B4D', marginBottom: 4 }}>{item.title}</p>
                <p style={{ fontSize: 14, color: '#42526E', lineHeight: 1.6 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

import { Link } from 'react-router-dom'
import componentsData from '../../data/components.json'
import patternsData from '../../data/patterns.json'
import templatesData from '../../data/templates.json'

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#172B4D', marginBottom: 16 }}>{title}</h2>
      {children}
    </section>
  )
}

export default function AboutPage() {
  return (
    <div>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: '#172B4D', marginBottom: 12, lineHeight: 1.2 }}>
        About the Design System
      </h1>
      <p style={{ fontSize: 16, color: '#6B778C', marginBottom: 48, lineHeight: 1.7 }}>
        A single source of truth for how digital products look, behave, and feel.
      </p>

      <Section title="What it is">
        <p style={{ fontSize: 15, color: '#42526E', lineHeight: 1.7, marginBottom: 16 }}>
          Apiary is a shared library of components, patterns, and guidelines that ensures consistency across all digital touchpoints. It covers everything from individual UI elements like buttons and inputs to full page templates for complex flows like Quote to Buy.
        </p>
        <p style={{ fontSize: 15, color: '#42526E', lineHeight: 1.7, marginBottom: 16 }}>
          Rather than each product team making independent design decisions, the design system provides a set of pre-validated, documented building blocks that work together. This means less design time spent on solved problems, fewer inconsistencies between products, and a faster path from idea to shipped feature.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          marginTop: 24,
        }}>
          {[
            { value: componentsData.components.length, label: 'Components' },
            { value: patternsData.patterns.length, label: 'Patterns' },
            { value: templatesData.templates.length, label: 'Templates' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: '#F4F5F7',
              borderRadius: 8,
              padding: '20px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#0052CC' }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: '#6B778C', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Products covered">
        <p style={{ fontSize: 15, color: '#42526E', lineHeight: 1.7, marginBottom: 20 }}>
          The design system currently covers two product lines:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ border: '1px solid #DFE1E6', borderRadius: 8, padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ background: '#FFD100', borderRadius: 4, padding: '2px 8px', fontSize: 12, fontWeight: 700, color: '#172B4D' }}>RAA Web</span>
              <span style={{ fontSize: 12, background: '#E3FCEF', padding: '2px 8px', borderRadius: 3, fontWeight: 600, color: '#006644' }}>Production</span>
            </div>
            <p style={{ fontSize: 14, color: '#42526E', lineHeight: 1.6 }}>
              Core design system for raa.com.au and all RAA applications. Covers the full customer journey: the public-facing website, Quote to Buy (home and car insurance quoting), My Account (policy management and self-service), Renewals (annual renewal flows), and Claims (lodgement and tracking).
            </p>
          </div>
          <div style={{ border: '1px solid #DFE1E6', borderRadius: 8, padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ background: '#2B7DE9', borderRadius: 4, padding: '2px 8px', fontSize: 12, fontWeight: 700, color: '#ffffff' }}>Taskly</span>
              <span style={{ fontSize: 12, color: '#0747A6', background: '#EAF0FF', padding: '2px 8px', borderRadius: 3, fontWeight: 600 }}>Beta</span>
            </div>
            <p style={{ fontSize: 14, color: '#42526E', lineHeight: 1.6 }}>
              White label task management application built as a third-party product. Uses its own token set (Primary Navy, Inter typography) that sits alongside but is separate from the RAA Web system. Taskly demonstrates how the design system structure can be extended to support non-RAA-branded products.
            </p>
          </div>
        </div>
      </Section>

      <Section title="How it fits into the UX workflow">
        <p style={{ fontSize: 15, color: '#42526E', lineHeight: 1.7, marginBottom: 20 }}>
          The design system is one piece of a broader EXD toolset:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { tool: 'Figma', role: 'Component library and screen design. The source of truth for visual design, shared via team libraries.' },
            { tool: 'FigJam', role: 'Collaborative workshops, journey mapping, and service design. Where research insights get synthesised with the broader team.' },
            { tool: 'Journey Management Platform', role: 'Research data and journey insights. 89 journey insights mapped across RAA customer touchpoints. Feeds into design decisions and pattern documentation.' },
            { tool: 'Slack (#exd-design-research-updates)', role: 'Where design system updates, research findings, and UX decisions are shared with product teams. The bot allows queries against the design system and journey data.' },
            { tool: 'This site', role: 'Documentation hub. Component specs, pattern guidance, templates, and changelog. The bridge between Figma and implementation.' },
          ].map(item => (
            <div key={item.tool} style={{
              display: 'flex',
              gap: 16,
              padding: '14px 0',
              borderBottom: '1px solid #F4F5F7',
            }}>
              <div style={{ minWidth: 200, fontSize: 14, fontWeight: 600, color: '#172B4D', paddingTop: 2 }}>{item.tool}</div>
              <div style={{ fontSize: 14, color: '#42526E', lineHeight: 1.6 }}>{item.role}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Who maintains it">
        <p style={{ fontSize: 15, color: '#42526E', lineHeight: 1.7 }}>
          Apiary is maintained by the EXD (Experience Design) team. New components go through Figma validation first, then get documented here with full properties, variants, and accessibility notes. Changes are tracked in per-component changelogs and shared in Slack.
        </p>
        <p style={{ fontSize: 15, color: '#42526E', lineHeight: 1.7, marginTop: 16 }}>
          The system is intentionally data-driven — all component, pattern, and template documentation lives in JSON files, making it straightforward to update without touching the application code. This means designers and content leads can propose changes as data updates, and developers ship them without UI rework.
        </p>
      </Section>

      <Section title="Technical details">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { label: 'Framework', value: 'React 18 (Vite)' },
            { label: 'Routing', value: 'React Router v6 (client-side SPA)' },
            { label: 'Hosting', value: 'GitHub Pages (asmithdigital/design-system-site)' },
            { label: 'Data', value: 'JSON files — components.json, patterns.json, templates.json, foundations.json, tokens.json' },
            { label: 'Fonts', value: 'Inter (body), JetBrains Mono (code) via Google Fonts' },
            { label: 'SPA routing', value: '404.html redirect pattern for GitHub Pages compatibility' },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex',
              gap: 16,
              padding: '10px 0',
              borderBottom: '1px solid #F4F5F7',
              fontSize: 14,
            }}>
              <span style={{ minWidth: 160, color: '#6B778C', fontWeight: 500 }}>{item.label}</span>
              <span style={{ color: '#172B4D' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

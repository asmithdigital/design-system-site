import { useState } from 'react'

export default function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: '#2d3348',
          color: '#9ba3bf',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 10px',
          fontSize: '11px',
          cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif',
          zIndex: 1,
        }}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre style={{
        background: '#1a1f2e',
        color: '#e8eaf0',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '12.5px',
        lineHeight: '1.7',
        padding: '20px',
        borderRadius: '8px',
        overflowX: 'auto',
        whiteSpace: 'pre',
        margin: 0,
      }}>
        {code}
      </pre>
    </div>
  )
}

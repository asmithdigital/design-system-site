import { useEffect, useRef } from 'react'

export default function BottomSheet({ open, onClose, title, children, footer }) {
  const sheetRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const prevFocus = document.activeElement
    const focusable = sheetRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    focusable?.[0]?.focus()

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
          e.preventDefault()
          ;(e.shiftKey ? last : first)?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      prevFocus?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(26,26,26,0.5)',
          zIndex: 400,
        }}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bottom-sheet-title"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          background: '#fff',
          borderRadius: '20px 20px 0 0',
          zIndex: 401,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90dvh',
        }}
      >
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 0' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: '#E5E7EB' }} />
        </div>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 16px 12px',
        }}>
          <h2
            id="bottom-sheet-title"
            style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#1A1A1A', fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 30, height: 30, borderRadius: 15,
              background: '#F5F5F0', border: 'none',
              cursor: 'pointer', color: '#9CA3AF',
              fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
          {children}
        </div>

        {/* Optional footer */}
        {footer && (
          <div style={{ padding: '12px 16px 28px', borderTop: '1px solid #E5E7EB' }}>
            {footer}
          </div>
        )}
      </div>
    </>
  )
}

import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 * Chat Widget — RAA Web
 *
 * Floating chat launcher and conversation window. Used across RAA web products
 * to provide live support and FAQs. Collapsed by default; expands on click.
 *
 * Import path: @raa-web/components/ChatWidget
 */

const styles = {
  container: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 1200,
    fontFamily: 'Arial, Helvetica, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '12px',
  },
  window: {
    width: '340px',
    height: '440px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    border: '1px solid #E5E5E5',
  },
  header: {
    backgroundColor: '#1A1A1A',
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { color: '#FFFFFF', fontSize: '15px', fontWeight: '700' },
  headerSub: { color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginTop: '2px' },
  closeBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: '4px', display: 'flex' },
  messages: { flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' },
  message: {
    maxWidth: '80%',
    padding: '10px 14px',
    borderRadius: '12px',
    fontSize: '13px',
    lineHeight: '1.5',
  },
  agentMessage: { backgroundColor: '#F5F5F5', color: '#1A1A1A', alignSelf: 'flex-start', borderBottomLeftRadius: '4px' },
  userMessage: { backgroundColor: '#1A1A1A', color: '#FFFFFF', alignSelf: 'flex-end', borderBottomRightRadius: '4px' },
  inputArea: {
    padding: '12px',
    borderTop: '1px solid #E5E5E5',
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: '40px',
    padding: '0 12px',
    border: '1px solid #D9D9D9',
    borderRadius: '20px',
    fontSize: '13px',
    fontFamily: 'Arial, Helvetica, sans-serif',
    outline: 'none',
  },
  sendBtn: {
    width: '36px',
    height: '36px',
    backgroundColor: '#FFD100',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  fab: {
    width: '56px',
    height: '56px',
    backgroundColor: '#1A1A1A',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    color: '#FFFFFF',
    transition: 'background-color 0.15s',
  },
  unreadDot: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    width: '14px',
    height: '14px',
    backgroundColor: '#DC2626',
    borderRadius: '50%',
    border: '2px solid #FFFFFF',
  },
}

const INITIAL_MESSAGES = [
  { id: 1, from: 'agent', text: 'Hi there! 👋 How can I help you today?' },
]

export function ChatWidget({ agentName = 'RAA Support', style }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [draft, setDraft] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  function sendMessage() {
    if (!draft.trim()) return
    setMessages(m => [...m, { id: Date.now(), from: 'user', text: draft.trim() }])
    setDraft('')
    setTimeout(() => {
      setMessages(m => [...m, { id: Date.now() + 1, from: 'agent', text: "Thanks for your message. A support agent will be with you shortly." }])
    }, 800)
  }

  return (
    <div style={{ ...styles.container, ...style }}>
      {open && (
        <div style={styles.window}>
          <div style={styles.header}>
            <div>
              <div style={styles.headerTitle}>{agentName}</div>
              <div style={styles.headerSub}>Typically replies in minutes</div>
            </div>
            <button style={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close chat">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div style={styles.messages} aria-live="polite" aria-label="Chat messages">
            {messages.map(msg => (
              <div key={msg.id} style={{ ...styles.message, ...(msg.from === 'agent' ? styles.agentMessage : styles.userMessage) }}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div style={styles.inputArea}>
            <input
              type="text"
              placeholder="Type a message..."
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') sendMessage() }}
              style={styles.input}
              aria-label="Chat message"
            />
            <button style={styles.sendBtn} onClick={sendMessage} aria-label="Send message">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div style={{ position: 'relative' }}>
        <button
          style={styles.fab}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close chat' : 'Open chat'}
          aria-expanded={open}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M2 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H9l-5 3v-3H5a3 3 0 0 1-3-3V6Z" fill="#FFFFFF" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

ChatWidget.propTypes = {
  agentName: PropTypes.string,
  style: PropTypes.object,
}

export default ChatWidget

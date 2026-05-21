import { useState, useRef, useCallback } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import FoundationPage from './pages/FoundationPage.jsx'
import TokensPage from './pages/TokensPage.jsx'
import ComponentsListPage from './pages/ComponentsListPage.jsx'
import ComponentPage from './pages/ComponentPage.jsx'
import SearchResults from './pages/SearchResults.jsx'
import LandingPage from './pages/LandingPage.jsx'
import GettingStartedPage from './pages/GettingStartedPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import WhatsNewPage from './pages/WhatsNewPage.jsx'
import PatternsListPage from './pages/PatternsListPage.jsx'
import PatternDetailPage from './pages/PatternDetailPage.jsx'
import TemplatesListPage from './pages/TemplatesListPage.jsx'
import TemplateDetailPage from './pages/TemplateDetailPage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'

const HEADER_HEIGHT = 52

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function BeehiveIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 3C9.8 3 5 8.2 5 14.5C5 19.2 6.8 22.2 8.2 23.5L23.8 23.5C25.2 22.2 27 19.2 27 14.5C27 8.2 22.2 3 16 3Z" fill="#FBBF24"/>
      <path d="M10.5 9.5Q13 8.5 16 8.5Q19 8.5 21.5 9.5" stroke="#D97706" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M8.8 14.5Q12 13.5 16 13.5Q20 13.5 23.2 14.5" stroke="#D97706" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M8.5 19.5Q12 18.5 16 18.5Q20 18.5 23.5 19.5" stroke="#D97706" strokeWidth="1.4" strokeLinecap="round"/>
      <rect x="4.5" y="23.5" width="23" height="4" rx="2" fill="#B45309"/>
      <path d="M13.5 23.5Q16 21 18.5 23.5Z" fill="#78350F"/>
    </svg>
  )
}

function Header({ onMenuClick }) {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: HEADER_HEIGHT,
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #DFE1E6',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: '12px',
      zIndex: 200,
    }}>
      <button
        className="hamburger-btn"
        onClick={onMenuClick}
        aria-label="Open navigation"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#172B4D',
          padding: '4px',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
          flexShrink: 0,
          lineHeight: 0,
        }}
      >
        <HamburgerIcon />
      </button>
      <Link
        to="/"
        style={{
          fontSize: '15px',
          fontWeight: '600',
          color: '#172B4D',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <BeehiveIcon size={22} />
        Apiary
      </Link>
    </header>
  )
}

export default function App() {
  const searchRef = useRef(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const handleSidebarClose = useCallback(() => setSidebarOpen(false), [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar searchRef={searchRef} isOpen={sidebarOpen} onClose={handleSidebarClose} />
      <main
        className="main-content"
        style={{
          marginLeft: 260,
          paddingTop: HEADER_HEIGHT,
          minHeight: '100vh',
        }}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/getting-started" element={<ContentWrapper><GettingStartedPage /></ContentWrapper>} />
          <Route path="/about" element={<ContentWrapper><AboutPage /></ContentWrapper>} />
          <Route path="/whats-new" element={<ContentWrapper><WhatsNewPage /></ContentWrapper>} />
          <Route path="/foundations" element={<ContentWrapper><FoundationPage /></ContentWrapper>} />
          <Route path="/tokens/colours" element={<ContentWrapper><TokensPage section="colours" /></ContentWrapper>} />
          <Route path="/tokens/typography" element={<ContentWrapper><TokensPage section="typography" /></ContentWrapper>} />
          <Route path="/tokens/spacing" element={<ContentWrapper><TokensPage section="spacing" /></ContentWrapper>} />
          <Route path="/components" element={<ContentWrapper><ComponentsListPage /></ContentWrapper>} />
          <Route path="/components/:slug" element={<ComponentPage />} />
          <Route path="/patterns" element={<ContentWrapper><PatternsListPage /></ContentWrapper>} />
          <Route path="/patterns/:id" element={<PatternDetailPage />} />
          <Route path="/templates" element={<ContentWrapper><TemplatesListPage /></ContentWrapper>} />
          <Route path="/templates/:id" element={<TemplateDetailPage />} />
          <Route path="/products" element={<ContentWrapper><ProductsPage /></ContentWrapper>} />
          <Route path="/search" element={<ContentWrapper><SearchResults /></ContentWrapper>} />
        </Routes>
      </main>
    </div>
  )
}

function ContentWrapper({ children, wide }) {
  return (
    <div
      className="content-wrapper"
      style={{
        maxWidth: wide ? 1040 : 800,
        margin: '0 auto',
        padding: '48px 40px 80px',
      }}
    >
      {children}
    </div>
  )
}

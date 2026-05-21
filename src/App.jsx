import { useRef } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
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

function Header({ onSearchFocus }) {
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
      justifyContent: 'space-between',
      padding: '0 20px 0 20px',
      zIndex: 200,
    }}>
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
        <span style={{
          background: '#FFD100',
          borderRadius: '4px',
          padding: '2px 6px',
          fontSize: '13px',
          fontWeight: '700',
          color: '#172B4D',
        }}>RAA</span>
        Design System
      </Link>
      <button
        onClick={onSearchFocus}
        aria-label="Search"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '6px',
          borderRadius: '4px',
          color: '#6B778C',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </header>
  )
}

export default function App() {
  const searchRef = useRef(null)

  function handleSearchFocus() {
    if (searchRef.current) {
      searchRef.current.focus()
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Header onSearchFocus={handleSearchFocus} />
      <Sidebar searchRef={searchRef} />
      <main style={{
        marginLeft: 260,
        paddingTop: HEADER_HEIGHT,
        minHeight: '100vh',
      }}>
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
          <Route path="/patterns/:id" element={<ContentWrapper wide><PatternDetailPage /></ContentWrapper>} />
          <Route path="/templates" element={<ContentWrapper><TemplatesListPage /></ContentWrapper>} />
          <Route path="/templates/:id" element={<ContentWrapper wide><TemplateDetailPage /></ContentWrapper>} />
          <Route path="/products" element={<ContentWrapper><ProductsPage /></ContentWrapper>} />
          <Route path="/search" element={<ContentWrapper><SearchResults /></ContentWrapper>} />
        </Routes>
      </main>
    </div>
  )
}

function ContentWrapper({ children, wide }) {
  return (
    <div style={{
      maxWidth: wide ? 960 : 720,
      margin: '0 auto',
      padding: '48px 40px 80px',
    }}>
      {children}
    </div>
  )
}

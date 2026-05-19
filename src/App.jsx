import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import FoundationPage from './pages/FoundationPage.jsx'
import TokensPage from './pages/TokensPage.jsx'
import ComponentPage from './pages/ComponentPage.jsx'
import SearchResults from './pages/SearchResults.jsx'

export default function App() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{
        flex: 1,
        overflowY: 'auto',
        padding: '48px',
        maxWidth: '900px',
      }}>
        <Routes>
          <Route path="/" element={<Navigate to="/foundations/colour-system" replace />} />
          <Route path="/foundations/:id" element={<FoundationPage />} />
          <Route path="/tokens/colours" element={<TokensPage section="colours" />} />
          <Route path="/tokens/typography" element={<TokensPage section="typography" />} />
          <Route path="/tokens/spacing" element={<TokensPage section="spacing" />} />
          <Route path="/components/:id" element={<ComponentPage />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </main>
    </div>
  )
}

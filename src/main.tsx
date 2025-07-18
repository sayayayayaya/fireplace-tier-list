import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import TierList from './TierList.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TierList />} />
        <Route path="/tier-list" element={<TierList />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

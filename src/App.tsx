import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Home from './pages/Home'
import YouTube from './pages/YouTube'
import SocialMedia from './pages/SocialMedia'
import Torrents from './pages/Torrents'
import Music from './pages/Music'
import Downloads from './pages/Downloads'
import Settings from './pages/Settings'
import Advanced from './pages/Advanced'
import { useAppStore } from './store/appStore'

function App() {
  const { sidebarOpen } = useAppStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <motion.main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-16'
          } pt-16`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/youtube" element={<YouTube />} />
              <Route path="/social" element={<SocialMedia />} />
              <Route path="/torrents" element={<Torrents />} />
              <Route path="/music" element={<Music />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/advanced" element={<Advanced />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </motion.main>
      </div>
    </div>
  )
}

export default App
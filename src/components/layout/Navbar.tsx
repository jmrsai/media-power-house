import React from 'react'
import { motion } from 'framer-motion'
import { Menu, Search, Download, Settings, Bell } from 'lucide-react'
import { useAppStore } from '../../store/appStore'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { toggleSidebar, downloads } = useAppStore()
  const activeDownloads = downloads.filter(d => d.status === 'downloading').length

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-dark-700"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-dark-700 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <Download className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Media Power House</span>
          </Link>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-400" />
            <input
              type="text"
              placeholder="Search for videos, music, torrents..."
              className="w-full input-field pl-10"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/downloads"
            className="relative p-2 rounded-lg hover:bg-dark-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            {activeDownloads > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                {activeDownloads}
              </span>
            )}
          </Link>
          
          <button className="p-2 rounded-lg hover:bg-dark-700 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          <Link
            to="/settings"
            className="p-2 rounded-lg hover:bg-dark-700 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
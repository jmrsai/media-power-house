import React from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  Youtube,
  Share2,
  Download,
  Music,
  Folder,
  Settings,
  TrendingUp,
  Clock,
  Heart,
  Zap
} from 'lucide-react'
import { useAppStore } from '../../store/appStore'

const Sidebar = () => {
  const { sidebarOpen } = useAppStore()
  const location = useLocation()

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Youtube, label: 'YouTube', path: '/youtube' },
    { icon: Share2, label: 'Social Media', path: '/social' },
    { icon: Download, label: 'Torrents', path: '/torrents' },
    { icon: Music, label: 'Music', path: '/music' },
    { icon: Folder, label: 'Downloads', path: '/downloads' },
    { icon: Zap, label: 'Advanced', path: '/advanced', badge: 'NEW' },
  ]

  const quickAccess = [
    { icon: TrendingUp, label: 'Trending' },
    { icon: Clock, label: 'Recent' },
    { icon: Heart, label: 'Favorites' },
  ]

  return (
    <motion.aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] glass-effect border-r border-dark-700 z-40 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      }`}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 space-y-6">
        {/* Main Navigation */}
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                    : 'hover:bg-dark-700 text-dark-300 hover:text-dark-100'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            )
          })}
        </div>

        {sidebarOpen && (
          <>
            {/* Quick Access */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-dark-400 uppercase tracking-wider px-3">
                Quick Access
              </h3>
              {quickAccess.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-dark-300 hover:text-dark-100 hover:bg-dark-700 w-full"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Storage Info */}
            <div className="bg-dark-800 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-400">Storage Used</span>
                <span className="text-dark-200">2.4 GB</span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full w-1/3"></div>
              </div>
              <p className="text-xs text-dark-400">7.6 GB available</p>
            </div>

            {/* AI Features Promo */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-white">AI Powered</span>
              </div>
              <p className="text-xs text-dark-300">
                Experience smart recommendations and advanced features
              </p>
              <Link
                to="/advanced"
                className="block w-full text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Explore Now
              </Link>
            </div>
          </>
        )}
      </div>
    </motion.aside>
  )
}

export default Sidebar
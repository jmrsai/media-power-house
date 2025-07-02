import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Youtube,
  Share2,
  Download,
  Music,
  TrendingUp,
  Clock,
  Star,
  Play,
  ArrowRight
} from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Youtube,
      title: 'YouTube Downloader',
      description: 'Download videos in multiple formats and qualities',
      color: 'from-red-500 to-red-600',
      path: '/youtube'
    },
    {
      icon: Share2,
      title: 'Social Media',
      description: 'Download from Instagram, TikTok, Twitter, and more',
      color: 'from-pink-500 to-purple-600',
      path: '/social'
    },
    {
      icon: Download,
      title: 'Torrent Client',
      description: 'Built-in torrent downloader with streaming support',
      color: 'from-green-500 to-green-600',
      path: '/torrents'
    },
    {
      icon: Music,
      title: 'Music Streaming',
      description: 'Stream and download music from various sources',
      color: 'from-blue-500 to-blue-600',
      path: '/music'
    }
  ]

  const stats = [
    { label: 'Downloads Today', value: '1,234', icon: Download },
    { label: 'Active Users', value: '45.2K', icon: TrendingUp },
    { label: 'Success Rate', value: '99.8%', icon: Star },
    { label: 'Avg Speed', value: '25 MB/s', icon: Clock }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        className="text-center space-y-6 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold gradient-text">
          Media Power House
        </h1>
        <p className="text-xl text-dark-300 max-w-2xl mx-auto">
          The ultimate all-in-one media downloader. Download from YouTube, social media platforms, 
          torrents, and stream music - all in one powerful application.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button className="btn-primary flex items-center space-x-2">
            <Play className="w-4 h-4" />
            <span>Get Started</span>
          </button>
          <button className="btn-secondary">
            Learn More
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="glass-effect rounded-xl p-6 text-center">
              <Icon className="w-8 h-8 text-primary-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-dark-400 text-sm">{stat.label}</div>
            </div>
          )
        })}
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Link
              key={index}
              to={feature.path}
              className="glass-effect rounded-xl p-8 card-hover group"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-dark-300 mb-4">{feature.description}</p>
              <div className="flex items-center text-primary-400 group-hover:text-primary-300 transition-colors">
                <span className="text-sm font-medium">Explore</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )
        })}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">Recent Activity</h2>
          <Link to="/downloads" className="text-primary-400 hover:text-primary-300 text-sm font-medium">
            View All
          </Link>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center space-x-4 p-4 bg-dark-800 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Youtube className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white">Sample Video Title {item}</h4>
                <p className="text-sm text-dark-400">Downloaded 2 hours ago • 1080p • 45.2 MB</p>
              </div>
              <div className="text-green-400 text-sm font-medium">Completed</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Home
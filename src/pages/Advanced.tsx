import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Cloud, Zap, Eye, Sparkles, Settings } from 'lucide-react'
import AIAssistant from '../components/ai/AIAssistant'
import SmartRecommendations from '../components/advanced/SmartRecommendations'
import CloudSync from '../components/advanced/CloudSync'
import MediaAnalyzer from '../components/advanced/MediaAnalyzer'
import StreamingPlayer from '../components/advanced/StreamingPlayer'

const Advanced = () => {
  const [activeTab, setActiveTab] = useState('recommendations')

  const tabs = [
    { id: 'recommendations', label: 'Smart Recommendations', icon: Sparkles },
    { id: 'analyzer', label: 'Media Analyzer', icon: Brain },
    { id: 'cloud', label: 'Cloud Sync', icon: Cloud },
    { id: 'streaming', label: 'Advanced Player', icon: Eye }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'recommendations':
        return <SmartRecommendations />
      case 'analyzer':
        return <MediaAnalyzer />
      case 'cloud':
        return <CloudSync />
      case 'streaming':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-white">Advanced Streaming Player</h2>
              <p className="text-dark-300">Experience next-generation media playback with AI-enhanced features</p>
            </div>
            <StreamingPlayer />
          </div>
        )
      default:
        return <SmartRecommendations />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">Advanced Features</h1>
        </div>
        <p className="text-dark-300 max-w-2xl mx-auto">
          Unlock the full potential of Media Power House with AI-powered recommendations, 
          cloud synchronization, advanced media analysis, and cutting-edge streaming technology.
        </p>
      </motion.div>

      {/* Feature Tabs */}
      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                    : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  )
}

export default Advanced
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Clock, Heart, Play, Download, Star } from 'lucide-react'
import { useAppStore } from '../../store/appStore'

interface Recommendation {
  id: string
  title: string
  thumbnail: string
  platform: string
  reason: string
  confidence: number
  category: 'trending' | 'personalized' | 'similar' | 'new'
  metadata: {
    duration?: string
    views?: string
    rating?: number
  }
}

const SmartRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [activeCategory, setActiveCategory] = useState<'all' | 'trending' | 'personalized' | 'similar' | 'new'>('all')
  const [isLoading, setIsLoading] = useState(true)
  const { downloads, searchHistory, favorites, addDownload } = useAppStore()

  useEffect(() => {
    generateRecommendations()
  }, [downloads, searchHistory, favorites])

  const generateRecommendations = async () => {
    setIsLoading(true)
    
    // Simulate AI-powered recommendation generation
    setTimeout(() => {
      const mockRecommendations: Recommendation[] = [
        {
          id: '1',
          title: 'AI-Generated Music Video: Future Beats 2024',
          thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          platform: 'YouTube',
          reason: 'Based on your electronic music downloads',
          confidence: 95,
          category: 'personalized',
          metadata: { duration: '3:45', views: '2.1M', rating: 4.8 }
        },
        {
          id: '2',
          title: 'Trending: Virtual Reality Documentary',
          thumbnail: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          platform: 'YouTube',
          reason: 'Currently trending in tech category',
          confidence: 88,
          category: 'trending',
          metadata: { duration: '28:12', views: '5.7M', rating: 4.9 }
        },
        {
          id: '3',
          title: 'Similar to your favorites: Indie Rock Playlist',
          thumbnail: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          platform: 'Spotify',
          reason: 'Similar to artists in your library',
          confidence: 92,
          category: 'similar',
          metadata: { duration: '2:15:30', rating: 4.7 }
        },
        {
          id: '4',
          title: 'New Release: Cyberpunk 2024 Soundtrack',
          thumbnail: 'https://images.pexels.com/photos/2240771/pexels-photo-2240771.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          platform: 'Music',
          reason: 'New release matching your taste',
          confidence: 85,
          category: 'new',
          metadata: { duration: '1:45:20', rating: 4.6 }
        }
      ]
      
      setRecommendations(mockRecommendations)
      setIsLoading(false)
    }, 1000)
  }

  const filteredRecommendations = activeCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.category === activeCategory)

  const categories = [
    { id: 'all', label: 'All', icon: Sparkles },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'personalized', label: 'For You', icon: Heart },
    { id: 'similar', label: 'Similar', icon: Star },
    { id: 'new', label: 'New', icon: Clock }
  ]

  const handleDownload = (recommendation: Recommendation) => {
    addDownload({
      title: recommendation.title,
      url: `https://example.com/${recommendation.id}`,
      platform: recommendation.platform,
      status: 'pending',
      progress: 0,
      thumbnail: recommendation.thumbnail
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Smart Recommendations</h2>
            <p className="text-sm text-dark-400">AI-powered content suggestions</p>
          </div>
        </div>
        <button
          onClick={generateRecommendations}
          className="btn-secondary text-sm"
        >
          Refresh
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{category.label}</span>
            </button>
          )
        })}
      </div>

      {/* Recommendations Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-effect rounded-xl p-4 animate-pulse">
              <div className="w-full h-40 bg-dark-700 rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-dark-700 rounded w-3/4"></div>
                <div className="h-3 bg-dark-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecommendations.map((recommendation, index) => (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="glass-effect rounded-xl overflow-hidden card-hover group"
            >
              <div className="relative">
                <img
                  src={recommendation.thumbnail}
                  alt={recommendation.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    recommendation.category === 'trending' ? 'bg-red-500/80 text-white' :
                    recommendation.category === 'personalized' ? 'bg-purple-500/80 text-white' :
                    recommendation.category === 'similar' ? 'bg-blue-500/80 text-white' :
                    'bg-green-500/80 text-white'
                  }`}>
                    {recommendation.category}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{recommendation.confidence}%</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <h3 className="font-medium text-white line-clamp-2 text-sm">
                  {recommendation.title}
                </h3>
                
                <p className="text-xs text-primary-400">{recommendation.reason}</p>
                
                <div className="flex items-center justify-between text-xs text-dark-400">
                  <span>{recommendation.platform}</span>
                  {recommendation.metadata.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>{recommendation.metadata.rating}</span>
                    </div>
                  )}
                </div>
                
                {recommendation.metadata.duration && (
                  <div className="text-xs text-dark-400">
                    Duration: {recommendation.metadata.duration}
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDownload(recommendation)}
                    className="flex-1 bg-primary-500 hover:bg-primary-600 text-white text-xs py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                  <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors">
                    <Heart className="w-3 h-3 text-dark-300" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SmartRecommendations
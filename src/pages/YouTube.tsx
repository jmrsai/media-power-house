import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, Play, Clock, Eye, ThumbsUp } from 'lucide-react'
import { useAppStore } from '../store/appStore'
import toast from 'react-hot-toast'

const YouTube = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const { addDownload, addToSearchHistory } = useAppStore()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    addToSearchHistory(searchQuery)

    // Simulate API call
    setTimeout(() => {
      const mockResults = Array.from({ length: 8 }, (_, i) => ({
        id: `video-${i}`,
        title: `${searchQuery} - Video Result ${i + 1}`,
        thumbnail: `https://images.pexels.com/photos/${1000000 + i}/pexels-photo-${1000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=320&h=180&fit=crop`,
        duration: `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        views: `${Math.floor(Math.random() * 1000)}K views`,
        channel: `Channel ${i + 1}`,
        uploadDate: `${Math.floor(Math.random() * 30) + 1} days ago`,
        likes: `${Math.floor(Math.random() * 100)}K`
      }))
      setSearchResults(mockResults)
      setIsSearching(false)
    }, 1000)
  }

  const handleDownload = (video: any, quality: string) => {
    addDownload({
      title: video.title,
      url: `https://youtube.com/watch?v=${video.id}`,
      platform: 'YouTube',
      status: 'pending',
      progress: 0,
      thumbnail: video.thumbnail
    })
    toast.success(`Added "${video.title}" to download queue`)
  }

  const qualityOptions = ['144p', '240p', '360p', '480p', '720p', '1080p', '1440p', '2160p']

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white">YouTube Downloader</h1>
        <p className="text-dark-300">Download YouTube videos in any quality and format</p>
      </motion.div>

      {/* Search Form */}
      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search YouTube videos or paste a URL..."
              className="w-full input-field pl-12"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select className="input-field">
                <option>Video + Audio</option>
                <option>Video Only</option>
                <option>Audio Only</option>
              </select>
              <select className="input-field">
                {qualityOptions.map(quality => (
                  <option key={quality}>{quality}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="btn-primary flex items-center space-x-2"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-white">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((video: any) => (
              <div key={video.id} className="glass-effect rounded-xl overflow-hidden card-hover">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  <h3 className="font-medium text-white line-clamp-2 text-sm">
                    {video.title}
                  </h3>
                  
                  <div className="text-xs text-dark-400 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-3 h-3" />
                      <span>{video.views}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3" />
                      <span>{video.uploadDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{video.likes}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDownload(video, '1080p')}
                      className="flex-1 bg-primary-500 hover:bg-primary-600 text-white text-xs py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                    <div className="relative group">
                      <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors">
                        <Download className="w-3 h-3 text-dark-300" />
                      </button>
                      <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
                        <div className="bg-dark-800 rounded-lg p-2 space-y-1 min-w-24">
                          {qualityOptions.slice(-4).map(quality => (
                            <button
                              key={quality}
                              onClick={() => handleDownload(video, quality)}
                              className="block w-full text-left text-xs text-dark-300 hover:text-white px-2 py-1 rounded hover:bg-dark-700"
                            >
                              {quality}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Popular Videos */}
      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-white mb-4">Trending Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="flex space-x-3 p-3 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors">
              <img
                src={`https://images.pexels.com/photos/${2000000 + i}/pexels-photo-${2000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=120&h=68&fit=crop`}
                alt={`Trending ${i + 1}`}
                className="w-20 h-12 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-white truncate">
                  Trending Video Title {i + 1}
                </h4>
                <p className="text-xs text-dark-400">
                  {Math.floor(Math.random() * 1000)}K views • {Math.floor(Math.random() * 7) + 1} days ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default YouTube
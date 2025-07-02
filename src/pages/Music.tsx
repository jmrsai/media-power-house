import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Play, Pause, SkipBack, SkipForward, Volume2, Heart, Download, Shuffle, Repeat } from 'lucide-react'
import { useAppStore } from '../store/appStore'

const Music = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const { currentlyPlaying, setCurrentlyPlaying, addToFavorites, addDownload } = useAppStore()

  const popularTracks = Array.from({ length: 10 }, (_, i) => ({
    id: `track-${i}`,
    title: `Popular Song ${i + 1}`,
    artist: `Artist ${i + 1}`,
    album: `Album ${i + 1}`,
    duration: `${Math.floor(Math.random() * 3) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    thumbnail: `https://images.pexels.com/photos/${4000000 + i}/pexels-photo-${4000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop`,
    plays: Math.floor(Math.random() * 1000000) + 10000
  }))

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    
    setTimeout(() => {
      const mockResults = Array.from({ length: 15 }, (_, i) => ({
        id: `search-${i}`,
        title: `${searchQuery} - Song ${i + 1}`,
        artist: `Artist ${i + 1}`,
        album: `Album ${i + 1}`,
        duration: `${Math.floor(Math.random() * 3) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        thumbnail: `https://images.pexels.com/photos/${5000000 + i}/pexels-photo-${5000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop`,
        plays: Math.floor(Math.random() * 1000000) + 1000
      }))
      setSearchResults(mockResults)
      setIsSearching(false)
    }, 1000)
  }

  const handlePlayTrack = (track: any) => {
    setCurrentTrack(track)
    setCurrentlyPlaying(track)
    setIsPlaying(true)
  }

  const handleDownloadTrack = (track: any) => {
    addDownload({
      title: `${track.artist} - ${track.title}`,
      url: `https://music.example.com/track/${track.id}`,
      platform: 'Music',
      status: 'pending',
      progress: 0,
      thumbnail: track.thumbnail
    })
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
        <h1 className="text-3xl font-bold text-white">Music Streaming & Download</h1>
        <p className="text-dark-300">Stream and download music from various sources</p>
      </motion.div>

      {/* Search */}
      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <form onSubmit={handleSearch} className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for songs, artists, or albums..."
              className="w-full input-field pl-12"
            />
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
        </form>
      </motion.div>

      {/* Now Playing */}
      {currentTrack && (
        <motion.div
          className="glass-effect rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center space-x-6">
            <img
              src={currentTrack.thumbnail}
              alt={currentTrack.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">{currentTrack.title}</h3>
              <p className="text-dark-300">{currentTrack.artist}</p>
              <div className="flex items-center space-x-4 mt-3">
                <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors">
                  <SkipBack className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 bg-primary-500 hover:bg-primary-600 rounded-full transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-1" />
                  )}
                </button>
                <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors">
                  <SkipForward className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors">
                  <Shuffle className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors">
                  <Repeat className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => addToFavorites(currentTrack)}
                className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
              >
                <Heart className="w-4 h-4 text-red-400" />
              </button>
              <button
                onClick={() => handleDownloadTrack(currentTrack)}
                className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4 text-white" />
              </button>
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-white" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="70"
                  className="w-20 accent-primary-500"
                />
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 space-y-2">
            <div className="w-full bg-dark-700 rounded-full h-1">
              <div className="bg-primary-500 h-1 rounded-full w-1/3"></div>
            </div>
            <div className="flex justify-between text-xs text-dark-400">
              <span>1:23</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <motion.div
          className="glass-effect rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-white mb-4">Search Results</h2>
          <div className="space-y-2">
            {searchResults.map((track: any, index) => (
              <div
                key={track.id}
                className="flex items-center space-x-4 p-3 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors group"
              >
                <div className="text-dark-400 text-sm w-6">{index + 1}</div>
                <img
                  src={track.thumbnail}
                  alt={track.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white truncate">{track.title}</h4>
                  <p className="text-sm text-dark-400 truncate">{track.artist}</p>
                </div>
                <div className="text-sm text-dark-400">{track.duration}</div>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handlePlayTrack(track)}
                    className="p-2 bg-primary-500 hover:bg-primary-600 rounded-full transition-colors"
                  >
                    <Play className="w-3 h-3 text-white" />
                  </button>
                  <button
                    onClick={() => addToFavorites(track)}
                    className="p-2 bg-dark-600 hover:bg-dark-500 rounded-full transition-colors"
                  >
                    <Heart className="w-3 h-3 text-white" />
                  </button>
                  <button
                    onClick={() => handleDownloadTrack(track)}
                    className="p-2 bg-dark-600 hover:bg-dark-500 rounded-full transition-colors"
                  >
                    <Download className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Popular Tracks */}
      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-white mb-4">Popular Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {popularTracks.slice(0, 10).map((track) => (
            <div key={track.id} className="bg-dark-800 rounded-lg p-4 card-hover group">
              <img
                src={track.thumbnail}
                alt={track.title}
                className="w-full aspect-square object-cover rounded-lg mb-3"
              />
              <h4 className="font-medium text-white truncate">{track.title}</h4>
              <p className="text-sm text-dark-400 truncate">{track.artist}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-dark-500">{track.plays.toLocaleString()} plays</span>
                <button
                  onClick={() => handlePlayTrack(track)}
                  className="p-2 bg-primary-500 hover:bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Play className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Music
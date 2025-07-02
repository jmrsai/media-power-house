import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, Upload, Pause, Play, Trash2, Magnet } from 'lucide-react'
import { useAppStore } from '../store/appStore'
import toast from 'react-hot-toast'

const Torrents = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [activeTorrents, setActiveTorrents] = useState([
    {
      id: '1',
      name: 'Sample Movie 2024 1080p BluRay',
      size: '2.1 GB',
      progress: 65,
      downloadSpeed: '5.2 MB/s',
      uploadSpeed: '1.1 MB/s',
      peers: 12,
      seeds: 8,
      status: 'downloading'
    },
    {
      id: '2',
      name: 'Documentary Series S01 Complete',
      size: '8.7 GB',
      progress: 100,
      downloadSpeed: '0 B/s',
      uploadSpeed: '2.3 MB/s',
      peers: 5,
      seeds: 15,
      status: 'seeding'
    }
  ])
  const { addDownload } = useAppStore()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    
    // Simulate torrent search
    setTimeout(() => {
      const mockResults = Array.from({ length: 10 }, (_, i) => ({
        id: `torrent-${i}`,
        name: `${searchQuery} - Result ${i + 1}`,
        size: `${(Math.random() * 10 + 0.5).toFixed(1)} GB`,
        seeds: Math.floor(Math.random() * 100) + 1,
        peers: Math.floor(Math.random() * 50) + 1,
        uploaded: `${Math.floor(Math.random() * 30) + 1} days ago`,
        category: ['Movies', 'TV Shows', 'Music', 'Games', 'Software'][Math.floor(Math.random() * 5)],
        magnetLink: `magnet:?xt=urn:btih:${Math.random().toString(36).substring(2, 42)}`
      }))
      setSearchResults(mockResults)
      setIsSearching(false)
    }, 1500)
  }

  const handleDownloadTorrent = (torrent: any) => {
    const newTorrent = {
      id: Date.now().toString(),
      name: torrent.name,
      size: torrent.size,
      progress: 0,
      downloadSpeed: '0 B/s',
      uploadSpeed: '0 B/s',
      peers: 0,
      seeds: torrent.seeds,
      status: 'downloading'
    }
    setActiveTorrents(prev => [newTorrent, ...prev])
    toast.success(`Started downloading "${torrent.name}"`)
  }

  const toggleTorrent = (id: string) => {
    setActiveTorrents(prev => prev.map(torrent => 
      torrent.id === id 
        ? { ...torrent, status: torrent.status === 'downloading' ? 'paused' : 'downloading' }
        : torrent
    ))
  }

  const removeTorrent = (id: string) => {
    setActiveTorrents(prev => prev.filter(torrent => torrent.id !== id))
    toast.success('Torrent removed')
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
        <h1 className="text-3xl font-bold text-white">Torrent Client</h1>
        <p className="text-dark-300">Search, download, and manage torrents with built-in streaming</p>
      </motion.div>

      {/* Search */}
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
              placeholder="Search torrents or paste magnet link..."
              className="w-full input-field pl-12"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select className="input-field">
                <option>All Categories</option>
                <option>Movies</option>
                <option>TV Shows</option>
                <option>Music</option>
                <option>Games</option>
                <option>Software</option>
              </select>
              <select className="input-field">
                <option>Sort by Seeds</option>
                <option>Sort by Size</option>
                <option>Sort by Date</option>
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

      {/* Active Torrents */}
      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Active Torrents</h2>
          <div className="text-sm text-dark-400">
            Total: {activeTorrents.length} • Downloading: {activeTorrents.filter(t => t.status === 'downloading').length}
          </div>
        </div>
        
        <div className="space-y-4">
          {activeTorrents.map((torrent) => (
            <div key={torrent.id} className="bg-dark-800 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white truncate flex-1 mr-4">{torrent.name}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleTorrent(torrent.id)}
                    className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
                  >
                    {torrent.status === 'downloading' ? (
                      <Pause className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <Play className="w-4 h-4 text-green-400" />
                    )}
                  </button>
                  <button
                    onClick={() => removeTorrent(torrent.id)}
                    className="p-2 bg-dark-700 hover:bg-red-600 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-300">Progress: {torrent.progress}%</span>
                  <span className="text-dark-300">{torrent.size}</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${torrent.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-dark-400">
                <div className="flex items-center space-x-4">
                  <span>↓ {torrent.downloadSpeed}</span>
                  <span>↑ {torrent.uploadSpeed}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>Seeds: {torrent.seeds}</span>
                  <span>Peers: {torrent.peers}</span>
                  <span className={`px-2 py-1 rounded ${
                    torrent.status === 'downloading' ? 'bg-blue-500/20 text-blue-400' :
                    torrent.status === 'seeding' ? 'bg-green-500/20 text-green-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {torrent.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <motion.div
          className="glass-effect rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-white mb-4">Search Results</h2>
          <div className="space-y-3">
            {searchResults.map((torrent: any) => (
              <div key={torrent.id} className="bg-dark-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0 mr-4">
                    <h3 className="font-medium text-white truncate">{torrent.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-dark-400 mt-1">
                      <span>{torrent.size}</span>
                      <span className="text-green-400">↑ {torrent.seeds}</span>
                      <span className="text-red-400">↓ {torrent.peers}</span>
                      <span>{torrent.uploaded}</span>
                      <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-xs">
                        {torrent.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(torrent.magnetLink)}
                      className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
                      title="Copy Magnet Link"
                    >
                      <Magnet className="w-4 h-4 text-dark-300" />
                    </button>
                    <button
                      onClick={() => handleDownloadTorrent(torrent)}
                      className="btn-primary text-sm py-2 px-4"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Torrents
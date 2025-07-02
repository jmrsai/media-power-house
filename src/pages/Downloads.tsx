import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Pause, Play, Trash2, FolderOpen, Filter, Search } from 'lucide-react'
import { useAppStore } from '../store/appStore'

const Downloads = () => {
  const { downloads, updateDownload, removeDownload } = useAppStore()
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDownloads = downloads.filter(download => {
    const matchesFilter = filter === 'all' || download.status === filter
    const matchesSearch = download.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400'
      case 'downloading': return 'text-blue-400'
      case 'paused': return 'text-yellow-400'
      case 'error': return 'text-red-400'
      default: return 'text-dark-400'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20'
      case 'downloading': return 'bg-blue-500/20'
      case 'paused': return 'bg-yellow-500/20'
      case 'error': return 'bg-red-500/20'
      default: return 'bg-dark-500/20'
    }
  }

  const toggleDownload = (id: string) => {
    const download = downloads.find(d => d.id === id)
    if (download) {
      const newStatus = download.status === 'downloading' ? 'paused' : 'downloading'
      updateDownload(id, { status: newStatus })
    }
  }

  const stats = {
    total: downloads.length,
    completed: downloads.filter(d => d.status === 'completed').length,
    downloading: downloads.filter(d => d.status === 'downloading').length,
    paused: downloads.filter(d => d.status === 'paused').length,
    error: downloads.filter(d => d.status === 'error').length
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
        <h1 className="text-3xl font-bold text-white">Downloads</h1>
        <p className="text-dark-300">Manage all your downloads in one place</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {[
          { label: 'Total', value: stats.total, color: 'text-white' },
          { label: 'Completed', value: stats.completed, color: 'text-green-400' },
          { label: 'Downloading', value: stats.downloading, color: 'text-blue-400' },
          { label: 'Paused', value: stats.paused, color: 'text-yellow-400' },
          { label: 'Error', value: stats.error, color: 'text-red-400' }
        ].map((stat, index) => (
          <div key={index} className="glass-effect rounded-xl p-4 text-center">
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-dark-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Controls */}
      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search downloads..."
                className="input-field pl-10 w-64"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-dark-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Downloads</option>
                <option value="downloading">Downloading</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="btn-secondary flex items-center space-x-2">
              <FolderOpen className="w-4 h-4" />
              <span>Open Folder</span>
            </button>
            <button className="btn-secondary">
              Clear Completed
            </button>
          </div>
        </div>
      </motion.div>

      {/* Downloads List */}
      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {filteredDownloads.length === 0 ? (
          <div className="text-center py-12">
            <Download className="w-16 h-16 text-dark-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No downloads found</h3>
            <p className="text-dark-400">
              {downloads.length === 0 
                ? "Start downloading content to see it here"
                : "No downloads match your current filter"
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDownloads.map((download) => (
              <div key={download.id} className="bg-dark-800 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  {download.thumbnail && (
                    <img
                      src={download.thumbnail}
                      alt={download.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-white truncate">{download.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBg(download.status)} ${getStatusColor(download.status)}`}>
                          {download.status}
                        </span>
                        {download.size && (
                          <span className="text-xs text-dark-400">{download.size}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-dark-400">
                      <span>{download.platform}</span>
                      <span>{new Date(download.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    {download.status === 'downloading' && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-dark-400">Progress: {download.progress}%</span>
                          <span className="text-dark-400">Speed: 2.5 MB/s</span>
                        </div>
                        <div className="w-full bg-dark-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${download.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {download.status === 'downloading' || download.status === 'paused' ? (
                      <button
                        onClick={() => toggleDownload(download.id)}
                        className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
                      >
                        {download.status === 'downloading' ? (
                          <Pause className="w-4 h-4 text-yellow-400" />
                        ) : (
                          <Play className="w-4 h-4 text-green-400" />
                        )}
                      </button>
                    ) : null}
                    
                    <button
                      onClick={() => removeDownload(download.id)}
                      className="p-2 bg-dark-700 hover:bg-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Downloads
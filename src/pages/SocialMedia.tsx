import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Facebook, MessageCircle, Download, Link as LinkIcon } from 'lucide-react'
import { useAppStore } from '../store/appStore'
import toast from 'react-hot-toast'

const SocialMedia = () => {
  const [url, setUrl] = useState('')
  const [platform, setPlatform] = useState('instagram')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [mediaInfo, setMediaInfo] = useState<any>(null)
  const { addDownload } = useAppStore()

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600' },
    { id: 'tiktok', name: 'TikTok', icon: MessageCircle, color: 'from-black to-red-500' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'from-blue-400 to-blue-600' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-800' },
  ]

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setIsAnalyzing(true)
    
    // Simulate API call
    setTimeout(() => {
      const mockMediaInfo = {
        title: 'Sample Social Media Post',
        thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        author: '@sampleuser',
        duration: platform === 'tiktok' ? '0:15' : null,
        likes: Math.floor(Math.random() * 10000),
        views: Math.floor(Math.random() * 100000),
        description: 'This is a sample social media post description that would be extracted from the actual content.',
        formats: [
          { quality: 'HD', size: '15.2 MB', format: 'MP4' },
          { quality: 'SD', size: '8.1 MB', format: 'MP4' },
          { quality: 'Audio Only', size: '2.3 MB', format: 'MP3' },
        ]
      }
      setMediaInfo(mockMediaInfo)
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleDownload = (format: any) => {
    addDownload({
      title: mediaInfo.title,
      url: url,
      platform: platforms.find(p => p.id === platform)?.name || 'Social Media',
      status: 'pending',
      progress: 0,
      thumbnail: mediaInfo.thumbnail,
      size: format.size
    })
    toast.success(`Added "${mediaInfo.title}" to download queue`)
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
        <h1 className="text-3xl font-bold text-white">Social Media Downloader</h1>
        <p className="text-dark-300">Download content from Instagram, TikTok, Twitter, and more</p>
      </motion.div>

      {/* Platform Selection */}
      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold text-white mb-4">Select Platform</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platforms.map((p) => {
            const Icon = p.icon
            return (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                className={`p-4 rounded-xl transition-all duration-200 ${
                  platform === p.id
                    ? `bg-gradient-to-r ${p.color} text-white shadow-lg`
                    : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white'
                }`}
              >
                <Icon className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm font-medium">{p.name}</div>
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* URL Input */}
      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={`Paste ${platforms.find(p => p.id === platform)?.name} URL here...`}
              className="w-full input-field pl-12"
            />
          </div>
          <button
            type="submit"
            disabled={isAnalyzing}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Analyze URL</span>
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Media Info */}
      {mediaInfo && (
        <motion.div
          className="glass-effect rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              <img
                src={mediaInfo.thumbnail}
                alt={mediaInfo.title}
                className="w-full md:w-48 h-48 object-cover rounded-lg"
              />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{mediaInfo.title}</h3>
                <p className="text-primary-400 font-medium">{mediaInfo.author}</p>
                <p className="text-dark-300 text-sm mt-2">{mediaInfo.description}</p>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-dark-400">
                <div>👁️ {mediaInfo.views.toLocaleString()} views</div>
                <div>❤️ {mediaInfo.likes.toLocaleString()} likes</div>
                {mediaInfo.duration && <div>⏱️ {mediaInfo.duration}</div>}
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-white">Available Formats:</h4>
                {mediaInfo.formats.map((format: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-white">{format.quality}</div>
                      <div className="text-xs text-dark-400">{format.format}</div>
                      <div className="text-xs text-dark-400">{format.size}</div>
                    </div>
                    <button
                      onClick={() => handleDownload(format)}
                      className="btn-primary text-sm py-2 px-4"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Downloads */}
      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-lg font-semibold text-white mb-4">Recent Social Media Downloads</h2>
        <div className="space-y-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 bg-dark-800 rounded-lg">
              <img
                src={`https://images.pexels.com/photos/${3000000 + i}/pexels-photo-${3000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop`}
                alt={`Recent ${i + 1}`}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-medium text-white">Social Media Post {i + 1}</h4>
                <p className="text-sm text-dark-400">@user{i + 1} • Downloaded 2 hours ago</p>
              </div>
              <div className="text-green-400 text-sm font-medium">Completed</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default SocialMedia
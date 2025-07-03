import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cloud, CloudOff, Sync, Check, AlertCircle, Upload, Download, Folder } from 'lucide-react'
import { useAppStore } from '../../store/appStore'
import toast from 'react-hot-toast'

interface CloudProvider {
  id: string
  name: string
  icon: string
  connected: boolean
  storage: {
    used: string
    total: string
    percentage: number
  }
}

const CloudSync = () => {
  const [providers, setProviders] = useState<CloudProvider[]>([
    {
      id: 'gdrive',
      name: 'Google Drive',
      icon: '🔵',
      connected: true,
      storage: { used: '2.4 GB', total: '15 GB', percentage: 16 }
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      icon: '📦',
      connected: false,
      storage: { used: '0 GB', total: '2 GB', percentage: 0 }
    },
    {
      id: 'onedrive',
      name: 'OneDrive',
      icon: '☁️',
      connected: true,
      storage: { used: '1.2 GB', total: '5 GB', percentage: 24 }
    }
  ])
  
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'error'>('idle')
  const [lastSync, setLastSync] = useState<Date>(new Date())
  const { downloads, settings, updateSettings } = useAppStore()

  const handleConnect = async (providerId: string) => {
    setProviders(prev => prev.map(p => 
      p.id === providerId 
        ? { ...p, connected: !p.connected }
        : p
    ))
    
    const provider = providers.find(p => p.id === providerId)
    toast.success(`${provider?.name} ${provider?.connected ? 'disconnected' : 'connected'}`)
  }

  const handleSync = async () => {
    setSyncStatus('syncing')
    
    // Simulate sync process
    setTimeout(() => {
      setSyncStatus('idle')
      setLastSync(new Date())
      toast.success('Sync completed successfully')
    }, 3000)
  }

  const handleAutoSyncToggle = () => {
    updateSettings({ autoSync: !settings.autoSync })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Cloud className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Cloud Sync</h2>
            <p className="text-sm text-dark-400">Sync your downloads across devices</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSync}
            disabled={syncStatus === 'syncing'}
            className="btn-secondary flex items-center space-x-2"
          >
            <Sync className={`w-4 h-4 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
            <span>{syncStatus === 'syncing' ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>
      </div>

      {/* Sync Status */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Sync Status</h3>
          <div className="flex items-center space-x-2">
            {syncStatus === 'idle' && <Check className="w-5 h-5 text-green-400" />}
            {syncStatus === 'syncing' && <Sync className="w-5 h-5 text-blue-400 animate-spin" />}
            {syncStatus === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
            <span className={`text-sm ${
              syncStatus === 'idle' ? 'text-green-400' :
              syncStatus === 'syncing' ? 'text-blue-400' :
              'text-red-400'
            }`}>
              {syncStatus === 'idle' ? 'Up to date' :
               syncStatus === 'syncing' ? 'Syncing...' :
               'Sync failed'}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-dark-800 rounded-lg p-4 text-center">
            <Upload className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-lg font-semibold text-white">156</div>
            <div className="text-sm text-dark-400">Files Uploaded</div>
          </div>
          <div className="bg-dark-800 rounded-lg p-4 text-center">
            <Download className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-lg font-semibold text-white">89</div>
            <div className="text-sm text-dark-400">Files Downloaded</div>
          </div>
          <div className="bg-dark-800 rounded-lg p-4 text-center">
            <Folder className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-lg font-semibold text-white">2.4 GB</div>
            <div className="text-sm text-dark-400">Total Synced</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-dark-400">Last sync: {lastSync.toLocaleString()}</span>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.autoSync}
              onChange={handleAutoSyncToggle}
              className="rounded"
            />
            <span className="text-dark-300">Auto-sync</span>
          </label>
        </div>
      </div>

      {/* Cloud Providers */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Connected Services</h3>
        {providers.map((provider) => (
          <motion.div
            key={provider.id}
            className="glass-effect rounded-xl p-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{provider.icon}</span>
                <div>
                  <h4 className="font-medium text-white">{provider.name}</h4>
                  <p className="text-sm text-dark-400">
                    {provider.connected ? 'Connected' : 'Not connected'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => handleConnect(provider.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  provider.connected
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-primary-500 hover:bg-primary-600 text-white'
                }`}
              >
                {provider.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
            
            {provider.connected && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-400">Storage Used</span>
                  <span className="text-white">{provider.storage.used} / {provider.storage.total}</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${provider.storage.percentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CloudSync
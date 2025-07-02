import React from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Folder, Download, Bell, Palette, Shield, Info } from 'lucide-react'
import { useAppStore } from '../store/appStore'

const Settings = () => {
  const { settings, updateSettings } = useAppStore()

  const settingSections = [
    {
      title: 'Download Settings',
      icon: Download,
      settings: [
        {
          key: 'downloadPath',
          label: 'Download Path',
          type: 'text',
          value: settings.downloadPath,
          description: 'Default location for downloaded files'
        },
        {
          key: 'quality',
          label: 'Default Quality',
          type: 'select',
          value: settings.quality,
          options: [
            { value: 'low', label: '480p' },
            { value: 'medium', label: '720p' },
            { value: 'high', label: '1080p' },
            { value: 'ultra', label: '4K' }
          ],
          description: 'Default video quality for downloads'
        },
        {
          key: 'autoDownload',
          label: 'Auto Download',
          type: 'toggle',
          value: settings.autoDownload,
          description: 'Automatically start downloads when added to queue'
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          key: 'notifications',
          label: 'Enable Notifications',
          type: 'toggle',
          value: settings.notifications,
          description: 'Show notifications for download completion and errors'
        }
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          key: 'theme',
          label: 'Theme',
          type: 'select',
          value: settings.theme,
          options: [
            { value: 'dark', label: 'Dark' },
            { value: 'light', label: 'Light' }
          ],
          description: 'Choose your preferred theme'
        }
      ]
    }
  ]

  const handleSettingChange = (key: string, value: any) => {
    updateSettings({ [key]: value })
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
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-dark-300">Customize your Media Power House experience</p>
      </motion.div>

      {/* Settings Sections */}
      {settingSections.map((section, sectionIndex) => {
        const Icon = section.icon
        return (
          <motion.div
            key={section.title}
            className="glass-effect rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <Icon className="w-6 h-6 text-primary-400" />
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
            </div>
            
            <div className="space-y-6">
              {section.settings.map((setting) => (
                <div key={setting.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-white font-medium">{setting.label}</label>
                      <p className="text-sm text-dark-400">{setting.description}</p>
                    </div>
                    
                    <div className="flex-shrink-0">
                      {setting.type === 'toggle' && (
                        <button
                          onClick={() => handleSettingChange(setting.key, !setting.value)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            setting.value ? 'bg-primary-500' : 'bg-dark-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              setting.value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      )}
                      
                      {setting.type === 'select' && (
                        <select
                          value={setting.value}
                          onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                          className="input-field min-w-32"
                        >
                          {setting.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                      
                      {setting.type === 'text' && (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={setting.value}
                            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                            className="input-field min-w-64"
                          />
                          <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors">
                            <Folder className="w-4 h-4 text-dark-300" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )
      })}

      {/* Storage & Performance */}
      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-6 h-6 text-primary-400" />
          <h2 className="text-xl font-semibold text-white">Storage & Performance</h2>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-dark-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">2.4 GB</div>
              <div className="text-dark-400 text-sm">Used Storage</div>
            </div>
            <div className="bg-dark-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">7.6 GB</div>
              <div className="text-dark-400 text-sm">Available</div>
            </div>
            <div className="bg-dark-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">156</div>
              <div className="text-dark-400 text-sm">Total Downloads</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Clear Cache</h3>
              <p className="text-sm text-dark-400">Remove temporary files and thumbnails</p>
            </div>
            <button className="btn-secondary">Clear Cache</button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Reset Settings</h3>
              <p className="text-sm text-dark-400">Reset all settings to default values</p>
            </div>
            <button className="btn-secondary text-red-400 border-red-400 hover:bg-red-400 hover:text-white">
              Reset
            </button>
          </div>
        </div>
      </motion.div>

      {/* About */}
      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <Info className="w-6 h-6 text-primary-400" />
          <h2 className="text-xl font-semibold text-white">About</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-dark-300">Version</span>
            <span className="text-white">1.0.0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-dark-300">Build</span>
            <span className="text-white">2024.01.15</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-dark-300">License</span>
            <span className="text-white">MIT</span>
          </div>
          
          <div className="pt-4 border-t border-dark-700">
            <p className="text-sm text-dark-400 text-center">
              Media Power House - The ultimate all-in-one media downloader
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Settings
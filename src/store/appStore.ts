import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Download {
  id: string
  title: string
  url: string
  platform: string
  status: 'pending' | 'downloading' | 'completed' | 'error'
  progress: number
  size?: string
  thumbnail?: string
  createdAt: Date
}

interface AppState {
  sidebarOpen: boolean
  downloads: Download[]
  currentlyPlaying: any
  searchHistory: string[]
  favorites: any[]
  settings: {
    downloadPath: string
    quality: string
    theme: 'dark' | 'light'
    autoDownload: boolean
    notifications: boolean
  }
  
  // Actions
  toggleSidebar: () => void
  addDownload: (download: Omit<Download, 'id' | 'createdAt'>) => void
  updateDownload: (id: string, updates: Partial<Download>) => void
  removeDownload: (id: string) => void
  setCurrentlyPlaying: (media: any) => void
  addToSearchHistory: (query: string) => void
  addToFavorites: (item: any) => void
  removeFromFavorites: (id: string) => void
  updateSettings: (settings: Partial<AppState['settings']>) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      sidebarOpen: true,
      downloads: [],
      currentlyPlaying: null,
      searchHistory: [],
      favorites: [],
      settings: {
        downloadPath: '/downloads',
        quality: 'high',
        theme: 'dark',
        autoDownload: false,
        notifications: true,
      },

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      addDownload: (download) => set((state) => ({
        downloads: [{
          ...download,
          id: Date.now().toString(),
          createdAt: new Date(),
        }, ...state.downloads]
      })),
      
      updateDownload: (id, updates) => set((state) => ({
        downloads: state.downloads.map(download =>
          download.id === id ? { ...download, ...updates } : download
        )
      })),
      
      removeDownload: (id) => set((state) => ({
        downloads: state.downloads.filter(download => download.id !== id)
      })),
      
      setCurrentlyPlaying: (media) => set({ currentlyPlaying: media }),
      
      addToSearchHistory: (query) => set((state) => ({
        searchHistory: [query, ...state.searchHistory.filter(q => q !== query)].slice(0, 10)
      })),
      
      addToFavorites: (item) => set((state) => ({
        favorites: [item, ...state.favorites.filter(fav => fav.id !== item.id)]
      })),
      
      removeFromFavorites: (id) => set((state) => ({
        favorites: state.favorites.filter(fav => fav.id !== id)
      })),
      
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),
    }),
    {
      name: 'media-power-house-storage',
    }
  )
)
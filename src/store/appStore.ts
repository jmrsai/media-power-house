import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Download {
  id: string
  title: string
  url: string
  platform: string
  status: 'pending' | 'downloading' | 'completed' | 'error' | 'paused'
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
    autoSync: boolean
    aiRecommendations: boolean
    streamingQuality: string
    offlineMode: boolean
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
      downloads: [
        {
          id: '1',
          title: 'Sample Video - Tech Review 2024',
          url: 'https://youtube.com/watch?v=sample1',
          platform: 'YouTube',
          status: 'downloading',
          progress: 65,
          size: '125 MB',
          thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          createdAt: new Date(Date.now() - 3600000)
        },
        {
          id: '2',
          title: 'Music Album - Electronic Vibes',
          url: 'https://music.example.com/album/2',
          platform: 'Music',
          status: 'completed',
          progress: 100,
          size: '89 MB',
          thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          createdAt: new Date(Date.now() - 7200000)
        },
        {
          id: '3',
          title: 'Documentary - AI Revolution',
          url: 'https://youtube.com/watch?v=sample3',
          platform: 'YouTube',
          status: 'paused',
          progress: 23,
          size: '1.2 GB',
          thumbnail: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          createdAt: new Date(Date.now() - 10800000)
        }
      ],
      currentlyPlaying: null,
      searchHistory: ['AI technology', 'electronic music', 'tech reviews', 'documentaries'],
      favorites: [],
      settings: {
        downloadPath: '/downloads',
        quality: 'high',
        theme: 'dark',
        autoDownload: false,
        notifications: true,
        autoSync: true,
        aiRecommendations: true,
        streamingQuality: 'auto',
        offlineMode: false,
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
import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, Brain, Image, Music, Video, FileText, Zap, Eye } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

interface AnalysisResult {
  type: 'image' | 'video' | 'audio'
  confidence: number
  tags: string[]
  description: string
  metadata: {
    duration?: string
    resolution?: string
    size: string
    format: string
  }
  aiInsights: string[]
}

const MediaAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
      analyzeMedia(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'video/*': ['.mp4', '.avi', '.mov', '.mkv'],
      'audio/*': ['.mp3', '.wav', '.flac', '.aac']
    },
    maxFiles: 1
  })

  const analyzeMedia = async (file: File) => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const fileType = file.type.split('/')[0] as 'image' | 'video' | 'audio'
      
      const mockResult: AnalysisResult = {
        type: fileType,
        confidence: Math.floor(Math.random() * 20) + 80,
        tags: generateTags(fileType),
        description: generateDescription(fileType, file.name),
        metadata: {
          size: formatFileSize(file.size),
          format: file.type.split('/')[1].toUpperCase(),
          ...(fileType === 'video' && { 
            duration: '2:34', 
            resolution: '1920x1080' 
          }),
          ...(fileType === 'audio' && { 
            duration: '3:45' 
          })
        },
        aiInsights: generateInsights(fileType)
      }
      
      setAnalysisResult(mockResult)
      setIsAnalyzing(false)
      toast.success('Media analysis completed!')
    }, 3000)
  }

  const generateTags = (type: string): string[] => {
    const tagSets = {
      image: ['landscape', 'nature', 'high-quality', 'vibrant', 'professional'],
      video: ['entertainment', 'high-definition', 'engaging', 'well-edited', 'cinematic'],
      audio: ['music', 'clear-audio', 'stereo', 'high-bitrate', 'melodic']
    }
    return tagSets[type as keyof typeof tagSets] || []
  }

  const generateDescription = (type: string, filename: string): string => {
    const descriptions = {
      image: `High-quality ${type} file with excellent composition and color balance. Suitable for professional use.`,
      video: `Well-produced ${type} content with good visual quality and engaging content structure.`,
      audio: `Clear ${type} file with good audio quality and balanced sound levels.`
    }
    return descriptions[type as keyof typeof descriptions] || 'Media file analyzed successfully.'
  }

  const generateInsights = (type: string): string[] => {
    const insights = {
      image: [
        'Optimal for social media sharing',
        'Good lighting and composition detected',
        'High engagement potential based on visual elements'
      ],
      video: [
        'Suitable for streaming platforms',
        'Good pacing and visual flow detected',
        'Recommended for entertainment category'
      ],
      audio: [
        'High audio fidelity detected',
        'Suitable for music streaming',
        'Good dynamic range and clarity'
      ]
    }
    return insights[type as keyof typeof insights] || []
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">AI Media Analyzer</h2>
          <p className="text-sm text-dark-400">Analyze and get insights about your media files</p>
        </div>
      </div>

      {/* Upload Area */}
      <div className="glass-effect rounded-xl p-8">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragActive 
              ? 'border-primary-400 bg-primary-500/10' 
              : 'border-dark-600 hover:border-dark-500'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-dark-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                {isDragActive ? 'Drop your file here' : 'Upload media for analysis'}
              </h3>
              <p className="text-dark-400">
                Supports images, videos, and audio files up to 100MB
              </p>
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm text-dark-500">
              <div className="flex items-center space-x-1">
                <Image className="w-4 h-4" />
                <span>Images</span>
              </div>
              <div className="flex items-center space-x-1">
                <Video className="w-4 h-4" />
                <span>Videos</span>
              </div>
              <div className="flex items-center space-x-1">
                <Music className="w-4 h-4" />
                <span>Audio</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-white">Analyzing your media...</h3>
              <p className="text-sm text-dark-400">AI is processing and extracting insights</p>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="w-full bg-dark-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse w-2/3"></div>
            </div>
            <div className="flex justify-between text-xs text-dark-400">
              <span>Processing...</span>
              <span>67%</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Overview */}
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                analysisResult.type === 'image' ? 'bg-blue-500' :
                analysisResult.type === 'video' ? 'bg-red-500' :
                'bg-green-500'
              }`}>
                {analysisResult.type === 'image' && <Image className="w-6 h-6 text-white" />}
                {analysisResult.type === 'video' && <Video className="w-6 h-6 text-white" />}
                {analysisResult.type === 'audio' && <Music className="w-6 h-6 text-white" />}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Analysis Complete</h3>
                <p className="text-dark-400">{analysisResult.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-400">{analysisResult.confidence}%</div>
                <div className="text-xs text-dark-400">Confidence</div>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-dark-800 rounded-lg p-3 text-center">
                <div className="text-sm font-medium text-white">{analysisResult.metadata.format}</div>
                <div className="text-xs text-dark-400">Format</div>
              </div>
              <div className="bg-dark-800 rounded-lg p-3 text-center">
                <div className="text-sm font-medium text-white">{analysisResult.metadata.size}</div>
                <div className="text-xs text-dark-400">Size</div>
              </div>
              {analysisResult.metadata.duration && (
                <div className="bg-dark-800 rounded-lg p-3 text-center">
                  <div className="text-sm font-medium text-white">{analysisResult.metadata.duration}</div>
                  <div className="text-xs text-dark-400">Duration</div>
                </div>
              )}
              {analysisResult.metadata.resolution && (
                <div className="bg-dark-800 rounded-lg p-3 text-center">
                  <div className="text-sm font-medium text-white">{analysisResult.metadata.resolution}</div>
                  <div className="text-xs text-dark-400">Resolution</div>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-white mb-2">Detected Tags</h4>
              <div className="flex flex-wrap gap-2">
                {analysisResult.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="w-5 h-5 text-purple-400" />
              <h4 className="text-lg font-medium text-white">AI Insights</h4>
            </div>
            <div className="space-y-3">
              {analysisResult.aiInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p className="text-dark-300 text-sm">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default MediaAnalyzer
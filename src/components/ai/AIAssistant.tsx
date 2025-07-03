import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Mic, MicOff, Send, Sparkles, Brain, Zap } from 'lucide-react'
import { useAppStore } from '../../store/appStore'
import toast from 'react-hot-toast'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  suggestions?: string[]
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI assistant. I can help you find content, suggest downloads, analyze media, and optimize your experience. What would you like to do?",
      timestamp: new Date(),
      suggestions: [
        "Find trending videos",
        "Analyze my downloads",
        "Suggest music based on my taste",
        "Help me organize my library"
      ]
    }
  ])
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const { downloads, searchHistory, favorites } = useAppStore()

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(content)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): { content: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase()
    
    if (input.includes('trending') || input.includes('popular')) {
      return {
        content: "Based on current trends, I recommend checking out tech reviews, music videos, and educational content. These are performing well across platforms right now.",
        suggestions: ["Show me tech videos", "Find popular music", "Educational content"]
      }
    }
    
    if (input.includes('analyze') || input.includes('downloads')) {
      return {
        content: `I've analyzed your ${downloads.length} downloads. You seem to prefer high-quality content and have a diverse taste. Your most active platform is YouTube, and you download mostly during evening hours.`,
        suggestions: ["Optimize storage", "Download recommendations", "Usage patterns"]
      }
    }
    
    if (input.includes('music') || input.includes('song')) {
      return {
        content: "Based on your listening history, I suggest exploring indie rock and electronic music. I can also help you discover new artists similar to your favorites.",
        suggestions: ["Find similar artists", "Create playlist", "Download music"]
      }
    }
    
    return {
      content: "I understand you're looking for help. I can assist with content discovery, download optimization, media analysis, and personalized recommendations. What specific task would you like help with?",
      suggestions: ["Content discovery", "Download help", "Media analysis", "Recommendations"]
    }
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setInput("Find me some trending videos")
        setIsListening(false)
        toast.success("Voice input captured!")
      }, 2000)
    }
  }

  return (
    <>
      {/* AI Assistant Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: isOpen ? "0 0 0 0 rgba(168, 85, 247, 0.4)" : "0 0 0 10px rgba(168, 85, 247, 0.4)"
        }}
        transition={{ 
          boxShadow: { duration: 1.5, repeat: Infinity, repeatType: "reverse" }
        }}
      >
        <Bot className="w-6 h-6 text-white" />
      </motion.button>

      {/* AI Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed top-0 right-0 w-96 h-full bg-dark-900/95 backdrop-blur-xl border-l border-dark-700 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-dark-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Assistant</h3>
                  <p className="text-xs text-dark-400">Powered by Advanced ML</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
              >
                <span className="text-dark-400">×</span>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-dark-800 text-dark-100'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    {message.suggestions && (
                      <div className="mt-2 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSendMessage(suggestion)}
                            className="block w-full text-left text-xs p-2 bg-dark-700 hover:bg-dark-600 rounded transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-dark-800 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-dark-700">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(input)}
                    placeholder="Ask me anything..."
                    className="w-full input-field pr-10"
                  />
                  <button
                    onClick={toggleVoiceInput}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded ${
                      isListening ? 'text-red-400' : 'text-dark-400 hover:text-white'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  onClick={() => handleSendMessage(input)}
                  disabled={!input.trim()}
                  className="p-2 bg-primary-500 hover:bg-primary-600 disabled:bg-dark-700 disabled:text-dark-400 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AIAssistant
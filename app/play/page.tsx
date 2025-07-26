'use client'

import { useState, useRef, useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Send, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  type: 'user' | 'system' | 'narrative'
  content: string
  timestamp: Date
}

export default function PlayPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'narrative',
      content: 'Welcome to Berkeley World. You find yourself standing at the edge of reality, where the void meets infinite possibility. The air shimmers with potential, and you sense that your words have power here. What do you wish to do?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: userMessage.content }),
      })

      const data = await response.json()
      
      const narrativeMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'narrative',
        content: data.narrative,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, narrativeMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: 'The void flickers momentarily. Something went wrong with the connection to the world. Try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const getMessageStyle = (type: string) => {
    switch (type) {
      case 'user':
        return 'bg-blue-600/20 border-blue-500/30 text-blue-100'
      case 'system':
        return 'bg-red-600/20 border-red-500/30 text-red-100'
      default:
        return 'bg-slate-700/50 border-slate-600/30 text-slate-100'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold text-white">Berkeley World</h1>
              <p className="text-sm text-slate-400">Your story awaits...</p>
            </div>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Game area */}
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`rounded-lg border p-4 ${getMessageStyle(message.type)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-medium uppercase tracking-wide opacity-70">
                    {message.type === 'user' ? 'You' : message.type === 'system' ? 'System' : 'World'}
                  </span>
                  <span className="text-xs opacity-50">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-700/50 border border-slate-600/30 rounded-lg p-4"
            >
              <div className="flex items-center space-x-2 text-slate-300">
                <div className="animate-spin w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full"></div>
                <span className="text-sm opacity-70">The world contemplates your action...</span>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-md p-6">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What do you do? Speak your intent into the void..."
              disabled={isLoading}
              className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-xs text-slate-500 mt-2 text-center">
            Tip: Describe your actions naturally. The AI understands intent, not just commands.
          </p>
        </div>
      </div>
    </div>
  )
}
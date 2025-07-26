import { SignUpButton, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export function HeroSection() {
  const { isSignedIn } = useUser()
  const navigate = useNavigate()

  const handleEnterWorld = () => {
    if (isSignedIn) {
      navigate('/game')
    } else {
      // Show sign up modal for non-authenticated users
      document.querySelector('[data-clerk-sign-up]')?.click()
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/50 border border-gray-600/30 text-gray-300 text-sm backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Infinite Universe
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
            An Infinite World,{' '}
            <span className="bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
              Written with You
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            Where AI is the Game Master, and your words shape reality. 
            The ultimate fusion of TRPG freedom and MMO scale.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            {isSignedIn ? (
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 group backdrop-blur-sm"
                onClick={handleEnterWorld}
              >
                Enter the World
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <SignUpButton mode="modal">
                <Button size="lg" className="text-lg px-8 py-4 group backdrop-blur-sm" data-clerk-sign-up>
                  Enter the World
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </SignUpButton>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
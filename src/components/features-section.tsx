import { Brain, Users, Map, Zap } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'TRPG Freedom',
    description: 'Say Anything, Do Anything. No predefined actions. Our AI interprets your intent and creates meaningful consequences.',
    color: 'from-gray-400 to-gray-300'
  },
  {
    icon: Users,
    title: 'MMO Social',
    description: 'A Shared World. Encounter other players, form factions, build communities, or forge your own path in solitude.',
    color: 'from-gray-500 to-gray-400'
  },
  {
    icon: Map,
    title: 'Roguelike Discovery',
    description: 'Endless Exploration. The world generates as you explore. No two journeys are the same, no limits to discovery.',
    color: 'from-gray-600 to-gray-500'
  },
  {
    icon: Zap,
    title: 'AI-Powered Emergence',
    description: 'A Living World. The story is not pre-written; it emerges from your actions, decisions, and interactions.',
    color: 'from-gray-700 to-gray-600'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            A New Kind of Universe
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the convergence of storytelling technologies that creates something entirely new
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-gray-500/5 to-gray-400/5"></div>
              
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} mb-6`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-gray-200 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
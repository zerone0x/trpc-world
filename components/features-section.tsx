'use client'

import { motion } from 'framer-motion'
import { Brain, Users, Map, Zap } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'TRPG Freedom',
    description: 'Say Anything, Do Anything. No predefined actions. Our AI interprets your intent and creates meaningful consequences.',
    color: 'from-blue-400 to-cyan-400'
  },
  {
    icon: Users,
    title: 'MMO Social',
    description: 'A Shared World. Encounter other players, form factions, build communities, or forge your own path in solitude.',
    color: 'from-purple-400 to-pink-400'
  },
  {
    icon: Map,
    title: 'Roguelike Discovery',
    description: 'Endless Exploration. The world generates as you explore. No two journeys are the same, no limits to discovery.',
    color: 'from-green-400 to-emerald-400'
  },
  {
    icon: Zap,
    title: 'AI-Powered Emergence',
    description: 'A Living World. The story is not pre-written; it emerges from your actions, decisions, and interactions.',
    color: 'from-orange-400 to-red-400'
  }
]

export function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section id="features" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            A New Kind of Universe
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Experience the convergence of storytelling technologies that creates something entirely new
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>
              
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} mb-6`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors">
                {feature.title}
              </h3>

              <p className="text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "What is Berkeley World?",
    answer: "Berkeley World is a groundbreaking text-based game that combines the freedom of tabletop RPGs, the social aspects of MMORPGs, and the endless discovery of roguelike games. It's powered by advanced AI that acts as your Game Master, creating an infinite, reactive universe where your words and actions truly matter."
  },
  {
    question: "How does the AI work?",
    answer: "We use state-of-the-art large language models that have been specifically trained to understand narrative context, player intent, and world consistency. The AI Game Master doesn't just respond to your actions—it remembers your history, understands consequences, and creates emergent storylines that adapt to your choices."
  },
  {
    question: "Is it free to play?",
    answer: "Yes, Berkeley World will be free to play with full access to the core game experience. We may introduce optional cosmetic items or premium features in the future, but the infinite world and all gameplay mechanics will always remain accessible to everyone."
  },
  {
    question: "What platforms will it be available on?",
    answer: "Berkeley World is a web-based game accessible through any modern browser on desktop, tablet, or mobile devices. No downloads or installations required—just create an account and start exploring."
  },
  {
    question: "Can I play with friends?",
    answer: "Absolutely! While you can explore solo, Berkeley World truly shines as a social experience. Form parties, build guilds, establish settlements, or even create entire civilizations with other players. The AI adapts to group dynamics and creates collaborative storylines."
  },
  {
    question: "How do I get started?",
    answer: "Simply sign up for an account and you'll be dropped into the world with a brief introduction. There are no complex tutorials—just start typing what you want to do. The AI will guide you naturally as you learn the ropes of this infinite universe."
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 bg-slate-800/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-300">
            Everything you need to know about Berkeley World
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-700/30 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-slate-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
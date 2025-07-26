import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Berkeley World - An Infinite Universe',
  description: 'Where AI is the Game Master, and your words shape reality. The ultimate fusion of TRPG freedom and MMO scale.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
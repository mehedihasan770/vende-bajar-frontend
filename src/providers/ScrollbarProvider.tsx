'use client'

import { useEffect } from 'react'

export default function ScrollbarProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      // Add class when scrolling starts
      if (!document.body.classList.contains('is-scrolling')) {
        document.body.classList.add('is-scrolling')
      }
      
      clearTimeout(scrollTimeout)
      
      // Remove class after 1 second of no scrolling
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling')
      }, 1000)
    }

    // Capture phase so it catches scrolling on ANY scrollable container inside the page
    window.addEventListener('scroll', handleScroll, true)

    return () => {
      window.removeEventListener('scroll', handleScroll, true)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return <>{children}</>
}

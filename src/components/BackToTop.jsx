import { useEffect, useState } from 'react'
import { scrollToTop } from '../lib/motion.js'

/**
 * ---------------------------------------------------------------------------
 * BACK TO TOP
 * ---------------------------------------------------------------------------
 * Fixed to the lower right for the whole page, so wherever the reader has got
 * to, the way back is in the same place. It appears once the hero is behind
 * them — offering it while the top of the page is still on screen would be
 * offering to do nothing.
 *
 * The ring is the read position, which is the second thing this control is
 * for: on a page this long, "how much is left" is a real question.
 * ---------------------------------------------------------------------------
 */

const R = 21
const CIRCUMFERENCE = 2 * Math.PI * R

export default function BackToTop() {
  const [progress, setProgress] = useState(0)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const y = window.scrollY
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0)
      setShown(y > window.innerHeight * 0.85)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      // Hidden from the tab order while invisible, so it cannot be focused
      // where it cannot be seen.
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      className="group fixed bottom-5 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-ink/12 bg-ivory-lift/90 text-ink shadow-[0_10px_30px_-12px_rgba(36,28,22,0.55)] backdrop-blur-sm transition-[opacity,transform,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-clay/50 md:bottom-8 md:right-8 md:h-14 md:w-14"
      style={{
        opacity: shown ? 1 : 0,
        visibility: shown ? 'visible' : 'hidden',
        transform: shown ? 'none' : 'translate3d(0, 14px, 0)',
      }}
    >
      <svg viewBox="0 0 48 48" aria-hidden className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="24" cy="24" r={R} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.14" />
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          className="text-clay"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>

      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="relative h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M12 19V6M6 12l6-6 6 6" />
      </svg>
    </button>
  )
}

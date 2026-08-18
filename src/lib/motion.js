import { useEffect, useRef, useState } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Lenis owns the scroll position while it is running, and it will pull the
 * page back if anything else sets `scrollTop` underneath it. So the instance
 * is held here and every programmatic scroll on the site goes through
 * `scrollToTop`, which asks Lenis when Lenis is present and falls back to the
 * native call when it is not (reduced motion, or before the chunk loads).
 */
let lenisInstance = null

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.4 })
    return
  }
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

/**
 * Locks background scrolling behind a full-screen dialog (modal, lightbox,
 * mobile menu). `document.body.style.overflow = 'hidden'` alone is not
 * enough: Lenis drives scroll itself via wheel/touch listeners, so it never
 * consults the body's `overflow` and happily keeps scrolling the page
 * underneath a dialog sitting on top of it — a wheel turn over the dialog
 * scrolled the page behind it instead of the dialog's own content.
 *
 * Calling `lenis.stop()` is not the fix: Lenis still calls `preventDefault`
 * on every wheel event while stopped, which blocks the dialog's own native
 * scroll too, not just the page behind it. The actual mechanism is the
 * `data-lenis-prevent` attribute — Lenis checks for it on the event's
 * composed path *before* touching the event at all, and if present just
 * returns, leaving the browser's native scroll to handle whatever is under
 * the cursor. Every full-screen dialog on the site carries this attribute
 * (see VillaModal, Gallery's lightbox); this hook only needs to keep native
 * page-scroll (keyboard, scrollbar) locked as the fallback for when Lenis
 * isn't running at all (prefers-reduced-motion).
 */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])
}

/**
 * Smooth scroll, installed once for the document.
 *
 * Lenis is loaded lazily so the first paint never waits on it, and it is
 * skipped entirely under prefers-reduced-motion — a user who asked for less
 * movement did not ask for momentum scrolling either.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    let lenis
    let frame

    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.1, wheelMultiplier: 0.9, touchMultiplier: 1.6 })
      lenisInstance = lenis
      // Also exposed in dev so screenshot passes and deep links can drive it.
      if (import.meta.env.DEV) window.__lenis = lenis
      const raf = (time) => {
        lenis.raf(time)
        frame = requestAnimationFrame(raf)
      }
      frame = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(frame)
      lenis?.destroy()
      if (lenisInstance === lenis) lenisInstance = null
    }
  }, [])
}

/**
 * `[ref, shown]` — flips to true the first time the element crosses into view
 * and stays there. Used for every entrance on the page, so the reveal timing
 * is defined in one place rather than per-section.
 */
export function useReveal({ threshold = 0.18, rootMargin = '0px 0px -12% 0px' } = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin])

  return [ref, shown]
}

/**
 * Progress of an element through the viewport, 0 at the moment its top meets
 * the bottom edge and 1 when its bottom leaves the top. Drives the parallax
 * on the chapter figures.
 */
export function useScrollProgress() {
  const ref = useRef(null)
  const [p, setP] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    let frame = 0
    const measure = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const total = window.innerHeight + r.height
      setP(Math.min(1, Math.max(0, (window.innerHeight - r.top) / total)))
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

  return [ref, p]
}

/** Counts to `value` once `run` turns true. Plain numbers only. */
export function useCountUp(value, run, ms = 1100) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!run) return
    if (prefersReducedMotion()) {
      setN(value)
      return
    }
    let frame
    const start = performance.now()
    const tick = (t) => {
      const e = Math.min(1, (t - start) / ms)
      // easeOutExpo — fast arrival, long settle.
      const eased = e === 1 ? 1 : 1 - Math.pow(2, -10 * e)
      setN(value * eased)
      if (e < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, run, ms])

  return n
}

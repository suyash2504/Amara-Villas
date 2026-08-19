import { useCallback, useEffect, useState } from 'react'
import { Reveal, SectionHead } from './Ui.jsx'
import { useScrollLock } from '../lib/motion.js'
import { gallery } from '../data/project.js'

/**
 * ---------------------------------------------------------------------------
 * THE GALLERY
 * ---------------------------------------------------------------------------
 * Six plates in an uneven grid — two tall, four square — so the section reads
 * as a spread rather than a filmstrip. Selecting one opens it full-bleed; the
 * lightbox traps nothing and closes on Escape, on the backdrop, and on the
 * close control, because a viewer should never have to hunt for the way out.
 * ---------------------------------------------------------------------------
 */

/** Which plates run tall. Index-based, because the rhythm is a layout choice. */
const TALL = new Set([0, 4, 8])

export default function Gallery() {
  const [open, setOpen] = useState(null)

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(
    (delta) => setOpen((i) => (i === null ? i : (i + delta + gallery.length) % gallery.length)),
    [],
  )

  useScrollLock(open !== null)

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close, step])

  return (
    <section id="gallery" className="bg-ivory py-24 md:py-32">
      <div className="shell">
        <SectionHead
          index="07"
          label="The Plates"
          title="What the building actually looks like"
          lead="Photographed rather than rendered. The drawings elsewhere on this page explain the decisions; these show the result of them."
        />

        {/* Multi-column rather than grid: the plates are different shapes, and
            a grid row is only as short as its tallest cell — which leaves a
            hole under every short one. Columns pack instead. */}
        <div className="mt-16 columns-2 gap-3 md:columns-3 md:gap-4">
          {gallery.map((plate, i) => (
            <Reveal key={plate.src} delay={(i % 3) * 90} className="mb-3 break-inside-avoid md:mb-4">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className={`group relative block w-full overflow-hidden bg-sand/50 ${
                  TALL.has(i) ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}
                aria-label={`Open plate ${i + 1}: ${plate.caption}`}
              >
                <img
                  src={plate.src}
                  alt={plate.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/70 to-transparent p-4 pt-14 text-left font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ivory opacity-0 transition-opacity duration-600 group-hover:opacity-100"
                >
                  {plate.caption}
                  <span className="shrink-0 opacity-70">{String(i + 1).padStart(2, '0')}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={gallery[open].caption}
          onClick={close}
          data-lenis-prevent
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-espresso/96 p-4 md:p-10"
        >
          <img
            src={gallery[open].src}
            alt={gallery[open].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[78vh] w-auto max-w-full object-contain"
          />

          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-6 flex w-full max-w-3xl items-center justify-between gap-6 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ivory/70"
          >
            <button type="button" onClick={() => step(-1)} className="transition-colors hover:text-clay">
              ← Prev
            </button>
            <p className="text-center text-ivory">{gallery[open].caption}</p>
            <button type="button" onClick={() => step(1)} className="transition-colors hover:text-clay">
              Next →
            </button>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-ivory/25 text-ivory transition-colors hover:border-clay hover:text-clay"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}

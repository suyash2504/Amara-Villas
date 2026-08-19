import { useEffect, useState } from 'react'
import { project, stats, photos } from '../data/project.js'

/**
 * Above the fold, so the entrance is time-based rather than observed —
 * everything fades up on a stagger once the first frame is painted.
 *
 * The standing motion is in the photograph, not the type: the wordmark is set
 * once and left alone, while the image keeps drifting for as long as anyone
 * is looking at it.
 *
 * The one section on the site set dark rather than ivory. The hero photograph
 * is a dusk arrival shot — a lit villa against a darkening sky — and forcing
 * the site's usual light scrim over it would have muddied both. Better to let
 * this one moment be cinematic and resolve into ivory the instant the page
 * moves past it, the way an evening arrival gives way to an ordinary morning.
 */
export default function Hero() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])


  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-espresso text-ivory">
      {/* The one photograph that loads eagerly — it is the LCP element, so it
          is neither lazy nor decoded async. */}
      {/* The motion in this hero lives here, in the photograph, rather than on
          the wordmark: a slow push into the house that never quite arrives.
          Transform-only so it stays on the compositor, and it holds still
          entirely under prefers-reduced-motion. */}
      <img
        src={photos.heroArrival.src}
        alt={photos.heroArrival.alt}
        fetchPriority="high"
        className="hero-drift absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: ready ? 1 : 0,
          transition: 'opacity 1.6s var(--ease-out-soft)',
        }}
      />

      {/* Espresso scrim — heaviest at top and foot where text sits, clearing
          through the middle so the lit villa still reads as the subject. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(27,20,16,0.8) 0%, rgba(27,20,16,0.25) 32%, rgba(27,20,16,0.2) 58%, rgba(27,20,16,0.88) 100%)',
        }}
      />

      <div className="relative flex min-h-[100svh] flex-col justify-between pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="shell">
          <div
            className="flex flex-wrap items-baseline gap-x-6 gap-y-2"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? 'none' : 'translate3d(0,14px,0)',
              transition: 'opacity 1s var(--ease-out-soft) 200ms, transform 1s var(--ease-out-soft) 200ms',
            }}
          >
            <span className="eyebrow text-ivory/55">
              {project.locality}, {project.city}
            </span>
            <span aria-hidden className="hidden h-px w-16 bg-ivory/20 md:block" />
            <span className="eyebrow text-ivory/55">
              {project.reraLabel} {project.rera}
            </span>
          </div>
        </div>

        <div className="shell">
          {/* `font-extralight` (200) rather than the shared display weight:
              at 272px the thin cut is the point, and it is the one place on
              the site big enough to carry it. */}
          {/* Set as one word, not per-letter. The letters used to sit in
              individual `overflow-hidden` masks so they could rise into view,
              but `leading-[0.82]` makes the line box shorter than the glyphs,
              so those masks were shaving the tops and feet off the letters.
              The motion moved to the photograph, so the masks went with it. */}
          <h1
            className="display text-[clamp(4.5rem,19vw,17rem)] font-extralight leading-[0.82] tracking-[0.02em] text-ivory"
            style={{
              opacity: ready ? 1 : 0,
              transition: 'opacity 1.6s var(--ease-out-soft) 300ms',
            }}
          >
            <span className="sr-only">
              {project.name} {project.suffix} — {project.tagline}
            </span>
            <span aria-hidden>{project.name}</span>
          </h1>

          <div
            className="mt-8 flex flex-col gap-6 border-t border-ivory/20 pt-8 md:flex-row md:items-end md:justify-between"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? 'none' : 'translate3d(0,18px,0)',
              transition: 'opacity 1.2s var(--ease-out-soft) 1000ms, transform 1.2s var(--ease-out-soft) 1000ms',
            }}
          >
            <p className="display max-w-md text-[clamp(1.5rem,3vw,2.25rem)] italic text-ivory/85">
              {project.tagline}
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-ivory/70">
              Thirty-two villas along two garden streets. Possession {project.possession}.
            </p>
          </div>
        </div>

        <div className="shell">
          <dl
            className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ivory/20 pt-6 md:grid-cols-4"
            style={{
              opacity: ready ? 1 : 0,
              transition: 'opacity 1.2s var(--ease-out-soft) 1300ms',
            }}
          >
            {stats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-3">
                <dt className="display text-[2rem] leading-none text-ivory">{s.value}</dt>
                <dd className="eyebrow text-ivory/55">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Kept on the right margin rather than centred at the foot, where it
          would sit on top of the stats row on shorter screens. */}
      <a
        href="#statement"
        aria-label="Scroll to the introduction"
        className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 1s var(--ease-out-soft) 1600ms' }}
      >
        <span className="eyebrow text-ivory/55 [writing-mode:vertical-rl]">Scroll</span>
        <span aria-hidden className="relative block h-16 w-px overflow-hidden bg-ivory/20">
          <span className="absolute inset-x-0 top-0 h-5 animate-[drop_2.6s_var(--ease-out-soft)_infinite] bg-clay" />
        </span>
      </a>

      <style>{`
        @keyframes drop { 0% { transform: translateY(-100%) } 60%,100% { transform: translateY(320%) } }

        /* 40s each way, and only 6% of travel — slow and small enough that
           you notice the frame has changed rather than watching it move. */
        @keyframes heroDrift {
          from { transform: scale(1.04) translate3d(0, 0, 0); }
          to   { transform: scale(1.10) translate3d(-1.4%, -1%, 0); }
        }
        .hero-drift {
          transform: scale(1.04);
          animation: heroDrift 40s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-drift { animation: none; transform: scale(1.04); }
        }
      `}</style>
    </section>
  )
}

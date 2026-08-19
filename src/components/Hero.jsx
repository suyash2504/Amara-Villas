import { useEffect, useState } from 'react'
import { project, stats, photos } from '../data/project.js'

/**
 * Above the fold, so the entrance is time-based rather than observed: the
 * letters set themselves one after another while the photograph settles
 * behind them.
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

  const letters = project.name.split('')

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-espresso text-ivory">
      {/* The one photograph that loads eagerly — it is the LCP element, so it
          is neither lazy nor decoded async. */}
      <img
        src={photos.heroArrival.src}
        alt={photos.heroArrival.alt}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: ready ? 1 : 0,
          transform: ready ? 'none' : 'scale(1.06)',
          transition: 'opacity 1.6s var(--ease-out-soft), transform 2.4s var(--ease-out-soft)',
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
          <h1 className="display flex flex-wrap text-[clamp(4.5rem,19vw,17rem)] font-extralight leading-[0.82] tracking-[0.02em] text-ivory">
            <span className="sr-only">
              {project.name} {project.suffix} — {project.tagline}
            </span>
            {letters.map((ch, i) => (
              <span key={i} aria-hidden className="inline-block overflow-hidden">
                <span
                  className="inline-block"
                  style={{
                    opacity: ready ? 1 : 0,
                    transform: ready ? 'none' : 'translate3d(0, 0.85em, 0)',
                    transition: `opacity 1.1s var(--ease-out-soft) ${380 + i * 110}ms, transform 1.4s var(--ease-out-soft) ${380 + i * 110}ms`,
                  }}
                >
                  {ch}
                </span>
              </span>
            ))}
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

      <style>{`@keyframes drop { 0% { transform: translateY(-100%) } 60%,100% { transform: translateY(320%) } }`}</style>
    </section>
  )
}

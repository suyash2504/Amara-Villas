import { project } from '../data/project.js'
import { scrollToTop } from '../lib/motion.js'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-espresso pt-20 pb-10 text-ivory">
      <div className="shell">
        <div className="grid gap-12 border-b border-ivory/12 pb-14 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="display text-5xl tracking-[0.3em]">{project.name}</p>
            <p className="display mt-4 max-w-xs text-xl italic text-ivory/60">{project.tagline}</p>
          </div>

          <div>
            <p className="eyebrow text-ivory/40">Sales lounge</p>
            <address className="mt-4 not-italic text-sm leading-relaxed text-ivory/70">
              {project.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-4 text-sm text-ivory/70">
              <a className="transition-colors hover:text-clay" href={`tel:${project.phone.replace(/\s/g, '')}`}>
                {project.phone}
              </a>
            </p>
          </div>

          <div>
            <p className="eyebrow text-ivory/40">Consultants</p>
            <ul className="mt-4 space-y-2 text-sm text-ivory/70">
              <li>Architecture — {project.architect}</li>
              <li>Landscape — {project.landscape}</li>
              <li>Possession — {project.possession}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ivory/40 md:flex-row md:items-center md:justify-between">
          <p>
            {project.reraLabel} {project.rera}
          </p>
          <p>
            Images and plans are indicative. Areas stated are carpet areas as defined under RERA.
          </p>
          {/* Goes through the same helper as the floating control, so both
              behave identically with Lenis running. */}
          <button type="button" onClick={scrollToTop} className="text-left transition-colors hover:text-clay">
            Back to top
          </button>
        </div>
      </div>

      {/* The wordmark, cropped by the bottom edge — the last thing the page says. */}
      <p
        aria-hidden
        className="display pointer-events-none mt-10 select-none text-center text-[22vw] leading-[0.72] text-ivory/[0.04]"
      >
        {project.name}
      </p>
    </footer>
  )
}

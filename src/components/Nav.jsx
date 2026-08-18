import { useEffect, useState } from 'react'
import { useScrollLock } from '../lib/motion.js'
import { project } from '../data/project.js'

const LINKS = [
  { href: '#statement', label: 'The Idea' },
  { href: '#residences', label: 'Villas' },
  { href: '#plans', label: 'Availability' },
  { href: '#amenities', label: 'Amenities' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#location', label: 'Location' },
]

export default function Nav() {
  const [lifted, setLifted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The menu takes the whole screen on small viewports, so the page behind it
  // must not keep scrolling underneath.
  useScrollLock(open)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          lifted ? 'bg-ivory/85 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div
          className={`shell flex items-center justify-between transition-all duration-700 ${
            lifted ? 'py-4' : 'py-6 md:py-8'
          }`}
        >
          <a
            href="#top"
            className={`group flex items-baseline gap-3 transition-colors duration-500 ${
              lifted ? 'text-ink' : 'text-ivory'
            }`}
          >
            <span className="display text-2xl tracking-[0.3em] leading-none">{project.name}</span>
            <span className={`eyebrow hidden sm:inline ${lifted ? '' : 'text-ivory/60'}`}>{project.suffix}</span>
          </a>

          {/* The hero sits on a dark photograph, so the nav has to read light
              until it lifts onto the ivory backdrop-blur — a fixed dark
              colour here would vanish over the dusk sky. */}
          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`group relative font-mono text-[0.6875rem] uppercase tracking-[0.2em] transition-colors ${
                  lifted ? 'text-ink-soft hover:text-ink' : 'text-ivory/75 hover:text-ivory'
                }`}
              >
                {l.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-clay transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href="#enquire"
              className={`hidden border px-6 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] transition-colors duration-500 hover:border-clay hover:text-clay sm:inline-block ${
                lifted ? 'border-ink/25' : 'border-ivory/40 text-ivory'
              }`}
            >
              Enquire
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
            >
              <span
                aria-hidden
                className={`block h-px w-6 transition-transform duration-500 ${
                  open ? 'translate-y-[3.5px] rotate-45 bg-ink' : lifted ? 'bg-ink' : 'bg-ivory'
                }`}
              />
              <span
                aria-hidden
                className={`block h-px w-6 transition-transform duration-500 ${
                  open ? '-translate-y-[3.5px] -rotate-45 bg-ink' : lifted ? 'bg-ink' : 'bg-ivory'
                }`}
              />
            </button>
          </div>
        </div>
        <div className={`rule transition-opacity duration-700 ${lifted ? 'opacity-100' : 'opacity-0'}`} />
      </header>

      {/* Mobile menu */}
      <div
        data-lenis-prevent
        className={`fixed inset-0 z-40 bg-ivory transition-[opacity,visibility] duration-600 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="shell flex h-full flex-col justify-center gap-2">
          {[...LINKS, { href: '#enquire', label: 'Enquire' }].map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="display border-b border-ink/10 py-4 text-4xl"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'none' : 'translate3d(0,20px,0)',
                transition: `opacity 700ms var(--ease-out-soft) ${120 + i * 60}ms, transform 700ms var(--ease-out-soft) ${120 + i * 60}ms`,
              }}
            >
              {l.label}
            </a>
          ))}
          <p className="eyebrow mt-10">
            {project.phone} — {project.email}
          </p>
        </div>
      </div>
    </>
  )
}

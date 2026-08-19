import { Reveal, SectionHead } from './Ui.jsx'
import { amenities } from '../data/project.js'

/**
 * Drawn glyphs rather than an icon set — but drawn as objects, not as plans.
 *
 * The first version of these was eight plan views, which was a nice idea and a
 * bad drawing: a court, a pool, a gym and a terrace all reduce to "a rectangle
 * with something inside it", so at icon size the eight of them shared one
 * silhouette and none of them read. These are the things themselves — a tree,
 * a dumbbell, a bell — chosen so no two have the same outline.
 */
const GLYPHS = {
  court: (
    <>
      <circle cx="24" cy="17" r="11" />
      <path d="M24 42V22" />
      <path d="M24 30l-6.5-5.5M24 34.5l6.5-5.5" />
    </>
  ),
  pool: (
    <>
      <rect x="6" y="15" width="36" height="20" rx="3" />
      <path d="M10 22.5c2.3-2.3 4.7-2.3 7 0s4.7 2.3 7 0 4.7-2.3 7 0 4.7 2.3 7 0" />
      <path d="M10 29.5c2.3-2.3 4.7-2.3 7 0s4.7 2.3 7 0 4.7-2.3 7 0 4.7 2.3 7 0" opacity="0.55" />
    </>
  ),
  gym: (
    <>
      <path d="M15 24h18" />
      <rect x="9" y="16.5" width="6" height="15" rx="1.5" />
      <rect x="33" y="16.5" width="6" height="15" rx="1.5" />
      <path d="M5.5 20v8M42.5 20v8" />
    </>
  ),
  library: (
    <>
      <path d="M24 15.5v23" />
      <path d="M24 15.5c-5-2.8-11-2.8-16-1v23c5-1.8 11-1.8 16 1" />
      <path d="M24 15.5c5-2.8 11-2.8 16-1v23c-5-1.8-11-1.8-16 1" />
    </>
  ),
  dining: (
    <>
      <circle cx="24" cy="24" r="10" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2 + Math.PI / 8
        return (
          <line
            key={i}
            x1={24 + Math.cos(a) * 13.5}
            y1={24 + Math.sin(a) * 13.5}
            x2={24 + Math.cos(a) * 17.5}
            y2={24 + Math.sin(a) * 17.5}
          />
        )
      })}
    </>
  ),
  terrace: (
    <>
      <path d="M7 25a17 17 0 0 1 34 0z" />
      <path d="M24 25v17" />
      <path d="M7 25c3.5-3.5 7-3.5 10.5 0s7 3.5 10.5 0 7-3.5 10.5 0" opacity="0.55" />
    </>
  ),
  kids: (
    <>
      <path d="M11 40l13-26 13 26" />
      <path d="M16.5 25h15" />
      <path d="M20 25v9M28 25v9" opacity="0.7" />
      <path d="M18.5 34h11" />
    </>
  ),
  concierge: (
    <>
      <path d="M12 31a12 12 0 0 1 24 0z" />
      <rect x="7.5" y="31" width="33" height="4.5" rx="1.5" />
      <circle cx="24" cy="15.5" r="2.2" />
    </>
  ),
}

export default function Amenities() {
  return (
    <section id="amenities" className="bg-ivory py-24 md:py-32">
      <div className="shell">
        <SectionHead
          index="06"
          label="Shared ground"
          title="Eight rooms held in common"
          lead="Nothing here is a rendering of a lifestyle. It is a list of rooms, their orientation and the hours they are useful."
        />

        <ul className="mt-16 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((a, i) => (
            <li key={a.name} className="bg-ivory">
              <Reveal delay={(i % 4) * 80} className="h-full">
                <div className="group flex h-full flex-col bg-ivory px-7 pt-8 pb-9 transition-colors duration-700 hover:bg-sand/50">
                  <span className="eyebrow">{String(i + 1).padStart(2, '0')}</span>
                  <svg
                    viewBox="0 0 48 48"
                    aria-hidden
                    className="mt-6 h-16 w-16 text-ink transition-colors duration-700 group-hover:text-clay"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {GLYPHS[a.glyph]}
                  </svg>
                  {/* The title block reserves two lines so every note in the
                      row starts on the same baseline, however long the name. */}
                  <h3 className="display mt-7 min-h-[2.4em] text-[1.5rem] leading-[1.2]">{a.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{a.note}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

import { Reveal, SectionHead } from './Ui.jsx'
import { amenities } from '../data/project.js'

/**
 * Drawn glyphs rather than an icon set: eight marks in one weight, each one
 * a plan or a section of the thing it names, so the row reads as a continuous
 * drawing instead of a sticker sheet.
 */
const GLYPHS = {
  court: (
    <>
      <rect x="7" y="7" width="34" height="34" />
      <circle cx="24" cy="24" r="9.5" />
      <circle cx="24" cy="24" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  pool: (
    <>
      <rect x="7" y="13" width="34" height="22" rx="1.5" />
      <path d="M7 20.5h34M7 27.5h34" strokeDasharray="3 3" opacity="0.6" />
      <path d="M11 13v22M37 13v22" opacity="0.35" />
    </>
  ),
  gym: (
    <>
      <rect x="7" y="10" width="34" height="28" />
      <path d="M24 10v28" opacity="0.5" />
      {/* Weights on one side, a mat on the other */}
      <path d="M11 24h9M11 21v6M20 21v6" />
      <rect x="28" y="18" width="9" height="12" rx="1" opacity="0.6" />
    </>
  ),
  library: (
    <>
      <rect x="7" y="7" width="34" height="34" />
      <path d="M11 11v26M37 11v26" opacity="0.45" />
      <path d="M11 15h4M11 21h4M11 27h4M33 15h4M33 21h4M33 27h4" opacity="0.7" />
      <circle cx="24" cy="26" r="6" />
    </>
  ),
  dining: (
    <>
      <circle cx="24" cy="24" r="11" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        return (
          <line
            key={i}
            x1={24 + Math.cos(a) * 14}
            y1={24 + Math.sin(a) * 14}
            x2={24 + Math.cos(a) * 17.5}
            y2={24 + Math.sin(a) * 17.5}
            opacity="0.65"
          />
        )
      })}
    </>
  ),
  terrace: (
    <>
      <rect x="7" y="10" width="34" height="28" />
      <rect x="7" y="10" width="34" height="5" opacity="0.5" />
      <rect x="7" y="33" width="34" height="5" opacity="0.5" />
      <circle cx="19" cy="24" r="4.5" />
      <circle cx="31" cy="24" r="3" opacity="0.6" />
    </>
  ),
  kids: (
    <>
      <rect x="7" y="10" width="34" height="28" />
      <circle cx="22" cy="25" r="8.5" strokeDasharray="2.5 3" />
      <path d="M41 10a20 20 0 0 0-20 20" opacity="0.5" />
    </>
  ),
  concierge: (
    <>
      <path d="M9 30h30" />
      <rect x="14" y="30" width="20" height="7" opacity="0.55" />
      <path d="M9 30a15 15 0 0 1 30 0" strokeDasharray="3 3" opacity="0.45" />
      <circle cx="24" cy="20" r="3.5" />
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
            <li key={a.name}>
              <Reveal delay={(i % 4) * 80}>
                <div className="group h-full bg-ivory p-7 transition-colors duration-700 hover:bg-sand/50">
                  <svg
                    viewBox="0 0 48 48"
                    aria-hidden
                    className="h-12 w-12 text-ink transition-colors duration-700 group-hover:text-clay"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    {GLYPHS[a.glyph]}
                  </svg>
                  <h3 className="display mt-8 text-[1.625rem] leading-tight">{a.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{a.note}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

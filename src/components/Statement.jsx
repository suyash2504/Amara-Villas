import { RevealWords, Reveal, Eyebrow } from './Ui.jsx'
import { statement, project } from '../data/project.js'

/**
 * The turn from image to argument. One paragraph, set large, with the site
 * plan drawn beside it at hairline weight so the claim and the drawing that
 * proves it are read together.
 */
export default function Statement() {
  return (
    <section id="statement" className="relative bg-ivory py-28 md:py-40">
      <div className="shell grid gap-16 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-24">
        <div>
          <Reveal>
            <Eyebrow>The proposition</Eyebrow>
          </Reveal>
          <p className="display mt-10 text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.12]">
            <RevealWords text={statement} />
          </p>
          <Reveal delay={200}>
            <div className="mt-12 flex flex-wrap gap-x-12 gap-y-4">
              <div>
                <p className="eyebrow">Architecture</p>
                <p className="mt-1 text-sm text-ink-soft">{project.architect}</p>
              </div>
              <div>
                <p className="eyebrow">Landscape</p>
                <p className="mt-1 text-sm text-ink-soft">{project.landscape}</p>
              </div>
              <div>
                <p className="eyebrow">Possession</p>
                <p className="mt-1 text-sm text-ink-soft">{project.possession}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140} className="justify-self-center lg:justify-self-end">
          <SitePlan />
        </Reveal>
      </div>
    </section>
  )
}

/**
 * The masterplan at its simplest: two streets of individual plots facing a
 * shared green, with the clubhouse at the head. Drawn rather than rendered,
 * and drawn schematically rather than to a literal plot count — eight
 * footprints per street standing in for sixteen, the way an architect's
 * diagram compresses a repeat without lying about the pattern.
 */
function SitePlan() {
  const plotsPerStreet = 8
  const plotH = 18
  const gap = 4.5
  const top = 96

  const plot = (x, i) => (
    <rect key={i} x={x} y={top + i * (plotH + gap)} width={90} height={plotH} />
  )

  return (
    <svg
      viewBox="0 0 320 380"
      className="h-auto w-[16rem] md:w-[19rem]"
      role="img"
      aria-label="Masterplan: two streets of individual villa plots facing a shared planted green, with the clubhouse and pool at the head of the streets."
    >
      <g fill="none" stroke="currentColor" className="text-ink" strokeWidth="0.75">
        {/* Plot boundary — dashed, as a boundary is drawn on a survey. */}
        <rect x="10" y="10" width="300" height="360" strokeDasharray="6 5" opacity="0.35" />

        {/* Rain Tree Street, west column */}
        <g opacity="0.9" strokeWidth="1.1">
          {Array.from({ length: plotsPerStreet }).map((_, i) => plot(30, i))}
        </g>

        {/* Neem Street, east column */}
        <g opacity="0.9" strokeWidth="1.1">
          {Array.from({ length: plotsPerStreet }).map((_, i) => plot(200, i))}
        </g>

        {/* The green, running between both streets */}
        <rect x="130" y="90" width="60" height="230" opacity="0.4" strokeDasharray="3 4" />

        {/* Trees along the green */}
        <circle cx="160" cy="150" r="18" opacity="0.45" />
        <circle cx="160" cy="150" r="2.4" fill="currentColor" stroke="none" opacity="0.7" />
        <circle cx="160" cy="230" r="15" opacity="0.45" />
        <circle cx="160" cy="230" r="2.4" fill="currentColor" stroke="none" opacity="0.7" />
        <circle cx="160" cy="290" r="13" opacity="0.4" />
        <circle cx="160" cy="290" r="2.2" fill="currentColor" stroke="none" opacity="0.65" />

        {/* Clubhouse and pool, at the head of both streets */}
        <rect x="60" y="28" width="200" height="34" className="text-clay" stroke="currentColor" opacity="0.85" />

        {/* Entry, bottom centre */}
        <path d="M160 366 V330" strokeDasharray="4 4" opacity="0.4" />
      </g>

      <g className="fill-current text-muted" fontSize="6.5" fontFamily="var(--font-mono)" letterSpacing="1.3">
        <text x="30" y="88">RAIN TREE STREET</text>
        <text x="200" y="88">NEEM STREET</text>
        <text x="160" y="216" textAnchor="middle">THE GREEN</text>
        <text x="160" y="48" textAnchor="middle">CLUBHOUSE + POOL</text>
        <text x="160" y="378" textAnchor="middle">GATE</text>
      </g>

      {/* North point */}
      <g transform="translate(292 348)" className="text-muted">
        <path d="M0 -14 L4 4 L0 0 L-4 4 Z" fill="currentColor" opacity="0.8" />
        <text x="0" y="14" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" className="fill-current">
          N
        </text>
      </g>
    </svg>
  )
}

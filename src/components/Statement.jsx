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
 * The masterplan, drawn so it can actually be read.
 *
 * The first version was sixteen empty outlined bars in two columns, which is
 * how a surveyor writes down plot boundaries and how nobody else understands
 * anything — it looked like ruled lines. What makes a masterplan legible is
 * the difference between built and unbuilt: houses are poched solid, the
 * streets are drawn as surfaces you could walk down, and the green is planted
 * rather than merely outlined. All thirty-two plots are drawn, small, rather
 * than a handful standing in for the rest — someone will count them.
 */
function SitePlan() {
  // The real count, not a stand-in: sixteen plots a street, thirty-two in
  // all. Drawn small rather than approximated, because someone will count.
  const ROWS = 16
  const plotH = 13
  const gapY = 3
  const top = 96

  const rowY = (i) => top + i * (plotH + gapY)
  const lastY = rowY(ROWS - 1) + plotH

  return (
    <svg
      viewBox="0 0 360 420"
      className="h-auto w-[19rem] md:w-[24rem]"
      role="img"
      aria-label="Masterplan: two streets of individual villa plots facing a shared planted green, with the clubhouse and pool at the head and the gate at the foot."
    >
      {/* Site boundary — dashed, the way a boundary is drawn on a survey. */}
      <rect
        x="12"
        y="12"
        width="336"
        height="396"
        fill="none"
        className="text-ink"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeDasharray="6 5"
        opacity="0.3"
      />

      {/* The green, and the two street surfaces either side of it. Filled
          rather than outlined, so the space between the houses reads as
          ground rather than as more boxes. */}
      <g className="text-ink">
        <rect x="134" y="84" width="92" height={lastY - 84 + 18} fill="currentColor" opacity="0.05" />
        <rect x="104" y="84" width="30" height={lastY - 84 + 18} fill="currentColor" opacity="0.09" />
        <rect x="226" y="84" width="30" height={lastY - 84 + 18} fill="currentColor" opacity="0.09" />
      </g>

      {/* Street centre lines */}
      <g className="text-ink" stroke="currentColor" strokeWidth="0.7" strokeDasharray="5 6" opacity="0.35">
        <line x1="119" y1="92" x2="119" y2={lastY + 14} />
        <line x1="241" y1="92" x2="241" y2={lastY + 14} />
      </g>

      {/* Plots. Each is a boundary with a house poched inside it, set back
          from the street so the front garden and porch read as open ground. */}
      <g className="text-ink">
        {Array.from({ length: ROWS }).map((_, i) => (
          <g key={`l${i}`}>
            <rect
              x="24"
              y={rowY(i)}
              width="80"
              height={plotH}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              opacity="0.45"
            />
            <rect x="30" y={rowY(i) + 2.5} width="44" height="8" fill="currentColor" opacity="0.6" />
          </g>
        ))}
        {Array.from({ length: ROWS }).map((_, i) => (
          <g key={`r${i}`}>
            <rect
              x="256"
              y={rowY(i)}
              width="80"
              height={plotH}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              opacity="0.45"
            />
            <rect x="286" y={rowY(i) + 2.5} width="44" height="8" fill="currentColor" opacity="0.6" />
          </g>
        ))}
      </g>

      {/* Rain trees down the green */}
      <g className="text-clay">
        {[
          [180, 134, 16],
          [180, 200, 20],
          [180, 268, 16],
          [180, 324, 13],
        ].map(([cx, cy, r]) => (
          <g key={cy}>
            <circle cx={cx} cy={cy} r={r} fill="currentColor" opacity="0.16" />
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
              opacity="0.5"
            />
            <circle cx={cx} cy={cy} r="1.8" fill="currentColor" opacity="0.7" />
          </g>
        ))}
      </g>

      {/* Clubhouse and pool at the head of both streets */}
      <g className="text-clay">
        <rect x="104" y="30" width="122" height="42" fill="currentColor" opacity="0.2" />
        <rect
          x="104"
          y="30"
          width="122"
          height="42"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity="0.85"
        />
        <rect x="240" y="38" width="72" height="26" fill="currentColor" opacity="0.14" />
        <rect
          x="240"
          y="38"
          width="72"
          height="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.6"
        />
        <path
          d="M246 51c4-3.5 8-3.5 12 0s8 3.5 12 0 8-3.5 12 0 8 3.5 12 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          opacity="0.55"
        />
      </g>

      {/* The gate, and the drive up to it */}
      <g className="text-ink">
        <rect x="150" y={lastY + 18} width="60" height="34" fill="currentColor" opacity="0.09" />
        <line
          x1="180"
          y1={lastY + 18}
          x2="180"
          y2={lastY + 52}
          stroke="currentColor"
          strokeWidth="0.7"
          strokeDasharray="5 6"
          opacity="0.35"
        />
        <path
          d={`M150 ${lastY + 18} h14 M196 ${lastY + 18} h14`}
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.7"
          fill="none"
        />
      </g>

      <g className="fill-current text-muted" fontSize="7" fontFamily="var(--font-mono)" letterSpacing="1.3">
        <text x="24" y="88">RAIN TREE STREET</text>
        <text x="336" y="88" textAnchor="end">NEEM STREET</text>
        <text x="180" y="56" textAnchor="middle" className="fill-current text-clay">CLUBHOUSE</text>
        <text x="276" y="55" textAnchor="middle" className="fill-current text-clay">POOL</text>
        <text x="180" y={lastY + 66} textAnchor="middle">GATE</text>
      </g>

      {/* Rotated so it labels the strip it names without crossing the trees. */}
      <text
        transform={`translate(146 ${top + 96}) rotate(-90)`}
        className="fill-current text-muted"
        fontSize="7"
        fontFamily="var(--font-mono)"
        letterSpacing="1.6"
      >
        THE GREEN
      </text>

      {/* Scale bar and north point — the two marks that make a drawing a plan. */}
      <g className="text-muted" stroke="currentColor" strokeWidth="0.8" opacity="0.65">
        <line x1="24" y1="398" x2="94" y2="398" />
        <line x1="24" y1="394" x2="24" y2="402" />
        <line x1="59" y1="395" x2="59" y2="401" />
        <line x1="94" y1="394" x2="94" y2="402" />
      </g>
      <text x="24" y="392" className="fill-current text-muted" fontSize="6.5" fontFamily="var(--font-mono)" letterSpacing="1.2">
        0        20M
      </text>

      <g transform="translate(330 396)" className="text-muted">
        <path d="M0 -13 L4 3 L0 -0.5 L-4 3 Z" fill="currentColor" opacity="0.8" />
        <text x="0" y="13" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" className="fill-current">
          N
        </text>
      </g>
    </svg>
  )
}

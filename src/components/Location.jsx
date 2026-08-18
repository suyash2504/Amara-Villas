import { useState } from 'react'
import { Reveal, SectionHead } from './Ui.jsx'
import { nearby, project, timeline } from '../data/project.js'

/**
 * A drive-time diagram rather than a map. A real map answers "where is it";
 * the question a buyer is actually asking is "how long, from here, to the
 * things I do every week" — so the rings are minutes and the pins are placed
 * by bearing and distance rather than by street.
 */
const RINGS = [
  { minutes: 5, r: 62, label: '5 min' },
  { minutes: 12, r: 108, label: '12 min' },
  { minutes: 25, r: 154, label: '25 min' },
]

/**
 * Radius from drive time, interpolated between the rings themselves — so a
 * nine-minute destination lands just inside the ten-minute ring instead of
 * wherever a straight-line distance would have put it. The rings are the
 * scale; nothing may be placed by a different one.
 */
function radiusFor(minutes) {
  let prev = { minutes: 0, r: 0 }
  for (const ring of RINGS) {
    if (minutes <= ring.minutes) {
      const t = (minutes - prev.minutes) / (ring.minutes - prev.minutes)
      return prev.r + t * (ring.r - prev.r)
    }
    prev = ring
  }
  return RINGS[RINGS.length - 1].r
}

export default function Location() {
  const [active, setActive] = useState(null)

  const place = (poi) => {
    const rad = ((poi.bearing - 90) * Math.PI) / 180
    const r = radiusFor(poi.minutes)
    return { x: 200 + Math.cos(rad) * r, y: 200 + Math.sin(rad) * r }
  }

  return (
    <section id="location" className="bg-sand/40 py-24 md:py-32">
      <div className="shell">
        <SectionHead
          index="08"
          label="Location"
          title={`${project.locality}, ${project.city}`}
          lead="Lake Road, on the quiet side of Telibandha, a few minutes off VIP Road. Everything below is measured by car at nine in the morning, not by straight line."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <Reveal>
            <svg viewBox="0 0 400 400" className="h-auto w-full max-w-lg" role="img" aria-label="Drive-time diagram with Amara at the centre and six destinations placed by bearing and drive time, ringed at five, twelve and twenty-five minutes.">
              <g className="text-ink" stroke="currentColor" fill="none">
                {RINGS.map((ring) => (
                  <g key={ring.label}>
                    <circle cx="200" cy="200" r={ring.r} strokeDasharray="3 6" opacity="0.28" strokeWidth="0.8" />
                    <text
                      x="200"
                      y={200 - ring.r - 6}
                      textAnchor="middle"
                      className="fill-current text-muted"
                      fontFamily="var(--font-mono)"
                      fontSize="8"
                      letterSpacing="1.4"
                      stroke="none"
                    >
                      {ring.label.toUpperCase()}
                    </text>
                  </g>
                ))}

                {/* Cardinals */}
                <g opacity="0.18" strokeWidth="0.7">
                  <line x1="200" y1="24" x2="200" y2="376" />
                  <line x1="24" y1="200" x2="376" y2="200" />
                </g>
              </g>

              {/* Connectors, drawn only for the hovered destination */}
              {nearby.map((poi) => {
                const p = place(poi)
                const on = active === poi.name
                return (
                  <line
                    key={`l${poi.name}`}
                    x1="200"
                    y1="200"
                    x2={p.x}
                    y2={p.y}
                    className="text-clay"
                    stroke="currentColor"
                    strokeWidth="0.9"
                    style={{ opacity: on ? 0.85 : 0, transition: 'opacity 400ms' }}
                  />
                )
              })}

              {/* Destinations */}
              {nearby.map((poi) => {
                const p = place(poi)
                const on = active === poi.name
                return (
                  <g
                    key={poi.name}
                    onMouseEnter={() => setActive(poi.name)}
                    onMouseLeave={() => setActive(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle cx={p.x} cy={p.y} r="14" fill="transparent" />
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={on ? 5.5 : 3.5}
                      className={on ? 'text-clay' : 'text-ink'}
                      fill="currentColor"
                      style={{ transition: 'r 300ms, fill 300ms' }}
                    />
                    <text
                      x={p.x}
                      y={p.y - 12}
                      textAnchor="middle"
                      className="fill-current text-ink"
                      fontFamily="var(--font-mono)"
                      fontSize="7.5"
                      letterSpacing="1"
                      style={{ opacity: on ? 1 : 0, transition: 'opacity 300ms' }}
                    >
                      {poi.minutes} MIN
                    </text>
                  </g>
                )
              })}

              {/* Amara */}
              <g>
                <circle cx="200" cy="200" r="9" className="text-clay" fill="currentColor" />
                <circle cx="200" cy="200" r="17" className="text-clay" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
                <text x="200" y="234" textAnchor="middle" className="fill-current text-ink" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="2.4">
                  AMARA
                </text>
              </g>

              <g transform="translate(368 372)" className="text-muted">
                <path d="M0 -13 L4 3 L0 -0.5 L-4 3 Z" fill="currentColor" opacity="0.7" />
              </g>
            </svg>
          </Reveal>

          <div>
            <ul className="border-t border-ink/12">
              {nearby.map((poi, i) => (
                <li key={poi.name}>
                  <Reveal delay={i * 60}>
                    <div
                      onMouseEnter={() => setActive(poi.name)}
                      onMouseLeave={() => setActive(null)}
                      className={`flex items-baseline justify-between gap-6 border-b border-ink/12 py-5 transition-colors duration-400 ${
                        active === poi.name ? 'text-clay' : 'text-ink'
                      }`}
                    >
                      <div>
                        <p className="display text-2xl leading-tight">{poi.name}</p>
                        <p className="eyebrow mt-1">{poi.kind}</p>
                      </div>
                      <p className="shrink-0 font-mono text-[0.8125rem] tracking-[0.1em]">
                        {poi.minutes} min
                        <span className="ml-3 text-muted">{poi.distance} km</span>
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal delay={220}>
              <div className="mt-12">
                <p className="eyebrow">Construction</p>
                <ol className="mt-5 space-y-3">
                  {timeline.map((t) => (
                    <li key={t.date} className="flex items-center gap-4 font-mono text-[0.75rem] tracking-[0.08em]">
                      <span
                        aria-hidden
                        className={`h-2 w-2 shrink-0 ${t.done ? 'bg-clay' : 'border border-ink/30'}`}
                      />
                      <span className="w-20 shrink-0 text-muted">{t.date}</span>
                      <span className={t.done ? 'text-ink' : 'text-muted'}>{t.label}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

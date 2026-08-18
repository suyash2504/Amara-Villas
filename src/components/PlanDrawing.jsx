/**
 * ---------------------------------------------------------------------------
 * RESIDENCE PLANS
 * ---------------------------------------------------------------------------
 * One renderer, four layouts. Each layout is a list of rooms in a shared
 * 400 x 268 drawing space, so the four types can be compared like drawings on
 * the same sheet rather than four differently-scaled marketing graphics.
 *
 * `open` rooms (verandahs, terraces) are drawn dashed and unpoched, which is
 * how an unenclosed area is distinguished on a real plan.
 * ---------------------------------------------------------------------------
 */

const LAYOUTS = {
  A: [
    { n: 'Living', x: 16, y: 16, w: 156, h: 116 },
    { n: 'Dining', x: 172, y: 16, w: 104, h: 116 },
    { n: 'Kitchen', x: 276, y: 16, w: 108, h: 76 },
    { n: 'Utility', x: 276, y: 92, w: 108, h: 40 },
    { n: 'Primary', x: 16, y: 132, w: 130, h: 120 },
    { n: 'Bath', x: 146, y: 132, w: 62, h: 58 },
    { n: 'Foyer', x: 146, y: 190, w: 62, h: 62 },
    { n: 'Bed 2', x: 208, y: 132, w: 88, h: 120 },
    { n: 'Bed 3', x: 296, y: 132, w: 88, h: 120 },
  ],
  B: [
    { n: 'Living', x: 16, y: 16, w: 168, h: 120 },
    { n: 'Dining', x: 184, y: 16, w: 96, h: 120 },
    { n: 'Kitchen', x: 280, y: 16, w: 104, h: 74 },
    { n: 'Study', x: 280, y: 90, w: 104, h: 46 },
    { n: 'Primary', x: 16, y: 136, w: 134, h: 116 },
    { n: 'Foyer', x: 150, y: 136, w: 58, h: 60 },
    { n: 'Bath', x: 150, y: 196, w: 58, h: 56 },
    { n: 'Bed 2', x: 208, y: 136, w: 90, h: 116 },
    { n: 'Bed 3', x: 298, y: 136, w: 86, h: 116 },
  ],
  C: [
    { n: 'Verandah', x: 16, y: 16, w: 96, h: 236, open: true },
    { n: 'Living', x: 112, y: 16, w: 154, h: 128 },
    { n: 'Dining', x: 266, y: 16, w: 118, h: 74 },
    { n: 'Kitchen', x: 266, y: 90, w: 118, h: 54 },
    { n: 'Primary', x: 112, y: 144, w: 118, h: 108 },
    { n: 'Bed 2', x: 230, y: 144, w: 78, h: 108 },
    { n: 'Bed 3', x: 308, y: 144, w: 76, h: 60 },
    { n: 'Bed 4', x: 308, y: 204, w: 76, h: 48 },
  ],
  P: [
    { n: 'Terrace', x: 16, y: 16, w: 368, h: 66, open: true },
    { n: 'Living', x: 16, y: 82, w: 176, h: 106 },
    { n: 'Family', x: 192, y: 82, w: 106, h: 106 },
    { n: 'Kitchen', x: 298, y: 82, w: 86, h: 106 },
    { n: 'Primary suite', x: 16, y: 188, w: 148, h: 64 },
    { n: 'Stair', x: 164, y: 188, w: 52, h: 64 },
    { n: 'Bed 2', x: 216, y: 188, w: 84, h: 64 },
    { n: 'Bed 3', x: 300, y: 188, w: 84, h: 64 },
  ],
}

const ENVELOPE = { x: 16, y: 16, w: 368, h: 236 }

export default function PlanDrawing({ type = 'A', label, className = '' }) {
  const rooms = LAYOUTS[type] ?? LAYOUTS.A

  return (
    <svg
      viewBox="0 0 400 292"
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label={`Floor plan, type ${type}: ${rooms.map((r) => r.n).join(', ')}.`}
    >
      {/* Enclosed area, poched. Open areas sit outside this fill. */}
      <g>
        {rooms
          .filter((r) => !r.open)
          .map((r) => (
            <rect key={`f${r.n}`} x={r.x} y={r.y} width={r.w} height={r.h} className="fill-ivory-lift" />
          ))}
      </g>

      {/* Room divisions */}
      <g className="text-ink" stroke="currentColor" fill="none">
        {rooms.map((r) => (
          <rect
            key={`r${r.n}`}
            x={r.x}
            y={r.y}
            width={r.w}
            height={r.h}
            strokeWidth={r.open ? 0.7 : 0.9}
            strokeDasharray={r.open ? '4 4' : undefined}
            opacity={r.open ? 0.4 : 0.55}
          />
        ))}

        {/* Structural envelope, drawn heavier than the partitions inside it. */}
        <rect
          x={ENVELOPE.x}
          y={ENVELOPE.y}
          width={ENVELOPE.w}
          height={ENVELOPE.h}
          strokeWidth="2.4"
          opacity="0.9"
        />
      </g>

      {/* Room names */}
      <g className="fill-current text-ink-soft" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="1.2">
        {rooms.map((r) => (
          <text key={`t${r.n}`} x={r.x + r.w / 2} y={r.y + r.h / 2 + 2.5} textAnchor="middle">
            {r.n.toUpperCase()}
          </text>
        ))}
      </g>

      {/* Scale bar and north point — the two marks that make a drawing a plan. */}
      <g className="text-muted" stroke="currentColor" strokeWidth="0.8" opacity="0.7">
        <line x1="16" y1="272" x2="96" y2="272" />
        <line x1="16" y1="268" x2="16" y2="276" />
        <line x1="56" y1="269" x2="56" y2="275" />
        <line x1="96" y1="268" x2="96" y2="276" />
      </g>
      <text x="16" y="286" className="fill-current text-muted" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="1.2">
        0        5M
      </text>

      <g transform="translate(378 274)" className="text-muted">
        <path d="M0 -12 L3.5 3 L0 -0.5 L-3.5 3 Z" fill="currentColor" opacity="0.8" />
      </g>

      {label && (
        <text x="200" y="286" textAnchor="middle" className="fill-current text-muted" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="1.6">
          {label.toUpperCase()}
        </text>
      )}
    </svg>
  )
}

/**
 * ---------------------------------------------------------------------------
 * VILLA PLANS
 * ---------------------------------------------------------------------------
 * One renderer, four layouts, drawn in a shared 400 x 300 space so the types
 * can be compared like drawings on the same sheet rather than four
 * differently-scaled marketing graphics.
 *
 * These are plot plans, not just floor plans: a standalone villa's car porch
 * and lawn are part of what you are buying, so they are drawn — dashed and
 * unpoched, the way an unenclosed area is distinguished on a real plan —
 * inside a dashed plot boundary. `built` is the enclosed footprint, and it is
 * declared per layout rather than assumed, because the four houses sit
 * differently on their plots.
 * ---------------------------------------------------------------------------
 */

const PLOT = { x: 8, y: 8, w: 384, h: 260 }

const LAYOUTS = {
  A: {
    built: { x: 16, y: 16, w: 280, h: 196 },
    rooms: [
      { n: 'Living', x: 16, y: 16, w: 150, h: 65 },
      { n: 'Dining', x: 166, y: 16, w: 130, h: 65 },
      { n: 'Kitchen', x: 16, y: 81, w: 86, h: 65 },
      { n: 'Pooja', x: 102, y: 81, w: 54, h: 65 },
      { n: 'Bath', x: 156, y: 81, w: 60, h: 65 },
      { n: 'Foyer', x: 216, y: 81, w: 80, h: 65 },
      { n: 'Primary', x: 16, y: 146, w: 104, h: 66 },
      { n: 'Bed 2', x: 120, y: 146, w: 88, h: 66 },
      { n: 'Bed 3', x: 208, y: 146, w: 88, h: 66 },
      { n: 'Car porch', x: 300, y: 16, w: 84, h: 96, open: true },
      { n: 'Lawn', x: 16, y: 216, w: 368, h: 44, open: true },
    ],
  },
  B: {
    built: { x: 16, y: 16, w: 284, h: 200 },
    rooms: [
      { n: 'Living', x: 16, y: 16, w: 156, h: 68 },
      { n: 'Dining', x: 172, y: 16, w: 128, h: 68 },
      { n: 'Kitchen', x: 16, y: 84, w: 76, h: 66 },
      { n: 'Pooja', x: 92, y: 84, w: 46, h: 66 },
      { n: 'Bath', x: 138, y: 84, w: 54, h: 66 },
      { n: 'Foyer', x: 192, y: 84, w: 48, h: 66 },
      { n: 'Study', x: 240, y: 84, w: 60, h: 66 },
      { n: 'Primary', x: 16, y: 150, w: 98, h: 66 },
      { n: 'Bed 2', x: 114, y: 150, w: 94, h: 66 },
      { n: 'Bed 3', x: 208, y: 150, w: 92, h: 66 },
      { n: 'Car porch', x: 304, y: 16, w: 80, h: 100, open: true },
      { n: 'Lawn', x: 16, y: 220, w: 368, h: 40, open: true },
    ],
  },
  C: {
    built: { x: 16, y: 16, w: 256, h: 204 },
    rooms: [
      { n: 'Living', x: 16, y: 16, w: 142, h: 70 },
      { n: 'Dining', x: 158, y: 16, w: 114, h: 70 },
      { n: 'Kitchen', x: 16, y: 86, w: 72, h: 66 },
      { n: 'Pooja', x: 88, y: 86, w: 46, h: 66 },
      { n: 'Bath', x: 134, y: 86, w: 52, h: 66 },
      { n: 'Foyer', x: 186, y: 86, w: 86, h: 66 },
      { n: 'Primary', x: 16, y: 152, w: 74, h: 68 },
      { n: 'Bed 2', x: 90, y: 152, w: 62, h: 68 },
      { n: 'Bed 3', x: 152, y: 152, w: 60, h: 68 },
      { n: 'Bed 4', x: 212, y: 152, w: 60, h: 68 },
      { n: 'Verandah', x: 272, y: 16, w: 32, h: 204, open: true },
      { n: 'Lap pool', x: 312, y: 16, w: 72, h: 120, open: true },
      { n: 'Car porch', x: 312, y: 144, w: 72, h: 76, open: true },
      { n: 'Lawn', x: 16, y: 224, w: 368, h: 36, open: true },
    ],
  },
  D: {
    built: { x: 16, y: 16, w: 284, h: 208 },
    rooms: [
      { n: 'Living', x: 16, y: 16, w: 160, h: 72 },
      { n: 'Family', x: 176, y: 16, w: 124, h: 72 },
      { n: 'Kitchen', x: 16, y: 88, w: 76, h: 68 },
      { n: 'Utility', x: 92, y: 88, w: 40, h: 68 },
      { n: 'Pooja', x: 132, y: 88, w: 46, h: 68 },
      { n: 'Bath', x: 178, y: 88, w: 48, h: 68 },
      { n: 'Dining', x: 226, y: 88, w: 74, h: 68 },
      { n: 'Primary suite', x: 16, y: 156, w: 88, h: 68 },
      { n: 'Bed 2', x: 104, y: 156, w: 66, h: 68 },
      { n: 'Bed 3', x: 170, y: 156, w: 66, h: 68 },
      { n: 'Bed 4', x: 236, y: 156, w: 64, h: 68 },
      { n: 'Pool', x: 308, y: 16, w: 76, h: 130, open: true },
      { n: 'Car porch', x: 308, y: 154, w: 76, h: 70, open: true },
      { n: 'Lawn', x: 16, y: 228, w: 368, h: 32, open: true },
    ],
  },
}

export default function PlanDrawing({ type = 'A', label, className = '' }) {
  const layout = LAYOUTS[type] ?? LAYOUTS.A
  const { built, rooms } = layout

  return (
    <svg
      viewBox="0 0 400 300"
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label={`Plot plan, type ${type}: ${rooms.map((r) => r.n).join(', ')}.`}
    >
      {/* Plot boundary — dashed, as a boundary is drawn on a survey. */}
      <rect
        x={PLOT.x}
        y={PLOT.y}
        width={PLOT.w}
        height={PLOT.h}
        fill="none"
        className="text-ink"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeDasharray="6 5"
        opacity="0.3"
      />

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

        {/* The built footprint, drawn heavier than the partitions inside it. */}
        <rect x={built.x} y={built.y} width={built.w} height={built.h} strokeWidth="2.4" opacity="0.9" />
      </g>

      {/* A car drawn into the porch, so the covered slot reads as parking
          rather than as one more unlabelled open rectangle. */}
      {rooms
        .filter((r) => r.n === 'Car porch')
        .map((r) => (
          <CarMark key="car" x={r.x + r.w / 2} y={r.y + r.h / 2} />
        ))}

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
        <line x1="16" y1="280" x2="96" y2="280" />
        <line x1="16" y1="276" x2="16" y2="284" />
        <line x1="56" y1="277" x2="56" y2="283" />
        <line x1="96" y1="276" x2="96" y2="284" />
      </g>
      <text
        x="16"
        y="294"
        className="fill-current text-muted"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="1.2"
      >
        0        5M
      </text>

      <g transform="translate(378 282)" className="text-muted">
        <path d="M0 -12 L3.5 3 L0 -0.5 L-3.5 3 Z" fill="currentColor" opacity="0.8" />
      </g>

      {label && (
        <text
          x="200"
          y="294"
          textAnchor="middle"
          className="fill-current text-muted"
          fontFamily="var(--font-mono)"
          fontSize="6.5"
          letterSpacing="1.6"
        >
          {label.toUpperCase()}
        </text>
      )}
    </svg>
  )
}

/** A car in plan, sized to sit inside the porch without touching its edges. */
function CarMark({ x, y }) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      className="text-clay"
      stroke="currentColor"
      fill="none"
      strokeWidth="0.9"
      opacity="0.75"
    >
      <rect x="-13" y="-25" width="26" height="50" rx="6" />
      <path d="M-13 -9 h26 M-13 11 h26" opacity="0.7" />
      <path d="M-9 -25 q9 -5 18 0" opacity="0.6" />
    </g>
  )
}

/**
 * ---------------------------------------------------------------------------
 * THE JAALI MODULE
 * ---------------------------------------------------------------------------
 * The one chapter figure that is drawn rather than photographed. The court and
 * the materials are things you have to see, so those chapters carry
 * photographs; the jaali is a cast component, and what matters about a cast
 * component is its dimension — which is a drawing's job, not a camera's.
 * ---------------------------------------------------------------------------
 */
export default function JaaliModule() {
  const cells = Array.from({ length: 4 }).flatMap((_, r) =>
    Array.from({ length: 3 }).map((_, c) => ({ r, c })),
  )

  return (
    <svg
      viewBox="0 0 460 520"
      className="h-auto w-full"
      role="img"
      aria-label="The terracotta jaali module drawn at cast scale: a pointed arch opening in a square block, repeated in a grid, with a pierced dot in each spandrel."
    >
      <rect x="0" y="0" width="460" height="520" fill="#EDE2D0" />

      <g className="text-clay" fill="currentColor" opacity="0.92">
        {cells.map(({ r, c }) => {
          const x = 50 + c * 122
          const y = 40 + r * 112
          const w = 104
          const h = 94
          const inset = 17
          const spring = y + h * 0.54
          const apex = y + 10
          // A drop arch: two circular arcs struck from centres on the
          // springline, meeting at a true point. A quadratic would flatten the
          // apex, and a flat apex is a doorway, not a jaali.
          const W = w - inset * 2
          const rise = spring - apex
          const rad = (rise * rise + (W * W) / 4) / W
          return (
            <path
              key={`${r}-${c}`}
              fillRule="evenodd"
              d={`M${x} ${y} h${w} v${h} h-${w} Z
                  M${x + inset} ${y + h - 10}
                  V${spring}
                  A${rad} ${rad} 0 0 1 ${x + w / 2} ${apex}
                  A${rad} ${rad} 0 0 1 ${x + w - inset} ${spring}
                  V${y + h - 10} Z`}
            />
          )
        })}
      </g>

      {/* The pierced dot each spandrel carries, top corners only. */}
      <g className="text-ink" fill="currentColor" opacity="0.45">
        {cells.flatMap(({ r, c }) =>
          [20, 84].map((dx) => (
            <circle key={`d${r}-${c}-${dx}`} cx={50 + c * 122 + dx} cy={40 + r * 112 + 20} r="3.4" />
          )),
        )}
      </g>

      {/* Dimension line, the way a cast component is documented */}
      <g className="text-ink" stroke="currentColor" opacity="0.45" strokeWidth="0.8">
        <line x1="50" y1="486" x2="154" y2="486" />
        <line x1="50" y1="480" x2="50" y2="492" />
        <line x1="154" y1="480" x2="154" y2="492" />
      </g>
      <text
        x="102"
        y="504"
        textAnchor="middle"
        className="fill-current text-muted"
        fontFamily="var(--font-mono)"
        fontSize="8"
        letterSpacing="1.5"
      >
        300 MM MODULE
      </text>
    </svg>
  )
}

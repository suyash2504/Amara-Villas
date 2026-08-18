import { useMemo, useState } from 'react'
import PlanDrawing from './PlanDrawing.jsx'
import { Reveal, SectionHead, Button } from './Ui.jsx'
import { positions, inventory, residences, availableCount, project } from '../data/project.js'

/**
 * ---------------------------------------------------------------------------
 * THE PLOT EXPLORER
 * ---------------------------------------------------------------------------
 * The one place on the site that behaves like a tool rather than a brochure.
 * The community is drawn as two garden streets; each plot in it is a button.
 * Selecting one loads its villa's front elevation, its plan, its aspect and
 * its price — and carries that plot into the enquiry form below, so an
 * enquiry arrives naming a specific villa instead of "3 BHK, please send
 * details".
 *
 * Sold plots stay visible and stay disabled. Hiding them would make the
 * community look emptier than it is, and buyers read a sold plot as proof.
 * ---------------------------------------------------------------------------
 */

const STATUS = {
  available: { label: 'Available', dot: 'bg-ivory/80', pill: 'bg-clay' },
  held: { label: 'On hold', dot: 'border border-dashed border-ivory/60', pill: 'bg-stone' },
  sold: { label: 'Allotted', dot: 'bg-ivory/15', pill: 'bg-ink/30' },
}

export default function PlanExplorer({ onEnquire }) {
  const [selectedId, setSelectedId] = useState('RT-01')
  const [typeFilter, setTypeFilter] = useState('all')

  const selected = useMemo(
    () => inventory.find((u) => u.id === selectedId) ?? inventory[0],
    [selectedId],
  )

  const matches = (u) => typeFilter === 'all' || u.type === typeFilter

  return (
    <section id="plans" className="bg-espresso py-24 text-ivory md:py-32">
      <div className="shell">
        <SectionHead
          index="05"
          label="Availability"
          title="Choose the plot, not the brochure"
          lead={`${availableCount} of the thirty-two villas are unallotted today. Select one to see its elevation, its plan and its price.`}
          tone="ivory"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_25rem] lg:gap-14">
          {/* --- The two streets ------------------------------------------- */}
          <Reveal>
            <div className="border border-ivory/12 bg-ivory/[0.03] p-5 md:p-7">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <FilterChip active={typeFilter === 'all'} onClick={() => setTypeFilter('all')}>
                    All types
                  </FilterChip>
                  {residences.map((r) => (
                    <FilterChip
                      key={r.code}
                      active={typeFilter === r.code}
                      onClick={() => setTypeFilter(r.code)}
                    >
                      Type {r.code}
                    </FilterChip>
                  ))}
                </div>
                <div className="flex gap-4">
                  {Object.entries(STATUS).map(([key, s]) => (
                    <span key={key} className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ivory/50">
                      <span aria-hidden className={`h-2 w-2 ${s.dot}`} />
                      {s.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-2 flex items-stretch gap-3">
                <span className="w-12 shrink-0" />
                <div className="grid flex-1 grid-cols-2 gap-3">
                  <span className="px-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ivory/35">
                    Rain Tree Street
                  </span>
                  <span className="px-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ivory/35">
                    Neem Street
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-px">
                {positions.map((position) => {
                  const units = inventory.filter((u) => u.position === position)
                  return (
                    <div key={position} className="flex items-stretch gap-3">
                      <span className="w-12 shrink-0 self-center font-mono text-[0.6875rem] tracking-[0.12em] text-ivory/40">
                        {String(position).padStart(2, '0')}
                      </span>
                      <div className="grid flex-1 grid-cols-2 gap-3">
                        {units.map((u) => (
                          <PlotCell
                            key={u.id}
                            unit={u}
                            selected={u.id === selected.id}
                            dimmed={!matches(u)}
                            onSelect={() => setSelectedId(u.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* The green both streets run toward. */}
              <div className="mt-1 flex gap-3">
                <span className="w-12 shrink-0" />
                <div className="flex-1 border-t border-ivory/25 pt-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ivory/35">
                  The gate, the clubhouse, and the green both streets face
                </div>
              </div>
            </div>
          </Reveal>

          {/* --- The selected villa ------------------------------------ */}
          <Reveal delay={120}>
            <aside className="sticky top-24 border border-ivory/12 bg-ivory text-ink">
              <div className="flex items-baseline justify-between border-b border-ink/10 px-6 py-4">
                <span className="font-mono text-[0.75rem] tracking-[0.18em]">{selected.id}</span>
                <span className="eyebrow flex items-center gap-2">
                  <span aria-hidden className={`h-2 w-2 ${STATUS[selected.status].pill}`} />
                  {STATUS[selected.status].label}
                </span>
              </div>

              <div className="px-6 pt-6">
                <h3 className="display text-3xl">{selected.name}</h3>
                <p className="eyebrow mt-2">
                  {selected.beds} — {selected.streetName}
                </p>
                <figure className="mt-5 overflow-hidden border border-ink/10">
                  <img
                    src={selected.photo.src}
                    alt={selected.photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="block aspect-[16/10] w-full object-cover"
                  />
                  <div className="bg-ivory-lift px-3 pt-3 pb-1">
                    <PlanDrawing type={selected.type} label={`Type ${selected.type}`} />
                  </div>
                </figure>
              </div>

              <dl className="mt-6 divide-y divide-ink/8 border-t border-ink/8 px-6 font-mono text-[0.6875rem] tracking-[0.08em]">
                <Row label="PLOT" value={`${selected.plotSize.toLocaleString('en-IN')} sq ft`} />
                <Row label="CARPET" value={`${selected.carpet.toLocaleString('en-IN')} sq ft`} />
                <Row label="ASPECT" value={selected.facing} />
                <Row label="PRICE" value={`${selected.price.toFixed(2)} Cr`} />
                <Row label="POSSESSION" value={project.possession} />
              </dl>

              <div className="p-6">
                {selected.status === 'available' ? (
                  <Button
                    href="#enquire"
                    onClick={() => onEnquire?.(selected)}
                    className="w-full"
                  >
                    Enquire about {selected.id}
                  </Button>
                ) : (
                  <p className="border border-ink/12 px-5 py-4 text-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                    {selected.status === 'sold' ? 'Allotted — pick another' : 'On hold until month end'}
                  </p>
                )}
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right text-ink">{value}</dd>
    </div>
  )
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-4 py-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] transition-colors duration-400 ${
        active
          ? 'border-clay bg-clay text-ivory'
          : 'border-ivory/20 text-ivory/60 hover:border-ivory/45 hover:text-ivory'
      }`}
    >
      {children}
    </button>
  )
}

function PlotCell({ unit, selected, dimmed, onSelect }) {
  const sold = unit.status === 'sold'
  const tone = sold
    ? 'bg-transparent text-ivory/25'
    : unit.status === 'held'
      ? 'bg-ivory/[0.07] text-ivory/60 border border-dashed border-ivory/30'
      : 'bg-ivory/[0.13] text-ivory hover:bg-clay'

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={sold}
      aria-pressed={selected}
      title={`${unit.id} — ${unit.name}, ${STATUS[unit.status].label}`}
      className={`relative flex h-12 items-center justify-between px-3 font-mono text-[0.6875rem] tracking-[0.08em] transition-all duration-400 ${tone} ${
        dimmed ? 'opacity-20' : ''
      } ${selected ? 'outline outline-1 outline-offset-[-1px] outline-clay' : ''} ${
        sold ? 'cursor-not-allowed' : ''
      }`}
    >
      <span>Type {unit.type}</span>
      {/* Compact unit in the grid cell — the full "sq ft" spelling only
          appears once space allows, in the detail panel and on the cards. */}
      <span className="opacity-55">{(unit.plotSize / 1000).toFixed(1)}k ft²</span>
      {sold && (
        <span aria-hidden className="pointer-events-none absolute inset-x-2 top-1/2 h-px bg-ivory/15" />
      )}
    </button>
  )
}

import { useState } from 'react'
import PlanDrawing from './PlanDrawing.jsx'
import VillaModal from './VillaModal.jsx'
import { Reveal, SectionHead, TextLink } from './Ui.jsx'
import { residences, inventory } from '../data/project.js'

const inr = (cr) => `${cr.toFixed(2)} Cr`
const sqft = (n) => `${n.toLocaleString('en-IN')} sq ft`

/**
 * The four plans, laid out like a drawing sheet. Each card reports its own
 * live availability from `inventory` rather than a written-in number, so a
 * type that sells out stops advertising itself as open. Every card opens —
 * on the photo or the "Explore" control — into the full detail: every
 * interior photograph, the complete room schedule, both routes forward.
 */
export default function Residences() {
  const [openCode, setOpenCode] = useState(null)
  const openResidence = residences.find((r) => r.code === openCode) ?? null
  const openAvailable = openResidence
    ? inventory.filter((u) => u.type === openResidence.code && u.status === 'available').length
    : 0

  return (
    <section id="residences" className="bg-ivory py-24 md:py-32">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHead
            index="04"
            label="The Villas"
            title="Four villas, one street"
            lead="Every type stands on its own plot along Rain Tree or Neem Street. Open one to see every room, or see live availability below."
          />
          <Reveal delay={220}>
            <TextLink href="#plans">See live availability</TextLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px bg-ink/10 sm:grid-cols-2 xl:grid-cols-4">
          {residences.map((r, i) => (
            <Reveal key={r.code} delay={i * 90}>
              <ResidenceCard residence={r} onOpen={() => setOpenCode(r.code)} />
            </Reveal>
          ))}
        </div>
      </div>

      <VillaModal residence={openResidence} available={openAvailable} onClose={() => setOpenCode(null)} />
    </section>
  )
}

function ResidenceCard({ residence, onOpen }) {
  const units = inventory.filter((u) => u.type === residence.code)
  const left = units.filter((u) => u.status === 'available').length

  return (
    <div className="group flex h-full flex-col bg-ivory p-7 transition-colors duration-700 hover:bg-ivory-lift">
      <div className="flex items-baseline justify-between">
        <span className="display text-4xl leading-none text-clay">{residence.code}</span>
        <span className="eyebrow">{left > 0 ? `${left} available` : 'Fully allotted'}</span>
      </div>

      {/* The room, then the plan of the home it sits in — the pairing is the
          point of the card, so they share one frame. It opens the full
          detail, same as the "Explore" control below. */}
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        className="mt-6 block overflow-hidden text-left"
      >
        <figure>
          <img
            src={residence.photo.src}
            alt={residence.photo.alt}
            loading="lazy"
            decoding="async"
            className="block aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          <div className="border-x border-b border-ink/10 bg-ivory-lift px-2 pt-3 pb-1">
            <PlanDrawing type={residence.code} />
          </div>
        </figure>
      </button>

      <h3 className="display mt-6 text-2xl">{residence.name}</h3>
      <p className="eyebrow mt-2">{residence.beds}</p>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">{residence.blurb}</p>

      {/* What the rooms actually look like — three photographs rather than
          one, since a plan states dimensions but never light. */}
      <ul className="mt-5 grid grid-cols-3 gap-1">
        {residence.interiors.map((photo) => (
          <li key={photo.src} className="overflow-hidden bg-sand/40">
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover"
            />
          </li>
        ))}
      </ul>

      <dl className="mt-6 space-y-2 border-t border-ink/10 pt-4 font-mono text-[0.6875rem] tracking-[0.08em] text-ink-soft">
        <div className="flex justify-between">
          <dt className="text-muted">PLOT</dt>
          <dd>{sqft(residence.plotSize)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">CARPET</dt>
          <dd>{sqft(residence.carpet)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">ASPECT</dt>
          <dd className="text-right">{residence.facing}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">FROM</dt>
          <dd className="text-ink">{inr(residence.price)}</dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        // `mt-auto` keeps the four controls on one line even when a longer
        // aspect wraps the stats above it onto an extra row.
        className="group/btn mt-auto flex items-center justify-between pt-5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink transition-colors hover:text-clay"
      >
        Explore Type {residence.code}
        <span aria-hidden className="transition-transform duration-500 group-hover/btn:translate-x-1">
          →
        </span>
      </button>
    </div>
  )
}

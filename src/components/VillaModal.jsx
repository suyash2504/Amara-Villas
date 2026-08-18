import { useEffect } from 'react'
import PlanDrawing from './PlanDrawing.jsx'
import { Button } from './Ui.jsx'
import { useScrollLock } from '../lib/motion.js'

const inr = (cr) => `${cr.toFixed(2)} Cr`
const sqft = (n) => `${n.toLocaleString('en-IN')} sq ft`

/**
 * ---------------------------------------------------------------------------
 * THE VILLA DETAIL
 * ---------------------------------------------------------------------------
 * What a residence card only summarises, this opens in full: the elevation at
 * size, the complete room schedule, every interior photograph, and the two
 * routes forward — enquire, or find this type on the street map. It is the
 * one place on the site a single villa is the whole subject rather than one
 * of four.
 * ---------------------------------------------------------------------------
 */
export default function VillaModal({ residence, available, onClose }) {
  useScrollLock(Boolean(residence))

  useEffect(() => {
    if (!residence) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [residence, onClose])

  if (!residence) return null

  return (
    // The backdrop only centres and darkens — it does not scroll. iOS Safari
    // has a long-standing bug where `position: fixed` and `overflow-y: auto`
    // on the same element refuse to scroll at all, which made this dialog
    // look like a single stranded photo with no way to reach anything below
    // it. The card itself carries the scroll instead, which every browser
    // handles the same way.
    <div
      role="dialog"
      aria-modal="true"
      aria-label={residence.name}
      onClick={onClose}
      // Tells Lenis to leave every wheel/touch event inside this dialog
      // alone, so a mouse-wheel turn scrolls the card, not the page it is
      // sitting on top of. See the note on `useScrollLock` in lib/motion.js.
      data-lenis-prevent
      className="fixed inset-0 z-[80] flex items-center justify-center bg-espresso/96 p-4 md:p-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ WebkitOverflowScrolling: 'touch' }}
        className="max-h-[88vh] w-full max-w-4xl overflow-y-auto bg-ivory text-ink shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-start justify-between gap-6 border-b border-ink/10 px-7 py-6 md:px-10">
          <div>
            <span className="eyebrow">
              Type {residence.code} — {available > 0 ? `${available} available` : 'Fully allotted'}
            </span>
            <h3 className="display mt-3 text-[clamp(2rem,4vw,3rem)] leading-none">{residence.name}</h3>
            <p className="eyebrow mt-2">{residence.beds}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-clay hover:text-clay"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        <img
          src={residence.photo.src}
          alt={residence.photo.alt}
          className="block aspect-[16/9] w-full object-cover"
        />

        <div className="grid gap-10 px-7 py-8 md:grid-cols-2 md:px-10 md:py-10">
          <div>
            <p className="text-[1.0625rem] leading-relaxed text-ink-soft">{residence.blurb}</p>

            <div className="mt-6 border border-ink/10 bg-ivory-lift px-3 pt-3 pb-1">
              <PlanDrawing type={residence.code} label={`Type ${residence.code}`} />
            </div>

            <dl className="mt-6 divide-y divide-ink/8 border-t border-ink/8 font-mono text-[0.6875rem] tracking-[0.08em]">
              <Row label="PLOT" value={sqft(residence.plotSize)} />
              <Row label="CARPET" value={sqft(residence.carpet)} />
              <Row label="BUILT-UP" value={sqft(residence.built)} />
              <Row label="PARKING" value={residence.parking} />
              <Row label="ASPECT" value={residence.facing} />
              <Row label="FROM" value={inr(residence.price)} />
            </dl>
          </div>

          <div>
            <p className="eyebrow">Every room</p>
            {/* Named, not just shown. An unlabelled grid of warm interiors
                tells a buyer nothing about which of them they are buying. */}
            <ul className="mt-4 grid grid-cols-2 gap-1.5">
              {residence.interiors.map((photo) => (
                <li key={`${photo.room}-${photo.src}`} className="group/room relative overflow-hidden bg-sand/40">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-2.5 pt-8 pb-2 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ivory">
                    {photo.room}
                  </span>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-7">Room schedule</p>
            <ul className="mt-4">
              {residence.rooms.map((room) => (
                <li
                  key={room.name}
                  className="flex items-baseline justify-between gap-4 border-b border-ink/8 py-2.5 font-mono text-[0.6875rem] text-ink-soft"
                >
                  <span className="text-muted">{room.name}</span>
                  <span className="flex-1 border-b border-dotted border-ink/20" aria-hidden />
                  <span className="text-ink">{room.dim}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-ink/10 px-7 py-7 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p className="max-w-sm text-xs leading-relaxed text-muted">
            {available > 0
              ? `${available} plot${available === 1 ? '' : 's'} of Type ${residence.code} still unallotted.`
              : `Every Type ${residence.code} plot is allotted — the other types still have plots open.`}
          </p>
          <div className="flex gap-3">
            <a
              href="#plans"
              onClick={onClose}
              className="border border-ink/25 px-6 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:border-clay hover:text-clay"
            >
              Find on the map
            </a>
            <Button href="#enquire" onClick={onClose}>
              Enquire
            </Button>
          </div>
        </div>
      </div>
    </div>
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

import { useEffect, useMemo, useState } from 'react'
import { Reveal, SectionHead, Button } from './Ui.jsx'
import { inventory, project } from '../data/project.js'

/**
 * ---------------------------------------------------------------------------
 * PRIVATE VIEWING
 * ---------------------------------------------------------------------------
 * The form is a viewing request, not a lead-capture box. It asks for the one
 * decision that actually moves things forward — which residence, on which
 * morning — and it arrives pre-filled when the visitor selected a unit in the
 * explorer above, so nobody re-types what they already chose.
 *
 * Validation runs on submit rather than on every keystroke: correcting a field
 * you have not finished typing is the most irritating thing a form can do.
 * ---------------------------------------------------------------------------
 */

const SLOTS = ['10:00', '11:30', '15:00', '16:30']

const availableUnits = inventory.filter((u) => u.status === 'available')

/** Next weekday, since viewings are not held on Sundays. */
function nextViewingDate() {
  const d = new Date()
  d.setDate(d.getDate() + 2)
  if (d.getDay() === 0) d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
}

export default function Enquire({ interest }) {
  const [form, setForm] = useState(() => ({
    name: '',
    phone: '',
    email: '',
    unit: 'any',
    date: nextViewingDate(),
    slot: SLOTS[0],
    note: '',
  }))
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null)

  // A selection made in the explorer above becomes the default here.
  useEffect(() => {
    if (interest?.id) {
      setForm((f) => ({ ...f, unit: interest.id }))
    }
  }, [interest])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const reference = useMemo(
    () => `AMR-${String(Math.abs(hash(form.name + form.phone)) % 9000 + 1000)}`,
    [form.name, form.phone],
  )

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!/^[+\d][\d\s-]{8,}$/.test(form.phone.trim())) next.phone = 'A number we can reach you on.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'A valid email address.'
    setErrors(next)
    if (Object.keys(next).length) return

    setSent({
      reference,
      unit: form.unit === 'any' ? 'Open to suggestions' : form.unit,
      date: form.date,
      slot: form.slot,
    })
  }

  return (
    <section id="enquire" className="bg-ivory py-24 md:py-32">
      <div className="shell grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHead
            index="09"
            label="Private viewing"
            title="Come and stand in the court"
            lead="Viewings are held on site, one household at a time, Tuesday to Saturday. The show villa is a finished Type B at Rain Tree Street, plot 4."
          />

          <Reveal delay={220}>
            <dl className="mt-12 space-y-6 border-t border-ink/12 pt-8">
              <div>
                <dt className="eyebrow">Sales lounge</dt>
                <dd className="mt-2 text-[1.0625rem] leading-relaxed text-ink-soft">
                  {project.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Direct</dt>
                <dd className="mt-2 text-[1.0625rem] text-ink-soft">
                  <a className="transition-colors hover:text-clay" href={`tel:${project.phone.replace(/\s/g, '')}`}>
                    {project.phone}
                  </a>
                  <span className="mx-3 text-muted">/</span>
                  <a className="transition-colors hover:text-clay" href={`mailto:${project.email}`}>
                    {project.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">RERA</dt>
                <dd className="mt-2 font-mono text-sm text-ink-soft">{project.rera}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120}>
          {sent ? (
            <Confirmation sent={sent} onReset={() => setSent(null)} />
          ) : (
            <form onSubmit={submit} noValidate className="border border-ink/12 bg-ivory-lift p-7 md:p-10">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Name" error={errors.name}>
                  <input
                    className={inputClass}
                    value={form.name}
                    onChange={set('name')}
                    autoComplete="name"
                    placeholder="Your full name"
                  />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input
                    className={inputClass}
                    value={form.phone}
                    onChange={set('phone')}
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+91 00000 00000"
                  />
                </Field>
                <Field label="Email" error={errors.email} span>
                  <input
                    className={inputClass}
                    value={form.email}
                    onChange={set('email')}
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@example.com"
                  />
                </Field>

                <Field label="Residence" span>
                  <select className={inputClass} value={form.unit} onChange={set('unit')}>
                    <option value="any">Open to suggestions</option>
                    {availableUnits.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.id} — {u.name}, {u.carpet.toLocaleString('en-IN')} sq ft, {u.price.toFixed(2)} Cr
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Preferred date">
                  <input className={inputClass} type="date" value={form.date} onChange={set('date')} />
                </Field>

                <Field label="Time">
                  <div className="mt-1 flex flex-wrap gap-2">
                    {SLOTS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, slot: s }))}
                        aria-pressed={form.slot === s}
                        className={`border px-2.5 py-2 font-mono text-[0.625rem] tracking-[0.1em] transition-colors duration-400 ${
                          form.slot === s
                            ? 'border-clay bg-clay text-ivory'
                            : 'border-ink/20 text-ink-soft hover:border-ink/45'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Anything we should know" span>
                  <textarea
                    className={`${inputClass} min-h-24 resize-y`}
                    value={form.note}
                    onChange={set('note')}
                    placeholder="Family size, timelines, questions about the plans."
                  />
                </Field>
              </div>

              <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-[18rem] text-xs leading-relaxed text-muted">
                  One household per slot. We will confirm the appointment before you travel.
                </p>
                <Button type="submit">Request viewing</Button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

const inputClass =
  'mt-2 w-full border-0 border-b border-ink/20 bg-transparent px-0 py-2.5 text-[0.9375rem] text-ink outline-none transition-colors duration-400 placeholder:text-muted/70 focus:border-clay'

function Field({ label, error, span, children }) {
  return (
    <label className={`block ${span ? 'sm:col-span-2' : ''}`}>
      <span className="eyebrow">{label}</span>
      {children}
      {error && <span className="mt-2 block font-mono text-[0.6875rem] text-clay-deep">{error}</span>}
    </label>
  )
}

function Confirmation({ sent, onReset }) {
  return (
    <div className="flex h-full flex-col justify-center border border-clay/40 bg-ivory-lift p-10 md:p-14">
      <span className="eyebrow">Request logged</span>
      <p className="display mt-6 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-tight">
        Your viewing is held for {sent.slot} on {formatDate(sent.date)}.
      </p>
      <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10 font-mono text-[0.75rem] tracking-[0.08em]">
        <div className="flex justify-between py-3">
          <dt className="text-muted">REFERENCE</dt>
          <dd>{sent.reference}</dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className="text-muted">RESIDENCE</dt>
          <dd>{sent.unit}</dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className="text-muted">LOUNGE</dt>
          <dd>{project.address[0]}</dd>
        </div>
      </dl>
      <button
        type="button"
        onClick={onReset}
        className="mt-9 self-start font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink transition-colors hover:text-clay"
      >
        Request another slot
      </button>
    </div>
  )
}

function formatDate(iso) {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })
}

/** Small stable hash, only used to give the confirmation a reference number. */
function hash(s) {
  let h = 0
  for (let i = 0; i < s.length; i += 1) {
    h = (h << 5) - h + s.charCodeAt(i)
    h |= 0
  }
  return h
}

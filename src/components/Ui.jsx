import { useReveal } from '../lib/motion.js'

/**
 * The single entrance used across the site: a short rise with a long ease.
 * `delay` is in milliseconds and staggers siblings without a library.
 */
export function Reveal({ children, delay = 0, y = 26, as: Tag = 'div', className = '' }) {
  const [ref, shown] = useReveal()
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translate3d(0, ${y}px, 0)`,
        transition: `opacity 900ms var(--ease-out-soft) ${delay}ms, transform 900ms var(--ease-out-soft) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  )
}

/** A word-by-word reveal, for the two places big type carries the page. */
export function RevealWords({ text, className = '', step = 45 }) {
  const [ref, shown] = useReveal({ threshold: 0.3 })
  return (
    <span ref={ref} className={className}>
      {text.split(' ').map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <span
            className="inline-block"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? 'none' : 'translate3d(0, 0.9em, 0)',
              transition: `opacity 700ms var(--ease-out-soft) ${i * step}ms, transform 900ms var(--ease-out-soft) ${i * step}ms`,
            }}
          >
            {word}
          </span>
          {' '}
        </span>
      ))}
    </span>
  )
}

export function Eyebrow({ children, className = '' }) {
  return (
    <span className={`eyebrow inline-flex items-center gap-3 ${className}`}>
      <span aria-hidden className="h-px w-8 bg-current opacity-40" />
      {children}
    </span>
  )
}

/**
 * Text link with a rule that draws itself from the left on hover. Used instead
 * of buttons wherever the action is navigational rather than committal.
 */
export function TextLink({ children, href = '#enquire', onClick, className = '' }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2 pb-1 text-[0.8125rem] tracking-[0.16em] uppercase font-mono text-ink transition-colors hover:text-clay ${className}`}
    >
      {children}
      <span aria-hidden className="absolute bottom-0 left-0 h-px w-full bg-ink/20" />
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-clay transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />
    </a>
  )
}

/** The one solid control on the page. Reserved for enquiry actions. */
export function Button({ children, href, onClick, type, variant = 'solid', className = '' }) {
  const base =
    'group relative inline-flex items-center justify-center gap-3 overflow-hidden px-8 py-4 font-mono text-[0.75rem] uppercase tracking-[0.18em] transition-colors duration-500'
  const skin =
    variant === 'solid'
      ? 'bg-ink text-ivory hover:text-ivory'
      : 'border border-ink/25 text-ink hover:text-ivory'

  const inner = (
    <>
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-clay transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
      />
      <span className="relative">{children}</span>
    </>
  )

  if (href) {
    return (
      <a href={href} onClick={onClick} className={`${base} ${skin} ${className}`}>
        {inner}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={`${base} ${skin} ${className}`}>
      {inner}
    </button>
  )
}

/**
 * Section header. Every section on the page uses it, which is what keeps the
 * vertical rhythm identical from the courtyard down to the enquiry form.
 */
export function SectionHead({ index, label, title, lead, align = 'left', tone = 'ink' }) {
  const muted = tone === 'ivory' ? 'text-ivory/55' : 'text-muted'
  const body = tone === 'ivory' ? 'text-ivory/70' : 'text-ink-soft'
  return (
    <header className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <Reveal>
        <div className={`flex items-baseline gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
          {index && <span className={`font-mono text-[0.6875rem] tracking-[0.22em] ${muted}`}>{index}</span>}
          <Eyebrow className={muted}>{label}</Eyebrow>
        </div>
      </Reveal>
      <Reveal delay={90}>
        <h2 className="display mt-6 text-[clamp(2.25rem,5.5vw,4.25rem)]">{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={170}>
          <p className={`mt-6 max-w-xl text-[1.0625rem] leading-relaxed ${body} ${align === 'center' ? 'mx-auto' : ''}`}>
            {lead}
          </p>
        </Reveal>
      )}
    </header>
  )
}

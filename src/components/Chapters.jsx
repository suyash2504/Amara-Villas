import JaaliModule from './Figures.jsx'
import { Reveal, Eyebrow } from './Ui.jsx'
import { useScrollProgress } from '../lib/motion.js'
import { chapters } from '../data/project.js'

/**
 * Three chapters, alternating sides. The figure drifts against the text at a
 * shallow rate — enough that the two columns feel independent, not enough to
 * read as an effect.
 *
 * Two chapters are photographed and one is drawn. That is deliberate: the
 * court and the materials are things you have to see, while the jaali is a
 * cast component and what matters about it is its dimension.
 */
export default function Chapters() {
  return (
    <section id="architecture" className="bg-sand/40 py-24 md:py-32">
      <div className="shell flex flex-col gap-28 md:gap-40">
        {chapters.map((c, i) => (
          <Chapter key={c.index} chapter={c} flipped={i % 2 === 1} />
        ))}
      </div>
    </section>
  )
}

function Chapter({ chapter, flipped }) {
  const [ref, p] = useScrollProgress()
  const shift = (p - 0.5) * 56

  return (
    <article
      ref={ref}
      className={`grid items-center gap-12 md:gap-16 lg:grid-cols-2 lg:gap-24 ${
        flipped ? 'lg:[&>figure]:order-first' : ''
      }`}
    >
      <div className={flipped ? 'lg:pl-6' : 'lg:pr-6'}>
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[0.6875rem] tracking-[0.22em] text-clay">{chapter.index}</span>
            <Eyebrow>{chapter.label}</Eyebrow>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h3 className="display mt-6 text-[clamp(1.875rem,3.6vw,3rem)]">{chapter.title}</h3>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-ink-soft">{chapter.body}</p>
        </Reveal>
      </div>

      <figure className="relative">
        <Reveal delay={120}>
          <div
            className="overflow-hidden border border-ink/10 bg-ivory-lift shadow-[0_30px_80px_-50px_rgba(36,28,22,0.5)]"
            style={{ transform: `translate3d(0, ${shift}px, 0)` }}
          >
            {chapter.photo ? (
              <img
                src={chapter.photo.src}
                alt={chapter.photo.alt}
                loading="lazy"
                decoding="async"
                className="block aspect-[4/5] w-full object-cover"
              />
            ) : (
              <JaaliModule />
            )}
          </div>
        </Reveal>
        <figcaption className="eyebrow mt-4 block">
          {chapter.photo ? 'Plate' : 'Fig.'} {chapter.index} — {chapter.label}
        </figcaption>
      </figure>
    </article>
  )
}

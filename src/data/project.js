/**
 * ---------------------------------------------------------------------------
 * AMARA — PROJECT DATA
 * ---------------------------------------------------------------------------
 * Amara is thirty-two standalone villas on their own plots along two garden
 * streets, not apartments inside one building. Every number and photograph
 * the site shows is declared here once — the villa cards, the plot explorer
 * and the availability counters all read from `inventory`, so a home can
 * never be "available" in one place and "sold" in another.
 * ---------------------------------------------------------------------------
 */

export const project = {
  name: 'AMARA',
  suffix: 'Villas',
  tagline: 'Light, held in stone.',
  locality: 'Telibandha',
  city: 'Raipur',
  reraLabel: 'CG RERA',
  rera: 'PCGRERA070225001183',
  possession: 'December 2028',
  architect: 'Studio Vernacular, Bengaluru',
  landscape: 'Ochre & Co.',
  phone: '+91 98765 43210',
  email: 'villas@amara.example',
  address: ['Lake Road, Telibandha', 'Raipur, Chhattisgarh 492006'],
}

/* --- Photography ------------------------------------------------------------
   Sourced from Unsplash under the Unsplash License (free to use commercially,
   no attribution required); see public/photos/CREDITS.md for the source of
   each file. Alt text lives here rather than at each call site, so a
   photograph can't be described one way in the gallery and another on a card.
   ------------------------------------------------------------------------ */

export const photos = {
  heroArrival: {
    src: 'photos/hero-arrival.webp',
    alt: 'The approach to a villa at dusk, lit from within, palms either side of the walk.',
  },
  villaA: {
    src: 'photos/villa-a.webp',
    alt: 'The Courtyard Villa — front elevation, timber cladding over a gated plot.',
  },
  villaB: {
    src: 'photos/villa-b.webp',
    alt: 'The Study Villa — front elevation, white plaster and a covered entrance.',
  },
  villaC: {
    src: 'photos/villa-c.webp',
    alt: 'The Garden Villa — front elevation, timber-screened glazing beside the lap pool.',
  },
  villaD: {
    src: 'photos/villa-d.webp',
    alt: 'The Grand Villa — front elevation, stone-clad and set back on its plot.',
  },
  green: {
    src: 'photos/green.webp',
    alt: 'The garden walk between plots, hedged on both sides.',
  },
  poolDetail: {
    src: 'photos/pool-detail.webp',
    alt: 'A private pool seen through an open window.',
  },
  travertine: {
    src: 'photos/travertine.webp',
    alt: 'Travertine, close up, showing its natural bedding lines.',
  },
  kitchen: {
    src: 'photos/kitchen.webp',
    alt: 'A kitchen with a marble island and an open dining table beyond.',
  },
  living: {
    src: 'photos/living.webp',
    alt: 'A living room in warm neutrals with morning light falling across the floor.',
  },
  livingAlt: {
    src: 'photos/living-alt.webp',
    alt: 'A second living room, pale upholstery against lime-washed walls.',
  },
  dining: {
    src: 'photos/dining.webp',
    alt: 'Sunlight moving across a dining table and its chairs.',
  },
  bedroom: {
    src: 'photos/bedroom.webp',
    alt: 'A bedroom with a large bed and a single painting on the wall.',
  },
  bedroomAlt: {
    src: 'photos/bedroom-alt.webp',
    alt: 'A bed set against a plaster wall, with a plant in the light beside it.',
  },
  bath: {
    src: 'photos/bath.webp',
    alt: 'A freestanding bathtub beneath a shuttered window.',
  },
  bath2: {
    src: 'photos/bath2.webp',
    alt: 'A bathroom in stone and plaster, afternoon light crossing the tub.',
  },
  terrace: {
    src: 'photos/terrace.webp',
    alt: 'A covered terrace with a dining table, looking out over the trees.',
  },
  study: {
    src: 'photos/study.webp',
    alt: 'A study desk in warm afternoon light, beside an arched opening.',
  },
  parking: {
    src: 'photos/parking.webp',
    alt: 'The covered car porch, a car standing under its roof beside the hedge.',
  },
  lawn: {
    src: 'photos/lawn.webp',
    alt: 'The lawn behind the house, mature trees along its far edge.',
  },
  kids: {
    src: 'photos/kids.webp',
    alt: 'A second bedroom in warm neutrals, a terracotta cushion on the bed.',
  },
  bath3: {
    src: 'photos/bath3.webp',
    alt: 'A bathroom in terracotta tile with a stone tub and a round mirror.',
  },
  kitchen2: {
    src: 'photos/kitchen2.webp',
    alt: 'A kitchen in curved warm wood, lit from under the shelves.',
  },
  pooja: {
    src: 'photos/pooja.webp',
    alt: 'The pooja room — lit niches in ivory panelling, brass lotus motifs below.',
  },
}

/** The gallery section, in the order the images are read. */
export const gallery = [
  // A caption names a villa type only where that photograph is genuinely
  // that type's room in the residences below. The gallery used to caption
  // Type B's living room as Type C's — the same contradiction the single
  // inventory exists to prevent, just in prose instead of numbers.
  { ...photos.villaA, caption: 'Type A, arriving' },
  { ...photos.living, caption: 'A living room, Type C' },
  { ...photos.pooja, caption: 'The pooja room' },
  { ...photos.villaB, caption: 'Type B, from the street' },
  { ...photos.kitchen2, caption: 'A kitchen, Type B' },
  { ...photos.bedroomAlt, caption: 'A bedroom, Type B' },
  { ...photos.villaC, caption: 'Type C, behind the screen' },
  { ...photos.terrace, caption: 'The verandah, Type C' },
  { ...photos.bath3, caption: 'Stone and afternoon light' },
  { ...photos.villaD, caption: 'Type D, at the street head' },
  { ...photos.poolDetail, caption: 'The private pool, Type D' },
  { ...photos.green, caption: 'The walk between plots' },
]

export const stats = [
  { value: '32', label: 'Villas' },
  { value: '4', label: 'Villa types' },
  { value: '4.8', label: 'Acre community' },
  { value: '60%', label: 'Green and open' },
]

/* --- The written spine of the site ---------------------------------------- */

export const statement =
  'Amara is thirty-two villas on their own plots, facing each other across two garden streets. Not one building holding many homes — thirty-two homes, each standing on its own ground, sharing only what makes sense to share: the walk in, the green at its centre, the gate.'

export const chapters = [
  {
    index: '01',
    label: 'The Street',
    title: 'Built around what it shares',
    body: 'Every plot fronts a planted street rather than a shared corridor. Two rows of villas face each other across hedge and lawn, so the only thing one home shares with the next is the walk between them. It is a quieter arrangement than a tower ever manages, because nothing here is stacked on top of anything else.',
    photo: photos.green,
  },
  {
    index: '02',
    label: 'The Screen',
    title: 'Light, filtered before it lands',
    body: 'West-facing openings, on every villa type, carry a terracotta jaali cast to a single module. It cuts the harsh afternoon load by a third before it reaches glass, and by evening it turns the wall behind it into a moving pattern. Cooling that is architecture rather than equipment.',
    figure: 'jaali',
  },
  {
    index: '03',
    label: 'The Material',
    title: 'Three materials, on every plot',
    body: 'Lime-washed plaster, Kota stone underfoot, and seasoned teak at every point a hand touches. The palette does not change from the smallest villa to the largest — the Grand Villa is finished exactly as the Courtyard Villa is, because a material that is only good enough for one plot was never good enough.',
    photo: photos.travertine,
  },
]

/* --- Villa types ------------------------------------------------------------
   Four plans. Each carries its own front elevation, a small interior set, and
   its own plot size — the number that actually distinguishes one standalone
   home from another, the way a floor number used to distinguish an apartment.
   ------------------------------------------------------------------------ */

export const residences = [
  {
    code: 'A',
    name: 'The Courtyard Villa',
    beds: '3 Bed',
    plotSize: 1620,
    carpet: 2340,
    built: 3180,
    parking: '1 covered',
    facing: 'Corner plot, morning sun',
    price: 3.85,
    photo: photos.villaA,
    blurb:
      'The plan every other type was drawn from. A compact plot with a private entrance court, sized for a couple starting out or a family ending their search.',
    // Every room a buyer walks through, photographed and named. A plan gives
    // dimensions; only a photograph answers what the room is like to stand in.
    interiors: [
      { ...photos.living, room: 'Living' },
      { ...photos.dining, room: 'Dining' },
      { ...photos.kitchen, room: 'Kitchen' },
      { ...photos.pooja, room: 'Pooja room' },
      { ...photos.bedroom, room: 'Primary bedroom' },
      { ...photos.kids, room: 'Bedroom 2' },
      { ...photos.bath, room: 'Bathroom' },
      { ...photos.parking, room: 'Car porch' },
      { ...photos.lawn, room: 'Lawn' },
    ],
    rooms: [
      { name: 'Living', dim: "22' x 16'" },
      { name: 'Dining', dim: "14' x 12'" },
      { name: 'Kitchen', dim: "12' x 10'" },
      { name: 'Pooja room', dim: "6' x 5'" },
      { name: 'Primary', dim: "16' x 14'" },
      { name: 'Bedroom 2', dim: "13' x 12'" },
      { name: 'Bedroom 3', dim: "12' x 11'" },
      { name: 'Bathroom', dim: "8' x 6'" },
      { name: 'Car porch', dim: "16' x 11'" },
    ],
  },
  {
    code: 'B',
    name: 'The Study Villa',
    beds: '3 Bed + Study',
    plotSize: 1980,
    carpet: 2780,
    built: 3720,
    parking: '1 covered',
    facing: 'Mid-plot, both streets',
    price: 4.6,
    photo: photos.villaB,
    blurb:
      'A separate study off the entry, with its own light and its own door. A room for work that does not borrow from a bedroom, on the plan that fills most of both streets.',
    interiors: [
      { ...photos.livingAlt, room: 'Living' },
      { ...photos.study, room: 'Study' },
      { ...photos.kitchen2, room: 'Kitchen' },
      { ...photos.pooja, room: 'Pooja room' },
      { ...photos.bedroomAlt, room: 'Primary bedroom' },
      { ...photos.kids, room: 'Bedroom 2' },
      { ...photos.bath2, room: 'Bathroom' },
      { ...photos.parking, room: 'Car porch' },
      { ...photos.lawn, room: 'Lawn' },
    ],
    rooms: [
      { name: 'Living', dim: "24' x 16'" },
      { name: 'Study', dim: "12' x 10'" },
      { name: 'Kitchen', dim: "12' x 10'" },
      { name: 'Pooja room', dim: "6' x 6'" },
      { name: 'Primary', dim: "17' x 14'" },
      { name: 'Bedroom 2', dim: "14' x 12'" },
      { name: 'Bedroom 3', dim: "12' x 12'" },
      { name: 'Bathroom', dim: "8' x 7'" },
      { name: 'Car porch', dim: "18' x 11'" },
    ],
  },
  {
    code: 'C',
    name: 'The Garden Villa',
    beds: '4 Bed',
    plotSize: 2700,
    carpet: 3410,
    built: 4480,
    parking: '2 covered',
    facing: 'Wide plot, private lap pool',
    price: 6.2,
    photo: photos.villaC,
    blurb:
      'The full west face sits behind the terracotta screen, with a lap pool run the length of the plot and a covered terrace that stays usable through the hottest hour of the day.',
    interiors: [
      { ...photos.living, room: 'Living' },
      { ...photos.terrace, room: 'Verandah' },
      { ...photos.kitchen, room: 'Kitchen' },
      { ...photos.pooja, room: 'Pooja room' },
      { ...photos.bedroom, room: 'Primary bedroom' },
      { ...photos.bath3, room: 'Bathroom' },
      { ...photos.poolDetail, room: 'Lap pool' },
      { ...photos.parking, room: 'Car porch' },
      { ...photos.lawn, room: 'Lawn' },
    ],
    rooms: [
      { name: 'Living', dim: "26' x 18'" },
      { name: 'Verandah', dim: "20' x 8'" },
      { name: 'Kitchen', dim: "13' x 11'" },
      { name: 'Pooja room', dim: "7' x 6'" },
      { name: 'Primary', dim: "18' x 15'" },
      { name: 'Bedroom 2', dim: "14' x 13'" },
      { name: 'Bedroom 3', dim: "13' x 12'" },
      { name: 'Bedroom 4', dim: "12' x 12'" },
      { name: 'Bathroom', dim: "9' x 7'" },
      { name: 'Car porch', dim: "20' x 18'" },
    ],
  },
  {
    code: 'D',
    name: 'The Grand Villa',
    beds: '4 Bed',
    plotSize: 4050,
    carpet: 5200,
    built: 6900,
    parking: '2 covered',
    facing: 'Street head, facing the green',
    price: 9.8,
    photo: photos.villaD,
    blurb:
      'Only two plots sit at the head of a street, facing the shared green on three sides. The largest home in the community, with its own pool and a stone facade set back behind a deeper lawn.',
    interiors: [
      { ...photos.livingAlt, room: 'Living' },
      { ...photos.dining, room: 'Family room' },
      { ...photos.kitchen2, room: 'Kitchen' },
      { ...photos.pooja, room: 'Pooja room' },
      { ...photos.bedroom, room: 'Primary suite' },
      { ...photos.kids, room: 'Bedroom 2' },
      { ...photos.bath3, room: 'Bathroom' },
      { ...photos.poolDetail, room: 'Private pool' },
      { ...photos.parking, room: 'Car porch' },
      { ...photos.lawn, room: 'Lawn' },
    ],
    rooms: [
      { name: 'Living', dim: "32' x 20'" },
      { name: 'Family room', dim: "18' x 14'" },
      { name: 'Kitchen', dim: "14' x 12'" },
      { name: 'Pooja room', dim: "8' x 7'" },
      { name: 'Primary suite', dim: "22' x 16'" },
      { name: 'Bedroom 2', dim: "14' x 13'" },
      { name: 'Bedroom 3', dim: "14' x 13'" },
      { name: 'Bedroom 4', dim: "13' x 12'" },
      { name: 'Bathroom', dim: "10' x 8'" },
      { name: 'Car porch', dim: "22' x 18'" },
    ],
  },
]

/* --- Inventory --------------------------------------------------------------
   Two garden streets, sixteen plots each. The same type sequence repeats down
   both streets, so it can be read rather than memorised: mostly the Study
   Villa, with Courtyard and Garden villas dispersed between them, and the
   single Grand Villa at the head of each street, facing the green.

   Sold and held plots are listed by hand rather than randomised, so
   availability is stable between reloads.
   ------------------------------------------------------------------------ */

const STREETS = [
  { code: 'RT', name: 'Rain Tree Street', facing: 'Faces east, morning sun' },
  { code: 'NM', name: 'Neem Street', facing: 'Faces west, behind the jaali' },
]

/** 16 plots per street: mostly Type B, with A and C dispersed and one D at the head. */
const TYPE_SEQUENCE = ['C', 'B', 'A', 'B', 'B', 'C', 'A', 'B', 'B', 'C', 'A', 'B', 'B', 'C', 'A', 'D']

const SOLD = new Set(['RT-02', 'RT-03', 'RT-05', 'RT-08', 'RT-11', 'RT-13', 'NM-01', 'NM-04', 'NM-07', 'NM-09', 'NM-12', 'NM-15'])
const HELD = new Set(['RT-06', 'RT-14', 'NM-03', 'NM-10'])

/** Plots 1 and 16 sit at the street's two ends, facing the green — a premium. */
const isGreenFacing = (position) => position === 1 || position === 16

export const positions = Array.from({ length: 16 }, (_, i) => i + 1)

export const inventory = STREETS.flatMap((street) =>
  positions.map((position) => {
    const type = TYPE_SEQUENCE[position - 1]
    const res = residences.find((r) => r.code === type)
    const id = `${street.code}-${String(position).padStart(2, '0')}`
    const premium = isGreenFacing(position) ? 0.35 : 0
    return {
      id,
      street: street.code,
      streetName: street.name,
      position,
      type,
      name: res.name,
      beds: res.beds,
      carpet: res.carpet,
      plotSize: res.plotSize,
      facing: isGreenFacing(position) ? `${street.facing}, corner on the green` : street.facing,
      photo: res.photo,
      price: Number((res.price + premium).toFixed(2)),
      status: SOLD.has(id) ? 'sold' : HELD.has(id) ? 'held' : 'available',
    }
  }),
)

export const plotsOnStreet = (streetCode) => inventory.filter((u) => u.street === streetCode)

export const availableCount = inventory.filter((u) => u.status === 'available').length

/* --- Amenities ------------------------------------------------------------- */

export const amenities = [
  { glyph: 'court', name: 'The Green', note: 'The planted spine both streets face, kept for shared use.' },
  { glyph: 'pool', name: 'Clubhouse Pool, 25m', note: 'Beyond the private pools on Type C and D plots.' },
  { glyph: 'gym', name: 'Strength and Studio', note: 'Two rooms rather than one, so weights stay away from mats.' },
  { glyph: 'library', name: 'The Reading Room', note: 'Double height, north light, no screens by agreement.' },
  { glyph: 'dining', name: 'Private Dining', note: 'A twelve-seat table and a kitchen you can book.' },
  { glyph: 'terrace', name: 'The Clubhouse Terrace', note: 'Open to all thirty-two homes, not only the largest.' },
  { glyph: 'kids', name: 'The Sand Court', note: 'Shade, sand, and sightlines from three sides.' },
  { glyph: 'concierge', name: 'Concierge', note: 'One desk, staffed, sixteen hours a day, at the gate.' },
]

/* --- Location -------------------------------------------------------------- */

export const nearby = [
  { name: 'Marine Drive, Telibandha', kind: 'Waterfront', minutes: 3, bearing: 302, distance: 0.8 },
  { name: 'Magneto The Mall', kind: 'Retail', minutes: 8, bearing: 122, distance: 2.4 },
  { name: 'Ramkrishna Care Hospital', kind: 'Health', minutes: 10, bearing: 206, distance: 3.1 },
  { name: 'Delhi Public School', kind: 'Education', minutes: 15, bearing: 250, distance: 5.4 },
  { name: 'Raipur Junction', kind: 'Transit', minutes: 13, bearing: 172, distance: 4.8 },
  { name: 'Swami Vivekananda Airport', kind: 'Transit', minutes: 24, bearing: 18, distance: 12.6 },
]

export const timeline = [
  { date: 'Q1 2026', label: 'Earthwork and street grading', done: true },
  { date: 'Q4 2026', label: 'First street topped out', done: true },
  { date: 'Q3 2027', label: 'Second street topped out', done: false },
  { date: 'Q2 2028', label: 'Facade and jaali, all plots', done: false },
  { date: 'Q4 2028', label: 'Handover', done: false },
]

import { useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Statement from './components/Statement.jsx'
import Chapters from './components/Chapters.jsx'
import Residences from './components/Residences.jsx'
import PlanExplorer from './components/PlanExplorer.jsx'
import Amenities from './components/Amenities.jsx'
import Gallery from './components/Gallery.jsx'
import Location from './components/Location.jsx'
import Enquire from './components/Enquire.jsx'
import Footer from './components/Footer.jsx'
import BackToTop from './components/BackToTop.jsx'
import { useSmoothScroll } from './lib/motion.js'

export default function App() {
  useSmoothScroll()

  // The unit chosen in the availability explorer, carried down into the
  // viewing form so an enquiry names a specific residence.
  const [interest, setInterest] = useState(null)

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Chapters />
        <Residences />
        <PlanExplorer onEnquire={setInterest} />
        <Amenities />
        <Gallery />
        <Location />
        <Enquire interest={interest} />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

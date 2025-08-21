import { useState } from 'react'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import Gallery from './components/Gallery'
import Lightbox from './components/Lightbox'
import { galleryPhotos } from './data/galleryData'

function App() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const openLightbox = (photo) => {
    const index = galleryPhotos.findIndex(p => p.id === photo.id)
    setCurrentPhotoIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const goToPrevious = () => {
    setCurrentPhotoIndex(prev => prev > 0 ? prev - 1 : prev)
  }

  const goToNext = () => {
    setCurrentPhotoIndex(prev => prev < galleryPhotos.length - 1 ? prev + 1 : prev)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />
      <Gallery onImageClick={openLightbox} />
      
      <Lightbox 
        isOpen={isLightboxOpen}
        photo={galleryPhotos[currentPhotoIndex]}
        onClose={closeLightbox}
        onPrevious={goToPrevious}
        onNext={goToNext}
        hasPrevious={currentPhotoIndex > 0}
        hasNext={currentPhotoIndex < galleryPhotos.length - 1}
      />
    </div>
  )
}

export default App

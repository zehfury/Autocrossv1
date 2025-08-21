import { useEffect } from 'react'

const Lightbox = ({ isOpen, photo, onClose, onPrevious, onNext, hasPrevious, hasNext }) => {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          if (hasPrevious) onPrevious()
          break
        case 'ArrowRight':
          if (hasNext) onNext()
          break
        default:
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, hasPrevious, hasNext, onClose, onPrevious, onNext])

  if (!isOpen || !photo) return null

  return (
    <div className="fixed inset-0 z-50 lightbox-overlay animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-90" 
        onClick={onClose}
      ></div>
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center p-4">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 w-12 h-12 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-10"
          aria-label="Close lightbox"
        >
          &times;
        </button>
        
        {/* Previous Button */}
        {hasPrevious && (
          <button 
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors z-10 w-12 h-12 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-10"
            aria-label="Previous image"
          >
            &#10094;
          </button>
        )}
        
        {/* Next Button */}
        {hasNext && (
          <button 
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors z-10 w-12 h-12 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-10"
            aria-label="Next image"
          >
            &#10095;
          </button>
        )}
        
        {/* Image Container */}
        <div className="max-w-4xl max-h-full flex flex-col items-center">
          <img 
            src={photo.src} 
            alt={photo.title}
            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
          />
          
          {/* Caption */}
          <div className="text-center mt-6 text-white max-w-2xl">
            <h3 className="text-xl font-semibold mb-2">{photo.title}</h3>
            <p className="text-gray-300 text-lg">{photo.caption}</p>
            
            {/* Navigation Info */}
            <div className="mt-4 text-sm text-gray-400">
              <p>Use arrow keys or click the buttons to navigate</p>
              <p>Press ESC to close</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lightbox

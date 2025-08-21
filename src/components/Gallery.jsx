import { useState, useEffect } from 'react'
import GalleryItem from './GalleryItem'
import { galleryPhotos, categories } from '../data/galleryData'

const Gallery = ({ onImageClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [displayedPhotos, setDisplayedPhotos] = useState([])
  const [hasMorePhotos, setHasMorePhotos] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const photosPerPage = 8

  // Filter photos based on selected category
  const filteredPhotos = selectedCategory === 'all' 
    ? galleryPhotos 
    : galleryPhotos.filter(photo => photo.category === selectedCategory)

  // Load more photos
  const loadMorePhotos = () => {
    const nextPage = currentPage + 1
    const startIndex = 0
    const endIndex = nextPage * photosPerPage
    const newPhotos = filteredPhotos.slice(startIndex, endIndex)
    
    setDisplayedPhotos(newPhotos)
    setCurrentPage(nextPage)
    setHasMorePhotos(endIndex < filteredPhotos.length)
  }

  // Reset gallery when category changes
  useEffect(() => {
    const initialPhotos = filteredPhotos.slice(0, photosPerPage)
    setDisplayedPhotos(initialPhotos)
    setCurrentPage(1)
    setHasMorePhotos(filteredPhotos.length > photosPerPage)
  }, [selectedCategory, filteredPhotos])

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Filter by Category
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-autocross-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {displayedPhotos.map(photo => (
            <GalleryItem 
              key={photo.id} 
              photo={photo} 
              onImageClick={onImageClick}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMorePhotos && (
          <div className="text-center mt-12">
            <button 
              onClick={loadMorePhotos}
              className="btn-primary"
            >
              LOAD MORE PHOTOS
            </button>
          </div>
        )}

        {/* No Photos Message */}
        {displayedPhotos.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-images text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No photos found
            </h3>
            <p className="text-gray-500">
              Try selecting a different category or check back later for new photos.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery

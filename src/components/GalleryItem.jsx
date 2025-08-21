const GalleryItem = ({ photo, onImageClick }) => {
  return (
    <div 
      className="gallery-item group"
      onClick={() => onImageClick(photo)}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={photo.src} 
          alt={photo.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <i className="fas fa-search-plus text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100"></i>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-autocross-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            {photo.category}
          </span>
        </div>
      </div>
      <div className="p-4 bg-white rounded-b-lg">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-autocross-600 transition-colors">
          {photo.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {photo.caption}
        </p>
        <div className="mt-3 flex items-center text-xs text-gray-500">
          <i className="fas fa-eye mr-1"></i>
          <span>Click to view</span>
        </div>
      </div>
    </div>
  )
}

export default GalleryItem

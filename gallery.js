// Simple Gallery JavaScript
class SimpleGallery {
    constructor() {
      this.photos = []
      this.currentPhotoIndex = 0
      this.photosPerPage = 12 // Reduced for better performance
      this.currentPage = 1
      this.isLoading = false
      this.imageCache = new Set() // Cache for loaded images
  
      this.init()
    }
  
    init() {
      this.loadPhotos()
      this.bindEvents()
      this.renderPhotos()
      this.preloadNextPage() // Preload next page images
    }
  
    loadPhotos() {
      // Sample photo data - replace with your actual photos
      this.photos = [
        {
          id: 1,
          src: "/assets/cars/gallery/101.jpg",
          title: "Championship Action - Mitsubishi Lancer Evolution V",
          caption: "Intense racing action during the championship finals",
        },
        {
          id: 2,
          src: "/assets/cars/gallery/102.jpg",
          title: "Precision Driving - Mazda MX-5 Miata",
          caption: "Perfect cornering technique through the chicane",
        },
        {
          id: 3,
          src: "/assets/cars/gallery/103.jpg",
          title: "Subaru WRX STI Portrait",
          caption: "Championship-winning Subaru WRX STI",
        },
        {
          id: 4,
          src: "/assets/cars/gallery/104.jpg",
          title: "Event Day 1",
          caption: "Opening day of the Spring Championship",
        },
        {
          id: 5,
          src: "/assets/cars/gallery/105.jpg",
          title: "Behind the Scenes",
          caption: "Team preparation and setup",
        },
        {
            id: 6,
            src: "/assets/cars/gallery/106.jpg",
            title: "Championship Poster",
            caption: "Official event promotional material",
            },
        {
                id: 7,
                src: "/assets/cars/gallery/107.jpg",
                title: "Championship Poster",
                caption: "Official event promotional material",
                },
        {
                    id: 6,
                    src: "/assets/cars/gallery/108.jpg",
                    title: "Championship Poster",
                    caption: "Official event promotional material",
                    }, // Add more photos with placeholder images  
                    {
                      id: 7,
                      src: "/assets/cars/gallery/109.jpg",
                      title: "Championship Poster",
                      caption: "Official event promotional material",
                      },
                      {
                        id: 7,
                        src: "/assets/cars/gallery/91.jpg",
                        title: "Championship Poster",
                        caption: "Official event promotional material",
                        },
                        {
                          id: 7,
                          src: "/assets/cars/gallery/92.jpg",
                          title: "Championship Poster",
                          caption: "Official event promotional material",
                          },
                          {
                            id: 7,
                            src: "/assets/cars/gallery/93.jpg",
                            title: "Championship Poster",
                            caption: "Official event promotional material",
                            },
                            {
                              id: 7,
                              src: "/assets/cars/gallery/94.jpg",
                              title: "Championship Poster",
                              caption: "Official event promotional material",
                              },
                              {
                                id: 7,
                                src: "/assets/cars/gallery/95.jpg",
                                title: "Championship Poster",
                                caption: "Official event promotional material",
                                },
                                {
                                  id: 7,
                                  src: "/assets/cars/gallery/96.jpg",
                                  title: "Championship Poster",
                                  caption: "Official event promotional material",
                                  },
                                  {
                                    id: 7,
                                    src: "/assets/cars/gallery/97.jpg",
                                    title: "Championship Poster",
                                    caption: "Official event promotional material",
                                    },
                                    {
                                      id: 7,
                                      src: "/assets/cars/gallery/98.jpg",
                                      title: "Championship Poster",
                                      caption: "Official event promotional material",
                                      },
                                      {
                                        id: 7,
                                        src: "/assets/cars/gallery/99.jpg",
                                        title: "Championship Poster",
                                        caption: "Official event promotional material",
                                        },
                                        {
                                          id: 7,
                                          src: "/assets/cars/gallery/100.jpg",
                                          title: "Championship Poster",
                                          caption: "Official event promotional material",
                                          },
        ...this.generatePlaceholderPhotos(1)
      ]
    }
  
    generatePlaceholderPhotos(count) {
      const placeholderPhotos = []
      const categories = ["Action", "Cars", "Awards", "Behind Scenes", "Track", "Drivers"]
      const carImages = [
        "/assets/cars/evo5.jpg",
        "/assets/cars/mx5.jpg", 
        "/assets/cars/wrx.jpg",
        "/assets/cars/hatch.jpg",
        "/assets/cars/crv.jpg",
        "/assets/cars/civic.jpg",
        "/assets/cars/86.jpg",
        "/assets/cars/japan.jpg",
        "/assets/cars/mazda.jpg"
      ]
  
      for (let i = 0; i < count; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)]
        const randomCarImage = carImages[Math.floor(Math.random() * carImages.length)]
        placeholderPhotos.push({
          id: i + 7,
          src: randomCarImage,
          title: `${category} Photo ${i + 1}`,
          caption: `Professional ${category.toLowerCase()} photography from the Spring Championship event`,
        })
      }
  
      return placeholderPhotos
    }
  
    renderPhotos() {
      const photoGrid = document.getElementById("photoGrid")
      if (!photoGrid) return
  
      const photosToShow = this.photos.slice(0, this.currentPage * this.photosPerPage)
  
      // Clear existing photos if this is the first page
      if (this.currentPage === 1) {
        photoGrid.innerHTML = ""
      }
  
      // Add new photos efficiently using DocumentFragment
      const startIndex = (this.currentPage - 1) * this.photosPerPage
      const newPhotos = photosToShow.slice(startIndex)
      
      const fragment = document.createDocumentFragment()
      
      newPhotos.forEach((photo, index) => {
        const photoElement = this.createPhotoElement(photo, startIndex + index)
        fragment.appendChild(photoElement)
      })
      
      photoGrid.appendChild(fragment)
      this.updateLoadMoreButton()
      this.preloadNextPage() // Preload next page after rendering
    }
  
    createPhotoElement(photo, index) {
      const photoItem = document.createElement("div")
      photoItem.className = "photo-item loading"
      photoItem.dataset.index = index
  
      const img = document.createElement("img")
      img.src = photo.src
      img.alt = photo.title
      img.loading = "lazy"
      img.decoding = "async"
  
      // Handle image load
      img.onload = () => {
        photoItem.classList.remove("loading")
        img.classList.add("loaded")
        this.imageCache.add(photo.src) // Cache the loaded image
      }
  
      // Handle image error
      img.onerror = () => {
        photoItem.classList.remove("loading")
        img.src = "/assets/cars/evo5.jpg" // Fallback to a known working image
        img.classList.add("loaded")
      }
  
      // Add click event for lightbox using event delegation
      photoItem.addEventListener("click", () => {
        this.openLightbox(index)
      })
  
      photoItem.appendChild(img)
      return photoItem
    }
  
    bindEvents() {
      // Mobile menu toggle
      const mobileMenuBtn = document.getElementById("mobileMenuBtn")
      const navMenu = document.querySelector(".nav-menu")
  
      if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener("click", () => {
          navMenu.classList.toggle("active")
        })
      }
  
      // Load more button
      const loadMoreBtn = document.getElementById("loadMoreBtn")
      if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
          this.loadMorePhotos()
        })
      }
  
      // Lightbox events
      this.bindLightboxEvents()
  
      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        this.handleKeyboardNavigation(e)
      })
    }
  
    loadMorePhotos() {
      if (this.isLoading) return
  
      const totalPhotos = this.photos.length
      const photosShown = this.currentPage * this.photosPerPage
  
      if (photosShown >= totalPhotos) return
  
      this.isLoading = true
      const loadMoreBtn = document.getElementById("loadMoreBtn")
  
      if (loadMoreBtn) {
        loadMoreBtn.textContent = "Loading..."
        loadMoreBtn.disabled = true
      }
  
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        this.currentPage++
        this.renderPhotos()
        this.isLoading = false
  
        if (loadMoreBtn) {
          loadMoreBtn.textContent = "Load More Photos"
          loadMoreBtn.disabled = false
        }
      })
    }
  
    updateLoadMoreButton() {
      const loadMoreBtn = document.getElementById("loadMoreBtn")
      const loadMoreSection = document.querySelector(".load-more-section")
  
      if (loadMoreBtn && loadMoreSection) {
        const totalPhotos = this.photos.length
        const photosShown = this.currentPage * this.photosPerPage
  
        if (photosShown >= totalPhotos) {
          loadMoreSection.style.display = "none"
        } else {
          loadMoreSection.style.display = "block"
        }
      }
    }
  
    preloadNextPage() {
      const nextPageStart = this.currentPage * this.photosPerPage
      const nextPageEnd = Math.min(nextPageStart + this.photosPerPage, this.photos.length)
      
      for (let i = nextPageStart; i < nextPageEnd; i++) {
        const photo = this.photos[i]
        if (photo && !this.imageCache.has(photo.src)) {
          const img = new Image()
          img.src = photo.src
          img.onload = () => {
            this.imageCache.add(photo.src)
          }
        }
      }
    }
  
    // Lightbox functionality
    bindLightboxEvents() {
      const lightbox = document.getElementById("lightbox")
      const lightboxClose = document.getElementById("lightboxClose")
      const lightboxPrev = document.getElementById("lightboxPrev")
      const lightboxNext = document.getElementById("lightboxNext")
  
      if (lightboxClose) {
        lightboxClose.addEventListener("click", (e) => {
          e.preventDefault()
          e.stopPropagation()
          this.closeLightbox()
        })
      }
  
      if (lightbox) {
        lightbox.addEventListener("click", (e) => {
          if (e.target === lightbox) {
            e.preventDefault()
            e.stopPropagation()
            this.closeLightbox()
          }
        })
      }
  
      if (lightboxPrev) {
        lightboxPrev.addEventListener("click", (e) => {
          e.preventDefault()
          e.stopPropagation()
          this.navigateLightbox(-1)
        })
      }
  
      if (lightboxNext) {
        lightboxNext.addEventListener("click", (e) => {
          e.preventDefault()
          e.stopPropagation()
          this.navigateLightbox(1)
        })
      }
    }
  
    openLightbox(index) {
      this.currentPhotoIndex = index
      const photo = this.photos[index]
      const lightbox = document.getElementById("lightbox")
      const lightboxImage = document.getElementById("lightboxImage")
      const lightboxCaption = document.getElementById("lightboxCaption")
  
      if (lightbox && lightboxImage && photo) {
        lightboxImage.src = photo.src
        lightboxImage.alt = photo.title
  
        if (lightboxCaption) {
          lightboxCaption.textContent = photo.caption || photo.title
        }
  
        lightbox.classList.add("active")
        document.body.style.overflow = "hidden"
      }
    }
  
    closeLightbox() {
      const lightbox = document.getElementById("lightbox")
      if (lightbox) {
        lightbox.classList.remove("active")
        document.body.style.overflow = "auto"
      }
    }
  
    navigateLightbox(direction) {
      const lightbox = document.getElementById("lightbox")
      if (!lightbox || !lightbox.classList.contains("active")) return
      
      const newIndex = this.currentPhotoIndex + direction
  
      if (newIndex >= 0 && newIndex < this.photos.length) {
        this.openLightbox(newIndex)
      }
    }
  
    handleKeyboardNavigation(e) {
      const lightbox = document.getElementById("lightbox")
      if (!lightbox || !lightbox.classList.contains("active")) return
  
      switch (e.key) {
        case "Escape":
          e.preventDefault()
          e.stopPropagation()
          this.closeLightbox()
          break
        case "ArrowLeft":
          e.preventDefault()
          e.stopPropagation()
          this.navigateLightbox(-1)
          break
        case "ArrowRight":
          e.preventDefault()
          e.stopPropagation()
          this.navigateLightbox(1)
          break
      }
    }
  }
  
  // Initialize gallery when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    new SimpleGallery()
  })
  
  // Handle window resize for responsive behavior
  window.addEventListener("resize", () => {
    const navMenu = document.querySelector(".nav-menu")
    if (window.innerWidth > 768 && navMenu) {
      navMenu.classList.remove("active")
    }
  })
  
// Simple Gallery JavaScript
class SimpleGallery {
    constructor() {
        this.photos = []
        this.currentPhotoIndex = 0
        this.photosPerPage = 12
        this.currentPage = 1
        this.isLoading = false
        
        this.init()
    }

    init() {
        this.loadPhotos()
        this.bindEvents()
        this.renderPhotos()
    }

    loadPhotos() {
        // Event photos - using actual available gallery images
        this.photos = [
            {
                id: 1,
                src: "/assets/cars/gallery/101.jpg",
                title: "Championship Action - Mitsubishi Lancer Evolution V",
                caption: "Intense racing action during the championship finals"
            },
            {
                id: 2,
                src: "/assets/cars/gallery/102.jpg",
                title: "Precision Driving - Mazda MX-5 Miata",
                caption: "Perfect cornering technique through the chicane"
            },
            {
                id: 3,
                src: "/assets/cars/gallery/103.jpg",
                title: "Subaru WRX STI Portrait",
                caption: "Championship-winning Subaru WRX STI"
            },
            {
                id: 4,
                src: "/assets/cars/gallery/104.jpg",
                title: "Event Day 1",
                caption: "Opening day of the Spring Championship"
            },
            {
                id: 5,
                src: "/assets/cars/gallery/105.jpg",
                title: "Behind the Scenes",
                caption: "Team preparation and setup"
            },
            {
                id: 6,
                src: "/assets/cars/gallery/106.jpg",
                title: "Championship Action",
                caption: "High-speed cornering action"
            },
            {
                id: 7,
                src: "/assets/cars/gallery/107.jpg",
                title: "Racing Competition",
                caption: "Competitive racing moments"
            },
            {
                id: 8,
                src: "/assets/cars/gallery/108.jpg",
                title: "Track Action",
                caption: "Exciting track moments"
            },
            {
                id: 9,
                src: "/assets/cars/gallery/109.jpg",
                title: "Championship Racing",
                caption: "Championship-level competition"
            },
            {
                id: 10,
                src: "/assets/cars/gallery/110.jpg",
                title: "Autocross Action",
                caption: "Dynamic autocross racing"
            },
            {
                id: 11,
                src: "/assets/cars/gallery/111.jpg",
                title: "Final Championship",
                caption: "Championship finale moments"
            },
            {
                id: 12,
                src: "/assets/cars/gallery/92.jpg",
                title: "Racing Action",
                caption: "High-performance racing"
            },
            {
                id: 13,
                src: "/assets/cars/gallery/93.jpg",
                title: "Track Competition",
                caption: "Competitive track racing"
            },
            {
                id: 14,
                src: "/assets/cars/gallery/94.jpg",
                title: "Speed Racing",
                caption: "High-speed competition"
            },
            {
                id: 15,
                src: "/assets/cars/gallery/95.jpg",
                title: "Championship Racing",
                caption: "Championship-level action"
            },
            {
                id: 16,
                src: "/assets/cars/gallery/96.jpg",
                title: "Autocross Competition",
                caption: "Autocross racing competition"
            },
            {
                id: 17,
                src: "/assets/cars/gallery/97.jpg",
                title: "Track Action",
                caption: "Exciting track moments"
            },
            {
                id: 18,
                src: "/assets/cars/gallery/98.jpg",
                title: "Racing Championship",
                caption: "Championship racing action"
            },
            {
                id: 19,
                src: "/assets/cars/gallery/99.jpg",
                title: "Final Competition",
                caption: "Final competition moments"
            }
        ]
    }

    renderPhotos() {
        const galleryGrid = document.getElementById("galleryGrid")
        if (!galleryGrid) return

        const startIndex = (this.currentPage - 1) * this.photosPerPage
        const endIndex = Math.min(startIndex + this.photosPerPage, this.photos.length)
        const photosToShow = this.photos.slice(startIndex, endIndex)

        // Clear grid if first page
        if (this.currentPage === 1) {
            galleryGrid.innerHTML = ""
        }

        // Create and append photo elements
        photosToShow.forEach((photo, index) => {
            const photoElement = this.createPhotoElement(photo, startIndex + index)
            galleryGrid.appendChild(photoElement)
        })

        this.updateLoadMoreButton()
    }

    createPhotoElement(photo, index) {
        const galleryItem = document.createElement("div")
        galleryItem.className = "gallery-item"
        galleryItem.dataset.index = index

        const img = document.createElement("img")
        img.src = photo.src
        img.alt = photo.title
        img.loading = "lazy"

        // Handle image error
        img.onerror = () => {
            img.src = "/assets/cars/evo5.jpg" // Fallback image
        }

        // Click to open lightbox
        galleryItem.addEventListener("click", () => {
            this.openLightbox(index)
        })

        galleryItem.appendChild(img)
        return galleryItem
    }

    bindEvents() {
        // Mobile menu
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

        // Simulate loading delay for better UX
        setTimeout(() => {
            this.currentPage++
            this.renderPhotos()
            this.isLoading = false

            if (loadMoreBtn) {
                loadMoreBtn.textContent = "LOAD MORE PHOTOS"
                loadMoreBtn.disabled = false
            }
        }, 300)
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

    // Lightbox functionality
    bindLightboxEvents() {
        const lightbox = document.getElementById("lightbox")
        const lightboxClose = document.getElementById("lightboxClose")
        const lightboxPrev = document.getElementById("lightboxPrev")
        const lightboxNext = document.getElementById("lightboxNext")

        if (lightboxClose) {
            lightboxClose.addEventListener("click", () => {
                this.closeLightbox()
            })
        }

        if (lightbox) {
            lightbox.addEventListener("click", (e) => {
                if (e.target === lightbox) {
                    this.closeLightbox()
                }
            })
        }

        if (lightboxPrev) {
            lightboxPrev.addEventListener("click", () => {
                this.navigateLightbox(-1)
            })
        }

        if (lightboxNext) {
            lightboxNext.addEventListener("click", () => {
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
                this.closeLightbox()
                break
            case "ArrowLeft":
                this.navigateLightbox(-1)
                break
            case "ArrowRight":
                this.navigateLightbox(1)
                break
        }
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new SimpleGallery()
})

// Handle window resize
window.addEventListener("resize", () => {
    const navMenu = document.querySelector(".nav-menu")
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove("active")
    }
})
  
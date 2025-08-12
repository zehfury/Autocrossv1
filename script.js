// ===== MINIMAL ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero fade-in animations
    const heroElements = document.querySelectorAll('.fade-in');
    gsap.to(heroElements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.3
    });
    
    // Scroll-triggered slide-up animations
    gsap.utils.toArray('.slide-up').forEach((element, index) => {
        gsap.fromTo(element, 
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: index * 0.05,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
});

// Close banner function
function closeBanner() {
    const banner = document.getElementById('topBanner');
    banner.style.display = 'none';
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for sticky navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Floating Register CTA functionality
let lastScrollTop = 0;
let scrollTimeout;

window.addEventListener('scroll', function() {
    const floatingCta = document.getElementById('floatingCta');
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only show on mobile devices
    if (window.innerWidth <= 768) {
        // Show floating CTA after scrolling down 300px
        if (currentScrollTop > 300) {
            floatingCta.classList.add('show');
        } else {
            floatingCta.classList.remove('show');
        }
        
        // Hide when scrolling up quickly (user might be going back to top)
        if (currentScrollTop < lastScrollTop && (lastScrollTop - currentScrollTop) > 50) {
            floatingCta.classList.remove('show');
        }
        
        // Auto-hide after 3 seconds of no scrolling
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (currentScrollTop > 300) {
                floatingCta.classList.remove('show');
            }
        }, 3000);
    } else {
        // Hide on desktop
        floatingCta.classList.remove('show');
    }
    
    lastScrollTop = currentScrollTop;
});

// Show floating CTA on page load if user is already scrolled down
document.addEventListener('DOMContentLoaded', function() {
    const floatingCta = document.getElementById('floatingCta');
    if (window.innerWidth <= 768 && window.pageYOffset > 300) {
        floatingCta.classList.add('show');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    // Add animation styles to elements
    const animatedElements = document.querySelectorAll('.event-card, .gallery-item, .merch-item, .news-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Gallery hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Hero parallax effect - Updated for multiple images
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImages = document.querySelectorAll('.hero-image img');
    
    if (heroImages.length > 0) {
        const rate = scrolled * -0.3;
        heroImages.forEach(img => {
            img.style.transform = `translateY(${rate}px)`;
        });
    }
});

// Dynamic event countdown (example)
function updateCountdown() {
    const eventDate = new Date('2024-03-15T09:00:00');
    const now = new Date();
    const timeLeft = eventDate - now;
    
    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        // You can add a countdown display element if needed
        console.log(`Event in ${days} days and ${hours} hours`);
    }
}

// Update countdown every hour
setInterval(updateCountdown, 3600000);

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
});

// Carousel functionality for Racing Apparel with dots and auto-slide (by group)
const apparelCarousel = document.querySelector('.carousel-container');
if (apparelCarousel) {
    const track = apparelCarousel.querySelector('.carousel-track');
    const items = Array.from(track.querySelectorAll('.merch-item'));
    const dotsContainer = apparelCarousel.querySelector('.carousel-dots');
    const itemWidth = items[0].offsetWidth + 24; // 24px gap
    let currentIndex = 0;
    let autoSlideInterval;

    // Calculate how many items fit in the visible area
    function getVisibleCount() {
        return Math.floor(track.offsetWidth / itemWidth) || 1;
    }
    function getGroupCount() {
        return Math.max(1, items.length - getVisibleCount() + 1);
    }

    // Create dots based on group count
    function renderDots() {
        dotsContainer.innerHTML = '';
        const groupCount = getGroupCount();
        for (let i = 0; i < groupCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(idx) {
        currentIndex = idx;
        track.scrollTo({ left: itemWidth * idx, behavior: 'smooth' });
        const dots = Array.from(dotsContainer.children);
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[idx]) dots[idx].classList.add('active');
    }

    function nextSlide() {
        const groupCount = getGroupCount();
        let nextIdx = (currentIndex + 1) % groupCount;
        goToSlide(nextIdx);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 3000);
    }

    // Initial render
    renderDots();
    autoSlideInterval = setInterval(nextSlide, 3000);

    // Optional: Pause on hover
    apparelCarousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    apparelCarousel.addEventListener('mouseleave', resetAutoSlide);

    // Re-render dots and fix slide on resize
    window.addEventListener('resize', () => {
        const prevGroupCount = dotsContainer.children.length;
        renderDots();
        // If group count changed, reset to first group
        if (dotsContainer.children.length !== prevGroupCount) {
            goToSlide(0);
        } else {
            goToSlide(currentIndex);
        }
    });
}

// Tap-to-expand overlay for mobile gallery
document.addEventListener('DOMContentLoaded', function() {
  function isMobile() {
    return window.innerWidth <= 600;
  }

  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', function(e) {
      if (!isMobile()) return;
      // Remove active from all others
      galleryItems.forEach(i => {
        if (i !== item) i.classList.remove('active');
      });
      // Toggle active on this one
      item.classList.toggle('active');
      e.stopPropagation();
    });
  });

  // Hide overlay when clicking outside
  document.addEventListener('click', function(e) {
    if (!isMobile()) return;
    galleryItems.forEach(item => item.classList.remove('active'));
  });
});

document.addEventListener('DOMContentLoaded', function() {
  new Swiper('.carousel-coverflow', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1.7, // Show part of side slides
    loop: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 60,      // Space between slides
      depth: 200,       // More depth
      modifier: 1.5,    // Stronger effect
      slideShadows: false,
      scale: 0.85,      // Side slides smaller
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: false,
  });
});

// ===== GALLERY & MERCHANDISE LIGHTBOX FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('galleryModalImage');
    const modalCaption = document.getElementById('galleryModalCaption');
    const modalClose = document.getElementById('galleryModalClose');
    const modalPrev = document.getElementById('galleryModalPrev');
    const modalNext = document.getElementById('galleryModalNext');
    
    let currentImageIndex = 0;
    let currentSectionItems = [];
    let allSections = {};
    
    // Get all gallery and merchandise items organized by section
    function initializeLightbox() {
        // Get gallery items
        const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
        // Get member ID items
        const memberIdItems = Array.from(document.querySelectorAll('.merch-item.member-id'));
        // Get sticker items
        const stickerItems = Array.from(document.querySelectorAll('.merch-item.sticker'));
        // Get swiper slides
        const swiperSlides = Array.from(document.querySelectorAll('.swiper-slide'));
        
        // Organize items by section
        allSections = {
            gallery: galleryItems.filter(item => 
                item.dataset.image && item.dataset.title && item.dataset.description
            ),
            memberIds: memberIdItems.filter(item => 
                item.dataset.image && item.dataset.title && item.dataset.description
            ),
            stickers: stickerItems.filter(item => 
                item.dataset.image && item.dataset.title && item.dataset.description
            ),
            apparel: swiperSlides.filter(item => 
                item.dataset.image && item.dataset.title && item.dataset.description
            )
        };
        
        // Add click event to each item
        Object.keys(allSections).forEach(sectionName => {
            allSections[sectionName].forEach((item, index) => {
                item.addEventListener('click', function() {
                    openModal(sectionName, index);
                });
            });
        });
    }
    
    // Open modal with specific image from specific section
    function openModal(sectionName, index) {
        currentSectionItems = allSections[sectionName];
        currentImageIndex = index;
        const item = currentSectionItems[index];
        
        if (modalImage && item) {
            modalImage.src = item.dataset.image;
            modalImage.alt = item.dataset.title;
            
            if (modalCaption) {
                modalCaption.textContent = item.dataset.description || item.dataset.title;
            }
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }
    
    // Close modal
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    }
    
    // Navigate to previous image within current section
    function prevImage() {
        if (currentSectionItems.length === 0) return;
        
        currentImageIndex = (currentImageIndex - 1 + currentSectionItems.length) % currentSectionItems.length;
        const item = currentSectionItems[currentImageIndex];
        
        if (modalImage && item) {
            modalImage.src = item.dataset.image;
            modalImage.alt = item.dataset.title;
            
            if (modalCaption) {
                modalCaption.textContent = item.dataset.description || item.dataset.title;
            }
        }
    }
    
    // Navigate to next image within current section
    function nextImage() {
        if (currentSectionItems.length === 0) return;
        
        currentImageIndex = (currentImageIndex + 1) % currentSectionItems.length;
        const item = currentSectionItems[currentImageIndex];
        
        if (modalImage && item) {
            modalImage.src = item.dataset.image;
            modalImage.alt = item.dataset.title;
            
            if (modalCaption) {
                modalCaption.textContent = item.dataset.description || item.dataset.title;
            }
        }
    }
    
    // Event listeners
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    if (modalPrev) {
        modalPrev.addEventListener('click', prevImage);
    }
    
    if (modalNext) {
        modalNext.addEventListener('click', nextImage);
    }
    
    // Video play/pause functionality
    const playButton = document.querySelector('.play-button');
    const pauseButton = document.querySelector('.pause-button');
    const videoOverlay = document.querySelector('.video-overlay');
    const videoControls = document.querySelector('.video-controls');
    const video = document.querySelector('.video-container video');
    
    if (playButton && pauseButton && video) {
        playButton.addEventListener('click', function() {
            videoOverlay.style.display = 'none';
            videoControls.style.display = 'block';
            pauseButton.style.display = 'flex';
            video.play();
        });
        
        pauseButton.addEventListener('click', function() {
            video.pause();
            videoOverlay.style.display = 'flex';
            videoControls.style.display = 'none';
            pauseButton.style.display = 'none';
        });
        
        video.addEventListener('ended', function() {
            videoOverlay.style.display = 'flex';
            videoControls.style.display = 'none';
            pauseButton.style.display = 'none';
        });
        
        video.addEventListener('pause', function() {
            if (video.currentTime < video.duration) {
                videoOverlay.style.display = 'flex';
                videoControls.style.display = 'none';
                pauseButton.style.display = 'none';
            }
        });
        
        // Show/hide pause button on video hover (desktop only)
        video.addEventListener('mouseenter', function() {
            if (!video.paused && window.innerWidth > 768) {
                pauseButton.style.opacity = '1';
            }
        });
        
        video.addEventListener('mouseleave', function() {
            if (!video.paused && window.innerWidth > 768) {
                setTimeout(() => {
                    pauseButton.style.opacity = '0.7';
                }, 1000);
            }
        });
    }
    modalPrev.addEventListener('click', prevImage);
    modalNext.addEventListener('click', nextImage);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal || !modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
    
    // Initialize lightbox
    initializeLightbox();
    
    // Drivers/Teams Section Functionality
    initializeDriversTeamsSection();
    
    // Collections Section Functionality
    initializeCollectionsSection();
});

// Drivers/Teams Section JavaScript
function initializeDriversTeamsSection() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentCarouselPosition = 0;
    let activeTab = 'drivers';
    
    // Tab switching functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all tabs and content
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            btn.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            activeTab = targetTab;
            currentCarouselPosition = 0;
            updateCarouselPosition();
        });
    });
    
    // Carousel navigation
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentCarouselPosition > 0) {
                currentCarouselPosition--;
                updateCarouselPosition();
            }
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const track = document.querySelector(`#${activeTab} .drivers-carousel-track`);
            if (track) {
                const items = track.querySelectorAll('.carousel-item');
                const containerWidth = track.parentElement.offsetWidth;
                const itemWidth = getItemWidth();
                const visibleItems = Math.floor(containerWidth / itemWidth);
                const maxPosition = Math.max(0, items.length - visibleItems);
                
                if (currentCarouselPosition < maxPosition) {
                    currentCarouselPosition++;
                    updateCarouselPosition();
                }
            }
        });
    }
    
    function getItemWidth() {
        const track = document.querySelector(`#${activeTab} .drivers-carousel-track`);
        if (track) {
            const item = track.querySelector('.carousel-item');
            if (item) {
                const itemRect = item.getBoundingClientRect();
                const styles = window.getComputedStyle(track);
                const gap = parseInt(styles.gap) || 20;
                return itemRect.width + gap;
            }
        }
        return 270; // fallback
    }
    
    function updateCarouselPosition() {
        const track = document.querySelector(`#${activeTab} .drivers-carousel-track`);
        if (track) {
            const itemWidth = getItemWidth();
            const translateX = currentCarouselPosition * itemWidth;
            track.style.transform = `translateX(-${translateX}px)`;
        }
    }
    
    // Initialize on load
    updateCarouselPosition();
}

// Collections Section JavaScript
function initializeCollectionsSection() {
    const collectionItems = document.querySelectorAll('.collection-item');
    console.log('Found collection items:', collectionItems.length);
    
    collectionItems.forEach((item, index) => {
        console.log(`Initializing collection item ${index}:`, item.getAttribute('data-collection'));
        const dots = item.querySelectorAll('.dot');
        const featuredProduct = item.querySelector('.featured-product img');
        const bgProducts = item.querySelectorAll('.bg-product img');
        
        // Color variants data
        const colorVariants = {
            tshirts: {
                yellow: '/assets/apparels/tshirt2-yellow.png',
                green: '/assets/apparels/tshirt3-green.png',
                black: '/assets/apparels/tshirt1-black.png'
            },
            polos: {
                green: '/assets/apparels/polo1-green.png',
                yellow: '/assets/apparels/polo2-yellow.png',
                black: '/assets/apparels/polo3-black.png'
            }
        };
        
        const collection = item.getAttribute('data-collection');
        
        // Function to switch to a specific color
        function switchToColor(color) {
            // Remove active class from all dots
            dots.forEach(d => d.classList.remove('active'));
            
            // Add active class to the dot with the selected color
            const targetDot = Array.from(dots).find(d => d.getAttribute('data-color') === color);
            if (targetDot) {
                targetDot.classList.add('active');
            }
            
            // Update featured product image
            if (colorVariants[collection] && colorVariants[collection][color]) {
                featuredProduct.src = colorVariants[collection][color];
                featuredProduct.alt = `${color} ${collection}`;
                
                // Update background products
                const otherColors = Object.keys(colorVariants[collection]).filter(c => c !== color);
                bgProducts.forEach((bgImg, index) => {
                    if (otherColors[index] && colorVariants[collection][otherColors[index]]) {
                        bgImg.src = colorVariants[collection][otherColors[index]];
                        bgImg.alt = `${otherColors[index]} ${collection}`;
                    }
                });
            } else {
                console.log('Color variant not found:', collection, color);
            }
        }

        // Get available colors for this collection
        const availableColors = Object.keys(colorVariants[collection] || {});
        let currentColorIndex = 0;

        // Find the current active color index
        const activeDot = item.querySelector('.dot.active');
        if (activeDot) {
            const activeColor = activeDot.getAttribute('data-color');
            currentColorIndex = availableColors.indexOf(activeColor);
        }

        // Add click event listeners to dots
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const color = dot.getAttribute('data-color');
                currentColorIndex = availableColors.indexOf(color);
                switchToColor(color);
            });
        });

        // Add touch/swipe functionality
        let startX = 0;
        let startY = 0;
        let isSwipeDetected = false;

        const productShowcase = item.querySelector('.product-showcase');
        
        // Touch start
        productShowcase.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwipeDetected = false;
        }, { passive: true });

        // Touch move
        productShowcase.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            
            const diffX = startX - currentX;
            const diffY = startY - currentY;
            
            // Check if horizontal swipe is more prominent than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
                isSwipeDetected = true;
                e.preventDefault(); // Prevent scrolling
            }
        }, { passive: false });

        // Touch end
        productShowcase.addEventListener('touchend', (e) => {
            if (!startX || !startY || !isSwipeDetected) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            // Minimum swipe distance
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next color
                    currentColorIndex = (currentColorIndex + 1) % availableColors.length;
                } else {
                    // Swipe right - previous color
                    currentColorIndex = (currentColorIndex - 1 + availableColors.length) % availableColors.length;
                }
                
                const newColor = availableColors[currentColorIndex];
                switchToColor(newColor);
            }
            
            // Reset
            startX = 0;
            startY = 0;
            isSwipeDetected = false;
        }, { passive: true });

        // Mouse drag support for desktop
        let isMouseDown = false;
        let mouseStartX = 0;
        let mouseDragDetected = false;

        productShowcase.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            mouseStartX = e.clientX;
            mouseDragDetected = false;
            productShowcase.style.cursor = 'grabbing';
            e.preventDefault(); // Prevent text selection
            console.log('Mouse down detected for swipe');
        });

        productShowcase.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            
            const diffX = mouseStartX - e.clientX;
            
            if (Math.abs(diffX) > 20) {
                mouseDragDetected = true;
                e.preventDefault();
                console.log('Drag detected, distance:', Math.abs(diffX));
            }
        });

        productShowcase.addEventListener('mouseup', (e) => {
            if (!isMouseDown || !mouseDragDetected) {
                isMouseDown = false;
                productShowcase.style.cursor = 'grab';
                return;
            }
            
            const endX = e.clientX;
            const diffX = mouseStartX - endX;
            
            console.log('Mouse up - drag distance:', Math.abs(diffX));
            
            // Minimum drag distance
            if (Math.abs(diffX) > 30) {
                if (diffX > 0) {
                    // Drag left - next color
                    currentColorIndex = (currentColorIndex + 1) % availableColors.length;
                    console.log('Switching to next color:', availableColors[currentColorIndex]);
                } else {
                    // Drag right - previous color
                    currentColorIndex = (currentColorIndex - 1 + availableColors.length) % availableColors.length;
                    console.log('Switching to previous color:', availableColors[currentColorIndex]);
                }
                
                const newColor = availableColors[currentColorIndex];
                switchToColor(newColor);
            }
            
            isMouseDown = false;
            mouseDragDetected = false;
            productShowcase.style.cursor = 'grab';
        });

        productShowcase.addEventListener('mouseleave', () => {
            isMouseDown = false;
            mouseDragDetected = false;
            productShowcase.style.cursor = 'grab';
        });

        // Set initial cursor
        productShowcase.style.cursor = 'grab';
    });
}

// Initialize view all modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeViewAllModal();
});

// ===== VIEW ALL DRIVERS/TEAMS MODAL FUNCTIONALITY =====
function initializeViewAllModal() {
    const viewAllBtn = document.querySelector('.view-all-btn');
    const viewAllModal = document.getElementById('viewAllModal');
    const viewAllClose = document.getElementById('viewAllClose');
    const viewAllTitle = document.getElementById('viewAllTitle');
    const viewAllGrid = document.getElementById('viewAllGrid');
    const viewAllTabBtns = document.querySelectorAll('.view-all-tab-btn');
    
    // Data for drivers and teams
    const driversData = [
        { img: '/assets/driver1.jpg', name: 'Oscar ', description: 'Professional Driver' },
        { img: '/assets/driver2.jpg', name: 'Lando', description: 'Championship Winner' },
        { img: '/assets/driver3.png', name: 'Max ', description: 'Rising Star' },
        { img: '/assets/driver4.jpg', name: 'George ', description: 'Veteran Racer' },
        { img: '/assets/driver5.jpg', name: 'Charles', description: 'Speed Demon' },
        { img: '/assets/driver6.jpg', name: 'Lewis', description: 'Track Master' },
        { img: '/assets/driver7.jpg', name: 'Kimi', description: 'Autocross Expert' }
    ];
    
    const teamsData = [
        { img: '/assets/teams/mclaren.jpg', name: 'McLaren', description: 'Formula 1 Team' },
        { img: '/assets/teams/mercedes.jpg', name: 'Mercedes', description: 'Petronas Team' },
        { img: '/assets/teams/ferrari.jpg', name: 'Ferrari', description: 'Red Bull Racing' },
        { img: '/assets/teams/redbull.jpg', name: 'Red Bull', description: 'McLaren Team' },
        { img: '/assets/teams/kick.jpg', name: 'Kick', description: 'Ferrari Team' },
        { img: '/assets/teams/aston.jpg', name: 'Aston Martin', description: 'Mercedes Team' },
        { img: '/assets/teams/alpine.jpg', name: 'Alpine', description: 'Alpine Team' }
    ];
    
    let currentViewTab = 'drivers';
    
    function openViewAllModal() {
        viewAllModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        showCurrentTab();
    }
    
    function closeViewAllModal() {
        viewAllModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function showCurrentTab() {
        const data = currentViewTab === 'drivers' ? driversData : teamsData;
        const title = currentViewTab === 'drivers' ? 'ALL DRIVERS' : 'ALL TEAMS';
        
        viewAllTitle.textContent = title;
        
        // Clear grid
        viewAllGrid.innerHTML = '';
        
        // Populate grid
        data.forEach(item => {
            const gridItem = document.createElement('div');
            gridItem.className = 'view-all-item';
            gridItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}" loading="lazy">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            `;
            viewAllGrid.appendChild(gridItem);
        });
    }
    
    // Event listeners
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openViewAllModal();
        });
    }
    
    if (viewAllClose) {
        viewAllClose.addEventListener('click', closeViewAllModal);
    }
    
    if (viewAllModal) {
        viewAllModal.addEventListener('click', (e) => {
            if (e.target === viewAllModal) {
                closeViewAllModal();
            }
        });
    }
    
    // Tab switching
    viewAllTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs
            viewAllTabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked tab
            btn.classList.add('active');
            
            // Update current tab
            currentViewTab = btn.dataset.viewTab;
            
            // Show content for current tab
            showCurrentTab();
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!viewAllModal || !viewAllModal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeViewAllModal();
        }
    });
}

// Show "Coming soon" modal when Get Updates button is clicked
document.addEventListener('DOMContentLoaded', function() {
  var updatesBtn = document.querySelector('.events-updates-btn');
  var comingSoonModal = document.getElementById('comingSoonModal');
  var comingSoonClose = document.getElementById('comingSoonClose');

  if (updatesBtn && comingSoonModal && comingSoonClose) {
    updatesBtn.addEventListener('click', function(e) {
      e.preventDefault();
      comingSoonModal.classList.add('active');
    });
    comingSoonClose.addEventListener('click', function() {
      comingSoonModal.classList.remove('active');
    });
    // Optional: close modal when clicking outside content
    comingSoonModal.addEventListener('click', function(e) {
      if (e.target === comingSoonModal) {
        comingSoonModal.classList.remove('active');
      }
    });
  }
});
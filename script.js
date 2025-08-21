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

// Event Details Modal Functionality
const eventDetailsModal = document.getElementById('eventDetailsModal');
const eventDetailsClose = document.getElementById('eventDetailsClose');

// Event data for each event
const eventData = {
    'racing-dummies': {
        title: 'RACING FOR DUMMIES',
        image: '/assets/events/poster.jpg',
        description: 'Perfect for beginners! This event is designed to introduce newcomers to the exciting world of autocross racing. Learn the basics of car control, racing techniques, and safety protocols in a supportive environment.',
        date: 'August 30-31, 2025',
        location: 'Negros Occidental Racing Circuit',
        status: 'Registration Open',
        rules: `
            <h3>Event Rules & Regulations</h3>
            <h4>Vehicle Requirements</h4>
            <ul>
                <li>All vehicles must pass safety inspection</li>
                <li>Helmets are mandatory for all drivers</li>
                <li>Vehicles must be street legal and insured</li>
                <li>No modifications that compromise safety</li>
            </ul>
            
            <h4>Driver Requirements</h4>
            <ul>
                <li>Valid driver's license required</li>
                <li>Minimum age: 18 years old</li>
                <li>No racing experience necessary</li>
                <li>Safety briefing attendance mandatory</li>
            </ul>
            
            <h4>Course Rules</h4>
            <ul>
                <li>Follow course markers and instructions</li>
                <li>No aggressive driving or dangerous maneuvers</li>
                <li>Respect speed limits in designated areas</li>
                <li>Immediate disqualification for unsafe behavior</li>
            </ul>
        `,
        registration: `
            <h3>Registration Information</h3>
            <h4>Entry Fee</h4>
            <p>₱2,500 per driver (includes lunch and event t-shirt)</p>
            
            <h4>Registration Process</h4>
            <ul>
                <li>Complete online registration form</li>
                <li>Submit required documents (license, insurance)</li>
                <li>Pay registration fee</li>
                <li>Receive confirmation email with event details</li>
            </ul>
            
            <h4>Required Documents</h4>
            <ul>
                <li>Valid driver's license</li>
                <li>Vehicle registration and insurance</li>
                <li>Completed waiver form</li>
                <li>Emergency contact information</li>
            </ul>
            
            <h4>Registration Deadline</h4>
            <p>March 10, 2025 - Limited to 50 participants</p>
        `,
        schedule: `
            <h3>Event Schedule</h3>
            <h4>Morning Session (8:00 AM - 12:00 PM)</h4>
            <ul>
                <li>8:00 AM - Registration and check-in</li>
                <li>8:30 AM - Safety briefing and course walk</li>
                <li>9:00 AM - Practice runs (3 runs per driver)</li>
                <li>10:30 AM - Coffee break</li>
                <li>11:00 AM - Timed runs begin</li>
            </ul>
            
            <h4>Afternoon Session (1:00 PM - 5:00 PM)</h4>
            <ul>
                <li>1:00 PM - Lunch break</li>
                <li>2:00 PM - Competition runs continue</li>
                <li>3:30 PM - Final runs</li>
                <li>4:30 PM - Awards ceremony</li>
                <li>5:00 PM - Event concludes</li>
            </ul>
        `
    },
    'daddies-day': {
        title: 'DADDIES DAY OUT AUTOCROSS',
        image: '/assets/events/daddies.jpg',
        description: 'A special event celebrating fathers and their passion for cars! Bring your family and enjoy a day of friendly competition, car shows, and family activities. Perfect for bonding over shared automotive enthusiasm.',
        date: 'June 14-15, 2025',
        location: 'Negros Occidental Racing Circuit',
        status: 'Registration Closed',
        rules: `
            <h3>Event Rules & Regulations</h3>
            <h4>Family-Friendly Event</h4>
            <ul>
                <li>Open to all skill levels</li>
                <li>Family spectators welcome</li>
                <li>Kid-friendly activities available</li>
                <li>Safe viewing areas for families</li>
            </ul>
            
            <h4>Vehicle Categories</h4>
            <ul>
                <li>Stock Class - No modifications</li>
                <li>Modified Class - Light modifications allowed</li>
                <li>Vintage Class - Classic cars (pre-1990)</li>
                <li>Family Class - Multi-generational teams</li>
            </ul>
            
            <h4>Safety Requirements</h4>
            <ul>
                <li>All standard safety rules apply</li>
                <li>Family members must stay in designated areas</li>
                <li>Children under 12 must be supervised at all times</li>
                <li>No pets allowed on the track</li>
            </ul>
        `,
        registration: `
            <h3>Registration Information</h3>
            <h4>Entry Fees</h4>
            <ul>
                <li>Single Driver: ₱3,000</li>
                <li>Father-Son Team: ₱4,500</li>
                <li>Family Package (4 people): ₱6,000</li>
            </ul>
            
            <h4>What's Included</h4>
            <ul>
                <li>Event participation</li>
                <li>Family lunch buffet</li>
                <li>Event t-shirts for all participants</li>
                <li>Family photo session</li>
                <li>Kids' activities and games</li>
            </ul>
            
            <h4>Registration Deadline</h4>
            <p>June 15, 2025 - Limited to 75 participants</p>
        `,
        schedule: `
            <h3>Event Schedule</h3>
            <h4>Morning Activities (8:00 AM - 12:00 PM)</h4>
            <ul>
                <li>8:00 AM - Family check-in and registration</li>
                <li>8:30 AM - Welcome ceremony</li>
                <li>9:00 AM - Car show and display</li>
                <li>10:00 AM - Racing sessions begin</li>
                <li>11:00 AM - Kids' activities start</li>
            </ul>
            
            <h4>Afternoon Activities (1:00 PM - 6:00 PM)</h4>
            <ul>
                <li>1:00 PM - Family lunch</li>
                <li>2:00 PM - Racing continues</li>
                <li>3:00 PM - Family photo session</li>
                <li>4:30 PM - Awards ceremony</li>
                <li>5:00 PM - Family dinner and social</li>
            </ul>
        `
    },
    'gymkhana-championship': {
        title: 'GYMKHANA CHAMPIONSHIP',
        image: '/assets/events/championship.jpg',
        description: 'The premier autocross championship event! Compete against the best drivers in the region for the ultimate title. This high-stakes competition features challenging courses, professional timing, and prestigious awards.',
        date: 'November 22-23, 2024',
        location: 'Negros Occidental Racing Circuit',
        status: 'Registration Closed',
        rules: `
            <h3>Championship Rules & Regulations</h3>
            <h4>Competition Classes</h4>
            <ul>
                <li>Pro Class - Professional drivers</li>
                <li>Amateur Class - Experienced amateurs</li>
                <li>Novice Class - First-time competitors</li>
                <li>Team Class - 2-3 driver teams</li>
            </ul>
            
            <h4>Technical Regulations</h4>
            <ul>
                <li>Strict vehicle inspection required</li>
                <li>Safety equipment must meet FIA standards</li>
                <li>No performance-enhancing modifications</li>
                <li>All vehicles must pass noise regulations</li>
            </ul>
            
            <h4>Competition Format</h4>
            <ul>
                <li>Qualifying rounds determine starting order</li>
                <li>Elimination bracket for final rounds</li>
                <li>Best time of three runs counts</li>
                <li>Penalties for course violations</li>
            </ul>
        `,
        registration: `
            <h3>Championship Registration</h3>
            <h4>Entry Fees</h4>
            <ul>
                <li>Pro Class: ₱5,000</li>
                <li>Amateur Class: ₱4,000</li>
                <li>Novice Class: ₱3,500</li>
                <li>Team Entry: ₱8,000</li>
            </ul>
            
            <h4>Championship Prizes</h4>
            <ul>
                <li>1st Place: ₱50,000 + Trophy</li>
                <li>2nd Place: ₱25,000 + Trophy</li>
                <li>3rd Place: ₱15,000 + Trophy</li>
                <li>Class Winners: ₱10,000 each</li>
            </ul>
            
            <h4>Registration Requirements</h4>
            <ul>
                <li>Previous racing experience required</li>
                <li>Vehicle must pass technical inspection</li>
                <li>Complete safety equipment mandatory</li>
                <li>Registration deadline: September 20, 2025</li>
            </ul>
        `,
        schedule: `
            <h3>Championship Schedule</h3>
            <h4>Day 1 - Qualifying (September 27)</h4>
            <ul>
                <li>8:00 AM - Driver check-in and inspection</li>
                <li>9:00 AM - Practice sessions</li>
                <li>11:00 AM - Qualifying rounds begin</li>
                <li>2:00 PM - Lunch break</li>
                <li>3:00 PM - Qualifying continues</li>
                <li>6:00 PM - Qualifying results announced</li>
            </ul>
            
            <h4>Day 2 - Finals (September 28)</h4>
            <ul>
                <li>8:00 AM - Finalist check-in</li>
                <li>9:00 AM - Elimination rounds</li>
                <li>12:00 PM - Lunch break</li>
                <li>1:00 PM - Semi-finals</li>
                <li>3:00 PM - Championship finals</li>
                <li>5:00 PM - Awards ceremony</li>
            </ul>
        `
    },
    'special-module': {
        title: 'SPECIAL MODULE',
        image: '/assets/events/specialmodule.jpg',
        description: 'An exclusive training module designed for advanced drivers looking to perfect their skills. This intensive program includes professional instruction, advanced techniques, and personalized coaching.',
        date: 'July 6-7, 2024',
        location: 'Negros Occidental Racing Circuit',
        status: 'Registration Closed',
        rules: `
            <h3>Special Module Rules</h3>
            <h4>Participant Requirements</h4>
            <ul>
                <li>Minimum 2 years racing experience</li>
                <li>Valid racing license or equivalent</li>
                <li>Advanced driving skills assessment</li>
                <li>Medical clearance required</li>
            </ul>
            
            <h4>Training Modules</h4>
            <ul>
                <li>Advanced car control techniques</li>
                <li>Professional racing strategies</li>
                <li>Mental preparation and focus</li>
                <li>Physical conditioning for racing</li>
            </ul>
            
            <h4>Safety Protocols</h4>
            <ul>
                <li>Enhanced safety equipment required</li>
                <li>Professional medical staff on-site</li>
                <li>Emergency response procedures</li>
                <li>Weather contingency plans</li>
            </ul>
        `,
        registration: `
            <h3>Special Module Registration</h3>
            <h4>Program Fee</h4>
            <p>₱15,000 per participant (includes all materials and equipment)</p>
            
            <h4>What's Included</h4>
            <ul>
                <li>Professional instruction</li>
                <li>Personalized coaching sessions</li>
                <li>Advanced training materials</li>
                <li>Certificate of completion</li>
                <li>Lunch and refreshments</li>
            </ul>
            
            <h4>Registration Process</h4>
            <ul>
                <li>Submit application with racing resume</li>
                <li>Skills assessment interview</li>
                <li>Medical clearance submission</li>
                <li>Payment confirmation</li>
            </ul>
            
            <h4>Limited Availability</h4>
            <p>Maximum 20 participants - Registration deadline: November 1, 2025</p>
        `,
        schedule: `
            <h3>Special Module Schedule</h3>
            <h4>Morning Session (8:00 AM - 12:00 PM)</h4>
            <ul>
                <li>8:00 AM - Registration and orientation</li>
                <li>8:30 AM - Classroom instruction</li>
                <li>9:30 AM - Track walk and course analysis</li>
                <li>10:30 AM - Practical exercises</li>
                <li>11:30 AM - Individual coaching sessions</li>
            </ul>
            
            <h4>Afternoon Session (1:00 PM - 6:00 PM)</h4>
            <ul>
                <li>1:00 PM - Advanced techniques workshop</li>
                <li>2:30 PM - Practice sessions</li>
                <li>4:00 PM - Performance analysis</li>
                <li>5:00 PM - Q&A and feedback</li>
                <li>6:00 PM - Certificate presentation</li>
            </ul>
        `
    }
};

// Event card click handlers
document.querySelectorAll('.event-card.clickable').forEach(card => {
    card.addEventListener('click', function() {
        const eventId = this.getAttribute('data-event');
        const event = eventData[eventId];
        
        if (event) {
            openEventDetails(event);
        }
    });
});

// Open event details modal
function openEventDetails(event) {
    // Populate modal content
    document.getElementById('eventDetailsImage').src = event.image;
    document.getElementById('eventDetailsTitle').textContent = event.title;
    document.getElementById('eventDetailsDescription').textContent = event.description;
    document.getElementById('eventDetailsDate').innerHTML = `<i class="fas fa-calendar"></i> ${event.date}`;
    document.getElementById('eventDetailsLocation').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${event.location}`;
    document.getElementById('eventDetailsStatus').innerHTML = `<i class="fas fa-clock"></i> ${event.status}`;
    
    // Populate tab content
    document.getElementById('eventDetailsRules').innerHTML = event.rules;
    document.getElementById('eventDetailsRegistration').innerHTML = event.registration;
    document.getElementById('eventDetailsSchedule').innerHTML = event.schedule;
    
    // Update register button based on event status
    const registerBtn = document.querySelector('.event-register-btn');
    if (event.status === 'Registration Closed') {
        registerBtn.textContent = 'REGISTRATION CLOSED';
        registerBtn.style.opacity = '0.6';
        registerBtn.style.cursor = 'not-allowed';
        registerBtn.removeAttribute('href');
    } else {
        registerBtn.textContent = 'REGISTER NOW';
        registerBtn.style.opacity = '1';
        registerBtn.style.cursor = 'pointer';
        registerBtn.href = 'register.html';
    }
    
    // Show modal
    eventDetailsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close event details modal
function closeEventDetails() {
    eventDetailsModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event details modal event listeners
eventDetailsClose.addEventListener('click', closeEventDetails);

// Close modal when clicking outside
eventDetailsModal.addEventListener('click', function(e) {
    if (e.target === eventDetailsModal) {
        closeEventDetails();
    }
});

// Tab functionality for event details
document.querySelectorAll('.event-tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tabName = this.getAttribute('data-event-tab');
        
        // Remove active class from all tabs and content
        document.querySelectorAll('.event-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.event-tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        this.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// Share event functionality
document.querySelector('.event-share-btn').addEventListener('click', function() {
    if (navigator.share) {
        navigator.share({
            title: 'Autocross Event',
            text: 'Check out this exciting autocross event!',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('Event URL copied to clipboard!');
        });
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
    
    // Initialize Swiper Carousels - ensure Swiper is loaded first
if (typeof Swiper !== 'undefined') {
    initializeSwiperCarousels();
} else {
    // Wait for Swiper to load
    window.addEventListener('load', function() {
        if (typeof Swiper !== 'undefined') {
            initializeSwiperCarousels();
        } else {
            console.error('Swiper not loaded');
        }
    });
}
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
    
    // Keep both collections visible
    collectionItems.forEach((item, index) => {
        console.log(`Initializing collection item ${index}:`, item.getAttribute('data-collection'));
        // Ensure both collections are visible
        item.classList.add('active');
    });
}

// Swiper Carousel Initialization
function initializeSwiperCarousels() {
    console.log('initializeSwiperCarousels called');
    console.log('Swiper available:', typeof Swiper !== 'undefined');
    
    // Check if carousel elements exist
    const tshirtsCarousel = document.querySelector('.tshirts-carousel');
    const polosCarousel = document.querySelector('.polos-carousel');
    console.log('T-shirts carousel element:', tshirtsCarousel);
    console.log('Polo shirts carousel element:', polosCarousel);
    
    // Destroy any existing Swiper instances first
    if (window.tshirtsSwiper) {
        console.log('Destroying existing T-shirts Swiper');
        window.tshirtsSwiper.destroy(true, true);
    }
    if (window.polosSwiper) {
        console.log('Destroying existing Polo shirts Swiper');
        window.polosSwiper.destroy(true, true);
    }

    // Initialize T-Shirts Carousel with unique identifier
    window.tshirtsSwiper = new Swiper('.tshirts-carousel', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1.7,
        loop: false, // Disable loop to prevent warnings and ensure proper separation
        coverflowEffect: {
            rotate: 0,
            stretch: 60,
            depth: 200,
            modifier: 1.5,
            slideShadows: false,
            scale: 0.85,
        },
        pagination: {
            el: '.tshirts-carousel .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.tshirts-next',
            prevEl: '.tshirts-prev',
        },
        on: {
            init: function() {
                console.log('T-shirts carousel initialized');
            },
            slideChange: function() {
                console.log('T-shirts slide changed to:', this.realIndex);
                // Verify this is actually the T-shirts carousel
                const currentSlide = this.slides[this.activeIndex];
                const slideTitle = currentSlide ? currentSlide.getAttribute('data-title') : 'unknown';
                console.log('T-shirts current slide title:', slideTitle);
            }
        }
    });

    // Initialize Polo Shirts Carousel with unique identifier
    window.polosSwiper = new Swiper('.polos-carousel', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1.7,
        loop: false, // Disable loop to prevent warnings and ensure proper separation
        coverflowEffect: {
            rotate: 0,
            stretch: 60,
            depth: 200,
            modifier: 1.5,
            slideShadows: false,
            scale: 0.85,
        },
        pagination: {
            el: '.polos-carousel .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.polos-next',
            prevEl: '.polos-prev',
        },
        on: {
            init: function() {
                console.log('Polo shirts carousel initialized');
            },
            slideChange: function() {
                console.log('Polo shirts slide changed to:', this.realIndex);
                // Verify this is actually the Polo shirts carousel
                const currentSlide = this.slides[this.activeIndex];
                const slideTitle = currentSlide ? currentSlide.getAttribute('data-title') : 'unknown';
                console.log('Polo shirts current slide title:', slideTitle);
            }
        }
    });

    console.log('Both carousels initialized successfully');
    
    // Test navigation buttons
    setTimeout(() => {
        const tshirtsNext = document.querySelector('.tshirts-next');
        const tshirtsPrev = document.querySelector('.tshirts-prev');
        const polosNext = document.querySelector('.polos-next');
        const polosPrev = document.querySelector('.polos-prev');
        
        console.log('Navigation buttons found:', {
            tshirtsNext: !!tshirtsNext,
            tshirtsPrev: !!tshirtsPrev,
            polosNext: !!polosNext,
            polosPrev: !!polosPrev
        });
    }, 1000);
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
        { img: '/assets/drivers/driver1.jpg', name: 'Oscar ', description: 'Professional Driver' },
        { img: '/assets/drivers/driver2.jpg', name: 'Lando', description: 'Championship Winner' },
        { img: '/assets/drivers/driver3.png', name: 'Max ', description: 'Rising Star' },
        { img: '/assets/drivers/driver4.jpg', name: 'George ', description: 'Veteran Racer' },
        { img: '/assets/drivers/driver5.jpg', name: 'Charles', description: 'Speed Demon' },
        { img: '/assets/drivers/driver6.jpg', name: 'Lewis', description: 'Track Master' },
        { img: '/assets/drivers/driver7.jpg', name: 'Kimi', description: 'Autocross Expert' }
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

// ===== GOOGLE MAPS INTEGRATION =====
let map, marker, infoWindow;
let isFullscreen = false;

// Track location coordinates from config
const TRACK_LOCATION = CONFIG.TRACK_LOCATION;

// Initialize Google Maps
function initMap() {
    // Create map instance
    map = new google.maps.Map(document.getElementById('trackMap'), {
        center: TRACK_LOCATION,
        zoom: CONFIG.MAP_CONFIG.zoom,
        mapTypeId: google.maps.MapTypeId[CONFIG.MAP_CONFIG.mapTypeId.toUpperCase()],
        styles: CONFIG.MAP_CONFIG.styles
    });
    
    // Create custom marker
    marker = new google.maps.Marker({
        position: TRACK_LOCATION,
        map: map,
        title: CONFIG.TRACK_LOCATION.name,
        icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#01764F" stroke="#F18A1F" stroke-width="2"/>
                    <path d="M20 8 L24 16 L32 16 L26 22 L28 30 L20 26 L12 30 L14 22 L8 16 L16 16 Z" fill="#F18A1F"/>
                    <text x="20" y="25" text-anchor="middle" fill="white" font-size="8" font-weight="bold">ACN</text>
                </svg>
            `),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 20)
        },
        animation: google.maps.Animation.DROP
    });
    
    // Create info window
    infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px; max-width: 250px; background: white; color: black;">
                <h3 style="margin: 0 0 8px 0; color: #01764F; font-size: 16px;">🏁 ${CONFIG.TRACK_LOCATION.name}</h3>
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #333;">${CONFIG.TRACK_LOCATION.address}</p>
                <p style="margin: 0; font-size: 12px; color: #666;">
                    State-of-the-art autocross facility with multiple course layouts, 
                    safety equipment, and spectator viewing areas.
                </p>
                <div style="margin-top: 10px;">
                    <button onclick="getDirections()" style="
                        background: #01764F; 
                        color: white; 
                        border: none; 
                        padding: 8px 12px; 
                        border-radius: 4px; 
                        cursor: pointer;
                        font-size: 12px;
                    ">Get Directions</button>
                </div>
            </div>
        `
    });
    
    // Add click event to marker
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
    
    // Add double-click event to marker for directions
    marker.addListener('dblclick', () => {
        getDirections();
    });
}

// Get directions function
function getDirections() {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${TRACK_LOCATION.lat},${TRACK_LOCATION.lng}&travelmode=driving`;
    window.open(url, '_blank');
}

// Toggle satellite view
function toggleSatelliteView() {
    const mapType = map.getMapTypeId();
    const newMapType = mapType === google.maps.MapTypeId.SATELLITE ? 
        google.maps.MapTypeId.ROADMAP : google.maps.MapTypeId.SATELLITE;
    
    map.setMapTypeId(newMapType);
    
    // Update button state
    const satelliteBtn = document.getElementById('satelliteBtn');
    satelliteBtn.classList.toggle('active', newMapType === google.maps.MapTypeId.SATELLITE);
}

// Toggle street view
function toggleStreetView() {
    const streetView = map.getStreetView();
    const isVisible = streetView.getVisible();
    streetView.setVisible(!isVisible);
    
    if (!isVisible) {
        streetView.setPosition(TRACK_LOCATION);
    }
    
    // Update button state
    const streetBtn = document.getElementById('streetBtn');
    streetBtn.classList.toggle('active', !isVisible);
}

// Toggle fullscreen
function toggleFullscreen() {
    const mapContainer = document.getElementById('trackMap');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const exitFullscreenBtn = document.getElementById('exitFullscreenBtn');
    
    if (!isFullscreen) {
        mapContainer.classList.add('fullscreen');
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        
        // Make exit button visible with multiple approaches
        exitFullscreenBtn.style.display = 'block';
        exitFullscreenBtn.style.opacity = '1';
        exitFullscreenBtn.style.visibility = 'visible';
        exitFullscreenBtn.style.position = 'fixed';
        exitFullscreenBtn.style.top = '20px';
        exitFullscreenBtn.style.left = '20px';
        exitFullscreenBtn.style.zIndex = '10000';
        exitFullscreenBtn.classList.add('fullscreen-active');
        
        // Move exit button to body for better visibility
        document.body.appendChild(exitFullscreenBtn);
        
        isFullscreen = true;
        console.log('Entered fullscreen mode, exit button should be visible');
        
        // Set landscape-friendly zoom and center
        setTimeout(() => {
            map.setZoom(Math.max(map.getZoom(), 14)); // Ensure good zoom level for landscape
            google.maps.event.trigger(map, 'resize');
        }, 100);
    } else {
        exitFullscreen();
    }
}

// Exit fullscreen function
function exitFullscreen() {
    const mapContainer = document.getElementById('trackMap');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const exitFullscreenBtn = document.getElementById('exitFullscreenBtn');
    const trackLocationSection = document.querySelector('.track-location-section');
    
    mapContainer.classList.remove('fullscreen');
    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    
    // Hide exit button
    exitFullscreenBtn.style.display = 'none';
    exitFullscreenBtn.style.opacity = '0';
    exitFullscreenBtn.style.visibility = 'hidden';
    exitFullscreenBtn.classList.remove('fullscreen-active');
    
    // Move exit button back to original location
    if (trackLocationSection) {
        trackLocationSection.appendChild(exitFullscreenBtn);
    }
    
    isFullscreen = false;
    
    // Restore original view
    setTimeout(() => {
        google.maps.event.trigger(map, 'resize');
    }, 100);
}

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map if Google Maps API is loaded
    if (typeof google !== 'undefined' && google.maps) {
        initMap();
    } else {
        // Wait for Google Maps API to load
        window.addEventListener('load', initMap);
    }
    
    // Add event listeners for map controls
    const satelliteBtn = document.getElementById('satelliteBtn');
    const streetBtn = document.getElementById('streetBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const getDirectionsBtn = document.getElementById('getDirectionsBtn');
    const trackInfoBtn = document.getElementById('trackInfoBtn');
    
    if (satelliteBtn) satelliteBtn.addEventListener('click', toggleSatelliteView);
    if (streetBtn) streetBtn.addEventListener('click', toggleStreetView);
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Exit fullscreen button
    const exitFullscreenBtn = document.getElementById('exitFullscreenBtn');
    if (exitFullscreenBtn) exitFullscreenBtn.addEventListener('click', exitFullscreen);
    
    if (getDirectionsBtn) getDirectionsBtn.addEventListener('click', getDirections);
    if (trackInfoBtn) trackInfoBtn.addEventListener('click', () => {
        if (infoWindow && marker) {
            infoWindow.open(map, marker);
            // Ensure info window is visible in fullscreen mode
            if (isFullscreen) {
                setTimeout(() => {
                    google.maps.event.trigger(map, 'resize');
                }, 100);
            }
        }
    });
    
    // Add keyboard support for fullscreen
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isFullscreen) {
            exitFullscreen();
        }
    });
});

// Global function for directions (accessible from info window)
window.getDirections = getDirections;

// Fallback Swiper initialization - ensure it runs after everything is loaded
window.addEventListener('load', function() {
    if (typeof Swiper !== 'undefined') {
        // Check if carousels are already initialized
        if (!window.tshirtsSwiper && document.querySelector('.tshirts-carousel')) {
            console.log('Initializing T-shirts carousel (fallback)');
            initializeSwiperCarousels();
        }
        if (!window.polosSwiper && document.querySelector('.polos-carousel')) {
            console.log('Initializing Polo shirts carousel (fallback)');
            initializeSwiperCarousels();
        }
    } else {
        console.error('Swiper library not available');
    }
});

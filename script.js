// ===================================================================
//                 THE SOCIAL MAFIA - SCRIPT FILE
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------
    // 1. FAQ Accordion Toggle
    // ------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        // NOTE: Changed to listen for a click on the entire item for better usability.
        item.addEventListener('click', () => {
            item.classList.toggle('open');
        });
    });

    // ------------------------------------
    // 2. Mobile Menu Toggle Functionality
    // ------------------------------------
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav-menu');
    const body = document.body;

    // Ensure the menu and toggle button exist before adding listeners
    if (menuToggle && mobileNav) {
        
        // --- Open/Close the menu on hamburger click ---
        menuToggle.addEventListener('click', () => {
            const isMenuOpen = mobileNav.style.display === 'flex';
            
            // Toggle the menu's visibility
            mobileNav.style.display = isMenuOpen ? 'none' : 'flex';
            
            // Toggle a class on the body. CSS will handle the rest:
            // - Animating the hamburger icon into an 'X'
            // - Preventing the page from scrolling when the menu is open
            body.classList.toggle('mobile-menu-open');
        });

        // --- Close the mobile menu when a link inside it is clicked ---
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.style.display = 'none';
                body.classList.remove('mobile-menu-open');
            });
        });
    }

});


document.addEventListener('DOMContentLoaded', function () {
  const callouts = document.querySelectorAll('.callout');
  const container = document.querySelector('.callouts-container');
  let currentCallout = null;
  let currentIndex = 0;

  function showNextCallout() {
    if (window.innerWidth > 768) return;

    // Fade out current callout
    if (currentCallout) {
      currentCallout.style.opacity = '0';
      setTimeout(() => {
        currentCallout.style.display = 'none';
      }, 1000); // fade-out duration (1s)
    }

    // Wait for 200ms after fade out begins before showing next callout
    setTimeout(() => {
      const nextCallout = callouts[currentIndex];

      // Get random position
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const calloutMaxWidth = 200;
      const calloutMaxHeight = 80;

      const maxX = containerWidth - calloutMaxWidth;
      const maxY = containerHeight - calloutMaxHeight;

      const randomX = Math.floor(Math.random() * maxX);
      const randomY = Math.floor(Math.random() * maxY);

      // Apply styles and show
      nextCallout.style.display = 'block';
      nextCallout.style.top = `${randomY}px`;
      nextCallout.style.left = `${randomX}px`;

      void nextCallout.offsetWidth; // trigger reflow

      nextCallout.style.opacity = '1';

      currentCallout = nextCallout;
      currentIndex = (currentIndex + 1) % callouts.length;
    }, 1200); // 1s fade out + 200ms pause
  }

  if (window.innerWidth <= 768) {
    showNextCallout();
    setInterval(showNextCallout, 3000); // new callout every 3s
  }
});


// Accordion Style JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(itemToOpen => {
        const question = itemToOpen.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Check if the clicked item is already active
            const isAlreadyActive = itemToOpen.classList.contains('active');

            // First, close all other items
            faqItems.forEach(itemToClose => {
                itemToClose.classList.remove('active');
            });

            // If the clicked item was not active, open it
            if (!isAlreadyActive) {
                itemToOpen.classList.add('active');
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Define the screen size to check for
    const mobileMediaQuery = window.matchMedia('(max-width: 768px)');
    
    let carouselInitialized = false; // Flag to check if carousel is active

    function initializeCarousel() {
        if (carouselInitialized) return; // Prevent re-initializing

        const track = document.querySelector('.how-carousel-track');
        const slides = Array.from(track.children);
        const dotsNav = document.querySelector('.carousel-dots');
        
        if (!track || slides.length === 0) return;

        // Clear any previous dots
        dotsNav.innerHTML = '';
        
        let currentIndex = 0;

        // --- Create Pagination Dots ---
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsNav.appendChild(dot);
        });
        const dots = Array.from(dotsNav.children);

        // --- Core Functions ---
        const goToSlide = (index) => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            const newIndex = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${slideWidth * newIndex}px)`;
            
            dots[currentIndex].classList.remove('active');
            dots[newIndex].classList.add('active');
            currentIndex = newIndex;
        };

        // --- Swipe Functionality ---
        let isDragging = false, startPos = 0, currentTranslate = 0, prevTranslate = 0;
        const swipeThreshold = 50; 

        const touchStart = (e) => {
            isDragging = true;
            startPos = getPositionX(e);
            const slideWidth = slides[0].getBoundingClientRect().width;
            prevTranslate = -currentIndex * slideWidth;
            track.style.transition = 'none';
        };

        const touchMove = (e) => {
            if (!isDragging) return;
            const currentPosition = getPositionX(e);
            currentTranslate = prevTranslate + (currentPosition - startPos);
            track.style.transform = `translateX(${currentTranslate}px)`;
        };

        const touchEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            track.style.transition = 'transform 0.5s ease-in-out';
            const movedBy = currentTranslate - prevTranslate;

            if (movedBy < -swipeThreshold) goToSlide(currentIndex + 1);
            else if (movedBy > swipeThreshold) goToSlide(currentIndex - 1);
            else goToSlide(currentIndex); // Snap back
        };

        const getPositionX = (e) => e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        
        // Add swipe event listeners
        track.addEventListener('mousedown', touchStart);
        track.addEventListener('touchstart', touchStart, { passive: true });
        track.addEventListener('mousemove', touchMove);
        track.addEventListener('touchmove', touchMove, { passive: true });
        track.addEventListener('mouseup', touchEnd);
        track.addEventListener('mouseleave', () => { if (isDragging) touchEnd(); });
        track.addEventListener('touchend', touchEnd);

        carouselInitialized = true;
    }

    function destroyCarousel() {
        if (!carouselInitialized) return;
        
        const track = document.querySelector('.how-carousel-track');
        const dotsNav = document.querySelector('.carousel-dots');

        track.style.transform = '';
        dotsNav.innerHTML = '';

        // You would remove event listeners in a more complex setup, but this is fine for now
        carouselInitialized = false;
    }

    // --- Media Query Handler ---
    function handleScreenChange(e) {
        if (e.matches) {
            // Screen is mobile: initialize the carousel
            initializeCarousel();
        } else {
            // Screen is desktop: destroy the carousel
            destroyCarousel();
        }
    }

    // Add a listener for screen size changes and check on load
    mobileMediaQuery.addEventListener('change', handleScreenChange);
    handleScreenChange(mobileMediaQuery);
});

document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE & TABLET SCROLL ANIMATION FOR "OUR WORK" CARDS ---
    
    // MODIFIED: Check if we are on a mobile OR tablet device
    if (window.matchMedia("(max-width: 1024px)").matches) { // Changed from 768px
        
        const workCards = document.querySelectorAll('.work-card');

        // Set up the Intersection Observer
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('card-hidden');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Add the initial hidden state and start observing each card
        workCards.forEach((card, index) => {
            card.classList.add('card-hidden');
            card.style.transitionDelay = `${index * 100}ms`; // Staggered delay
            observer.observe(card);
        });

    } // End of mobile/tablet block
});


document.addEventListener('DOMContentLoaded', () => {

    // --- (Your existing "Our Work" animation code stays here) ---


    // --- NEW: MOBILE & TABLET SCROLL ANIMATION FOR "SERVICES" CARDS ---

    if (window.matchMedia("(max-width: 1024px)").matches) {

        const serviceCards = document.querySelectorAll('.service-card');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const serviceObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Use a different class name to avoid conflicts
                    entry.target.classList.remove('service-card-hidden');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        serviceCards.forEach((card, index) => {
            // Use the new class name here as well
            card.classList.add('service-card-hidden');
            card.style.transitionDelay = `${index * 100}ms`; // Staggered delay
            serviceObserver.observe(card);
        });

    } // End of services mobile/tablet block
    
});

document.addEventListener('DOMContentLoaded', () => {

    // --- (Your existing "Our Work" and "Services" animation code stays here) ---


    // --- NEW: MOBILE & TABLET SCROLL ANIMATION FOR "BLOGS" SECTION ---

    if (window.matchMedia("(max-width: 1024px)").matches) {

        const blogCards = document.querySelectorAll('.blog-card');
        const blogButton = document.querySelector('.blog-section .see-all-btn');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const blogObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Check which type of element it is and remove the correct class
                    if (entry.target.classList.contains('see-all-btn')) {
                        entry.target.classList.remove('blog-btn-hidden');
                    } else {
                        entry.target.classList.remove('blog-card-hidden');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Animate the blog cards
        blogCards.forEach((card, index) => {
            card.classList.add('blog-card-hidden');
            card.style.transitionDelay = `${index * 100}ms`; // Staggered delay
            blogObserver.observe(card);
        });

        // Animate the button after the cards
        if (blogButton) {
            blogButton.classList.add('blog-btn-hidden');
            // Set a delay so it appears after the last card
            blogButton.style.transitionDelay = `${blogCards.length * 100}ms`;
            blogObserver.observe(blogButton);
        }

    } // End of blogs mobile/tablet block
    
});

document.addEventListener('DOMContentLoaded', () => {

    // --- (Your existing animation code for other sections can stay here) ---


    // --- NEW: ANIMATIONS FOR "TESTIMONIALS" SECTION ---

    // --- 1. DESKTOP 3D TILT EFFECT ---
    if (window.matchMedia("(min-width: 1025px)").matches) {
        
        const cards = document.querySelectorAll('.testimonial-card');

        cards.forEach(card => {
            // UPDATED: A smaller value makes the tilt more subtle.
            const maxTilt = 4; // Max tilt in degrees

            // This prevents the card from having a transition on the tilt itself,
            // making it respond instantly to mouse movement. The reset is still transitioned.
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
            
            card.addEventListener('mousemove', (e) => {
                const cardRect = card.getBoundingClientRect();
                const x = e.clientX - cardRect.left;
                const y = e.clientY - cardRect.top;

                const midCardWidth = cardRect.width / 2;
                const midCardHeight = cardRect.height / 2;

                const tiltY = (x - midCardWidth) / midCardWidth * maxTilt;
                const tiltX = (midCardHeight - y) / midCardHeight * maxTilt;

                card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                card.classList.add('is-tilting');
            });

            card.addEventListener('mouseleave', () => {
                // Re-apply the transition for a smooth reset
                card.style.transition = 'transform 0.3s ease-out';
                card.style.transform = 'rotateX(0deg) rotateY(0deg)';
                card.classList.remove('is-tilting');
            });
        });
    }

    // --- 2. MOBILE & TABLET SCROLL-IN EFFECT ---
    if (window.matchMedia("(max-width: 1024px)").matches) {
        
        const testimonialCards = document.querySelectorAll('.testimonial-card');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const testimonialObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('testimonial-card-hidden');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        testimonialCards.forEach((card, index) => {
            card.classList.add('testimonial-card-hidden');
            card.style.transitionDelay = `${index * 100}ms`; // Staggered delay
            testimonialObserver.observe(card);
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {

    /* ====================================================== */
    /* === UNIVERSAL ON-SCROLL FADE-IN ANIMATION (REVISED) == */
    /* ====================================================== */

    // Helper function to set up and observe a group of elements
    const setupObserver = (elements, isGroup = false) => {
        if (!elements || elements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('is-hidden');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        elements.forEach((element, index) => {
            element.classList.add('fade-in-up', 'is-hidden');
            // If it's a group, apply a staggered delay. Otherwise, no delay.
            if (isGroup) {
                element.style.transitionDelay = `${index * 80}ms`; // Slightly faster stagger
            }
            observer.observe(element);
        });
    };

    // --- Animate Individual Elements (no stagger needed) ---
    setupObserver(document.querySelectorAll('.hero-headline, .statue-container, .logo-slide-track, .section-heading, .section-subheading, .see-all-btn, .view-all-btn'));

    // --- Animate Groups of Elements (with stagger) ---
    setupObserver(document.querySelectorAll('.callout'), true);
    setupObserver(document.querySelectorAll('.service-card'), true);
    setupObserver(document.querySelectorAll('.work-card'), true);
    setupObserver(document.querySelectorAll('.how-card-wrapper'), true);
    setupObserver(document.querySelectorAll('.blog-card'), true);
    setupObserver(document.querySelectorAll('.testimonial-card'), true);


    /* ====================================================== */
    /* === OTHER PAGE-SPECIFIC JAVASCRIPT =================== */
    /* ====================================================== */

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('open');
            });
        }
    });

    // Desktop 3D Tilt Effect
    if (window.matchMedia("(min-width: 1025px)").matches) {
        const tiltCards = document.querySelectorAll('.testimonial-card');
        tiltCards.forEach(card => {
            const maxTilt = 4;
            card.addEventListener('mouseenter', () => { card.style.transition = 'none'; });
            card.addEventListener('mousemove', (e) => {
                const cardRect = card.getBoundingClientRect();
                const x = e.clientX - cardRect.left;
                const y = e.clientY - cardRect.top;
                const midCardWidth = cardRect.width / 2;
                const midCardHeight = cardRect.height / 2;
                const tiltY = (x - midCardWidth) / midCardWidth * maxTilt;
                const tiltX = (midCardHeight - y) / midCardHeight * maxTilt;
                card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                card.classList.add('is-tilting');
            });
            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.3s ease-out';
                card.style.transform = 'rotateX(0deg) rotateY(0deg)';
                card.classList.remove('is-tilting');
            });
        });
    }

    // Mobile Header Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const body = document.body;

    if (mobileMenuToggle && mobileNavMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            body.classList.toggle('mobile-menu-open');
            if (body.classList.contains('mobile-menu-open')) {
                mobileNavMenu.style.display = 'flex';
            } else {
                // Use a timeout to allow the fade-out/slide-out animation to finish if you add one
                setTimeout(() => {
                    if (!body.classList.contains('mobile-menu-open')) {
                         mobileNavMenu.style.display = 'none';
                    }
                }, 300); // Match this to your CSS transition duration
            }
        });
    }
});

// ===================================================================
//   Your commented-out code is preserved below for future use.
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {

    /* ====================================================== */
    /* === 1. UNIVERSAL ON-SCROLL FADE-IN ANIMATION ======= */
    /* ====================================================== */
    const setupObserver = (elements, isGroup = false) => {
        if (!elements || elements.length === 0) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('is-hidden');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        elements.forEach((element, index) => {
            element.classList.add('fade-in-up', 'is-hidden');
            if (isGroup) {
                element.style.transitionDelay = `${index * 100}ms`;
            }
            observer.observe(element);
        });
    };

    // Animate individual elements
    setupObserver(document.querySelectorAll('.page-header, .contact-grid, .footer-section'));
    // Animate groups of elements with a stagger
    setupObserver(document.querySelectorAll('.form-group, .contact-item'), true);


    /* ====================================================== */
    /* === 2. INTERACTIVE FLOATING LABEL FORMS ============ */
    /* ====================================================== */
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (input) {
            // Check on load if input already has a value
            if (input.value.trim() !== '') {
                group.classList.add('is-active');
            }
            input.addEventListener('focus', () => {
                group.classList.add('is-active');
            });
            input.addEventListener('blur', () => {
                if (input.value.trim() === '') {
                    group.classList.remove('is-active');
                }
            });
        }
    });

    /* ====================================================== */
    /* === 3. DYNAMIC TITLE WORD REVEAL =================== */
    /* ====================================================== */
    const infoTitle = document.querySelector('.info-title');
    if (infoTitle) {
        const text = infoTitle.innerHTML; // Use innerHTML to preserve the <span>
        infoTitle.innerHTML = ''; // Clear original content
        const words = text.split('<br>'); // Split by line breaks
        
        words.forEach((line, lineIndex) => {
            const lineDiv = document.createElement('div');
            const lineWords = line.trim().split(' ');
            lineWords.forEach((word, wordIndex) => {
                const wordSpan = document.createElement('span');
                wordSpan.innerHTML = word + ' '; // Add space back
                wordSpan.style.display = 'inline-block';
                wordSpan.classList.add('fade-in-up', 'is-hidden');
                // Create a staggered delay
                wordSpan.style.transitionDelay = `${(lineIndex * 2 + wordIndex) * 150}ms`;
                lineDiv.appendChild(wordSpan);
            });
            infoTitle.appendChild(lineDiv);
        });
        // Now that the spans are created, observe them
        setupObserver(infoTitle.querySelectorAll('span'));
    }
    
    /* ====================================================== */
    /* === 4. FORM SUBMISSION FEEDBACK ==================== */
    /* ====================================================== */
    const contactForm = document.querySelector('.contact-form-column form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop actual form submission
            const submitButton = contactForm.querySelector('.btn-gradient-border');
            
            // Start loading state
            submitButton.classList.add('is-loading');
            submitButton.disabled = true;

            // Simulate a network request (e.g., sending the email)
            setTimeout(() => {
                // Change to success state
                submitButton.classList.remove('is-loading');
                submitButton.classList.add('is-success');
                submitButton.textContent = 'Message Sent!';
            }, 2000); // 2-second delay
        });
    }

    /* ====================================================== */
    /* === OTHER PAGE-SPECIFIC JAVASCRIPT =================== */
    /* ====================================================== */

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('open');
            });
        }
    });

    // Mobile Header Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const body = document.body;

    if (mobileMenuToggle && mobileNavMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            body.classList.toggle('mobile-menu-open');
            mobileNavMenu.style.display = body.classList.contains('mobile-menu-open') ? 'flex' : 'none';
        });
    }

});
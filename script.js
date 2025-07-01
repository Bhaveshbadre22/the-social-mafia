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





// ===================================================================
//   Your commented-out code is preserved below for future use.
// ===================================================================

// document.addEventListener('DOMContentLoaded', () => {
//     console.log("UI Ready!");
//     // Example: A subtle parallax effect for the statue
//     const hero = document.querySelector('.hero-section');
//     const statue = document.querySelector('.statue-container');

//     if (hero && statue) {
//         hero.addEventListener('mousemove', (e) => {
//             const { clientX, clientY } = e;
//             const { offsetWidth, offsetHeight } = hero;
            
//             const xPos = (clientX / offsetWidth - 0.5) * 30; // -15px to 15px
//             const yPos = (clientY / offsetHeight - 0.5) * 30; // -15px to 15px
            
//             statue.style.transform = `translate(-50%, -50%) translate(${xPos}px, ${yPos}px)`;
//         });
//     }
// });
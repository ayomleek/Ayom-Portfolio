/**
 * =============================================================================
 * AYOM LEEK - RESUME PAGE JAVASCRIPT
 * Handles all interactive functionality for the resume page
 * =============================================================================
 * 
 * @author Ayom Leek
 * @version 1.0.0
 * 
 * Features:
 * - Smooth scrolling for resume navigation
 * - Scroll spy to highlight active section
 * - Scroll-triggered animations (fadeIn)
 * - Sticky navigation with dynamic positioning
 * - Mobile responsive adjustments
 * - URL hash handling for direct section linking
 * 
 * =============================================================================
 */

    /* ===============================
       MOBILE SLIDE MENU )
    =============================== */
    const menuOpen = document.querySelector("#menu-open-button");
    const menuClose = document.querySelector("#menu-close-button");
    const navLinks = document.querySelectorAll(".nav-links a");

    if (menuOpen && menuClose) {

        menuOpen.addEventListener("click", () => {
            document.body.classList.add("open-mobile-menu");
        });

        menuClose.addEventListener("click", () => {
            document.body.classList.remove("open-mobile-menu");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                document.body.classList.remove("open-mobile-menu");
            });
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                document.body.classList.remove("open-mobile-menu");
            }
        });
    }

(function() {
    'use strict';

    /**
     * Wait for DOM to be fully loaded before initializing
     * Ensures all HTML elements are available for manipulation
     */
    document.addEventListener('DOMContentLoaded', function() {
        
        /* --------------------------------------------------------------------
         * RESUME NAVIGATION SYSTEM
         * Handles all navigation-related functionality including smooth
         * scrolling, active state management, and scroll spy
         * -------------------------------------------------------------------- */
        
        const resumeNavigation = {
            // Cache DOM elements for better performance
            navContainer: document.getElementById('resume-navigation'),
            navLinks: document.querySelectorAll('.resume-nav-link'),
            sections: document.querySelectorAll('.page'),
            
            /**
             * Initialize all navigation functionality
             * Only runs if navigation elements exist on the page
             */
            init: function() {
                if (this.navLinks.length === 0 || this.sections.length === 0) return;
                
                this.setupSmoothScrolling();
                this.setupScrollSpy();
                this.setupStickyNavigation();
                this.setInitialActiveState();
                this.setupResponsiveBehavior();
                
                // Log successful initialization in development
                this.logStatus();
            },
            
            /**
             * Set up smooth scrolling for navigation links
             * Prevents default jump behavior and animates scroll
             */
            setupSmoothScrolling: function() {
                this.navLinks.forEach(link => {
                    link.addEventListener('click', (event) => {
                        event.preventDefault();
                        
                        const targetId = link.getAttribute('href');
                        const targetSection = document.querySelector(targetId);
                        
                        if (targetSection) {
                            // Calculate position with offset for header
                            const targetPosition = targetSection.offsetTop - 80;
                            
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                            
                            // Update active state for navigation
                            this.updateActiveLink(link);
                            
                            // Update URL hash without causing page jump
                            history.pushState(null, null, targetId);
                        }
                    });
                });
            },
            
            /**
             * Update which navigation link is active
             * @param {HTMLElement} activeLink - The link to set as active
             */
            updateActiveLink: function(activeLink) {
                this.navLinks.forEach(link => link.classList.remove('active'));
                activeLink.classList.add('active');
            },
            
            /**
             * Set up scroll spy to highlight active section while scrolling
             * Monitors scroll position and updates navigation accordingly
             */
            setupScrollSpy: function() {
                const updateActiveSection = () => {
                    const scrollPosition = window.scrollY + 100; // Offset for better UX
                    
                    this.sections.forEach(section => {
                        const sectionTop = section.offsetTop;
                        const sectionBottom = sectionTop + section.clientHeight;
                        const sectionId = section.getAttribute('id');
                        
                        // Check if current section is in viewport
                        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                            this.navLinks.forEach(link => {
                                link.classList.remove('active');
                                const href = link.getAttribute('href').substring(1); // Remove #
                                if (href === sectionId) {
                                    link.classList.add('active');
                                }
                            });
                        }
                    });
                };
                
                // Add scroll event listener with passive option for performance
                window.addEventListener('scroll', updateActiveSection, { passive: true });
                
                // Run once on page load to set initial active section
                updateActiveSection();
            },
            
            /**
             * Set up sticky navigation positioning
             * Adjusts navigation position based on scroll position
             */
            setupStickyNavigation: function() {
                if (!this.navContainer) return;
                
                const updateNavPosition = () => {
                    if (window.scrollY > 100) {
                        this.navContainer.style.top = '20px';
                        this.navContainer.style.transition = 'top 0.3s ease';
                    } else {
                        this.navContainer.style.top = '30px';
                    }
                };
                
                window.addEventListener('scroll', updateNavPosition, { passive: true });
                updateNavPosition(); // Set initial position
            },
            
            /**
             * Set initial active state based on URL hash
             * Allows direct linking to specific sections
             */
            setInitialActiveState: function() {
                if (window.location.hash) {
                    const activeLink = document.querySelector(`.resume-nav-link[href="${window.location.hash}"]`);
                    if (activeLink) {
                        this.navLinks.forEach(link => link.classList.remove('active'));
                        activeLink.classList.add('active');
                    }
                }
            },
            
            /**
             * Handle responsive behavior for navigation
             * Adjusts positioning on window resize
             */
            setupResponsiveBehavior: function() {
                if (!this.navContainer) return;
                
                const handleResize = () => {
                    if (window.innerWidth <= 768) {
                        this.navContainer.style.position = 'relative';
                        this.navContainer.style.top = '0';
                    } else {
                        this.navContainer.style.position = 'sticky';
                        // Reset top based on scroll position
                        if (window.scrollY > 100) {
                            this.navContainer.style.top = '20px';
                        } else {
                            this.navContainer.style.top = '30px';
                        }
                    }
                };
                
                window.addEventListener('resize', handleResize);
                handleResize(); // Run on initial load
            },
            
            /**
             * Log initialization status in development environment
             */
            logStatus: function() {
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.log('%c📄 Resume Navigation System', 'font-weight: bold; color: #FF5722;');
                    console.log('   - Navigation Links:', this.navLinks.length);
                    console.log('   - Content Sections:', this.sections.length);
                    console.log('   - Status: ✅ Active');
                }
            }
        };
        
        // Initialize resume navigation system
        resumeNavigation.init();

        /* --------------------------------------------------------------------
         * SCROLL ANIMATION SYSTEM
         * Adds fade-in animations to elements as they enter the viewport
         * Uses the 'ftco-animate' class to identify animatable elements
         * -------------------------------------------------------------------- */
        
        const scrollAnimations = {
            animateElements: document.querySelectorAll('.ftco-animate'),
            animationClass: 'fadeIn',
            
            /**
             * Initialize scroll animations
             */
            init: function() {
                if (this.animateElements.length === 0) return;
                
                this.checkElements();
                window.addEventListener('scroll', () => this.checkElements(), { passive: true });
                
                this.logStatus();
            },
            
            /**
             * Check which elements are in viewport and animate them
             */
            checkElements: function() {
                this.animateElements.forEach(element => {
                    const elementRect = element.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    
                    // Element is considered in viewport if its top is within
                    // 100px of the viewport bottom and its bottom is positive
                    if (elementRect.top < windowHeight - 100 && elementRect.bottom > 0) {
                        element.classList.add('animated', this.animationClass);
                    }
                });
            },
            
            /**
             * Log animation system status
             */
            logStatus: function() {
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.log('%c✨ Scroll Animation System', 'font-weight: bold; color: #4CAF50;');
                    console.log('   - Elements to animate:', this.animateElements.length);
                    console.log('   - Status: ✅ Active');
                }
            }
        };
        
        // Small delay to ensure elements are properly positioned
        setTimeout(() => scrollAnimations.init(), 100);

        /* --------------------------------------------------------------------
         * PAGE LOAD HANDLER
         * Ensures smooth initial page load experience
         * -------------------------------------------------------------------- */
        
        window.addEventListener('load', function() {
            // Ensure body is visible (prevents any flash of invisible content)
            document.body.style.opacity = '1';
            
            // Re-trigger scroll animations after all images have loaded
            // This ensures elements below the fold are properly animated
            if (scrollAnimations.animateElements.length > 0) {
                setTimeout(() => {
                    window.dispatchEvent(new Event('scroll'));
                }, 300);
            }
            
            // Development logging
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('%c🚀 Resume page fully loaded and ready', 'color: #2196F3; font-weight: bold;');
            }
        });
        
        /* --------------------------------------------------------------------
         * INITIAL PAGE LOAD VISIBILITY
         * Sets body opacity to ensure smooth fade-in
         * -------------------------------------------------------------------- */
        document.body.style.opacity = '1';
    });

})();
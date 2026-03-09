
/* ============================================
   Modern Business Landing Page - JavaScript
   ============================================ */

// ============================================
// Environment Variables Configuration
// Access: window.ENV.VARIABLE_NAME
// ============================================

// Build-time placeholders (will be replaced during build process)
// These ensure sensitive data is never exposed in source code
const CONFIG = {
    API_KEY: 'REPLACE_API_KEY',
    DATABASE_URL: 'REPLACE_DATABASE_URL', 
    SECRET_TOKEN: 'REPLACE_SECRET_TOKEN',
    API_ENDPOINT: 'REPLACE_API_ENDPOINT'
};

window.ENV = {
    // Add your environment variables here
    // These will be overridden by Netlify environment variables at build/runtime
    
    // Example variables - replace with your actual keys in Netlify dashboard
    // API_KEY: '',
    // DATABASE_PASSWORD: '',
    // SECRET_TOKEN: '',
    
    // Get environment variable with fallback
    get: function(key, defaultValue = null) {
        // Try to get from Netlify environment
        if (typeof process !== 'undefined' && process.env && process.env[key]) {
            return process.env[key];
        }
        // Try to get from window.__env__ (Netlify injected)
        if (typeof window !== 'undefined' && window.__env__ && window.__env__[key]) {
            return window.__env__[key];
        }
        // Return default value
        return defaultValue;
    },
    
    // Check if running on Netlify
    isNetlify: function() {
        return window.location.hostname.includes('netlify.app') || 
               window.location.hostname.includes('netlify.com');
    }
};

// Create __env__ object for Netlify to populate (optional - Netlify can also use window.ENV)
window.__env__ = window.__env__ || {};

document.addEventListener('DOMContentLoaded', function() {
    
    /* ============================================
       Mobile Menu Toggle
       ============================================ */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            // Toggle mobile menu
            mobileMenu.classList.toggle('active');
            
            // Animate hamburger icon
            mobileToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    /* ============================================
       Header Scroll Effect
       ============================================ */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    /* ============================================
       Smooth Scroll for Navigation Links
       ============================================ */
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* ============================================
       Active Navigation Link on Scroll
       ============================================ */
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"], .mobile-nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    /* ============================================
       Form Submission Handler
       ============================================ */
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success message (in production, you'd send data to a server)
            alert(`Thank you, ${name}! Your message has been sent. We'll get back to you at ${email} soon.`);
            
            // Reset form
            this.reset();
        });
    }

    /* ============================================
       Scroll Reveal Animation
       ============================================ */
    const revealElements = document.querySelectorAll('.feature-card, .testimonial-card, .about-content, .contact-info');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    /* ============================================
       Back to Top Button (Optional Enhancement)
       ============================================ */
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary, #2563eb);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
    `;
    
    document.body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });

    /* ============================================
       Navbar Background on Scroll
       ============================================ */
    function updateHeaderBackground() {
        if (window.scrollY > 20) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
        }
    }

    window.addEventListener('scroll', updateHeaderBackground);
    updateHeaderBackground(); // Initial state

    /* ============================================
       Console Welcome Message
       ============================================ */
    console.log('%c🚀 Welcome to ModernBiz Landing Page!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
    console.log('%cThis template is fully responsive and ready to customize.', 'color: #64748b;');
    
});

/* ============================================
   GrowthApex - Shared JavaScript Functionality
   ============================================ */

class GrowthApexApp {
    constructor() {
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.initializeCursor();
        this.initializeNavigation();
        this.initializeScrollAnimations();
        this.initializeSocialParticles();
        this.initializeParallax();
        this.initializeNavbarScroll();
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.onDOMContentLoaded();
        });

        window.addEventListener('load', () => {
            this.onWindowLoad();
        });

        window.addEventListener('scroll', () => {
            this.onScroll();
        });

        window.addEventListener('resize', () => {
            this.onResize();
        });
    }

    onDOMContentLoaded() {
        // Fade in animations for elements
        this.animateElements();
        
        // Initialize mobile menu
        this.initializeMobileMenu();
        
        // Set active navigation
        this.setActiveNavigation();
    }

    onWindowLoad() {
        // Hide loading spinner if present
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    }

    onScroll() {
        this.updateNavbarOnScroll();
        this.updateScrollAnimations();
        this.updateParallax();
    }

    onResize() {
        this.updateResponsiveElements();
    }

    /* ============================================
       Custom Cursor
       ============================================ */

    initializeCursor() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        const cursor = document.createElement('div');
        const cursorFollower = document.createElement('div');
        
        cursor.className = 'cursor';
        cursorFollower.className = 'cursor-follower';
        
        document.body.appendChild(cursor);
        document.body.appendChild(cursorFollower);

        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
        });

        document.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
        });

        // Smooth follow animation
        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Cursor interactions
        const interactiveElements = 'a, button, .btn, .service-card, .glass-card';
        
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches(interactiveElements)) {
                cursor.style.transform += ' scale(1.5)';
                cursorFollower.style.transform += ' scale(1.2)';
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.matches(interactiveElements)) {
                cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
                cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.2)', '');
            }
        });
    }

    /* ============================================
       Navigation
       ============================================ */

    initializeNavigation() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Logo click to home
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('click', () => {
                if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
                    window.location.href = 'index.html';
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
    }

    initializeMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                mobileToggle.classList.toggle('active');
                
                // Animate hamburger icon
                const spans = mobileToggle.querySelectorAll('span');
                if (mobileToggle.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    spans.forEach(span => {
                        span.style.transform = '';
                        span.style.opacity = '';
                    });
                }
            });

            // Close mobile menu on link click
            document.querySelectorAll('.mobile-nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    
                    const spans = mobileToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = '';
                        span.style.opacity = '';
                    });
                });
            });
        }
    }

    setActiveNavigation() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === 'index.html' && href === '#home') ||
                (currentPage === '' && href === '#home')) {
                link.classList.add('active');
            }
        });
    }

    updateNavbarOnScroll() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    initializeNavbarScroll() {
        let lastScrollTop = 0;
        const header = document.querySelector('.header');
        
        if (!header) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    /* ============================================
       Scroll Animations
       ============================================ */

    initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('.fade-in, .slide-up, .scale-in').forEach(el => {
            observer.observe(el);
        });

        // Add animation classes to elements that should animate
        this.addAnimationClasses();
    }

    addAnimationClasses() {
        // Add fade-in to cards and sections
        document.querySelectorAll('.glass-card, .service-card').forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.1}s`;
        });

        // Add slide-up to titles
        document.querySelectorAll('.section-title, .page-title, h2, h3').forEach(el => {
            el.classList.add('slide-up');
        });

        // Add scale-in to buttons and interactive elements
        document.querySelectorAll('.btn, .cta-button').forEach(el => {
            el.classList.add('scale-in');
        });
    }

    updateScrollAnimations() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    /* ============================================
       Social Media Particles
       ============================================ */

    initializeSocialParticles() {
        const container = document.querySelector('.social-particles');
        if (!container) {
            const particleContainer = document.createElement('div');
            particleContainer.className = 'social-particles';
            document.body.appendChild(particleContainer);
            this.createSocialParticles(particleContainer);
        } else {
            this.createSocialParticles(container);
        }
    }

    createSocialParticles(container) {
        const icons = ['📱', '💻', '🚀', '⚡', '💡', '🎯', '📈', '💎', '🔥', '⭐'];
        const particleCount = window.innerWidth > 768 ? 8 : 4;

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'social-particle';
            particle.textContent = icons[Math.floor(Math.random() * icons.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            container.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 25000);
        };

        // Create initial particles
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => createParticle(), i * 2000);
        }

        // Continue creating particles
        setInterval(createParticle, 3000);
    }

    /* ============================================
       Parallax Effects
       ============================================ */

    initializeParallax() {
        // Add parallax data attributes to elements
        const heroElements = document.querySelectorAll('.hero::before, .page-hero::before');
        heroElements.forEach(el => {
            el.setAttribute('data-parallax', '0.3');
        });
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        
        // Update hero background
        const hero = document.querySelector('.hero, .page-hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }

    /* ============================================
       Utility Functions
       ============================================ */

    animateElements() {
        // Stagger animation for multiple elements
        const animateGroup = (selector, delay = 100) => {
            document.querySelectorAll(selector).forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * delay);
            });
        };

        // Apply staggered animations
        setTimeout(() => animateGroup('.fade-in', 100), 300);
        setTimeout(() => animateGroup('.slide-up', 150), 500);
        setTimeout(() => animateGroup('.scale-in', 200), 700);
    }

    updateResponsiveElements() {
        // Update cursor for mobile
        if (window.innerWidth <= 768) {
            const cursor = document.querySelector('.cursor');
            const cursorFollower = document.querySelector('.cursor-follower');
            if (cursor) cursor.style.display = 'none';
            if (cursorFollower) cursorFollower.style.display = 'none';
        } else {
            const cursor = document.querySelector('.cursor');
            const cursorFollower = document.querySelector('.cursor-follower');
            if (cursor) cursor.style.display = 'block';
            if (cursorFollower) cursorFollower.style.display = 'block';
        }
    }

    /* ============================================
       Form Handling
       ============================================ */

    initializeFormHandling() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        // Basic form validation
        if (!this.validateForm(form)) {
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            this.showFormSuccess();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.reset();
        }, 2000);
    }

    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            } else if (field.type === 'email' && !this.isValidEmail(field.value)) {
                this.showFieldError(field, 'Please enter a valid email');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });

        return isValid;
    }

    showFieldError(field, message) {
        field.style.borderColor = '#ef4444';
        let errorMsg = field.parentNode.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            errorMsg.style.color = '#ef4444';
            errorMsg.style.fontSize = '0.875rem';
            errorMsg.style.marginTop = '0.25rem';
            errorMsg.style.display = 'block';
            field.parentNode.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFormSuccess() {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: var(--border-radius);
            padding: 2rem;
            text-align: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        successDiv.innerHTML = `
            <div style="color: var(--accent-color); font-size: 3rem; margin-bottom: 1rem;">✓</div>
            <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">Thank You!</h3>
            <p style="color: var(--text-secondary);">Your message has been sent successfully.</p>
        `;

        document.body.appendChild(successDiv);

        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    /* ============================================
       Performance Optimization
       ============================================ */

    throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the app
const growthApexApp = new GrowthApexApp();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GrowthApexApp;
}

/* ============================================
   Additional Utility Functions
   ============================================ */

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Loading animation
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--primary-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    loader.innerHTML = `
        <div style="
            width: 50px;
            height: 50px;
            border: 3px solid var(--glass-border);
            border-top: 3px solid var(--accent-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
    `;
    
    document.body.appendChild(loader);
}

// Add spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(style);


  const cursor = document.querySelector(".cursor");

  document.addEventListener("mousemove", (e) => {
    if (cursor) {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    }
  });




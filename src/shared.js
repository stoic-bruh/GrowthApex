/* ============================================
   GrowthApex - Shared JavaScript Functionality
   ============================================ */

class GrowthApexApp {
    constructor() {
        console.log('🚀 GrowthApexApp constructor called');
        this.initializeApp();
    }

    initializeApp() {
        console.log('🔧 Initializing GrowthApexApp');
        this.setupEventListeners();
        this.initializeCursor();
        this.initializeNavigation();
        this.initializeScrollAnimations();
        this.initializeSocialParticles();
        this.initializeParallax();
        this.initializeNavbarScroll();
        console.log('✅ GrowthApexApp initialization complete');
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
        console.log('🏠 DOM Content Loaded - GrowthApex App');
        
        // Fade in animations for elements
        this.animateElements();
        
        // Initialize mobile menu
        this.initializeMobileMenu();
        
        // Set active navigation
        this.setActiveNavigation();
        
        // Initialize form handling and animations
        this.initializeFormHandling();
        
        console.log('✅ All initializations complete');
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
        let scrollThreshold = 10;
        const header = document.querySelector('.header');
        
        console.log('🔍 Initializing navbar scroll behavior');
        console.log('🔍 Header element found:', header);
        
        if (!header) {
            console.log('❌ No header element found');
            return;
        }

        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDelta = scrollTop - lastScrollTop;
            
            // Only trigger if scroll amount is significant
            if (Math.abs(scrollDelta) > scrollThreshold) {
                if (scrollDelta > 0 && scrollTop > 100) {
                    // Scrolling down - hide navbar
                    console.log('📉 Scrolling down - hiding navbar');
                    header.classList.add('hidden');
                    header.classList.remove('scrolled');
                } else if (scrollDelta < 0) {
                    // Scrolling up - show navbar
                    console.log('📈 Scrolling up - showing navbar');
                    header.classList.remove('hidden');
                    if (scrollTop > 100) {
                        header.classList.add('scrolled');
                    }
                }
                
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            }
        };

        // Use throttled scroll handler for better performance
        const throttledScroll = this.throttle(handleScroll, 100);
        window.addEventListener('scroll', throttledScroll);
        console.log('✅ Navbar scroll behavior initialized');
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
        console.log('🔧 Initializing form handling...');
        
        // Initialize form handling for all forms
        const forms = document.querySelectorAll('form');
        console.log('📝 Found forms:', forms.length);
        
        forms.forEach((form, index) => {
            console.log(`📝 Form ${index + 1}:`, form.id, form);
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        });
        
        // Add smooth form animations
        this.initializeFormAnimations();
    }

    initializeFormAnimations() {
        console.log('🎨 Initializing form animations...');
        
        // Add smooth animations to form inputs
        const formInputs = document.querySelectorAll('input, select, textarea');
        console.log('📝 Found form inputs:', formInputs.length);
        
        formInputs.forEach((input, index) => {
            console.log(`📝 Input ${index + 1}:`, input.type, input.name);
            
            // Add focus animations
            input.addEventListener('focus', (e) => {
                console.log('🎯 Input focused:', e.target.name);
                e.target.style.transform = 'scale(1.02)';
                e.target.style.transition = 'all 0.3s ease';
                e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                e.target.style.borderColor = 'var(--accent-color)';
            });
            
            // Add blur animations
            input.addEventListener('blur', (e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
                if (!e.target.value) {
                    e.target.style.borderColor = 'var(--glass-border)';
                }
            });
            
            // Add typing animations
            input.addEventListener('input', (e) => {
                if (e.target.value) {
                    e.target.style.borderColor = 'var(--accent-color)';
                    e.target.style.background = 'rgba(139, 92, 246, 0.05)';
                } else {
                    e.target.style.borderColor = 'var(--glass-border)';
                    e.target.style.background = 'var(--glass-bg)';
                }
            });
            
            // Add label animations
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                input.addEventListener('focus', () => {
                    label.style.color = 'var(--accent-color)';
                    label.style.transform = 'translateY(-2px)';
                    label.style.transition = 'all 0.3s ease';
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        label.style.color = 'var(--text-primary)';
                        label.style.transform = 'translateY(0)';
                    }
                });
            }
        });
        
        // Add smooth button animations
        const submitButtons = document.querySelectorAll('.submit-btn, button[type="submit"]');
        console.log('🔘 Found submit buttons:', submitButtons.length);
        
        submitButtons.forEach((button, index) => {
            console.log(`🔘 Submit button ${index + 1}:`, button.textContent);
            
            button.addEventListener('mouseenter', (e) => {
                console.log('🖱️ Button hover:', e.target.textContent);
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.3)';
                e.target.style.transition = 'all 0.3s ease';
            });
            
            button.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
            });
            
            button.addEventListener('mousedown', (e) => {
                e.target.style.transform = 'translateY(0) scale(0.98)';
            });
            
            button.addEventListener('mouseup', (e) => {
                e.target.style.transform = 'translateY(-2px) scale(1)';
            });
        });
        
        // Add form group animations
        const formGroups = document.querySelectorAll('.form-group');
        console.log('📋 Found form groups:', formGroups.length);
        
        formGroups.forEach((group, index) => {
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            group.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        console.log('✅ Form animations initialized');
    }

    async handleFormSubmit(e) {
        console.log('🚀 Form submission started:', e.target.id);
        e.preventDefault();
        const form = e.target;
        
        // Check if this is the contact form
        if (form.id === 'contactForm' || form.id === 'contact-form') {
            console.log('📧 Contact form detected, handling...');
            await this.handleContactFormSubmit(e);
            return;
        }
        
        // Check if this is a newsletter form
        const newsletterEmail = form.querySelector('input[type="email"]');
        if (newsletterEmail && form.querySelector('button[type="submit"]')) {
            console.log('📧 Newsletter form detected, handling...');
            await this.handleNewsletterFormSubmit(e);
            return;
        }
        
        console.log('📝 Handling other form...');
        // Basic form validation for other forms
        if (!this.validateForm(form)) {
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simple form submission for non-contact forms
        setTimeout(() => {
            this.showFormSuccess();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.reset();
        }, 2000);
    }

    async handleContactFormSubmit(e) {
        console.log('📧 Contact form submission handler started');
        const contactForm = e.target;
        const submitBtn = contactForm.querySelector('.submit-btn');
        const statusDiv = document.getElementById('form-status');
        const originalText = submitBtn.textContent;
        const originalStyle = submitBtn.style.cssText;
        
        console.log('🔘 Submit button found:', submitBtn);
        console.log('📊 Status div found:', statusDiv);
        
        // DRAMATIC LOADING STATE - Make user feel like something is happening
        submitBtn.disabled = true;
        submitBtn.textContent = '🚀 Launching...';
        submitBtn.style.background = 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)';
        submitBtn.style.transform = 'scale(0.95) translateY(2px)';
        submitBtn.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        submitBtn.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4), 0 0 0 3px rgba(139, 92, 246, 0.2)';
        submitBtn.style.border = 'none';
        submitBtn.style.color = 'white';
        submitBtn.style.fontWeight = '700';
        submitBtn.style.letterSpacing = '0.5px';
        
        // Add pulsing animation
        submitBtn.style.animation = 'pulse 1.5s infinite';
        
        // Add rocket takeoff animation - DRAMATIC CENTERED VERSION
        this.addRocketTakeoff(submitBtn);
        
        // Add immediate rocket icon effect on button
        const rocketIcon = document.createElement('span');
        rocketIcon.innerHTML = '🚀';
        rocketIcon.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 24px;
            animation: rocketButton 0.8s ease-out forwards;
            pointer-events: none;
            z-index: 10;
        `;
        
        // Add rocket button animation CSS
        const rocketStyle = document.createElement('style');
        rocketStyle.textContent = `
            @keyframes rocketButton {
                0% {
                    transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    opacity: 0;
                }
                20% {
                    transform: translate(-50%, -50%) scale(1.2) rotate(0deg);
                    opacity: 1;
                }
                40% {
                    transform: translate(-50%, -50%) scale(1) rotate(0deg);
                    opacity: 1;
                }
                60% {
                    transform: translate(-50%, -50%) scale(1.1) rotate(-5deg);
                    opacity: 1;
                }
                80% {
                    transform: translate(-50%, -50%) scale(1.2) rotate(-10deg);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(-50%, -50%) scale(0) rotate(-15deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rocketStyle);
        
        // Position the button relatively to contain the rocket
        submitBtn.style.position = 'relative';
        submitBtn.appendChild(rocketIcon);
        
        // Remove rocket icon after animation
        setTimeout(() => {
            if (rocketIcon.parentNode) {
                rocketIcon.remove();
            }
            if (rocketStyle.parentNode) {
                rocketStyle.remove();
            }
        }, 1000);
        
        console.log('🎨 Button animations applied');
        
        if (statusDiv) {
            statusDiv.textContent = '';
            statusDiv.style.color = '';
        }
        
        try {
            // Collect form data
            const formData = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                company: contactForm.company.value,
                phone: contactForm.phone.value,
                goals: contactForm.goals.value
            };
            
            console.log('📋 Form data collected:', formData);
            
            // Add country code to phone if available
            const countryCodeSelect = contactForm.querySelector('#countryCode');
            if (countryCodeSelect) {
                const countryCode = countryCodeSelect.options[countryCodeSelect.selectedIndex].text.split(' ')[1];
                formData.phone = `${countryCode} ${formData.phone}`;
                console.log('📞 Phone with country code:', formData.phone);
            }
            
            console.log('🌐 Sending request to backend...');
            
            // Simulate processing time for better UX
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Send to backend
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
              });
              
            
            console.log('📡 Response received:', response.status);
            const result = await response.json();
            console.log('📄 Response data:', result);
            
            if (result.success) {
                console.log('✅ Form submission successful');
                
                // EPIC SUCCESS ANIMATION - Make user feel accomplished
                submitBtn.style.animation = 'none';
                submitBtn.textContent = '🎉 Success!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                submitBtn.style.transform = 'scale(1.1) translateY(-4px)';
                submitBtn.style.boxShadow = '0 12px 40px rgba(16, 185, 129, 0.5), 0 0 0 4px rgba(16, 185, 129, 0.3)';
                submitBtn.style.color = 'white';
                submitBtn.style.fontWeight = '800';
                submitBtn.style.letterSpacing = '1px';
                
                // Add success bounce animation
                submitBtn.style.animation = 'successBounce 0.6s ease-out';
                
                if (statusDiv) {
                    statusDiv.textContent = '✨ Your transformation journey begins now!';
                    statusDiv.style.color = '#10b981';
                    statusDiv.style.fontWeight = '700';
                    statusDiv.style.fontSize = '1.1rem';
                    statusDiv.style.textAlign = 'center';
                    statusDiv.style.padding = '1rem';
                    statusDiv.style.background = 'rgba(16, 185, 129, 0.1)';
                    statusDiv.style.borderRadius = '8px';
                    statusDiv.style.border = '2px solid rgba(16, 185, 129, 0.2)';
                    statusDiv.style.animation = 'fadeInUp 0.5s ease-out';
                }
                
                // Add confetti effect (simple CSS-based)
                this.addConfettiEffect(submitBtn);
                
                // Add success rocket that flies up from button
                this.addSuccessRocket(submitBtn);
                
                // Reset form after delay with smooth animation
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.cssText = originalStyle;
                    submitBtn.disabled = false;
                    submitBtn.style.animation = 'none';
                    if (statusDiv) {
                        statusDiv.textContent = '';
                        statusDiv.style.cssText = '';
                    }
                }, 4000);
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (error) {
            console.error('❌ Error in contact form submission:', error);
            
            // DRAMATIC ERROR ANIMATION - Clear feedback that something went wrong
            submitBtn.style.animation = 'none';
            submitBtn.textContent = '⚠️ Try Again';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            submitBtn.style.transform = 'scale(0.9) translateY(1px)';
            submitBtn.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.4), 0 0 0 3px rgba(239, 68, 68, 0.2)';
            submitBtn.style.color = 'white';
            submitBtn.style.fontWeight = '700';
            submitBtn.style.animation = 'errorShake 0.5s ease-in-out';
            
            if (statusDiv) {
                statusDiv.textContent = '❌ ' + (error.message || 'There was an error submitting the form. Please try again.');
                statusDiv.style.color = '#ef4444';
                statusDiv.style.fontWeight = '600';
                statusDiv.style.background = 'rgba(239, 68, 68, 0.1)';
                statusDiv.style.padding = '1rem';
                statusDiv.style.borderRadius = '8px';
                statusDiv.style.border = '2px solid rgba(239, 68, 68, 0.2)';
            }
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.cssText = originalStyle;
                submitBtn.disabled = false;
                submitBtn.style.animation = 'none';
                if (statusDiv) {
                    statusDiv.textContent = '';
                    statusDiv.style.cssText = '';
                }
            }, 3000);
        }
    }

    async handleNewsletterFormSubmit(e) {
        console.log('📧 Newsletter form submission handler started');
        const newsletterForm = e.target;
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        const originalStyle = submitBtn.style.cssText;
        
        console.log('🔘 Submit button found:', submitBtn);
        
        // DRAMATIC LOADING STATE - Make user feel like something is happening
        submitBtn.disabled = true;
        submitBtn.textContent = '🚀 Launching...';
        submitBtn.style.background = 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)';
        submitBtn.style.transform = 'scale(0.95) translateY(2px)';
        submitBtn.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        submitBtn.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4), 0 0 0 3px rgba(139, 92, 246, 0.2)';
        submitBtn.style.border = 'none';
        submitBtn.style.color = 'white';
        submitBtn.style.fontWeight = '700';
        submitBtn.style.letterSpacing = '0.5px';
        
        // Add pulsing animation
        submitBtn.style.animation = 'pulse 1.5s infinite';
        
        // Add rocket takeoff animation - DRAMATIC CENTERED VERSION
        this.addRocketTakeoff(submitBtn);
        
        // Add immediate rocket icon effect on button
        const rocketIcon = document.createElement('span');
        rocketIcon.innerHTML = '🚀';
        rocketIcon.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 24px;
            animation: rocketButton 0.8s ease-out forwards;
            pointer-events: none;
            z-index: 10;
        `;
        
        // Add rocket button animation CSS
        const rocketStyle = document.createElement('style');
        rocketStyle.textContent = `
            @keyframes rocketButton {
                0% {
                    transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    opacity: 0;
                }
                20% {
                    transform: translate(-50%, -50%) scale(1.2) rotate(0deg);
                    opacity: 1;
                }
                40% {
                    transform: translate(-50%, -50%) scale(1) rotate(0deg);
                    opacity: 1;
                }
                60% {
                    transform: translate(-50%, -50%) scale(1.1) rotate(-5deg);
                    opacity: 1;
                }
                80% {
                    transform: translate(-50%, -50%) scale(1.2) rotate(-10deg);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(-50%, -50%) scale(0) rotate(-15deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rocketStyle);
        
        // Position the button relatively to contain the rocket
        submitBtn.style.position = 'relative';
        submitBtn.appendChild(rocketIcon);
        
        // Remove rocket icon after animation
        setTimeout(() => {
            if (rocketIcon.parentNode) {
                rocketIcon.remove();
            }
            if (rocketStyle.parentNode) {
                rocketStyle.remove();
            }
        }, 1000);
        
        console.log('🎨 Button animations applied');
        
        try {
            // Collect form data
            const formData = {
                email: newsletterForm.querySelector('input[type="email"]').value
            };
            
            console.log('📋 Newsletter form data collected:', formData);
            
            console.log('🌐 Simulating newsletter subscription...');
            
            // Simulate processing time for better UX
            await new Promise(resolve => setTimeout(resolve, 800));
            
            console.log('✅ Newsletter subscription successful');
            
            // EPIC SUCCESS ANIMATION - Make user feel accomplished
            submitBtn.style.animation = 'none';
            submitBtn.textContent = '🎉 Welcome!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            submitBtn.style.transform = 'scale(1.1) translateY(-4px)';
            submitBtn.style.boxShadow = '0 12px 40px rgba(16, 185, 129, 0.5), 0 0 0 4px rgba(16, 185, 129, 0.3)';
            submitBtn.style.color = 'white';
            submitBtn.style.fontWeight = '800';
            submitBtn.style.letterSpacing = '1px';
            
            // Add success bounce animation
            submitBtn.style.animation = 'successBounce 0.6s ease-out';
            
            // Add confetti effect (simple CSS-based)
            this.addConfettiEffect(submitBtn);
            
            // Add success rocket that flies up from button
            this.addSuccessRocket(submitBtn);
            
            // Reset form after delay with smooth animation
            setTimeout(() => {
                newsletterForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.cssText = originalStyle;
                submitBtn.disabled = false;
                submitBtn.style.animation = 'none';
            }, 4000);
        } catch (error) {
            console.error('❌ Error in newsletter form submission:', error);
            
            // DRAMATIC ERROR ANIMATION - Clear feedback that something went wrong
            submitBtn.style.animation = 'none';
            submitBtn.textContent = '⚠️ Try Again';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            submitBtn.style.transform = 'scale(0.9) translateY(1px)';
            submitBtn.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.4), 0 0 0 3px rgba(239, 68, 68, 0.2)';
            submitBtn.style.color = 'white';
            submitBtn.style.fontWeight = '700';
            submitBtn.style.animation = 'errorShake 0.5s ease-in-out';
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.cssText = originalStyle;
                submitBtn.disabled = false;
                submitBtn.style.animation = 'none';
            }, 3000);
        }
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

    // Add confetti effect for success
    addConfettiEffect(element) {
        const colors = ['#8b5cf6', '#6366f1', '#10b981', '#f59e0b', '#ef4444'];
        const confettiCount = 20;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'absolute';
                confetti.style.width = '8px';
                confetti.style.height = '8px';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '1000';
                
                const rect = element.getBoundingClientRect();
                confetti.style.left = rect.left + rect.width / 2 + 'px';
                confetti.style.top = rect.top + rect.height / 2 + 'px';
                
                document.body.appendChild(confetti);
                
                // Animate confetti
                const angle = (Math.PI * 2 * i) / confettiCount;
                const velocity = 100 + Math.random() * 100;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity - 50;
                
                let x = 0;
                let y = 0;
                let opacity = 1;
                
                const animate = () => {
                    x += vx * 0.016;
                    y += vy * 0.016;
                    vy += 200 * 0.016; // gravity
                    opacity -= 0.02;
                    
                    confetti.style.transform = `translate(${x}px, ${y}px)`;
                    confetti.style.opacity = opacity;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(animate);
                    } else {
                        confetti.remove();
                    }
                };
                
                requestAnimationFrame(animate);
            }, i * 50);
        }
    }
    
    // Add rocket takeoff animation - DRAMATIC CENTERED VERSION
    addRocketTakeoff(element) {
        // Create full-screen overlay for dramatic effect
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%);
            z-index: 9999;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        
        // Create rocket container - CENTERED ON SCREEN
        const rocketContainer = document.createElement('div');
        rocketContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 150px;
            height: 150px;
            z-index: 10000;
            pointer-events: none;
            filter: drop-shadow(0 12px 24px rgba(0,0,0,0.6));
        `;
        
        // Create MASSIVE rocket icon
        const rocket = document.createElement('div');
        rocket.innerHTML = '🚀';
        rocket.style.cssText = `
            font-size: 100px;
            text-align: center;
            line-height: 150px;
            filter: drop-shadow(0 6px 12px rgba(0,0,0,0.4));
            transform: scale(0);
            transition: transform 0.3s ease;
        `;
        
        // Create dramatic smoke trail
        const smokeTrail = document.createElement('div');
        smokeTrail.style.cssText = `
            position: absolute;
            bottom: -50px;
            left: 50%;
            transform: translateX(-50%);
            width: 12px;
            height: 50px;
            background: linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.4), transparent);
            border-radius: 6px;
            animation: dramaticSmokeRise 1.2s ease-out;
        `;
        
        // Create massive launch pad
        const launchPad = document.createElement('div');
        launchPad.style.cssText = `
            position: absolute;
            bottom: -25px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 25px;
            background: linear-gradient(135deg, #1f2937, #374151, #6b7280);
            border-radius: 12px;
            box-shadow: 0 6px 12px rgba(0,0,0,0.6);
            animation: dramaticLaunchPadShake 0.4s ease-in-out;
        `;
        
        // Create dramatic flame effect
        const flame = document.createElement('div');
        flame.style.cssText = `
            position: absolute;
            bottom: -40px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 40px;
            background: linear-gradient(to top, #fbbf24, #f59e0b, #ef4444, #dc2626);
            border-radius: 10px 10px 0 0;
            animation: dramaticFlameFlicker 0.03s infinite;
        `;
        
        // Create explosion particles
        const particles = document.createElement('div');
        particles.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 300px;
            pointer-events: none;
        `;
        
        // Create screen shake effect
        const screenShake = document.createElement('div');
        screenShake.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 9998;
            pointer-events: none;
            animation: screenShake 0.5s ease-in-out;
        `;
        
        // Add elements to container
        rocketContainer.appendChild(rocket);
        rocketContainer.appendChild(smokeTrail);
        rocketContainer.appendChild(launchPad);
        rocketContainer.appendChild(flame);
        rocketContainer.appendChild(particles);
        
        // Add to page
        document.body.appendChild(overlay);
        document.body.appendChild(screenShake);
        document.body.appendChild(rocketContainer);
        
        // Add DRAMATIC CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes dramaticRocketLaunch {
                0% {
                    transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    opacity: 0;
                }
                5% {
                    transform: translate(-50%, -50%) scale(1.3) rotate(0deg);
                    opacity: 1;
                }
                10% {
                    transform: translate(-50%, -50%) scale(1.1) rotate(0deg);
                    opacity: 1;
                }
                20% {
                    transform: translate(-50%, -50%) scale(1.2) rotate(-5deg);
                    opacity: 1;
                }
                30% {
                    transform: translate(-50%, -50%) scale(1.3) rotate(-10deg);
                    opacity: 1;
                }
                40% {
                    transform: translate(-50%, -50%) scale(1.4) rotate(-15deg);
                    opacity: 1;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.5) rotate(-20deg);
                    opacity: 0.95;
                }
                60% {
                    transform: translate(-50%, -50%) scale(1.6) rotate(-25deg);
                    opacity: 0.9;
                }
                70% {
                    transform: translate(-50%, -50%) scale(1.7) rotate(-30deg);
                    opacity: 0.8;
                }
                80% {
                    transform: translate(-50%, -50%) scale(1.8) rotate(-35deg);
                    opacity: 0.6;
                }
                90% {
                    transform: translate(-50%, -50%) scale(1.9) rotate(-40deg);
                    opacity: 0.3;
                }
                100% {
                    transform: translate(-50%, -50%) scale(0) rotate(-45deg);
                    opacity: 0;
                }
            }
            
            @keyframes dramaticSmokeRise {
                0% {
                    height: 0;
                    opacity: 0;
                    transform: translateX(-50%) scale(0);
                }
                15% {
                    height: 25px;
                    opacity: 0.9;
                    transform: translateX(-50%) scale(1.1);
                }
                40% {
                    height: 50px;
                    opacity: 1;
                    transform: translateX(-50%) scale(1.3);
                }
                70% {
                    height: 80px;
                    opacity: 0.7;
                    transform: translateX(-50%) scale(1.6);
                }
                100% {
                    height: 120px;
                    opacity: 0;
                    transform: translateX(-50%) scale(2.5);
                }
            }
            
            @keyframes dramaticFlameFlicker {
                0%, 100% {
                    height: 40px;
                    background: linear-gradient(to top, #fbbf24, #f59e0b, #ef4444, #dc2626);
                    transform: translateX(-50%) scale(1);
                }
                20% {
                    height: 45px;
                    background: linear-gradient(to top, #fde047, #fbbf24, #f59e0b, #ef4444);
                    transform: translateX(-50%) scale(1.15);
                }
                40% {
                    height: 42px;
                    background: linear-gradient(to top, #fef3c7, #fde047, #fbbf24, #f59e0b);
                    transform: translateX(-50%) scale(1.08);
                }
                60% {
                    height: 48px;
                    background: linear-gradient(to top, #fef3c7, #fde047, #fbbf24, #f59e0b);
                    transform: translateX(-50%) scale(1.2);
                }
                80% {
                    height: 44px;
                    background: linear-gradient(to top, #fde047, #fbbf24, #f59e0b, #ef4444);
                    transform: translateX(-50%) scale(1.12);
                }
            }
            
            @keyframes dramaticLaunchPadShake {
                0%, 100% {
                    transform: translateX(-50%) translateY(0) scale(1);
                }
                10% {
                    transform: translateX(-50%) translateY(-4px) scale(1.03);
                }
                20% {
                    transform: translateX(-50%) translateY(4px) scale(0.97);
                }
                30% {
                    transform: translateX(-50%) translateY(-3px) scale(1.02);
                }
                40% {
                    transform: translateX(-50%) translateY(3px) scale(0.98);
                }
                50% {
                    transform: translateX(-50%) translateY(-2px) scale(1.01);
                }
                60% {
                    transform: translateX(-50%) translateY(2px) scale(0.99);
                }
                70% {
                    transform: translateX(-50%) translateY(-1px) scale(1);
                }
                80% {
                    transform: translateX(-50%) translateY(1px) scale(1);
                }
                90% {
                    transform: translateX(-50%) translateY(0) scale(1);
                }
            }
            
            @keyframes explosionParticle {
                0% {
                    transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(4) rotate(720deg);
                    opacity: 0;
                }
            }
            
            @keyframes screenShake {
                0%, 100% {
                    transform: translateX(0) translateY(0);
                }
                10% {
                    transform: translateX(-2px) translateY(-1px);
                }
                20% {
                    transform: translateX(2px) translateY(1px);
                }
                30% {
                    transform: translateX(-1px) translateY(-2px);
                }
                40% {
                    transform: translateX(1px) translateY(2px);
                }
                50% {
                    transform: translateX(-1px) translateY(-1px);
                }
                60% {
                    transform: translateX(1px) translateY(1px);
                }
                70% {
                    transform: translateX(0) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Start DRAMATIC launch sequence
        setTimeout(() => {
            // Fade in overlay
            overlay.style.opacity = '1';
            
            // Scale up rocket with dramatic effect
            rocket.style.transform = 'scale(1)';
            
            // Add explosion particles
            for (let i = 0; i < 12; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 6px;
                    height: 6px;
                    background: ${['#fbbf24', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'][i % 6]};
                    border-radius: 50%;
                    animation: explosionParticle 1s ease-out ${i * 0.08}s forwards;
                `;
                particles.appendChild(particle);
            }
            
            // Start rocket animation after dramatic pause
            setTimeout(() => {
                rocketContainer.style.animation = 'dramaticRocketLaunch 3s ease-out forwards';
                
                // Add rotation to rocket
                rocket.style.transform = 'rotate(-15deg)';
                rocket.style.transition = 'transform 0.3s ease';
                
                // Fade out overlay
                setTimeout(() => {
                    overlay.style.opacity = '0';
                }, 800);
                
                // Remove after animation
                setTimeout(() => {
                    if (rocketContainer.parentNode) {
                        rocketContainer.remove();
                    }
                    if (overlay.parentNode) {
                        overlay.remove();
                    }
                    if (screenShake.parentNode) {
                        screenShake.remove();
                    }
                    if (style.parentNode) {
                        style.remove();
                    }
                }, 3500);
            }, 1000);
        }, 100);
    }

    // Add success rocket that flies up from button
    addSuccessRocket(element) {
        const rect = element.getBoundingClientRect();
        
        // Create success rocket
        const successRocket = document.createElement('div');
        successRocket.innerHTML = '🚀';
        successRocket.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: 20px;
            z-index: 10001;
            pointer-events: none;
            transform: translate(-50%, -50%);
            animation: successRocketFly 1.5s ease-out forwards;
        `;
        
        // Add success rocket animation CSS
        const successStyle = document.createElement('style');
        successStyle.textContent = `
            @keyframes successRocketFly {
                0% {
                    transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    transform: translate(-50%, -50%) scale(1.2) rotate(0deg);
                    opacity: 1;
                }
                20% {
                    transform: translate(-50%, -50%) scale(1) rotate(0deg);
                    opacity: 1;
                }
                30% {
                    transform: translate(-50%, -50%) scale(1.1) rotate(-5deg);
                    opacity: 1;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.2) rotate(-10deg);
                    opacity: 1;
                }
                70% {
                    transform: translate(-50%, -50%) scale(1.3) rotate(-15deg);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(-50%, -50%) scale(0) rotate(-20deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(successStyle);
        
        // Add to page
        document.body.appendChild(successRocket);
        
        // Remove after animation
        setTimeout(() => {
            if (successRocket.parentNode) {
                successRocket.remove();
            }
            if (successStyle.parentNode) {
                successStyle.remove();
            }
        }, 1600);
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

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let scrollThreshold = 5; // Minimum scroll distance to trigger hide/show
    let isScrolling = false;

    // Throttle scroll events for better performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Handle scroll
    const handleScroll = throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class when scrolled down
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header based on scroll direction
        if (Math.abs(lastScrollTop - scrollTop) > scrollThreshold) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down & past 100px
                header.classList.add('hidden');
                header.classList.remove('visible');
            } else {
                // Scrolling up or at top
                header.classList.remove('hidden');
                header.classList.add('visible');
            }
            lastScrollTop = scrollTop;
        }
    }, 16); // ~60fps throttling

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle functionality
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu when clicking on nav links
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('open');
                body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!header.contains(e.target) && navLinks.classList.contains('open')) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('open');
                body.style.overflow = '';
            }
        });
    }
});


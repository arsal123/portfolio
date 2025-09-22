// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-menu a, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add scroll effect to header
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove shadow based on scroll position
        if (scrollTop > 50) {
            header.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
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
    
    // Observe skill categories and project cards for animation
    const animatedElements = document.querySelectorAll('.skill-category, .project-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    let currentIndex = 0;
    
    function typeWriter() {
        if (currentIndex < originalText.length) {
            heroTitle.textContent = originalText.substring(0, currentIndex + 1);
            currentIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(() => {
        heroTitle.textContent = '';
        currentIndex = 0;
        typeWriter();
    }, 1000);
    
    // Handle form submissions (if contact form is added later)
    const handleFormSubmit = function(e) {
        e.preventDefault();
        // Add form handling logic here
        console.log('Form submitted');
    };
    
    // Add responsive navigation toggle for mobile (if needed)
    const createMobileMenu = function() {
        const nav = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.classList.add('hamburger');
        hamburger.innerHTML = '☰';
        hamburger.style.display = 'none';
        hamburger.style.background = 'none';
        hamburger.style.border = 'none';
        hamburger.style.color = 'white';
        hamburger.style.fontSize = '1.5rem';
        hamburger.style.cursor = 'pointer';
        
        // Insert hamburger before nav menu
        nav.insertBefore(hamburger, navMenu);
        
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Show/hide hamburger based on screen size
        const checkScreenSize = function() {
            if (window.innerWidth <= 768) {
                hamburger.style.display = 'block';
                navMenu.style.display = navMenu.classList.contains('active') ? 'flex' : 'none';
            } else {
                hamburger.style.display = 'none';
                navMenu.style.display = 'flex';
                navMenu.classList.remove('active');
            }
        };
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    };
    
    // Initialize mobile menu
    createMobileMenu();
});
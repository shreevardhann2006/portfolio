// Minimal Custom Cursor
const cursorDot = document.querySelector('[data-cursor-dot]');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    }
});

// Expand cursor on interactive elements
const interactives = document.querySelectorAll('a, button, .btn-primary, .btn-secondary');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorDot) {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(4)';
            cursorDot.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        }
    });
    el.addEventListener('mouseleave', () => {
        if (cursorDot) {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.backgroundColor = 'var(--text-primary)';
        }
    });
});

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

// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
});

// Initialize Typed.js for Hero Section
const typed = new Typed('.typed-text', {
    strings: [
        'Programming',
        'Software Development',
        'AI Tools And Automation',
        'ECE Pre-Final Year Student At MKCE',
        'Developer At <span class="highlight-cracoe">CRACOE</span>.'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
    showCursor: true,
    cursorChar: '|'
});

// Initialize Vanilla-tilt.js for 3D card hover effects
VanillaTilt.init(document.querySelectorAll(".skill-card, .project-card, .contact-box, .hero-image"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.02
});

// Navbar blur effect on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.borderBottom = '1px solid var(--border-color)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.4)';
        navbar.style.borderBottom = '1px solid transparent';
    }
});

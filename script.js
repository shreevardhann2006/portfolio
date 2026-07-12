// 1. Custom Cursor Logic & Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => preloader.remove(), 500);
    }
});

// ---- HERO NAME — Letter Split Animation ----
(function splitHeroName() {
    const nameEl = document.getElementById('hero-name');
    if (!nameEl) return;

    const text = nameEl.textContent;
    nameEl.textContent = '';

    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'letter' + (char === ' ' ? ' space' : '');
        span.textContent = char === ' ' ? '\u00A0' : char;
        // Stagger each letter by 60ms, starting after a 400ms base delay
        span.style.animationDelay = (0.4 + i * 0.06) + 's';
        nameEl.appendChild(span);
    });
})();



// ---- SKILLS TICKER — pure CSS animation, no JS needed ----

// ---- LIGHT TRAILS (Futuristic Neon Streaks) ----
(function initLightTrails() {
    const container = document.getElementById('light-trails');
    if (!container) return;

    function createTrail() {
        const trail = document.createElement('div');
        trail.className = 'light-trail';

        // Random vertical position across the full viewport
        trail.style.top = Math.random() * 100 + 'vh';

        // Speed: between 1.2s and 3.5s
        const duration = (Math.random() * 2.3 + 1.2).toFixed(2);
        trail.style.animationDuration = duration + 's';

        // Small delay spread so they don't all fire at once
        trail.style.animationDelay = (Math.random() * 2).toFixed(2) + 's';

        // Width varies slightly for depth feel
        const width = Math.floor(Math.random() * 120 + 100);
        trail.style.width = width + 'px';

        // ~40% chance of purple variant
        if (Math.random() > 0.6) {
            trail.classList.add('purple');
        }

        container.appendChild(trail);

        // Remove after max possible animation time
        setTimeout(() => trail.remove(), (parseFloat(duration) + 2.5) * 1000);
    }

    // Seed with initial trails
    for (let i = 0; i < 6; i++) createTrail();

    // Keep spawning
    setInterval(createTrail, 700);
})();


const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Add a slight delay for the outline for a smooth effect
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Expand cursor on interactive elements
const interactives = document.querySelectorAll('a, button, .btn-primary, .btn-secondary');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(0, 242, 254, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
    });
});

// 2. Typing Effect for Hero Subtitle
const typed = new Typed('.typed-text', {
    strings: [
        'Programmer',
        'Software Developer',
        'Web Application Developer',
        'AI Tools and Automation',
        'ECE pre-final year student at MKCE',
        'CTO at Cracoe'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    backDelay: 1500
});

// 3. 3D Tilt Effect on Skill Cards
VanillaTilt.init(document.querySelectorAll('.skill-card, .about-content'), {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.2
});


// 4. Add scroll event to navbar for dynamic styling
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled-header');
    } else {
        navbar.classList.remove('scrolled-header');
    }
});

// 5. Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: false,
    offset: 100,
});

// 6. Initialize Particles.js
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 40,
                "density": { "enable": true, "value_area": 800 }
            },
            "color": { "value": "#00f2fe" },
            "shape": { "type": "circle" },
            "opacity": {
                "value": 0.3,
                "random": false
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00f2fe",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
}

document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ---- BENTO FLIP CARDS — mobile tap to flip ----
(function initBentoFlip() {
    // On touch devices, hover doesn't fire — toggle .flipped on tap instead
    const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

    document.querySelectorAll('.bento-card').forEach(card => {
        card.addEventListener('click', () => {
            if (!isTouchDevice()) return; // Desktop: CSS hover handles it
            card.classList.toggle('flipped');
        });

        // Also support keyboard (Enter / Space) for accessibility
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });
    });
})();

// ---- GATEWAY SECTION LOGIC ----
function showGateway() {
    const gateway = document.getElementById('pathway-gateway');
    if (gateway) {
        gateway.classList.remove('hidden');
        document.body.classList.add('gateway-active');
    } else {
        window.location.href = 'index.html';
    }
}

function enterPortfolio(path) {
    const gateway = document.getElementById('pathway-gateway');
    const currentPage = window.location.pathname.split('/').pop();
    
    // If we are already on the target page (or it's local file testing), just hide the overlay
    if ((path === 'recruiter' && (currentPage === 'recruiter.html' || currentPage === '')) || 
        (path === 'visitor' && currentPage === 'visitor.html')) {
        if (gateway) {
            gateway.classList.add('hidden');
            document.body.classList.remove('gateway-active');
        }
    } else {
        window.location.href = path + '.html';
    }
}

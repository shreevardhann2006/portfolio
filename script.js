// 1. Initialize Vanta.js (Network)
document.addEventListener('DOMContentLoaded', () => {
    if (window.VANTA) {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x00f2fe,
            backgroundColor: 0x050505,
            points: 12.00,
            maxDistance: 22.00,
            spacing: 18.00
        });
    }
});

// 2. Custom Cursor Logic
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 300, fill: "forwards" });
});

// Cursor expansion on interactive elements
const interactives = document.querySelectorAll('a, button, .btn-primary, .btn-secondary');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(0, 242, 254, 0.1)';
        cursorOutline.style.mixBlendMode = 'difference'; // Adds a cool premium feel
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.mixBlendMode = 'normal';
    });
});

// 3. Advanced Card Glow Effects (Mouse Tracking)
const cards = document.querySelectorAll('.skill-card, .project-card');
cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// 4. Vanilla Tilt for Cards
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".skill-card, .project-card, .about-content"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.1,
        gyroscope: true
    });
}

// (Removed GSAP Scroll Animations to guarantee 100% text visibility instantly)

// 6. Typing Effect for Hero Subtitle
const subtitleEl = document.querySelector('.hero-subtitle');
if (subtitleEl) {
    const textToType = subtitleEl.textContent.trim();
    subtitleEl.textContent = ''; 
    let index = 0;
    
    function typeText() {
        if (index < textToType.length) {
            subtitleEl.textContent += textToType.charAt(index);
            index++;
            setTimeout(typeText, Math.random() * 20 + 30); 
        }
    }
    setTimeout(typeText, 300);
}

// 7. Navbar Scrolled State
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

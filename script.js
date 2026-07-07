// 1. Initialize Vanta.js Background
document.addEventListener('DOMContentLoaded', () => {
    if (window.VANTA) {
        VANTA.HALO({
            el: "#vanta-canvas",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            baseColor: 0x050505,
            backgroundColor: 0x050505,
            amplitudeFactor: 1.5,
            xOffset: 0.1,
            yOffset: 0.1,
            size: 1.5
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

// 3. Magnetic Hover Elements
const magneticEls = document.querySelectorAll('.magnetic-el');

magneticEls.forEach((el) => {
    el.addEventListener('mousemove', function(e) {
        const position = el.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;

        // Move the element towards the cursor
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        
        // Expand cursor
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(255, 75, 0, 0.1)';
        cursorOutline.style.borderColor = 'rgba(255, 75, 0, 0.5)';
    });

    el.addEventListener('mouseleave', function() {
        // Reset element position
        el.style.transform = `translate(0px, 0px)`;
        
        // Reset cursor
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    });
});

// 4. GSAP Scroll Animations for Bento Grid
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const bentoItems = gsap.utils.toArray('.bento-item');

    // Reveal items sequentially as they enter viewport using .from() so they don't get stuck hidden
    ScrollTrigger.batch(bentoItems, {
        onEnter: batch => {
            gsap.from(batch, {
                opacity: 0, 
                y: 100,
                scale: 0.95,
                stagger: 0.15,
                duration: 0.8,
                ease: "power3.out",
                overwrite: true
            });
        },
        start: "top 85%",
    });
    
    // Parallax effect on hero image
    gsap.to(".profile-avatar-container", {
        yPercent: 30,
        ease: "none",
        ScrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
}

// 5. Typing Effect for Hero Subtitle
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

// 6. Navbar Scrolled State
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(3, 3, 3, 0.9)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.8)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

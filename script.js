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

// Intersection Observer for fade-up animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing once it's visible
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(element => {
    observer.observe(element);
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

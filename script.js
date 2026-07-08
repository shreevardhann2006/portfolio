// 1. Custom Cursor Logic
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

// Expand cursor on interactive elements and Magnetic Button Effect
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
        
        // Reset magnetic effect
        if(el.classList.contains('btn-primary') || el.classList.contains('btn-secondary')) {
            el.style.transform = 'translate(0px, 0px)';
        }
    });

    // Magnetic pull for buttons
    el.addEventListener('mousemove', (e) => {
        if(el.classList.contains('btn-primary') || el.classList.contains('btn-secondary')) {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Pull the button slightly towards the cursor
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        }
    });
});

// 2. Cyber Scramble Effect for Hero Subtitle
const subtitleEl = document.querySelector('.hero-subtitle');
if (subtitleEl) {
    const originalText = subtitleEl.textContent.trim();
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let iteration = 0;
    let interval = null;

    setTimeout(() => {
        interval = setInterval(() => {
            subtitleEl.innerText = originalText.split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return letters[Math.floor(Math.random() * 70)];
                })
                .join("");

            if (iteration >= originalText.length) {
                clearInterval(interval);
            }
            iteration += 1 / 3;
        }, 30);
    }, 500);
}

// 3. 3D Tilt Effect on Cards
// 3. 3D Tilt Effect & Glow Tracking on Cards
const tiltCards = document.querySelectorAll('.skill-card, .project-card, .about-content, .contact');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        
        // Update variables for glow effect in CSS
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate tilt amounts (max 10 degrees)
        const tiltX = ((y - centerY) / centerY) * -10;
        const tiltY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'none'; // Remove transition during hover for instant response
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s ease'; // Add transition back for smooth reset
    });
});


// 4. Add scroll event to navbar for dynamic styling
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'var(--glass-bg)';
        navbar.style.boxShadow = 'none';
    }
});

// 5. Staggered Smooth reveal animation for sections
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a staggered delay based on the index of elements entering simultaneously
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100); 
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
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

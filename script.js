// Mouse Tracker Glow
const mouseGlow = document.getElementById('mouse-glow');

window.addEventListener('mousemove', (e) => {
    if (mouseGlow) {
        mouseGlow.style.left = `${e.clientX}px`;
        mouseGlow.style.top = `${e.clientY}px`;
    }
});

// Staggered Entrance Animations
document.addEventListener("DOMContentLoaded", () => {
    const bentoBoxes = document.querySelectorAll('.bento-reveal');
    
    bentoBoxes.forEach((box, index) => {
        setTimeout(() => {
            box.classList.add('visible');
        }, index * 100); // 100ms stagger between each card
    });

    // Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // lower is slower

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };

        // Delay counter until after card appears
        setTimeout(updateCount, 1000);
    });
});

// 3D Tilt Effect on Bento Boxes
const cards = document.querySelectorAll('.bento-box');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation based on mouse position relative to center
        // Adjust the divisor to change intensity (higher = less tilt)
        const rotateX = ((y - centerY) / centerY) * -5; 
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = `none`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = `transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
    });
});

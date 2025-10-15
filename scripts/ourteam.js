// 1. BLINK EFFECT
document.querySelectorAll("#blink").forEach((anchor) => {
    const dot = document.createElement("div");
    dot.className = "w-1.5 h-1.5 bg-[#769FCD] rounded-full animate-blink mr-1";
  
    const wrapper = document.createElement("div");
    wrapper.className = "flex items-center";
  
    const clonedAnchor = anchor.cloneNode(true);
    wrapper.appendChild(dot);
    wrapper.appendChild(clonedAnchor);
    anchor.replaceWith(wrapper);
  
    dot.style.visibility = "hidden";
  
    wrapper.addEventListener("mouseover", () => {
      dot.style.visibility = "visible";
    });
  
    wrapper.addEventListener("mouseout", () => {
      dot.style.visibility = "hidden";
    });
});

// 2. SCROLL TO TOP BUTTON
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    scrollToTopBtn.style.display = 'none';
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
}

// 3. FEATURE CARDS
const featureCards = document.querySelectorAll('.feature-card');

if (featureCards.length > 0) {
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            featureCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
        
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.width = ripple.style.height = '20px';
            ripple.style.left = e.offsetX - 10 + 'px';
            ripple.style.top = e.offsetY - 10 + 'px';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// 4. COUNTER ANIMATION
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// 5. INTERSECTION OBSERVER FOR STATS
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = document.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                animateCounter(counter);
            });
            observer.disconnect();
        }
    });
}, observerOptions);

// Observe stats sections
const statsSection = document.querySelector('.grid.grid-cols-2');
const statsSection1 = document.querySelector('.bg-gradient-to-r');

if (statsSection) {
    observer.observe(statsSection);
}
if (statsSection1) {
    observer.observe(statsSection1);
}

// 6. RIPPLE ANIMATION CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
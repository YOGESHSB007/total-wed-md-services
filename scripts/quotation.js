// document.querySelectorAll("#blink").forEach((anchor) => {
//     const dot = document.createElement("div");
//     dot.className = "w-1.5 h-1.5 bg-blue-600 rounded-full animate-blink mr-1";
  
//     const wrapper = document.createElement("div");
//     wrapper.className = "flex items-center";
  
//     const clonedAnchor = anchor.cloneNode(true);
//     wrapper.appendChild(dot);
//     wrapper.appendChild(clonedAnchor);
  
//     anchor.replaceWith(wrapper);
  
//     dot.style.visibility = "hidden";
  
//     wrapper.addEventListener("mouseover", () => {
//       dot.style.visibility = "visible";
//     });
  
//     wrapper.addEventListener("mouseout", () => {
//       dot.style.visibility = "hidden";
//     });
// });

// Mobile Menu Toggle
// const clickToOpen = document.getElementById('clickToOpen');
// const hiddensidebar = document.getElementById('hiddensidebar');
// const close = document.getElementById('close');
// const overlay = document.getElementById('overlay');

// clickToOpen.addEventListener('click', () => {
//     hiddensidebar.classList.remove('-translate-x-full');
//     overlay.classList.remove('hidden');
// });

// close.addEventListener('click', () => {
//     hiddensidebar.classList.add('-translate-x-full');
//     overlay.classList.add('hidden');
// });

// overlay.addEventListener('click', () => {
//     hiddensidebar.classList.add('-translate-x-full');
//     overlay.classList.add('hidden');
// });

// // Services Dropdown Toggle (Mobile)
// const servicesToggle = document.getElementById('servicesToggle');
// const servicesDropdown = document.getElementById('servicesDropdown');
// const servicesArrow = document.getElementById('servicesArrow');

// servicesToggle.addEventListener('click', () => {
//     if (servicesDropdown.style.maxHeight) {
//         servicesDropdown.style.maxHeight = null;
//         servicesArrow.style.transform = 'rotate(0deg)';
//     } else {
//         servicesDropdown.style.maxHeight = servicesDropdown.scrollHeight + 'px';
//         servicesArrow.style.transform = 'rotate(180deg)';
//     }
// });

// Scroll to Top Button
// const scrollToTop = document.getElementById('scrollToTop');

// window.addEventListener('scroll', () => {
//     if (window.pageYOffset > 300) {
//         scrollToTop.classList.add('show');
//     } else {
//         scrollToTop.classList.remove('show');
//     }
// });

// scrollToTop.addEventListener('click', () => {
//     window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//     });
// });

// Animated Counter for Statistics
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + (element.parentElement.querySelector('.text-lg').textContent.includes('%') ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions1 = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible-element');
            entry.target.classList.remove('hidden-element');
            
            // Animate counters when they come into view
            if (entry.target.classList.contains('stat-counter')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions1);

// Observe all hidden elements
document.querySelectorAll('.hidden-element').forEach(el => {
    observer1.observe(el);
});

// Observe stat counters
document.querySelectorAll('.stat-counter').forEach(el => {
    observer1.observe(el);
});

// Animate comparison cards on load
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.comparison-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
});

// Feature cards hover animation
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
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

// Animate process timeline steps
const processSteps = document.querySelectorAll('.process-timeline > div');
const processObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 150);
        }
    });
}, {
    threshold: 0.3
});

processSteps.forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transition = 'all 0.6s ease-out';
    if (index % 2 === 0) {
        step.style.transform = 'translateX(-50px)';
    } else {
        step.style.transform = 'translateX(50px)';
    }
    processObserver.observe(step);
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('button, a.bg-gradient-to-r, a.bg-white, a.bg-transparent, a.bg-blue-600');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple animation
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

// Platform logo animation on scroll
const platformLogos = document.querySelectorAll('.platform-logo');
const logoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'float 3s ease-in-out infinite';
        }
    });
}, { threshold: 0.5 });

platformLogos.forEach(logo => {
    logoObserver.observe(logo);
});

// FAQ accordion animation
const faqItems = document.querySelectorAll('.bg-gray-50.rounded-lg');
faqItems.forEach(item => {
    item.addEventListener('click', function() {
        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// Lazy load images with fade-in effect
// const images = document.querySelectorAll('img');
// const imageObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             const img = entry.target;
//             img.style.opacity = '0';
//             img.style.transition = 'opacity 0.5s ease-in';
//             img.onload = () => {
//                 img.style.opacity = '1';
//             };
//             imageObserver.unobserve(img);
//         }
//     });
// });

// images.forEach(img => {
//     imageObserver.observe(img);
// });

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.height = '4px';
progressBar.style.background = 'linear-gradient(90deg, #3b82f6, #1d4ed8)';
progressBar.style.zIndex = '9999';
progressBar.style.transition = 'width 0.1s ease';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
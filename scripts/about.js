document.querySelectorAll("#blink").forEach((anchor) => {
    const dot = document.createElement("div");
    dot.className = "w-1.5 h-1.5 bg-[#769FCD] rounded-full animate-blink mr-1";
  
    const wrapper = document.createElement("div");
    wrapper.className = "flex items-center";
  
    // Clone anchor and add to wrapper
    const clonedAnchor = anchor.cloneNode(true);
    wrapper.appendChild(dot);
    wrapper.appendChild(clonedAnchor);
  
    // Replace original anchor with wrapper
    anchor.replaceWith(wrapper);
  
    // Hide dot initially
    dot.style.visibility = "hidden";
  
    // Show/hide on hover
    wrapper.addEventListener("mouseover", () => {
      dot.style.visibility = "visible";
    });
  
    wrapper.addEventListener("mouseout", () => {
      dot.style.visibility = "hidden";
    });
  });
  
  
  // Observe the stats section
  const statsSection1 = document.querySelector('.bg-gradient-to-r');
  observer.observe(statsSection1);
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
  });
  
  // Scroll to top function
  function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  }
  
  // Initial state
  scrollToTopBtn.style.display = 'none';





// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fadeElements = entry.target.querySelectorAll('.fade-in-up');
            fadeElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                }, index * 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe the section
const section = document.querySelector('section');
if (section) {
    observer.observe(section);
}

// Set initial opacity for fade-in elements
document.querySelectorAll('.fade-in-up').forEach(el => {
    el.style.opacity = '0';
});
// Counter Animation
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current * 10) / 10;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Intersection Observer for animation trigger
const observerOptions1 = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                if (counter.textContent === '0') {
                    animateCounter(counter);
                }
            });
        }
    });
}, observerOptions1);

// Observe the section
const section1 = document.querySelector('section');
observer.observe(section1);
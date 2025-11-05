// Mobile menu toggle
const clickToOpen = document.getElementById('clickToOpen');
const hiddensidebar = document.getElementById('hiddensidebar');
const close = document.getElementById('close');
const overlay = document.getElementById('overlay');

clickToOpen.addEventListener('click', () => {
    hiddensidebar.style.transform = 'translateX(0)';
    overlay.classList.remove('hidden');
});

close.addEventListener('click', () => {
    hiddensidebar.style.transform = 'translateX(-100%)';
    overlay.classList.add('hidden');
});

overlay.addEventListener('click', () => {
    hiddensidebar.style.transform = 'translateX(-100%)';
    overlay.classList.add('hidden');
});

// Services dropdown mobile
const servicesToggle = document.getElementById('servicesToggle');
const servicesDropdown = document.getElementById('servicesDropdown');
const servicesArrow = document.getElementById('servicesArrow');

if (servicesToggle && servicesDropdown && servicesArrow) {
    servicesToggle.addEventListener('click', () => {
        if (servicesDropdown.style.maxHeight && servicesDropdown.style.maxHeight !== '0px') {
            servicesDropdown.style.maxHeight = '0px';
            servicesArrow.style.transform = 'rotate(0deg)';
        } else {
            servicesDropdown.style.maxHeight = servicesDropdown.scrollHeight + 'px';
            servicesArrow.style.transform = 'rotate(180deg)';
        }
    });
}

// Scroll to top functionality
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = "flex";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

if (scrollToTopBtn) {
    scrollToTopBtn.style.display = "none";
}

// Blinking dot effect for anchors
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
  

// Unified Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index || 0);
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0) translateY(0) scale(1)';
            }, index );
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.space-y-4 > div, .grid > div, .energy-card').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.6s ease-out';
    item.dataset.index = index;
    observer.observe(item);
});
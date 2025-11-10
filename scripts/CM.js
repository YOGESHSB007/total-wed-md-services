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
  

// Services dropdown toggle
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

// Scroll to top button
const scrollToTopBtn = document.getElementById("scrollToTop");

if (scrollToTopBtn) {
  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
          scrollToTopBtn.style.display = "flex";
      } else {
          scrollToTopBtn.style.display = "none";
      }
  });
  
  // Initial state
  scrollToTopBtn.style.display = "none";
}

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: "smooth",
  });
}

// UNIFIED INTERSECTION OBSERVER - SINGLE DECLARATION
// This single observer handles all scroll animations throughout the page
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index || 0);
          const animationType = entry.target.dataset.animation || 'default';
          
          setTimeout(() => {
              entry.target.style.opacity = '1';
              
              // Apply different transform based on animation type
              switch(animationType) {
                  case 'slideRight':
                      entry.target.style.transform = 'translateX(0)';
                      break;
                  case 'slideUp':
                      entry.target.style.transform = 'translateY(0)';
                      break;
                  case 'scale':
                      entry.target.style.transform = 'scale(1)';
                      break;
                  default:
                      entry.target.style.transform = 'translateX(0) translateY(0) scale(1)';
              }
          }, index );
          observer.unobserve(entry.target);
      }
  });
}, observerOptions);

// Observe stats section if it exists
const statsSection = document.querySelector('.bg-gradient-to-r');
if (statsSection) {
  statsSection.style.opacity = '0';
  statsSection.style.transform = 'translateY(20px)';
  statsSection.style.transition = 'all 0.6s ease-out';
  statsSection.dataset.index = '0';
  statsSection.dataset.animation = 'slideUp';
  observer.observe(statsSection);
}

// Observe challenge items (slide from right)
document.querySelectorAll('.space-y-4 > div').forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(50px)';
  item.style.transition = 'all 0.6s ease-out';
  item.dataset.index = index;
  item.dataset.animation = 'slideRight';
  observer.observe(item);
});

// Observe FAQ items (slide from bottom)
const faqItems = document.querySelectorAll('.grid > div');
if (faqItems.length > 0) {
  faqItems.forEach((item, index) => {
      // Only observe if not already styled (avoid conflicts with risk cards)
      if (!item.classList.contains('border-2')) {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          item.style.transition = 'all 0.6s ease-out';
          item.dataset.index = index;
          item.dataset.animation = 'slideUp';
          observer.observe(item);
          
          // Add click interaction for FAQ items
          item.addEventListener('click', function() {
              this.style.transform = 'scale(0.98)';
              setTimeout(() => {
                  this.style.transform = 'scale(1)';
              }, 150);
          });
      }
  });
}

// Observe all risk and solution cards (border-2 class)
document.querySelectorAll('.border-2').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease-out';
  card.dataset.index = index;
  card.dataset.animation = 'slideUp';
  observer.observe(card);
});

// Add hover effect for risk/solution cards
document.querySelectorAll('.border-2').forEach((card) => {
  card.addEventListener('mouseenter', function() {
      // Store original transform for proper animation
      if (!this.dataset.originalTransform) {
          this.dataset.originalTransform = window.getComputedStyle(this).transform;
      }
      this.style.transform = 'translateY(-5px)';
      this.style.borderColor = '#3b82f6';
  });
  
  card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.borderColor = 'white';
  });
});


// Show/hide button based on scroll position
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.display = "flex";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Initial state
if (scrollToTopBtn) {
  scrollToTopBtn.style.display = "none";
}


function activateTab(tabNumber) {
  // Remove active class from all tabs and panels
  for (let i = 1; i <= 5; i++) {
      const tab = document.getElementById(`tab-${i}`);
      const panel = document.getElementById(`panel-${i}`);
      const pulseBorder = panel.querySelector('.pulse-border');
      
      tab.classList.remove('active');
      panel.classList.remove('active');
      pulseBorder.classList.remove('active');
  }

  // Add active class to selected tab and panel
  const activeTab = document.getElementById(`tab-${tabNumber}`);
  const activePanel = document.getElementById(`panel-${tabNumber}`);
  const activePulseBorder = activePanel.querySelector('.pulse-border');
  
  activeTab.classList.add('active');
  activePanel.classList.add('active');
  activePulseBorder.classList.add('active');

  // Smooth scroll to active panel
  setTimeout(() => {
      activePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);

  // Re-trigger animations
  const animations = activePanel.querySelectorAll('.animate-scale-up, .animate-fade-in');
  animations.forEach(el => {
      el.style.animation = 'none';
      setTimeout(() => {
          el.style.animation = '';
      }, 10);
  });
}

// Auto-cycle through tabs (optional - remove if not needed)
let currentTab = 1;
setInterval(() => {
  currentTab = (currentTab % 5) + 1;
  // Uncomment the line below to enable auto-cycling
  // activateTab(currentTab);
}, 5000);

// Initialize first tab on load
document.addEventListener('DOMContentLoaded', () => {
  activateTab(1);
});

// Log initialization for debugging
console.log('All animations initialized successfully');
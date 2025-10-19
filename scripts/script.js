// Sidebar Toggle
const clickToOpen = document.getElementById('clickToOpen');
const hiddensidebar = document.getElementById('hiddensidebar');
const closeBtn = document.getElementById('close');
const overlay = document.getElementById('overlay');

// Open sidebar
clickToOpen.addEventListener('click', () => {
    hiddensidebar.classList.remove('-translate-x-full');
    hiddensidebar.classList.add('translate-x-0');
    overlay.classList.remove('hidden');
});

// Close sidebar
function closeSidebar() {
    hiddensidebar.classList.add('-translate-x-full');
    hiddensidebar.classList.remove('translate-x-0');
    overlay.classList.add('hidden');
}

closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

const servicesToggle = document.getElementById('servicesToggle');
const servicesDropdown = document.getElementById('servicesDropdown');
const servicesArrow = document.getElementById('servicesArrow');

servicesToggle.addEventListener('click', () => {
    if (servicesDropdown.style.maxHeight && servicesDropdown.style.maxHeight !== '0px') {
        servicesDropdown.style.maxHeight = '0px';
        servicesArrow.style.transform = 'rotate(0deg)';
    } else {
        servicesDropdown.style.maxHeight = servicesDropdown.scrollHeight + 'px';
        servicesArrow.style.transform = 'rotate(180deg)';
    }
});

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

// ============ OPTIMIZED VIDEO SLIDER ============
let currentSlide = 0;
let interval;
const slides = document.querySelectorAll(".video-slide");
const indicators = document.querySelectorAll(".indicator");
const totalSlides = slides.length;
let isFirstVideoLoaded = false;

// Add preload attribute to all videos programmatically
slides.forEach((video, index) => {
  video.setAttribute('preload', 'auto');
  
  // Remove autoplay from non-active videos
  if (index !== 0) {
    video.removeAttribute('autoplay');
  }
  
  // Handle video loading
  video.addEventListener('loadeddata', function() {
    console.log(`Video ${index + 1} loaded`);
    
    // Start playing the first video once it's loaded
    if (index === 0 && !isFirstVideoLoaded) {
      isFirstVideoLoaded = true;
      this.play().catch(err => console.log('Autoplay prevented:', err));
      startAutoSlide();
    }
  });
  
  // Preload next video when current is playing
  video.addEventListener('playing', function() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    slides[nextIndex].load();
  });
});

function showSlide(index) {
  // Pause all videos and remove active class
  slides.forEach((slide) => {
    slide.classList.remove("active");
    slide.pause();
  });
  
  indicators.forEach((indicator) => indicator.classList.remove("active"));

  // Activate current slide
  slides[index].classList.add("active");
  indicators[index].classList.add("active");

  // Play current video with error handling
  slides[index].play().catch(err => {
    console.log('Video play error:', err);
  });
  
  // Trigger overlay content animations
  triggerOverlayAnimations();
}

function triggerOverlayAnimations() {
  const h1 = document.querySelector('.relative.z-10 h1');
  const p = document.querySelector('.relative.z-10 p');
  const button = document.querySelector('.relative.z-10 button');
  
  // Remove and re-add classes for h1
  if (h1) {
    h1.classList.remove('slide-in-left');
    void h1.offsetWidth; // Force reflow
    h1.classList.add('slide-in-left');
  }
  
  // Remove and re-add classes for p
  if (p) {
    p.classList.remove('slide-in-left');
    void p.offsetWidth; // Force reflow
    p.classList.add('slide-in-left');
  }
  
  // Remove and re-add classes for button
  if (button) {
    button.classList.remove('fade-in-up');
    void button.offsetWidth; // Force reflow
    button.classList.add('fade-in-up');
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

function startAutoSlide() {
  interval = setInterval(nextSlide, 6000);
}

function resetAutoSlide() {
  clearInterval(interval);
  startAutoSlide();
}

// Wait for first video to load before starting auto-slide
// (startAutoSlide is now called in the loadeddata event listener above)

document.getElementById("right-arrow").addEventListener("click", function () {
  nextSlide();
  resetAutoSlide();
});

document.getElementById("left-arrow").addEventListener("click", function () {
  prevSlide();
  resetAutoSlide();
});

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", function () {
    currentSlide = index;
    showSlide(currentSlide);
    resetAutoSlide();
  });
});

// Pause on hover
const videoContainer = document.querySelector(".relative.h-screen");
if (videoContainer) {
  videoContainer.addEventListener("mouseenter", () => clearInterval(interval));
  videoContainer.addEventListener("mouseleave", () => {
    if (isFirstVideoLoaded) startAutoSlide();
  });
}

// Counter Animation Function
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Intersection Observer for triggering animation when section is visible
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll(".counter");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
        animateCounter(counter, target);
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe the stats section
const statsSection = document.querySelector(".bg-gradient-to-r");
if (statsSection) {
  observer.observe(statsSection);
}

const scrollToTopBtn = document.getElementById("scrollToTop");

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

const observerOptions1 = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const observer1 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      // Unobserve after animation to prevent re-triggering
      observer1.unobserve(entry.target);
    }
  });
}, observerOptions1);

// Observe all animated elements - only animate on scroll
document.querySelectorAll(".fade-in, .slide-in, .text-item, .card-fade-in, .speech-bubble, .image-float").forEach((element) => {
  observer1.observe(element);
});

const logoScroll = document.querySelector(".logo-scroll");

if (logoScroll) {
  logoScroll.addEventListener("mouseenter", () => {
    logoScroll.style.animationPlayState = "paused";
  });

  logoScroll.addEventListener("mouseleave", () => {
    logoScroll.style.animationPlayState = "running";
  });
}

// Observe sections for scroll-triggered animations
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add staggered animation to child elements
      const children = entry.target.querySelectorAll('.fade-in, .slide-in, .text-item, .card-fade-in, .speech-bubble, .image-float');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add('animate-in');
        }, index * 100); // Stagger by 100ms
      });
      sectionObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

// Observe all sections that should animate on scroll
const animatedSections = document.querySelectorAll('section');
animatedSections.forEach(section => {
  sectionObserver.observe(section);
});

// Also observe individual elements not in sections
document.querySelectorAll('.fade-in, .slide-in, .text-item, .card-fade-in, .speech-bubble, .image-float').forEach((element) => {
  // Check if element is not already being observed via a section
  if (!element.closest('section')) {
    observer1.observe(element);
  }
});

const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach((card) => {
  const serviceNum = card.getAttribute("data-service");
  const bgElement = card.querySelector(".service-bg");

  card.addEventListener("mouseenter", function () {
    bgElement.classList.remove(`service-${serviceNum}-default`);
    bgElement.classList.add(`service-${serviceNum}-hover`);
  });

  card.addEventListener("mouseleave", function () {
    bgElement.classList.remove(`service-${serviceNum}-hover`);
    bgElement.classList.add(`service-${serviceNum}-default`);
  });
});

// Form submission handler
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      firstName: document.getElementById("firstName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
      services: document.getElementById("services").value,
      message:
        document.getElementById("message").value ||
        document.getElementById("messageFull").value,
    };

    console.log("Form submitted:", formData);
    alert("Thank you for contacting us! We will get back to you soon.");
    this.reset();
  });
}

// Sync message fields
const messageShort = document.getElementById("message");
const messageFull = document.getElementById("messageFull");

if (messageShort && messageFull) {
  messageShort.addEventListener("input", function () {
    messageFull.value = this.value;
  });

  messageFull.addEventListener("input", function () {
    messageShort.value = this.value;
  });
}
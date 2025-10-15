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

let currentSlide = 0;
let interval;
const slides = document.querySelectorAll(".video-slide");
const indicators = document.querySelectorAll(".indicator");
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  indicators.forEach((indicator) => indicator.classList.remove("active"));

  slides[index].classList.add("active");
  indicators[index].classList.add("active");

  slides[index].play();
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

startAutoSlide();

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

// Pause on hover (optional)
const videoContainer = document.querySelector(".relative.h-screen");
videoContainer.addEventListener("mouseenter", () => clearInterval(interval));
videoContainer.addEventListener("mouseleave", startAutoSlide);

// Counter Animation Function
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60 FPS
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
observer.observe(statsSection);
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
scrollToTopBtn.style.display = "none";

const observerOptions1 = {
  threshold: 0.2,
  rootMargin: "0px",
};

const observer1 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions1);

// Observe all animated elements
document.querySelectorAll(".fade-in, .slide-in").forEach((element) => {
  element.style.opacity = "0";
  observer1.observe(element);
});

const logoScroll = document.querySelector(".logo-scroll");
const logoItems = document.querySelectorAll(".logo-item");

logoScroll.addEventListener("mouseenter", () => {
  logoScroll.style.animationPlayState = "paused";
});

logoScroll.addEventListener("mouseleave", () => {
  logoScroll.style.animationPlayState = "running";
});

const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach((card) => {
  const serviceNum = card.getAttribute("data-service");
  const bgElement = card.querySelector(".service-bg");

  // Mouse enter - change to hover background
  card.addEventListener("mouseenter", function () {
    bgElement.classList.remove(`service-${serviceNum}-default`);
    bgElement.classList.add(`service-${serviceNum}-hover`);
  });

  // Mouse leave - change back to default background
  card.addEventListener("mouseleave", function () {
    bgElement.classList.remove(`service-${serviceNum}-hover`);
    bgElement.classList.add(`service-${serviceNum}-default`);
  });
});

// contact

// Form submission handler
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
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

  // Log form data (in production, send to server)
  console.log("Form submitted:", formData);

  // Show success message
  alert("Thank you for contacting us! We will get back to you soon.");

  // Reset form
  this.reset();
});

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

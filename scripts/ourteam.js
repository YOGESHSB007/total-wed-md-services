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

// 2. SERVICES TOGGLE (guarded)
const servicesToggle = document.getElementById("servicesToggle");
const servicesDropdown = document.getElementById("servicesDropdown");
const servicesArrow = document.getElementById("servicesArrow");

if (servicesToggle && servicesDropdown && servicesArrow) {
  // ensure a transitionable initial state
  servicesDropdown.style.overflow = "hidden";
  servicesDropdown.style.maxHeight = servicesDropdown.style.maxHeight || "0px";
  servicesToggle.addEventListener("click", () => {
    const current = servicesDropdown.style.maxHeight;
    if (current && current !== "0px") {
      servicesDropdown.style.maxHeight = "0px";
      servicesArrow.style.transform = "rotate(0deg)";
    } else {
      // set to scrollHeight to expand
      servicesDropdown.style.maxHeight = servicesDropdown.scrollHeight + "px";
      servicesArrow.style.transform = "rotate(180deg)";
    }
  });
}

// 3. SCROLL TO TOP BUTTON (safe)
const scrollToTopBtn = document.getElementById("scrollToTop");

if (scrollToTopBtn) {
  // initial state hidden (use flex in CSS when visible)
  scrollToTopBtn.style.display = "none";

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.display = "flex";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  // attach click handler
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 4. FEATURE CARDS (hover + ripple)
const featureCards = document.querySelectorAll(".feature-card");
if (featureCards.length > 0) {
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      featureCards.forEach((c) => c.classList.remove("active"));
      this.classList.add("active");
    });

    card.addEventListener("click", function (e) {
      // safe coordinates: if offsetX/Y undefined fallback to client coords
      const rect = this.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const ripple = document.createElement("div");
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255, 255, 255, 0.3)";
      ripple.style.width = ripple.style.height = "20px";
      ripple.style.left = offsetX - 10 + "px";
      ripple.style.top = offsetY - 10 + "px";
      ripple.style.animation = "ripple 0.6s ease-out";
      ripple.style.pointerEvents = "none";

      this.style.position = this.style.position || "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// 5. COUNTER ANIMATION (uses requestAnimationFrame for smooth timing)
function animateCounter(element, duration = 2000) {
  const targetRaw = element.getAttribute("data-count");
  if (!targetRaw) return;
  const target = parseInt(targetRaw, 10);
  if (isNaN(target)) return;

  const start = performance.now();
  function frame(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * target);
    // Add a plus sign only when completed (consistent with original intent)
    element.textContent = progress === 1 ? `${target}+` : value;
    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }
  requestAnimationFrame(frame);
}

// 6. INTERSECTION OBSERVER FOR STATS
// Select any element that should trigger the counters — be flexible: match data-stat-section or fallback selectors
const statSections =
  Array.from(document.querySelectorAll("[data-stat-section]")).length > 0
    ? Array.from(document.querySelectorAll("[data-stat-section]"))
    : Array.from(
        document.querySelectorAll(".grid.grid-cols-2, .bg-gradient-to-r")
      );

if (statSections.length > 0) {
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -20% 0px", // trigger a bit earlier when scrolled into view
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // find counters that are inside this section (or anywhere in document)
        const counters = entry.target.querySelectorAll("[data-count]");
        // if none inside target, try global query (useful if counters live elsewhere)
        const toAnimate = counters.length
          ? counters
          : document.querySelectorAll("[data-count]");
        toAnimate.forEach((counter) => {
          // avoid animating the same counter multiple times
          if (!counter._animated) {
            counter._animated = true;
            animateCounter(counter, 2000);
          }
        });
        // if you want to keep observing other sections, don't disconnect globally
        // obs.unobserve(entry.target); // uncomment if each section should trigger only once
      }
    });
  }, observerOptions);

  statSections.forEach((sec) => observer.observe(sec));
}

// 7. RIPPLE CSS (inject once)
if (!document.getElementById("ripple-keyframes-style")) {
  const style = document.createElement("style");
  style.id = "ripple-keyframes-style";
  style.textContent = `
      @keyframes ripple {
          to {
              transform: scale(4);
              opacity: 0;
          }
      }
    `;
  document.head.appendChild(style);
}

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

  
  
  // Observe the stats section
  const statsSection1 = document.querySelector('.bg-gradient-to-r');
  observer.observe(statsSection1);




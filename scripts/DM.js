 // Mobile Menu Toggle
 const clickToOpen = document.getElementById('clickToOpen');
 const hiddensidebar = document.getElementById('hiddensidebar');
 const close = document.getElementById('close');
 const overlay = document.getElementById('overlay');

 clickToOpen.addEventListener('click', () => {
     hiddensidebar.classList.remove('-translate-x-full');
     overlay.classList.remove('hidden');
 });

 close.addEventListener('click', () => {
     hiddensidebar.classList.add('-translate-x-full');
     overlay.classList.add('hidden');
 });

 overlay.addEventListener('click', () => {
     hiddensidebar.classList.add('-translate-x-full');
     overlay.classList.add('hidden');
 });

 // Mobile Services Dropdown
 const servicesToggle = document.getElementById('servicesToggle');
 const servicesDropdown = document.getElementById('servicesDropdown');
 const servicesArrow = document.getElementById('servicesArrow');

 servicesToggle.addEventListener('click', () => {
     if (servicesDropdown.style.maxHeight) {
         servicesDropdown.style.maxHeight = null;
         servicesArrow.classList.remove('rotate-180');
     } else {
         servicesDropdown.style.maxHeight = servicesDropdown.scrollHeight + 'px';
         servicesArrow.classList.add('rotate-180');
     }
 });

 // Scroll to Top
 const scrollToTopBtn = document.getElementById("scrollToTop");

 // Show/hide button based on scroll position
 window.addEventListener("scroll", () => {
   if (window.pageYOffset > 300) {
     scrollToTopBtn.style.display = "flex";
   } else {
     scrollToTopBtn.style.display = "none";
   }
 });
 

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

 // Smooth scroll for anchor links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
         e.preventDefault();
         const target = document.querySelector(this.getAttribute('href'));
         if (target) {
             target.scrollIntoView({
                 behavior: 'smooth'
             });
         }
     });
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
  
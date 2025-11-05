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
 const scrollToTopBtn = document.getElementById('scrollToTop');

 window.addEventListener('scroll', () => {
     if (window.pageYOffset > 300) {
         scrollToTopBtn.classList.add('show');
     } else {
         scrollToTopBtn.classList.remove('show');
     }
 });

 scrollToTopBtn.addEventListener('click', () => {
     window.scrollTo({
         top: 0,
         behavior: 'smooth'
     });
 });

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
  
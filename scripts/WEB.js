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

 // Services Dropdown Toggle (Mobile)
 const servicesToggle = document.getElementById('servicesToggle');
 const servicesDropdown = document.getElementById('servicesDropdown');
 const servicesArrow = document.getElementById('servicesArrow');

 servicesToggle.addEventListener('click', () => {
     if (servicesDropdown.style.maxHeight) {
         servicesDropdown.style.maxHeight = null;
         servicesArrow.style.transform = 'rotate(0deg)';
     } else {
         servicesDropdown.style.maxHeight = servicesDropdown.scrollHeight + 'px';
         servicesArrow.style.transform = 'rotate(180deg)';
     }
 });

 // Scroll to Top Button
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

 // Animate elements on scroll
 const observerOptions = {
     threshold: 0.1,
     rootMargin: '0px 0px -50px 0px'
 };

 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('animate-slide-in');
         }
     });
 }, observerOptions);

 document.querySelectorAll('.tech-card, .project-card').forEach(el => {
     observer.observe(el);
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
  

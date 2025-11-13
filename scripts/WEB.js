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
  
// Intersection Observer for scroll animations
const observerOptions1 = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions1);

// Observe all process steps
document.querySelectorAll('.process-step').forEach((step, index) => {
    step.style.animationDelay = `${index * 0.2}s`;
    observer1.observe(step);
});

// Add hover effect to reveal check items
document.querySelectorAll('.step-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const checkItems = card.querySelectorAll('.check-item');
        checkItems.forEach((item, index) => {
            item.style.animation = `slideInLeft 0.4s ease-out ${index * 0.1}s forwards`;
        });
    });
});

// Add click interaction for mobile
document.querySelectorAll('.step-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});
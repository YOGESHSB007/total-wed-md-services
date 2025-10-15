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
  
  
  // Observe the stats section
  const statsSection1 = document.querySelector('.bg-gradient-to-r');
  observer.observe(statsSection1);
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
  });
  
  // Scroll to top function
  function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  }
  
  // Initial state
  scrollToTopBtn.style.display = 'none';






// Parallax effect for background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.absolute.inset-0.bg-cover');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe animated elements
document.querySelectorAll('.fade-in-left, .fade-in-up').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});


 // Apply Now button functionality
 document.querySelectorAll('.job-card button').forEach((button, index) => {
    button.addEventListener('click', function() {
        const jobCard = this.closest('.job-card');
        const jobTitle = jobCard.querySelector('h3').textContent;
        
        // Create a simple notification
        showNotification(`Application process started for: ${jobTitle}`);
        
        // In a real application, this would open a form or redirect to an application page
    });
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl z-50 transform transition-all duration-300';
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Intersection Observer for scroll animations
const observerOptions1 = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions1);

// Observe all job cards
document.querySelectorAll('.fade-in-up').forEach(el => {
    el.style.opacity = '0';
    observer1.observe(el);
});
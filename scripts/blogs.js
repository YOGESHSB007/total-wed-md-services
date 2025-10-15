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












// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        
        // Update active button
        filterBtns.forEach(b => {
            b.classList.remove('bg-blue-600', 'text-white');
            b.classList.add('bg-gray-200', 'text-gray-700');
        });
        this.classList.remove('bg-gray-200', 'text-gray-700');
        this.classList.add('bg-blue-600', 'text-white');

        // Filter cards
        blogCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Search functionality
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    blogCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Parallax effect on hero image
window.addEventListener('scroll', function() {
    const heroImage = document.getElementById('heroImage');
    const scrolled = window.pageYOffset;
    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Smooth scroll for scroll indicator
document.querySelector('.scroll-indicator').addEventListener('click', function() {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});
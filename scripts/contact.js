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
  // const statsSection1 = document.querySelector('.bg-gradient-to-r');
  // observer.observe(statsSection1);



  // Contact Form Handling with EmailJS
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) {
      console.warn('Contact form not found on this page');
      return;
  }

  // Form input animations
  const formInputs = contactForm.querySelectorAll('.form-input');
  formInputs.forEach(input => {
      input.addEventListener('focus', function() {
          this.parentElement.classList.add('focused');
      });

      input.addEventListener('blur', function() {
          if (this.value === '') {
              this.parentElement.classList.remove('focused');
          }
      });
  });

  // Sync the two message fields (mobile and desktop)
  const messageField = document.getElementById('message');
  const messageFullField = document.getElementById('messageFull');

  if (messageField && messageFullField) {
      messageField.addEventListener('input', function() {
          messageFullField.value = this.value;
      });

      messageFullField.addEventListener('input', function() {
          messageField.value = this.value;
      });
  }

  // Form submission handler
  contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      console.log('Contact form submission started...');
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalButtonHTML = submitBtn.innerHTML;

      // Disable button and show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
      submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

      // Get form values
      const firstName = contactForm.querySelector('#firstName').value;
      const email = contactForm.querySelector('#email').value;
      const phone = contactForm.querySelector('#phone').value;
      const address = contactForm.querySelector('#address').value || 'Not provided';
      const services = contactForm.querySelector('#services').value;
      const message = contactForm.querySelector('#messageFull').value || contactForm.querySelector('#message').value || 'No message provided';

      // Prepare template parameters for EmailJS
      const templateParams = {
          to_email: 'totalwebmdservices@gmail.com', // Your receiving email
          from_name: firstName,
          from_email: email,
          phone: phone,
          address: address,
          service_selected: services,
          message: message,
          submission_date: new Date().toLocaleString('en-IN', { 
              timeZone: 'Asia/Kolkata',
              dateStyle: 'full',
              timeStyle: 'short'
          })
      };

      console.log('Contact Form Template Parameters:', templateParams);

      try {
          // Check if EmailJS is initialized
          if (typeof emailjs === 'undefined') {
              throw new Error('EmailJS is not loaded. Please refresh the page and try again.');
          }

          // Send email using EmailJS
          const response = await emailjs.send(
              'service_q9c7jch',  // Your Service ID
              'template_88mm8g7', // Create a new template ID for contact form in EmailJS dashboard
              templateParams
          );

          console.log('✅ Contact form submitted successfully!', response.status, response.text);

          // Show success message
          showSuccessMessage(contactForm);

          // Reset form after delay
          setTimeout(() => {
              contactForm.reset();
              hideSuccessMessage();
              
              // Reset button
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalButtonHTML;
              submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
          }, 3000);

      } catch (error) {
          console.error('❌ Contact form submission failed:', error);
          
          // Show error message
          showErrorMessage(error, contactForm);
          
          // Reset button
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalButtonHTML;
          submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      }
  });

  // Success message display function
  function showSuccessMessage(form) {
      // Remove any existing messages
      const existingMessage = form.querySelector('.success-notification');
      if (existingMessage) {
          existingMessage.remove();
      }

      const successDiv = document.createElement('div');
      successDiv.className = 'success-notification bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6 animate-fade-in';
      successDiv.innerHTML = `
          <div class="flex items-center">
              <i class="fas fa-check-circle text-green-500 text-3xl mr-4"></i>
              <div>
                  <h3 class="text-xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
                  <p class="text-green-700">Thank you for contacting us. We'll get back to you soon.</p>
              </div>
          </div>
      `;
      
      form.insertBefore(successDiv, form.firstChild);
      successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Error message display function
  function showErrorMessage(error, form) {
      // Remove any existing messages
      const existingMessage = form.querySelector('.error-notification');
      if (existingMessage) {
          existingMessage.remove();
      }

      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-notification bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6 animate-fade-in';
      
      let errorMessage = 'Unable to send message. ';
      
      if (error.text) {
          errorMessage += `Error: ${error.text}. `;
      } else if (error.message) {
          errorMessage += error.message;
      }
      
      errorMessage += ' Please try again or contact us directly at totalwebmdservices@gmail.com';

      errorDiv.innerHTML = `
          <div class="flex items-center">
              <i class="fas fa-exclamation-circle text-red-500 text-3xl mr-4"></i>
              <div>
                  <h3 class="text-xl font-bold text-red-800 mb-2">Submission Failed</h3>
                  <p class="text-red-700">${errorMessage}</p>
                  <div class="mt-3 text-sm text-red-600">
                      <p>Please check:</p>
                      <ul class="list-disc list-inside mt-1">
                          <li>Your internet connection</li>
                          <li>All required fields are filled correctly</li>
                          <li>Email format is valid</li>
                      </ul>
                  </div>
              </div>
          </div>
      `;
      
      form.insertBefore(errorDiv, form.firstChild);
      errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Auto-hide error message after 8 seconds
      setTimeout(() => {
          errorDiv.style.opacity = '0';
          errorDiv.style.transition = 'opacity 0.5s ease-out';
          setTimeout(() => errorDiv.remove(), 500);
      }, 8000);
  }

  // Hide success message function
  function hideSuccessMessage() {
      const successDiv = contactForm.querySelector('.success-notification');
      if (successDiv) {
          successDiv.style.opacity = '0';
          successDiv.style.transition = 'opacity 0.5s ease-out';
          setTimeout(() => successDiv.remove(), 500);
      }
  }

  // Phone number validation (Indian format)
  const phoneInput = contactForm.querySelector('#phone');
  if (phoneInput) {
      phoneInput.addEventListener('input', function(e) {
          let value = e.target.value.replace(/\D/g, '');
          if (value.length > 10) {
              value = value.slice(0, 10);
          }
          e.target.value = value;
      });

      phoneInput.addEventListener('blur', function(e) {
          const value = e.target.value;
          if (value.length > 0 && value.length !== 10) {
              e.target.setCustomValidity('Please enter a valid 10-digit phone number');
              e.target.reportValidity();
          } else {
              e.target.setCustomValidity('');
          }
      });
  }

  // Email validation enhancement
  const emailInput = contactForm.querySelector('#email');
  if (emailInput) {
      emailInput.addEventListener('blur', function(e) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (e.target.value && !emailRegex.test(e.target.value)) {
              e.target.setCustomValidity('Please enter a valid email address');
              e.target.reportValidity();
          } else {
              e.target.setCustomValidity('');
          }
      });
  }

  console.log('✅ Contact form script loaded successfully');
});


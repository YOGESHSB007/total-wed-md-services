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
 const scrollToTop = document.getElementById('scrollToTop');

 window.addEventListener('scroll', () => {
     if (window.pageYOffset > 300) {
         scrollToTop.classList.add('show');
     } else {
         scrollToTop.classList.remove('show');
     }
 });

 scrollToTop.addEventListener('click', () => {
     window.scrollTo({
         top: 0,
         behavior: 'smooth'
     });
 });

 // Form Progress Tracker
 const form = document.getElementById('applicationForm');
 const progressBar = document.getElementById('progressBar');
 const progressText = document.getElementById('progressText');
 const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
 const totalFields = inputs.length;

 function updateProgress() {
     let filledFields = 0;
     inputs.forEach(input => {
         if (input.type === 'checkbox') {
             if (input.checked) filledFields++;
         } else if (input.type === 'file') {
             if (input.files.length > 0) filledFields++;
         } else if (input.value.trim() !== '') {
             filledFields++;
         }
     });

     const progress = Math.round((filledFields / totalFields) * 100);
     progressBar.style.width = progress + '%';
     progressText.textContent = progress + '% Complete';
 }

 inputs.forEach(input => {
     input.addEventListener('change', updateProgress);
     input.addEventListener('input', updateProgress);
 });

 // File Upload Handlers
 const resumeUpload = document.getElementById('resumeUpload');
 const resumeLabel = document.getElementById('resumeLabel');
 const resumeFileName = document.getElementById('resumeFileName');
 const coverLetterUpload = document.getElementById('coverLetterUpload');
 const coverLetterLabel = document.getElementById('coverLetterLabel');
 const coverLetterFileName = document.getElementById('coverLetterFileName');

 function handleFileUpload(input, label, fileNameDiv) {
     input.addEventListener('change', function(e) {
         const file = e.target.files[0];
         if (file) {
             // Validate file size (5MB)
             if (file.size > 5 * 1024 * 1024) {
                 alert('File size must be less than 5MB');
                 input.value = '';
                 return;
             }

             // Validate file type
             const validTypes = ['.pdf', '.doc', '.docx'];
             const fileExt = '.' + file.name.split('.').pop().toLowerCase();
             if (!validTypes.includes(fileExt)) {
                 alert('Please upload PDF, DOC, or DOCX files only');
                 input.value = '';
                 return;
             }

             label.classList.add('has-file');
             fileNameDiv.innerHTML = `
                 <div class="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200">
                     <div class="flex items-center space-x-2">
                         <i class="fas fa-file-check text-green-600"></i>
                         <span class="text-green-800 font-medium">${file.name}</span>
                         <span class="text-green-600 text-xs">(${(file.size / 1024).toFixed(2)} KB)</span>
                     </div>
                     <button type="button" onclick="clearFile('${input.id}')" class="text-red-500 hover:text-red-700">
                         <i class="fas fa-times"></i>
                     </button>
                 </div>
             `;
             updateProgress();
         }
     });
 }

 handleFileUpload(resumeUpload, resumeLabel, resumeFileName);
 handleFileUpload(coverLetterUpload, coverLetterLabel, coverLetterFileName);

 // Clear file function
 window.clearFile = function(inputId) {
     const input = document.getElementById(inputId);
     input.value = '';
     
     if (inputId === 'resumeUpload') {
         resumeLabel.classList.remove('has-file');
         resumeFileName.innerHTML = '';
     } else {
         coverLetterLabel.classList.remove('has-file');
         coverLetterFileName.innerHTML = '';
     }
     updateProgress();
 };

 // Drag and drop functionality
 [resumeLabel, coverLetterLabel].forEach(label => {
     label.addEventListener('dragover', (e) => {
         e.preventDefault();
         label.style.borderColor = '#557CFA';
         label.style.backgroundColor = '#f7fafc';
     });

     label.addEventListener('dragleave', () => {
         label.style.borderColor = '#cbd5e0';
         label.style.backgroundColor = '';
     });

     label.addEventListener('drop', (e) => {
         e.preventDefault();
         label.style.borderColor = '#cbd5e0';
         label.style.backgroundColor = '';
         
         const input = label.previousElementSibling;
         input.files = e.dataTransfer.files;
         input.dispatchEvent(new Event('change'));
     });
 });

 // Form Submission



 // Form Submission with detailed error logging
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    console.log('Form submission started...');
    
    const submitBtn = document.getElementById('submitBtn');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const successMessage = document.getElementById('successMessage');

    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Submitting...</span> <i class="fas fa-spinner fa-spin"></i>';
    loadingIndicator.classList.remove('hidden');
    form.style.opacity = '0.5';

    // Get file info
    const resumeFile = document.getElementById('resumeUpload').files[0];
    const coverLetterFile = document.getElementById('coverLetterUpload').files[0];
    
    // Prepare template parameters - MUST match your EmailJS template variables
    const templateParams = {
        to_email: 'shivanandhb03@gmail.com', // Replace with your actual email
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        phone: form.phone.value,
        address: form.address.value,
        city: form.city.value,
        state: form.state.value,
        pincode: form.pincode.value,
        dob: form.dob.value,
        totalExperience: form.totalExperience.value,
        qualification: form.qualification.value,
        currentCompany: form.currentCompany.value || 'N/A',
        currentDesignation: form.currentDesignation.value || 'N/A',
        skills: form.skills.value,
        workSummary: form.workSummary.value || 'N/A',
        linkedin: form.linkedin.value || 'N/A',
        portfolio: form.portfolio.value || 'N/A',
        source: form.source.value,
        whyJoin: form.whyJoin.value,
        comments: form.comments.value || 'N/A',
        resumeFileName: resumeFile ? resumeFile.name : 'Not uploaded',
        coverLetterFileName: coverLetterFile ? coverLetterFile.name : 'Not uploaded'
    };

    console.log('Template Parameters:', templateParams);
    console.log('Service ID: service_7dn0e8t');
    console.log('Template ID: template_zr42uyb');

    try {
        // Send email using EmailJS
        const response = await emailjs.send(
            'service_7dn0e8t',  // Your Service ID
            'template_zr42uyb', // Your Template ID (create new one for job applications)
            templateParams
        );

        console.log('✅ SUCCESS!', response.status, response.text);

        // Hide loading and form
        loadingIndicator.classList.add('hidden');
        form.style.display = 'none';
        successMessage.classList.add('show');
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Redirect after 5 seconds
        setTimeout(() => {
            window.location.href = 'career.html';
        }, 5000);

    } catch (error) {
        console.error('❌ FAILED...', error);
        
        // Detailed error logging
        console.error('Error Details:', {
            text: error.text,
            status: error.status,
            message: error.message
        });
        
        // Show specific error message
        let errorMessage = 'Error submitting application:\n\n';
        
        if (error.text) {
            errorMessage += `Error: ${error.text}\n`;
        }
        if (error.status) {
            errorMessage += `Status Code: ${error.status}\n`;
        }
        
        errorMessage += '\nPlease check:\n';
        errorMessage += '1. Your internet connection\n';
        errorMessage += '2. All required fields are filled\n';
        errorMessage += '3. Email format is correct\n\n';
        errorMessage += 'Or contact us directly at: hr@bluematrixservices.com';
        
        alert(errorMessage);
        
        // Reset form state
        loadingIndicator.classList.add('hidden');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Submit Application</span> <i class="fas fa-paper-plane"></i>';
        form.style.opacity = '1';
    }
});


//  form.addEventListener('submit', async function(e) {
//      e.preventDefault();

//      const submitBtn = document.getElementById('submitBtn');
//      const loadingIndicator = document.getElementById('loadingIndicator');
//      const successMessage = document.getElementById('successMessage');

//      // Show loading
//      submitBtn.disabled = true;
//      loadingIndicator.classList.remove('hidden');
//      form.style.opacity = '0.5';

//      // Collect form data
//      const formData = new FormData(form);
     
//      // Simulate form submission (replace with actual email sending logic)
//      try {
//          // Here you would integrate with EmailJS or your backend API
//          // For demonstration, we'll simulate a delay
//          await new Promise(resolve => setTimeout(resolve, 2000));

//          // Prepare email content
//          const emailContent = {
//              to: 'yogeshbiradar708@gmail.com', 
//              subject: `New Job Application - ${formData.get('position')}`,
//              body: `
//                  New job application received:
                 
//                  Personal Information:
//                  - Name: ${formData.get('firstName')} ${formData.get('lastName')}
//                  - Email: ${formData.get('email')}
//                  - Phone: ${formData.get('phone')}
//                  - Address: ${formData.get('address')}, ${formData.get('city')}, ${formData.get('state')} - ${formData.get('pincode')}
//                  - DOB: ${formData.get('dob')}
                 
//                  Position Details:
//                  - Position: ${formData.get('position')}
//                  - Department: ${formData.get('department')}
//                  - Location: ${formData.get('location')}
//                  - Expected Salary: ${formData.get('expectedSalary')}
//                  - Notice Period: ${formData.get('noticePeriod')}
//                  - Available to Join: ${formData.get('joinDate')}
                 
//                  Professional Experience:
//                  - Total Experience: ${formData.get('totalExperience')}
//                  - Qualification: ${formData.get('qualification')}
//                  - Current Company: ${formData.get('currentCompany') || 'N/A'}
//                  - Current Designation: ${formData.get('currentDesignation') || 'N/A'}
//                  - Current CTC: ${formData.get('currentCTC') || 'N/A'}
//                  - Key Skills: ${formData.get('skills')}
                 
//                  Additional Information:
//                  - LinkedIn: ${formData.get('linkedin') || 'N/A'}
//                  - Portfolio: ${formData.get('portfolio') || 'N/A'}
//                  - Source: ${formData.get('source')}
//                  - Why Join: ${formData.get('whyJoin')}
//                  - Comments: ${formData.get('comments') || 'N/A'}
//              `
//          };

//          console.log('Form submitted with data:', emailContent);

//          // Show success message
//          loadingIndicator.classList.add('hidden');
//          form.style.display = 'none';
//          successMessage.classList.add('show');
         
//          // Scroll to success message
//          successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

//          // Redirect after 5 seconds
//          setTimeout(() => {
//              window.location.href = 'career.html';
//          }, 5000);

//      } catch (error) {
//          console.error('Error submitting form:', error);
//          alert('There was an error submitting your application. Please try again or contact us directly.');
         
//          loadingIndicator.classList.add('hidden');
//          submitBtn.disabled = false;
//          form.style.opacity = '1';
//      }
//  });

 // Scroll animations
 const observerOptions = {
     threshold: 0.1,
     rootMargin: '0px 0px -50px 0px'
 };

 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('visible');
         }
     });
 }, observerOptions);

 document.querySelectorAll('.fade-in-up').forEach(el => {
     observer.observe(el);
 });

 // Phone number validation
 const phoneInput = document.querySelector('input[name="phone"]');
 phoneInput.addEventListener('input', function(e) {
     // Allow only numbers and basic phone formatting
     this.value = this.value.replace(/[^\d+\s-]/g, '');
 });

 // PIN code validation
 const pincodeInput = document.querySelector('input[name="pincode"]');
 pincodeInput.addEventListener('input', function(e) {
     // Allow only 6 digits
     this.value = this.value.replace(/\D/g, '').slice(0, 6);
 });

 // Set minimum date for DOB (18 years ago)
 const dobInput = document.querySelector('input[name="dob"]');
 const today = new Date();
 const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
 dobInput.max = maxDate.toISOString().split('T')[0];




 
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
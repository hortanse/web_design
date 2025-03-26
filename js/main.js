/*
* InnovateTech - Tech Solutions Landing Page
* Main JavaScript
*/

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initPageLoader();
  initNavigation();
  initTabsSystem();
  initTestimonialSlider();
  initContactForm();
  initScrollToLinks();
});

// Window load event for elements dependent on full page load
window.addEventListener('load', function() {
  // Hide page loader when page is fully loaded
  setTimeout(function() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(function() {
        loader.style.display = 'none';
      }, 500);
    }
  }, 1000);
});

/**
 * Page Loader Animation
 */
function initPageLoader() {
  const progressBar = document.querySelector('.progress-bar');
  
  if (progressBar) {
    let width = 0;
    const interval = setInterval(function() {
      if (width >= 100) {
        clearInterval(interval);
      } else {
        width++;
        progressBar.style.width = width + '%';
      }
    }, 20);
  }
}

/**
 * Navigation and Scroll Effects
 */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  // Header scroll effect
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      
      if (navLinks.classList.contains('active')) {
        navLinks.style.height = '0';
        navLinks.addEventListener('transitionend', function handler() {
          navLinks.classList.remove('active');
          navLinks.removeEventListener('transitionend', handler);
        });
      } else {
        navLinks.classList.add('active');
        navLinks.style.height = navLinks.scrollHeight + 'px';
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 1024 && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navLinks.style.height = '';
      }
    });
  }
}

/**
 * Tabs System
 */
function initTabsSystem() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  if (tabButtons.length > 0) {
    tabButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons and panels
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked button and its corresponding panel
        const tabId = btn.getAttribute('data-tab');
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
      });
    });
  }
}

/**
 * Testimonial Slider
 */
function initTestimonialSlider() {
  if (typeof Swiper !== 'undefined' && document.querySelector('.testimonial-slider')) {
    const testimonialSwiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.slider-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.slider-next',
        prevEl: '.slider-prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }
    });
  }
}

/**
 * Contact Form Handling
 */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple frontend validation
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          field.addEventListener('input', function() {
            if (field.value.trim()) {
              field.classList.remove('error');
            }
          });
        }
      });
      
      // If form is valid, simulate sending
      if (isValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate API call
        setTimeout(function() {
          submitBtn.textContent = 'Message Sent!';
          contactForm.reset();
          
          setTimeout(function() {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 2000);
        }, 1500);
      }
    });
  }
}

/**
 * Smooth Scroll for Links
 */
function initScrollToLinks() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  scrollLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navLinks && navLinks.classList.contains('active')) {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
          navLinks.style.height = '';
        }
        
        // Scroll to target
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Count-up Animation for Stats
 */
function initCounters() {
  const counterElements = document.querySelectorAll('.stat-counter');
  
  if (counterElements.length > 0) {
    counterElements.forEach(function(counter) {
      const target = parseInt(counter.getAttribute('data-count'));
      let count = 0;
      const increment = target > 100 ? Math.ceil(target / 100) : 1;
      
      const interval = setInterval(function() {
        count += increment;
        counter.textContent = count;
        
        if (count >= target) {
          counter.textContent = target;
          clearInterval(interval);
        }
      }, 20);
    });
  }
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - The element to check
 * @param {number} offset - Offset value
 * @returns {boolean} - Whether the element is in viewport
 */
function isInViewport(element, offset = 0) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight - offset) &&
    rect.bottom >= 0
  );
}

/**
 * Handle elements that animate when scrolled into view
 */
function handleScrollAnimations() {
  // Value cards animation
  const valueCards = document.querySelectorAll('.value-card');
  valueCards.forEach(function(card, index) {
    if (isInViewport(card, 50) && !card.classList.contains('animated')) {
      setTimeout(function() {
        card.classList.add('animated');
      }, index * 200);
    }
  });
  
  // Animated icons
  const icons = document.querySelectorAll('.animated-icon');
  icons.forEach(function(icon) {
    if (isInViewport(icon, 50) && !icon.classList.contains('animated')) {
      icon.classList.add('animated');
    }
  });
  
  // Counter animation
  const statSections = document.querySelectorAll('.stats-container');
  statSections.forEach(function(section) {
    if (isInViewport(section, 100) && !section.classList.contains('counted')) {
      section.classList.add('counted');
      initCounters();
    }
  });
}

// Set up scroll event for animations
window.addEventListener('scroll', handleScrollAnimations);
// Initialize animations on first load
window.addEventListener('load', handleScrollAnimations); 
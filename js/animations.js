/*
* InnovateTech - Tech Solutions Landing Page
* Advanced Animations
*/

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initParticles();
  initCustomCursor();
  initMagneticButtons();
  initTiltEffect();
  initScrollAnimations();
  initHeroAnimations();
  initCTAAnimation();
});

/**
 * Initialize Particles Background
 */
function initParticles() {
  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#ffffff'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          },
          polygon: {
            nb_sides: 5
          }
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.1,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.3
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
}

/**
 * Custom Cursor Animation
 */
function initCustomCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorCircle = document.querySelector('.cursor-circle');
  
  if (cursorDot && cursorCircle && window.innerWidth > 768) {
    document.addEventListener('mousemove', function(e) {
      // Calculate positions with smooth effect
      const dotX = e.clientX;
      const dotY = e.clientY;
      
      // Apply transforms using requestAnimationFrame for smoother performance
      requestAnimationFrame(function() {
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
        
        // Add a slight delay to the circle for a trailing effect
        setTimeout(function() {
          cursorCircle.style.transform = `translate(${dotX}px, ${dotY}px)`;
        }, 50);
      });
    });
    
    // Change cursor size on clickable elements
    const clickables = document.querySelectorAll('a, button, .btn, input, select, textarea');
    clickables.forEach(function(element) {
      element.addEventListener('mouseenter', function() {
        cursorDot.classList.add('cursor-hover');
        cursorCircle.classList.add('cursor-hover');
      });
      
      element.addEventListener('mouseleave', function() {
        cursorDot.classList.remove('cursor-hover');
        cursorCircle.classList.remove('cursor-hover');
      });
    });
    
    // Add special effect on buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(button) {
      button.addEventListener('mousedown', function() {
        cursorDot.classList.add('cursor-active');
        cursorCircle.classList.add('cursor-active');
      });
      
      button.addEventListener('mouseup', function() {
        cursorDot.classList.remove('cursor-active');
        cursorCircle.classList.remove('cursor-active');
      });
    });
  }
}

/**
 * Magnetic Button Effect
 */
function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('.magnetic-btn');
  
  if (magneticButtons.length > 0 && window.innerWidth > 768) {
    magneticButtons.forEach(function(btn) {
      btn.addEventListener('mousemove', function(e) {
        const position = btn.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        
        // Calculate magnetic pull (stronger as cursor gets closer to center)
        const magneticPull = 0.3; // Adjust for stronger/weaker effect
        
        // Apply the transform with magnetic pull
        btn.style.transform = `translate(${x * magneticPull}px, ${y * magneticPull}px)`;
      });
      
      btn.addEventListener('mouseleave', function() {
        // Reset position on mouse leave with a smooth transition
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }
}

/**
 * Tilt Effect for Cards
 */
function initTiltEffect() {
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
      max: 10,
      speed: 400,
      glare: true,
      'max-glare': 0.3,
      scale: 1.05
    });
  } else {
    // Fallback for when VanillaTilt is not loaded
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    if (tiltCards.length > 0 && window.innerWidth > 768) {
      tiltCards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
          const position = card.getBoundingClientRect();
          const centerX = position.left + position.width / 2;
          const centerY = position.top + position.height / 2;
          const mouseX = e.clientX;
          const mouseY = e.clientY;
          
          // Calculate rotation based on mouse position
          const rotateY = ((mouseX - centerX) / position.width) * 10;
          const rotateX = ((centerY - mouseY) / position.height) * 10;
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
      });
    }
  }
}

/**
 * GSAP ScrollTrigger Animations
 */
function initScrollAnimations() {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // Hero section parallax
    gsap.to('.floating-elements', {
      y: '20%',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
    
    // Services section animation
    gsap.from('.service-item', {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.services-section',
        start: 'top 80%'
      }
    });
    
    // About section animation
    gsap.from('.about-content', {
      x: -50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 70%'
      }
    });
    
    gsap.from('.about-image', {
      x: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 70%'
      }
    });
    
    // Testimonial section animation
    gsap.from('.testimonial-slider', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.testimonials-section',
        start: 'top 70%'
      }
    });
    
    // CTA section animation
    gsap.from('.cta-content', {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 80%'
      }
    });
  }
}

/**
 * Hero Section Advanced Animation
 */
function initHeroAnimations() {
  // Type writer effect for hero title
  const titleLines = document.querySelectorAll('.title-line');
  
  if (titleLines.length > 0) {
    // Add animation classes dynamically with staggered delay
    titleLines.forEach(function(line, index) {
      setTimeout(function() {
        line.classList.add('animate');
      }, index * 200);
    });
  }
  
  // Mouse move parallax effect for hero section
  const heroSection = document.querySelector('.hero-section');
  const floatingElements = document.querySelectorAll('.floating-element');
  
  if (heroSection && floatingElements.length > 0) {
    heroSection.addEventListener('mousemove', function(e) {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      floatingElements.forEach(function(element, index) {
        // Create different parallax speeds for each element
        const speed = 30 + (index * 10);
        const offsetX = (x - 0.5) * speed;
        const offsetY = (y - 0.5) * speed;
        
        // Apply the transform
        element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    });
  }
}

/**
 * CTA Button Animation
 */
function initCTAAnimation() {
  const ctaButtons = document.querySelectorAll('.btn-primary');
  
  if (ctaButtons.length > 0) {
    ctaButtons.forEach(function(btn) {
      btn.addEventListener('mouseenter', function() {
        this.classList.add('pulse');
      });
      
      btn.addEventListener('animationend', function() {
        this.classList.remove('pulse');
      });
    });
  }
}

/**
 * Window Resize Handler
 */
window.addEventListener('resize', function() {
  // Reinitialize effects that depend on screen size
  if (window.innerWidth <= 768) {
    // Disable certain effects on mobile
    const cursorElements = document.querySelectorAll('.cursor-dot, .cursor-circle');
    cursorElements.forEach(el => el.style.display = 'none');
  } else {
    // Re-enable effects on desktop
    const cursorElements = document.querySelectorAll('.cursor-dot, .cursor-circle');
    cursorElements.forEach(el => el.style.display = 'block');
    
    // Reinitialize tilt effect
    initTiltEffect();
  }
}); 
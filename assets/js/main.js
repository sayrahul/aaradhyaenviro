/**
 * Aaradhya Enviro - Main JavaScript
 * Handles mobile menu, desktop dropdowns, and accessibility features
 */

// Mobile Menu Module
const MobileMenu = {
  hamburger: null,
  menu: null,
  backdrop: null,
  closeBtn: null,
  focusableElements: [],
  lastFocusedElement: null,

  init() {
    this.hamburger = document.querySelector('button.lg\\:hidden[aria-label="Toggle mobile menu"]') || 
                     document.querySelector('nav button.lg\\:hidden') || 
                     document.querySelector('button[aria-expanded]');
    this.menu = document.getElementById('mobile-menu');
    this.backdrop = document.getElementById('mobile-menu-backdrop');
    this.closeBtn = document.getElementById('close-mobile-menu');

    if (!this.hamburger || !this.menu) {
      console.warn('Mobile menu elements not found');
      return;
    }

    this.bindEvents();
    this.setupAccordions();
    this.setupFocusTrap();
    this.setActiveLink();
  },

  bindEvents() {
    // Remove any existing listeners by cloning
    const newBtn = this.hamburger.cloneNode(true);
    this.hamburger.parentNode.replaceChild(newBtn, this.hamburger);
    this.hamburger = newBtn;

    this.hamburger.addEventListener('click', (e) => this.open(e));
    
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => this.close(e));
    }
    
    if (this.backdrop) {
      this.backdrop.addEventListener('click', (e) => this.close(e));
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close(e);
      }
    });
  },

  open(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Store last focused element
    this.lastFocusedElement = document.activeElement;

    this.menu.classList.remove('translate-x-full');
    this.menu.classList.add('translate-x-0');
    this.menu.setAttribute('aria-hidden', 'false');
    
    if (this.backdrop) {
      this.backdrop.style.opacity = '1';
      this.backdrop.style.pointerEvents = 'auto';
    }
    
    document.body.style.overflow = 'hidden';
    this.hamburger.setAttribute('aria-expanded', 'true');

    // Focus first focusable element
    setTimeout(() => {
      if (this.closeBtn) {
        this.closeBtn.focus();
      }
    }, 100);
  },

  close(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.menu.classList.remove('translate-x-0');
    this.menu.classList.add('translate-x-full');
    this.menu.setAttribute('aria-hidden', 'true');
    
    if (this.backdrop) {
      this.backdrop.style.opacity = '0';
      this.backdrop.style.pointerEvents = 'none';
    }
    
    document.body.style.overflow = '';
    this.hamburger.setAttribute('aria-expanded', 'false');

    // Restore focus
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
    }
  },

  isOpen() {
    return this.menu.classList.contains('translate-x-0');
  },

  setupAccordions() {
    const accordions = document.querySelectorAll('.mobile-accordion-btn');
    
    accordions.forEach(btn => {
      btn.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const chevron = this.querySelector('.chevron');
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        if (content.style.display === 'none' || !content.style.display) {
          content.style.display = 'flex';
          if (chevron) chevron.style.transform = 'rotate(180deg)';
          this.setAttribute('aria-expanded', 'true');
        } else {
          content.style.display = 'none';
          if (chevron) chevron.style.transform = 'rotate(0deg)';
          this.setAttribute('aria-expanded', 'false');
        }
      });

      // Keyboard support
      btn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  },

  setupFocusTrap() {
    this.menu.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab' || !this.isOpen()) return;

      this.focusableElements = Array.from(
        this.menu.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

      const firstElement = this.focusableElements[0];
      const lastElement = this.focusableElements[this.focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    });
  },

  setActiveLink() {
    try {
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const allLinks = document.querySelectorAll('.mm-link');

      allLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href && href.includes(currentPath) && currentPath !== '') {
          // Reset home link
          const homeLink = document.querySelector('.mm-home');
          if (homeLink && homeLink !== link) {
            homeLink.style.background = 'transparent';
            homeLink.style.color = '';
          }
          
          // Set active link
          link.style.background = 'rgba(249, 115, 22, 0.1)';
          link.style.color = '#f97316';
          link.setAttribute('aria-current', 'page');
        }
      });
    } catch (error) {
      console.error('Error setting active link:', error);
    }
  }
};

// Desktop Dropdown Module
const DesktopDropdown = {
  dropdowns: [],

  init() {
    const dropdownElements = document.querySelectorAll('.hidden.lg\\:flex .relative.group > .relative');
    
    dropdownElements.forEach(dropdown => {
      this.setupDropdown(dropdown);
    });
  },

  setupDropdown(dropdown) {
    const button = dropdown.querySelector('button');
    const menu = dropdown.querySelector('.absolute.top-full');

    if (!button || !menu) return;

    let timeout;

    // Mouse events
    dropdown.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
      this.openMenu(menu, button);
    });

    dropdown.addEventListener('mouseleave', () => {
      timeout = setTimeout(() => {
        this.closeMenu(menu, button);
      }, 100);
    });

    // Keyboard events
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isOpen = menu.classList.contains('opacity-100');
        
        if (isOpen) {
          this.closeMenu(menu, button);
        } else {
          this.openMenu(menu, button);
          // Focus first link in menu
          setTimeout(() => {
            const firstLink = menu.querySelector('a');
            if (firstLink) firstLink.focus();
          }, 50);
        }
      } else if (e.key === 'Escape') {
        this.closeMenu(menu, button);
        button.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        this.closeMenu(menu, button);
      }
    });

    // Set ARIA attributes
    button.setAttribute('aria-haspopup', 'true');
    button.setAttribute('aria-expanded', 'false');
    menu.setAttribute('role', 'menu');
    
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
      link.setAttribute('role', 'menuitem');
    });
  },

  openMenu(menu, button) {
    menu.classList.remove('opacity-0', 'invisible', '-translate-y-2');
    menu.classList.add('opacity-100', 'visible', 'translate-y-0');
    button.setAttribute('aria-expanded', 'true');
    
    const icon = button.querySelector('svg');
    if (icon) icon.style.transform = 'rotate(180deg)';
  },

  closeMenu(menu, button) {
    menu.classList.remove('opacity-100', 'visible', 'translate-y-0');
    menu.classList.add('opacity-0', 'invisible', '-translate-y-2');
    button.setAttribute('aria-expanded', 'false');
    
    const icon = button.querySelector('svg');
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
};

// Lazy Loading Images
const LazyLoad = {
  init() {
    // Check if browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // If data-src exists, use it
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }
};

// Skip Link Handler
const SkipLink = {
  init() {
    const skipLink = document.querySelector('.skip-link');
    if (!skipLink) return;

    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = skipLink.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
};

// Form Validation (for contact page)
const FormValidation = {
  init() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });

      // Real-time validation
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateField(input);
        });
      });
    });
  },

  validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  },

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let errorMessage = '';

    // Required check
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Email validation
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (type === 'tel' && value) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value.replace(/\s/g, ''))) {
        isValid = false;
        errorMessage = 'Please enter a valid 10-digit phone number';
      }
    }

    this.showFieldError(field, isValid, errorMessage);
    return isValid;
  },

  showFieldError(field, isValid, message) {
    const errorElement = field.parentElement.querySelector('.error-message');
    
    if (!isValid) {
      field.classList.add('border-red-500');
      field.classList.remove('border-gray-300');
      field.setAttribute('aria-invalid', 'true');
      
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
      } else {
        const error = document.createElement('span');
        error.className = 'error-message text-red-500 text-sm mt-1 block';
        error.textContent = message;
        error.setAttribute('role', 'alert');
        field.parentElement.appendChild(error);
      }
    } else {
      field.classList.remove('border-red-500');
      field.classList.add('border-gray-300');
      field.setAttribute('aria-invalid', 'false');
      
      if (errorElement) {
        errorElement.classList.add('hidden');
      }
    }
  }
};

// Performance Monitoring
const Performance = {
  init() {
    if ('PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP monitoring not supported');
      }

      // Monitor First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            console.log('FID:', entry.processingStart - entry.startTime);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID monitoring not supported');
      }
    }
  }
};

// Initialize all modules
function initApp() {
  try {
    MobileMenu.init();
    DesktopDropdown.init();
    LazyLoad.init();
    SkipLink.init();
    FormValidation.init();
    
    // Only in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      Performance.init();
    }
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MobileMenu,
    DesktopDropdown,
    LazyLoad,
    SkipLink,
    FormValidation
  };
}

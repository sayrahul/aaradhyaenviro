/**
 * Professional Interactive Gallery with Lightbox
 * Features: Image zoom, navigation, keyboard controls, touch gestures
 */

const Gallery = {
  lightbox: null,
  currentIndex: 0,
  images: [],
  touchStartX: 0,
  touchEndX: 0,

  init() {
    this.createLightbox();
    this.setupGalleryItems();
    this.bindEvents();
  },

  createLightbox() {
    const lightboxHTML = `
      <div id="gallery-lightbox" class="fixed inset-0 z-[9999] hidden">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/95 backdrop-blur-sm transition-opacity duration-300"></div>
        
        <!-- Close Button -->
        <button 
          id="lightbox-close" 
          class="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 group"
          aria-label="Close lightbox"
        >
          <svg class="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <!-- Image Counter -->
        <div class="absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium">
          <span id="lightbox-counter">1 / 1</span>
        </div>

        <!-- Navigation Buttons -->
        <button 
          id="lightbox-prev" 
          class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 transform hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous image"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <button 
          id="lightbox-next" 
          class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 transform hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next image"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Image Container -->
        <div class="absolute inset-0 flex items-center justify-center p-4 md:p-8">
          <div class="relative max-w-7xl max-h-full">
            <img 
              id="lightbox-image" 
              src="" 
              alt="" 
              class="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl transform transition-all duration-300"
            />
            <div id="lightbox-loading" class="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <div class="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
            </div>
          </div>
        </div>

        <!-- Image Caption -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 max-w-2xl px-6 py-3 rounded-full bg-white/10 backdrop-blur-md text-white text-center">
          <p id="lightbox-caption" class="text-sm md:text-base font-medium"></p>
        </div>

        <!-- Zoom Controls -->
        <div class="absolute bottom-4 right-4 z-10 flex gap-2">
          <button 
            id="lightbox-zoom-out" 
            class="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
            aria-label="Zoom out"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"/>
            </svg>
          </button>
          <button 
            id="lightbox-zoom-in" 
            class="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
            aria-label="Zoom in"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    this.lightbox = document.getElementById('gallery-lightbox');
  },

  setupGalleryItems() {
    const galleryItems = document.querySelectorAll('[data-gallery-item]');
    
    this.images = Array.from(galleryItems).map((item, index) => {
      const img = item.querySelector('img');
      return {
        src: img.src,
        alt: img.alt || `Gallery image ${index + 1}`,
        caption: item.dataset.caption || img.alt || `Image ${index + 1}`
      };
    });

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.openLightbox(index);
      });

      // Add hover effect
      item.classList.add('cursor-pointer', 'group');
      const img = item.querySelector('img');
      img.classList.add('transform', 'transition-transform', 'duration-300', 'group-hover:scale-105');
    });
  },

  bindEvents() {
    // Close button
    document.getElementById('lightbox-close').addEventListener('click', () => this.closeLightbox());

    // Navigation buttons
    document.getElementById('lightbox-prev').addEventListener('click', () => this.navigate(-1));
    document.getElementById('lightbox-next').addEventListener('click', () => this.navigate(1));

    // Zoom controls
    document.getElementById('lightbox-zoom-in').addEventListener('click', () => this.zoom(1.2));
    document.getElementById('lightbox-zoom-out').addEventListener('click', () => this.zoom(0.8));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('hidden')) {
        switch(e.key) {
          case 'Escape':
            this.closeLightbox();
            break;
          case 'ArrowLeft':
            this.navigate(-1);
            break;
          case 'ArrowRight':
            this.navigate(1);
            break;
          case '+':
          case '=':
            this.zoom(1.2);
            break;
          case '-':
          case '_':
            this.zoom(0.8);
            break;
        }
      }
    });

    // Click backdrop to close
    this.lightbox.querySelector('.absolute.inset-0.bg-black\\/95').addEventListener('click', () => {
      this.closeLightbox();
    });

    // Touch gestures for mobile
    const imageContainer = this.lightbox.querySelector('.absolute.inset-0.flex');
    imageContainer.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    });

    imageContainer.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });

    // Prevent image dragging
    document.getElementById('lightbox-image').addEventListener('dragstart', (e) => e.preventDefault());
  },

  openLightbox(index) {
    this.currentIndex = index;
    this.lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    this.loadImage();
    this.updateUI();

    // Animate in
    requestAnimationFrame(() => {
      this.lightbox.querySelector('.bg-black\\/95').style.opacity = '1';
    });
  },

  closeLightbox() {
    this.lightbox.classList.add('hidden');
    document.body.style.overflow = '';
    
    // Reset zoom
    const img = document.getElementById('lightbox-image');
    img.style.transform = 'scale(1)';
  },

  loadImage() {
    const img = document.getElementById('lightbox-image');
    const loading = document.getElementById('lightbox-loading');
    const currentImage = this.images[this.currentIndex];

    loading.classList.remove('hidden');
    img.style.opacity = '0';

    img.onload = () => {
      loading.classList.add('hidden');
      img.style.opacity = '1';
    };

    img.src = currentImage.src;
    img.alt = currentImage.alt;
    
    document.getElementById('lightbox-caption').textContent = currentImage.caption;
  },

  navigate(direction) {
    this.currentIndex += direction;
    
    if (this.currentIndex < 0) {
      this.currentIndex = this.images.length - 1;
    } else if (this.currentIndex >= this.images.length) {
      this.currentIndex = 0;
    }

    this.loadImage();
    this.updateUI();
  },

  updateUI() {
    const counter = document.getElementById('lightbox-counter');
    counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;

    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    // Enable/disable buttons based on position (optional - remove if you want infinite loop)
    // prevBtn.disabled = this.currentIndex === 0;
    // nextBtn.disabled = this.currentIndex === this.images.length - 1;
  },

  zoom(factor) {
    const img = document.getElementById('lightbox-image');
    const currentScale = parseFloat(img.dataset.scale || 1);
    const newScale = Math.max(0.5, Math.min(3, currentScale * factor));
    
    img.style.transform = `scale(${newScale})`;
    img.dataset.scale = newScale;
  },

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next image
        this.navigate(1);
      } else {
        // Swipe right - previous image
        this.navigate(-1);
      }
    }
  }
};

// Initialize gallery when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Gallery.init());
} else {
  Gallery.init();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Gallery;
}

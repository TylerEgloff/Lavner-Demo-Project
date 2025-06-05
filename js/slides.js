class SlideShow {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll('.slide');
    this.dots = document.querySelectorAll('.nav-dot');
    this.upArrow = document.querySelector('.nav-up');
    this.downArrow = document.querySelector('.nav-down');
    this.slidesContainer = document.querySelector('.slides-container');
    this.totalSlides = this.slides.length;
    this.isSlideMode = false; // Track if we're in slide navigation mode

    this.init();
    this.updateArrowVisibility(); // Initial arrow visibility
  }

  init() {
    // Add click handlers to dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    // Add click handlers to arrows
    this.upArrow.addEventListener('click', () => this.goToPreviousSlide());
    this.downArrow.addEventListener('click', () => this.goToNextSlide());

    // Add wheel event handler
    window.addEventListener('wheel', (ev) => this.handleWheel(ev), { passive: false });
  }

  updateArrowVisibility() {
    // Hide up arrow if on first slide
    if (this.currentSlide === 0) {
      this.upArrow.classList.add('hidden');
    } else {
      this.upArrow.classList.remove('hidden');
    }

    // Hide down arrow if on last slide
    if (this.currentSlide === this.totalSlides - 1) {
      this.downArrow.classList.add('hidden');
    } else {
      this.downArrow.classList.remove('hidden');
    }
  }

  isAtBottom() {
    return (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 1;
  }

  handleWheel(ev) {
    const isAtBottom = this.isAtBottom();

    // If we're in slide mode or at the bottom, we might need to handle the scroll
    if (this.isSlideMode || isAtBottom) {
      if (ev.deltaY > 0) { // Scrolling down
        if (isAtBottom) {
          // Prevent default scroll and trigger next slide
          ev.preventDefault();
          this.isSlideMode = true;
          this.goToNextSlide();
        }
      } else if (ev.deltaY < 0) { // Scrolling up
        if (this.isSlideMode || isAtBottom) {
          // Only prevent default if we're not on the first slide
          if (this.currentSlide > 0) {
            ev.preventDefault();
            this.goToPreviousSlide();
          } else {
            // Exit slide mode when reaching first slide
            this.isSlideMode = false;
          }
        }
      }
    }

    // Exit slide mode if we're no longer at the bottom
    if (!isAtBottom) {
      this.isSlideMode = false;
    }
  }

  goToNextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.goToSlide(this.currentSlide + 1);
    }
  }

  goToPreviousSlide() {
    if (this.currentSlide > 0) {
      this.goToSlide(this.currentSlide - 1);
    }
  }

  goToSlide(index) {
    // Remove active class from current slide and dot
    this.slides[this.currentSlide].classList.remove('active');
    this.dots[this.currentSlide].classList.remove('active');

    // Update current slide index
    this.currentSlide = index;

    // Add active class to new slide and dot
    this.slides[this.currentSlide].classList.add('active');
    this.dots[this.currentSlide].classList.add('active');

    // Update arrow visibility
    this.updateArrowVisibility();
  }
}

// Initialize the slideshow when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SlideShow();
}); 
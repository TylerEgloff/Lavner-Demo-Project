class SlideShow {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll('.slide');
    this.dots = document.querySelectorAll('.nav-dot');
    this.upArrow = document.querySelector('.nav-up');
    this.downArrow = document.querySelector('.nav-down');
    this.slidesContainer = document.querySelector('.slides-container');
    this.totalSlides = this.slides.length;
    this.isScrolling = false;
    this.scrollTimeout = null;

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

    // Add scroll handler
    window.addEventListener('scroll', () => this.handleScroll());
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

  handleScroll() {
    // Clear the timeout if it exists
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    // Set a timeout to run after scrolling ends
    this.scrollTimeout = setTimeout(() => {
      const containerRect = this.slidesContainer.getBoundingClientRect();
      const containerBottom = containerRect.bottom;
      const windowHeight = window.innerHeight;

      // If we've scrolled past the container and we're not at the last slide
      if (containerBottom <= windowHeight && this.currentSlide < this.totalSlides - 1) {
        this.goToNextSlide();
      }
    }, 150);
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
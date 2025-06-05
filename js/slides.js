class SlideShow {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll('.slide');
    this.dots = document.querySelectorAll('.nav-dot');
    this.upArrow = document.querySelector('.nav-up');
    this.downArrow = document.querySelector('.nav-down');
    this.slidesContainer = document.querySelector('.slides-container');
    this.totalSlides = this.slides.length;
    this.isSlideMode = false; // Track if we're in slide navigation state

    this.init();
    this.updateArrowVisibility(); // Initial arrow visibility
  }

  init() {
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    this.upArrow.addEventListener('click', () => this.goToPreviousSlide());
    this.downArrow.addEventListener('click', () => this.goToNextSlide());

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

    // If we're in slide state or at bottom we may need to scroll
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
            this.isSlideMode = false;
          }
        }
      }
    }

    // Exit slide state if not at bottom
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
    this.slides[this.currentSlide].classList.remove('active');
    this.dots[this.currentSlide].classList.remove('active');

    this.currentSlide = index;

    this.slides[this.currentSlide].classList.add('active');
    this.dots[this.currentSlide].classList.add('active');

    this.updateArrowVisibility();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SlideShow();
}); 
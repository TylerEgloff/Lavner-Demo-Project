document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide-wrapper');
    const parallaxHeight = document.querySelector('.parallax').offsetHeight;
    const slideHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;

    // Set the number of slides CSS variable
    document.documentElement.style.setProperty('--num-slides', slides.length);

    function updateSlides() {
        const scrollY = window.scrollY;
        const maxScroll = totalHeight - window.innerHeight;
        const scrollPosition = scrollY - parallaxHeight;

        // Before slides section
        if (scrollY < parallaxHeight) {
            slides.forEach((slide, index) => {
                if (index === 0) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            // Calculate which slide should be visible based on scroll position
            let slideIndex;

            // If we're at the bottom of the page, show the last slide
            if (scrollY >= maxScroll - 25) {
                slideIndex = slides.length - 1;
            } else {
                slideIndex = Math.min(
                    Math.floor(scrollPosition / slideHeight),
                    slides.length - 1
                );
            }

            // Update slide visibility
            slides.forEach((slide, index) => {
                if (index === slideIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        }

        // Update on scroll
        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateSlides);
        });

        // Initial update
        updateSlides();

        // Update on resize
        window.addEventListener('resize', () => {
            requestAnimationFrame(updateSlides);
        });
    }
}); 
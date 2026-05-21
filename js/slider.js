/**
 * Nikitka AI Travel - Custom Carousels / Sliders Module
 */

class NikitkaSlider {
    constructor(containerId, prevBtnId, nextBtnId) {
        this.container = document.getElementById(containerId);
        this.prevBtn = document.getElementById(prevBtnId);
        this.nextBtn = document.getElementById(nextBtnId);
        
        if (!this.container) return;

        this.track = this.container.querySelector('.slider-track');
        if (!this.track) return;

        this.isDragging = false;
        this.startX = 0;
        this.scrollLeft = 0;
        this.velocity = 0;
        this.animationId = null;

        this.initEvents();
    }

    initEvents() {
        // Next/Prev Buttons
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.scrollByAmount(340));
        }
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.scrollByAmount(-340));
        }

        // Dragging & Swipe Events
        this.container.addEventListener('mousedown', (e) => this.dragStart(e));
        window.addEventListener('mousemove', (e) => this.dragMove(e));
        window.addEventListener('mouseup', () => this.dragEnd());

        this.container.addEventListener('touchstart', (e) => this.dragStart(e), { passive: true });
        window.addEventListener('touchmove', (e) => this.dragMove(e), { passive: false });
        window.addEventListener('touchend', () => this.dragEnd());
        
        // Disable images/links drag behavior interfering with custom drag
        this.track.querySelectorAll('img, a').forEach(el => {
            el.addEventListener('dragstart', (e) => e.preventDefault());
        });

        // Hide navigation buttons if content fits without scrolling
        this.checkButtonsVisibility();
        window.addEventListener('resize', () => this.checkButtonsVisibility());
    }

    scrollByAmount(amount) {
        this.container.scrollBy({
            left: amount,
            behavior: 'smooth'
        });
    }

    dragStart(e) {
        this.isDragging = true;
        this.container.style.scrollBehavior = 'auto'; // Disable smooth scroll while dragging
        this.startX = this.getXPosition(e) - this.container.offsetLeft;
        this.scrollLeft = this.container.scrollLeft;
        cancelAnimationFrame(this.animationId);
    }

    dragMove(e) {
        if (!this.isDragging) return;
        
        // Prevent default only for touch events to avoid scrolling page while swiping slider
        if (e.type === 'touchmove') {
            e.preventDefault();
        }
        
        const x = this.getXPosition(e) - this.container.offsetLeft;
        const walk = (x - this.startX) * 1.5; // Drag sensitivity
        this.container.scrollLeft = this.scrollLeft - walk;
    }

    dragEnd() {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.container.style.scrollBehavior = 'smooth';
    }

    getXPosition(e) {
        return e.touches ? e.touches[0].clientX : e.clientX;
    }

    checkButtonsVisibility() {
        const canScroll = this.container.scrollWidth > this.container.clientWidth;
        [this.prevBtn, this.nextBtn].forEach((button) => {
            if (!button) return;
            button.hidden = !canScroll;
            button.disabled = !canScroll;
            button.setAttribute('aria-hidden', String(!canScroll));
        });
    }
}

// Instantiate Sliders on Load
document.addEventListener('DOMContentLoaded', () => {
    // Destinations Slider
    new NikitkaSlider('destinationsSliderContainer', 'destPrevBtn', 'destNextBtn');
    
    // Reviews Slider
    new NikitkaSlider('reviewsSliderContainer', 'reviewsPrevBtn', 'reviewsNextBtn');
});

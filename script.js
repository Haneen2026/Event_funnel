document.addEventListener('DOMContentLoaded', function () {

    /* =========================
       VIDEO CONTROLS
    ========================= */
    const video = document.getElementById('hero-video');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const wrapper = document.getElementById('video-wrapper');
    const progressContainer = document.querySelector('.progress-container');
    const progressBar = document.getElementById('progress-bar');

    if (video && playPauseBtn) {
        playPauseBtn.addEventListener('click', function () {
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = '⏸';
            } else {
                video.pause();
                playPauseBtn.textContent = '▶';
            }
        });
    }

    if (fullscreenBtn && wrapper) {
        fullscreenBtn.addEventListener('click', function () {
            const isFullscreen =
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement;

            if (!isFullscreen) {
                if (wrapper.requestFullscreen) wrapper.requestFullscreen();
                else if (wrapper.webkitRequestFullscreen) wrapper.webkitRequestFullscreen();
                else if (wrapper.mozRequestFullScreen) wrapper.mozRequestFullScreen();
                else if (wrapper.msRequestFullscreen) wrapper.msRequestFullscreen();
            } else {
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
                else if (document.msExitFullscreen) document.msExitFullscreen();
            }
        });
    }

    /* =========================
       PROGRESS BAR FUNCTIONALITY
    ========================= */
    if (video && progressBar && progressContainer) {
        video.addEventListener('timeupdate', () => {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.style.width = progress + '%';
        });

        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const seekTime = percentage * video.duration;
            video.currentTime = seekTime;
        });

        video.addEventListener('ended', () => {
            progressBar.style.width = '0%';
        });
    }

    /* =========================
       CTA BUTTONS
    ========================= */
    const ctaButton1 = document.getElementById('cta-button1');
    const about = document.querySelector('.about');
    const ctaButton2 = document.getElementById('cta-button2');

    if (ctaButton1 && about && ctaButton2) {
        ctaButton1.addEventListener('click', () => {
            about.style.display = 'block';
            ctaButton2.style.display = 'block';
            ctaButton1.style.display = 'none';
            about.scrollIntoView({ behavior: 'smooth' });
        });
    }

    /* =========================
       JOIN NOW BUTTON - NAVIGATE TO BOTTOM.HTML
    ========================= */
    const joinNowButtons = document.querySelectorAll('.joinNowBtn');
    joinNowButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                window.location.href = 'bottom.html';
            });
        }
    });

    /* =========================
       FAQ ACCORDION
    ========================= */
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                document.querySelectorAll('.faq-item').forEach(i => {
                    if (i !== item) i.classList.remove('active');
                });
                item.classList.toggle('active');
            });
        }
    });

    /* =========================
       FORM VALIDATION
    ========================= */
    const form = document.getElementById('registration-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const addressInput = document.getElementById('address');
    const submitBtn = document.getElementById('submit-btn');

    function checkForm() {
        if (submitBtn && nameInput && emailInput && addressInput) {
            submitBtn.disabled = !(nameInput.value.trim() && emailInput.value.trim() && addressInput.value.trim());
        }
    }

    if (nameInput && emailInput && addressInput) {
        nameInput.addEventListener('input', checkForm);
        emailInput.addEventListener('input', checkForm);
        addressInput.addEventListener('input', checkForm);
    }

    /* =========================
       CONFIRMATION TEXT
    ========================= */
    const confirmationText = document.getElementById('confirmation-text');
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const address = urlParams.get('address');

    if (confirmationText) {
        if (name && address) {
            confirmationText.textContent = `Thank you ${name}. We can't wait to see you at the True Care Workshop 🌸`;
        } else {
            confirmationText.textContent = `Thank you! Your seat is reserved at True Care Workshop`;
        }
    }

    /* =========================
       SHARE BUTTONS
    ========================= */
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const emailBtn = document.getElementById('email-btn');
    const copyBtn = document.getElementById('copy-btn');

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const text = encodeURIComponent(`Join me at the True Care Workshop! 🌿 Reserve your spot here: ${window.location.href}`);
            window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
        });
    }

    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            const subject = encodeURIComponent('Join me at the True Care Workshop 🌿');
            const body = encodeURIComponent(`Hi! I’d love to invite you to join me at the True Care Workshop. Reserve your spot here: ${window.location.href}`);
            window.location.href = `mailto:?subject=${subject}&body=${body}`;
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href)
                .then(() => alert('Link copied to clipboard! 🌿'))
                .catch(() => alert('Failed to copy link.'));
        });
    }
    const popup = document.getElementById('popupOverlay');
    const closePopup = document.getElementById('closePopup');
    
    function openPopup() {
        popup.style.display = 'flex';
    }
    
    function closePopupFn() {
        popup.style.display = 'none';
    }
    
    if (closePopup) {
        closePopup.addEventListener('click', closePopupFn);
    }
    setTimeout(() => {
        openPopup();
    }, 4000);

    /* =========================
       REVIEWS CAROUSEL - IMPROVED
    ========================= */
    // Only run on middleSecond.html page
    if (window.location.pathname.includes('middleSecond.html')) {
        const reviewsCarousel = document.querySelector('.reviews-carousel');
        const reviewCards = document.querySelectorAll('.review-card');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');

        if (reviewsCarousel && reviewCards.length > 0) {
            let currentIndex = 0;
            let autoplayInterval;
            let isTransitioning = false;

            // Initialize carousel
            function initCarousel() {
                // Hide all cards initially
                reviewCards.forEach(card => card.classList.remove('active'));
                // Show first card
                showSlide(0);
                // Autoplay removed - only manual navigation
            }

            // Show specific slide
            function showSlide(index) {
                if (isTransitioning) return;
                isTransitioning = true;

                // Update carousel position with smooth transition
                reviewsCarousel.style.transform = `translateX(-${index * 100}%)`;

                // Update active states with delay for smooth transition
                setTimeout(() => {
                    reviewCards.forEach((card, i) => {
                        card.classList.toggle('active', i === index);
                    });

                    indicators.forEach((indicator, i) => {
                        indicator.classList.toggle('active', i === index);
                    });

                    currentIndex = index;
                    isTransitioning = false;
                }, 300); // Match transition duration
            }

            // Next slide
            function nextSlide() {
                const nextIndex = (currentIndex + 1) % reviewCards.length;
                showSlide(nextIndex);
            }

            // Previous slide
            function prevSlide() {
                const prevIndex = (currentIndex - 1 + reviewCards.length) % reviewCards.length;
                showSlide(prevIndex);
            }

            // Go to specific slide
            function goToSlide(index) {
                if (index !== currentIndex) {
                    showSlide(index);
                }
            }

            // Start autoplay
            function startAutoplay() {
                autoplayInterval = setInterval(() => {
                    if (!isTransitioning) {
                        nextSlide();
                    }
                }, 5000); // Change slide every 5 seconds
            }

            // Stop autoplay
            function stopAutoplay() {
                if (autoplayInterval) {
                    clearInterval(autoplayInterval);
                    autoplayInterval = null;
                }
            }

            // Reset autoplay
            function resetAutoplay() {
                stopAutoplay();
                startAutoplay();
            }

            // Event listeners
            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    nextSlide();
                });
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    prevSlide();
                });
            }

            // Indicator click events
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', (e) => {
                    e.preventDefault();
                    goToSlide(index);
                });
            });

            // Autoplay functionality removed - manual navigation only

            // Keyboard navigation (only when carousel is in view)
            function handleKeyPress(e) {
                const carouselContainer = document.querySelector('.reviews-container');
                const carouselInView = carouselContainer && carouselContainer.getBoundingClientRect().top < window.innerHeight;
                if (!carouselInView) return;

                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevSlide();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextSlide();
                }
            }

            document.addEventListener('keydown', handleKeyPress);

            // Touch/swipe support for mobile - manual only
            let touchStartX = 0;
            let touchEndX = 0;
            let isDragging = false;
            const carouselContainer = document.querySelector('.reviews-container');

            if (carouselContainer) {
                carouselContainer.addEventListener('touchstart', (e) => {
                    touchStartX = e.changedTouches[0].screenX;
                    isDragging = true;
                }, { passive: true });

                carouselContainer.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    e.preventDefault(); // Prevent scrolling while swiping
                }, { passive: false });

                carouselContainer.addEventListener('touchend', (e) => {
                    if (!isDragging) return;
                    touchEndX = e.changedTouches[0].screenX;
                    isDragging = false;
                    handleSwipe();
                }, { passive: true });
            }

            function handleSwipe() {
                const swipeThreshold = 50;
                const swipeDistance = touchStartX - touchEndX;

                if (Math.abs(swipeDistance) > swipeThreshold) {
                    if (swipeDistance > 0) {
                        nextSlide(); // Swipe left - next slide
                    } else {
                        prevSlide(); // Swipe right - previous slide
                    }
                }
            }

            // Initialize the carousel
            initCarousel();

            // Clean up on page unload - no autoplay to stop
        }
    }

});

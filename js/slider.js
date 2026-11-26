/* ============================================
   السلايدر والمعارض
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initTestimonialsSlider();
});

// سلايدر آراء العملاء
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.testimonial-card');
    if (slides.length <= 1) return;

    let currentSlide = 0;
    let autoplayInterval;

    // إنشاء أزرار التنقل
    const navContainer = document.createElement('div');
    navContainer.className = 'slider-nav';
    navContainer.style.cssText = 'display:flex;justify-content:center;gap:10px;margin-top:30px;';

    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    prevBtn.className = 'slider-btn prev';
    prevBtn.style.cssText = 'width:40px;height:40px;border-radius:50%;border:1px solid var(--border-color);background:var(--white);color:var(--primary-color);cursor:pointer;transition:all 0.3s;';

    const dotsContainer = document.createElement('div');
    dotsContainer.style.cssText = 'display:flex;gap:8px;align-items:center;';

    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    nextBtn.className = 'slider-btn next';
    nextBtn.style.cssText = 'width:40px;height:40px;border-radius:50%;border:1px solid var(--border-color);background:var(--white);color:var(--primary-color);cursor:pointer;transition:all 0.3s;';

    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot' + (index === 0 ? ' active' : '');
        dot.style.cssText = 'width:10px;height:10px;border-radius:50%;border:none;background:var(--border-color);cursor:pointer;transition:all 0.3s;';
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    navContainer.appendChild(prevBtn);
    navContainer.appendChild(dotsContainer);
    navContainer.appendChild(nextBtn);
    slider.appendChild(navContainer);

    // تنسيقات CSS إضافية
    const style = document.createElement('style');
    style.textContent = `
        .slider-dot.active { background: var(--primary-color) !important; width: 25px !important; border-radius: 5px !important; }
        .slider-btn:hover { background: var(--primary-color) !important; color: var(--white) !important; border-color: var(--primary-color) !important; }
    `;
    document.head.appendChild(style);

    // إخفاء جميع الشرائح
    slides.forEach((slide, index) => {
        slide.style.display = index === 0 ? 'block' : 'none';
        slide.style.animation = index === 0 ? 'fadeIn 0.5s ease' : '';
    });

    function goToSlide(index) {
        slides[currentSlide].style.display = 'none';
        slides[index].style.display = 'block';
        slides[index].style.animation = 'fadeIn 0.5s ease';

        // تحديث النقاط
        dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentSlide = index;
        resetAutoplay();
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // التشغيل التلقائي
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    startAutoplay();

    // إيقاف التشغيل التلقائي عند التفاعل
    slider.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    slider.addEventListener('mouseleave', startAutoplay);
}

// سلايدر بسيط عام
function createSimpleSlider(containerSelector, options = {}) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const defaults = {
        autoplay: true,
        interval: 5000,
        showNav: true,
        showDots: true
    };

    const settings = { ...defaults, ...options };

    const slides = container.children;
    if (slides.length <= 1) return;

    let current = 0;
    let interval;

    Array.from(slides).forEach((slide, i) => {
        slide.style.display = i === 0 ? 'block' : 'none';
    });

    function show(index) {
        slides[current].style.display = 'none';
        slides[index].style.display = 'block';
        slides[index].style.animation = 'fadeIn 0.5s ease';
        current = index;
    }

    function next() {
        show((current + 1) % slides.length);
    }

    if (settings.autoplay) {
        interval = setInterval(next, settings.interval);
        container.addEventListener('mouseenter', () => clearInterval(interval));
        container.addEventListener('mouseleave', () => {
            interval = setInterval(next, settings.interval);
        });
    }

    return { show, next };
}

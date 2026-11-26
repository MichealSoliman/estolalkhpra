/* ============================================
   تحميل الصور بشكل كسول (Lazy Loading)
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initAdvancedLazyLoad();
});

function initAdvancedLazyLoad() {
    // دعم الصور
    const images = document.querySelectorAll('img[data-src]');

    // دعم الخلفيات
    const bgElements = document.querySelectorAll('[data-bg]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;

                    if (element.tagName === 'IMG') {
                        loadImage(element);
                    }

                    imageObserver.unobserve(element);
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.01
        });

        images.forEach(img => imageObserver.observe(img));

        // مراقب للخلفيات
        const bgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const bgUrl = element.getAttribute('data-bg');

                    if (bgUrl) {
                        const img = new Image();
                        img.onload = () => {
                            element.style.backgroundImage = `url(${bgUrl})`;
                            element.classList.add('bg-loaded');
                        };
                        img.src = bgUrl;
                    }

                    bgObserver.unobserve(element);
                }
            });
        }, {
            rootMargin: '200px 0px'
        });

        bgElements.forEach(el => bgObserver.observe(el));

    } else {
        // Fallback
        images.forEach(loadImage);
        bgElements.forEach(el => {
            const bgUrl = el.getAttribute('data-bg');
            if (bgUrl) el.style.backgroundImage = `url(${bgUrl})`;
        });
    }
}

function loadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;

    // دعم الصور بتنسيق WebP مع fallback
    if (img.hasAttribute('data-srcset')) {
        img.srcset = img.getAttribute('data-srcset');
    }

    img.src = src;
    img.classList.add('loaded');

    img.onload = () => {
        img.removeAttribute('data-src');
        img.removeAttribute('data-srcset');
    };

    img.onerror = () => {
        // Fallback إذا فشلت الصورة
        if (img.hasAttribute('data-fallback')) {
            img.src = img.getAttribute('data-fallback');
        }
    };
}

// وظيفة للتحميل المسبق للصور المهمة
function preloadImages(imageUrls) {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// تحميل الصور المهمة فوراً
preloadImages([
    'images/logo/logo-main.png',
    'images/hero/hero-main.jpg'
]);

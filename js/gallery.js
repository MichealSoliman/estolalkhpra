/* ============================================
   معرض الأعمال واللايت بوكس
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initLightbox();
    initGalleryFilter();
});

// اللايت بوكس
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-masonry-item, .gallery-item');
    if (galleryItems.length === 0) return;

    // إنشاء عناصر اللايت بوكس
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close"><i class="fas fa-times"></i></button>
        <button class="lightbox-nav prev"><i class="fas fa-chevron-right"></i></button>
        <button class="lightbox-nav next"><i class="fas fa-chevron-left"></i></button>
        <div class="lightbox-content">
            <img src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-nav.prev');
    const nextBtn = lightbox.querySelector('.lightbox-nav.next');

    let currentIndex = 0;
    const items = Array.from(galleryItems);

    // فتح اللايت بوكس
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            openLightbox(item);
        });
    });

    function openLightbox(item) {
        const img = item.querySelector('img');
        const title = item.querySelector('h4')?.textContent || '';
        const desc = item.querySelector('p')?.textContent || '';

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.innerHTML = title ? `<strong>${title}</strong>${desc ? `<br>${desc}` : ''}` : '';

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % items.length;
        openLightbox(items[currentIndex]);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        openLightbox(items[currentIndex]);
    }

    // الأحداث
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // لوحة المفاتيح
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                prevImage();
                break;
            case 'ArrowLeft':
                nextImage();
                break;
        }
    });
}

// تصفية المعرض
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    if (filterBtns.length === 0) return;

    const galleryItems = document.querySelectorAll('.gallery-masonry-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // تحديث الأزرار
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // تصفية العناصر
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = '';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

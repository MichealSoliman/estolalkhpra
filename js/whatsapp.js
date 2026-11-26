/* ============================================
   واتساب والأزرار العائمة
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initWhatsAppButton();
    initFloatButtons();
});

// زر واتساب
function initWhatsAppButton() {
    const whatsappBtns = document.querySelectorAll('[data-whatsapp]');

    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            const phone = this.getAttribute('data-phone') || '+966547559437';
            const message = this.getAttribute('data-message') || '';

            let whatsappUrl = `https://wa.me/${phone}`;
            if (message) {
                whatsappUrl += `?text=${encodeURIComponent(message)}`;
            }

            window.open(whatsappUrl, '_blank');

            // تتبع الحدث
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'WhatsApp',
                    event_label: this.textContent.trim()
                });
            }
        });
    });
}

// الأزرار العائمة
function initFloatButtons() {
    const floatButtons = document.querySelector('.float-buttons');
    if (!floatButtons) return;

    // تأخير ظهور الأزرار
    setTimeout(() => {
        floatButtons.style.opacity = '1';
        floatButtons.style.transform = 'translateY(0)';
    }, 2000);

    // الأزرار تبقى ظاهرة دائماً عند التمرير (لا يتم إخفاؤها)
}

// إرسال رسالة واتساب مخصصة
function sendWhatsAppMessage(options = {}) {
    const defaults = {
        phone: '+966547559437',
        message: '',
        preFilled: true
    };

    const settings = { ...defaults, ...options };

    if (settings.preFilled) {
        settings.message = `مرحباً، أتواصل معكم من موقع أسطول الخبراء لخدمات التكييف\n\n${settings.message}`;
    }

    const url = `https://wa.me/${settings.phone}?text=${encodeURIComponent(settings.message)}`;
    window.open(url, '_blank');
}

// زر اتصال سريع
function quickCall() {
    window.location.href = 'tel:0547559437';
}

// مشاركة الصفحة عبر واتساب
function sharePageViaWhatsApp() {
    const url = window.location.href;
    const title = document.title;
    const message = `شاهد هذا: ${title}\n${url}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
}

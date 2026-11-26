/* ============================================
   نموذج الاتصال
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // التحقق من صحة البيانات
        if (!validateForm(this)) {
            return;
        }

        // جمع البيانات
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // إرسال البيانات عبر WhatsApp (بدون خادم)
        sendViaWhatsApp(data);

        // عرض رسالة النجاح
        showFormSuccess(this);

        // إعادة تعيين النموذج
        this.reset();
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        // إزالة الأخطاء السابقة
        field.style.borderColor = '';

        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
            shakeElement(field);
        }

        // التحقق من البريد الإلكتروني
        if (field.type === 'email' && field.value) {
            if (!isValidEmail(field.value)) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            }
        }

        // التحقق من رقم الجوال
        if (field.type === 'tel' && field.value) {
            if (!isValidSaudiPhone(field.value)) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            }
        }
    });

    if (!isValid) {
        showErrorMessage('يرجى ملء جميع الحقول المطلوبة بشكل صحيح', form);
    }

    return isValid;
}

function sendViaWhatsApp(data) {
    const phone = '+966547559437';
    let message = '*طلب تواصل جديد من الموقع*\n\n';

    if (data.name) message += `*الاسم:* ${data.name}\n`;
    if (data.phone) message += `*رقم الجوال:* ${data.phone}\n`;
    if (data.email) message += `*البريد الإلكتروني:* ${data.email}\n`;
    if (data.service) message += `*الخدمة المطلوبة:* ${data.service}\n`;
    if (data.message) message += `*الرسالة:*\n${data.message}\n`;

    message += `\n*التاريخ:* ${new Date().toLocaleString('ar-SA')}`;

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function showFormSuccess(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.style.cssText = 'background: #d4edda; color: #155724; padding: 20px; border-radius: 12px; margin-bottom: 25px; border: 1px solid #c3e6cb; text-align: center;';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
        <strong style="font-size: 1.1rem; display: block; margin-bottom: 5px;">تم إرسال رسالتك بنجاح!</strong>
        <span>سنتواصل معك في أقرب وقت ممكن</span>
    `;

    form.insertBefore(successDiv, form.firstChild);

    // إزالة الرسالة بعد 5 ثواني
    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transition = 'opacity 0.5s';
        setTimeout(() => successDiv.remove(), 500);
    }, 5000);
}

// الاهتزاز
function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// التحقق من البريد
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// التحقق من رقم الجوال السعودي
function isValidSaudiPhone(phone) {
    const clean = phone.replace(/\s/g, '');
    const re = /^(05|5)[0-9]{8}$/;
    return re.test(clean);
}

// عرض رسالة خطأ
function showErrorMessage(message, container) {
    const existing = container.querySelector('.form-error');
    if (existing) existing.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = 'background: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #f5c6cb;';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;

    container.insertBefore(errorDiv, container.firstChild);

    setTimeout(() => {
        errorDiv.style.opacity = '0';
        errorDiv.style.transition = 'opacity 0.5s';
        setTimeout(() => errorDiv.remove(), 500);
    }, 5000);
}

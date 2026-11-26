/* ============================================
   الأسئلة الشائعة
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
    initFAQSearch();
    initFAQCategories();
});

// تفعيل الأسئلة
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item, .faq-item-page');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question, .faq-question-page');
        if (!question) return;

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // إغلاق جميع الأسئلة في نفس المجموعة
            const parent = item.closest('.faq-list');
            if (parent) {
                parent.querySelectorAll('.faq-item, .faq-item-page').forEach(i => {
                    i.classList.remove('active');
                });
            }

            // فتح/إغلاق السؤال الحالي
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// البحث في الأسئلة
function initFAQSearch() {
    const searchInput = document.querySelector('.faq-search input');
    if (!searchInput) return;

    const faqItems = document.querySelectorAll('.faq-item, .faq-item-page');
    const noResults = document.querySelector('.no-results');

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        let visibleCount = 0;

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question, .faq-question-page');
            const answer = item.querySelector('.faq-answer, .faq-answer-page');

            const questionText = question ? question.textContent.toLowerCase() : '';
            const answerText = answer ? answer.textContent.toLowerCase() : '';

            if (questionText.includes(query) || answerText.includes(query)) {
                item.style.display = '';
                visibleCount++;

                // تمييز النص المطابق
                if (query.length > 2) {
                    highlightText(item, query);
                } else {
                    removeHighlight(item);
                }
            } else {
                item.style.display = 'none';
            }
        });

        // عرض/إخفاء رسالة لا توجد نتائج
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    });
}

// تصنيفات الأسئلة
function initFAQCategories() {
    const categoryBtns = document.querySelectorAll('.faq-category-btn');
    if (categoryBtns.length === 0) return;

    const faqSections = document.querySelectorAll('[data-category]');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // تحديث الأزرار
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // تصفية الأقسام
            faqSections.forEach(section => {
                if (category === 'all' || section.getAttribute('data-category') === category) {
                    section.style.display = '';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });
}

// تمييز النص
function highlightText(element, query) {
    // يمكن تنفيذ التمييز باستخدام mark.js أو يدوياً
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const textNodes = [];
    let node;

    while (node = walker.nextNode()) {
        if (node.nodeValue.toLowerCase().includes(query)) {
            textNodes.push(node);
        }
    }

    textNodes.forEach(node => {
        const span = document.createElement('span');
        span.className = 'highlight';
        span.style.cssText = 'background: rgba(72, 201, 176, 0.3); padding: 2px 0; border-radius: 2px;';

        const regex = new RegExp(`(${query})`, 'gi');
        const parts = node.nodeValue.split(regex);

        parts.forEach((part, i) => {
            if (part.toLowerCase() === query) {
                const mark = document.createElement('mark');
                mark.style.cssText = 'background: rgba(72, 201, 176, 0.4); padding: 2px 4px; border-radius: 3px;';
                mark.textContent = part;
                node.parentNode.insertBefore(mark, node);
            } else {
                node.parentNode.insertBefore(document.createTextNode(part), node);
            }
        });

        node.parentNode.removeChild(node);
    });
}

function removeHighlight(element) {
    element.querySelectorAll('mark').forEach(mark => {
        const text = document.createTextNode(mark.textContent);
        mark.parentNode.replaceChild(text, mark);
    });

    // تطبيع النصوص
    element.normalize();
}

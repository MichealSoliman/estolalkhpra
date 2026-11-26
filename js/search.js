/* ============================================
   البحث
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initSearch();
});

function initSearch() {
    const searchForms = document.querySelectorAll('.search-form');

    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('input').value.trim();

            if (query) {
                performSearch(query);
            }
        });
    });
}

function performSearch(query) {
    // يمكن إضافة صفحة نتائج البحث أو البحث في الموقع الحالي
    console.log('بحث عن:', query);

    // البحث في المحتوى الحالي
    const content = document.querySelector('.content-wrapper, .article-wrapper, .service-content-wrapper');
    if (content) {
        highlightSearchResults(content, query);
    }
}

function highlightSearchResults(container, query) {
    // إزالة التمييز السابق
    container.querySelectorAll('mark.search-highlight').forEach(mark => {
        const text = document.createTextNode(mark.textContent);
        mark.parentNode.replaceChild(text, mark);
    });
    container.normalize();

    if (query.length < 2) return;

    const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const textNodes = [];
    let node;

    while (node = walker.nextNode()) {
        if (node.nodeValue.toLowerCase().includes(query.toLowerCase())) {
            textNodes.push(node);
        }
    }

    textNodes.forEach(node => {
        const regex = new RegExp(`(${query})`, 'gi');
        const parts = node.nodeValue.split(regex);

        parts.forEach(part => {
            if (regex.test(part)) {
                const mark = document.createElement('mark');
                mark.className = 'search-highlight';
                mark.style.cssText = 'background: rgba(243, 156, 18, 0.4); padding: 2px 4px; border-radius: 3px;';
                mark.textContent = part;
                node.parentNode.insertBefore(mark, node);
            } else {
                node.parentNode.insertBefore(document.createTextNode(part), node);
            }
        });

        node.parentNode.removeChild(node);
    });

    // التمرير إلى أول نتيجة
    const firstResult = container.querySelector('mark.search-highlight');
    if (firstResult) {
        firstResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

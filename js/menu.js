/* ============================================
   القائمة والتنقل
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initDropdowns();
    initActiveLink();
});

// القائمة المتنقلة
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.createElement('div');

    if (!menuBtn || !navMenu) return;

    overlay.className = 'menu-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:998;opacity:0;visibility:hidden;transition:all 0.3s;';
    document.body.appendChild(overlay);

    menuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');

        if (navMenu.classList.contains('active')) {
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
            document.body.style.overflow = 'hidden';

            // تحويل الزر إلى X
            menuBtn.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            menuBtn.children[1].style.opacity = '0';
            menuBtn.children[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            closeMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);

    function closeMenu() {
        navMenu.classList.remove('active');
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        document.body.style.overflow = '';

        menuBtn.children[0].style.transform = '';
        menuBtn.children[1].style.opacity = '1';
        menuBtn.children[2].style.transform = '';
    }

    // إغلاق القائمة عند النقر على رابط
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 991) {
                closeMenu();
            }
        });
    });

    // إغلاق القائمة عند تغيير حجم النافذة
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            closeMenu();
        }
    });
}

// القوائم المنسدلة للجوال
function initDropdowns() {
    const dropdownTriggers = document.querySelectorAll('.nav-menu > li > a i');

    dropdownTriggers.forEach(trigger => {
        const parentLink = trigger.closest('a');
        const dropdown = parentLink.nextElementSibling;

        if (!dropdown || !dropdown.classList.contains('dropdown')) return;

        parentLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                dropdown.classList.toggle('show');
            }
        });
    });
}

// الرابط النشط
function initActiveLink() {
    const normalize = p => p.replace(/index\.html$/, '').replace(/\/?$/, '/');
    const currentPath = normalize(window.location.pathname);

    document.querySelectorAll('.nav-menu a').forEach(link => {
        const linkPath = normalize(new URL(link.href, window.location.origin).pathname);
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
}

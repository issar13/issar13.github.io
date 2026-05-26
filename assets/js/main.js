"use strict";

document.addEventListener('DOMContentLoaded', function () {

    // ======= AOS =======
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 650, once: true, offset: 55, easing: 'ease-out-cubic' });
    }

    // ======= Typed.js =======
    if (typeof Typed !== 'undefined' && document.getElementById('typed-subtitle')) {
        new Typed('#typed-subtitle', {
            strings: [
                'Realtime Systems',
                'Communication Infrastructure',
                'Backend Architecture',
                'Distributed Systems',
                'Fullstack Product Engineering',
            ],
            typeSpeed: 60,
            backSpeed: 32,
            backDelay: 2200,
            loop: true,
            smartBackspace: true,
        });
    }

    // ======= Scroll Progress Bar =======
    var progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', function () {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        }, { passive: true });
    }

    // ======= Bootstrap Tooltips =======
    var tooltipEls = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipEls.forEach(function (el) {
        if (typeof bootstrap !== 'undefined') new bootstrap.Tooltip(el);
    });

});

// ======= Project Card Expand / Collapse =======
function toggleProject(btn) {
    var body = btn.closest('.project-card-body');
    var details = body.querySelector('.project-details');
    var expandText = btn.querySelector('.expand-text');
    var isOpen = details.style.display !== 'none' && details.style.display !== '';

    if (isOpen) {
        details.style.display = 'none';
        expandText.textContent = 'View Engineering Details';
        btn.classList.remove('active');
    } else {
        details.style.display = 'block';
        expandText.textContent = 'Hide Details';
        btn.classList.add('active');
    }
}

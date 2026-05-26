"use strict";

// ======= Network Background Canvas =======
(function () {
    var canvas = document.getElementById('network-bg');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var NODES = 60, LINK_DIST = 140, COLOR = '167,139,250';
    var nodes = [];

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function initNodes() {
        nodes = [];
        for (var i = 0; i < NODES; i++) {
            nodes.push({
                x:  Math.random() * canvas.width,
                y:  Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r:  Math.random() * 1.5 + 1,
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var i, j, n, dx, dy, dist, alpha;

        for (i = 0; i < nodes.length; i++) {
            for (j = i + 1; j < nodes.length; j++) {
                dx   = nodes[i].x - nodes[j].x;
                dy   = nodes[i].y - nodes[j].y;
                dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < LINK_DIST) {
                    alpha = 0.16 * (1 - dist / LINK_DIST);
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(' + COLOR + ',' + alpha + ')';
                    ctx.lineWidth   = 0.7;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        for (i = 0; i < nodes.length; i++) {
            n = nodes[i];
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + COLOR + ',0.4)';
            ctx.fill();
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
            if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', function () { resize(); initNodes(); });
    resize();
    initNodes();
    draw();
})();

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

// ======= Section Card Collapse / Expand =======
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.card-tab').forEach(function (tab) {
        tab.addEventListener('click', function () {
            var inner = tab.closest('.section-inner');
            var body  = inner && inner.querySelector('.card-body');
            if (!inner || !body) return;

            if (inner.classList.contains('collapsed')) {
                // Expand: set explicit height so transition has a target
                inner.classList.remove('collapsed');
                body.style.height = body.scrollHeight + 'px';
                body.addEventListener('transitionend', function done() {
                    body.style.height = 'auto';
                    body.removeEventListener('transitionend', done);
                });
            } else {
                // Collapse: pin current height, then animate to 0
                body.style.height = body.scrollHeight + 'px';
                body.offsetHeight; // force reflow
                body.style.height = '0';
                inner.classList.add('collapsed');
            }
        });
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

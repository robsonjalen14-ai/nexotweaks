// Checkout
async function checkout(product) {
    const btn = event.target;
    btn.classList.add('loading');
    btn.textContent = '';
    try {
        const res = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({product})
        });
        const data = await res.json();
        if (data.url) {
            window.location.href = data.url;
        } else {
            window.location.href = 'https://nxotweaks.sellhub.cx';
        }
    } catch (e) {
        window.location.href = 'https://nxotweaks.sellhub.cx';
    }
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) t.scrollIntoView({behavior:'smooth',block:'start'});
    });
});

// Scroll progress bar
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = (window.scrollY / h) * 100;
    scrollProgress.style.width = p + '%';
}
window.addEventListener('scroll', updateScrollProgress, {passive: true});

// Cursor glow
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
        nav.style.background = 'rgba(6,10,16,.92)';
    } else {
        nav.classList.remove('scrolled');
        nav.style.background = '';
    }
}, {passive: true});

// Fade in on scroll
const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            fadeObs.unobserve(e.target);
        }
    });
}, {threshold: 0.05, rootMargin: '0px 0px -30px 0px'});

document.querySelectorAll('[data-fade]').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.06 + 's';
    fadeObs.observe(el);
});

// Animate result bars
const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.rcard-fill').forEach(bar => {
                const w = bar.style.width;
                bar.style.width = '0%';
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        bar.style.width = w;
                    });
                });
            });
            barObs.unobserve(e.target);
        }
    });
}, {threshold: 0.3});
document.querySelectorAll('.rcard').forEach(el => barObs.observe(el));

// Count up animation
const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const el = e.target;
            const target = parseInt(el.dataset.count);
            const suffix = el.dataset.suffix || '+';
            let current = 0;
            const duration = 1500;
            const step = target / (duration / 16);
            function tick() {
                current += step;
                if (current >= target) {
                    el.textContent = target + suffix;
                } else {
                    el.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(tick);
                }
            }
            tick();
            countObs.unobserve(el);
        }
    });
}, {threshold: 0.5});
document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

// Duplicate ticker for infinite loop
const tickerTrack = document.querySelector('.ticker-track');
if (tickerTrack) {
    const clone = tickerTrack.innerHTML;
    tickerTrack.innerHTML += clone;
}

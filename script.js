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

// Stat counter
const statObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            document.querySelectorAll('.stat-num').forEach(el => {
                const target = +el.dataset.count;
                const duration = 1500;
                const step = target / (duration / 16);
                let current = 0;
                const tick = () => {
                    current += step;
                    if (current < target) {
                        el.textContent = Math.floor(current);
                        requestAnimationFrame(tick);
                    } else {
                        el.textContent = target;
                    }
                };
                tick();
            });
            statObs.disconnect();
        }
    });
}, {threshold: 0.5});

const statsEl = document.querySelector('.stats-bar');
if (statsEl) statObs.observe(statsEl);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
});

// Fade in
const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
        }
    });
}, {threshold: 0.08});

document.querySelectorAll('.product-card,.result-card,.review-card,.faq-item').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity .5s ease ${i * 0.06}s, transform .5s ease ${i * 0.06}s`;
    fadeObs.observe(el);
});

// Animate result bars on scroll
const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.bar-fill').forEach(bar => {
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

document.querySelectorAll('.result-card').forEach(el => barObs.observe(el));

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

// Fade in on scroll
const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            fadeObs.unobserve(e.target);
        }
    });
}, {threshold: 0.06});

document.querySelectorAll('.pcard,.rcard,.vouch,.faq-item').forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = (i * 0.05) + 's';
    fadeObs.observe(el);
});

// Animate result bars on scroll
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

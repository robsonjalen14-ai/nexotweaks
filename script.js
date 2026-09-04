// Particles
const pc=document.getElementById('particles');
const colors=['#00d2d3','#6c5ce7','#48dbfb','#f9ca24'];
for(let i=0;i<40;i++){const p=document.createElement('div');p.className='particle';const c=colors[Math.floor(Math.random()*colors.length)];const s=Math.random()*4+2;p.style.cssText=`left:${Math.random()*100}%;width:${s}px;height:${s}px;background:${c};box-shadow:0 0 ${s*2}px ${c};animation-duration:${Math.random()*15+10}s;animation-delay:${Math.random()*10}s`;pc.appendChild(p)}

// FAQ
document.querySelectorAll('.faq-question').forEach(b=>b.addEventListener('click',()=>{const i=b.parentElement;const w=i.classList.contains('active');document.querySelectorAll('.faq-item').forEach(x=>x.classList.remove('active'));if(!w)i.classList.add('active')}));

// Stats Counter
const io=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){document.querySelectorAll('.stat-number').forEach(s=>{const t=+s.dataset.target;const d=2000;const st=t/(d/16);let c=0;const u=()=>{c+=st;if(c<t){s.textContent=Math.floor(c).toLocaleString();requestAnimationFrame(u)}else{s.textContent=t.toLocaleString()}};u()});io.disconnect()}})},{threshold:.5});
const ss=document.querySelector('.stats');if(ss)io.observe(ss);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth',block:'start'})}));

// Navbar
let lastScroll=0;
window.addEventListener('scroll',()=>{const n=document.querySelector('.navbar');const s=window.scrollY;n.style.background=s>50?'rgba(6,11,20,0.92)':'rgba(6,11,20,0.7)';lastScroll=s});

// FPS Counter in hero (subtle)
const hero=document.querySelector('.hero-visual');
if(hero){setInterval(()=>{const glow=document.querySelector('.hero-logo-glow');if(glow){glow.style.opacity=Math.random()*.4+.6}},2000)}

// Intersection Observer for fade-in
const fadeObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)'}})},{threshold:.1});

document.querySelectorAll('.product-card,.feature-card,.review-card,.faq-item').forEach(el=>{
    el.style.opacity='0';el.style.transform='translateY(30px)';el.style.transition='opacity .6s ease,transform .6s ease';
    fadeObserver.observe(el)
});

// Stagger animation delays
document.querySelectorAll('.product-card').forEach((el,i)=>el.style.transitionDelay=`${i*0.1}s`);
document.querySelectorAll('.feature-card').forEach((el,i)=>el.style.transitionDelay=`${i*0.08}s`);

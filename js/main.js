/* ============================================
   IMPULSE FITNESS CLUB™ — JAVASCRIPT
   ============================================ */

// ---- Preloader ----
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
            
            // Trigger Hero Counters immediately after preloader starts hiding
            const heroStats = document.querySelector('.hero-stats');
            if (heroStats) {
                setTimeout(() => triggerCounters(heroStats), 400);
            }
            
            setTimeout(() => { preloader.remove(); }, 600);
        }
    }, 1900);
});


// ---- Navbar Scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    // Back to top
    const btn = document.getElementById('backToTop');
    if (btn) {
        btn.classList.toggle('visible', window.scrollY > 400);
    }
});

// ---- Hamburger Menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navClose = document.getElementById('navClose');

hamburger?.addEventListener('click', () => {
    hamburger.classList.add('active');
    navLinks.classList.add('open');
});

navClose?.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
});

// Close nav on link click
navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ---- Back to Top ----
document.getElementById('backToTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Hero Particles ----
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = window.innerWidth < 768 ? 15 : 30;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = Math.random() * 100 + 'vw';
        p.style.width = p.style.height = (Math.random() * 4 + 1) + 'px';
        p.style.animationDuration = (Math.random() * 12 + 8) + 's';
        p.style.animationDelay = (Math.random() * 8) + 's';
        p.style.opacity = (Math.random() * 0.5 + 0.2).toString();
        container.appendChild(p);
    }
}
createParticles();

// ---- Scroll Reveal ----
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- Counter Animation ----
function animateCounter(el, target, duration = 2000) {
    let startTimestamp = null;
    const startValue = 0;
    
    function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (target - startValue) + startValue);
        el.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            el.textContent = target.toLocaleString();
        }
    }
    window.requestAnimationFrame(step);
}

// Function to trigger counters in a container
function triggerCounters(container) {
    if (container.dataset.animated) return;
    container.dataset.animated = 'true';
    container.querySelectorAll('.hero-stat-num, .counter').forEach(el => {
        const target = parseInt(el.dataset.target);
        if (!isNaN(target)) animateCounter(el, target, 2000);
    });
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            triggerCounters(entry.target);
        }
    });
}, { threshold: 0.15 });

// Observe section stats only (Hero will be triggered by preloader)
document.querySelectorAll('.stats-row').forEach(el => {
    counterObserver.observe(el);
});



// ---- Active Nav Link Highlighting ----
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinksList.forEach(link => link.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ---- Smooth scrolling for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ---- Testimonials Swiper ----
if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonials-swiper', {
        loop: true,
        autoplay: { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true },
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
        },
        effect: 'slide',
    });
}

// ---- Training Programs Swiper (Mobile Only) ----
if (typeof Swiper !== 'undefined') {
    new Swiper('.programs-swiper', {
        loop: true,
        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.programs-pagination',
            clickable: true
        },
        breakpoints: {
            // On desktop, disable swiping and show as grid
            992: {
                slidesPerView: 3,
                spaceBetween: 30,
                allowTouchMove: false,
                autoplay: false,
            }
        },
        on: {
            init: function () {
                if (window.innerWidth >= 992) {
                    this.autoplay.stop();
                }
            },
            resize: function () {
                if (window.innerWidth >= 992) {
                    this.autoplay.stop();
                } else {
                    this.autoplay.start();
                }
            }
        }
    });
}


// ---- Expert Trainers Swiper (Mobile Only) ----
if (typeof Swiper !== 'undefined') {
    new Swiper('.trainers-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.trainers-pagination',
            clickable: true
        },
        breakpoints: {
            // On desktop, show as grid
            992: {
                slidesPerView: 4,
                spaceBetween: 30,
                allowTouchMove: false,
                autoplay: false,
            }
        },
        on: {
            init: function () {
                if (window.innerWidth >= 992) {
                    this.autoplay.stop();
                }
            },
            resize: function () {
                if (window.innerWidth >= 992) {
                    this.autoplay.stop();
                } else {
                    this.autoplay.start();
                }
            }
        }
    });
}

// ---- Transformations Swiper (Mobile Only) ----
if (typeof Swiper !== 'undefined') {
    new Swiper('.transformations-swiper', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.transformations-pagination',
            clickable: true
        },
        breakpoints: {
            // On desktop, show as grid
            992: {
                slidesPerView: 3,
                spaceBetween: 30,
                allowTouchMove: false,
                autoplay: false,
            }
        },
        on: {
            init: function () {
                if (window.innerWidth >= 992) {
                    this.autoplay.stop();
                }
            },
            resize: function () {
                if (window.innerWidth >= 992) {
                    this.autoplay.stop();
                } else {
                    this.autoplay.start();
                }
            }
        }
    });
}

if (typeof GLightbox !== 'undefined') {
    // Equipment lightbox
    GLightbox({
        selector: '.equip-img.glightbox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: false,
        openEffect: 'zoom',
        closeEffect: 'fade',
    });
    // Achievements lightbox
    GLightbox({
        selector: '.gallery-item.glightbox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: false,
        openEffect: 'zoom',
        closeEffect: 'fade',
    });
}

// ---- Gallery Pause on hover ----
const galleryTrack = document.getElementById('galleryTrack');
if (galleryTrack) {
    galleryTrack.addEventListener('mouseenter', () => {
        galleryTrack.style.animationPlayState = 'paused';
    });
    galleryTrack.addEventListener('mouseleave', () => {
        galleryTrack.style.animationPlayState = 'running';
    });
}

// ---- Enquiry Form Handler ----
const form = document.getElementById('enquiryForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('formName')?.value.trim();
        const phone = document.getElementById('formPhone')?.value.trim();
        const program = document.getElementById('formProgram')?.value;
        const message = document.getElementById('formMessage')?.value.trim();
        if (!name || !phone) {
            showToast('Please fill in your name and phone number.', 'error');
            return;
        }
        const text = `Hi Impulse Fitness Club! 👋\n\nName: ${name}\nPhone: ${phone}\nProgram: ${program || 'General Enquiry'}\nMessage: ${message || 'I would like more information.'}`;
        const waUrl = `https://wa.me/919999999999?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank');
        showToast('Redirecting to WhatsApp... 💪', 'success');
        form.reset();
    });
}

function showToast(msg, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = msg;
    Object.assign(toast.style, {
        position: 'fixed', bottom: '110px', left: '50%',
        transform: 'translateX(-50%)',
        background: type === 'success' ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'linear-gradient(135deg,#E30613,#a00009)',
        color: '#fff', padding: '12px 28px',
        borderRadius: '50px', fontWeight: '700',
        zIndex: '9999', fontSize: '0.9rem',
        boxShadow: '0 5px 25px rgba(0,0,0,0.4)',
        animation: 'toast-in 0.3s ease',
    });
    const style = document.createElement('style');
    style.textContent = `@keyframes toast-in { from{opacity:0;transform:translateX(-50%) translateY(20px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }`;
    document.head.appendChild(style);
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// ---- Parallax Hero ----
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-section');
    if (hero && window.scrollY < window.innerHeight) {
        hero.style.backgroundPositionY = `${window.scrollY * 0.4}px`;
    }
});

// ---- Add staggered reveal for grid children ----
document.querySelectorAll('.equipment-grid, .programs-grid, .trainers-grid, .transforms-grid, .plans-grid').forEach(grid => {
    grid.querySelectorAll('.reveal').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
    });
});

// ---- Trainer card tilt effect ----
document.querySelectorAll('.trainer-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
        card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ---- Equipment card tilt ----
document.querySelectorAll('.equip-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
        card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ---- Nav active link style ----
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--red) !important; } .nav-link.active::after { transform: scaleX(1) !important; }`;
document.head.appendChild(style);

console.log('%c IMPULSE FITNESS CLUB™ ', 'background:#E30613;color:#fff;font-size:18px;font-weight:bold;padding:10px 20px;');
console.log('%c Built with 💪 for Champions ', 'color:#E30613;font-size:12px;');

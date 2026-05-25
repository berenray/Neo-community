// ── COUNTDOWN TIMER ──────────────────────────────────────────
(function () {
  const key = 'sf_timer_end';
  let end = localStorage.getItem(key);
  if (!end) {
    end = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(key, end);
  } else {
    end = parseInt(end);
  }

  const hEl = document.getElementById('t-hours');
  const mEl = document.getElementById('t-min');
  const sEl = document.getElementById('t-sec');

  function tick() {
    const diff = end - Date.now();
    if (diff <= 0) {
      hEl.textContent = '00';
      mEl.textContent = '00';
      sEl.textContent = '00';
      return;
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    hEl.textContent = String(h).padStart(2, '0');
    mEl.textContent = String(m).padStart(2, '0');
    sEl.textContent = String(s).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
})();

// ── SMOOTH SCROLL ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ── WATCHERS COUNTER (fake live) ─────────────────────────────
const watchersEl = document.querySelector('.price__watchers strong');
if (watchersEl) {
  let base = 21;
  setInterval(() => {
    base = Math.max(18, Math.min(31, base + Math.round((Math.random() - 0.48) * 2)));
    watchersEl.textContent = base + ' человек';
  }, 8000);
}

// ── SCROLL REVEAL ─────────────────────────────────────────────
(function () {
  // Добавляем классы reveal к элементам
  const revealSelectors = [
    { sel: '.section-title',        cls: 'reveal' },
    { sel: '.badge',                cls: 'reveal' },
    { sel: '.hero__sub',            cls: 'reveal', delay: 1 },
    { sel: '.hero__desc',           cls: 'reveal', delay: 2 },
    { sel: '.hero__btns',           cls: 'reveal', delay: 3 },
    { sel: '.manifest__title-col',  cls: 'reveal-left' },
    { sel: '.manifest__text-col',   cls: 'reveal-right' },
    { sel: '.hard__sub',            cls: 'reveal' },
    { sel: '.hard__footer',         cls: 'reveal' },
    { sel: '.card--dark',           cls: 'reveal' },
    { sel: '.card--yellow-top',     cls: 'reveal' },
    { sel: '.check-item',           cls: 'reveal' },
    { sel: '.program__item',        cls: 'reveal' },
    { sel: '.founder-card',         cls: 'reveal' },
    { sel: '.compare__table-wrap',  cls: 'reveal' },
    { sel: '.compare__note',        cls: 'reveal' },
    { sel: '.price__live',          cls: 'reveal-left' },
    { sel: '.price__tiers',         cls: 'reveal-left', delay: 1 },
    { sel: '.price__timer-box',     cls: 'reveal-right' },
    { sel: '.faq__item',            cls: 'reveal' },
    { sel: '.final-cta__inner',     cls: 'reveal' },
    { sel: '.results__sub',         cls: 'reveal' },
  ];

  revealSelectors.forEach(({ sel, cls, delay }) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      // Не перезаписываем если уже есть reveal класс
      if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
        el.classList.add(cls);
        if (delay) el.classList.add(`reveal-delay-${delay}`);
        // Stagger для списков
        else if (i > 0 && i <= 4) el.classList.add(`reveal-delay-${i}`);
      }
    });
  });

  // IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
})();

// ── HERO PARALLAX ─────────────────────────────────────────────
(function () {
  const photo = document.querySelector('.hero__photo');
  if (!photo) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    photo.style.transform = `translateY(${y * 0.06}px)`;
  }, { passive: true });
})();

// ── CURSOR GLOW (subtle) ──────────────────────────────────────
(function () {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(245,210,0,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
    left: -999px; top: -999px;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
})();

// ── NUMBER COUNTER ANIMATION ──────────────────────────────────
(function () {
  const counters = [
    { el: document.querySelector('.price__counter'), target: 8, suffix: ' / 30' },
  ];

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const item = counters.find(c => c.el === entry.target);
      if (!item) return;
      let start = 0;
      const step = () => {
        start++;
        item.el.textContent = start + item.suffix;
        if (start < item.target) setTimeout(step, 80);
      };
      step();
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => { if (c.el) obs.observe(c.el); });
})();

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

// Hero pointer glow
const hero = document.querySelector('.hero');
const glow = document.querySelector('.hero-glow');
if (hero && glow && window.matchMedia('(pointer:fine)').matches) {
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    glow.style.setProperty('--mx', `${e.clientX - r.left}px`);
    glow.style.setProperty('--my', `${e.clientY - r.top}px`);
    glow.style.opacity = '1';
  });
  hero.addEventListener('pointerleave', () => { glow.style.opacity = '0'; });
}

// Nav scrollspy
const navLinks = [...document.querySelectorAll('.nav-links a.link')];
const sections = navLinks
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);
if (sections.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s));
}

// Footer year
const copy = document.querySelector('.footer-copy');
if (copy) copy.innerHTML = copy.innerHTML.replace('2026', new Date().getFullYear());

// Scroll progress bar
const prog = document.getElementById('scrollProg');
if (prog) {
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    prog.style.width = max > 0 ? `${(h.scrollTop / max) * 100}%` : '0%';
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Hero focus rotator
const rotator = document.getElementById('rotator');
if (rotator) {
  const words = ['building agentic AI systems', 'shipping RAG pipelines', 'engineering ML platforms', 'designing data infrastructure'];
  let i = 0;
  setInterval(() => {
    rotator.style.opacity = '0';
    setTimeout(() => {
      i = (i + 1) % words.length;
      rotator.textContent = words[i];
      rotator.style.opacity = '1';
    }, 300);
  }, 2800);
}

// Copy email to clipboard
const copyBtn = document.getElementById('copyEmail');
if (copyBtn) {
  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const email = 'parameshwarananandhakumar@gmail.com';
    const done = () => {
      copyBtn.textContent = 'copied';
      copyBtn.classList.add('done');
      setTimeout(() => { copyBtn.textContent = 'copy'; copyBtn.classList.remove('done'); }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(done).catch(done);
    } else {
      done();
    }
  });
}

/* ============================================
   INBARASAN J P — GALAXY PORTFOLIO JS
   ============================================ */

// ---- Starfield ----
(function () {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let W, H, stars = [], nebulas = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < 220; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.2,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.15 + 0.03,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
      });
    }
    nebulas = [];
    const colors = ['rgba(124,58,237,', 'rgba(56,189,248,', 'rgba(168,85,247,'];
    for (let i = 0; i < 5; i++) {
      nebulas.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 200 + 150,
        alpha: Math.random() * 0.07 + 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    nebulas.forEach(n => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      g.addColorStop(0, n.color + n.alpha + ')');
      g.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.fillStyle = g;
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    });

    stars.forEach(s => {
      s.alpha += s.twinkleSpeed * s.twinkleDir;
      if (s.alpha >= 1 || s.alpha <= 0.1) s.twinkleDir *= -1;
      s.y -= s.speed;
      if (s.y < 0) { s.y = H; s.x = Math.random() * W; }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 210, 255, ${s.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  resize();
  initStars();
  draw();
  window.addEventListener('resize', () => { resize(); initStars(); });
})();

// ---- Cursor Glow ----
(function () {
  const glow = document.getElementById('cursorGlow');
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
})();

// ---- Navbar Scroll ----
(function () {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
})();

// ---- Hamburger Menu ----
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
})();

// ---- Scroll Reveal ----
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

// ---- Active Nav Link on Scroll ----
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

// ---- Contact Form ----
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
    setTimeout(() => {
      btn.textContent = 'Send Message ✦';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
})();

// ---- Smooth Parallax for orbs ----
(function () {
  const orb1 = document.querySelector('.orb1');
  const orb2 = document.querySelector('.orb2');
  if (!orb1 || !orb2) return;
  window.addEventListener('mousemove', e => {
    const dx = (e.clientX / window.innerWidth - 0.5) * 30;
    const dy = (e.clientY / window.innerHeight - 0.5) * 30;
    orb1.style.transform = `translate(${dx}px, ${dy}px)`;
    orb2.style.transform = `translate(${-dx}px, ${-dy}px)`;
  });
})();

// ---- Typing effect for hero tagline ----
(function () {
  const el = document.querySelector('.hero-tagline');
  if (!el) return;
  const html = el.innerHTML;
  el.innerHTML = '';
  el.style.opacity = '1';

  let i = 0;
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent;
  const speed = 28;

  // Re-render as HTML after short delay  
  setTimeout(() => {
    el.innerHTML = html;
  }, 1500);
})();

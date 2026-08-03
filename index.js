document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded — showing static content.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  initHeader();
  initHeroAnimations();
  initScrollReveals();
  initSkillCards();
  initTimeline();
  initProjectCards();
  initCounterAnimation();
  initParticleCanvas();
  initCursorGlow();
  initMobileMenu();
  initActiveNavLink();
});

function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.hero__badge', { y: 30, opacity: 0, duration: 0.8 })
    .from('.hero__greeting', { y: 40, opacity: 0, duration: 0.8 }, '-=0.5')
    .from('.hero__name', { y: 50, opacity: 0, duration: 1, scale: 0.95 }, '-=0.6')
    .from('.hero__role', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
    .from('.hero__desc', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
    .from('.hero__cta', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
    .from('.hero__meta span', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.3')
    .from('.hero__socials a', { x: 30, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.4')
    .from('.hero__scroll', { opacity: 0, duration: 0.6 }, '-=0.2');
}

function initScrollReveals() {
  gsap.utils.toArray('.reveal-up').forEach((el) => {
    if (el.closest('.hero')) return;
    gsap.fromTo(
      el,
      { y: 60, opacity: 0 },
      {
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
      }
    );
  });

  gsap.utils.toArray('.reveal-left').forEach((el) => {
    gsap.fromTo(
      el,
      { x: -80, opacity: 0 },
      {
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      }
    );
  });

  gsap.utils.toArray('.reveal-right').forEach((el) => {
    gsap.fromTo(
      el,
      { x: 80, opacity: 0 },
      {
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      }
    );
  });

  gsap.utils.toArray('.section-header').forEach((el) => {
    const tag = el.querySelector('.section-tag');
    const title = el.querySelector('.section-title');
    const subtitle = el.querySelector('.section-subtitle');

    if (tag) {
      gsap.fromTo(tag, { y: 20, opacity: 0 }, {
        scrollTrigger: { trigger: el, start: 'top 90%' },
        y: 0, opacity: 1, duration: 0.6,
      });
    }
    if (title) {
      gsap.fromTo(title, { y: 30, opacity: 0 }, {
        scrollTrigger: { trigger: el, start: 'top 90%' },
        y: 0, opacity: 1, duration: 0.8, delay: 0.1,
      });
    }
    if (subtitle) {
      gsap.fromTo(subtitle, { y: 20, opacity: 0 }, {
        scrollTrigger: { trigger: el, start: 'top 90%' },
        y: 0, opacity: 1, duration: 0.6, delay: 0.2,
      });
    }
  });
}

function initSkillCards() {
  gsap.utils.toArray('.skill-category').forEach((category) => {
    const cards = category.querySelectorAll('.skill-card');
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        scrollTrigger: { trigger: category, start: 'top 85%', toggleActions: 'play none none none' },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.4)',
      }
    );
  });
}

function initTimeline() {
  document.querySelectorAll('.timeline__item').forEach((item, i) => {
    const marker = item.querySelector('.timeline__marker');
    const card = item.querySelector('.timeline__card');

    if (marker) {
      gsap.fromTo(marker, { scale: 0 }, {
        scrollTrigger: { trigger: item, start: 'top 85%' },
        scale: 1, duration: 0.5, ease: 'back.out(2)', delay: i * 0.15,
      });
    }
    if (card) {
      gsap.fromTo(card, { x: 50, opacity: 0 }, {
        scrollTrigger: { trigger: item, start: 'top 85%' },
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.15 + 0.1,
      });
    }
  });
}

function initProjectCards() {
  document.querySelectorAll('.project-card').forEach((card) => {
    gsap.fromTo(card, { y: 80, opacity: 0 }, {
      scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 8,
        rotateX: -y * 8,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800,
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power2.out' });
    });
  });
}

function initCounterAnimation() {
  document.querySelectorAll('.stat-card__num').forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(el, { innerText: 0 }, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          ease: 'power2.out',
        });
      },
    });
  });
}

function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor(window.innerWidth / 12), 120);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => { resize(); createParticles(); });
}

function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow || window.matchMedia('(max-width: 768px)').matches) return;

  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

function initMobileMenu() {
  const ham = document.querySelector('.header__ham');
  const menu = document.querySelector('.header__mobile-menu');
  if (!ham || !menu) return;

  ham.addEventListener('click', () => {
    ham.classList.toggle('active');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.header__mobile-links a').forEach((link) => {
    link.addEventListener('click', () => {
      ham.classList.remove('active');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

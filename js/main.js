/* ============================================================
   NAVBAR — transparent → frosted glass on scroll
============================================================ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const THRESHOLD = 60;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > THRESHOLD);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ============================================================
   MOBILE MENU — hamburger toggle
============================================================ */
(function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

/* ============================================================
   SCROLL REVEAL — IntersectionObserver on .reveal elements
============================================================ */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

/* ============================================================
   ACTIVE NAV LINK — highlight link for the visible section
============================================================ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle(
            'active-link',
            link.getAttribute('href') === `#${id}`
          );
        });
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
})();

/* ============================================================
   GALLERY FILTER — show / hide items & groups by category
============================================================ */
(function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryGroups = document.querySelectorAll('.gallery-group');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide gallery groups
      galleryGroups.forEach(group => {
        const groupCategory = group.dataset.category;
        const groupMatch = filter === 'all' || groupCategory === filter;
        group.classList.toggle('hidden', !groupMatch);

        // Pause any active videos inside hidden group
        if (!groupMatch) {
          const vids = group.querySelectorAll('video');
          vids.forEach(v => {
            if (!v.paused) v.pause();
          });
        }
      });

      // Show/hide individual items
      galleryItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !match);

        // Pause any active video if item is filtered out
        if (!match) {
          const video = item.querySelector('video');
          if (video && !video.paused) {
            video.pause();
          }
        }

        // Re-trigger reveal animation on newly shown items
        if (match && !item.classList.contains('visible')) {
          item.classList.add('visible');
        }
      });
    });
  });
})();

/* ============================================================
   GALLERY VIDEO PLAYER — click-to-play HTML5 local video
============================================================ */
(function initGalleryVideos() {
  const videoWraps = document.querySelectorAll('.video-thumb-wrap');
  if (!videoWraps.length) return;

  videoWraps.forEach(wrap => {
    const video = wrap.querySelector('video');
    if (!video) return;

    function playVideo() {
      // Pause any other playing gallery videos
      document.querySelectorAll('.gallery-video').forEach(otherVideo => {
        if (otherVideo !== video && !otherVideo.paused) {
          otherVideo.pause();
        }
      });

      wrap.classList.add('is-playing');
      video.setAttribute('controls', 'controls');
      video.play().catch(err => {
        console.warn('Playback prevented or aborted:', err);
      });
    }

    // Clicking anywhere on the thumbnail / play button before playing triggers playback
    wrap.addEventListener('click', (e) => {
      if (wrap.classList.contains('is-playing')) return;
      playVideo();
    });

    // Explicit play trigger link inside overlay
    const playTriggerLink = wrap.querySelector('.play-trigger-link');
    if (playTriggerLink) {
      playTriggerLink.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        playVideo();
      });
    }

    // Reset overlay when video finishes playing
    video.addEventListener('ended', () => {
      wrap.classList.remove('is-playing');
      video.removeAttribute('controls');
      video.load(); // Resets poster preview
    });
  });
})();

/* ============================================================
   COUNT-UP ANIMATION — stat numbers tick up when visible
============================================================ */
(function initCountUp() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(el => observer.observe(el));
})();

/* ============================================================
   CONTACT FORM — validation + simulated submit
============================================================ */
(function initContactForm() {
  const form   = document.getElementById('contact-form');
  const status = form?.querySelector('.form-status');
  if (!form || !status) return;

  function validate() {
    let valid = true;

    const name    = form.querySelector('#name');
    const email   = form.querySelector('#email');
    const message = form.querySelector('#message');

    [name, email, message].forEach(el => el.classList.remove('error'));

    if (!name.value.trim()) {
      name.classList.add('error');
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      email.classList.add('error');
      valid = false;
    }

    if (!message.value.trim()) {
      message.classList.add('error');
      valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validate()) {
      status.textContent = 'Please fill in all required fields correctly.';
      status.className = 'form-status error';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    status.textContent = '';
    status.className = 'form-status';

    // Simulated network delay — replace this block with a real
    // fetch() to your backend / Formspree / EmailJS endpoint.
    await new Promise(resolve => setTimeout(resolve, 1400));

    status.textContent = '✓ Message sent! I\'ll be in touch within 24 hours.';
    status.className = 'form-status success';
    form.reset();

    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message →';
  });
})();

/* ============================================================
   SMOOTH SCROLL — polyfill for browsers without native support
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ============================================================
   HERO AMBIENT PARTICLES & MOUSE PARALLAX
============================================================ */
(function initHeroAmbient() {
  const hero = document.getElementById('hero');
  const canvas = document.getElementById('hero-particles');
  if (!hero || !canvas) return;

  const ctx = canvas.getContext('2d');
  const glowPrimary = hero.querySelector('.glow-primary');
  const glowSecondary = hero.querySelector('.glow-secondary');
  const ambientGrid = hero.querySelector('.ambient-grid');
  const accentRing = hero.querySelector('.portrait-accent-ring');

  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;
  let animationFrameId = null;
  let isVisible = true;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const isTouchDevice = window.matchMedia('(pointer: coarse), (hover: none)').matches;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = hero.offsetWidth;
    height = hero.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Particle pool
  const PARTICLE_COUNT = isTouchDevice ? 16 : 28;
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.6,
      baseSpeedX: (Math.random() - 0.5) * 0.25,
      baseSpeedY: -(Math.random() * 0.35 + 0.15),
      alpha: Math.random() * 0.45 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulseVal: Math.random() * Math.PI * 2,
      color: Math.random() > 0.3 ? '255, 61, 0' : '255, 180, 90',
    });
  }

  // Mouse parallax state
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  if (!isTouchDevice) {
    window.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    hero.addEventListener('mouseleave', () => {
      targetMouseX = 0;
      targetMouseY = 0;
    });
  }

  // IntersectionObserver to pause when hero is off-screen
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(render);
        }
      });
    },
    { threshold: 0.05 }
  );
  heroObserver.observe(hero);

  function render() {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }

    // Smooth LERP interpolation
    mouseX += (targetMouseX - mouseX) * 0.06;
    mouseY += (targetMouseY - mouseY) * 0.06;

    // Apply parallax transforms
    if (!isTouchDevice) {
      if (glowPrimary) {
        glowPrimary.style.transform = `translate3d(${-mouseX * 24}px, ${-mouseY * 18}px, 0)`;
      }
      if (glowSecondary) {
        glowSecondary.style.transform = `translate3d(${mouseX * 20}px, ${mouseY * 16}px, 0)`;
      }
      if (ambientGrid) {
        ambientGrid.style.transform = `translate3d(${mouseX * 10}px, ${mouseY * 8}px, 0)`;
      }
      if (accentRing) {
        accentRing.style.transform = `translate3d(${12 + mouseX * 6}px, ${12 + mouseY * 6}px, 0)`;
      }
    }

    // Clear and draw particles
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];

      p.x += p.baseSpeedX + (mouseX * 0.25);
      p.y += p.baseSpeedY;
      p.pulseVal += p.pulseSpeed;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const currentAlpha = Math.max(0.08, p.alpha + Math.sin(p.pulseVal) * 0.18);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `rgba(${p.color}, 0.7)`;
      ctx.fill();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  animationFrameId = requestAnimationFrame(render);
})();

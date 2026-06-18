/* MJ Fitness Studio — script.js */

// ─── Navbar scroll state ───────────────────────────────────────────
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('is-scrolled', window.scrollY > 60);
}, { passive: true });

// ─── Hamburger toggle ──────────────────────────────────────────────
hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('is-open');
  navLinks.classList.toggle('is-open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when any nav link is tapped
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('is-open');
    navLinks.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('is-open') &&
    !navbar.contains(e.target)
  ) {
    hamburger.classList.remove('is-open');
    navLinks.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// ─── Active nav link based on scroll position ─────────────────────
const sections = document.querySelectorAll('section[id]');
const allLinks  = document.querySelectorAll('.nav-link');

function syncActiveLink() {
  const scrollMid = window.scrollY + window.innerHeight * 0.35;
  let activeId = null;

  sections.forEach(section => {
    if (scrollMid >= section.offsetTop) {
      activeId = section.id;
    }
  });

  allLinks.forEach(link => {
    const matches = link.getAttribute('href') === `#${activeId}`;
    link.classList.toggle('active', matches);
  });
}

window.addEventListener('scroll', syncActiveLink, { passive: true });
syncActiveLink();

// ─── Scroll-reveal with Intersection Observer ─────────────────────
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el     = entry.target;
    const parent = el.parentElement;

    // Stagger children inside grids for a cascade effect
    const isGrid = (
      parent.classList.contains('services-grid') ||
      parent.classList.contains('trainers-grid') ||
      parent.classList.contains('contact-grid')
    );

    if (isGrid) {
      const siblings = Array.from(parent.querySelectorAll('.reveal'));
      const idx = siblings.indexOf(el);
      el.style.transitionDelay = `${idx * 75}ms`;
    }

    el.classList.add('is-visible');
    observer.unobserve(el);
  });
}, {
  threshold:  0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealEls.forEach(el => observer.observe(el));

// ─── Gallery filter ────────────────────────────────────────────────
const filterBtns   = document.querySelectorAll('.gf-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      item.classList.toggle('is-hidden', filter !== 'all' && item.dataset.type !== filter);
    });
  });
});

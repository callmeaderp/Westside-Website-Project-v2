/* ═══════════════════════════════════════════════════════════════════
   Westside Professional Landscape — Main JavaScript
   ═══════════════════════════════════════════════════════════════════ */

// Add .js class for progressive enhancement (fade-in fallback)
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {

  // ─── Mobile Menu Toggle ───
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('open');
      document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Mobile Dropdown Toggle ───
  // First tap opens dropdown, second tap navigates to the page
  document.querySelectorAll('.nav-dropdown > a').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        const parent = toggle.parentElement;
        if (!parent.classList.contains('open')) {
          e.preventDefault();
          parent.classList.add('open');
        }
        // If already open, allow normal navigation to services.html
      }
    });
  });

  // ─── Header Background on Scroll ───
  const header = document.querySelector('.site-header');
  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(17, 17, 17, 0.98)';
      } else {
        header.style.background = 'rgba(17, 17, 17, 0.92)';
      }
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // ─── Scroll Animations (Intersection Observer) ───
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .stagger-children');

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  }

  // ─── Active Nav Link ───
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ─── Smooth Scroll for Anchor Links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ─── Gallery Filter (if on gallery page) ───
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        galleryItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
            setTimeout(() => item.style.opacity = '1', 10);
          } else {
            item.style.opacity = '0';
            setTimeout(() => item.style.display = 'none', 300);
          }
        });
      });
    });
  }

  // ─── Gallery Lightbox ───
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  if (lightbox) {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img, .gallery-image');
        const caption = item.querySelector('.gallery-caption');
        if (img) {
          lightboxImg.src = img.src || '';
          lightboxImg.style.background = img.style.backgroundImage ? img.style.backgroundImage : '';
        }
        if (caption) {
          lightboxCaption.textContent = caption.textContent;
          lightboxImg.alt = caption.textContent;
        } else {
          lightboxImg.alt = '';
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ─── Contact Form Handler (Web3Forms) ───
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        if (result.success) {
          btn.textContent = '\u2713 Message Sent!';
          btn.style.background = 'var(--green-primary)';
          contactForm.reset();
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
          }, 4000);
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (err) {
        btn.textContent = 'Error \u2014 Please Call Us';
        btn.style.background = '#c0392b';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      }
    });
  }

  // ─── Counter Animation for Stats ───
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const prefix = el.dataset.prefix || '';
          let current = 0;
          const step = Math.max(1, Math.floor(target / 60));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            el.textContent = prefix + current.toLocaleString() + suffix;
          }, 20);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  // ─── Parallax on Hero ───
  const heroSections = document.querySelectorAll('.hero-bg');
  if (heroSections.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      heroSections.forEach(bg => {
        const rect = bg.parentElement.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const speed = 0.3;
          bg.style.transform = `translateY(${-rect.top * speed}px)`;
        }
      });
    }, { passive: true });
  }

});

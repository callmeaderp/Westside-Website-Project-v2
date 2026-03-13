/* ═══════════════════════════════════════════════════════════════════
   Westside Professional Landscape — Main JavaScript
   ═══════════════════════════════════════════════════════════════════ */

// Add .js class for progressive enhancement (fade-in fallback)
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── Mobile Menu Toggle ───
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('open');
      document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
    });

    // Single delegated handler for all nav link clicks — avoids race
    // conditions between separate "close menu" and "dropdown toggle" handlers
    mainNav.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link || !mainNav.contains(link)) return;

      const isMobile = window.innerWidth <= 768;
      const dropdown = link.parentElement.closest('.nav-dropdown');
      const isDropdownToggle = dropdown && link === dropdown.querySelector(':scope > a');

      // Mobile: first tap on dropdown toggle opens submenu, not navigation
      if (isMobile && isDropdownToggle && !dropdown.classList.contains('open')) {
        e.preventDefault();
        dropdown.classList.add('open');
        return; // keep nav open, don't navigate
      }

      // Everything else: close the nav (navigation proceeds normally)
      menuToggle.classList.remove('active');
      mainNav.classList.remove('open');
      document.body.style.overflow = '';
      mainNav.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
    });
  }

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
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // Catch elements already in viewport on page load (e.g. bottom-of-page CTAs)
    requestAnimationFrame(() => {
      animatedElements.forEach(el => {
        if (!el.classList.contains('visible')) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('visible');
            observer.unobserve(el);
          }
        }
      });
    });
  }

  // ─── Active Nav Link ───
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ─── Scroll Cue for Scrollable Hero Pages ───
  const primaryHero = document.querySelector('main > .hero');
  if (primaryHero) {
    const nextSection = primaryHero.nextElementSibling;

    if (nextSection) {
      const pageSlug = currentPage.replace(/[^a-z0-9]+/gi, '-').toLowerCase().replace(/^-|-$/g, '') || 'home';
      if (!nextSection.id) {
        nextSection.id = `page-content-${pageSlug}`;
      }

      const scrollCue = document.createElement('a');
      scrollCue.className = 'scroll-cue is-hidden';
      scrollCue.href = `#${nextSection.id}`;
      scrollCue.setAttribute('aria-label', 'Scroll to the next section');
      scrollCue.innerHTML = `
        <span class="scroll-cue__label">Scroll</span>
        <span class="scroll-cue__icon" aria-hidden="true"><span></span><span></span></span>
      `;

      scrollCue.addEventListener('click', (e) => {
        e.preventDefault();
        const headerOffset = header ? header.offsetHeight + 16 : 16;
        const targetTop = nextSection.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({
          top: Math.max(targetTop, 0),
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      });

      primaryHero.appendChild(scrollCue);

      const updateScrollCue = () => {
        const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
        const shouldShow = scrollableDistance > 48 && window.scrollY < 64;
        scrollCue.classList.toggle('is-hidden', !shouldShow);
      };

      window.addEventListener('scroll', updateScrollCue, { passive: true });
      window.addEventListener('resize', updateScrollCue);
      requestAnimationFrame(updateScrollCue);
    }
  }

  // ─── Smooth Scroll for Anchor Links ───
  document.querySelectorAll('a[href^="#"]:not(.scroll-cue)').forEach(anchor => {
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
  if (heroSections.length > 0 && !prefersReducedMotion) {
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

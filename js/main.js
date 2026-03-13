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

    // Inject dropdown arrow toggle buttons — separate tap target from link text
    mainNav.querySelectorAll('.nav-dropdown').forEach(dropdown => {
      const link = dropdown.querySelector(':scope > a');
      const arrow = document.createElement('button');
      arrow.className = 'dropdown-arrow';
      arrow.setAttribute('aria-label', 'Toggle submenu');
      link.after(arrow);

      // Chevron always toggles the dropdown open/closed
      arrow.addEventListener('click', () => {
        dropdown.classList.toggle('open');
      });

      // Services link: first click opens dropdown, second click navigates
      link.addEventListener('click', (e) => {
        if (!dropdown.classList.contains('open')) {
          e.preventDefault();
          dropdown.classList.add('open');
        }
        // If already open, let the default navigation happen (handled by
        // the delegated handler below which closes the mobile menu)
      });
    });

    // Delegated handler for nav link clicks — closes menu on navigation
    mainNav.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link || !mainNav.contains(link)) return;

      // Don't close the menu if we just opened a dropdown (prevented default above)
      if (e.defaultPrevented) return;

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
      scrollCue.className = 'scroll-cue';
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

      // Fade thresholds — start fading at 20px, fully gone by 120px
      const FADE_START = 20;
      const FADE_END = 120;
      let dismissed = false;

      const updateScrollCue = () => {
        const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
        const y = window.scrollY;

        if (scrollableDistance <= 48 || dismissed) {
          scrollCue.classList.remove('is-visible', 'is-fading');
          scrollCue.classList.add('is-hidden');
          scrollCue.style.opacity = '';
          return;
        }

        if (y <= FADE_START) {
          // Fully visible
          scrollCue.classList.remove('is-hidden', 'is-fading');
          scrollCue.classList.add('is-visible');
          scrollCue.style.opacity = '';
        } else if (y >= FADE_END) {
          // Fully hidden
          scrollCue.classList.remove('is-visible', 'is-fading');
          scrollCue.classList.add('is-hidden');
          scrollCue.style.opacity = '';
        } else {
          // Gradual fade zone
          const progress = (y - FADE_START) / (FADE_END - FADE_START);
          const fadedOpacity = 0.92 * (1 - progress);
          scrollCue.classList.remove('is-hidden');
          scrollCue.classList.add('is-visible', 'is-fading');
          scrollCue.style.opacity = fadedOpacity.toFixed(3);
        }
      };

      // Touch dismissal — any touch on hero starts fading
      const resetOnTop = () => {
        if (window.scrollY < 5 && dismissed) {
          dismissed = false;
          updateScrollCue();
        }
      };
      window.addEventListener('scroll', resetOnTop, { passive: true });

      primaryHero.addEventListener('touchstart', () => {
        if (!dismissed && window.scrollY < FADE_END) {
          dismissed = true;
          scrollCue.classList.remove('is-visible', 'is-fading');
          scrollCue.classList.add('is-hidden');
          scrollCue.style.opacity = '';
        }
      }, { passive: true });

      window.addEventListener('scroll', updateScrollCue, { passive: true });
      window.addEventListener('resize', updateScrollCue);

      // Delayed entrance — wait 500ms then reveal
      const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableDistance > 48 && window.scrollY < FADE_START) {
        setTimeout(() => {
          if (window.scrollY < FADE_START && !dismissed) {
            scrollCue.classList.add('is-visible');
          }
        }, 500);
      } else {
        requestAnimationFrame(updateScrollCue);
      }
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
          // Track form submission as Lead conversion in Meta Pixel
          if (typeof fbq === 'function') fbq('track', 'Lead');
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

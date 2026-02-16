document.addEventListener('DOMContentLoaded', () => {
  // DOM ELEMENTS
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const heroBg = document.querySelector('.hero-bg-effect');
  const body = document.body;

  // UTILITIES
  const toggleMobileMenu = (forceClose = false) => {
    const isActive = navMenu.classList.contains('active');
    if (forceClose && !isActive) return;
    menuToggle.classList.toggle('active', !forceClose);
    navMenu.classList.toggle('active', !forceClose);
    body.style.overflow = !forceClose && navMenu.classList.contains('active') ? 'hidden' : '';
  };

  // NAVBAR SCROLL + PARALLAX
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Navbar background
    navbar.classList.toggle('scrolled', currentScroll > 100);

    // Hero parallax
    if (heroBg && currentScroll < window.innerHeight) {
      heroBg.style.transform = `translateY(${currentScroll * 0.5}px) scale(${1 + currentScroll * 0.0002})`;
    }

    lastScroll = currentScroll;
  });

  // MOBILE MENU
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isMenuOpen = navMenu.classList.contains('active');
    toggleMobileMenu(isMenuOpen);
  });

  // Close on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(true));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      toggleMobileMenu(true);
    }
  });

  // FAQ ACCORDION
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.closest('.faq-item');
      const wasActive = faqItem.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
      if (!wasActive) faqItem.classList.add('active');
    });

    // Keyboard support
    question.setAttribute('tabindex', '0');
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });

  // SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId === '#contact') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = navbar.offsetHeight;
        window.scrollTo({
          top: target.offsetTop - headerHeight - 20,
          behavior: 'smooth'
        });
      }
    });
  });

  // AUDIO PLAYER
  let currentAudio = null;
  let currentButton = null;
  let fadeInterval = null;

  const fadeOutAudio = (audio, callback) => {
    const steps = 20;
    const stepTime = 1000 / steps; // 1s total
    const stepDecrease = 1 / steps;

    if (fadeInterval) clearInterval(fadeInterval);

    audio.volume = 1;
    fadeInterval = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume = Math.max(0, audio.volume - stepDecrease);
      } else {
        clearInterval(fadeInterval);
        audio.pause();
        audio.volume = 1; // reset
        if (callback) callback();
      }
    }, stepTime);
  };

  const stopCurrentAudio = () => {
    if (currentAudio) {
      fadeOutAudio(currentAudio, () => {
        currentAudio.currentTime = 0;
        if (currentButton) {
          currentButton.querySelector('i')?.classList.replace('fa-stop', 'fa-play');
        }
        currentAudio = null;
        currentButton = null;
      });
    }
  };

  const showNotification = (message, type = 'default') => {
    const notif = document.createElement('div');
    notif.className = `notification notification-${type}`;
    notif.textContent = message;
    notif.style.cssText = `
      position: fixed; bottom: 30px; right: 30px; z-index: 10000;
      background: ${type === 'play' ? 'linear-gradient(135deg, #FF59A9, #FF0080)' : 'linear-gradient(135deg, #00FFFF, #00BFFF)'};
      color: white; padding: 16px 28px; border-radius: 16px;
      font: 600 15px 'Syne', sans-serif; letter-spacing: 0.3px;
      box-shadow: 0 15px 40px rgba(255, 0, 128, 0.4);
      backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);
      max-width: 300px; word-wrap: break-word;
      animation: slideInNotification 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      cursor: pointer;
    `;

    body.appendChild(notif);

    setTimeout(() => {
      notif.style.animation = 'slideOutNotification 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
      setTimeout(() => notif.remove(), 400);
    }, 3000);

    notif.addEventListener('click', () => {
      notif.style.animation = 'slideOutNotification 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
      setTimeout(() => notif.remove(), 400);
    });
  };

  // Inject notification animations once
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideInNotification {
        from { transform: translateX(120%) scale(0.8); opacity: 0; }
        to { transform: translateX(0) scale(1); opacity: 1; }
      }
      @keyframes slideOutNotification {
        from { transform: translateX(0) scale(1); opacity: 1; }
        to { transform: translateX(120%) scale(0.8); opacity: 0; }
      }
      .playing, .downloading { transform: scale(0.92) !important; }
      .notification:hover { transform: scale(1.02); box-shadow: 0 20px 50px rgba(255, 0, 128, 0.5) !important; }
    `;
    document.head.appendChild(style);
  }

  // Play buttons
  document.querySelectorAll('.play-button, .action-button.play, .card-play-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const card = btn.closest('.track-card, .album-card');
      if (!card) return;

      const titleEl = card.querySelector('.track-title, .album-title');
      const trackTitle = titleEl ? titleEl.textContent.trim() : 'Track';
      const clean = trackTitle.split('(')[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      const audio = document.getElementById(`${clean}-audio`);

      if (!audio) {
        console.warn('Audio element not found:', trackTitle);
        return;
      }

      const icon = btn.querySelector('i');

      // If same track is playing → stop it
      if (currentAudio === audio) {
        fadeOutAudio(audio, () => {
          audio.currentTime = 0;
          icon?.classList.replace('fa-stop', 'fa-play');
          currentAudio = null;
          currentButton = null;
        });
        return;
      }

      // Stop any other audio
      stopCurrentAudio();
      // Play new one
      audio.currentTime = 0;
      audio.play()
        .then(() => {
          icon?.classList.replace('fa-play', 'fa-stop');
          currentAudio = audio;
          currentButton = btn;
          showNotification(`▶ Playing: ${trackTitle}`, 'play');
        })
        .catch(err => {
          console.error('Playback error:', err);
          showNotification(`❌ Error playing: ${trackTitle}`, 'error');
        });
      // Visual feedback
      btn.classList.add('playing');
      setTimeout(() => btn.classList.remove('playing'), 400);
      // Cleanup when track ends
      audio.onended = () => {
        icon?.classList.replace('fa-stop', 'fa-play');
        currentAudio = null;
        currentButton = null;
      };
    });
  });

  // Download buttons
  document.querySelectorAll('.action-button.download').forEach(btn => {
    const link = btn.closest('a');
    if (link) {
      link.setAttribute('download', '');
      
      if (link.href.includes('github.com') && !link.href.includes('raw.githubusercontent.com')) {
        link.href = link.href
          .replace('github.com', 'raw.githubusercontent.com')
          .replace('/blob/', '/');
      }
      
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const title = btn.closest('.track-card')?.querySelector('.track-title')?.textContent || 'Track';
        showNotification(`⬇ Downloading: ${title}`, 'download');
        btn.classList.add('downloading');
        setTimeout(() => btn.classList.remove('downloading'), 400);
      });
    }
  });

  // INTERSECTION OBSERVERS
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -80px 0px' };

  // Fade-in observer for cards, FAQ, about, notices
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Stagger for track cards
        if (entry.target.classList.contains('track-card')) {
          const parent = entry.target.parentElement;
          const index = Array.from(parent.children).indexOf(entry.target);
          entry.target.style.animationDelay = `${index * 0.1}s`;
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.track-card, .faq-item, .about-content, .about-image, .notice-card')
    .forEach(el => fadeObserver.observe(el));

  // Section reveal observer
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    sectionObserver.observe(section);
  });

  // LOADING ANIMATION
  window.addEventListener('load', () => {
    body.classList.add('loaded');
    console.log('website loaded successfully');
  });
  console.log('Website initialized');
});
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var SOLID_THRESHOLD = 80;
  var ticking = false;

  function updateNavState() {
    if (window.scrollY > SOLID_THRESHOLD) {
      header.classList.add('is-solid');
    } else {
      header.classList.remove('is-solid');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateNavState);
      ticking = true;
    }
  }, { passive: true });

  updateNavState();

  var toggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    header.classList.remove('menu-open');
    document.body.style.overflow = '';
  }

  function openMobileMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    header.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  }

  toggle.addEventListener('click', function () {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMobileMenu();
    }
  });

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  var processTrack = document.getElementById('processTrack');
  if (processTrack) {
    var processNodes = processTrack.querySelectorAll('.process__node');

    if (prefersReducedMotion) {
      processTrack.style.setProperty('--progress', 1);
      processNodes.forEach(function (node) {
        node.classList.add('is-lit');
      });
    } else {
      var processTicking = false;

      var updateProcessProgress = function () {
        var rect = processTrack.getBoundingClientRect();
        var vh = window.innerHeight;
        var total = rect.height + vh;
        var scrolled = vh - rect.top;
        var progress = Math.max(0, Math.min(1, scrolled / total));

        processTrack.style.setProperty('--progress', progress);

        processNodes.forEach(function (node, i) {
          var threshold = i / (processNodes.length - 1);
          node.classList.toggle('is-lit', progress >= threshold - 0.02);
        });

        processTicking = false;
      };

      window.addEventListener('scroll', function () {
        if (!processTicking) {
          window.requestAnimationFrame(updateProcessProgress);
          processTicking = true;
        }
      }, { passive: true });

      updateProcessProgress();
    }
  }
})();

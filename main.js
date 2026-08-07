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

  var countEls = document.querySelectorAll('[data-count-to]');

  function runCount(el) {
    var target = parseFloat(el.getAttribute('data-count-to'));
    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }
    var duration = 1200;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var elapsed = timestamp - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }

  if (countEls.length) {
    var countObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    countEls.forEach(function (el) {
      countObserver.observe(el);
    });
  }

  var aboutVisual = document.getElementById('aboutVisual');
  if (aboutVisual && !prefersReducedMotion) {
    var aboutTicking = false;

    var updateAboutParallax = function () {
      var rect = aboutVisual.getBoundingClientRect();
      var vh = window.innerHeight;
      var center = rect.top + rect.height / 2;
      var offset = (vh / 2 - center) * 0.08;
      offset = Math.max(-28, Math.min(28, offset));
      aboutVisual.style.transform = 'translateY(' + offset.toFixed(1) + 'px)';
      aboutTicking = false;
    };

    window.addEventListener('scroll', function () {
      if (!aboutTicking) {
        window.requestAnimationFrame(updateAboutParallax);
        aboutTicking = true;
      }
    }, { passive: true });

    updateAboutParallax();
  }
})();

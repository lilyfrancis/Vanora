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

  /* ==========================================================================
     Nav "Solutions" dropdown — hover works via CSS alone; this adds click
     (touch) and Escape support, and keeps aria-expanded accurate for
     keyboard/screen-reader users.
     ========================================================================== */
  var navDropdown = document.querySelector('.nav__dropdown');
  if (navDropdown) {
    var dropdownTrigger = navDropdown.querySelector('.nav__dropdown-trigger');

    function closeDropdown() {
      navDropdown.classList.remove('is-open');
      dropdownTrigger.setAttribute('aria-expanded', 'false');
    }

    dropdownTrigger.addEventListener('click', function () {
      var isOpen = navDropdown.classList.toggle('is-open');
      dropdownTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
      if (!navDropdown.contains(e.target)) closeDropdown();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDropdown();
    });
    navDropdown.querySelectorAll('.nav__dropdown-menu a').forEach(function (link) {
      link.addEventListener('click', closeDropdown);
    });
  }

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     Scroll reveal
     ========================================================================== */
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

  /* ==========================================================================
     Scroll-linked progress track — shared by "How Vanora works" (5 steps) and
     the "Vanora Revenue Engine" pipeline (6 stages). Same "installation
     progress" motif, one implementation.
     ========================================================================== */
  function initScrollTrack(trackId) {
    var track = document.getElementById(trackId);
    if (!track) return;
    var nodes = track.querySelectorAll('.process__node, .engine__node');

    if (prefersReducedMotion) {
      track.style.setProperty('--progress', 1);
      nodes.forEach(function (node) { node.classList.add('is-lit'); });
      return;
    }

    var trackTicking = false;
    var update = function () {
      var rect = track.getBoundingClientRect();
      var vh = window.innerHeight;
      var total = rect.height + vh;
      var scrolled = vh - rect.top;
      var progress = Math.max(0, Math.min(1, scrolled / total));

      track.style.setProperty('--progress', progress);

      nodes.forEach(function (node, i) {
        var threshold = i / (nodes.length - 1);
        node.classList.toggle('is-lit', progress >= threshold - 0.02);
      });

      trackTicking = false;
    };

    window.addEventListener('scroll', function () {
      if (!trackTicking) {
        window.requestAnimationFrame(update);
        trackTicking = true;
      }
    }, { passive: true });

    update();
  }

  initScrollTrack('processTrack');
  initScrollTrack('engineTrack');

  /* ==========================================================================
     Count-up stats (case study / proof numbers only — never used on the
     Measurable Outcomes placeholders, which stay static "—" until real
     figures exist)
     ========================================================================== */
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

  /* ==========================================================================
     About image parallax
     ========================================================================== */
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

  /* ==========================================================================
     Challenge-based solution selector (Section 6) — accessible tabs.
     Works via click, keyboard (arrow keys / Home / End), and touch. First
     panel is visible by default so content works without JS too.
     ========================================================================== */
  var selector = document.getElementById('solutionsSelector');
  if (selector) {
    var tabs = Array.prototype.slice.call(selector.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(selector.querySelectorAll('[role="tabpanel"]'));

    function activateTab(index) {
      tabs.forEach(function (tab, i) {
        var selected = i === index;
        tab.setAttribute('aria-selected', selected ? 'true' : 'false');
        tab.setAttribute('tabindex', selected ? '0' : '-1');
        panels[i].hidden = !selected;
      });
      tabs[index].focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activateTab(i); });
      tab.addEventListener('keydown', function (e) {
        var next;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          next = (i + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          next = (i - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Home') {
          next = 0;
        } else if (e.key === 'End') {
          next = tabs.length - 1;
        } else {
          return;
        }
        e.preventDefault();
        activateTab(next);
      });
    });
  }

  /* ==========================================================================
     Revenue Leakage Assessment (Section 13)
     ========================================================================== */

  // Set this once the Hostinger endpoint is deployed — see
  // backend/revenue-assessment-hostinger/README.md. Left empty on purpose:
  // nothing here pretends a submission is live until a real URL exists.
  var REVENUE_ASSESSMENT_ENDPOINT = '';

  var DIAGNOSTIC_QUESTIONS = {
    leadResponseTime: { always_24h: 'strong', inconsistent: 'attention', no_followup: 'gap' },
    salesProcess: { clear_repeatable: 'strong', some_structure: 'attention', no_defined_process: 'gap' },
    proposalSpeed: { same_day_48h: 'strong', three_to_seven_days: 'attention', over_a_week: 'gap' },
    collectionsProcess: { automated_reminders: 'strong', manual_occasional: 'attention', no_consistent_process: 'gap' },
    renewalTracking: { proactive_advance: 'strong', tracked_reactive: 'attention', not_tracked: 'gap' },
    adminWorkload: { minimal_automated: 'strong', moderate_manual: 'attention', heavy_manual: 'gap' }
  };

  var RATING_LABELS = { strong: 'Strong', attention: 'Needs Attention', gap: 'High-Priority Gap' };
  var CATEGORY_LABELS = {
    leadResponseTime: 'Lead management',
    salesProcess: 'Sales process',
    proposalSpeed: 'Proposals',
    collectionsProcess: 'Collections',
    renewalTracking: 'Renewals',
    adminWorkload: 'Operations'
  };

  function scoreAssessment(answers) {
    var categoryTags = {};
    var counts = { strong: 0, attention: 0, gap: 0 };

    Object.keys(DIAGNOSTIC_QUESTIONS).forEach(function (question) {
      var choice = answers[question];
      var tag = DIAGNOSTIC_QUESTIONS[question][choice];
      categoryTags[question] = tag;
      counts[tag] = (counts[tag] || 0) + 1;
    });

    var overallTag = 'strong';
    var best = -1;
    ['gap', 'attention', 'strong'].forEach(function (tag) {
      if (counts[tag] > best) {
        best = counts[tag];
        overallTag = tag;
      }
    });

    return { categoryTags: categoryTags, overallTag: overallTag };
  }

  function getUtmParams() {
    var params = new URLSearchParams(window.location.search);
    var utm = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(function (key) {
      utm[key] = params.get(key) || '';
    });
    return utm;
  }

  var assessmentForm = document.getElementById('assessmentForm');
  if (assessmentForm) {
    var utmParams = getUtmParams();
    var steps = Array.prototype.slice.call(assessmentForm.querySelectorAll('.assessment__step'));
    var stepIndicator = document.getElementById('assessmentStepIndicator');
    var currentStep = 0;
    var lastResult = null;

    function showStep(index) {
      steps.forEach(function (step, i) {
        step.hidden = i !== index;
      });
      currentStep = index;
      if (stepIndicator) {
        stepIndicator.textContent = 'Step ' + (index + 1) + ' of ' + (steps.length - 1);
      }
      var firstField = steps[index].querySelector('input, select, textarea, button');
      if (firstField) firstField.focus();
    }

    assessmentForm.querySelectorAll('[data-step-next]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var fieldset = steps[currentStep];
        var invalid = fieldset.querySelector(':invalid');
        if (invalid) {
          invalid.reportValidity();
          return;
        }
        showStep(currentStep + 1);
      });
    });
    assessmentForm.querySelectorAll('[data-step-back]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showStep(currentStep - 1);
      });
    });

    function buildPayload(sendCopyToRespondent) {
      var formData = new FormData(assessmentForm);
      var answers = {};
      Object.keys(DIAGNOSTIC_QUESTIONS).forEach(function (q) {
        answers[q] = formData.get(q) || '';
      });

      return {
        name: formData.get('name') || '',
        email: formData.get('email') || '',
        phone: formData.get('phone') || '',
        company: formData.get('company') || '',
        role: formData.get('role') || '',
        companySize: formData.get('companySize') || '',
        answers: answers,
        desiredOutcome: formData.get('desiredOutcome') || '',
        consent: formData.get('consent') === 'on',
        website: formData.get('website') || '', // honeypot
        sourcePage: window.location.href,
        utm: utmParams,
        timestamp: new Date().toISOString(),
        sendCopyToRespondent: !!sendCopyToRespondent
      };
    }

    function renderResults(result) {
      var overallEl = document.getElementById('assessmentOverallBadge');
      overallEl.textContent = RATING_LABELS[result.overallTag];
      overallEl.className = 'rating-badge rating-badge--lg rating-badge--' + result.overallTag;

      var rows = document.getElementById('assessmentCategoryRows');
      rows.innerHTML = '';
      Object.keys(result.categoryTags).forEach(function (question) {
        var tag = result.categoryTags[question];
        var row = document.createElement('div');
        row.className = 'assessment-result-row reveal';
        row.innerHTML =
          '<span class="assessment-result-row__label">' + CATEGORY_LABELS[question] + '</span>' +
          '<span class="rating-badge rating-badge--' + tag + '">' + RATING_LABELS[tag] + '</span>';
        rows.appendChild(row);
        row.classList.add('is-visible');
      });
    }

    function submitPayload(payload, statusEl) {
      if (!REVENUE_ASSESSMENT_ENDPOINT) {
        statusEl.textContent = 'Thanks — your results are above. Submission storage isn’t live yet, so this hasn’t been sent to our team; please book a strategy session directly in the meantime.';
        statusEl.hidden = false;
        return;
      }
      statusEl.textContent = 'Sending…';
      statusEl.hidden = false;
      fetch(REVENUE_ASSESSMENT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          statusEl.textContent = data.ok ? 'Sent — thank you.' : 'Something went wrong: ' + (data.error || 'please try again.');
        })
        .catch(function () {
          statusEl.textContent = 'Something went wrong sending your assessment. Please try again.';
        });
    }

    assessmentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var fieldset = steps[currentStep];
      var invalid = fieldset.querySelector(':invalid');
      if (invalid) {
        invalid.reportValidity();
        return;
      }

      var payload = buildPayload(false);
      if (payload.website) return; // honeypot tripped, silently drop

      lastResult = scoreAssessment(payload.answers);
      renderResults(lastResult);
      showStep(steps.length - 1);
      submitPayload(payload, document.getElementById('assessmentSubmitStatus'));
    });

    var emailBtn = document.getElementById('assessmentEmailCopy');
    if (emailBtn) {
      emailBtn.addEventListener('click', function () {
        var payload = buildPayload(true);
        submitPayload(payload, document.getElementById('assessmentEmailStatus'));
      });
    }
  }

  /* ==========================================================================
     Footer year
     ========================================================================== */
  var footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
})();

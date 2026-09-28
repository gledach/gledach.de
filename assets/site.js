/* gledach.de — progressive enhancement only.
   Everything below is optional: with JS off the page is complete, dark, and
   fully readable. Three jobs — theme toggle, copy buttons, scroll reveal. */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ── theme ──────────────────────────────────────────────────────────────
     Dark is the brand default rather than a guess at the OS preference; the
     toggle is the explicit opt-out and it persists. The pre-paint applier
     lives inline in <head>, so this only has to handle clicks and the label. */

  var toggle = document.querySelector('[data-theme-toggle]');
  var label = document.querySelector('[data-theme-label]');

  function paintToggle() {
    var now = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    var next = now === 'light' ? 'dark' : 'light';
    if (label) label.textContent = now;
    if (toggle) toggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('gledach-theme', next); } catch (e) { /* private mode */ }
      paintToggle();
    });
    paintToggle();
  }

  /* ── copy buttons ────────────────────────────────────────────────────────
     The <code> is the source of truth, so the copied text is exactly what is
     on screen. clipboard.writeText needs a secure context; when it is missing
     the button says so instead of silently doing nothing. */

  document.querySelectorAll('[data-copy]').forEach(function (block) {
    var button = block.querySelector('.copy');
    var code = block.querySelector('code');
    if (!button || !code) return;

    button.addEventListener('click', function () {
      var text = code.textContent.replace(/[ \t]+#.*$/gm, '').trimEnd();

      function settle(word) {
        button.textContent = word;
        button.setAttribute('data-done', '');
        setTimeout(function () {
          button.textContent = 'copy';
          button.removeAttribute('data-done');
        }, 1600);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { settle('copied'); },
          function () { settle('blocked'); }
        );
      } else {
        settle('blocked');
      }
    });
  });

  /* ── scroll reveal ───────────────────────────────────────────────────────
     Classes are added by JS, never in the markup, so a no-JS or reduced-motion
     visitor never meets an element stuck at opacity 0. */

  var motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (motionOk && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('.sect > .wrap > *:not(.tools), .tool');

    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        seen.unobserve(entry.target);
      });
      /* The root is extended downward rather than shrunk, so content is already
         faded in by the time it reaches the viewport. Shrinking it means a fast
         scroll lands on a blank screen. */
    }, { rootMargin: '0px 0px 14% 0px', threshold: 0 });

    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = Math.min(i % 5, 4) * 45 + 'ms';
      seen.observe(el);
    });
  }
})();

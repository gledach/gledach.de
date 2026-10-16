/* gledach.de
   Progressive enhancement only. With JavaScript off the page is complete and
   readable: reveals and bar growth are CSS, their static state is the finished
   state, and the tool menu is a <details> that opens and closes on its own.

   Two jobs here: copy buttons on command blocks, and the two dismissal
   behaviours <details> does not give you for free. */

(function () {
  'use strict';

  /* ── copy buttons ───────────────────────────────────────────────── */
  document.querySelectorAll('[data-copy]').forEach(function (block) {
    var button = block.querySelector('.copy');
    var code = block.querySelector('code');
    if (!button || !code) return;

    button.addEventListener('click', function () {
      /* The visible <code> is the source of truth, so what lands on the
         clipboard is what is on screen, minus the trailing comments. */
      var text = code.textContent.replace(/[ \t]+#.*$/gm, '').trimEnd();

      function settle(word) {
        button.textContent = word;
        button.setAttribute('data-done', '');
        setTimeout(function () {
          button.textContent = 'Copy';
          button.removeAttribute('data-done');
        }, 1800);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { settle('Copied'); },
          function () { settle('Blocked'); }
        );
      } else {
        /* writeText needs a secure context. Say so rather than fail silently. */
        settle('Blocked');
      }
    });
  });

  /* ── reveal on entry, once ──────────────────────────────────────────
     Entry motion used to be a `view()` timeline, which does not play, it
     scrubs: scrolling back up faded every card out again and scrolling
     down replayed it. These reveal once and then stay revealed.

     The no-JavaScript guarantee is stronger this way, not weaker. The
     hidden state is applied here rather than in the markup, so with this
     file blocked nothing is ever hidden and the page is simply complete.
     Anything already on screen when this runs is skipped and never
     hidden at all, so there is no flash after first paint. */
  var REVEAL = [
    /* blocks that are not grids: heads, consoles, bands, notes */
    '.sec:not(.hero) > .wrap > *:not(.cards):not(.tiles):not(.rules)' +
      ':not(.blind):not(.steps):not(.stats):not(.view):not(.bars)',
    /* grid children, one at a time */
    '.cards > *', '.tiles > *', '.rules > li', '.blind > li',
    '.steps > li', '.stats > div', '.rail-step',
    /* and the two that animate something other than themselves */
    '.view', '.bars'
  ].join(',');

  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!still && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        /* Order matters. A keyframe set with only a `from` takes its
           implicit `to` from the element's computed style, so leaving
           is-pre on would end the animation at opacity 0: it would fade
           in and then disappear. */
        entry.target.classList.remove('is-pre');
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll(REVEAL).forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.classList.add('is-pre');
      io.observe(el);
    });
  }

  /* ── tool menu dismissal ────────────────────────────────────────────
     The menu is a <details>, so opening, closing and the keyboard already
     work without this. What <details> does not do is close when you click
     away or press Escape, which is the one way a disclosure used as a menu
     feels broken. Added here rather than in the markup, because losing it
     with JavaScript off costs the reader nothing: the menu still toggles. */
  var menus = document.querySelectorAll('.toolmenu');
  if (!menus.length) return;

  function closeAll(except) {
    menus.forEach(function (m) {
      if (m !== except) m.removeAttribute('open');
    });
  }

  document.addEventListener('click', function (event) {
    var inside = event.target.closest ? event.target.closest('.toolmenu') : null;
    closeAll(inside);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    var open = document.querySelector('.toolmenu[open]');
    if (!open) return;
    open.removeAttribute('open');
    /* Send focus back to the control that opened it, or the next Tab lands
       at the top of the document. */
    var summary = open.querySelector('summary');
    if (summary) summary.focus();
  });
})();

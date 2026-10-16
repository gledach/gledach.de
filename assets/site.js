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

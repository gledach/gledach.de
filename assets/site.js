/* gledach.de
   Progressive enhancement only. With JavaScript off the page is complete and
   readable: reveals, bar growth and the scan pass are CSS, and their static
   state is the finished state.

   One job here: copy buttons on command blocks. */

(function () {
  'use strict';

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
})();

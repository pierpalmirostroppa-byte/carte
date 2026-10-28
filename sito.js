// Comandi della pagina: menu delle lingue, comparsa delle sezioni.
(function () {
  var html = document.documentElement;

  // la lingua scelta dal menu viene ricordata per le visite successive
  document.querySelectorAll('[data-lingua]').forEach(function (a) {
    a.addEventListener('click', function () {
      try { localStorage.setItem('lingua-carte', a.getAttribute('data-lingua')); } catch (e) {}
    });
  });
  // il menu delle lingue si chiude toccando fuori
  var menu = document.querySelector('.lingue');
  if (menu) document.addEventListener('click', function (e) { if (!menu.contains(e.target)) menu.removeAttribute('open'); });

  // i libri compaiono mentre si scorre
  if ('IntersectionObserver' in window) {
    var els = document.querySelectorAll('.gioco, .editori-in, .studio-in');
    var io = new IntersectionObserver(function (voci) {
      voci.forEach(function (v) {
        if (!v.isIntersecting) return;
        var el = v.target;
        el.classList.add('vista');
        io.unobserve(el);
        setTimeout(function () { el.classList.remove('appare', 'vista'); el.style.transitionDelay = ''; }, 1200);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el, i) {
      el.classList.add('appare');
      
      io.observe(el);
    });
    html.classList.add('js-pronto');
  }
})();

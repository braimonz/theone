/* The One Guadalupe Inn — interacciones */
(function () {
  'use strict';

  /* ---- Header: fondo al hacer scroll ---- */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Menú móvil ---- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Filtro de galería ---- */
  var chips = document.querySelectorAll('.gallery-filters .chip');
  var items = document.querySelectorAll('#galleryGrid .gallery-item');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      var filter = chip.getAttribute('data-filter');
      items.forEach(function (item) {
        var show = filter === 'all' || item.getAttribute('data-cat') === filter;
        item.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---- Animación de entrada al hacer scroll ---- */
  var revealTargets = document.querySelectorAll(
    '.section-head, .amenity, .typology, .advantage, .poi-card, .gallery-item, .development, .location-info, .location-map, .contact-info, .contact-form, .amenities-foot'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Formulario de contacto (demo, sin backend) ---- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var required = form.querySelectorAll('[required]');
      var valid = true;
      required.forEach(function (input) {
        if (!input.value.trim()) valid = false;
      });
      var email = form.querySelector('#email');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) valid = false;

      if (!valid) {
        note.textContent = 'Por favor completa los campos requeridos con datos válidos.';
        note.className = 'form-note err';
        return;
      }
      note.textContent = '¡Gracias! Hemos recibido tus datos. Un asesor te contactará muy pronto.';
      note.className = 'form-note ok';
      form.reset();
    });
  }

  /* ---- Año dinámico en footer ---- */
  var yearEls = document.querySelectorAll('[data-year]');
  yearEls.forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();

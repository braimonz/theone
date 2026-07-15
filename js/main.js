/* The One Guadalupe Inn — interacciones */
(function () {
  'use strict';

  /* ---- Iconos en características de tipologías ---- */
  var featureIcons = {
    sala:           '<path d="M4 12v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2M3 12h18v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5zM6 18v2M18 18v2"/>',
    comedor:        '<path d="M6 3v7a2 2 0 0 0 2 2v9M8 3v6M16 3c-1.4 0-2 1.8-2 4.5S14.6 12 16 12v9"/>',
    cocina:         '<rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="9" cy="9" r="1.4"/><circle cx="15" cy="9" r="1.4"/><path d="M7 14h10"/>',
    estacionamiento:'<path d="M5 11l1.4-4.2A2 2 0 0 1 8.3 5.5h7.4a2 2 0 0 1 1.9 1.3L19 11M4.5 11h15v5h-15zM7 16v1.5M17 16v1.5"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/>',
    balcon:         '<path d="M3 21h18M6 21v-8M10 21v-8M14 21v-8M18 21v-8M4 13h16M6 13V9h12v4M8 9V6h8v3"/>',
    lavado:         '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="13" r="4"/><path d="M8 6h.01M11 6h.01"/>',
    vestidor:       '<path d="M12 4a2 2 0 0 0-1.2 3.6L3.5 13H20.5l-7.3-5.4A2 2 0 0 0 12 4zM3.5 13v3.5h17V13"/>',
    terraza:        '<path d="M12 3c4.4 0 8 3.1 8 7H4c0-3.9 3.6-7 8-7zM12 3v18M8 21h8"/>'
  };
  function iconFor(text) {
    var t = text.toLowerCase();
    if (t.indexOf('cocina') > -1) return featureIcons.cocina;
    if (t.indexOf('estacionamiento') > -1) return featureIcons.estacionamiento;
    if (t.indexOf('comedor') > -1) return featureIcons.comedor;
    if (t.indexOf('sala') > -1) return featureIcons.sala;
    if (t.indexOf('balc') > -1) return featureIcons.balcon;
    if (t.indexOf('lavado') > -1) return featureIcons.lavado;
    if (t.indexOf('vestidor') > -1) return featureIcons.vestidor;
    if (t.indexOf('terraza') > -1) return featureIcons.terraza;
    return null;
  }
  document.querySelectorAll('.typology-features li').forEach(function (li) {
    var path = iconFor(li.textContent);
    if (!path) return;
    var svg = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + '</svg>';
    li.insertAdjacentHTML('afterbegin', svg);
    li.classList.add('has-icon');
  });

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

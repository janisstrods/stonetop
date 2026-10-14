/* ==========================================================================
   Akmeņgala hronika — the timeline
   Reads STONETOP.events / eras (data/notikumi.js) and STONETOP.people.
   ========================================================================== */
(function () {
  'use strict';

  var S = window.STONETOP;
  var root = document.getElementById('timeline');

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  var byId = {};
  (S.people || []).forEach(function (p) { byId[p.id] = p; });

  // "pēc kādiem astoņiem gadiem", "pēc gada", "drīz pēc tam" …
  function gapText(prev, next) {
    if (typeof prev.yearsAgo !== 'number' || typeof next.yearsAgo !== 'number') return '';
    var gap = prev.yearsAgo - next.yearsAgo;
    if (gap <= 0) return 'tajā pašā laikā';
    if (gap < 0.2) return 'drīz pēc tam';
    if (gap < 0.9) return 'pēc dažiem mēnešiem';
    var n = Math.round(gap);
    if (n === 1) return 'pēc gada';
    if (n % 10 === 1 && n % 100 !== 11) return 'pēc kāda ' + n + ' gada';
    var words = { 2: 'diviem', 3: 'trim', 4: 'četriem', 5: 'pieciem', 6: 'sešiem', 7: 'septiņiem', 8: 'astoņiem', 9: 'deviņiem', 10: 'desmit' };
    return 'pēc kādiem ' + (words[n] || n) + ' gadiem';
  }

  function medal(glyph, campaign) {
    return '<svg class="ev-medal' + (campaign ? ' is-campaign' : '') + '" viewBox="-40 -40 80 80" aria-hidden="true">' +
      (campaign ? '<circle class="rim" r="36"/>' : '') +
      '<circle class="disc" r="31"/><circle class="ring" r="27"/>' +
      S.glyphMarkup(glyph, 0, 0, 38) + '</svg>';
  }

  function chip(id) {
    var p = byId[id];
    if (!p) return '';
    return '<li><a class="chip kind-' + p.kind + '" href="karte.html#' + encodeURIComponent(p.id) + '">' +
      '<svg viewBox="-36 -36 72 72" aria-hidden="true"><circle class="disc" r="31"/>' + S.glyphMarkup(p.glyph, 0, 0, 40) + '</svg>' +
      '<span>' + esc(p.name) + '</span></a></li>';
  }

  var html = [];
  var eras = Object.assign({}, S.eras || {});
  var eraOrder = Object.keys(eras);
  // an event with a mistyped era still appears, in a section of its own
  (S.events || []).forEach(function (ev) {
    if (eras[ev.era]) return;
    if (window.console) console.warn('Notikumam nezināms laikmets (era):', ev.id, ev.era);
    ev.era = '_citi';
    if (!eras._citi) { eras._citi = { name: 'Citi notikumi' }; eraOrder.push('_citi'); }
  });
  var side = 0;

  eraOrder.forEach(function (eraId) {
    var list = (S.events || []).filter(function (ev) { return ev.era === eraId; });
    if (!list.length) return;
    var era = eras[eraId];
    html.push('<section class="era era-' + esc(eraId) + '" aria-labelledby="era-' + esc(eraId) + '">' +
      '<header class="era-head"><h3 id="era-' + esc(eraId) + '"><span>' + esc(era.name) + '</span></h3>' +
      (era.note ? '<p>' + esc(era.note) + '</p>' : '') + '</header><ol class="events">');

    list.forEach(function (ev, i) {
      if (i > 0) {
        var g = gapText(list[i - 1], ev);
        if (g) html.push('<li class="gap" aria-hidden="true"><span>' + esc(g) + '</span></li>');
      }
      var campaign = eraId === 'kampana';
      html.push(
        '<li class="event side-' + (side++ % 2 ? 'right' : 'left') + (campaign ? ' is-campaign' : '') + '" id="' + esc(ev.id) + '">' +
          '<div class="ev-mark">' + medal(ev.glyph, campaign) + '</div>' +
          '<article class="ev-card">' +
            '<p class="ev-when">' + esc(ev.when) +
              (typeof ev.session === 'number' ? ' <span class="ev-session">· ' + ev.session + '. sesija</span>' : '') + '</p>' +
            '<h4><a class="ev-anchor" href="#' + esc(ev.id) + '">' + esc(ev.title) + '</a></h4>' +
            '<p class="ev-text">' + esc(ev.text) + '</p>' +
            ((ev.people && ev.people.length) ? '<ul class="chips" aria-label="Iesaistītie">' + ev.people.map(chip).join('') + '</ul>' : '') +
          '</article>' +
        '</li>');
    });
    html.push('</ol></section>');
  });

  root.innerHTML = html.join('');

  // Ease entries in as they come into view. Anything already on screen,
  // and everything when motion is reduced, is simply shown.
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function hashId() {
    try { return decodeURIComponent(location.hash.slice(1)); } catch (err) { return ''; }
  }
  var targetId = hashId();
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.remove('pending'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    root.querySelectorAll('.event, .gap, .era-head').forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight || el.id === targetId) return;
      el.classList.add('pending');
      io.observe(el);
    });
    document.body.classList.add('will-reveal');
  }

  // Arriving from the map with #event-id: show that entry straight away.
  function showTarget() {
    var id = hashId();
    var el = id && document.getElementById(id);
    if (!el) return;
    el.classList.remove('pending');
    requestAnimationFrame(function () { el.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' }); });
  }
  window.addEventListener('hashchange', showTarget);
  showTarget();
})();

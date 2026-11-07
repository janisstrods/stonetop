/* ==========================================================================
   Akmeņgala dienasgrāmatas — the players' session diaries
   Reads STONETOP.diaries (data/dienasgramatas.js), STONETOP.people
   (data/cilveki.js) and STONETOP.events (data/notikumi.js).
   Without a hash the page lists every entry; #s1-made-jete opens one.
   ========================================================================== */
(function () {
  'use strict';

  var S = window.STONETOP;
  var root = document.getElementById('diaries');
  var entries = (S.diaries || []).slice();

  var MONTHS = ['janvārī', 'februārī', 'martā', 'aprīlī', 'maijā', 'jūnijā',
                'jūlijā', 'augustā', 'septembrī', 'oktobrī', 'novembrī', 'decembrī'];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function longDate(iso) {
    var d = String(iso || '').split('-').map(Number);
    if (d.length !== 3 || !d[0]) return '';
    return d[0] + '. gada ' + d[2] + '. ' + MONTHS[d[1] - 1];
  }

  var byId = {};
  (S.people || []).forEach(function (p) { byId[p.id] = p; });

  // [[id|text]] → a link to that person or place on the map
  var LINK = /\[\[([a-z0-9-]+)\|([^\]]+)\]\]/g;
  function paragraph(text) {
    var out = '', last = 0, m;
    LINK.lastIndex = 0;
    while ((m = LINK.exec(text))) {
      out += esc(text.slice(last, m.index));
      var p = byId[m[1]];
      out += p
        ? '<a class="mention kind-' + esc(p.kind) + '" href="karte.html#' + encodeURIComponent(p.id) + '" title="' + esc(p.name) + ' kartē">' + esc(m[2]) + '</a>'
        : esc(m[2]);
      last = LINK.lastIndex;
    }
    return out + esc(text.slice(last));
  }
  function plain(text) { return text.replace(LINK, '$2'); }
  function mentioned(entry) {
    var seen = {}, list = [];
    entry.text.forEach(function (t) {
      var m;
      LINK.lastIndex = 0;
      while ((m = LINK.exec(t))) {
        if (!seen[m[1]] && byId[m[1]]) { seen[m[1]] = true; list.push(m[1]); }
      }
    });
    return list;
  }

  function medal(p, cls) {
    var place = p.kind === 'place';
    var shape = place ? '<path class="disc" d="M0 -34 L34 0 L0 34 L-34 0 Z"/>' : '<circle class="disc" r="31"/>';
    return '<svg class="' + cls + ' kind-' + esc(p.kind) + '" viewBox="-40 -40 80 80" aria-hidden="true">' +
      (p.kind === 'pc' ? '<circle class="rim" r="36"/>' : '') + shape +
      (place ? '' : '<circle class="ring" r="27"/>') + S.glyphMarkup(p.glyph, 0, 0, 38) + '</svg>';
  }
  function chip(id) {
    var p = byId[id];
    return '<li><a class="chip kind-' + esc(p.kind) + '" href="karte.html#' + encodeURIComponent(p.id) + '">' +
      medal(p, 'chip-medal') + '<span>' + esc(p.name) + '</span></a></li>';
  }
  function author(e) { return byId[e.author] || { id: e.author, name: e.author, kind: 'pc', glyph: 'book' }; }
  function sessionLabel(e) { return e.session + '. sesija'; }

  function bookArt() {
    return '<svg class="head-book" viewBox="0 0 64 64" aria-hidden="true">' + S.glyphMarkup('book', 32, 32, 64) + '</svg>';
  }
  var RULE =
    '<svg class="ornament-rule" viewBox="0 0 400 14" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
      '<path d="M10 7 H178 M222 7 H390" stroke="currentColor" stroke-width="1.2"/>' +
      '<path d="M184 7 l8 -6 l8 6 l-8 6 z M200 7 l8 -6 l8 6 l-8 6 z" fill="none" stroke="currentColor" stroke-width="1.3"/>' +
      '<circle cx="200" cy="7" r="1.8" fill="currentColor"/>' +
      '<circle cx="10" cy="7" r="2" fill="currentColor"/><circle cx="390" cy="7" r="2" fill="currentColor"/>' +
    '</svg>';

  /* ---- the shelf: every entry, newest session first ---------------------- */
  function renderIndex() {
    document.title = 'Dienasgrāmatas · Akmeņgals';
    var sessions = [];
    entries.forEach(function (e) {
      var s = sessions.filter(function (x) { return x.n === e.session; })[0];
      if (!s) sessions.push(s = { n: e.session, date: e.date, list: [] });
      s.list.push(e);
    });
    sessions.sort(function (a, b) { return b.n - a.n; });

    root.innerHTML =
      '<header class="diaries-head">' + bookArt() +
        '<p class="eyebrow">Stonetop</p>' +
        '<h2>Dienasgrāmatas</h2>' + RULE +
        '<p class="lede">Ko spēlētāju tēli paši pierakstījuši pēc katras sesijas — kā katrs to redzējis, saviem vārdiem.</p>' +
      '</header>' +
      (sessions.length ? sessions.map(function (s) {
        return '<section class="shelf" aria-labelledby="sesija-' + s.n + '">' +
          '<h3 class="shelf-head" id="sesija-' + s.n + '"><span>' + s.n + '. sesija</span>' +
            (s.date ? '<time datetime="' + esc(s.date) + '">' + esc(longDate(s.date)) + '</time>' : '') + '</h3>' +
          '<ul class="entry-cards">' + s.list.map(function (e) {
            var a = author(e);
            var excerpt = plain(e.text[0] || '');
            if (excerpt.length > 190) excerpt = excerpt.slice(0, 190).replace(/\s+\S*$/, '') + '…';
            return '<li><a class="entry-card" href="#' + encodeURIComponent(e.id) + '">' +
              medal(a, 'card-medal') +
              '<span class="card-text"><span class="card-name">' + esc(a.name) + '</span>' +
              '<span class="card-playbook">' + esc(a.playbook || '') + '</span>' +
              '<span class="card-excerpt">' + esc(excerpt) + '</span>' +
              '<span class="card-go" aria-hidden="true">Lasīt →</span></span></a></li>';
          }).join('') + '</ul></section>';
      }).join('') : '<p class="empty">Vēl neviens nav neko pierakstījis.</p>') +
      '<footer class="diaries-end"><p>Nākamās lappuses vēl tukšas…</p></footer>';
  }

  /* ---- one entry, read like a page from a journal ------------------------ */
  function renderEntry(e) {
    var a = author(e);
    var i = entries.indexOf(e), prev = entries[i - 1], next = entries[i + 1];
    var who = mentioned(e).filter(function (id) { return id !== e.author; });
    var firstEvent = (S.events || []).filter(function (ev) { return ev.session === e.session; })[0];
    document.title = a.name + ' · ' + sessionLabel(e) + ' · Dienasgrāmatas · Akmeņgals';

    function neighbour(n, dir) {
      if (!n) return '<span></span>';
      var na = author(n);
      return '<a class="pager-' + dir + '" href="#' + encodeURIComponent(n.id) + '">' +
        '<span class="pager-dir">' + (dir === 'prev' ? '← Iepriekšējais ieraksts' : 'Nākamais ieraksts →') + '</span>' +
        '<span class="pager-what">' + esc(sessionLabel(n)) + ' · ' + esc(na.name) + '</span></a>';
    }

    root.innerHTML =
      '<a class="back" href="dienasgramatas.html">← Visas dienasgrāmatas</a>' +
      '<article class="entry" aria-labelledby="entry-title">' +
        '<header class="entry-head">' +
          '<p class="entry-when">' + esc(sessionLabel(e)) + (e.date ? ' · <time datetime="' + esc(e.date) + '">' + esc(longDate(e.date)) + '</time>' : '') + '</p>' +
          '<a class="byline" href="karte.html#' + encodeURIComponent(a.id) + '">' + medal(a, 'entry-medal') +
            '<span><span class="byline-name" id="entry-title">' + esc(a.name) + '</span>' +
            '<span class="byline-playbook">' + esc(a.playbook || '') + '</span></span></a>' +
          RULE +
        '</header>' +
        '<div class="entry-body">' + e.text.map(function (t) { return '<p>' + paragraph(t) + '</p>'; }).join('') + '</div>' +
        '<footer class="entry-foot">' +
          (who.length ? '<h3>Šajā ierakstā</h3><ul class="chips">' + who.map(chip).join('') + '</ul>' : '') +
          (firstEvent ? '<p class="to-chronicle"><a href="hronika.html#' + encodeURIComponent(firstEvent.id) + '">' + esc(sessionLabel(e)) + ' hronikā →</a></p>' : '') +
        '</footer>' +
      '</article>' +
      ((prev || next) ? '<nav class="pager" aria-label="Citi ieraksti">' + neighbour(prev, 'prev') + neighbour(next, 'next') + '</nav>' : '');
  }

  function hashId() {
    try { return decodeURIComponent(location.hash.slice(1)); } catch (err) { return ''; }
  }
  function route(scroll) {
    var id = hashId();
    var e = entries.filter(function (x) { return x.id === id; })[0];
    if (e) renderEntry(e); else renderIndex();
    if (scroll) {
      window.scrollTo(0, 0);
      root.focus({ preventScroll: true });
    }
  }
  window.addEventListener('hashchange', function () { route(true); });
  route(false);
})();

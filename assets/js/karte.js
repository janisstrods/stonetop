/* ==========================================================================
   Akmeņgala ļaudis — the relationship map
   Reads STONETOP.people / bonds / groups (data/cilveki.js) and
   STONETOP.events (data/notikumi.js). No external libraries.
   ========================================================================== */
(function () {
  'use strict';

  var S = window.STONETOP;
  var W = 1800, H = 1200;

  /* ---------------------------------------------------------------------
     Vocabulary
     --------------------------------------------------------------------- */
  var TYPES = {
    kin:     { name: 'Dzimta' },
    love:    { name: 'Mīla' },
    friend:  { name: 'Draudzība' },
    oath:    { name: 'Solījums' },
    duty:    { name: 'Darbs un dienests' },
    tension: { name: 'Nesaskaņas' },
    mystery: { name: 'Noslēpums' },
    sorcery: { name: 'Burvība un gari' }
  };
  var TYPE_ORDER = ['kin', 'love', 'friend', 'oath', 'duty', 'tension', 'mystery', 'sorcery'];

  var STATUS = {
    dead:    { m: 'miris',    f: 'mirusi' },
    missing: { m: 'pazudis',  f: 'pazudusi' },
    away:    { m: 'aizgājis', f: 'aizgājusi' }
  };

  var RADIUS = { pc: 46, npc: 31, shadow: 27 };

  /* ---------------------------------------------------------------------
     Helpers
     --------------------------------------------------------------------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function f1(n) { return Math.round(n * 10) / 10; }
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function rng(seed) {
    // mulberry32 — deterministic scenery, so the map looks the same every visit
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function genderOf(p) {
    if (p.gender) return p.gender;
    var last = p.name.trim().slice(-1).toLowerCase();
    return (last === 'a' || last === 'e') ? 'f' : 'm';
  }
  function statusText(p) {
    var s = STATUS[p.status];
    return s ? s[genderOf(p)] : '';
  }

  /* ---------------------------------------------------------------------
     Data
     --------------------------------------------------------------------- */
  var people = (S.people || [])
    .filter(function (p) {
      var ok = p && p.id && p.name;
      if (!ok && window.console) console.warn('Tēls izlaists (nav id vai name):', p);
      return ok;
    })
    .map(function (p) { return Object.assign({}, p); });
  var byId = {};
  people.forEach(function (p) {
    p.r = RADIUS[p.kind] || RADIUS.npc;
    byId[p.id] = p;
  });

  var bonds = S.bonds
    .filter(function (b) {
      var ok = byId[b.a] && byId[b.b] && TYPES[b.type];
      if (!ok && window.console) console.warn('Saite izlaista (nezināms tēls vai veids):', b);
      return ok;
    })
    .map(function (b, i) { return Object.assign({ id: 'b' + i }, b); });

  // How many bonds join each pair, so parallel bonds can bow apart.
  var pairs = {};
  bonds.forEach(function (b) {
    var key = [b.a, b.b].sort().join('|');
    (pairs[key] = pairs[key] || []).push(b);
  });
  Object.keys(pairs).forEach(function (key) {
    pairs[key].forEach(function (b, i) { b.pairKey = key; b.pairIndex = i; b.pairTotal = pairs[key].length; });
  });

  var bondsOf = {};
  bonds.forEach(function (b) {
    (bondsOf[b.a] = bondsOf[b.a] || []).push(b);
    (bondsOf[b.b] = bondsOf[b.b] || []).push(b);
  });

  var eventsOf = {};
  (S.events || []).forEach(function (ev) {
    (ev.people || []).forEach(function (id) { (eventsOf[id] = eventsOf[id] || []).push(ev); });
  });

  /* ---------------------------------------------------------------------
     Layout — pinned people keep their x/y; the rest gather around their
     region's anchor and are nudged apart until nobody overlaps.
     --------------------------------------------------------------------- */
  // The space a person takes up: the medallion plus the two lines of text below it.
  function box(p) {
    var sub = (p.kind === 'pc' ? p.playbook : p.role) || '';
    var textW = Math.max(p.name.length * (p.kind === 'pc' ? 15 : 10.5), sub.length * 6.6);
    var hw = Math.max(p.r, textW / 2) + 10;
    return { l: p.x - hw, r: p.x + hw, t: p.y - p.r - 10, b: p.y + p.r + (p.kind === 'pc' ? 64 : 50) };
  }
  // How far a must move (dx, dy) to stop overlapping b, or null if they are apart.
  function separation(a, b) {
    var ox = Math.min(a.r, b.r) - Math.max(a.l, b.l);
    var oy = Math.min(a.b, b.b) - Math.max(a.t, b.t);
    if (ox <= 0 || oy <= 0) return null;
    var acx = (a.l + a.r) / 2, bcx = (b.l + b.r) / 2, acy = (a.t + a.b) / 2, bcy = (b.t + b.b) / 2;
    if (ox < oy) return { dx: acx < bcx ? -ox : ox, dy: 0 };
    return { dx: 0, dy: acy < bcy ? -oy : oy };
  }

  (function layout() {
    var free = people.filter(function (p) { return typeof p.x !== 'number' || typeof p.y !== 'number'; });
    if (!free.length) return;
    // fixed things drawn on the sheet that nobody should sit on
    var obstacles = [
      { l: 846, r: 954, t: 536, b: 684 },        // the standing stone
      { l: 26, r: 454, t: 20, b: 180 },          // the title cartouche
      { l: 1330, r: 1530, t: 180, b: 224 },      // "Lielais mežs"
      { l: 1580, r: 1730, t: 526, b: 570 },      // "Svešumā"
      { l: 1610, r: 1770, t: 1138, b: 1182 },    // "Purmale"
      { l: 30, r: 230, t: 1134, b: 1178 }        // "Uz svešumu"
    ];
    function neighbours(p) {
      return (bondsOf[p.id] || []).map(function (b) { return byId[b.a === p.id ? b.b : b.a]; });
    }
    var perGroup = {};
    free.forEach(function (p) {
      var g = (S.groups && S.groups[p.group]) || { x: W / 2, y: H / 2 };
      p.ax = g.x; p.ay = g.y;
      p.free = true;
    });
    free.forEach(function (p) {
      // villagers start between the village anchor and the pinned people they are
      // tied to; people from outlying regions start in their own region
      var nb = neighbours(p).filter(function (q) { return !q.free; });
      var sx = p.ax, sy = p.ay;
      if (nb.length && p.group === 'akmengals') {
        sx = (p.ax + nb.reduce(function (t, q) { return t + q.x; }, 0) / nb.length) / 2;
        sy = (p.ay + nb.reduce(function (t, q) { return t + q.y; }, 0) / nb.length) / 2;
      }
      var i = perGroup[p.group] = (perGroup[p.group] || 0) + 1;
      var a = i * 2.39996, d = 60 + 40 * Math.sqrt(i);
      p.x = sx + Math.cos(a) * d;
      p.y = sy + Math.sin(a) * d;
    });
    for (var iter = 0; iter < 500; iter++) {
      free.forEach(function (p) {
        // villagers settle near the people they are tied to; anyone from an
        // outlying region (Purmale, far away) stays in that region
        var home = p.group === 'akmengals' ? 0.006 : 0.03;
        var ties = p.group === 'akmengals' ? 0.01 : 0.003;
        p.x += (p.ax - p.x) * home;
        p.y += (p.ay - p.y) * home;
        var nb = neighbours(p);
        if (nb.length) {
          var cx = 0, cy = 0;
          nb.forEach(function (q) { cx += q.x; cy += q.y; });
          p.x += (cx / nb.length - p.x) * ties;
          p.y += (cy / nb.length - p.y) * ties;
        }
        obstacles.forEach(function (o) {
          var sep = separation(box(p), o);
          if (sep) { p.x += sep.dx * 0.5; p.y += sep.dy * 0.5; }
        });
      });
      for (var i = 0; i < people.length; i++) {
        for (var j = i + 1; j < people.length; j++) {
          var a = people[i], b = people[j];
          if (!a.free && !b.free) continue;
          var sep = separation(box(a), box(b));
          if (!sep) continue;
          var share = (a.free && b.free) ? 0.5 : 1;
          // nudge a little extra so neighbours do not end up touching
          var ex = sep.dx ? Math.sign(sep.dx) * 2 : 0, ey = sep.dy ? Math.sign(sep.dy) * 2 : 0;
          if (a.free) { a.x += (sep.dx + ex) * share; a.y += (sep.dy + ey) * share; }
          if (b.free) { b.x -= (sep.dx + ex) * share; b.y -= (sep.dy + ey) * share; }
        }
      }
      free.forEach(function (p) {
        p.x = clamp(p.x, 90, W - 90);
        p.y = clamp(p.y, 200, H - 90);
      });
    }
    // Anyone still squeezed in takes the nearest open spot, searching outwards.
    function crowded(p) {
      var bp = box(p);
      return obstacles.some(function (o) { return separation(bp, o); }) ||
        people.some(function (q) { return q !== p && separation(bp, box(q)); });
    }
    free.forEach(function (p) {
      if (!crowded(p)) return;
      var x0 = p.x, y0 = p.y;
      for (var rad = 24; rad < 700; rad += 24) {
        for (var k = 0; k < 24; k++) {
          var a = k / 24 * Math.PI * 2;
          p.x = clamp(x0 + Math.cos(a) * rad, 90, W - 90);
          p.y = clamp(y0 + Math.sin(a) * rad, 200, H - 90);
          if (!crowded(p)) return;
        }
      }
      p.x = x0; p.y = y0;
    });
  })();

  /* ---------------------------------------------------------------------
     Line drawing
     --------------------------------------------------------------------- */
  function geometry(b) {
    var A = byId[b.a], B = byId[b.b];
    // normal is taken from the sorted pair, so parallel bonds bow to opposite sides
    var ids = b.pairKey.split('|');
    var P = byId[ids[0]], Q = byId[ids[1]];
    var dx = Q.x - P.x, dy = Q.y - P.y, len = Math.hypot(dx, dy) || 1;
    var nx = -dy / len, ny = dx / len;
    var bow;
    if (b.pairTotal > 1) {
      bow = (b.pairIndex - (b.pairTotal - 1) / 2) * 34;
    } else {
      // bow away from the village centre, so the crowded middle stays clear
      var ox = (P.x + Q.x) / 2 - 900, oy = (P.y + Q.y) / 2 - 600;
      var side = nx * ox + ny * oy;
      var sign = Math.abs(side) > 20 ? (side > 0 ? 1 : -1) : (hash(b.pairKey) % 2 ? 1 : -1);
      bow = sign * Math.min(26, len * 0.05);
    }
    var mx = (A.x + B.x) / 2 + nx * bow * 2;
    var my = (A.y + B.y) / 2 + ny * bow * 2;
    return { x0: A.x, y0: A.y, cx: mx, cy: my, x2: B.x, y2: B.y };
  }

  function qPoint(g, t) {
    var u = 1 - t;
    return {
      x: u * u * g.x0 + 2 * u * t * g.cx + t * t * g.x2,
      y: u * u * g.y0 + 2 * u * t * g.cy + t * t * g.y2
    };
  }
  function qTangent(g, t) {
    var dx = 2 * (1 - t) * (g.cx - g.x0) + 2 * t * (g.x2 - g.cx);
    var dy = 2 * (1 - t) * (g.cy - g.y0) + 2 * t * (g.y2 - g.cy);
    var l = Math.hypot(dx, dy) || 1;
    return { x: dx / l, y: dy / l };
  }
  function qPath(g) {
    return 'M' + f1(g.x0) + ' ' + f1(g.y0) + ' Q' + f1(g.cx) + ' ' + f1(g.cy) + ' ' + f1(g.x2) + ' ' + f1(g.y2);
  }
  // A path that wiggles around the curve: 'zig' for a jagged line, 'wave' for a smooth one.
  function offsetPath(g, kind) {
    var N = 240, pts = [], acc = 0, prev = qPoint(g, 0);
    for (var i = 0; i <= N; i++) {
      var t = i / N, p = qPoint(g, t);
      acc += Math.hypot(p.x - prev.x, p.y - prev.y);
      prev = p;
      pts.push({ t: t, p: p, s: acc });
    }
    var out = [], step = kind === 'zig' ? 7 : 3, next = 0, flip = 1;
    pts.forEach(function (q) {
      if (q.s < next && q.t < 1) return;
      next = q.s + step;
      var tan = qTangent(g, q.t);
      var amp;
      if (kind === 'zig') { amp = 4 * flip; flip = -flip; }
      else { amp = 3.4 * Math.sin(q.s / 22 * Math.PI * 2); }
      out.push(f1(q.p.x - tan.y * amp) + ' ' + f1(q.p.y + tan.x * amp));
    });
    return 'M' + out.join(' L');
  }

  function linkInk(type, g) {
    var d = qPath(g);
    switch (type) {
      case 'kin':
        return '<path class="ink ink-kin" d="' + d + '"/><path class="ink ink-kin-gap" d="' + d + '"/>';
      case 'duty':
        return '<path class="ink ink-duty" d="' + d + '"/><path class="ink ink-duty-ticks" d="' + d + '"/>';
      case 'tension':
        return '<path class="ink ink-tension" d="' + offsetPath(g, 'zig') + '"/>';
      case 'sorcery':
        return '<path class="ink ink-sorcery" d="' + offsetPath(g, 'wave') + '"/>';
      default:
        return '<path class="ink ink-' + type + '" d="' + d + '"/>';
    }
  }

  function swatch(type) {
    var g = { x0: 3, y0: 9, cx: 25, cy: 9, x2: 47, y2: 9 };
    return '<svg class="swatch" viewBox="0 0 50 18" aria-hidden="true">' + linkInk(type, g) + '</svg>';
  }

  /* ---------------------------------------------------------------------
     Scenery — the hand-drawn landscape behind the people
     --------------------------------------------------------------------- */
  function scenery() {
    var r = rng(1871);
    var out = [];

    // sheet edge
    out.push('<rect class="sheet-edge" x="8" y="8" width="' + (W - 16) + '" height="' + (H - 16) + '"/>');
    out.push('<rect class="sheet-edge thin" x="18" y="18" width="' + (W - 36) + '" height="' + (H - 36) + '"/>');

    // the Great Wood: along the top edge and down the eastern side
    function crown(x, y, s) {
      var n = 6 + Math.floor(r() * 4), pts = [], i;
      for (i = 0; i <= n; i++) {
        var a = Math.PI * 0.9 + (Math.PI * 1.2) * (i / n);
        var rr = s * (0.8 + r() * 0.3);
        pts.push([x + Math.cos(a) * rr * 1.1, y + Math.sin(a) * rr]);
      }
      var d = 'M' + f1(pts[0][0]) + ' ' + f1(pts[0][1]);
      for (i = 1; i < pts.length; i++) {
        var a0 = pts[i - 1], a1 = pts[i];
        var mx = (a0[0] + a1[0]) / 2, my = (a0[1] + a1[1]) / 2;
        var ox = mx - x, oy = my - y, ol = Math.hypot(ox, oy) || 1;
        var bulge = s * (0.22 + r() * 0.2);
        d += ' Q' + f1(mx + ox / ol * bulge) + ' ' + f1(my + oy / ol * bulge) + ' ' + f1(a1[0]) + ' ' + f1(a1[1]);
      }
      d += ' Q' + f1(x + s * 0.2) + ' ' + f1(y + s * 0.62) + ' ' + f1(pts[0][0]) + ' ' + f1(pts[0][1]);
      var trunk = 'M' + f1(x - 1.5) + ' ' + f1(y + s * 0.5) + ' l0.5 ' + f1(s * 0.5) + ' M' + f1(x + 2.5) + ' ' + f1(y + s * 0.5) + ' l0 ' + f1(s * 0.48);
      var hatch = '';
      var hn = 3 + Math.floor(r() * 4);
      for (i = 0; i < hn; i++) {
        var ha = Math.PI * (0.05 + r() * 0.55);
        var hx = x + Math.cos(ha) * s * (0.45 + r() * 0.35), hy = y + Math.sin(ha) * s * (0.25 + r() * 0.4) - s * 0.15;
        hatch += 'M' + f1(hx) + ' ' + f1(hy) + ' l' + f1(-2 - r() * 2) + ' ' + f1(4 + r() * 4) + ' ';
      }
      // a few leafy flicks inside the crown
      for (i = 0; i < 2; i++) {
        var lx = x + (r() - 0.6) * s * 0.9, ly = y + (r() - 0.7) * s * 0.7;
        hatch += 'M' + f1(lx) + ' ' + f1(ly) + ' q3 -3 6 0 ';
      }
      return '<g class="tree"><path class="trunk" d="' + trunk + '"/><path class="crown" d="' + d + '"/><path class="hatch" d="' + hatch + '"/></g>';
    }
    function spruce(x, y, s) {
      var tiers = 4, i, top = y - s * 1.7;
      var d = 'M' + f1(x) + ' ' + f1(top);
      for (i = 1; i <= tiers; i++) {
        d += ' L' + f1(x + s * 0.24 * i + r() * 2) + ' ' + f1(top + s * 0.42 * i) + ' L' + f1(x + s * 0.1 * i) + ' ' + f1(top + s * 0.42 * i - s * 0.06);
      }
      d += ' L' + f1(x + s * 0.5) + ' ' + f1(y + s * 0.05) + ' L' + f1(x - s * 0.5) + ' ' + f1(y + s * 0.05);
      for (i = tiers; i >= 1; i--) {
        d += ' L' + f1(x - s * 0.1 * i) + ' ' + f1(top + s * 0.42 * i - s * 0.06) + ' L' + f1(x - s * 0.24 * i - r() * 2) + ' ' + f1(top + s * 0.42 * i);
      }
      d += ' Z';
      var hatch = '';
      for (i = 1; i < tiers; i++) hatch += 'M' + f1(x + s * 0.05) + ' ' + f1(top + s * 0.42 * i + 2) + ' l' + f1(s * 0.16) + ' ' + f1(s * 0.14) + ' ';
      return '<g class="tree"><path class="trunk" d="M' + f1(x) + ' ' + f1(y + s * 0.05) + ' l0 ' + f1(s * 0.3) + '"/><path class="crown" d="' + d + '"/><path class="hatch" d="' + hatch + '"/></g>';
    }
    var trees = [];
    // scatter along the top band; farther (higher) trees are smaller
    for (var ti = 0; ti < 190; ti++) {
      var tx = -20 + r() * (W + 40), ty = 40 + Math.pow(r(), 0.8) * 118;
      if (ty > 128 && tx > 800 && tx < 1010) continue;       // a clearing above the village
      if (tx < 470 && ty < 168) continue;                     // room for the cartouche
      trees.push([tx, ty]);
    }
    // the wood runs down the eastern edge
    for (var tj = 0; tj < 46; tj++) {
      var ex = W - 20 - Math.pow(r(), 1.5) * 150, ey = 150 + r() * 330;
      trees.push([ex, ey]);
    }
    trees.sort(function (a, b) { return a[1] - b[1]; });
    trees.forEach(function (t) {
      var size = 13 + (t[1] - 30) / 130 * 13 + r() * 6;
      out.push(r() < 0.3 ? spruce(t[0], t[1] + size * 0.4, size * 0.95) : crown(t[0], t[1], size));
    });
    // undergrowth along the edge of the wood
    var edge = '';
    for (var ux = 480; ux < W - 160; ux += 9 + r() * 12) {
      if (ux > 800 && ux < 1010) continue;
      var uy = 172 + r() * 10;
      edge += 'M' + f1(ux) + ' ' + f1(uy) + ' q2 -6 5 0 ';
    }
    out.push('<path class="undergrowth" d="' + edge + '"/>');

    // the hill of Akmeņgals with its standing stone
    out.push('<ellipse class="palisade" cx="900" cy="618" rx="300" ry="226"/>');
    out.push('<path class="stone" d="M885 662 L890 578 Q900 546 910 578 L915 662 Z"/>');
    out.push('<path class="hatch" d="M903 572 l2 14 M905 592 l2 20 M906 618 l2 20 M907 642 l1 14"/>');
    out.push('<path class="ground" d="M860 664 Q900 654 940 664 M872 670 l-6 4 M930 670 l6 4"/>');

    // fields south-west of the village
    var fields = [
      [[240, 1060], [420, 1040], [440, 1110], [250, 1130]],
      [[450, 1050], [600, 1030], [620, 1090], [465, 1110]],
      [[270, 1145], [450, 1124], [465, 1176], [280, 1182]],
      [[480, 1122], [640, 1104], [650, 1166], [492, 1178]]
    ];
    fields.forEach(function (q, fi) {
      out.push('<path class="field" d="M' + q.map(function (p) { return p.join(' '); }).join(' L') + ' Z"/>');
      var rowsN = 5, i, j;
      var furrows = '';
      for (i = 1; i < rowsN; i++) {
        var t = i / rowsN;
        var ax = q[0][0] + (q[3][0] - q[0][0]) * t, ay = q[0][1] + (q[3][1] - q[0][1]) * t;
        var bx = q[1][0] + (q[2][0] - q[1][0]) * t, by = q[1][1] + (q[2][1] - q[1][1]) * t;
        var steps = 14;
        for (j = 0; j < steps; j++) {
          var u = (j + 0.2) / steps;
          var px = ax + (bx - ax) * u, py = ay + (by - ay) * u;
          furrows += fi % 2 ? 'M' + f1(px) + ' ' + f1(py) + ' l4 -5 ' : 'M' + f1(px) + ' ' + f1(py) + ' l6 0 ';
        }
      }
      out.push('<path class="furrow" d="' + furrows + '"/>');
    });

    // the road west, out into the wide world
    out.push('<path class="road" d="M560 880 Q420 930 300 960 Q170 990 90 1060 Q50 1095 -10 1120"/>');
    out.push('<path class="road" d="M566 894 Q428 944 306 974 Q182 1004 104 1070 Q64 1104 0 1134"/>');

    // Purmale's marsh in the south-east
    var avoid = [[1290, 990, 90], [1530, 1080, 95], [1030, 1040, 80]];
    function clear(x, y) {
      return avoid.every(function (a) { return Math.hypot(x - a[0], y - a[1]) > a[2]; });
    }
    var reeds = '', water = '';
    for (var k = 0; k < 46; k++) {
      var x = 1160 + r() * 620, y = 1040 + r() * 140;
      if (!clear(x, y)) continue;
      if (r() < 0.55) {
        var h = 10 + r() * 10;
        reeds += 'M' + f1(x) + ' ' + f1(y) + ' q-2 ' + f1(-h * 0.6) + ' -6 ' + f1(-h) +
                 ' M' + f1(x) + ' ' + f1(y) + ' l0 ' + f1(-h * 1.1) +
                 ' M' + f1(x) + ' ' + f1(y) + ' q2 ' + f1(-h * 0.6) + ' 6 ' + f1(-h * 0.9) + ' ';
      } else {
        var wl = 14 + r() * 26;
        water += 'M' + f1(x) + ' ' + f1(y) + ' l' + f1(wl) + ' 0 M' + f1(x + 6) + ' ' + f1(y + 5) + ' l' + f1(wl * 0.6) + ' 0 ';
      }
    }
    out.push('<path class="reeds" d="' + reeds + '"/>');
    out.push('<path class="water" d="' + water + '"/>');

    // distant hills in the east, where the stranger came from
    out.push('<path class="hills" d="M1560 586 q22 -26 44 0 q16 -18 32 0 q20 -24 42 0 q14 -14 28 0"/>');
    out.push('<path class="hatch" d="M1590 578 l4 6 M1630 580 l3 5 M1672 578 l4 6"/>');

    // birds over the wood
    out.push('<path class="bird" d="M640 184 q6 -6 12 0 q6 -6 12 0 M676 170 q4 -4 8 0 q4 -4 8 0 M1296 190 q5 -5 10 0 q5 -5 10 0"/>');

    return out.join('');
  }

  function regionLabels() {
    return [
      '<text class="region" x="1430" y="214">Lielais mežs</text>',
      '<text class="region" x="1690" y="1172">Purmale</text>',
      '<text class="region" x="1655" y="560">Svešumā</text>',
      '<text class="region" x="130" y="1168">Uz svešumu</text>'
    ].join('');
  }

  function cartouche() {
    var x = 40, y = 34, w = 400, h = 132;
    var corner = function (cx, cy) {
      return '<path class="c-orn" d="M' + (cx - 7) + ' ' + cy + ' L' + cx + ' ' + (cy - 7) + ' L' + (cx + 7) + ' ' + cy + ' L' + cx + ' ' + (cy + 7) + ' Z"/>';
    };
    return '<g class="cartouche">' +
      '<rect class="c-bg" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"/>' +
      '<rect class="c-line" x="' + (x + 7) + '" y="' + (y + 7) + '" width="' + (w - 14) + '" height="' + (h - 14) + '"/>' +
      corner(x + 7, y + 7) + corner(x + w - 7, y + 7) + corner(x + 7, y + h - 7) + corner(x + w - 7, y + h - 7) +
      '<text class="c-kicker" x="' + (x + w / 2) + '" y="' + (y + 38) + '">Stonetop</text>' +
      '<text class="c-title" x="' + (x + w / 2) + '" y="' + (y + 86) + '">Akmeņgala ļaudis</text>' +
      '<text class="c-sub" x="' + (x + w / 2) + '" y="' + (y + 112) + '">un viņu saites</text>' +
    '</g>';
  }

  /* ---------------------------------------------------------------------
     Build the SVG
     --------------------------------------------------------------------- */
  var svg = document.getElementById('map');
  var defs =
    '<defs>' +
      '<filter id="rough" x="-5%" y="-5%" width="110%" height="110%">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="3" result="n"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G"/>' +
      '</filter>' +
      '<filter id="rough-fine" x="-5%" y="-5%" width="110%" height="110%">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="1" seed="9" result="n"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="n" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>' +
      '</filter>' +
      '<pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">' +
        '<line x1="0" y1="0" x2="0" y2="5" stroke="#4a4128" stroke-width="1.1" opacity=".55"/>' +
      '</pattern>' +
      '<radialGradient id="disc-fill" cx="42%" cy="38%" r="70%">' +
        '<stop offset="0" stop-color="#fdf6e4"/><stop offset="1" stop-color="#efdcae"/>' +
      '</radialGradient>' +
    '</defs>';

  var linksSvg = bonds.map(function (b) {
    var g = b.geom = geometry(b);
    var mid = qPoint(g, 0.5);
    b.mid = mid;
    var shadow = byId[b.a].kind === 'shadow' || byId[b.b].kind === 'shadow';
    return '<g class="link type-' + b.type + (shadow ? ' faint' : '') + '" data-bond="' + b.id + '">' +
      '<path class="hit" d="' + qPath(g) + '"/>' + linkInk(b.type, g) + '</g>';
  }).join('');

  var linkLabelsSvg = bonds.map(function (b) {
    return '<g class="link-label type-' + b.type + '" data-bond="' + b.id + '" transform="translate(' + f1(b.mid.x) + ' ' + f1(b.mid.y) + ')">' +
      '<text y="4">' + esc(b.label) + '</text></g>';
  }).join('');

  var nodesSvg = people.map(function (p) {
    var r = p.r, st = statusText(p);
    var parts = [];
    parts.push('<circle class="halo" r="' + (r + 10) + '"/>');
    if (p.kind === 'pc') parts.push('<circle class="rim" r="' + (r + 6) + '"/>');
    parts.push('<circle class="disc" r="' + r + '"/>');
    parts.push('<circle class="ring" r="' + (r - 4.5) + '"/>');
    if (p.status === 'dead') parts.push('<circle class="hatching" r="' + (r - 4.5) + '"/>');
    parts.push(S.glyphMarkup(p.glyph, 0, 0, r * 1.22));
    if (p.status === 'missing' || p.status === 'away' || p.status === 'dead') {
      var mark = { missing: '?', away: '→', dead: '×' }[p.status];
      parts.push('<g class="badge" transform="translate(' + f1(r * 0.74) + ' ' + f1(-r * 0.74) + ')"><circle r="10"/><text y="4.5">' + mark + '</text></g>');
    }
    var sub = p.kind === 'pc' ? p.playbook : p.role;
    if (st) sub = sub ? sub + ' · ' + st : st;
    var label =
      '<g class="label" data-y="' + (r + 8) + '" transform="translate(0 ' + (r + 8) + ')">' +
        '<text class="name" y="' + (p.kind === 'pc' ? 24 : 18) + '">' + esc(p.name) + '</text>' +
        (sub ? '<text class="sub" y="' + (p.kind === 'pc' ? 44 : 34) + '">' + esc(sub) + '</text>' : '') +
      '</g>';
    var aria = p.name + (p.role ? ', ' + p.role : '') + (st ? ', ' + st : '');
    return '<g class="node kind-' + esc(p.kind) + ' status-' + esc(p.status || 'alive') + '" data-person="' + esc(p.id) + '" ' +
      'transform="translate(' + f1(p.x) + ' ' + f1(p.y) + ')" tabindex="0" role="button" aria-label="' + esc(aria) + '">' +
      parts.join('') + label + '</g>';
  }).join('');

  svg.innerHTML = defs +
    '<g id="viewport">' +
      '<g class="scenery" filter="url(#rough)">' + scenery() + '</g>' +
      '<g class="regions">' + regionLabels() + cartouche() + '</g>' +
      '<g class="links" filter="url(#rough-fine)">' + linksSvg + '</g>' +
      '<g class="nodes">' + nodesSvg + '</g>' +
      '<g class="link-labels">' + linkLabelsSvg + '</g>' +
    '</g>';

  var viewport = svg.querySelector('#viewport');
  var nodeEls = {}, linkEls = {}, linkLabelEls = {};
  svg.querySelectorAll('.node').forEach(function (el) { nodeEls[el.getAttribute('data-person')] = el; });
  svg.querySelectorAll('.link').forEach(function (el) { linkEls[el.getAttribute('data-bond')] = el; });
  svg.querySelectorAll('.link-label').forEach(function (el) { linkLabelEls[el.getAttribute('data-bond')] = el; });
  var bondById = {};
  bonds.forEach(function (b) { bondById[b.id] = b; });

  /* ---------------------------------------------------------------------
     Pan & zoom
     --------------------------------------------------------------------- */
  var stage = document.querySelector('.map-stage');
  var panelEl = document.getElementById('panel');
  var view = { k: 1, x: 0, y: 0 };
  var kMin = 0.2, kMax = 2.6;
  var labelScale = 1;
  var movingTimer = null;

  function stageSize() {
    var r = svg.getBoundingClientRect();
    return { w: r.width, h: r.height, left: r.left, top: r.top };
  }
  // Part of the stage that the bottom sheet does not cover (phones).
  // Uses the sheet's resting height, not its position mid-animation.
  var safeProbe = document.createElement('div');
  safeProbe.style.cssText = 'position:fixed;left:0;bottom:0;width:1px;height:env(safe-area-inset-bottom);visibility:hidden;pointer-events:none';
  document.body.appendChild(safeProbe);
  function visibleArea() {
    var s = stageSize();
    if (!isSheet()) return { w: s.w, h: s.h };
    var covered = panelEl.classList.contains('open') ? panelEl.offsetHeight : document.getElementById('panel-grip').offsetHeight + safeProbe.offsetHeight;
    return { w: s.w, h: Math.max(80, s.h - covered) };
  }
  function isSheet() { return window.matchMedia('(max-width: 899px)').matches; }

  function constrain(v) {
    var s = stageSize(), a = visibleArea();
    var k = clamp(v.k, kMin, kMax);
    return {
      k: k,
      x: clamp(v.x, s.w * 0.5 - W * k, s.w * 0.5),
      y: clamp(v.y, a.h * 0.45 - H * k, s.h * 0.55)
    };
  }

  function apply() {
    viewport.setAttribute('transform', 'translate(' + f1(view.x) + ' ' + f1(view.y) + ') scale(' + view.k.toFixed(4) + ')');
    // keep names legible when zoomed far out
    var ls = clamp(0.62 / view.k, 1, 1.6);
    if (Math.abs(ls - labelScale) > 0.01) {
      labelScale = ls;
      svg.querySelectorAll('.node .label').forEach(function (el) {
        el.setAttribute('transform', 'translate(0 ' + el.getAttribute('data-y') + ') scale(' + ls.toFixed(3) + ')');
      });
      svg.querySelectorAll('.link-label text').forEach(function (el) {
        el.setAttribute('transform', 'scale(' + ls.toFixed(3) + ')');
      });
      if (placedFor) placeLabels(placedFor);
    }
  }

  function markMoving() {
    svg.classList.add('is-moving');
    clearTimeout(movingTimer);
    movingTimer = setTimeout(function () { svg.classList.remove('is-moving'); }, 180);
  }

  function setView(v) { view = constrain(v); apply(); }

  var anim = null;
  function stopAnim() { if (anim) { cancelAnimationFrame(anim); anim = null; } }
  function animateTo(target, ms) {
    target = constrain(target);
    if (anim) cancelAnimationFrame(anim);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setView(target); return; }
    var from = { k: view.k, x: view.x, y: view.y }, t0 = performance.now();
    ms = ms || 520;
    (function step(now) {
      var t = clamp((now - t0) / ms, 0, 1);
      var e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      view = { k: from.k + (target.k - from.k) * e, x: from.x + (target.x - from.x) * e, y: from.y + (target.y - from.y) * e };
      apply();
      markMoving();
      if (t < 1) anim = requestAnimationFrame(step); else anim = null;
    })(t0);
  }

  function updateKMin() {
    var a = visibleArea();
    kMin = Math.min(Math.min((a.w - 24) / W, (a.h - 24) / H) * 0.9, 0.5);
  }
  // The whole sheet, fitted to the screen.
  function fitView() {
    var a = visibleArea();
    var fit = Math.min((a.w - 24) / W, (a.h - 24) / H);
    updateKMin();
    return { k: fit, x: (a.w - W * fit) / 2, y: (a.h - H * fit) / 2 };
  }
  // Where the map opens: the whole sheet if it is legible, otherwise the PCs.
  function homeView() {
    var a = visibleArea();
    var fit = Math.min((a.w - 24) / W, (a.h - 24) / H);
    updateKMin();
    if (fit >= 0.5) return fitView();
    // small screens: start on the three player characters
    var k = clamp(Math.min(a.w / 760, a.h / 640), 0.42, 0.75);
    return { k: k, x: a.w / 2 - 900 * k, y: a.h / 2 - 590 * k };
  }

  function zoomAt(px, py, factor) {
    stopAnim();
    var k2 = clamp(view.k * factor, kMin, kMax);
    var f = k2 / view.k;
    setView({ k: k2, x: px - (px - view.x) * f, y: py - (py - view.y) * f });
    markMoving();
  }

  function centreOn(p, k) {
    var a = visibleArea();
    k = k || Math.max(view.k, isSheet() ? 0.75 : 0.85);
    animateTo({ k: k, x: a.w / 2 - p.x * k, y: a.h / 2 - p.y * k });
  }

  svg.addEventListener('wheel', function (e) {
    e.preventDefault();
    var s = stageSize();
    var dy = e.deltaY * (e.deltaMode === 1 ? 16 : 1);
    zoomAt(e.clientX - s.left, e.clientY - s.top, Math.exp(-dy * (e.ctrlKey ? 0.01 : 0.0018)));
  }, { passive: false });

  // Safari (macOS trackpad) pinches arrive as gesture events, not ctrl+wheel.
  var gestureK = 1;
  svg.addEventListener('gesturestart', function (e) { e.preventDefault(); gestureK = view.k; });
  svg.addEventListener('gesturechange', function (e) {
    e.preventDefault();
    if (pointers.size) return;   // touch pinches are handled by pointer events
    var s = stageSize();
    zoomAt(e.clientX - s.left, e.clientY - s.top, gestureK * e.scale / view.k);
  });
  svg.addEventListener('gestureend', function (e) { e.preventDefault(); });

  var pointers = new Map();
  var drag = null, pinch = null, downTarget = null, moved = false;

  function targetOf(el) {
    var n = el.closest && el.closest('.node');
    if (n) return { person: n.getAttribute('data-person') };
    var l = el.closest && el.closest('.link');
    if (l) return { bond: l.getAttribute('data-bond') };
    return { none: true };
  }

  function startPinch() {
    var pts = Array.from(pointers.values()).slice(0, 2), s = stageSize();
    pinch = {
      d: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1,
      mx: (pts[0].x + pts[1].x) / 2 - s.left, my: (pts[0].y + pts[1].y) / 2 - s.top,
      k: view.k, vx: view.x, vy: view.y
    };
  }

  svg.addEventListener('pointerdown', function (e) {
    if (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse') return;
    stopAnim();
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    try { svg.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    if (pointers.size === 1) {
      downTarget = targetOf(e.target);
      moved = false;
      // fingers wobble more than a mouse does
      drag = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y, slop: e.pointerType === 'mouse' ? 4 : 10 };
    } else if (pointers.size >= 2) {
      startPinch();
      drag = null; moved = true;
    }
  });

  svg.addEventListener('pointermove', function (e) {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch && pointers.size >= 2) {
      var pts = Array.from(pointers.values()).slice(0, 2), s = stageSize();
      var d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
      var mx = (pts[0].x + pts[1].x) / 2 - s.left, my = (pts[0].y + pts[1].y) / 2 - s.top;
      var k2 = clamp(pinch.k * d / pinch.d, kMin, kMax), f = k2 / pinch.k;
      setView({ k: k2, x: mx - (pinch.mx - pinch.vx) * f, y: my - (pinch.my - pinch.vy) * f });
      markMoving();
    } else if (drag) {
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!moved && Math.hypot(dx, dy) > (drag.slop || 5)) { moved = true; svg.classList.add('is-dragging'); }
      if (moved) { setView({ k: view.k, x: drag.vx + dx, y: drag.vy + dy }); markMoving(); }
    }
  });

  function endPointer(e) {
    if (!pointers.has(e.pointerId)) return;
    pointers.delete(e.pointerId);
    if (pointers.size >= 2) { startPinch(); return; }
    pinch = null;
    if (pointers.size === 1) {
      var p = Array.from(pointers.values())[0];
      drag = { x: p.x, y: p.y, vx: view.x, vy: view.y, slop: 10 };
      return;
    }
    if (pointers.size === 0) {
      svg.classList.remove('is-dragging');
      if (!moved && e.type === 'pointerup' && downTarget) {
        if (downTarget.person) select(downTarget.person, { centre: isSheet() });
        else if (downTarget.bond) selectBond(downTarget.bond);
        else {
          if (selected) clearSelection();
          if (isSheet()) openSheet(false);
        }
      }
      drag = null; downTarget = null;
    }
  }
  svg.addEventListener('pointerup', endPointer);
  svg.addEventListener('pointercancel', endPointer);

  function zoomBtn(factor) {
    var a = visibleArea(), k2 = clamp(view.k * factor, kMin, kMax), f = k2 / view.k;
    animateTo({ k: k2, x: a.w / 2 - (a.w / 2 - view.x) * f, y: a.h / 2 - (a.h / 2 - view.y) * f }, 260);
  }
  document.getElementById('zoom-in').addEventListener('click', function () { zoomBtn(1.4); });
  document.getElementById('zoom-out').addEventListener('click', function () { zoomBtn(1 / 1.4); });
  document.getElementById('zoom-reset').addEventListener('click', function () { animateTo(fitView()); });

  /* ---------------------------------------------------------------------
     Highlighting
     --------------------------------------------------------------------- */
  var selected = null;      // { person } or { bond }
  var hidden = {};          // relationship types switched off in the legend

  function clearMarks() {
    resetLabels();
    svg.classList.remove('has-focus');
    svg.querySelectorAll('.is-focus, .is-near, .is-hot').forEach(function (el) {
      el.classList.remove('is-focus', 'is-near', 'is-hot');
    });
  }
  function markPerson(id) {
    clearMarks();
    if (!id) return;
    svg.classList.add('has-focus');
    nodeEls[id].classList.add('is-focus');
    (bondsOf[id] || []).forEach(function (b) {
      if (hidden[b.type]) return;
      linkEls[b.id].classList.add('is-hot');
      linkLabelEls[b.id].classList.add('is-hot');
      nodeEls[b.a === id ? b.b : b.a].classList.add('is-near');
    });
    placeLabels(id);
  }

  function moveLabel(b, t) {
    var p = qPoint(b.geom, t);
    linkLabelEls[b.id].setAttribute('transform', 'translate(' + f1(p.x) + ' ' + f1(p.y) + ')');
    return p;
  }

  // Spread the labels of one person's bonds outwards along their lines,
  // so they neither sit on top of the medallion nor on top of each other.
  var placedFor = null;
  function placeLabels(id) {
    placedFor = id;
    var items = (bondsOf[id] || []).filter(function (b) { return !hidden[b.type]; }).map(function (b) {
      var text = linkLabelEls[b.id].querySelector('text');
      var w = 0;
      try { w = text.getComputedTextLength(); } catch (err) { w = b.label.length * 7; }
      return { b: b, s: 0.55, w: (w + 14) * labelScale, h: 22 * labelScale, fromA: b.a === id };
    });
    function pos(it) {
      var t = it.fromA ? it.s : 1 - it.s;
      return qPoint(it.b.geom, t);
    }
    for (var iter = 0; iter < 60; iter++) {
      var movedAny = false;
      for (var i = 0; i < items.length; i++) {
        for (var j = i + 1; j < items.length; j++) {
          var A = items[i], B = items[j], pa = pos(A), pb = pos(B);
          if (Math.abs(pa.x - pb.x) < (A.w + B.w) / 2 && Math.abs(pa.y - pb.y) < (A.h + B.h) / 2) {
            // push the one with more room further out along its line
            var la = Math.hypot(A.b.geom.x2 - A.b.geom.x0, A.b.geom.y2 - A.b.geom.y0);
            var lb = Math.hypot(B.b.geom.x2 - B.b.geom.x0, B.b.geom.y2 - B.b.geom.y0);
            var mover = (la * (0.85 - A.s) >= lb * (0.85 - B.s)) ? A : B;
            var other = mover === A ? B : A;
            if (mover.s < 0.82) { mover.s += 0.035; movedAny = true; }
            else if (other.s > 0.32) { other.s -= 0.035; movedAny = true; }
          }
        }
      }
      if (!movedAny) break;
    }
    items.forEach(function (it) { moveLabel(it.b, it.fromA ? it.s : 1 - it.s); });
  }

  function resetLabels() {
    if (!placedFor) return;
    (bondsOf[placedFor] || []).forEach(function (b) { moveLabel(b, 0.5); });
    placedFor = null;
  }
  function markBond(bid) {
    clearMarks();
    var b = bondById[bid];
    if (!b) return;
    svg.classList.add('has-focus');
    linkEls[bid].classList.add('is-hot');
    linkLabelEls[bid].classList.add('is-hot');
    nodeEls[b.a].classList.add('is-focus');
    nodeEls[b.b].classList.add('is-focus');
  }
  function restoreMarks() {
    if (selected && selected.person) markPerson(selected.person);
    else if (selected && selected.bond) markBond(selected.bond);
    else clearMarks();
  }

  // hover (mouse only)
  svg.addEventListener('pointerover', function (e) {
    if (e.pointerType !== 'mouse' || drag && moved) return;
    var t = targetOf(e.target);
    if (t.person && !selected) markPerson(t.person);
    if (t.bond) {
      linkEls[t.bond].classList.add('is-hover');
      linkLabelEls[t.bond].classList.add('is-hover');
    }
  });
  svg.addEventListener('pointerout', function (e) {
    if (e.pointerType !== 'mouse') return;
    var t = targetOf(e.target);
    if (t.person && !selected) clearMarks();
    if (t.bond) {
      linkEls[t.bond].classList.remove('is-hover');
      linkLabelEls[t.bond].classList.remove('is-hover');
    }
  });

  // keyboard
  svg.addEventListener('keydown', function (e) {
    var n = e.target.closest && e.target.closest('.node');
    if (n && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      select(n.getAttribute('data-person'), { centre: true });
    }
  });
  svg.addEventListener('focusin', function (e) {
    var n = e.target.closest && e.target.closest('.node');
    if (!n) return;
    var p = byId[n.getAttribute('data-person')];
    if (!selected) markPerson(p.id);
    // keyboard focus on someone outside the view: bring them into it
    var a = visibleArea(), sx = view.x + p.x * view.k, sy = view.y + p.y * view.k;
    if (sx < 40 || sy < 40 || sx > a.w - 40 || sy > a.h - 40) centreOn(p, view.k);
  });
  svg.addEventListener('focusout', function () { if (!selected) clearMarks(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && selected) { clearSelection(); }
    if (e.target.closest && e.target.closest('input, textarea')) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var a = visibleArea();
    if (e.key === '+' || e.key === '=') zoomAt(a.w / 2, a.h / 2, 1.25);
    if (e.key === '-' || e.key === '_') zoomAt(a.w / 2, a.h / 2, 0.8);
  });

  /* ---------------------------------------------------------------------
     The side panel (a bottom sheet on phones)
     --------------------------------------------------------------------- */
  var body = document.getElementById('panel-body');
  var grip = document.getElementById('panel-grip');
  var gripTitle = document.getElementById('grip-title');

  function openSheet(open) {
    panelEl.classList.toggle('open', open);
    grip.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  grip.addEventListener('click', function () { openSheet(!panelEl.classList.contains('open')); });

  function medal(p, size) {
    var r = 44;
    return '<svg class="medal kind-' + esc(p.kind) + ' status-' + esc(p.status || 'alive') + '" viewBox="-56 -56 112 112" width="' + size + '" height="' + size + '" aria-hidden="true">' +
      (p.kind === 'pc' ? '<circle class="rim" r="' + (r + 7) + '"/>' : '') +
      '<circle class="disc" r="' + r + '"/><circle class="ring" r="' + (r - 5) + '"/>' +
      (p.status === 'dead' ? '<circle class="hatching" r="' + (r - 5) + '"/>' : '') +
      S.glyphMarkup(p.glyph, 0, 0, r * 1.25) + '</svg>';
  }

  function miniMedal(p) {
    return '<svg class="mini kind-' + esc(p.kind) + '" viewBox="-36 -36 72 72" aria-hidden="true"><circle class="disc" r="31"/>' +
      S.glyphMarkup(p.glyph, 0, 0, 40) + '</svg>';
  }

  function kicker(p) {
    if (p.kind === 'pc') return 'Spēlētāja tēls · ' + esc(p.playbook || '');
    if (p.kind === 'shadow') return 'Ēnā palicis tēls';
    var g = S.groups && S.groups[p.group];
    return g ? esc(g.name) : '';
  }

  function legendHtml() {
    var counts = {};
    bonds.forEach(function (b) { counts[b.type] = (counts[b.type] || 0) + 1; });
    var anyHidden = TYPE_ORDER.some(function (t) { return hidden[t]; });
    return '<section class="legend" aria-labelledby="legend-h">' +
      '<div class="section-head"><h3 id="legend-h">Saišu veidi</h3>' +
      (anyHidden ? '<button class="text-btn" type="button" data-action="show-all">Rādīt visus</button>' : '') + '</div>' +
      '<p class="hint">Spied uz veida, lai to paslēptu vai atkal parādītu kartē.</p>' +
      '<ul class="legend-list">' + TYPE_ORDER.filter(function (t) { return counts[t]; }).map(function (t) {
        return '<li><button class="legend-item type-' + t + '" type="button" data-type="' + t + '" aria-pressed="' + (!hidden[t]) + '">' +
          swatch(t) + '<span class="legend-name">' + TYPES[t].name + '</span><span class="legend-count">' + counts[t] + '</span></button></li>';
      }).join('') + '</ul></section>';
  }

  function indexHtml() {
    var sections = [
      { title: 'Spēlētāju tēli', list: people.filter(function (p) { return p.kind === 'pc'; }) }
    ];
    Object.keys(S.groups || {}).forEach(function (gid) {
      sections.push({
        title: S.groups[gid].name,
        list: people.filter(function (p) { return p.kind !== 'pc' && p.group === gid; })
      });
    });
    var known = {};
    Object.keys(S.groups || {}).forEach(function (g) { known[g] = true; });
    var orphans = people.filter(function (p) { return p.kind !== 'pc' && !known[p.group]; });
    if (orphans.length) sections.push({ title: 'Citi', list: orphans });

    return '<section class="index" aria-labelledby="index-h"><h3 id="index-h" class="sr-only">Visi tēli</h3>' +
      sections.filter(function (s) { return s.list.length; }).map(function (s) {
        var list = s.list.slice().sort(function (a, b) {
          return (a.kind === 'shadow') - (b.kind === 'shadow') || a.name.localeCompare(b.name, 'lv');
        });
        return '<div class="index-group"><h4>' + esc(s.title) + '</h4><ul>' + list.map(function (p) {
          var st = statusText(p);
          return '<li><button type="button" class="index-item kind-' + esc(p.kind) + '" data-person="' + esc(p.id) + '">' + miniMedal(p) +
            '<span class="index-text"><span class="index-name">' + esc(p.name) + '</span>' +
            '<span class="index-role">' + esc(p.kind === 'pc' ? p.playbook : p.role) + (st ? ' · ' + st : '') + '</span></span></button></li>';
        }).join('') + '</ul></div>';
      }).join('') + '</section>';
  }

  function renderIndex() {
    gripTitle.textContent = 'Tēli un saites';
    body.innerHTML =
      '<div class="intro">' +
        '<p class="intro-kicker">Stonetop · Akmeņgals</p>' +
        '<h2>Kas ir kas</h2>' +
        '<p>Izvēlies tēlu kartē vai sarakstā, lai redzētu, ar ko tas saistīts, vai līniju, lai uzzinātu, kas to vij.</p>' +
      '</div>' +
      legendHtml() + indexHtml();
  }

  function relationText(b, selfId) {
    // what the *other* person is to the selected one
    if (b.a === selfId && b.bIs) return b.bIs;
    if (b.b === selfId && b.aIs) return b.aIs;
    return b.label;
  }

  function renderPerson(id) {
    var p = byId[id];
    if (!p) return renderIndex();
    gripTitle.textContent = p.name;
    var st = statusText(p);
    var list = (bondsOf[id] || []).slice().sort(function (x, y) {
      return TYPE_ORDER.indexOf(x.type) - TYPE_ORDER.indexOf(y.type) ||
        byId[x.a === id ? x.b : x.a].name.localeCompare(byId[y.a === id ? y.b : y.a].name, 'lv');
    });
    var evs = eventsOf[id] || [];

    body.innerHTML =
      '<button class="back text-btn" type="button" data-action="index">← Visi tēli</button>' +
      '<article class="person">' +
        '<header class="person-head">' + medal(p, 96) +
          '<div><p class="kicker">' + kicker(p) + '</p>' +
          '<h2>' + esc(p.name) + '</h2>' +
          '<p class="role">' + esc(p.role || '') + (st ? ' <span class="status">' + st + '</span>' : '') + '</p></div>' +
        '</header>' +
        (p.about ? '<p class="about">' + esc(p.about) + '</p>' : '') +
        (list.length ? '<h3>Saites <span class="count">' + list.length + '</span></h3><ul class="bond-list">' + list.map(function (b) {
          var other = byId[b.a === id ? b.b : b.a];
          var rel = relationText(b, id);
          return '<li class="bond type-' + b.type + (hidden[b.type] ? ' is-hidden' : '') + '">' +
            '<div class="bond-line">' + swatch(b.type) + '<span class="bond-type">' + TYPES[b.type].name + '</span></div>' +
            '<p class="bond-head"><button type="button" class="person-link" data-person="' + esc(other.id) + '">' + esc(other.name) + '</button>' +
            (rel ? ' <span class="rel">— ' + esc(rel) + '</span>' : '') + '</p>' +
            (b.text ? '<p class="bond-text">' + esc(b.text) + '</p>' : '') + '</li>';
        }).join('') + '</ul>' : '') +
        (evs.length ? '<h3>Hronikā</h3><ul class="event-list">' + evs.map(function (ev) {
          return '<li><a href="hronika.html#' + encodeURIComponent(ev.id) + '"><span class="when">' + esc(ev.when) + '</span>' +
            '<span class="ev-title">' + esc(ev.title) + '</span></a></li>';
        }).join('') + '</ul>' : '') +
      '</article>';
  }

  function renderBond(bid) {
    var b = bondById[bid];
    if (!b) return renderIndex();
    var A = byId[b.a], B = byId[b.b];
    gripTitle.textContent = A.name + ' — ' + B.name;
    body.innerHTML =
      '<button class="back text-btn" type="button" data-action="index">← Visi tēli</button>' +
      '<article class="bond-card type-' + b.type + '">' +
        '<p class="kicker">' + swatch(b.type) + ' ' + TYPES[b.type].name + '</p>' +
        '<div class="pair">' +
          '<button type="button" class="pair-person" data-person="' + esc(A.id) + '">' + medal(A, 64) + '<span>' + esc(A.name) + '</span></button>' +
          '<span class="pair-label">' + esc(b.label) + '</span>' +
          '<button type="button" class="pair-person" data-person="' + esc(B.id) + '">' + medal(B, 64) + '<span>' + esc(B.name) + '</span></button>' +
        '</div>' +
        (b.aIs || b.bIs ? '<p class="pair-roles">' +
          (b.aIs ? '<span><b>' + esc(A.name) + '</b> — ' + esc(b.aIs) + '</span>' : '') +
          (b.bIs ? '<span><b>' + esc(B.name) + '</b> — ' + esc(b.bIs) + '</span>' : '') + '</p>' : '') +
        (b.text ? '<p class="about">' + esc(b.text) + '</p>' : '') +
      '</article>';
  }

  body.addEventListener('click', function (e) {
    var t = e.target.closest('[data-person], [data-action], [data-type]');
    if (!t) return;
    var type = t.getAttribute('data-type');
    if (t.hasAttribute('data-person')) {
      select(t.getAttribute('data-person'), { centre: true });
    } else if (t.getAttribute('data-action') === 'index') {
      clearSelection();
    } else if (t.getAttribute('data-action') === 'show-all') {
      hidden = {};
      applyHidden();
    } else if (type) {
      hidden[type] = !hidden[type];
      applyHidden();
    }
    // the panel was redrawn: keep keyboard focus where the reader was
    if (!body.contains(document.activeElement)) {
      var again = type && body.querySelector('[data-type="' + type + '"]');
      (again || body).focus({ preventScroll: true });
    }
  });

  function applyHidden() {
    TYPE_ORDER.forEach(function (t) { svg.classList.toggle('hide-' + t, !!hidden[t]); });
    restoreMarks();
    if (!selected) {
      var scroll = body.scrollTop;
      renderIndex();
      body.scrollTop = scroll;
    }
  }

  /* ---------------------------------------------------------------------
     Selection & the address bar
     --------------------------------------------------------------------- */
  function setHash(h) {
    var url = location.pathname + location.search + (h ? '#' + encodeURIComponent(h) : '');
    try { history.replaceState(null, '', url); } catch (err) { /* file:// in some browsers */ }
  }

  function select(id, opts) {
    if (!byId[id]) return;
    opts = opts || {};
    selected = { person: id };
    markPerson(id);
    renderPerson(id);
    body.scrollTop = 0;
    setHash(id);
    if (isSheet()) openSheet(true);
    if (opts.centre) {
      // wait a frame so the sheet has its new height
      requestAnimationFrame(function () { centreOn(byId[id]); });
    }
  }

  function selectBond(bid) {
    var b = bondById[bid];
    if (!b) return;
    selected = { bond: bid };
    markBond(bid);
    renderBond(bid);
    body.scrollTop = 0;
    setHash('');
    if (isSheet()) openSheet(true);
  }

  function clearSelection() {
    selected = null;
    clearMarks();
    renderIndex();
    body.scrollTop = 0;
    setHash('');
  }

  function hashId() {
    try { return decodeURIComponent(location.hash.slice(1)); } catch (err) { return ''; }
  }
  window.addEventListener('hashchange', function () {
    var id = hashId();
    if (byId[id]) select(id, { centre: true });
    else if (!id && selected) clearSelection();
  });

  /* ---------------------------------------------------------------------
     Start
     --------------------------------------------------------------------- */
  renderIndex();
  setView(homeView());

  var first = hashId();
  if (byId[first]) {
    select(first, { centre: false });
    requestAnimationFrame(function () { centreOn(byId[first], isSheet() ? 0.75 : 0.95); });
  }

  var resizeTimer = null, lastSize = stageSize();
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // keep whatever was in the middle of the screen in the middle
      var cx = (lastSize.w / 2 - view.x) / view.k, cy = (lastSize.h / 2 - view.y) / view.k;
      var s = lastSize = stageSize();
      updateKMin();
      setView({ k: view.k, x: s.w / 2 - cx * view.k, y: s.h / 2 - cy * view.k });
    }, 120);
  });

  // the hint fades after the first interaction
  var hint = document.getElementById('map-hint');
  function hideHint() { hint.classList.add('gone'); }
  svg.addEventListener('pointerdown', hideHint, { once: true });
  svg.addEventListener('wheel', hideHint, { once: true });
  setTimeout(hideHint, 9000);
})();

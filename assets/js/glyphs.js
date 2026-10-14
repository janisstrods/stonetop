/*
  Ink emblems for people and events, drawn on a 64 × 64 grid.
  Strokes use the current ink colour; class "f" is solid ink,
  class "p" is a paper-coloured fill used to hide what lies behind.
*/
window.STONETOP = window.STONETOP || {};

STONETOP.glyphs = {
  // Bevians — round shield over a spear
  shield: `
    <path d="M10 56 L50 12"/>
    <path class="f" d="M47 15 Q50 5 58 3 Q56 11 47 15 Z"/>
    <circle class="p" cx="27" cy="38" r="15"/>
    <circle cx="27" cy="38" r="15" stroke-width="3"/>
    <circle cx="27" cy="38" r="10.5" stroke-dasharray="2 2.6" stroke-width="1.4"/>
    <circle class="f" cx="27" cy="38" r="3.6"/>`,

  // Made Jete — a birch sauna whisk (pirts slota)
  whisk: `
    <path d="M29.5 60 L30.5 42 M34.5 60 L33.5 42"/>
    <path d="M27 43.5 L37 43.5 M27.5 47 L36.5 47" stroke-width="2"/>
    <path d="M31 42 Q23 30 13 19 M31.5 42 Q28 27 24 10 M32.5 42 Q36 27 40 10 M33 42 Q41 30 51 19" stroke-width="1.8"/>
    <g class="f">
      <path d="M13 19 q-4 -6 1 -9 q3 5 -1 9z"/><path d="M18 26 q-7 -2 -6 -7 q6 1 6 7z"/>
      <path d="M24 10 q-2 -7 3 -8 q1 6 -3 8z"/><path d="M27 21 q-6 -3 -4 -8 q5 3 4 8z"/>
      <path d="M40 10 q-1 -6 4 -8 q1 7 -4 8z"/><path d="M37 21 q1 -6 6 -7 q0 6 -6 7z"/>
      <path d="M51 19 q4 -6 -1 -9 q-3 5 1 9z"/><path d="M46 26 q7 -2 6 -7 q-6 1 -6 7z"/>
      <path d="M21 33 q-6 -1 -6 -6 q6 0 6 6z"/><path d="M43 33 q6 -1 6 -6 q-6 0 -6 6z"/>
    </g>`,

  // Rūna — Danu's sapling, rooted in the earth
  sapling: `
    <path d="M10 40 L54 40" stroke-width="2"/>
    <path d="M32 40 L32 14"/>
    <path class="f" d="M32 30 Q20 29 15 18 Q28 17 32 30 Z"/>
    <path class="f" d="M32 23 Q44 21 49 10 Q36 9 32 23 Z"/>
    <path class="f" d="M32 15 Q29 9 32 4 Q35 9 32 15 Z"/>
    <path d="M32 40 Q30 48 22 55 M32 40 Q34 50 41 57 M31 41 Q24 45 14 47 M33 41 Q40 45 50 48" stroke-width="1.8"/>`,

  // Gukals — a crutch
  crutch: `
    <path d="M21 9 Q32 6 43 9" stroke-width="4"/>
    <path d="M25 10 L30.5 44 M39 10 L33.5 44"/>
    <path d="M27 28 L37 28" stroke-width="3.4"/>
    <path d="M32 44 L32 57" stroke-width="3.4"/>
    <path d="M28 58.5 L36 58.5" stroke-width="2.4"/>`,

  // Kurakals — a spear
  spear: `
    <path d="M32 60 L32 20"/>
    <path class="f" d="M32 3 Q39 12 32 21 Q25 12 32 3 Z"/>
    <path d="M28.5 22.5 L35.5 22.5 M29 26 L35 26" stroke-width="1.8"/>
    <path d="M24 44 Q32 40 40 44" stroke-width="1.6"/>`,

  // Liliana — a hide stretched on a frame
  hide: `
    <path d="M8 8 H56 V56 H8 Z" stroke-width="3"/>
    <path d="M20 17 Q26 13 32 17 Q38 13 44 17 Q49 25 44 32 Q49 39 44 47 Q38 51 32 47 Q26 51 20 47 Q15 39 20 32 Q15 25 20 17 Z" stroke-width="2"/>
    <path d="M20 17 L8 8 M44 17 L56 8 M44 47 L56 56 M20 47 L8 56 M32 17 L32 8 M32 47 L32 56 M18 32 L8 32 M46 32 L56 32" stroke-width="1.2" stroke-dasharray="1.6 1.8"/>`,

  // Demarkuss — footprints walking away
  footprints: `
    <g class="f">
      <ellipse cx="22" cy="48" rx="4.2" ry="7.5" transform="rotate(-14 22 48)"/>
      <circle cx="18.2" cy="38.4" r="1.5"/><circle cx="21.6" cy="37.3" r="1.5"/><circle cx="25" cy="38.2" r="1.4"/>
      <ellipse cx="39" cy="27" rx="4" ry="7" transform="rotate(16 39 27)"/>
      <circle cx="37" cy="17.6" r="1.4"/><circle cx="40.4" cy="17.4" r="1.4"/><circle cx="43.6" cy="18.8" r="1.3"/>
    </g>
    <path d="M44 9 Q50 5 55 7 M10 60 Q16 58 20 60" stroke-width="1.4" stroke-dasharray="2 3"/>`,

  // Adrianuss — a swallow-tailed banner
  banner: `
    <path d="M18 7 L18 60" stroke-width="3.4"/>
    <circle class="f" cx="18" cy="5" r="2.6"/>
    <path d="M18 11 L52 11 L45 21.5 L52 32 L18 32 Z"/>
    <circle class="f" cx="31" cy="21.5" r="4"/>
    <path d="M31 13.5 L31 15.5 M31 27.5 L31 29.5 M23 21.5 L25 21.5 M37 21.5 L39 21.5" stroke-width="1.6"/>`,

  // Hanss — a sickle
  sickle: `
    <path class="f" d="M27 44 C9 34 13 7 39 6 C48 6 54 10 55 13 C46 9 36 11 30 17 C22 25 24 37 30 42 Z"/>
    <path d="M27 44 L17 59" stroke-width="5"/>`,

  // Gvendolīna — bow and arrow
  bow: `
    <path d="M22 5 Q52 32 22 59" stroke-width="3.6"/>
    <path d="M22 5 L22 59" stroke-width="1.2"/>
    <path d="M9 32 L52 32" stroke-width="2"/>
    <path class="f" d="M58 32 L49 27.5 L51 32 L49 36.5 Z"/>
    <path d="M10 32 L5 27 M10 32 L5 37 M14 32 L9 27 M14 32 L9 37" stroke-width="1.6"/>`,

  // Otto — a spinning top (vilciņš)
  top: `
    <path d="M32 21 L32 8" stroke-width="3"/>
    <path d="M18 23 Q32 13 46 23 L34.5 52 Q32 57 29.5 52 Z"/>
    <path d="M21 29 Q32 35 43 29 M25 39 Q32 43 39 39" stroke-width="1.6"/>
    <path d="M9 50 Q14 55 22 54 M45 56 Q52 54 56 48" stroke-width="1.4" stroke-dasharray="2 2.5"/>`,

  // Pauls — a hound's paw print
  paw: `
    <g class="f">
      <path d="M32 33 C23 33 17 42 19 48 C21 55 28 52.5 32 52.5 C36 52.5 43 55 45 48 C47 42 41 33 32 33 Z"/>
      <ellipse cx="17" cy="29" rx="4.2" ry="5.8" transform="rotate(-24 17 29)"/>
      <ellipse cx="26.5" cy="19.5" rx="4.2" ry="6"/>
      <ellipse cx="37.5" cy="19.5" rx="4.2" ry="6"/>
      <ellipse cx="47" cy="29" rx="4.2" ry="5.8" transform="rotate(24 47 29)"/>
    </g>`,

  // Adarīna — a hanging cradle (šūpulis)
  cradle: `
    <circle cx="32" cy="6" r="2.6" stroke-width="2"/>
    <path d="M30.5 8 L13 31 M33.5 8 L51 31" stroke-width="1.6"/>
    <circle class="p" cx="21" cy="28.5" r="4.6"/>
    <circle cx="21" cy="28.5" r="4.6" stroke-width="2"/>
    <path class="p" d="M9 31 L55 31 Q51 48 32 48 Q13 48 9 31 Z"/>
    <path d="M9 31 L55 31 Q51 48 32 48 Q13 48 9 31 Z"/>
    <path d="M15 37 L49 37 M19 42.5 L45 42.5" stroke-width="1.3" stroke-dasharray="2.5 2"/>
    <path d="M14 54 Q32 60 50 54" stroke-width="1.6"/>`,

  // Arvadoss — a combed clay pot
  pot: `
    <path d="M22 9 L42 9" stroke-width="3.4"/>
    <path d="M25 10 Q26 17 21 21 Q11 31 15 45 Q19 56 32 56 Q45 56 49 45 Q53 31 43 21 Q38 17 39 10"/>
    <path d="M19 30 L23 26 L27 30 L31 26 L35 30 L39 26 L43 30 L47 26" stroke-width="1.5"/>
    <path d="M16 38 Q32 42 48 38 M17 44 Q32 48 47 44" stroke-width="1.3" stroke-dasharray="1.5 2"/>`,

  // Grants — a wolf mask (the inherited pelt)
  wolf: `
    <path d="M13 8 L24 23 L40 23 L51 8 L49 30 L41 44 L32 57 L23 44 L15 30 Z"/>
    <path d="M23 32 L29 34.5 M41 32 L35 34.5" stroke-width="2.6"/>
    <path d="M32 24 L32 41 M27 45 L32 50 L37 45" stroke-width="1.5"/>
    <path class="f" d="M29 50 L35 50 L32 54.5 Z"/>
    <path d="M17 13 L22 21 M47 13 L42 21" stroke-width="1.3"/>`,

  // Jolanta — a sheaf of grain
  sheaf: `
    <path d="M32 59 L32 30 M28 59 L30.5 30 M36 59 L33.5 30 M24 57 L29 31 M40 57 L35 31" stroke-width="1.6"/>
    <path d="M30 30 Q24 18 18 10 M32 30 L32 7 M34 30 Q40 18 46 10 M29 31 Q20 25 11 22 M35 31 Q44 25 53 22" stroke-width="1.6"/>
    <path d="M24 41 Q32 46 40 41" stroke-width="3.2"/>
    <g class="f">
      <ellipse cx="17" cy="9" rx="2.6" ry="5" transform="rotate(-38 17 9)"/>
      <ellipse cx="32" cy="5.5" rx="2.6" ry="5"/>
      <ellipse cx="47" cy="9" rx="2.6" ry="5" transform="rotate(38 47 9)"/>
      <ellipse cx="10" cy="21.5" rx="2.4" ry="4.6" transform="rotate(-68 10 21.5)"/>
      <ellipse cx="54" cy="21.5" rx="2.4" ry="4.6" transform="rotate(68 54 21.5)"/>
    </g>`,

  // Jorats — a sword
  sword: `
    <path d="M32 3 L36 10 L36 41 L28 41 L28 10 Z"/>
    <path d="M32 11 L32 38" stroke-width="1.2"/>
    <path d="M18 42.5 L46 42.5" stroke-width="4"/>
    <path d="M32 45 L32 54" stroke-width="3.6"/>
    <circle class="f" cx="32" cy="57.5" r="3.6"/>`,

  // Manfrēds — a stave-built tankard
  tankard: `
    <path d="M14 17 Q16 9 23 11 Q27 5 33 9 Q39 6 43 12 Q48 14 45 17"/>
    <path d="M17 17 L45 17 L42 55 L20 55 Z"/>
    <path d="M18 27 L44 27 M19.5 45 L42.5 45" stroke-width="3"/>
    <path d="M26 17 L26.5 55 M35 17 L34.5 55" stroke-width="1.2"/>
    <path d="M45 23 Q57 25 55 36 Q53 45 43 45"/>`,

  // Zbigņevs — the Pavilion of the Gods, four pillars
  pavilion: `
    <path d="M7 24 L32 8 L57 24 Z"/>
    <circle class="f" cx="32" cy="18" r="3"/>
    <path d="M9 27.5 L55 27.5" stroke-width="2.4"/>
    <path d="M14 28 L14 54 M26 28 L26 54 M38 28 L38 54 M50 28 L50 54"/>
    <path d="M6 57 L58 57" stroke-width="3"/>`,

  // Aidens — a messenger's horn on a strap
  horn: `
    <path d="M14 47 Q30 61 51 21" stroke-width="1.3" stroke-dasharray="2 2"/>
    <path class="p" d="M9 47 C13 26 31 12 54 8 L57 23 C38 24 22 33 14 50 Z"/>
    <path d="M9 47 C13 26 31 12 54 8 L57 23 C38 24 22 33 14 50 Z"/>
    <path d="M15 37 L20 40.5 M26 25 L32 31 M41 15 L44 24" stroke-width="2"/>
    <path d="M7 48.5 L11 52.5" stroke-width="3.4"/>`,

  // The unnamed farmer — a pitchfork
  pitchfork: `
    <path d="M32 60 L32 25" stroke-width="3.4"/>
    <path d="M21 5 L21 17 Q21 25 32 25 Q43 25 43 17 L43 5 M32 25 L32 5"/>`,

  // The unknown woman — a crescent moon and stars
  moon: `
    <path d="M40 6 A26 26 0 1 0 40 58 A32 32 0 0 1 40 6 Z" stroke-width="2.6"/>
    <circle class="f" cx="48" cy="25" r="1.8"/><circle class="f" cx="53" cy="37" r="1.3"/><circle class="f" cx="45" cy="45" r="1.5"/>`,

  // The peat-mound spirit — a mound with rising wisps over bog water
  mound: `
    <path d="M5 49 Q32 21 59 49" stroke-width="2.6"/>
    <path d="M18 43 L20 47 M27 37 L28 42 M37 37 L36 42 M46 43 L44 47" stroke-width="1.2"/>
    <path d="M32 29 Q27 23 32 18 Q37 13 32 6" stroke-width="2"/>
    <path d="M21 33 Q18 29 21 25 Q24 21 21 17 M43 33 Q46 29 43 25 Q40 21 43 17" stroke-width="1.5"/>
    <path d="M3 55 L17 55 M23 58 L41 58 M47 55 L61 55" stroke-width="1.4"/>`,

  // Event glyphs ----------------------------------------------------------
  // Crinwin attack — raking claw marks
  claws: `
    <g class="f">
      <path d="M15 8 Q24 30 17 57 Q20 31 13 9 Z"/>
      <path d="M28 5 Q37 31 30 60 Q33 32 26 6 Z"/>
      <path d="M41 8 Q50 30 43 57 Q46 31 39 9 Z"/>
    </g>
    <path d="M51 14 L55 10 M52 22 L58 21 M8 40 L4 44" stroke-width="1.4"/>`,

  // Forest Folk vanish — a spruce drawn in broken ink
  tree: `
    <path d="M32 5 L18 25 L26 25 L13 42 L27 42 L27 57 L37 57 L37 42 L51 42 L38 25 L46 25 Z" stroke-dasharray="5 3"/>
    <path d="M32 14 L32 50" stroke-width="1.3" stroke-dasharray="2 3"/>`,

  // Spring — a sun disc with rays
  sun: `
    <circle cx="32" cy="32" r="11"/>
    <circle class="f" cx="32" cy="32" r="4.4"/>
    <path d="M32 4 L32 14 M32 50 L32 60 M4 32 L14 32 M50 32 L60 32 M12 12 L19 19 M45 45 L52 52 M52 12 L45 19 M19 45 L12 52" stroke-width="2.6"/>`
};

/* Render a glyph into an <svg> or <g> element, sized to `size` and centred on (cx, cy). */
STONETOP.glyphMarkup = function (name, cx, cy, size) {
  const body = STONETOP.glyphs[name] || STONETOP.glyphs.moon;
  const s = size / 64;
  return `<g class="glyph" transform="translate(${cx - size / 2} ${cy - size / 2}) scale(${s})">${body}</g>`;
};

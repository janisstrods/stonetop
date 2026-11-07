# Akmeņgals: Stonetop campaign site

A small static site for the players. It has four pages:

| Page | File | What it is |
| --- | --- | --- |
| Landing | `index.html` | The village's standing stone and three choices |
| Relationship map | `karte.html` | *Akmeņgala ļaudis*: PCs, NPCs, places, and how they're tied together |
| Timeline | `hronika.html` | *Akmeņgala hronika*: events from long ago up to now |
| Diaries | `dienasgramatas.html` | *Dienasgrāmatas*: the players' own write-ups of each session, one page per entry (`dienasgramatas.html#s1-made-jete`) |

There's no build step and there are no dependencies. Fonts come from Google Fonts, and everything else is in this folder. You can open `index.html` straight from disk, and it also works on GitHub Pages as is.

## Updating the content

All the content is Latvian and lives in three files (plus the version line, below). The English notes in the vault are the source of truth. The Latvian wording follows [GLOSSARY.md](GLOSSARY.md), which holds the agreed name spellings, declensions, terms and style rules. You don't need to touch the HTML, CSS or JS to add people or events.

### `data/cilveki.js`: people and relationships

**Add a person** to `STONETOP.people`:

```js
{
  id: 'arnis',                 // unique, lowercase, no diacritics; used in links (karte.html#arnis)
  name: 'Arnis',               // shown on the map
  kind: 'npc',                 // 'pc' | 'npc' | 'shadow' (an unnamed or unknown figure, drawn faintly)
                               // | 'place' (a place, drawn as a diamond map marker; needs no status)
  group: 'akmengals',          // map region: 'akmengals' | 'mezs' (the Great Wood) | 'purmale' | 'talume'
  role: 'kalējs',              // short occupation, shown under the name
  glyph: 'sword',              // emblem from assets/js/glyphs.js (list below)
  status: 'alive',             // 'alive' | 'dead' | 'missing' | 'away' | 'unknown'
  about: 'Dažos teikumos — kas šis tēls ir.',
  // x: 1200, y: 400,          // optional: pin to a spot on the 1800 × 1200 sheet
  // gender: 'f'               // optional: only if the name's ending misleads ('-a'/'-e' = feminine)
}
```

**Leave out `x`/`y`** and the person finds a free spot on their own. They settle near the people they're linked to, inside their region, without covering anyone else. If you don't like where they land, add `x`/`y` to pin them. Every current character is pinned, so the existing layout never moves.

**Add a relationship** to `STONETOP.bonds`:

```js
{ a: 'arnis', b: 'bevians', type: 'duty', label: 'kaļ ieročus',
  aIs: 'kalējs', bIs: 'pasūtītājs',           // optional: what a is to b, and what b is to a
  text: 'Teikums vai divi par šo saiti.' }    // optional
```

Relationship types, with how each is drawn:

| `type` | Name on the page | Line |
| --- | --- | --- |
| `kin` | Dzimta | double ink line |
| `love` | Mīla | red |
| `friend` | Draudzība | green |
| `oath` | Solījums | gold, knotted |
| `duty` | Darbs un dienests | stitched |
| `tension` | Nesaskaņas | jagged rust |
| `mystery` | Noslēpums | dotted blue |
| `sorcery` | Burvība un gari | wavy violet |
| `place` | Ceļi un vietas | brown trail, dash and dot (someone's tie to a place) |

If two people share more than one bond, the lines bow apart automatically.

### `data/notikumi.js`: timeline

Add events to `STONETOP.events` in chronological order (oldest first):

```js
{
  id: 'kalves-ugunsgreks', era: 'kampana', when: 'Vasaras sākumā', session: 3,
  yearsAgo: null,                       // optional; years before the campaign, for the "pēc kādiem astoņiem gadiem" markers
  title: 'Ugunsgrēks kalvē',
  text: 'Kas notika.',
  glyph: 'sun',
  people: ['arnis', 'bevians']          // ids from cilveki.js; they become links to the map
}
```

`era: 'pirms'` is before the campaign, and `era: 'kampana'` is anything that happens in play. A person's map card automatically lists every event they appear in.

### `data/dienasgramatas.js`: diaries

**Don't edit this file by hand.** It's generated from the vault's `Diaries/*.md` notes, one note per player per session:

```bash
node ../.claude/skills/update-stonetop-site/scripts/diaries.js ..
```

Each entry has an `id` (`s1-made-jete`), the `session` number, its `date`, the `author` (a PC's id) and `text`, a list of paragraphs. In the paragraphs, `[[gvendolina|Gvendolīnas]]` is a link to that person or place on the map; in the vault note it's an ordinary wikilink, `[[Gvendolīna|Gvendolīnas]]`. The players' real names never reach the site: entries are signed with the character.

The diaries also show up elsewhere: a person's card on the map lists the entries they wrote or appear in, and the chronicle marks where each session's events begin, with links to that session's entries.

### `data/versija.js`: version line

The landing page's footer shows the site's version and the date of the last update, e.g. *Versija 1.4 · atjaunināta 2026. gada 14. oktobrī*. Change both fields every time you publish:

```js
STONETOP.version = {
  number: '1.5',          // add one after the dot each publish (1.9 → 1.10); 2.0 only for a big rework
  updated: '2026-10-21'   // the publish date, YYYY-MM-DD; the page writes it out in Latvian
};
```

### Glyphs

`shield`, `whisk`, `sapling`, `crutch`, `spear`, `hide`, `footprints`, `banner`, `sickle`, `bow`, `top`, `paw`, `cradle`, `pot`, `wolf`, `sheaf`, `sword`, `tankard`, `pavilion`, `horn`, `pitchfork`, `moon`, `mound`, `axe`, `snowflake`, `palehill`, `boulder`, `fruit`, `book`, `claws`, `tree`, `sun`.

You can draw new ones in `assets/js/glyphs.js` on a 64 × 64 grid. Plain paths are ink strokes. `class="f"` makes a solid ink fill, and `class="p"` makes a paper-coloured fill that hides whatever is behind it.

## Previewing locally

Double-click `index.html`, or run a local server from this folder:

```bash
python3 -m http.server 8765
```

Then open <http://localhost:8765>.

## Publishing on GitHub Pages

**This folder is its own repository.** Push it to GitHub, then go to **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, and pick `main` and `/ (root)`.

**This folder is inside a bigger repository** (e.g. the whole vault). Pages can only serve from the repository root or from `/docs`. Either rename this folder to `docs`, or add a small GitHub Actions workflow that publishes this folder.

The empty `.nojekyll` file tells GitHub Pages to serve the files exactly as they are.

## Notes

- Everything here is player-facing. GM-only material (`GM/` in the vault) is deliberately left out. GitHub Pages sites are public to anyone with the link.
- The look follows the Stonetop handouts: olive-brown ink on stained parchment. Grenze stands in for the books' Avara, Libre Caslon Text for Adobe Caslon, and Cormorant SC for the Fell small caps.

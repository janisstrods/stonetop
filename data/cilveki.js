/*
  AKMEŅGALA ĻAUDIS — tēli un viņu saites
  ======================================
  Šis ir vienīgais fails, kas jālabo, lai kartē pievienotu tēlu vai saiti.
  (This is the only file to edit to add a person or a relationship.
   See README.md for the full field reference.)

  TĒLS (person):
    id       – īss, unikāls identifikators bez diakritiskajām zīmēm, piem. 'made-jete'
    name     – vārds, kā tas redzams kartē
    kind     – 'pc' (spēlētāja tēls) | 'npc' | 'shadow' (bezvārda vai nezināms tēls)
    group    – reģions kartē: 'akmengals' | 'purmale' | 'talume'
    role     – amats vai loma, īsi (redzams zem vārda)
    playbook – tikai spēlētāju tēliem
    glyph    – zīmes nosaukums no assets/js/glyphs.js
    status   – 'alive' | 'dead' | 'missing' | 'away' | 'unknown'
    about    – dažos teikumos: kas šis tēls ir
    x, y     – (pēc izvēles) piesprausta vieta kartē (laukums 1800 × 1200).
               Ja vieta nav norādīta, tēls pats to atrod sava reģiona un savu saišu tuvumā.

  SAITE (bond):
    a, b     – abu tēlu id
    type     – 'kin' | 'love' | 'friend' | 'oath' | 'duty' | 'tension' | 'mystery' | 'sorcery'
    label    – īss uzraksts uz līnijas
    aIs, bIs – (pēc izvēles) kas A ir attiecībā pret B un kas B – pret A, piem. 'tēvs' / 'dēls'
    text     – (pēc izvēles) teikums vai divi par šo saiti
*/

window.STONETOP = window.STONETOP || {};

STONETOP.groups = {
  akmengals: { name: 'Akmeņgals', x: 900, y: 620 },
  purmale:   { name: 'Purmale',   x: 1480, y: 1010 },
  talume:    { name: 'Svešumā',   x: 200,  y: 960 }
};

STONETOP.people = [
  /* ---------- Spēlētāju tēli ---------- */
  {
    id: 'runa', name: 'Rūna', kind: 'pc', group: 'akmengals',
    playbook: 'Svētītā', role: 'Danu priestere', glyph: 'sapling', status: 'alive',
    x: 900, y: 450,
    about: 'Meža bērns ar ugunīgi rudiem matiem — tādu nav nevienam citam Akmeņgalā. Ciemā viņa ieradās ap desmit gadu vecumā un no agrākās dzīves atceras vien mežu un mīkstas sūnas. Jau toreiz viņai bija līdzi svētais maciņš — kāds dzimtas mantojums. Viņa ir ceļvede medniekiem un meža velšu vācējiem un sagaida, ka tie dzīvos pēc dabas un Danu likumiem. Kopš rituāla pirms diviem gadiem viņa ir Danu augstā priestere Akmeņgalā. Ļaudis nes viņai ziedojumus: augļus un svaigu lietusūdeni. Viņai allaž līdzās ir divi mastifi.'
  },
  {
    id: 'bevians', name: 'Bevians', kind: 'pc', group: 'akmengals',
    playbook: 'Maršals', role: 'vienības vadonis', glyph: 'shield', status: 'alive',
    x: 720, y: 690,
    about: 'Plecīgs vīrs ar brūniem matiem, kādus divdesmit septiņus gadus vecs. Viņa dzimta jau labu laiku vada kādu no Akmeņgala vienībām; nu jau mēnesi tās priekšgalā ir viņš pats. Prot lasīt un rakstīt — Akmeņgalā to māk tikai katrs piektais. Diezgan nežēlīgs: viņaprāt, mērķis attaisno līdzekļus. Danu viņam ir tuva, bet Arata taisnīgums nav pie sirds. Nēsā medaljonu, kas dzimtā gājis no paaudzes paaudzē; uz tā ir kāda zīme. Viņš ir pārliecināts, ka krinvini kaut ko perina.'
  },
  {
    id: 'made-jete', name: 'Made Jete', kind: 'pc', group: 'akmengals',
    playbook: 'Meklētāja', role: 'dziedniece un zintniece', glyph: 'whisk', status: 'alive',
    x: 1080, y: 690,
    about: 'Akmeņgala dziedniece un zintniece, trīsdesmit astoņus gadus veca, mazliet apaļīga. Ļoti zinātkāra, taču pienākumu viņa nekad neaizmirst. Kopj zāļu dārzu, tecina zāles un kā acuraugu sargā savu melno pirti, kur dziedina slimos un kur nāk pasaulē lielākā daļa ciema bērnu. Pirtī glabājas arī Hektumeļa Kodekss: praktiska labuma no tā nav, taču tas viņu kārdina un, bez šaubām, sūta viņai sapņus. No meža viņa mazliet baidās, toties nāve un Tie, kas Apakšā, viņu vilina arvien vairāk.'
  },

  /* ---------- Beviana dzimta ---------- */
  {
    id: 'gukals', name: 'Gukals', kind: 'npc', group: 'akmengals',
    role: 'bijušais vienības vadonis', glyph: 'crutch', status: 'alive',
    x: 380, y: 600,
    about: 'Beviana tēvocis, kas vēl pirms mēneša vadīja dzimtas vienību. Kad seši krinvini naktī uzbruka viņa sardzei vairākdienu apgaitā Lielajā mežā, Gukalu ievainoja kājā; vēlāk viņš kāju zaudēja un bija spiests atkāpties. Joprojām tic, ka ar krinviniem var sarunāties.'
  },
  {
    id: 'kurakals', name: 'Kurakals', kind: 'npc', group: 'akmengals',
    role: 'vienības karotājs', glyph: 'spear', status: 'alive',
    x: 250, y: 740,
    about: 'Beviana un Demarkusa tēvs. Savulaik dzimtas vārdu cīņā zaudēja savam brālim Gukalam. Tagad dien citā vienībā — kā vienkāršs karotājs, ne vadonis.'
  },
  {
    id: 'liliana', name: 'Liliana', kind: 'npc', group: 'akmengals',
    role: 'miecētāja', glyph: 'hide', status: 'alive',
    x: 430, y: 830,
    about: 'Akmeņgala miecētāja, Beviana un Demarkusa māte.'
  },
  {
    id: 'demarkuss', name: 'Demarkuss', kind: 'npc', group: 'talume',
    role: 'Beviana vecākais brālis', glyph: 'footprints', status: 'away',
    x: 150, y: 960,
    about: 'Pirms mēneša trīs stundas ilgā vārdu cīņā zaudēja jaunākajam brālim tiesības vadīt dzimtas vienību. Pēc tam viņš pameta Akmeņgalu un kopš tā laika ar Bevianu nav runājis. Viņš esot dzīvs, taču kur palicis, neviens nezina.'
  },

  /* ---------- Gvendolīnas saime ---------- */
  {
    id: 'gvendolina', name: 'Gvendolīna', kind: 'npc', group: 'akmengals',
    role: 'medniece', glyph: 'bow', status: 'alive',
    x: 620, y: 340,
    about: 'Lieliska medniece, kas mežā jūtas kā mājās. Rūnas tuvā draudzene un vienaudze, Hansa sieva, Otto un Paula māte.'
  },
  {
    id: 'hanss', name: 'Hanss', kind: 'npc', group: 'akmengals',
    role: 'zemnieks un karotājs', glyph: 'sickle', status: 'alive',
    x: 440, y: 400,
    about: 'Godīgs zemnieks, kas dien Beviana vienībā. Gvendolīnas vīrs, Otto un Paula tēvs.'
  },
  {
    id: 'otto', name: 'Otto', kind: 'npc', group: 'akmengals',
    role: 'zēns', glyph: 'top', status: 'alive',
    x: 470, y: 230,
    about: 'Gvendolīnas un Hansa dēls, Paula brālis.'
  },
  {
    id: 'pauls', name: 'Pauls', kind: 'npc', group: 'akmengals',
    role: 'zēns', glyph: 'paw', status: 'alive',
    x: 780, y: 240,
    about: 'Gvendolīnas un Hansa dēls. Dievina Rūnu un viņas suņus, nāk viņai līdzi medībās un var bez gala klausīties stāstus par Lielo mežu.'
  },

  /* ---------- Ciems ---------- */
  {
    id: 'adrianuss', name: 'Adrianuss', kind: 'npc', group: 'akmengals',
    role: 'karavadonis', glyph: 'banner', status: 'alive',
    x: 570, y: 530,
    about: 'Vada visas Akmeņgala vienības. Tajās nav karavīru pēc amata, tomēr ciems uz tām paļaujas: tās to aizstāv, iet apgaitās un tur sardzi sargtorņos.'
  },
  {
    id: 'jorats', name: 'Jorats', kind: 'npc', group: 'akmengals',
    role: 'labākais vienības cīnītājs', glyph: 'sword', status: 'missing',
    x: 900, y: 860,
    about: 'Labākais cīnītājs Beviana vienībā. Kāds zemnieks bija pārliecināts, ka Jorats viņu nolādējis. Bevians pavēlēja Joratu atstāt dzīvu, taču pagājušajā mēnesī Made Jete tomēr uzsūtīja Joratam kūdras uzkalna garu — un viņš pazuda.'
  },
  {
    id: 'jolanta', name: 'Jolanta', kind: 'npc', group: 'akmengals',
    role: 'laukstrādniece', glyph: 'sheaf', status: 'alive',
    x: 630, y: 920,
    about: 'Beviana mīļotā. Strādā laukos, bet mājās pati mācās podniecību: cer kļūt par Arvadosa mācekli, kaut arī bīstas no viņa sprieduma.'
  },
  {
    id: 'arvadoss', name: 'Arvadoss', kind: 'npc', group: 'akmengals',
    role: 'podnieks', glyph: 'pot', status: 'alive',
    x: 780, y: 1060,
    about: 'Ciema podnieks kopš jaunības dienām, kādus piecdesmit gadus vecs. Mācekļa viņam nav, un viņš neredz vajadzības tādu drīzumā ņemt.'
  },
  {
    id: 'adarina', name: 'Adarīna', kind: 'npc', group: 'akmengals',
    role: 'vecmāte', glyph: 'cradle', status: 'alive',
    x: 1330, y: 560,
    about: 'Ciema vecmāte, četrdesmit astoņus gadus veca un moža, Madei Jetei tuvākais cilvēks. Visi trīs viņas bērni ir miruši, un nu viņa ir viena pati pasaulē. Pieņem dzemdības Mades Jetes melnajā pirtī un tur arī pieskata bērnus.'
  },
  {
    id: 'grants', name: 'Grants', kind: 'npc', group: 'akmengals',
    role: 'zintnieks', glyph: 'wolf', status: 'dead',
    x: 1390, y: 770,
    about: 'Cienīts ciema zintnieks, Mades Jetes tēvs un skolotājs. Pirms kādiem divdesmit četriem gadiem viņš pārnāca no Lielā meža, drudža kratīts, un drīz pēc tam nomira. Kaut kas viņa nāvē bija savāds. Viņš mēdza sacīt: „Ja nes ko no meža mājās, tam var sekot kas cits.”'
  },
  {
    id: 'zbignevs', name: 'Zbigņevs', kind: 'npc', group: 'akmengals',
    role: 'ciema priesteris', glyph: 'pavilion', status: 'alive',
    x: 1170, y: 410,
    about: 'Vecs Dievu nojumes sargs, kas cieši turas pie paražām: dievi ir četri, un visam ir sava pareizā, senā kārtība. Ar katru gadu viņš kļūst stingrāks, un ciemam tas nepatīk. Viņš šaubās, vai Danu tiešām Rūnu svaidījusi.'
  },
  {
    id: 'manfreds', name: 'Manfrēds', kind: 'npc', group: 'akmengals',
    role: 'krodzinieks', glyph: 'tankard', status: 'alive',
    x: 1080, y: 240,
    about: 'Akmeņgala krodzinieks — veikls un ar labu ožu uz peļņu. Tagad, kad Meža ļaudis ir prom, viņš pamazām sāk ieminēties par koku ciršanu Lielajā mežā, lai gan derība ar viņiem liedz tur nocirst kaut vienu dzīvu koku.'
  },
  {
    id: 'zemnieks', name: 'Zemnieks', kind: 'shadow', group: 'akmengals',
    role: 'vārds nezināms', glyph: 'pitchfork', status: 'unknown',
    x: 1030, y: 1010,
    about: 'Kāds Akmeņgala zemnieks, kurš bija pārliecināts, ka Jorats viņu nolādējis, un devās pēc palīdzības pie Mades Jetes.'
  },

  /* ---------- Purmale ---------- */
  {
    id: 'aidens', name: 'Aidens', kind: 'npc', group: 'purmale',
    role: 'ziņnesis no Purmales', glyph: 'horn', status: 'alive',
    x: 1290, y: 960,
    about: 'Ziņnesis no Purmales, neparedzams: Akmeņgalā uzrodas reti un tad atkal pazūd uz ilgu laiku. Mades Jetes mīļākais — kad nu tā sanāk — un viņas starpnieks darīšanās ar kūdras uzkalna garu.'
  },
  {
    id: 'gars', name: 'Kūdras uzkalna gars', kind: 'shadow', group: 'purmale',
    role: 'Purmales tuvumā', glyph: 'mound', status: 'unknown',
    x: 1530, y: 1050,
    about: 'Gars, kas mīt kūdras uzkalnā netālu no Purmales. Made Jete ar to sazinās caur Aidenu, un pagājušajā mēnesī viņa to uzsūtīja Joratam. Kāda loma šajā vietā ir Aratim, Likuma sargam?'
  },

  /* ---------- Svešumā ---------- */
  {
    id: 'mate', name: 'Svešiniece', kind: 'shadow', group: 'talume',
    role: 'Mades Jetes māte', glyph: 'moon', status: 'unknown',
    x: 1630, y: 650,
    about: 'Pirms kādiem trīsdesmit deviņiem gadiem viņa ieradās Akmeņgalā un aizgāja. Nākamajā gadā viņa atgriezās ar zīdaini — Madi Jeti — un aizgāja atkal. Kas viņa bija un no kurienes nāca, neviens nezina.'
  }
];

STONETOP.bonds = [
  /* ---------- Spēlētāju tēli savā starpā ---------- */
  { a: 'bevians', b: 'runa', type: 'oath', label: 'bērnībā dots solījums',
    aIs: 'sargs kopš bērnības', bIs: 'bērnības draudzene',
    text: 'Kad Rūna ieradās ciemā un citi bērni pret viņu bija nežēlīgi, Bevians apsolīja viņu sargāt — un savu vārdu tur joprojām. Pirms diviem gadiem viņš galvoja par Rūnu Danu rituālā.' },
  { a: 'bevians', b: 'made-jete', type: 'tension', label: 'bailes un aizvainojums',
    text: 'Bevians mazliet baidās no Mades Jetes un tur uz viņu ļaunu prātu: viņš pavēlēja Joratu atstāt dzīvu, bet viņa tomēr uzsūtīja Joratam kūdras uzkalna garu.' },
  { a: 'runa', b: 'made-jete', type: 'friend', label: 'draudzība un bažas',
    text: 'Rūna nes Madei Jetei zāles no meža. Tomēr viņu mazliet biedē Mades Jetes augošā interese par nāvi — Rūna kā Danu kalpone rūpējas par dzīvību un dzīvajiem.' },
  { a: 'runa', b: 'made-jete', type: 'mystery', label: 'garu čuksti',
    text: 'Gari čukst Rūnai, ka viņai un Madei Jetei ir kaut kas kopīgs — varbūt izcelsme, varbūt pat viena māte. Patiesību vēl neviens nezina.' },

  /* ---------- Beviana dzimta ---------- */
  { a: 'bevians', b: 'demarkuss', type: 'kin', label: 'brāļi',
    aIs: 'jaunākais brālis', bIs: 'vecākais brālis' },
  { a: 'bevians', b: 'demarkuss', type: 'tension', label: 'nerunā kopš vārdu cīņas',
    text: 'Pirms mēneša Bevians trīs stundas ilgā vārdu cīņā pārspēja Demarkusu un ieguva tiesības vadīt dzimtas vienību. Demarkuss pameta ciemu, un kopš tā laika brāļi nav runājuši.' },
  { a: 'bevians', b: 'kurakals', type: 'kin', label: 'tēvs un dēls', aIs: 'dēls', bIs: 'tēvs' },
  { a: 'bevians', b: 'liliana', type: 'kin', label: 'māte un dēls', aIs: 'dēls', bIs: 'māte' },
  { a: 'demarkuss', b: 'kurakals', type: 'kin', label: 'tēvs un dēls', aIs: 'dēls', bIs: 'tēvs' },
  { a: 'demarkuss', b: 'liliana', type: 'kin', label: 'māte un dēls', aIs: 'dēls', bIs: 'māte' },
  { a: 'kurakals', b: 'gukals', type: 'kin', label: 'brāļi', aIs: 'brālis', bIs: 'brālis',
    text: 'Pēc dzimtas paražas vienību pārņem tas no bērniem, kurš uzvar vārdu cīņā. Kurakals savulaik zaudēja Gukalam.' },
  { a: 'bevians', b: 'gukals', type: 'kin', label: 'tēvocis un brāļadēls', aIs: 'brāļadēls', bIs: 'tēvocis' },
  { a: 'demarkuss', b: 'gukals', type: 'kin', label: 'tēvocis un brāļadēls', aIs: 'brāļadēls', bIs: 'tēvocis' },
  { a: 'bevians', b: 'gukals', type: 'duty', label: 'vienības pēctecis',
    aIs: 'pēctecis', bIs: 'priekštecis',
    text: 'Bevians dienēja Gukala vienībā un pārņēma to, kad Gukals zaudēja kāju.' },

  /* ---------- Vienība ---------- */
  { a: 'bevians', b: 'adrianuss', type: 'duty', label: 'pakļauts karavadonim',
    aIs: 'vienības vadonis', bIs: 'karavadonis',
    text: 'Visas Akmeņgala vienības ir pakļautas karavadonim Adrianusam. Bevians savu vienību vada tikai mēnesi.' },
  { a: 'bevians', b: 'hanss', type: 'duty', label: 'dien vienībā',
    aIs: 'vienības vadonis', bIs: 'karotājs viņa vienībā',
    text: 'Hanss dien Beviana vienībā. Bevianam patīk visa Hansa ģimene.' },
  { a: 'bevians', b: 'jorats', type: 'duty', label: 'lika atstāt dzīvu',
    aIs: 'vienības vadonis', bIs: 'labākais vienības cīnītājs',
    text: 'Kad zemnieks apsūdzēja Joratu lāstā, Bevians pavēlēja viņu atstāt dzīvu.' },
  { a: 'bevians', b: 'gvendolina', type: 'friend', label: 'vienaudži',
    text: 'Abi ir vienā vecumā, un Bevianam patīk Gvendolīnas ģimene.' },
  { a: 'bevians', b: 'jolanta', type: 'love', label: 'mīļotie',
    text: 'Jolanta ir Beviana draudzene un mīļotā.' },

  /* ---------- Mades Jetes loks ---------- */
  { a: 'made-jete', b: 'grants', type: 'kin', label: 'tēvs un skolotājs',
    aIs: 'meita un skolniece', bIs: 'tēvs un skolotājs',
    text: 'Grants uzaudzināja Madi Jeti un no astoņu gadu vecuma mācīja viņai zintis. Viņš nomira, kad meitai bija četrpadsmit.' },
  { a: 'made-jete', b: 'mate', type: 'kin', label: 'nezināmā māte',
    aIs: 'meita', bIs: 'māte',
    text: 'Svešiniece atnesa zīdaini Madi Jeti uz Akmeņgalu un aizgāja.' },
  { a: 'grants', b: 'mate', type: 'mystery', label: 'kas viņa bija?',
    text: 'Viņa ieradās Akmeņgalā un aizgāja, bet nākamajā gadā atgriezās ar Granta bērnu.' },
  { a: 'made-jete', b: 'adarina', type: 'friend', label: 'tuvākā draudzene',
    text: 'Adarīna ir Madei Jetei tuvākais cilvēks. Viņa pieņem dzemdības Mades Jetes melnajā pirtī un tur pieskata bērnus.' },
  { a: 'made-jete', b: 'aidens', type: 'love', label: 'mīļākie',
    text: 'Mīļākie — kad nu Aidens uzrodas. Viņš arī kārto Mades Jetes darīšanas ar kūdras uzkalna garu.' },
  { a: 'made-jete', b: 'zbignevs', type: 'tension', label: 'aizvainojums',
    text: 'Made Jete tur ļaunu prātu uz Zbigņevu, jo viņš ar katru gadu kļūst stingrāks.' },
  { a: 'made-jete', b: 'jorats', type: 'tension', label: 'uzsūtīja garu',
    aIs: 'uzsūtīja viņam garu', bIs: 'gara mērķis',
    text: 'Pretēji Beviana pavēlei un kaut arī pati nebija līdz galam pārliecināta, Made Jete uzsūtīja Joratam kūdras uzkalna garu. Jorats pazuda.' },

  /* ---------- Gari un burvība ---------- */
  { a: 'made-jete', b: 'gars', type: 'sorcery', label: 'sazinās caur Aidenu',
    text: 'Made Jete sazinās ar garu caur Aidenu. Viņu interesē, kāda loma kūdras uzkalnā ir Aratim, Likuma sargam.' },
  { a: 'aidens', b: 'gars', type: 'sorcery', label: 'starpnieks',
    aIs: 'starpnieks', bIs: 'Mades Jetes vārdā',
    text: 'Aidens kārto darīšanas ar garu Mades Jetes vārdā.' },
  { a: 'gars', b: 'jorats', type: 'sorcery', label: 'uzsūtīts',
    aIs: 'uzsūtīts viņam', bIs: 'mērķis',
    text: 'Gars tika uzsūtīts Joratam — un Jorats pazuda. Kas ar viņu notika?' },

  /* ---------- Jorata lieta ---------- */
  { a: 'zemnieks', b: 'jorats', type: 'tension', label: 'apsūdzēja lāstā',
    aIs: 'apsūdzēja viņu lāstā', bIs: 'apsūdzēts lāstā',
    text: 'Zemnieks bija pārliecināts, ka Jorats viņu nolādējis. Vai tā tiešām bija?' },
  { a: 'zemnieks', b: 'made-jete', type: 'duty', label: 'lūdza palīdzību',
    aIs: 'lūdza palīdzību', bIs: 'pie viņas meklēja palīdzību',
    text: 'Pārliecināts, ka Jorats viņu nolādējis, zemnieks devās pie Mades Jetes pēc palīdzības.' },

  /* ---------- Rūnas loks ---------- */
  { a: 'runa', b: 'zbignevs', type: 'tension', label: 'šaubas',
    text: 'Zbigņevs šaubās, vai Danu tiešām svaidījusi Rūnu. Tomēr Bevians rituālā par Rūnu galvoja, un viņa kļuva par Danu augsto priesteri.' },
  { a: 'runa', b: 'gvendolina', type: 'friend', label: 'tuvas draudzenes',
    text: 'Ļoti tuvas draudzenes un vienaudzes. Rūnai patīk visa Gvendolīnas ģimene.' },
  { a: 'runa', b: 'pauls', type: 'friend', label: 'mazais pielūdzējs', aIs: 'viņa varone', bIs: 'mazais pielūdzējs',
    text: 'Pauls dievina Rūnu un viņas mastifus un nāk viņai līdzi medībās.' },
  { a: 'runa', b: 'manfreds', type: 'tension', label: 'neuzticība',
    text: 'Rūna neuzticas krodziniekam: viņš pamazām sāk ieminēties par koku ciršanu Lielajā mežā.' },

  /* ---------- Gvendolīnas saime ---------- */
  { a: 'gvendolina', b: 'hanss', type: 'kin', label: 'laulātie', aIs: 'sieva', bIs: 'vīrs' },
  { a: 'gvendolina', b: 'otto', type: 'kin', label: 'māte un dēls', aIs: 'māte', bIs: 'dēls' },
  { a: 'gvendolina', b: 'pauls', type: 'kin', label: 'māte un dēls', aIs: 'māte', bIs: 'dēls' },
  { a: 'hanss', b: 'otto', type: 'kin', label: 'tēvs un dēls', aIs: 'tēvs', bIs: 'dēls' },
  { a: 'hanss', b: 'pauls', type: 'kin', label: 'tēvs un dēls', aIs: 'tēvs', bIs: 'dēls' },
  { a: 'otto', b: 'pauls', type: 'kin', label: 'brāļi', aIs: 'brālis', bIs: 'brālis' },

  /* ---------- Amatnieki ---------- */
  { a: 'jolanta', b: 'arvadoss', type: 'duty', label: 'cer kļūt par mācekli',
    aIs: 'cer kļūt par viņa mācekli', bIs: 'iecerētais meistars',
    text: 'Jolanta grib kļūt par Arvadosa mācekli, bet bīstas no viņa sprieduma. Arvadoss gan nedomā, ka viņam drīzumā būs vajadzīgs māceklis.' }
];

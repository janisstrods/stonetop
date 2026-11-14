/*
  AKMEŅGALA HRONIKA — notikumi no vecākā līdz jaunākajam
  =====================================================
  (Timeline events, oldest first. See README.md for the field reference.)

  NOTIKUMS (event):
    id        – īss, unikāls identifikators, piem. 'granta-nave'
    era       – 'pirms' (pirms kampaņas) | 'kampana' (kampaņas laikā)
    when      – laika norāde, kā to rādīt, piem. 'Pirms kādiem 24 gadiem'
    yearsAgo  – (pēc izvēles) aptuveni pirms cik gadiem; vajadzīgs atstarpēm starp notikumiem
    session   – (pēc izvēles) sesijas numurs kampaņas notikumiem
    title     – virsraksts
    text      – apraksts
    glyph     – zīme no assets/js/glyphs.js
    people    – tēlu id saraksts no data/cilveki.js
*/

window.STONETOP = window.STONETOP || {};

STONETOP.eras = {
  pirms:   { name: 'Pirms mūsu stāsta', note: 'Ko atceras ciems — un ko tas labprātāk aizmirstu.' },
  kampana: { name: 'Mūsu stāsts', note: 'Ko esam piedzīvojuši pie galda.' }
};

STONETOP.events = [
  {
    id: 'gukala-disputs', era: 'pirms', when: 'Pirms paaudzes (gads nezināms)', yearsAgo: null,
    title: 'Gukals uzvar dzimtas vārdu cīņā',
    text: 'Pēc dzimtas paražas vienību pārņem tas no bērniem, kurš uzvar vārdu cīņā. Kurakals zaudē savam brālim Gukalam, un tas kļūst par dzimtas vienības vadoni.',
    glyph: 'banner', people: ['kurakals', 'gukals']
  },
  {
    id: 'svesiniece', era: 'pirms', when: 'Pirms kādiem 39 gadiem', yearsAgo: 39,
    title: 'Svešiniece',
    text: 'Akmeņgalā ierodas nezināma sieviete — un aiziet.',
    glyph: 'moon', people: ['mate']
  },
  {
    id: 'zidainis', era: 'pirms', when: 'Pirms kādiem 38 gadiem', yearsAgo: 38,
    title: 'Svešiniece atgriežas',
    text: 'Tā pati sieviete atgriežas ar zīdaini rokās — mazo Madi Jeti. Viņa atkal aiziet, un meiteni audzina tēvs, zintnieks Grants.',
    glyph: 'cradle', people: ['mate', 'made-jete', 'grants']
  },
  {
    id: 'pirmas-macibas', era: 'pirms', when: 'Pirms kādiem 30 gadiem', yearsAgo: 30,
    title: 'Pirmās zintis',
    text: 'Astoņgadīgā Made Jete sāk mācīties zintis pie sava tēva Granta.',
    glyph: 'whisk', people: ['made-jete', 'grants']
  },
  {
    id: 'granta-nave', era: 'pirms', when: 'Pirms kādiem 24 gadiem', yearsAgo: 24,
    title: 'Granta nāve',
    text: 'No Lielā meža Grants pārnāk drudža kratīts un drīz mirst. Kaut kas viņa nāvē ir savāds, bet neviens nezina, kas. Madei Jetei ir četrpadsmit gadu.',
    glyph: 'wolf', people: ['grants', 'made-jete']
  },
  {
    id: 'meza-berns', era: 'pirms', when: 'Pirms 15–17 gadiem', yearsAgo: 16,
    title: 'Meža bērns',
    text: 'Akmeņgalā ierodas Rūna — mežonīgs, apmēram desmit gadus vecs bērns ar svēto maciņu. Citi bērni pret viņu ir nežēlīgi, un Bevians apsola viņu sargāt.',
    glyph: 'footprints', people: ['runa', 'bevians']
  },
  {
    id: 'meza-laudis', era: 'pirms', when: 'Pirms kādiem desmit gadiem', yearsAgo: 10,
    title: 'Meža ļaudis pazūd',
    text: 'Meža ļaudis pazūd no Lielā meža, un neviens nezina, kāpēc. Viņi mēdza medīt krinvinus, un, kopš viņi aizgājuši, krinvinu kļūst arvien vairāk.',
    glyph: 'tree', people: []
  },
  {
    id: 'danu-rituals', era: 'pirms', when: 'Pirms kādiem diviem gadiem', yearsAgo: 2,
    title: 'Danu rituāls',
    text: 'Rūna iziet rituālu ar Danu. Zbigņevs šaubās, taču Bevians par Rūnu galvo, kā to prasa rituāls, un viņa kļūst par Danu augsto priesteri Akmeņgalā.',
    glyph: 'sapling', people: ['runa', 'zbignevs', 'bevians']
  },
  {
    id: 'barga-ziema', era: 'pirms', when: 'Pagājušajā ziemā', yearsAgo: 0.2,
    title: 'Bargā ziema',
    text: 'Ziema ir gara un barga. Malka jātaupa, un daudzās mājās aukstums kļūst par pastāvīgu iemītnieku. Vecais Vinets Lielajā mežā nosalst līdz nāvei.',
    glyph: 'snowflake', people: ['vinets']
  },
  {
    id: 'krinvinu-uzbrukums', era: 'pirms', when: 'Pirms laba mēneša', yearsAgo: 0.09,
    title: 'Krinvinu uzbrukums',
    text: 'Seši krinvini naktī uzbrūk Gukala sardzei vairākdienu apgaitā Lielajā mežā. Uzbrukums skan kā vētra: brakšķ zari, plosās lapotne. Divi no tiem aizbēg. Gukalu ievaino kājā; vēlāk viņš kāju zaudē un ir spiests atkāpties.',
    glyph: 'claws', people: ['gukals']
  },
  {
    id: 'bralu-disputs', era: 'pirms', when: 'Pirms kāda mēneša', yearsAgo: 0.08,
    title: 'Brāļu vārdu cīņa',
    text: 'Bevians trīs stundas ilgā vārdu cīņā pārspēj savu vecāko brāli Demarkusu un pārņem dzimtas vienību. Demarkuss pamet ciemu, un kopš tā laika brāļi nav runājuši.',
    glyph: 'banner', people: ['bevians', 'demarkuss']
  },
  {
    id: 'jorata-pazusana', era: 'pirms', when: 'Pēdējā mēneša laikā', yearsAgo: 0.04,
    title: 'Jorats pazūd',
    text: 'Kāds zemnieks atnāk pie Mades Jetes, pārliecināts, ka Jorats — labākais cīnītājs Beviana vienībā — viņu nolādējis. Bevians pavēl Joratu atstāt dzīvu, taču Made Jete, kaut arī pati nav līdz galam droša, uzsūta Joratam kūdras uzkalna garu. Jorats pazūd. Kopš tā laika Bevians tur uz Madi Jeti ļaunu prātu.',
    glyph: 'mound', people: ['zemnieks', 'jorats', 'made-jete', 'bevians', 'gars']
  },
  {
    id: 'pavasaris', era: 'kampana', when: 'Pavasaris', yearsAgo: null, session: 0,
    title: 'Pavasaris uzplaukst',
    text: 'Ziema atkāpjas, un pavasaris nes interesantas ziņas — un draudus. Te sākas mūsu stāsts.',
    glyph: 'sun', people: ['bevians', 'made-jete', 'runa']
  },
  {
    id: 'pec-ziemas', era: 'kampana', when: 'Agrā pavasarī', yearsAgo: null, session: 1,
    title: 'Pēc ziemas',
    text: 'Rūna un Gvendolīna pārrunā mednieču pavasara darbus, un Gvendolīna apsola salasīt Rūnai pumpurus. Garām iet Manfrēds ar kritalām un sūkstās: ja vien drīkstētu cirst kokus, ziema būtu bijusi pavisam citāda. Rūna viņam atgādina par derību.',
    glyph: 'tree', people: ['runa', 'gvendolina', 'manfreds']
  },
  {
    id: 'zud-darbariki', era: 'kampana', when: 'Agrā pavasarī', yearsAgo: null, session: 1,
    title: 'Zūd darbarīki',
    text: 'Ciemā zog darbarīkus: Gvinam, kurš dzīvo pie sētas, pazūd cirvis. Tēvs Zbigņevs saka, ka Aratisam jānes ziedojums, lai atjaunotu izjaukto kārtību.',
    glyph: 'axe', people: ['gvins', 'zbignevs']
  },
  {
    id: 'krinvini-panem-gvendolinu', era: 'kampana', when: 'Agrā pavasarī', yearsAgo: null, session: 1,
    title: 'Krinvini paņem Gvendolīnu',
    text: 'Pauls atskrien mājās nobrāzies, saplēstās drēbēs, bez siltās jakas: krinvini paņēmuši viņa māti. Abi ir salasījuši augļus no trim kokiem Bālajā kalnā — sārti oranžus, ar zvīņainu mizu un sīkiem zobiem sēklu vietā. Tikai Made Jete sajūt, ka augļi ož pēc salkana puvuma un medus.',
    glyph: 'fruit', people: ['pauls', 'gvendolina', 'made-jete', 'balais-kalns']
  },
  {
    id: 'cela-uz-kalnu', era: 'kampana', when: 'Agrā pavasarī', yearsAgo: null, session: 1,
    title: 'Ceļā uz Bālo kalnu',
    text: 'Hanss pieprasa, lai Bevians rīkojas. Bevians raizējas, kas sargās ciemu, kad vienība būs prom, taču Gvendolīna jāglābj tūlīt. Kirkaļu vienība, Hanss tās vidū, dodas Gvendolīnai pakaļ, un līdzi iet Rūna ar suņiem un Made Jete. Adarīna paliek pieskatīt Otto un Paulu, un Jolanta māj ardievas. Ceļinieki šķērso strautu atmuguriski, kā to darījuši senči.',
    glyph: 'footprints', people: ['hanss', 'bevians', 'runa', 'made-jete', 'adarina', 'otto', 'pauls', 'jolanta', 'balais-kalns']
  },
  {
    id: 'krinvini-kokos', era: 'kampana', when: 'Agrā pavasarī', yearsAgo: null, session: 1,
    title: 'Krinvini kokos',
    text: 'Aiz strauta mežs apklust, un koku galotnēs parādās krinvini. Tie atdarina ceļinieku balsis un nenolaiž acu no cirvjiem. Beviana vārdi atgriež vīriem drosmi. Viens krinvins ir neparasti bāls, gandrīz albīns; Made Jete aizmet tam augli, un tas to aizgūtnēm aprij. Suņi bālo krinvinu saplosa, taču pārējie neatkāpjas.',
    glyph: 'claws', people: ['bevians', 'runa', 'made-jete']
  },
  {
    id: 'akmens-gars', era: 'kampana', when: 'Agrā pavasarī', yearsAgo: null, session: 1,
    title: 'Akmens gars',
    text: 'Rūna noliek pie apsūnojuša akmens seģeni un pierunā tajā mītošo seno garu palīdzēt. Zeme nodreb, koki gāžas, un krinvini pašķīst. Petrovs izrauj Madi Jeti no krītošas priedes ceļa un pats tiek savainots. Bevians dzenas krinviniem pakaļ un apmaldās.',
    glyph: 'boulder', people: ['runa', 'akmens-gars', 'petrovs', 'made-jete', 'bevians']
  },
  {
    id: 'nakts-meza', era: 'kampana', when: 'Agrā pavasarī, krēslā', yearsAgo: null, session: 1,
    title: 'Nakts mežā',
    text: 'Pie akmens Rūna un Made Jete pamana, ka bālais krinvins, ko suņi saplosīja, ir salipis kopā un aizlien pa taku. Bevians atrod ceļu līdz akmenim, taču Po ir pazudis. Līdz ar tumsu atgriežas aukstums.',
    glyph: 'moon', people: ['bevians', 'po', 'runa', 'made-jete']
  },
  {
    id: 'bez-disciplinas-nav-uzvaras', era: 'kampana', when: 'Agrā pavasarī, pirms došanās ceļā', yearsAgo: null, session: 2,
    title: 'Bez disciplīnas nav uzvaras',
    text: 'Vingrinājumos ciemā iedomīgais vienacainais Po grib izrādīties un uzvarēt — un iesit Hansam. Bevians saka Po, ka uzvarai vajag disciplīnas, un abi mazliet sastrīdas.',
    glyph: 'spear', people: ['po', 'hanss', 'bevians']
  },
  {
    id: 'nakts-pie-gaztajiem-kokiem', era: 'kampana', when: 'Agrā pavasarī, naktī', yearsAgo: null, session: 2,
    title: 'Nakts pie gāztajiem kokiem',
    text: 'Rūnai ir pretrunīgas jūtas par to, ka koki gāzās viņas dēļ: viņa pazīst dabas nežēlību un jūt, ka tas Danu jāatlīdzina. Danu mīl lavandu, tāpēc Rūna izkaisa lavandas lapas un dzied īsu lūgšanu. Naktī atgriežas bālais krinvins, un Beviana vīri to atkal sakapā gabalos; no rīta tā ķermeņa vairs nav. Hanss klusām aizlavās no nometnes. Vienība raizējas, bet Bevians ir nežēlīgs: „Varbūt atradīsim viņu mirušu. Tā notiek ar tiem, kas neklausa pavēlēm.”',
    glyph: 'moon', people: ['runa', 'bevians', 'hanss']
  },
  {
    id: 'bala-kirzaka', era: 'kampana', when: 'Agrā pavasarī, naktī', yearsAgo: null, session: 2,
    title: 'Bālā ķirzaka',
    text: 'Made Jete jūt bijību pret mežu un saprot, ka krinvini grib zagt cirvjus un darbarīkus. Hektumeļa Kodekss viņu kārdina, un viņa sāk runāt ar Hektumeli, kas lūr ēnā kā bāla ķirzaka. Made Jete neguļ: visu nakti Hektumelis viņai māca burvestību, kas šķiet kā miegs, kā miers, kā sastingums. Viņa jūt, ka pretī kaut ko atdevusi, bet savu biedru vārdus viņa tam nav teikusi — tikai Gvendolīnas.',
    glyph: 'lizard', people: ['made-jete', 'hektumelis', 'gvendolina']
  },
  {
    id: 'gvendolinas-apmetne', era: 'kampana', when: 'Agrā pavasarī', yearsAgo: null, session: 2,
    title: 'Gvendolīnas apmetne',
    text: 'Ceļinieki atrod Gvendolīnas apmetni. Tajā no vāveru kauliem salikts raksts — tāds pats kā uz ciema Akmens: zīmes, kas tur krinvinus pa gabalu. Gvendolīnas soma ir uzplēsta, darbarīki pazuduši.',
    glyph: 'footprints', people: ['gvendolina', 'runa', 'bevians', 'made-jete']
  },
  {
    id: 'apsestais-kuilis', era: 'kampana', when: 'Agrā pavasarī', yearsAgo: null, session: 2,
    title: 'Apsēstais kuilis',
    text: 'Uzbrūk mežakuilis, ko pārņēmuši Bālā kalna augļi: āda tam lobās, starp sariem zvīņaini plankumi. Made Jete ar burvestību to iemidzina, un Bevians to sakapā. Rūna aplūko kuiļa ķermeni: zarnās ieaugušas sīkas, zobiem līdzīgas sēkliņas, un samaitātības dzīslas iesniedzas mugurkaulā un vada zvēru. Tikmēr Made Jete apēd pēdējo augli un uzzina, kā panākt to, ko viņa vēlas visvairāk, — mieru ciemā: krinvini nedrīkst iekļūt kalnā.',
    glyph: 'fruit', people: ['made-jete', 'bevians', 'runa', 'balais-kalns']
  },
  {
    id: 'balaja-kalna', era: 'kampana', when: 'Agrā pavasarī', yearsAgo: null, session: 2,
    title: 'Bālajā kalnā',
    text: 'Bālajā kalnā ceļinieki atrod Gvendolīnu: viņa jau ir ēdusi augļus un krinvinu pulkā ar Hansa cirvi cērt kalnā caurumu. Īsā cīņā viņa mēģina Rūnai iebarot augli, bet Rūna, Danu iedvesmota, to neļauj. Made Jete mēģina Gvendolīnu apburt, bet Hektumelis iezīmē pašu Madi Jeti. Lai Gvendolīnu pierunātu, Made Jete apēd vēl vienu augli — un šoreiz augļi pārņem viņu: Made Jete ir samaitāta. Gvendolīnu izdodas pierunāt, un abas, augļus nesdamas, dodas uz ciemu. Krinvini tagad turas pa gabalu un pielavās kalnam tikai tādēļ, lai nozagtu augļus un tos aiznestu.',
    glyph: 'palehill', people: ['gvendolina', 'hanss', 'runa', 'made-jete', 'hektumelis', 'balais-kalns']
  },
  {
    id: 'lielais-ugunskurs', era: 'kampana', when: 'Agrā pavasarī', yearsAgo: null, session: 2,
    title: 'Lielais ugunskurs',
    text: 'Rūna uzrunā koku garu un sastop Daženu. Tad Rūna lūdz Bevianu visu nodedzināt. Kirkaļi atvaira krinvinus, sakapā saknes un kokus un sadedzina tos lielā ugunskurā; viņu vidū ir arī Deķis, kurš tic Toram, zibens un spēka dievam. Caurumu viņi aizber ar zemi un akmeņiem, virsū noliek Beviana vairogu un uzvelk uz tā tās pašas zīmes, kas tur krinvinus pa gabalu. Darbs prasa laiku, tāpēc Made Jete un Gvendolīna ciemā nonāks pirmās.',
    glyph: 'sun', people: ['runa', 'dazena', 'bevians', 'dekis', 'balais-kalns', 'made-jete', 'gvendolina']
  }
];

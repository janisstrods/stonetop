# Latvian glossary and style guide

The vault's English `.md` notes are the source of truth, and this site is the Latvian version of them. This file is the site's translation memory. Reuse these choices so the Latvian stays consistent from session to session. When a new term is decided, add it here in the same commit.

## Names

The GM fixes the spellings. Pronouns follow the name ending: -s/-š/-is/-us/-ss means he/him, and -a/-e means she/her. Every part of a name declines.

| Name | Genitive | Dative | Accusative | Notes |
| --- | --- | --- | --- | --- |
| Bevians | Beviana | Bevianam | Bevianu | PC, Maršals |
| Made Jete | Mades Jetes | Madei Jetei | Madi Jeti | PC, Meklētāja; both parts decline |
| Rūna | Rūnas | Rūnai | Rūnu | PC, Svētītā |
| Adarīna | Adarīnas | Adarīnai | Adarīnu | |
| Adrianuss | Adrianusa | Adrianusam | Adrianusu | karavadonis |
| Aidens | Aidena | Aidenam | Aidenu | |
| Arvadoss | Arvadosa | Arvadosam | Arvadosu | |
| Demarkuss | Demarkusa | Demarkusam | Demarkusu | |
| Grants | Granta | Grantam | Grantu | |
| Gukals | Gukala | Gukalam | Gukalu | |
| Gvendolīna | Gvendolīnas | Gvendolīnai | Gvendolīnu | |
| Hanss | Hansa | Hansam | Hansu | |
| Jolanta | Jolantas | Jolantai | Jolantu | |
| Jorats | Jorata | Joratam | Joratu | |
| Kurakals | Kurakala | Kurakalam | Kurakalu | |
| Liliana | Lilianas | Lilianai | Lilianu | |
| Manfrēds | Manfrēda | Manfrēdam | Manfrēdu | |
| Otto | Otto | Otto | Otto | foreign name in -o, doesn't decline |
| Pauls | Paula | Paulam | Paulu | |
| Zbigņevs | Zbigņeva | Zbigņevam | Zbigņevu | |
| Aratis | Arata | Aratim | Aratu | god; "-tis" names keep the t (Gatis → Gata) |
| Danu | Danu | Danu | Danu | goddess; doesn't decline |

## Places and the world

| English (notes) | Latvian (site) |
| --- | --- |
| Stonetop | Akmeņgals (gen. Akmeņgala) |
| Marshedge | Purmale |
| the Great Wood | Lielais mežs |
| crinwin | krinvins / krinvini (gen. pl. krinvinu, dat. pl. krinviniem, acc. pl. krinvinus); lowercase |
| the Forest Folk | Meža ļaudis (dat. Meža ļaudīm) |
| the Things Below | Tie, kas Apakšā (dat. Tiem, kas Apakšā) |
| the peat mound (near Purmale) | kūdras uzkalns |
| the peat-mound spirit | Kūdras uzkalna gars |
| the Pavilion of the Gods | Dievu nojume |
| the black bath (sauna) | melnā pirts |
| Hec'tumel Codex | Hektumeļa Kodekss |
| Aratis the Lawkeeper | Aratis, Likuma sargs |
| Made Jete's unknown mother | Svešiniece |
| far away, beyond the map | Svešumā (the region); "Uz svešumu" (the road out) |

## Roles and titles

| English (notes) | Latvian (site) |
| --- | --- |
| unit / crew | vienība |
| unit commander | vienības vadonis (verb: vadīt) |
| General (Adrianuss) | karavadonis |
| ordinary member of a unit | vienkāršs karotājs |
| patrol | apgaita; patrol party: sardze |
| the family's succession debate | vārdu cīņa |
| witch (Made Jete, Grants) | zintniece / zintnieks (the craft: zintis) |
| healer | dziedniece |
| midwife | vecmāte |
| priest of Danu (Rūna) | Danu augstā priestere |
| village priest (Zbigņevs) | ciema priesteris |
| tanner | miecētāja |
| potter / apprentice | podnieks / māceklis |
| publican | krodzinieks |
| field worker | laukstrādniece |
| messenger | ziņnesis |
| foragers | meža velšu vācēji (never "mednieki un vācēji", which means "hunter-gatherers") |
| distils remedies | tecina zāles |
| playbooks | Maršals, Meklētāja, Svētītā (kicker "Spēlētāja tēls · …") |

## Relationship types (map legend)

| `type` | Latvian |
| --- | --- |
| kin | Dzimta |
| love | Mīla |
| friend | Draudzība |
| oath | Solījums |
| duty | Darbs un dienests |
| tension | Nesaskaņas |
| mystery | Noslēpums |
| sorcery | Burvība un gari |

Unnamed or unknown figures (`kind: 'shadow'`) get the kicker "Ēnā palicis tēls".

## Style rules

- **Register.** This is an Iron Age village. Use plain, timeless, folk-flavoured Latvian, never modern military or office jargon.
- **Avoid these words:** komandieris, komandēt, ģenerālis, ierindnieks, patruļa, pakļautībā, disputs, paviljons, ragana.
- **Faithfulness.** Translate what the notes say. Don't add causes, adjectives or scenes the notes don't contain, and don't drop facts that matter.
- **Person cards (`about`).** Lead with who the person is. Write in the past tense for backstory and the present tense for traits. Use two to six sentences.
- **Relationship labels.** Two to four words. A label is printed on the line and shown on *both* people's cards. If it only makes sense from one side (e.g. "uzsūtīja garu"), fill in `aIs` and `bIs`. `aIs` is what A is to B, and `bIs` is what B is to A.
- **Chronicle (`notikumi.js`).** Write in the historical present ("Grants pārnāk…, drīz mirst").
- **Dates.** Write them like "Pirms kādiem 24 gadiem", "Pirms laba mēneša", "Pirms paaudzes (gads nezināms)". Never use "~". Spell out numbers up to ten in words.
- **Pronouns.** Prefer the name over "viņš/viņa" whenever a pronoun could point to two people.
- **Punctuation.** Use Latvian quotation marks „…”, spaced em dashes " — ", and no comma before "un" when it joins two verbs with the same subject.
- **Calques.** Watch for them: "kāds mantojums", "starpnieks ar", "ar bažām", and noun stacks like "Sešu krinvinu nakts uzbrukumā".

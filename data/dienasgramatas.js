/*
  DIENASGRĀMATAS — spēlētāju tēlu pašu pieraksti par sesijām
  ==========================================================
  (The players' session diaries, generated from the vault's Diaries/*.md notes by
   .claude/skills/update-stonetop-site/scripts/diaries.js. Don't edit by hand:
   change the note and run the script again.)

  IERAKSTS (entry):
    id       – 's<sesija>-<autora id>', piem. 's1-made-jete' (dienasgramatas.html#s1-made-jete)
    session  – sesijas numurs
    date     – sesijas datums, YYYY-MM-DD
    author   – tā spēlētāja tēla id, kura vārdā rakstīts (no data/cilveki.js)
    text     – rindkopas; [[id|teksts]] ir saite uz tēlu vai vietu kartē
*/

window.STONETOP = window.STONETOP || {};

STONETOP.diaries = [
  {
    id: 's1-made-jete', session: 1, date: '2026-10-29', author: 'made-jete',
    text: [
      'Pavasaris nāca lēni. Pēc garas un bargas ziemas zeme beidzot sāka atkust, no jumtu malām pilēja pēdējās lāstekas, un ciema takās pēdējais sniegs bija tikai ēnainākajās vietās. Ne visi šo pavasari bija sagaidījuši. Vecais [[vinets|Vinets]] bija nosalis mežā, un viņa nāve atgādināja, cik maz vajag, lai ziema un aukstums paņemtu cilvēku.',
      'Rīta pusē [[runa|Rūna]] piestāja pie [[gvendolina|Gvendolīnas]] pārrunāt mednieču darīšanas: kuras takas pēc sniega kušanas būs jāapseko, kur likt lamatas un ko jau varēs ievākt mežā. Gvendolīna apsolīja Rūnai salasīt pumpurus. Runas neizbēgami aizvirzījās arī pie aizvadītās ziemas. Malka bija jātaupa, un daudzās mājās aukstums bija kļuvis par pastāvīgu iemītnieku.',
      'Garām gāja krodzinieks [[manfreds|Manfrēds]], nesdams no meža salasītās kritalas. Viņš domīgi apjautājās, cik ilgi vēl būs jāgaida Meža ļaužu atgriešanās. Ja vien drīkstētu cirst kokus, ziema būtu bijusi pavisam citāda. Rūna viņam atgādināja par līgumu. Mežam ir sava kārtība, un tā nav pārkāpjama tikai tādēļ, ka cilvēkiem klājas grūti. Manfrēds devās tālāk ar savu nastu.',
      'Viņam aizejot, pienāca [[made-jete|Made Jete]]. Tuvojās rumulēšanās, kad govis pēc ziemas pirmoreiz laidīs ganībās, un bija jāgādā ziedojumu grozs no meža veltēm. Vēl vajadzēja ozolu mizas, jo bija laiks dzīt kandžu.',
      'Sarunas gaitā Madei Jetei atausa atmiņā kāda savāda lieta. [[gukals|Gukala]] kājā redzētā brūce bija svaiga, taču audi ap to izskatījās tā, it kā ievainojums būtu cirsts jau sen. Tie bija melni un trūdējuši. Tā nebija parasta brūce, un šī doma nedeva mieru.',
      'Ap pusdienlaiku ciema laukumā [[bevians|Bevians]] apmācīja savu Kirkaļu vienību. Vīri vingrinājās turēt ierindu, aizstāvēties un rīkoties ar ieročiem. Pavasaris bija atnesis atkusni, bet ne drošību.',
      'Garām steidzās Dievu paviljona priesteris, tēvs [[zbignevs|Zbigņevs]]. Minēja par nekārtībām un zādzībām. [[gvins|Gvinam]], kurš dzīvoja pie sētas, bija pazudis cirvis. Darbarīku zādzība nebija maza lieta. Esot jānes ziedojums Aratisam, lai atjaunotu izjaukto kārtību.',
      'Ciemā sacēlās cita kņada. Atskanēja satraukti saucieni, un ļaudis sāka pulcēties ap kādu tikko atskrējušu zēnu. Rūna, Made Jete un Bevians devās turp.',
      'Cauri cilvēku pleciem varēja saskatīt [[pauls|Paulu]], Gvendolīnas dēlu. Viņš bija nobrāzies, drēbes saplēstas, siltā jaka pazudusi. Rokās zēns turēja auduma tarbu, cieši piespiedis to pie sevis. Rūna izlauzās cauri pūlim.',
      'Tajā pašā brīdī Madei Jetei sejā iesitās savāda smaka. Salkans puvums, sajaukts ar medu. Šķita, ka neviens cits to nejūt.',
      '„Krinvini paņēma mammu!” — Pauls izgrūda starp šņukstiem.',
      'Pamazām no viņa izdevās izvilināt notikušo. Viņš ar Gvendolīnu bija devies uz kalnu, kur trīs kokos bija salasījuši augļus. No tarbas Pauls izvilka vairākus sārti oranžus, pārgatavojušos bumbieriem līdzīgus augļus. To miza bija savādi zvīņaina.',
      'Made Jete tos aplūkoja tuvāk. Kaut kas tajos šķita pazīstams no seniem tēva nostāstiem par Hektumeļa Kodeksa kalpiem. Kad vienu augli pārplēsa, sulai tekot starp pirkstiem, sēklu vietā atklājās kaut kas līdzīgs sīkiem zobiem. Pauls teicās, ka ne viņš, ne māte augļus nebija ēduši.',
      'Ziņa par Gvendolīnas pazušanu satrieca viņas vīru [[hanss|Hansu]]. Viņš pieprasīja, lai Bevians rīkojas. Beviana domas kavējās arī pie tiem, kas paliks ciemā, kā varēs sevi aizstāvēt. Ja viņš aizvedīs savus vīrus, kā Akmeņgals sevi aizsargās viņu prombūtnē? Tomēr Gvendolīnu bija jāglābj nekavējoties.',
      'Tika nolemts doties viņai pakaļ. Beviana Kirkaļu vienībai pievienojās Rūna ar suņiem un Made Jete.',
      'Cieminieki sanāca pavadīt aizgājējus. Rūna mierināja Paulu un [[otto|Otto]], cik nu šādā brīdī bērnus iespējams mierināt. [[jolanta|Jolanta]] pamāja ardievas. Neviens nezināja, cik ilgs būs ceļš un vai visi atgriezīsies.',
      'Viņu mērķis bija [[balais-kalns|Bālais kalns]].',
      'Vēl pirms iziešanas ceļiniekus brīdināja, ka mežā pie paša kalna nav iestaigātu taku. Tur būs jālaužas cauri biezoknim, pa vietām, kur cilvēki reti sper kāju. Rūna no bērnības atmiņām spēja atsaukt atmiņā aptuveno virzienu. Viņa atcerējās arī ko citu: krinvini jātur pa gabalu no kalna. Kāpēc, tas atmiņā nebija saglabājies.',
      'Ceļā viņiem nācās šķērsot upi. Pēc senas paražas viņi to darīja atmuguriski, ar muguru pret ūdeni. Tā bija darījuši senči, un tā darīja arī tagad. Ne visas paražas prasīja skaidrojumu, jo īpaši tās, kas attiecās uz ūdeņiem, mežu un to neredzamajiem iemītniekiem.',
      'Otrā krastā mežs kļuva klusāks. Zem kājām čīkstēja mitrā zeme, un starp kailajiem zariem vēl turējās ziemas pelēkums. Rūna sajuta pazīstamu tirpoņu. Pār ādu pārskrēja skudriņas. Tuvumā bija meža gariņi.',
      'Tad suņi sāka riet.',
      'Augstu virs galvām sakustējās koku galotnes. Čabēja zari, bira vecās lapas. Starp stumbriem pazibēja sīki, ātri silueti, kas lēkāja no zara uz zaru, te parādoties, te atkal pazūdot.',
      'Krinvini.',
      'Bevians uzsauca visiem turēties kopā un sagrupēties. Viņš redzēja, ka vīri ir satraukti. Neviens nezināja, cik krinvinu slēpjas zaros un no kuras puses tie uzbruks. Bevians pacēla balsi, lai viņu dzirdētu arī pāri suņu rejām. Viņš atgādināja saviem kareivjiem, kādēļ viņi ir šeit, lai pārvestu mājās vienu no savējiem. Viņi bija Akmeņgala ļaudis, kas kopā pārdzīvojuši bargu ziemu, un tagad nedrīkstēja pamest cits citu. Lai kas slēptos tajos kokos, tam būs jātiek garām viņiem visiem. Bevians nerunāja ilgi, taču viņa pārliecība iedarbojās. Vīri stingrāk satvēra ieročus, iztaisnoja muguras un sastājās ciešākā lokā. Arī Rūna un Made sajuta, ka sākotnējās bailes atkāpjas un to vietā nāk apņēmība.',
      'No zariem atskanēja ķērcoša balss, kas neveikli atkārtoja pēdējos Beviana vārdus.',
      'Krinvini ielenca no visām pusēm. Tie lēkāja starp zariem, raustījās savādās kustībās un turpināja atdarināt ceļinieku balsis. Viņiem bija raksturīgi atkārtot dzirdēto, reizēm vienu un to pašu frāzi vairākas reizes, šķietami bez jebkādas sapratnes par tās nozīmi.',
      'Starp tiem bija viens, kas atšķīrās no pārējiem. Neparasti bāls, gandrīz albīns, ar glumu ādu un savādu, nedabisku izskatu. Viņā bija palicis maz no parasta krinvina.',
      'Bevians pavēlēja saviem vīriem izveidot aizsardzības loku. Made Jete atradās vidū, Bevians ar kareivjiem turēja ārējo līniju, bet Rūna sargāja vienu no sāniem.',
      'Made Jete izvilka no tarbas vienu no Hektumeļa savādajiem augļiem un aizmeta to krinviniem. Bālais radījums acumirklī metās tam virsū un aizgūtnēm aprija to, gandrīz nekošļājot.',
      'Vērojot krinvinu uzvedību, kļuva skaidrs, ka tos interesē cirvji. Viņu skatieni neatlaidīgi sekoja cirvju kātiem. Radījumi tikmēr centās ielauzties aizsardzības lokā. No tiem nāca tā pati salkanā medus un puvuma smaka, ko Made bija sajutusi ciema laukumā.',
      'Suņi bālo krinvinu saplosīja gabalos. Taču pārējie neatkāpās.',
      'Netālu, vien trīs soļu attālumā, gulēja apsūnojis akmens. Rūna sajuta tajā mītošu garu un nolēma meklēt tā palīdzību. Viņa sajuta garu, vēl pirms bija tam pietuvojusies. Viņas saikne ar meža dievieti Danu ļāva sajust to, kas citu acīm un maņām palika apslēpts. Mežs viņai nekad nebija tikai koki, saknes un zeme. Tajā mita senāki spēki, kuriem cilvēku gaitas maz rūpēja, bet ar kuriem reizēm bija iespējams sarunāties, ja vien zināja, kā klausīties. Viņa nolika pie akmens seģeni kā ziedojumu un uzrunāja to.',
      'Gars atbildēja, taču nesteidzās palīdzēt. Tā balss bija sena un nesteidzīga. Tas runāja par lietām, kas bijušas pirms viņa, un par tām, kas būs vēl ilgi pēc viņa. Cilvēku rūpes tam šķita laicīgas, un tas nesaskatīja iemeslu iejaukties. Kas vienam ir nelaime, citam — notikums, pie kura nekavēties. Kas šodien šķiet svarīgs, rīt jau būs aizmirsts.',
      'Rūna neatlaidās. Viņa centās pārliecināt garu, ka arī īslaicīgām lietām ir nozīme un ka pareizi rīkoties ir vērts pat tad, ja viss reiz pāries.',
      'Akmens apklusa.',
      'Tad no akmens sakņu dzīlēm atskanēja zema dunēšana. Tā pieņēmās spēkā, līdz sāka drebēt zeme. Apkārtējie koki sakustējās, to saknes plēsa vaļā mitro augsni, un milzīgie stumbri viens pēc otra sāka gāzties.',
      'Krinvini pašķīda uz visām pusēm. Gāzās reizē ar stumbriem.',
      'Liela priede gāzās tieši virsū Madei Jetei. Pēdējā brīdī kareivis [[petrovs|Petrovs]] pagrūda viņu malā, izraudams no krītošā stumbra ceļa.',
      'Bevians, redzēdams bēgošos krinvinus, dusmās metās tiem pakaļ. Taču mežs bija sajaukts līdz nepazīšanai. Gāztie koki aizšķērsoja ceļu, brikšņi sabiezēja, taka gaisa, un drīz viņš bija pazaudējis gan krinvinus, gan visus savus kareivjus. Viņš palika viens satumstošā mežā.',
      'Tikmēr Rūna un Made Jete pulcējās pie apsūnojušā akmens. Made sašuva suņa brūci. Tur viņas pamanīja ko satraucošu. Bālais krinvins, kuru suņi bija saplosījuši gabalos, vairs neatradās tur, kur bija kritis. Tā ķermenis bija savilcies atpakaļ kopā, it kā kāds neredzams spēks būtu salipinājis miesu. Tagad tas vienā gabalā līda prom pa meža taku.',
      'Bevians atrada ceļu atpakaļ pie akmens. Tur viņu gaidīja Rūna un Made Jete. Pamazām kļuva skaidrs, ka no viņa vienības trūkst viena kareivja. [[po|Po]] nebija atgriezies.',
      'Līdz ar tumsu atgriezās aukstums. Zeme vēl nebija atlaidusi ziemu, un mežā gaidāmā nakts solījās būt stindzinoša.'
    ]
  }
];

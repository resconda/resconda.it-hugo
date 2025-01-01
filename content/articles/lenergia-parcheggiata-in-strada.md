---
title: L'energia parcheggiata in strada
date: 2024-05-08
summary: |
  In una città italiana media la maggior parte dei veicoli presenti si muove pochissimo e rimane perlopiù parcheggiata. Proviamo a farci un'idea, oltre che dello spazio, anche della quantità di energia che sprechiamo.
cover_image: # optional
  src: assets/post-img/parking-369381_1920_giqmhw
#   caption: "caption string"
classes:
  - TWh
tags:
  - città
  - energia
  - auto
---

La quantità di energia incorporata negli autoveicoli è enorme.  
Abbiamo già accennato alla questione in [questo post](/articles/veicoli-elettrici-quale-impatto-ambientale/) in cui parlavamo dei veicoli elettrici, prendendo a riferimento un valore di CED (Cumulated Energy Demand: l'energia incorporata nel bene) per una Wolksvagen Golf pari a 24 MWh, dato fornito dalla casa costruttrice.  
Proviamo qui invece a fare un calcolo considerando in prima approssimazione i principali materiali che compongono la massa di un veicolo: acciaio (\~70%), plastica e polimeri (10%), alluminio (\~5%), gomma (\~2%) e vetro (\~2%) e moltiplicandoli per la loro specifica densità energetica -- come da [questa tabella](https://www.wgtn.ac.nz/architecture/centres/cbpr/resources/pdfs/ee-coefficients.pdf) prodotta dalla Victoria University di Wellington.  
Possiamo cos&igrave; fare una stima non troppo approssimata della CED media di una autovettura a motore endotermico di 1500 kg.

{{< tablecaption caption="Contributo in massa ed energetico dei principali materiali che compongono un'auto">}}
| **Materiale**           |   **% [5]** | **Massa (su auto da 1500 kg) [kg]** | **Densità energetica [MJ/kg]** | **Emergy [kWh]** |
| ----------------------- | ----------: | ----------------------------------: | -----------------------------: | ---------------: |
| acciaio [1]             |      70,00% |                                1050 |                             30 |             8750 |
| alluminio vergine [2]   |       4,50% |                                67,5 |                            199 |             3731 |
| alluminio riciclato [2] |       0,50% |                                 7,5 |                           14,8 |               31 |
| plastica [3]            |      10,00% |                                 150 |                            100 |             4167 |
| gomma                   |       2,00% |                                  30 |                            110 |              917 |
| vetro [4]               |       2,00% |                                  30 |                           26,2 |              218 |
| altro                   |      11,00% |                                 165 |                            n/d |              n/d |
| **TOTALE**              | **100,00%** |                            **1500** |                                |        **17814** |
{{</tablecaption>}}

Volendo stimare il peso energetico delle "altre" componenti con lo stesso "peso percentuale" sulla massa complessiva, si arriverebbe alla cifra quasi tonda di **20 MWh**.

Mettiamo adesso questa energia nelle strade di una città italiana medio-grande come Torino, dove [*nel 2016*](http://www.comuni-italiani.it/001/272/statistiche/veicoli.html) c'erano 639 auto ogni 1000 abitanti. Nel 2022 la media italiana [*era 682*](https://ec.europa.eu/eurostat/databrowser/view/road_eqs_carhab/default/table?lang=en&category=road.road_eqs), possiamo quindi **arrotondare a 650 auto/1000 abitanti**.  
Con un numero complessivo di 844 mila abitanti, a Torino ci sono quindi **circa 550 mila automobili.**

Quante di queste -- in un dato istante -- sono inutilmente parcheggiate, ingombrando ognuna 6/10 \(\textrm{m}^2\) di preziosissimo suolo urbano? Da [un'analisi](http://www.roliassociati.it/lorganizzazione-della-sosta-nelle-citta-italiane/) che abbiamo trovato possiamo approssimare in rapporto 70:30 veicoli fermi/veicoli in movimento, mediato sulle 24h della giornata (di notte ci saranno molti meno veicoli in movimento).  
Prendendo quindi il 70% del totale auto stimato prima, otteniamo **un'energia complessiva parcheggiata di 7.680 GWh**, dell'ordine di grandezza della **produzione annua di due centrali nucleari**.

Si potrebbe pensare che nella società "occidentale" moderna questo sia lo stato dell'arte delle città, che dobbiamo (vogliamo?) convivere con questo volume di automobili, onnipresenti nelle vie urbane di centri e periferie. Esistono tuttavia delle eccezioni notevoli.  
Il caso forse più emblematico, ben raccontato nel libro di Daniel Knowles, *Carmageddon: How Cars Make Life Worse and What to Do About It*, ci porta un po' lontano dall'Italia e dall'Europa: [Tokyo](https://brandondonnelly.com/2023/04/21/why-so-few-people-drive-in-tokyo/) è una delle città più grandi e popolose al mondo. La capitale del Giappone riesce ad essere un esempio di come ci si possa spostare in un territorio urbano così vasto senza possedere un'autovettura.  
Con le sue 0.32 auto per nucleo familiare, famiglie in media di 1.95 persone, una popolazione di circa 40 milioni di abitanti, potrebbe avere all'incirca 6.4 milioni di automobili. Che per i conti fatti prima si traduce in quasi 40.000 GWh.  
Certo, un valore enorme in termini assoluti. Ma se vogliamo confrontare i due casi esaminati dobbiamo scalare per la superficie del territorio urbano. Mentre la nostra "piccola" Torino ha un'estensione di 130 \(\textrm{km}^2\), Tokyo si estende per un'impressionante area di più 13 mila \(\textrm{km}^2\) , praticamente cento volte tanto.  
Ma il fattore 100 in realtà è praticamente invertito, in favore di Tokyo, se dividiamo le "energie parcheggiate" per le rispettive superfici: **per Torino abbiamo 25 GWh/km<sup>2</sup>, per Tokyo solo 0,3.**

{{< small >}}
[1] considerato quasi tutto acciaio vergine, arrotondando per difetto da 32 a 30  
[2] considerato 90% vergine, 10% riciclato  
[3] adottato valore intermedio tra Polipropilene e ABS  
[4] vetro rinforzato  
[5] mediato tra queste fonti: [researchgate.net](https://www.researchgate.net/publication/46439901_Review_of_technical_literature_and_trends_related_to_automobile_mass-reduction_technology), [dailyindustry.wordpress.com](https://dailyindustry.wordpress.com/2009/05/26/world-needs-automotive-recycling-company/), [transportgeography.org](https://transportgeography.org/contents/chapter4/transportation-sustainability-decarbonization/material-components-car/)  
{{</small>}}
<!--  
  created 2024-05-08 18:41:34.218487 +0200 CEST m=+0.090838334
-->
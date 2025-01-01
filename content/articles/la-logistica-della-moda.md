---
title: "La logi(sti)ca spietata della moda"
date: 2024-03-05
## below are user-defined parameters (lower case keys recommended)
summary: |
  La fast fashion non consuma solo nel produrre abiti. Prendendo spunto da una recente campagna di Greenpeace, proviamo a fare un'analisi degli spostamenti che i capi fanno da quando escono dalla fabbrica, come sempre dal punto di vista energetico.
cover_image: # optional
  src: assets/post-img/fast-fashion-moda-a_qescta
#   caption: "caption string"
classes:
  - kWh
tags:
  - moda
  - vestiti
  - trasporti
---

Nella puntata di Report [*del 11 febbraio*](https://www.raiplay.it/video/2024/02/Giralamoda---Report-11022024-0a95dd5f-319c-4610-a273-64d629515d0b.html) viene presentata l'inchiesta fatta con Greenpeace sui percorsi fatti da 24 capi di diversi colossi mondiali di fast fashion, dal momento dell'uscita dal centro di produzione fino all'ultimo acquirente, passando per una serie più o meno lunga di resi. La puntata prosegue andando a visitare la destinazione finale (Congo) dei vestiti "dismessi" dal Mondo Occidentale.

Vista la nostra prima [pillola sulla *emergy* dei capi di abbigliamento](/articles/l-e-costo-della-moda/), aggiungiamo a questi dati una stima del costo energetico di questa aberrazione commerciale, partendo dai dati dei chilometri percorsi, raggruppati per mezzo di trasporto, pubblicati nel [*report*](https://www.rai.it/dl/doc/2024/02/12/1707754776632_Report_Greenpeace.pdf).

{{< tablecaption caption="Chilometri percorsi dai 24 capi analizzati, per mezzo di trasporto" >}}
| **MEZZO**   | **km (24 capi)** | **%**     |
| ------- | ------------ | ----- |
| Nave    | 2310         | 2.33  |
| Furgone | 8290         | 8.38  |
| Aereo   | 34123        | 34.49 |
| Camion  | 54222        | 54.80 |
| **TOTALE**  | **98945**        | **100**   |
{{</tablecaption>}}

Per valutare l'impatto energetico medio di un capo di fast fashion, occorre

1.  trovare l'e-costo chilometrico del dato mezzo;
2.  trovare la capacita' di carico media della tipologia di mezzo di trasporto;
3.  trovare il load factor del dato mezzo e ricavare il contributo del singolo capo rispetto al carico totale.

Per quanto riguarda il primo punto, abbiamo recuperato questi dati di intensità energetica (valori in kWh/t*km), per le tipologie di mezzo considerate nel report:

- furgone (<3.5t): 8,6844[^8]       
- camion (16-32t): 0,7543[^8]       
- intercontinental freight aircraft: 2,0278[^5]  
- Roll-on/Roll-off ship (Ro-ro): 0,6667[^7]  

Per i punti 2. e 3. ci siamo affidati al portale [transportmeasures.org](http://transportmeasures.org), che a sua volta ha raccolto ed elaborato molti dati relativi all'impatto ambientale dei mezzi di trasporto di cose e persone.

Otteniamo quindi:

| MEZZO      | Capacità di carico (t) | Load factor | Carico medio (t)  | E (kWh/km) | km medi per singolo capo | e-costo di un capo[^2] (kWh)|
| ---------- | ----------------------- | ----------- | ------------------ | ---------- | ------------------------ | ------------------------- |
| Nave Ro-ro | 20                  | 0,07[^3]     | 1.4           | 933     | 96                       | 0,064                     |
| Furgone    | 3.5                   | 0,3[^4]     | 1.05              | 0,7     | 345                      | 0,2                      |
| Aereo      | 40[^6]              | 0,7[^5]     | 28             | 18,6      | 1422                     | 0,948                     |
| Camion     | 26                  | 0,5         | 13             | 8,7[^1]  | 2259                     | 1,51                      |
| TOTALE     |                         |             |                    |            | **4123**                     | **2,7**                      |

Da osservare che il valore di sintesi finale, **2,7 kWh** è una "media del pollo": ciascuno dei 24 capi può aver viaggiato tramite una o più modalità di trasporto, quasi certamente mai con tutte quante insieme.

[^1]: usato camion 16-32t, intermedio
[^2]: considerando un capo da 1kg
[^3]: usato il load factor ricavato di Ro-ro [qui](https://www.transportmeasures.org/en/wiki/manuals/sea/load-capacity-utilisation/), **diviso per un fattore 10**: una nave Ro-Ro porta un sacco di peso "extra", rispetto al carico che interessa a noi. &Egrave; chiaramente una stima molto approssimativa
[^4]: [https://www.transportmeasures.org/en/wiki/manuals/road/vehicle-types-and-characteristics/](https://www.transportmeasures.org/en/wiki/manuals/road/vehicle-types-and-characteristics/) Come camion abbiamo considerato la voce \"20-26t\", usando un valore intermedio tra "*%w*" e "*%pallet*". Come furgone il \"*van*\".
[^5]: [https://www.transportmeasures.org/en/wiki/evaluation-transport-suppliers/air-cargo-transport-baselines-2020/](https://www.transportmeasures.org/en/wiki/evaluation-transport-suppliers/air-cargo-transport-baselines-2020/)
[^6]: [https://www.transportmeasures.org/en/wiki/manuals/air/aircraft-types/freight-aircraft-types/](https://www.transportmeasures.org/en/wiki/manuals/air/aircraft-types/freight-aircraft-types/) La capacità di carico è molto variabile a seconda del velivolo considerato. Abbiamo preso un valore intermedio.
[^7]: [https://www.transportmeasures.org/en/wiki/evaluation-transport-suppliers/sea-cargo-transport-baselines/](https://www.transportmeasures.org/en/wiki/evaluation-transport-suppliers/sea-cargo-transport-baselines/)
[^8]: Dati [ecoinvent](https://ecoinvent.org)
<!--
  created 2024-03-05 19:07:06.825008 +0100 CET m=+0.122072709
-->
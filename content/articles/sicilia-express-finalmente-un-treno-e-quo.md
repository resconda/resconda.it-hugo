---
title: "Sicilia Express: finalmente un treno e-quo?"
date: 2025-01-06
tags:
- treni
- trasporti
- energia
summary: |
  *Sul binario delle emozioni, destinazione Sicilia. Un treno speciale per i siciliani fuori sede. [...] Un rientro a casa semplice, economico e divertente.*
  Qualche considerazione sul costo economico ed energetico di diversi mezzi di trasporto.
cover_image:
 src: assets/post-img/Sicilia_Express_MobileHM_ITA_s4qed0
#  caption: 
classes:
- MWh
---

Grazie a un decreto del Governo di novembre 2024, Trenitalia [aveva annunciato](https://siciliaexpress.eu/) di mettere a disposizione un treno che attraversa lo Stivale da Nord a Sud, per permettere alle persone “native” delle regioni meridionali di poter tornare per le feste natalizie a prezzi “popolari”, di contrasto con il caro voli arrivato a livelli per molti insostenibili. 

Una sola data di andata, il 21 dicembre, e una di ritorno, il 5 gennaio. Da Torino a Messina, per tutti, e poi due opzioni: Siracusa o Palermo le destinazioni possibili di andata, ovvero partenze possibili per il ritorno.  
Come si vede dal sito ufficiale, **i prezzi sono decisamente popolari: 30 euro per la tratta completa**. Inutile dire che i posti, 500 (\!\!\!), sono andati a ruba nel giro di pochi minuti (probabilmente l’ordine di grandezza esatto è stato dei secondi), costringendo coloro che non sono stati abbastanza veloci nel cliccare a ripiegare su soluzioni più care, fino ai 130 euro per il posto in carrozza letto singola.

Ci è capitato in passato di parlare di costi energetici di mezzi di trasporto, analizzando ad esempio viaggi di persone, al [mare](https://resconda.it/articles/crociera-vs-aereo/) e in [montagna](https://resconda.it/articles/l-e-costo-dell-elitrasporto-di-turisti-a-cogne-assurdo/), o di [vestiti](https://resconda.it/articles/la-logistica-della-moda/). È un tema che ci sta a cuore: ci chiediamo spesso se i prezzi dei biglietti siano in qualche modo correlati al costo energetico del trasporto o se invece il Mercato regna come al solito sovrano, dettando regole apparentemente illogiche.

Come ci raccontava Luciano Celi in questa [pillola](https://resconda.it/articles/quanto-costerebbe-l-energia-se-potessimo-usare-solo-quella-dei-nostri-muscoli/), un treno Frecciarossa ha una potenza di crociera di circa 10 MW. Nel caso del Sicilia Express, un treno non ad alta velocità, possiamo stimare che la potenza nominale sia di un ordine di grandezza inferiore: il principale antagonista della velocità è l’attrito dell’aria e l’andamento della potenza frenante sviluppata dalla forza di attrito va con il cubo della velocità.  
Prendiamo quindi 1 MW, che possiamo approssimativamente considerare come valore medio per tutte le 22 ore del viaggio (fermate e ripartenze incluse). Otteniamo quindi un’energia complessiva consumata di 22 MWh.  
Dividendo per i 500 posti a disposizione, otteniamo **44 kWh per passeggero, circa un sesto del corrispondente viaggio in aereo**.

Proviamo quindi a fare un esperimento concettuale: scaliamo in termini energetici i prezzi dei biglietti per i vari vettori di trasporto considerati, ipotizzando che il prezzo del Sicilia Express sia equo per l’energia necessaria al viaggio.  
Per fare ciascuno dei 1500 chilometri della tratta completa sono serviti **14,7 kWh/km**. Al prezzo più conveniente, ogni passeggero ha speso **0,02 €/km**. **La tariffa della sua *bolletta* per il viaggio da Torino a Palermo è stata di 68,2 centesimi di euro al kWh**. Chi non la vorrebbe una bolletta così, a casa (ripensate ai 196.000 pedalatori del Frecciarossa).

Ripetiamo gli stessi passaggi per altri mezzi di trasporto, riportando per semplicità i risultati in tabella

{{< tablecaption class="x-small" caption="" >}}
| mezzo | D (km) | pax | E (kWh) | P (€) | P/D (€/km) | E/D/pax [1] (kWh/km) | E/D/pax vs. treno [2] | tariffa (€/kWh) [3] | tariffa vs. treno [4] |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| **treno** | 1500 | 500 | 22000 | 30 | 0,02 | 0,03 | 1 | 0,682 | 1 |
| **aereo[5]** | 1000 | 150 | 45000 | 150 | 0,15 | 0,30 | **10,23** | 0,50 | **0,733** |
| **nave[6]** | 800 | 2253 | 1194982 | 70 | 0,0875 | 0,66 | **23** | 0,132 | **0,194** |
{{</tablecaption>}}

{{< small >}}
Note:
* [1]: Contributo energetico di ogni passeggero per unità di distanza percorsa  
* [2]: Contributo energetico relativo a quello del treno  
* [3]: Spesa del passeggero per ogni kWh consumato  
* [4]: Costo energetico relativo a quello del treno  
* [5]: Valori da [post precedente](https://resconda.it/articles/energia-dei-voli-aerei/)  
* [6]: L'energia consumata e' stimata a partire dal valore di consumo di carburante (gasolio) orario per traghetti GNV, trovato [qui](http://www.sardegnaindustriale.it/article.asp?ID=7164&IDmagazine=2011002): consumo: 4561 kg/ora; durata tratta: 20 ore; densita' energetica del gasolio: 13,1 kWh/kg
{{</small>}}

Come si vede, cosa che ci ha un po’ sorpreso, **l’energia consumata pro-capite percorsa dal traghetto è 23 volte superiore a quella del treno**, **e comunque più del doppio di quella dell’aereo**, che invece è “solo” 10 volte quella del treno.  
L’assurdo però è nell’ultima colonna: il chilowattora del mezzo apparentemente meno efficiente (nave) costa un quinto del mezzo più virtuoso (treno). Anche il wattora dell’aereo costa meno del treno.   
Ricreiamo la tabella di sopra facendo il processo a ritroso: partendo dai 30 euro del biglietto del treno e dal peso energetico di ciascun passeggero, vediamo quale dovrebbe essere il listino prezzi nel mondo Rescondiano ideale, dove i passeggeri pagherebbero in proporzione all’efficienza energetica del mezzo.

{{< tablecaption class="x-small" caption="" >}}
| mezzo | E/D/pax (kWh/km) | E/D/pax vs. treno | P ResConDA (€) | P/D (€/km) | tariffa ResConDA (€/kWh) | tariffa vs. treno |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| **treno** | 0,03 | 1 | **30** | 0,02 | 0,682 | 1 |
| **aereo** | 0,30 | 10,23 | **307** | 0,31 | 1,02 | 1,50 |
| **nave** | 0,66 | 22,60 | **678** | 0,85 | 1,28 | 1,88 |
{{</tablecaption>}}

La tariffa della “bolletta energetica” rimane comunque “ragionevole” per tutti i vettori di trasporto: salvo i più eco-fondamentalisti di noi, molte persone sarebbero comunque tentate dai tempi di viaggio decisamente ridotti offerti dalla tratta aerea a fronte di un “misero” 50% in più di costo del chilowattora rispetto al treno. Quel che è sicuro è che la nave resterebbe fuori dai giochi, a meno di non fare considerazioni sul peso trasportato: con i veicoli al seguito il carico di una nave rimane chiaramente imbattibile rispetto ai mezzi concorrenti qui considerati.
    
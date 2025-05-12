---
title: "Turismo spaziale: ne abbiamo davvero bisogno?"
date: 2025-05-12
tags:
- aerospazio
- turismo
- ricchezza
summary: "Qualche settimana fa è stato effettuato il “primo volo spaziale interamente al femminile”. A parte la specificità di genere, il volo non aveva nessun obiettivo scientifico-tecnologico, essendo peraltro rimasto nello “spazio” pochi minuti. Ma quanta energia serve per compiere una tale missione? "
cover_image:
 src: assets/post-img/Blue_Origin_M7_t1iojb
#  caption: 
classes:
- GWh
---

Partiamo dalle [basi](https://en.wikipedia.org/wiki/New_Shepard?utm_source=chatgpt.com): il razzo New Shepard dell’azienda Blue Origin aveva una massa al decollo di 75t e una spinta di 490 kN. [Ha raggiunto](https://en.wikipedia.org/wiki/Blue_Origin_NS-31) la quota di 107 km. Al netto delle approssimazioni relative ad attrito ed efficienza motori, possiamo avere una prima stima dell’**energia meccanica che è servita a portare l’oggetto** **fino a quella quota**

E \= F \* s

dove F è la spinta e s è la distanza percorsa. Considerato che il valore di spinta indicato è quello massimo ma che la distanza percorsa potrebbe essere un po’ superiore alla semplice linea verticale di 107 km, facciamo semplicemente il prodotto dei due valori, ottenendo 52430 MJ, **ovvero circa 14,6 MWh.**

Proviamo ora a seguire la strada del carburante. Importante premessa, il combustibile qui utilizzato non è fossile, bensì una miscela di idrogeno liquido (LH2) e ossigeno liquido (LOX), pertanto non possiamo parlare di emissioni di {{< CO2 >}} e/o di particolati. Ricordiamoci però che per produrre idrogeno combustibile, che non è presente in natura né in qualche giacimento sotterraneo, serve più energia di quella che poi sarà in grado di restituire dalla combustione (con buona pace del primo principio della termodinamica)..  
Non siamo riusciti a trovare indicazioni sulla composizione della miscela, Blue Origin ha rilasciato veramente pochissimi dati relativi al razzo e alla missione. Ci prendiamo anche qui un po’ di libertà di approssimazione, e usiamo il valore [trovato](https://it.wikipedia.org/wiki/Potere_calorifico) per l’idrogeno di 142 MJ/kg. Anche il valore della capacità del serbatoio non è facile da stimare. Ci affidiamo a una stima di [questo thread stackexchange](https://space.stackexchange.com/questions/33843/estimating-weight-of-new-shepard-with-ns-10-launch-data?utm_source=chatgpt.com#comment171213_33843) e utilizziamo il valore di 25 t per la massa del carburante, ottenendo infine **un’energia chimica stimata di 986 MWh.**

A cosa è dovuta questa discrepanza tra energia meccanica e chimica?   
Intanto c’è da considerare che parte del carburante viene usato per il rientro, dato che il razzo deve atterrare “sulle sue gambe”, con accelerazioni umanamente sostenibili per l’equipaggio. Ammettendo che sia stata prevista un po’ di riserva, possiamo stimare che solo 800 MWh siano andati effettivamente “in fumo” (anzi, in “vapore” in questo caso). Inefficienze legate a motore, dissipazioni termiche ed attriti possono far quadrare i conti e giustificare quella che sembra essere **una (in)efficienza complessiva del sistema di appena 1,83%.**

L’ordine di grandezza che interessa a noi è senz’altro quello del GWh, energia necessaria a produrre il carburante utilizzato per dare a sei ricche donne (probabilmente ricchissime, considerate le [speculazioni](https://www.chron.com/culture/article/texas-blue-origin-flight-cost-20281618.php?utm_source=chatgpt.com) sui prezzi dei biglietti) dieci minuti e ventuno secondi di gloria.
    
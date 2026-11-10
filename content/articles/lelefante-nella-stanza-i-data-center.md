---
title: "L’elefante nella stanza: i data center"
date: 2026-11-10
tags:
- intelligenza artificiale
- acqua
- elettricità
summary: |
  I data center esistono da molto prima dell’esplosione dell’intelligenza artificiale. Ma sono diventati argomento quanto mai attuale, anche alla luce dei recenti risultati delle elezioni di metà mandato negli Stati Uniti, e in generale per le proteste sempre più frequenti di comunità che in tutto il mondo si oppongono al loro insediamento. Ma qual è veramente il loro *e-mpatto*?
cover_image:
 src: assets/post-img/ismail-enes-ayhan-lVZjvw-u9V8-unsplash_t8scf0
# caption: 
classes:
- TWh
---

Da un punto di vista energetico, il data center è un blocco di cemento con al suo interno apparecchiature elettroniche – i server – sistemati in dei *rack* (armadi metallici), i cablaggi per connetterle, più l’infrastruttura necessaria a mantenere in costante attività tali macchine: batterie, gruppi di continuità, sistemi di raffreddamento. Visti dall’esterno, i data center possono estendersi per un’area variabile tra le decine e le centinaia di migliaia di metri quadrati, con picchi che superano il milione (ad esempio l’impianto ipotizzato per [Trino Vercellese](https://www.datacentermap.com/italy/torino/trino-data-center/specs/)). L’input energetico in termini di corrente elettrica necessaria ai server e al raffreddamento è anch’esso variabile, solitamente nell’ordine di grandezza dei 100 MW.

La fame di potenza di calcolo generata dalla corsa al miglioramento dei modelli di IA ha portato all’esplosione della domanda di autorizzazioni per la costruzione di queste strutture. Anche l’Italia non è risparmiata da questa impennata di domanda.  
Come [si vede](https://dati.terna.it/econnextion#utenti-di-consumo) dal sito di Terna, al 30 settembre 2026 le richieste in fase di accettazione per l’installazione di nuovi data center in tutta Italia cubano per 38.30 GW, su quasi 200 pratiche che possiamo assumere corrispondano ad altrettanti impianti. La media è di quasi 200 MW a impianto, in linea con la potenza media citata in precedenza.

Parte di queste richieste potrebbero tuttavia essere di natura speculativa: se Terna e/o le autorità imputate ad autorizzare una richiesta danno il via libera, il terreno su cui dovrebbe sorgere l’impianto aumenta automaticamente il proprio valore, a prescindere che l’impianto venga poi effettivamente realizzato. 

Per avere un’idea degli impatti energetici, ipotizziamo un data center di dimensioni medio grandi, su una superficie di 75000 m{{< sup>}}2{{</sup>}}, con una quota di *white space* del 47% e una potenza IT installata di 60 MW, su una vita utile di 20 anni. Questi i costi energetici previsti:

| Categoria | Costruzione iniziale (TJ) | Sostituzioni (TJ) | Manutenzione (TJ) | Esercizio (TJ) | Totale ciclo di vita (TJ) | Quota % |
| :---- | ----- | ----- | ----- | ----- | ----- | ----- |
| Struttura | 470 | 0 | 0 | 0 | 470 | 0,5% |
| Server e IT | 3.023 | 9.016 | 0 | 0 | 12.039 | 13,4% |
| Cablaggi | 271 | 30 | 0 | 0 | 301 | 0,3% |
| Raffreddamento | 194 | 174 | 78 | 0 | 446 | 0,5% |
| Altri impianti | 176 | 75 | 70 | 0 | 321 | 0,4% |
| Cantiere e trasporti | 207 | 0 | 0 | 0 | 207 | 0,2% |
| Energia elettrica (IT \+ raffreddamento \+ ausiliari) | 0 | 0 | 0 | 75.667 | 75.667 | 84,3% |
| Gasolio prove generatori | 0 | 0 | 0 | 348 | 348 | 0,4% |
| **Totale** | **4.340** | **9.295** | **148** | **76.016** | **89.798** | **100,0%** |

{{< cloudinary_img src="assets/post-img/CED_ciclo_di_vita_per_categoria_TJ_prrenj">}}

In sintesi: costruire un data center ha costi energetici estremamente alti: circa 1205 GWh (4340 TJ) – principalmente per la realizzazione dei server – ma il costo vero si ha nella gestione operativa (energia necessaria al funzionamento dell’impianto e per la sostituzione periodica dei server), stimata in circa 700 GWh/anno, per un totale di 21 TWh sulla vita utile dell’impianto: pari al consumo annuo di elettricità di un’intera nazione come la Svizzera o la Danimarca.  

Si tenga conto inoltre che i dati considerati non includono i costi di decommissioning della struttura e dei server sostituiti nella manutenzione periodica. Il dato comprensivo di tali costi sarebbe significativamente più alto. 

Un’altro aspetto da considerare è il consumo di acqua dolce da parte dei data center, utilizzata per raffreddare i server. Su questo viene posta una grande attenzione – specialmente in aree dove l’acqua è una risorsa scarsa (certamente ha contribuito a determinare l’esito delle recenti elezioni politiche in Texas). Per l’esempio fatto sopra sono previsti consumi di acqua variabili (in funzione delle fonti e del tipo di tecnologia di raffreddamento adottata) tra 1 e 1,6 milioni di {{< sup>}}3{{</sup>}} di acqua all’anno (pari al consumo di un paese di 13-20 mila abitanti, tipo Domodossola o Urbino). 

Utile infine sapere che per ogni query standard fatta all’AI corrisponde un consumo di energia pari (in media) a circa 0,23 Wh e di acqua pari a 0,5 ml, cioè mezzo litro ogni mille query. Non trascurabile ma non paragonabile con una bistecca di manzo da 300 grammi, il cui “costo  idrico” è stimato in circa 300 litri d’acqua (non considerando la pioggia…). 

##
    
---
title: "La benzina dall’aria, finalmente"
date: 2025-08-09
tags:
- benzina
- aria
- CO2
- idrossido di potassio
- idrogeno
summary: "Una startup dichiara di produrre benzina a partire da acqua e aria. Un claim veramente impressionante! Vediamo quanto sia “fritta” questa aria (e quest’acqua), o se possiamo continuare a usare i motori endotermici a emissioni (ed e-costo) zero."
cover_image:
 src: assets/post-img/aircela_gasoline_from_air_dljhhh
#  caption: 
classes:
- kWh
---

Tra le nostre varie fonti di notizie e spunti per trattare di temi energetici, siamo capitati su [questa startup](https://www.aircela.com) che promette di essere sul punto di industrializzare un sistema di **produzione domestica di benzina** che richiede come soli **ingredienti acqua e aria**. Wow, un claim veramente impressionante\! Ma in presenza di notizie così clamorose, preferiamo studiare un po’ l’argomento.

Partendo dalle [FAQ](https://www.aircela.com/frequently-asked-questions) sul sito dell’azienda, vediamo una prima risposta alla domanda che subito nasce nella testa di chi è abituato a “maneggiare” energia: **OK, ma quanto mi *e-costa***? Traducendo la loro risposta: *“il sistema punta a raggiungere **un’efficienza** di conversione complessiva (end-to-end) **del 50%**, a regime di produzione. Con una tale efficienza, servono 75 kWh per produrre 1 gallone di benzina al giorno”*. I conti tornano, dato che 1 gallone di benzina ha un contenuto energetico di circa 36 kWh.

Peccato, non sono state scoperte nuove leggi della fisica e non abbiamo la nuova fonte infinita e gratuita di energia.   
Vediamo però come questa tecnologia si pone rispetto ad altre forme, con particolare focus sull’applicazione alla mobilità (visto che la benzina di fatto viene perlopiù usata per i motori dei veicoli).

In questa analisi consideriamo un uso immediato della fonte di energia, trascurando i costi energetici connessi allo stoccaggio, che impattano in particolare nel caso dell’elettricità e (soprattutto) dell’idrogeno, meno nel caso delle benzine.    

In questa analisi consideriamo un uso immediato della fonte di energia, trascurando i costi energetici connessi allo stoccaggio, che impattano in particolare nel caso dell’elettricità e (soprattutto) dell’idrogeno, meno nel caso delle benzine.

Partiamo dal dato di base: qual è l’efficienza energetica nella produzione di 1 gallone di benzina da fonte fossile tradizionale (petrolio)? Prendendo ad esempio [questa fonte](https://rmi.org/the-incredible-inefficiency-of-the-fossil-energy-system/), il dato del 2019 ci dà un valore di 68% (411/606). Un po’ meglio del sistema aria+acqua, ma si tratta di eliminare le fonti fossili, qualche sacrificio lo dovremo pur fare, no?  
Per confrontare varie tipologie di fonte energetica per locomozione, prendiamo l’efficienza complessiva “well-to-wheel” (W2W), considerando quindi anche l’efficienza del motore utilizzatore del “carburante” (in senso lato).  
Per un motore endotermico, possiamo considerare [ottimisticamente](https://en.wikipedia.org/wiki/Engine_efficiency#Gasoline_\(petrol\)_engines) un 30%. Avremo quindi **un’efficienza W2W del 15% per il nostro sistema aria-acqua, contro un 20.4% per la benzina fossile.**

Considerato che questo sistema ha come fase intermedia la produzione di idrogeno, sembra sensato confrontarlo con le **celle a idrogeno**, altra fonte di propulsione di veicoli. In questo caso, [la letteratura](https://www.sciencedirect.com/science/article/abs/pii/S0360544222016346) ci dà un range tra il 22 e il 29 percento di efficienza W2W – nello scenario migliore di elettrolisi dell’acqua con energia elettrica da fonte rinnovabile. Prendiamo agnosticamente un **valore intermedio di 25.5%**. 

Un ultimo termine di confronto è ovviamente la propulsione elettrica.  
Anche qui il range di variabilità è ampio, e dipende principalmente dal mix energetico con cui è prodotta l’elettricità che va a caricare  le batterie. [Valori medi](https://ui.adsabs.harvard.edu/abs/2020SJRUE..24..669A/abstract) vanno dal 20% – nel caso di fonte fossile – a un 55% per fonte rinnovabile.

{{< tablecaption caption="Riassunto dei valori di efficienza W2W stimati." class="caption-top" >}}
| Tipo di propulsione | Efficienza W2W (%) |
| :---- | :---- |
| Benzina aria-acqua | 15 |
| Benzina fossile | 20.4 |
| Celle a idrogeno | 25.5 |
| EV \- elettricità da fossile | 20 |
| EV \- elettricità da rinnovabile | 55 |
{{</tablecaption>}}

Al di là del fatto che il sistema in esame sembra performare peggio di tutti i concorrenti analizzati, quello che ci preme evidenziare, per concludere, è il contrasto con i toni sensazionalistici del [social media marketing](https://www.instagram.com/reel/DLrzLZiSVxK/?igsh=eGJjajFpdDFpemJ1) messo in piedi dall’azienda e quella che è la realtà dei fatti, che può essere scoperta solo spendendo molto più dei settanta secondi di video promozionale.

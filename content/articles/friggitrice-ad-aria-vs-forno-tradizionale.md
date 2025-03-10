---
title: "Friggitrice ad aria vs. forno tradizionale"
date: 2025-03-10
tags:
- cucina
- forno
- bolletta 
summary: "Un trend di consumo ormai molto diffuso nel settore degli elettrodomestici casalinghi, con un nome assolutamente fuorviante per quello che e’ di fatto un fornetto iper-ventilato. Ma dal punto di vista dei costi energetici, può essere un valido rivale del forno tradizionale?"
cover_image:
 src: assets/post-img/image_ch11ve
 caption: "Credits: [freemalaysiatoday.com](https://www.freemalaysiatoday.com/category/bahasa/2020/07/26/betul-ke-guna-air-fryer-makanan-jadi-lebih-sihat/) - CC BY 4.0"
classes:
- kWh
---

In uno scenario tipico in cui la friggitrice ad aria viene acquistata e introdotta in una casa dove già esiste una cucina e quindi un forno tradizionale, la considerazione che va fatta è se, al netto dell’energia incorporata nel nuovo elettrodomestico, i suoi ridotti consumi rispetto al forno \- vedremo tra poco se sono realmente tali \- contribuiscono in tempi ragionevoli a ridurre i costi energetici domestici, rispetto allo scenario in cui non venga acquistata.

Abbiamo provato a sintetizzare i valori dei consumi del forno tradizionale e della friggitrice ad aria disponibili sul web, assegnando una potenza media di 1000 W per il forno tradizionale, il cui ciclo di lavoro standard prevede che una volta raggiunta la temperatura impostata, questo stacchi e riattacchi la resistenza elettrica per mantenere tale temperatura.   
Per la friggitrice ad aria usiamo invece 1500W, anche se il range di potenza è parecchio variabile, da meno di 1kW fino anche a 3kW\! A differenza del forno, la friggitrice lavora a ciclo continuo, per cui ha senso considerare la potenza nominale “di targa”.  
Un’altra importante differenza tra i due elettrodomestici sta nei tempi di riscaldamento, strettamente legati alle dimensioni: mentre per il forno, che ha una camera dell’ordine di qualche decina di litri (circa 50), per una friggitrice i volumi sono molto più ridotti, al punto che possiamo considerare nulli i tempi di riscaldamento. Per il forno invece assumiamo un valore nominale di 15 minuti, per raggiungere la temperatura di 200 °C.

Proviamo quindi a ipotizzare una tipica cottura che può essere fatta in entrambi gli elettrodomestici: le patate al forno. Nella tabella seguente i dettagli di tempi e consumo di energia di questa preparazione. 

{{< tablecaption caption="Scenario: cottura patate al forno, porzione per due persone" class="caption-top" >}}
|  | potenza media \[W\] | T risc \[min\] | T cottura \[min\] | consumo \[kWh\] |
| :---- | ----- | ----- | ----- | ----- |
| forno tradizionale | 1000 | 15 | 40 | 0,917 |
| friggitrice ad aria | 1500 | 0 | 20 | 0,500 |
{{</tablecaption>}}

Non rimane che considerare la embodied energy della friggitrice ad aria.  
Non trovando analisi sullo specifico prodotto, proviamo a fare una stima, partendo dal peso medio dell’oggetto e provando a formulare ipotesi sulla sua composizione in termini di materiali.  
Una friggitrice ad aria pesa intorno a 5 kg ed è costituita principalmente da acciaio, plastica e componentistica elettronica. Proviamo a ipotizzare la composizione così come mostrato in tabella.

{{< tablecaption caption="materiali componenti e relativi CED per una friggitrice ad aria di 5kg. (1) [Fonte](https://www.wgtn.ac.nz/architecture/centres/cbpr/resources/pdfs/ee-coefficients.pdf) " class="caption-top" >}}
| materiale | Densità energetica \[MJ/kg\] (1) | % massa totale | CED \[kWh\] |
| :---- | ----- | ----- | ----- |
| acciaio | 30 | 80% | 33,33 |
| plastica | 100 | 10% | 13,89 |
| elettronica | 120 | 10% | 16,67 |
{{</tablecaption>}}

**La somma della CED dei componenti ci dà 64 kWh.**   
Con questo valore, possiamo quindi valutare dopo quanto tempo dall’acquisto la friggitrice ad aria inizia ad avere un bilancio energetico positivo (l’*energy payback time*).   
Continuando con l’esempio di cottura sopra, ipotizziamo diversi scenari di utilizzo, considerando quante volte al mese viene utilizzata.

{{< tablecaption caption="scenari annui di utilizzo e tempo di pareggio energetico per una friggitrice ad aria “costata” 64 kWh" class="caption-top" >}}
| cotture/mese | consumo annuo forno tradizionale \[kWh\] | consumo annuo friggitrice ad aria \[kWh\] | diff/anno \[kWh\] | energy payback time \[anni\] |
| ----- | ----- | ----- | ----- | ----- |
| 4 | 44 | 24 | \-20 | 3 |
| 8 | 88 | 48 | \-40 | 2 |
| 12 | 132 | 72 | \-60 | 1 |
{{</tablecaption>}}

Come molte altre volte abbiamo detto, l’acquisto di un nuovo prodotto, non solo nel campo elettrodomestici, ha senso dal punto di vista energetico se questo oggetto avrà vita lunga e sarà effettivamente usato con costanza e non riposto in armadio o dispensa una volta finito l’entusiasmo iniziale della novità, dopo qualche settimana.  
Nel caso specifico in esame, obsolescenza programmata permettendo, è plausibile pensare che si possa fare un buon uso di questo elettrodomestico per diversi anni, magari anche fino ai 10\.   
Se si rientra nella casistica considerata di utilizzo \- ovvero cotture frequenti con quantità modeste di cibo \- è possibile che si arrivi in un tempo decisamente ragionevole a migliorare il bilancio energetico rispetto al forno tradizionale. Attenzione però: questo vale se già prima dell’acquisto si rientrava in questa casistica di utilizzo. Se pensiamo di aumentare le nostre cotture (e quindi i nostri consumi) per giustificare l’arrivo in casa del nuovo elettrodomestico, quanto detto finora non vale più.
    
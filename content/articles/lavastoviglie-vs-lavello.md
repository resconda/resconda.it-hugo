---
title: "A mano o in lavastoviglie?"
date: 2026-05-11
tags:
- piatti
- cucina
- lavastoviglie
- acqua calda
summary: "È una discussione ricorrente nelle “chiacchiere da bar”: si consuma meno elettricità e/o acqua a lavare i piatti a mano o in lavastoviglie? Proviamo a fare due conti."
cover_image:
 src: assets/post-img/pavol-tancibok-CQVfXtNwCNM-unsplash_1_scsheu
#  caption: 
classes:
- kWh
---

Molte persone sostengono che lavare i piatti a mano sia più ecologico ed economico perché "si usa meno acqua e si vede cosa si fa". Altre invece sono assolutamente convinte che l’efficienza della lavastoviglie sia insuperabile, sia dal punto di vista dei consumi elettrici sia per quanto riguarda lo “spreco” di acqua (per non parlare del prezioso tempo risparmiato lontano dal lavello). Quando lasciamo scorrere l’acqua dal rubinetto mentre insaponiamo, o quando riempiamo una vasca per il risciacquo, stiamo muovendo volumi e temperature che il nostro cervello non registra in kilowattora, ma solo come gesto quotidiano.  
Proviamo a quantificare.

Sul portale ENERGY STAR abbiamo trovato un [database](https://www.energystar.gov/productfinder/download/certified-residential-dishwashers/) di lavastoviglie – vendute sul mercato nordamericano, ma sono marche presenti anche qui in Europa quindi li consideriamo dati rappresentativi. Prendendo solo le 95 migliori, quelle che rispettano i “criteri di migliore efficienza di ENERGY STAR”, vediamo che la media di consumo annuale si aggira intorno ai 217 kWh/anno. Sulla pagina di descrizione di tali criteri si dichiara il numero di cicli/anno di riferimento: 215\. Senza troppa approssimazione, possiamo considerare **il valore tondo tondo di 1 kWh per ogni lavaggio.**  
Per quanto riguarda il **consumo di** **acqua, il valore medio per lo stesso campione** si attesta intorno agli **11 litri per ogni lavaggio**.

Passiamo al lavaggio a mano. Possiamo stimare la temperatura ottimale dell’acqua per un lavaggio efficace di 60 gradi. La differenza di temperatura rispetto all’acqua dell’acquedotto (15 gradi) è quindi di 45°C.  
Ma quanta acqua consumiamo quando laviamo i piatti a mano? Come spesso accade la variabilità è alta, fortemente dipendente dalle modalità di lavaggio: c’è chi lava tenendo sempre il rubinetto aperto, magari parzialmente, e chi preferisce riempire la vasca del lavello o una bacinella e lavare “a immersione”, sciacquando poi successivamente. Intuitivamente quest’ultima modalità sembra la più efficiente e pertanto focalizziamo l’analisi su questa, che è anche la più semplice da stimare.  
Occorre intanto considerare che, per un confronto equo con la lavastoviglie, la quantità di oggetti da lavare è notevole: nel campione considerato in precedenza la capienza dei modelli andava dagli 8 coperti, per alcune lavastoviglie più compatte, ai 17 coperti. La media è più vicina a quest’ultimo valore, **circa 15 coperti**.  
Un tale volume di stoviglie richiede, per un lavaggio adeguato, di riempire una discreta vasca di acqua. La vasca di un lavello da cucina “standard” ha misure dell’ordine di 35x35x12 cm{{< sup>}}3{{</sup>}}, che tradotto in litri fa 14,7. Possiamo pensare di lavare i suddetti 15 coperti (ovvero almeno quindici piatti, altrettante forchette, coltelli, bicchieri) in due tornate dentro quel volume, arrivando a un **totale di circa 30 litri riscaldati.**   
Per calcolare l’energia necessaria a portarli alla temperatura considerata sopra dobbiamo applicare della termodinamica elementare

\[
    E = m \; c_{sp} \; (T_c - T_f)
\]

dove \(m\) è la massa d’acqua scaldata, \(c_{sp}\) il calore specifico dell’acqua \(4186 J/(kg \; ^\circ C)\), \(T_c\) è la temperatura dell’acqua calda e \(T_f\) quella fredda. Facendo i conticini si ottengono 2,87 MJ, ovvero 1,57 kWh. Supponendo di scaldare l’acqua tramite caldaia a metano, dobbiamo considerare la sua efficienza. Prendiamo il valore di 65% [già usato](https://resconda.it/articles/vado-a-farmi-una-doccia-calda) in un’altra pillola e **otteniamo infine** 2,42 kWh, più un 100 Wh forfettario di costo energetico del lavoro umano, arriviamo a **2,52 kWh.**

Tornando sul consumo idrico, non dobbiamo dimenticare di risciacquare i nostri piatti, finora immersi in un mix di acqua insaponata e residui di cibo. Aggiungiamo conservativamente un’altra decina di litri, totalizzando 40 litri tra acqua calda e fredda.

Quindi, a livello di consumi elettrici sembra spuntarla la lavastoviglie, anche se non di molto (probabilmente qualche virtuoso del lavaggio a mano riuscirà a usare la metà dell’acqua). *Sembra*, appunto, perché non abbiamo finora considerato il proverbiale *elefante nella stanza*: la *embodied energy* della lavastoviglie.   
Da un articolo sul sito educational del MIT, si vede che un elettrodomestico simile alla lavastoviglie, ovvero la lavatrice (*washing machine* nell’articolo in inglese) ha una *embodied energy* di 3900 MJ, che possiamo approssimare a 1,1 MWh. Ipotizzando una vita utile della lavastoviglie di 10 anni, con i suddetti 215 lavaggi all’anno, occorre aggiungere circa 0,5 kWh ad **ogni lavaggio della lavastoviglie, arrivando quindi a 1,5 kWh.**  
Con un ragionamento inverso, possiamo stimare **quanto deve durare la vita dell’elettrodomestico** per rimanere competitivo rispetto al lavaggio a mano: se un lavaggio “a macchina” consuma 1,5 kWh in meno di uno manuale, ci vogliono 734 lavaggi per recuperare l’investimento iniziale di 1,1 MWh (1100 kWh / 1,5 kWh), ovvero **circa tre anni e mezzo**, al ritmo di 215 lavaggi all’anno.

Sul consumo di acqua sembra invece non esserci alcun dubbio: la lavastoviglie è decisamente più efficiente, anche nello scenario “virtuoso” di soli 15 litri di acqua calda, che diventano 25 totali con il risciacquo. Ma anche qui potrebbe esserci un colpo di scena: c’è chi ha l’abitudine a sciacquare un po’ la stoviglia sotto il rubinetto, prima di inserirla in lavastoviglie. A prescindere dall’utilità o meno del gesto, nell’ottica di “preservare la lavastoviglie” da ipotetici accumuli di residui di cibo, questo potrebbe annullare il vantaggio competitivo dell’elettrodomestico rispetto al nostro “olio di gomito”.
    
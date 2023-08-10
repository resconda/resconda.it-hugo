---
tags: 
- subacquea
- estate
- energia
classes:
- kWh
date: '2023-08-04'
title: "Si va a fare immersioni? Fanno XXX kWh!"
summary: |
  Fare immersioni è un hobby estivo che nell'immaginario collettivo sembra essere molto eco friendly e sostenibile. Vediamo se è vero... 
cover_image:
  src: assets/post-img/32331909_10216685968410690_1570744379952332800_n_b2e9kg
---

Dopo aver stimato l'e-costo di una [giornata sugli sci](https://resconda.it/articles/si-va-a-sciare-fa-150-kwh/) qualche mese fa, continuiamo la e-rassegna delle attività ricreative stagionali prendendo in considerazione la subacquea. 

Dobbiamo innanzitutto recarci al centro di diving con un veicolo che ci permetta di portare l'attrezzatura (a meno di non noleggiare il tutto direttamente al diving, nel qual caso possiamo arrivarci anche a piedi). Supponendo di essere in vacanza e già ragionevolmente vicini al centro immersioni, consideriamo un tragitto di riferimento di 100km (a/r). Con i dati già usati per i conti fatti sulla giornata in montagna, tralasciando i costi autostradali per rimanere più generici, abbiamo per il transfer 92.5 kWh. 

L'attività subacquea richiede vari tipi di attrezzature, sui quali dovremmo stimare la embedded energy e il ciclo di vita. Verosimilmente la parte che può avere impatto non trascurabile è la muta in neoprene. La vita di una muta è tutt'altro che eterna. 
>https://www.researchgate.net/figure/Bound-rubber-contents-of-uncured-masterbatches-15_tbl3_228778128 cita energia necessaria per produrre syntethic rubber 100MJ/kg. 

Per quanto riguarda i "running costs" relativi alla strumentazione del subacqueo, l'operazione di ricarica bombola è certamente da tenere in considerazione. La fisica che descrive il processo di compressione di aria in un contenitore rigido non è immediata, in quanto si tratta di un sistema aperto in cui viene inserito e "schiacciato" un gas quasi-ideale con una trasformazione a volume costante.  
Meglio provare a fare stime partendo dall'altro capo della catena, ovvero dai compressori. Cercando qualche [dato tecnico](https://coltri.com/compressori/open/#specifications) dal sito di un produttore (non abbiamo preso sponsorizzazioni dalla Coltri), vediamo che un modello industriale performante ha un motore elettrico con potenza nominale di 15kW che promette di caricare una bombola da 10L in 2'40". Assumendo che per un'immersione standard ce ne voglia una un po' più grossa, diciamo 15L, e che il tempo di carica vari linearmente, possiamo stimare 4' di ricarica che alla potenza nominale risultano in un'energia spesa di ricarica di 1kWh tondo tondo.

Preparata l'attrezzatura, non resta che recarsi al sito di immersione. Tipicamente i diving center offrono il trasporto con natante (gommone) e/o organizzano gruppi di immersione, ottimizzando quindi anche i costi di spostamento. Qui le variabili in gioco sono tante: dimensioni del gommone e consumi del motore; numero di persone trasportate; distanza da percorrere per andare e tornare dal sito immersioni; etc. Dovremo andare un po' a spanne:
- dieci sub (più equipaggio, ma imputiamo l'energia solo a chi fa l'attività) 
- 50 L/h consumo gommone. Questa stima può avere molta varianza, sia per la potenza del motore che per le condizioni marine e la velocità di navigazione tenuta. A titolo di esempio, fonti dirette ci hanno dato range da 35 a 70 con picchi di 110 L/h per un motore da 300CV su gommone da 9m
- 30' di tragitto a/r. Anche qui si oscilla un po', ma difficilmente per un diving è conveniente fare tratte molto più lunghe di così.
Mettendo insieme le grandezze otteniamo un consumo pro-subacqueo di 2.5L, che si traduce in 24kWh.

Rispetto alla giornata in pista da sci, per ragioni fisiologiche e di sicurezza è solitamente consigliato non fare più di due immersioni in una stessa giornata, specie se a profondità importanti (30+ m). Tirando le somme, quindi:
- tragitto casa-diving center: **93kWh**
- muta (singola immersione x2):
- ricarica bombola (x2): **2kWh**
- navigazione A/R a/da sito di immersione (x2): **48kWh**
- **TOTALE: kWh**

Questo valore, con tutte le incertezze del caso, è sorprendentemente vicino a quello trovato l'inverno scorso per stimare l'e-costo della giornata sugli sci.  
Non dovrebbe stupirci: la grossa fetta di energia se la mangiano ancora una volta i motori a scoppio, che in questo caso sono addirittura due (auto + gommone).
---
title: "Salgo a piedi, o prendo l’ascensore?"
date: 2025-12-04
tags:
- ascensori
- casa
- scale
summary: "Quanta energia consuma un ascensore nel trasportarci su o giù di un certo numero di piani?"
cover_image:
 src: assets/post-img/glass-3256974_1920_stcuy0
#  caption: 
classes:
- kWh
---

Abbiamo trattato il tema ascensori [in passato](https://resconda.it/articles/impatto-ambientale-dell-ascensore/), analizzando i vari fattori che contribuiscono al consumo totale di energia (elettrica) di un ascensore all’interno di un edificio.

Questa volta vogliamo concentrarci su uno degli aspetti che allora non avevamo approfondito, ma che è di fatto l’essenza dell’ascensore: l’energia necessaria a portare i “carichi” (persone, animali, buste della spesa, casse dell’acqua…) su e giù per i piani del palazzo.

Consideriamo per semplicità solo gli ascensori a fune, i più diffusi.

L’energia necessaria a muovere un ascensore dipende da una serie di fattori: il carico trasportato, la direzione dello spostamento (salita o discesa), il numero di piani percorsi.  
Partiamo dalla base: ascensore vuoto. Quando si chiama l’ascensore fermo a un piano diverso dal nostro, questo dovrà percorrere, vuoto, un dato numero di piani per arrivare fino al nostro.  
Gli ascensori a fune possono essere modellizzati come una carrucola: a un capo è appesa la cabina; la carrucola è l’argano che tira la fune in una direzione o nell’altra; all’altro capo vi è un contrappeso, che bilancia il peso della cabina. Possiamo ipotizzare che il sistema sia progettato con un contrappeso equivalente al peso della cabina vuota.   
Questo significa che nello spostarsi “a vuoto” l’argano dovrà semplicemente vincere la resistenza di attrito del cavo di acciaio che vi passa dentro. Non è facile stimare questa potenza, ma possiamo ragionevolmente pensare che sia trascurabile rispetto a quella necessaria a spostare una o più persone.

Con questa premessa, veniamo ora all’energia necessaria a sollevare o fare scendere le persone. Si tratta di dinamica di base: l’energia spesa (o guadagnata) nello spostare un corpo nel campo gravitazionale terrestre è

\[E = \textrm{m g h} + E_a\]

dove *m* è la massa spostata, *g* l’accelerazione di gravità, *h* il dislivello compiuto, \(E_a\) è l’energia legata agli attriti (che abbiamo deciso di trascurare).  
In caso di salita, \(h > 0\) quindi \(E > 0\), cioè si consuma energia per il sollevamento. Al contrario, nella discesa, E sarebbe negativa, ovvero si potrebbe recuperare energia nel far scendere un carico. Il condizionale è legato al fatto che per farlo serve un sistema elettrico (motore+inverter) in grado di “invertire” il suo funzionamento e sfruttare la sua forza frenante per recuperare energia (esattamente come fanno le auto elettriche in fase di frenata), ma torneremo tra un attimo su questo aspetto. 

Qual è quindi il valore energetico unitario, per **la salita di un singolo piano (3 m) con a bordo una persona di 70 kg**? Il conto è presto fatto: 
\(70 \textrm{kg} \cdot 9.81 \textrm{m/s}^{2} \cdot 3 \textrm{m} = 2100 \textrm{J} = 0.583 \textrm{Wh}\).  
Il motore elettrico ha una sua (in)efficienza, che possiamo stimare dell’ordine del 85%. Otteniamo quindi **0,686 Wh**. Una quantità decisamente piccola, rispetto ai valori che siamo abituati a trattare. Quel 0.583 Wh rappresenta anche l’energia che il nostro corpo “brucia” quando saliamo a piedi un piano di scale. Anche lui ha una sua efficienza, decisamente più bassa e che stimiamo al 25%. Il valore che otteniamo, in un’unità di misura più familiare quando si parla di metabolismo, è di **2 kCal**.

Per la discesa invece? Riprendendo il discorso recupero di energia, gli impianti moderni hanno in effetti questa capacità. [Questa](https://www.kone.it/sostenibilita/le-tappe-fondamentali-verso-l-eco-efficienza.aspx) azienda dichiara che i suoi sistemi di “azionamento rigenerativo” possono ridurre dal 20 al 35% i consumi annui dell’impianto.   
Utilizzando nuovamente il [tool](https://design.na.tkelevator.com/tools/energy-calculator) di calcolo/confronto che avevamo già menzionato nella precedente pillola e confrontando un sistema “tradizionale” con uno rigenerativo, otteniamo una stima di **una riduzione del 42% dei consumi di movimentazione** (da 2871 a 1659 kWh/anno nell’esempio della tabella sotto, riga “Elevator”), che diventa **un \-15% sui consumi annui complessivi** (da 8177 a 6941 kWh/anno). 

{{< cloudinary_img src="assets/post-img/ascensore_nonregen_vs_regen_vkzcik" caption="Confronto tra ascensore senza recupero di energia (Scenario 1 a sinistra) e sistema rigenerativo">}}

In un mondo ideale, senza attriti e con efficienze del 100%, l’energia spesa per far salire un certo carico di un piano sarebbe la stessa recuperata a farlo scendere per lo stesso dislivello. In questo mondo fantastico il consumo per muovere l’ascensore sarebbe zero (ma un mondo senza attriti non permetterebbe neanche al cavo di acciaio di aderire alla carrucola dell’argano…). Ovviamente la realtà è molto meno rosea, anche se una riduzione come quella stimata è in un certo senso sorprendente.  
Se il sistema non ha recupero di energia, questo dissiperà in calore di frenatura l’energia che non viene altrimenti assorbita.

**Quanto incide**, quindi, nel bilancio annuale di una persona, **la scelta di andare a piedi** piuttosto che in ascensore? Ipotizzando di abitare al terzo piano e di fare in media due viaggi (su \+ giù) al giorno, si hanno circa 700 tra salite e discese in un anno. Per le sole salite si ha quindi 700 \* 3 \* 0.971 Wh, **ovvero 2.04 kWh.** Se si ha la fortuna di avere un impianto moderno rigenerativo, questo **si riduce a** **1.18 kWh.** Per le discese, di nuovo tutto dipende se l’ascensore ha il recupero rigenerativo o no: nel primo caso conviene quasi prendere l’ascensore, per restituire un po’ di energia all’impianto (e preservare un po’ le nostre articolazioni). Senza rigenerazione il non utilizzo – ovvero andare a piedi – è probabilmente la scelta più conservativa.

Va ricordato tuttavia che la maggior parte dell’**energia consumata da un ascensore in un anno**, che può raggiungere [fino all’80% del totale](https://www.researchgate.net/publication/270575653_Energy_Efficient_Elevators_and_Escalators), **è di norma relativa al consumo dell’ascensore inutilizzato**, la maggior parte per la sua illuminazione.
    
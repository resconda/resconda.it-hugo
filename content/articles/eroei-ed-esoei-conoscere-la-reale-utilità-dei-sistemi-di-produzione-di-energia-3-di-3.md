---
title: "EROEI ed ESOEI: conoscere la reale utilità dei sistemi di produzione di energia (3 di 3)"
date: 2026-11-10
tags:
- EROEI
- fonti rinnovabili
- idroelettrico
- elettricità
- eolico
- fotovoltaico
- batterie
- Accumulo
- società
summary: |
  I sistemi eolici o fotovoltaici per sostituire i combustibili fossili nella produzione di elettricità devono essere accompagnati da sistemi di accumulo, per immagazzinare l’energia generata in eccesso e restituirla quando manca il vento o il sole. Quanto pesa sul loro rendimento reale?
cover_image:
 src: assets/post-img/ESOEI_boehja
# caption: 
classes:
- kWh
---

Questa è la terza pillola che dedichiamo a questo tema. Ti invitiamo a leggere prima [l’articolo sull’EROEI e le forme della società](/articles/eroei-come-e-perch%C3%A9-lenergia-determina-le-forme-della-societ%C3%A0-e-non-viceversa/) e poi [quello sull’utilità reale dei sistemi di produzione di energia](/articles/eroei-conoscere-la-reale-utilit%C3%A0-dei-sistemi-di-produzione-di-energia/) (non possiamo ripetere sempre le stesse cose, mica siamo a scuola).

***Breve riassunto delle puntate precedenti:***

*L’EROEI rappresenta l’utilità sistemica reale dei sistemi di produzione (trasformazione) di energia. Tra questi, quelli che sfruttano le fonti rinnovabili (principalmente sole e vento) sono per natura intermittenti: per garantire un’erogazione adeguata alla domanda serve quindi un sistema di stoccaggio. La domanda, a sua volta, è il prodotto dell’attuale sistema socio-economico (che non vogliamo cambiare, perché è scomodo…). Anche il sistema di stoccaggio ha un suo “indicatore fisico di utilità sistemica”, l’ESOEI (Energy Stored On Energy Invested), e per una valutazione complessiva occorre “accoppiare” l’EROEI dei sistemi di produzione con l’ESOEI dei relativi sistemi di accumulo.*

Purtroppo l’ESOEI, essendo poco conosciuto, è anche poco studiato: ci sono poche fonti attendibili al riguardo (per dire: su Wikipedia si trovano **valori che divergono fino al 300%**). Nel [paper scientifico più citato](https://www.sciencedirect.com/science/article/abs/pii/S0196890404002407) l’ESOEI delle batterie agli ioni di litio è stimato tra 6,9 e 8,6; per una batteria al piombo, metà di ogni kWh restituito serve a ripagare il debito di produzione; una batteria al nichel-cadmio, infine, contiene più energia incorporata di quanta ne restituirà nella sua vita.

Sono valori nettamente più bassi di quelli che la divulgazione attribuisce spesso alle batterie ([su Wikipedia](https://en.wikipedia.org/wiki/Energy_return_on_investment) l’ESOEI delle batterie al litio-ione è indicato in 32). Lo studio, però, è del 2005 e in oltre vent’anni il settore ha certamente fatto progressi significativi, quindi i dati vanno aggiornati (qui i valori indicati nello studio).

{{< tablecaption caption="Valori ESOEI per batterie prodotte con materiali vergini / materiali riciclati">}}

| Materiale  | ESOEI |
| :---- | :---- |
| Polisolfuro-bromo (PSB) | 9,3 / 12,7 |
| Ioni di litio | 6,9 / 8,6 |
| Sodio-zolfo | 4,9 / 7,7 |
| Zinco-bromo | 2,7 / 5,3 |
| Vanadio-redox a flusso | 2,6 / 3,4 |
| Piombo-acido | 2,0 / 3,5 |
| Nichel-idruri metallici | 0,6 / 0,8 |
| Nichel-cadmio | 0,3 / 0,3 |

{{</tablecaption>}}

Per le batterie elettrochimiche il calcolo si ottiene, in teoria, con una formula semplice:

\[
  ESOEI = \frac{N \, P \, \rho}{\epsilon}
\]
dove
- \(N\) sono i cicli di vita
- \(P\) è la profondità di scarica
- \(\rho\) è il rendimenti di andata e ritorno
- \(\epsilon\) è l'energia incorporata per kWh di capacità


Per esempio, una batteria da 1 kWh che fa 4.000 cicli, scaricata al 90% con un rendimento del 90% sul ciclo, restituisce 3.240 kWh nella vita; se per produrla sono serviti 519 kWh di energia primaria, l’ESOEI è circa 6,2.

Possiamo provare a stimare l’ESOEI partendo dal dato di 42,5 kWh necessari per realizzare 1 kg di batterie agli ioni di litio ([Fonte 1](https://www.sciencedirect.com/science/article/abs/pii/S2352152X21008926) – [Fonte 2](https://www.sciencedirect.com/science/article/pii/S1364032124005860)). Se questa è l’energia necessaria a realizzare quella che oggi sembra essere la batteria più performante, quella al litio-ferro-fosfato (LiFePO4), con una densità energetica (energia accumulabile per kg di batteria) variabile tra 90 e 160 Wh/kg e un numero di cicli di ricarica variabile tra 2.500 e 8.000 (essenzialmente in funzione delle condizioni d’uso, profondità della scarica, temperature, ecc.), **l’ESOEI delle batterie LiFePO4 può essere stimato in un valore compreso tra 5 e 30** (eh… una bella forbice, ma tant’è).

In [questo studio](https://www.researchgate.net/publication/378609703_Life_cycle_assessment_of_a_LiFePO4_cylindrical_battery) l’energia necessaria per produrre una batteria LiFePO4 (tipo 18650: quelle comunemente usate per realizzare le batterie di elettroutensili, monopattini, biciclette, ecc.) è stimata in 4,85 kWh, con una capacità di 7,47 Wh. Con questi dati l’ESOEI risulta, a seconda del numero di cicli, compreso tra 4 e 12\.

Occorre inoltre considerare tre aspetti aggiuntivi:

* I valori indicati sono relativi alla singola cella: il pacco batteria, il sistema di gestione e raffreddamento, l’inverter e l’installazione aggiungono energia incorporata, quindi l’ESOEI del sistema completo è più basso.  
* Non si considera il degrado di capacità nel tempo, per cui l’energia realmente restituita è inferiore al prodotto cicli × scarica × rendimento.  
* L’energia incorporata è energia primaria, mentre quella restituita è elettricità. Se le due grandezze fossero confrontate nella stessa unità i valori salirebbero: su questo punto i numeri sono quindi prudenziali, ma il fattore in gioco è grande quanto le altre incertezze.

Da notare che anche la migliore tra le batterie chimiche di uso comune, il litio-ione, restituisce un ordine di grandezza in meno rispetto a un bacino di pompaggio. La ragione è semplice: pompare acqua a monte richiede impianti civili ingombranti ma energeticamente “poveri” da costruire (calcestruzzo, scavi, turbine) e che hanno una vita molto lunga, mentre una batteria richiede materiali — litio, cobalto, nichel, elettroliti — la cui estrazione e lavorazione hanno un costo energetico proporzionalmente molto più alto rispetto all’energia che la batteria stessa restituirà nella sua vita utile.

Le batterie sono tuttavia necessarie per applicazioni ad alta potenza, risposta rapida e ingombro contenuto. Prendiamo l’esempio dell’auto elettrica: installare un impianto di pompaggio idroelettrico sul tetto della macchina sarebbe – oltre che tecnicamente complesso e buffo – certamente molto costoso dal punto di vista energetico.

Per applicazioni specifiche, una tecnologia di accumulo può essere valida indipendentemente dal suo ESOEI: per esempio, le auto a motore a scoppio – anche le più costose e sofisticate – impiegano ancora oggi le tradizionali batterie al piombo-acido, che hanno un ESOEI molto basso. Ma quando gli accumuli diventano un fattore determinante nell’assicurare al sistema socio-economico globale energia a elevato EROEI medio, in un quadro di transizione verso le fonti rinnovabili, l’ESOEI diventa decisivo.

Eolico e fotovoltaico possono avere EROEI piuttosto alti (superiori a 10), ma aggiungendo il costo energetico dei sistemi di accumulo il quadro cambia sensibilmente. Secondo [questo studio](https://www.sciencedirect.com/science/article/abs/pii/S0360544213000492), l’EROEI dell’eolico crolla da circa 16 a circa 4 quando si aggiunge lo storage necessario a renderlo dispacciabile: un valore ben al di sotto di quanto serve a sostenere una società industriale complessa (12-13 secondo Hall).

La conclusione è che per le batterie al litio di oggi l’ordine di grandezza dell’ESOEI è 5–15, con un campo plausibile ancora più ampio: da meno di 2 a quasi 30, a seconda di chimica, vita utile e perimetro scelto. Ancora **troppo ampio per poter disegnare scenari attendibili** sull’utilità sistemica dei sistemi di generazione da fonte rinnovabile accoppiati a sistemi di accumulo.

In attesa di un consolidamento tecnologico e di una forbice di valori meno ampia in letteratura (se qualcuno ha dati diversi, ce li segnali!), possiamo comunque – a titolo precauzionale e per formulare ipotesi di scenario – cercare di gestire la variabilità della produzione da fonti rinnovabili **anche dal lato della domanda di energia**, non solo da quello dell’offerta.
    
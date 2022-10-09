---
## Important: If this is a draft, next line should NOT begin with #
draft: false
title: Il costo energetico delle operazioni militari
date: 2022-03-12
## below are user-defined parameters (lower case keys recommended)
cover_image: /assets/post-img/ua_russian_convoy_satellite # optional
tags:
  - ordini di grandezza
  - energia
  - fossile
math: true
summary: |
  10 milioni di kWh (10 GWh) è l'energia dissipata nel Marzo 2022 per portare dalla Russia in Ucraina un convoglio militare lungo 65 km..
---

Il giorno 1 Marzo l'esercito Russo ha intensificato le manovre in
Ucraina mandando (tra le numerose operazioni) un _convoy_ che ha
fatto notizia per la sua impressionante mole.


Le notizie parlano di un _convoy_ di mezzi
militari **lungo 65km**, composto principalmente da camion e mezzi corazzati.

Il convoy è partito dal confine bielorusso, diretto verso
Kiev, per una **distanza di circa 200km**.

![Il percorso del convoy, pi&ugrave; o meno](assets/post-img/ua_convoy_path_satellite)

Come esercizio di consapevolezza proviamo a stimare l'ordine di
grandezza in termini energetici di questa manovra.

Abbiamo usato la lunghezza del _convoy_ per stimare il numero di
veicoli coinvolti.

Da varie foto satellitari pubblicate in queste ore si può notare la
grande quantità di mezzi coinvolti, spesso in più di una fila.

Non esageriamo quindi se considerassimo 4 veicoli ogni 50m di _convoy_
(anzi, probabilmente sottostimiamo)

$$
\frac{65000 m}{4 \cdot 50m} = 5200
$$

Questo numero di veicoli militari quindi si &egrave; mosso per i 200km che li separavano da Kiev.

Approssimando il consumo medio di questi mezzi, (camion carichi, e mezzi
corazzati) anche qui non esageriamo (o al massimo sottostimiamo) un
consumo medio di $1L/km$. \[FONTE\]

Circa 5000 mezzi per 200km fanno 1.000.000 L di Diesel.

1 Litro di Diesel ha un [valore energetico di circa 38 MJ](https://www.appropedia.org/Energy_content_of_fuels), che
trasformato in kWh fa

$$
38 \cdot 10^6 Ws = 38 \cdot 10^3 kW \cdot (1/3600) h  \simeq 10.5 kWh.
$$

ovvero **10 kWh per ogni Litro di Diesel, per ogni km percorso** dal _convoy_.

Moltiplicando per i veicoli stimati prima e per la lunghezza del percorso, otteniamo

$$ 10.5 \cdot 1.000.000 = 10.500.000 kWh = 10.500 MWh = 10 GWh$$

che &egrave; **l'energia totale spesa dalla carovana solo di carburante!!!**

Per avere un confronto tangibile, un'**utenza media Italiana ha un consumo elettrico annuo
di circa 2700kWh** **(ARERA? FONTEEEEE)**.

Considerando quindi l'utenza media, parliamo di un'energia **sufficiente ad alimentare circa 3700 abitazioni in  un intero anno**.  
Energia invece divorata **in una sola mattina** dal _convoy_ considerato.


<!--
  created 2022-03-12 15:53:29.019369 +0100 CET m=+0.045972137
-->
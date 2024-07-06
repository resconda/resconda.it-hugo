---
## Important: If this is a draft, next line should NOT begin with #
# draft: true
title: L'energia dei temporali
date: 2024-07-06
## below are user-defined parameters (lower case keys recommended)
summary: |
  Con l'arrivo della bella stagione, i temporali ritornano a far parte degli spettacoli della natura a cui assistiamo quasi quotidianamente. Abbiamo tutti un'idea più o meno vaga della potenza contenuta in questo tipo di fenomeno, ma quanta energia c'è effettivamente al suo interno?
cover_image: # optional
  src: assets/post-img/Lightning__283762193048_29_oegskz
#   caption: "caption string"
tags:
  - fulmini
  - vento
  - energia
classes: # this is a list but one energy class should be set
  # - kWh
  - MWh
  # - GWh
  # - TWh
---

Ci sono almeno due forme di energia contenute in un temporale: quella cinetica del vento, che nell'area interessata aumenta tipicamente e raggiunge velocità considerevoli a seconda delle dimensioni del fronte temporalesco, e quella elettrostatica liberata dai lampi, le scariche da nuvola a nuvola, e dai fulmini, le scariche a terra.

Facciamo un esperimento concettuale: ipotizziamo un temporale che agisce per trenta minuti su una zona di 3x3 \( \textrm{km}^2 \), con un vento medio di 60 km/h (un temporale relativamente forte). Dentro questa perturbazione, ipotizziamo esserci in media 3 scariche a terra al minuto.

Partiamo da quello che sembra intuitivamente essere "energeticamente" più interessante: il fulmine.

Le fonti online danno un'indicazione di media dell'**energia contenuta in un fulmine**: siamo dai 5 ai 7 GJ (miliardi di joule). Il valore intermedio (6 GJ), nella nostra unità di misura standard, si traduce in **1.67 MWh**. Non tantissimo, se pensiamo che corrisponde all'energia contenuta in 120 litri di benzina. Nel nostro modello di temporale, quindi, avremo un totale di energia scaricata, nella mezz'ora considerata, di 150 MWh.

Secondo [wikipedia](https://en.wikipedia.org/wiki/Lightning#Distribution,_frequency_and_extent), **in un anno nel mondo** ci sono 1.4 miliardi di scariche tra fulmini e lampi, di cui solo un quarto sono scariche a terra (le uniche che potremmo ragionevolmente pensare di catturare). Facendo i conticini, si tratta di circa **580 TWh di energia scaricata sulla Terra**, ovvero **poco più di un giorno dell'attuale fabbisogno energetico mondiale** (18 TW).

Possiamo dire che già solo questo spiega perché finora non abbiamo visto nessun progetto concreto di impianto di cattura fulmini. Evitiamo pertanto di approfondire qui le difficoltà ingegneristiche e tecnologiche necessarie a catturare questa (peraltro modesta) quantità di energia, ma concentrata in un tempo che può essere corto fino a pochi millisecondi, con potenze che possono quindi raggiungere l'ordine delle decine di milioni di terawatt (per confronto, la potenza solare che arriva sulla terra è 89000 terawatt).

In [questo articolo](https://www.independent.co.uk/news/science/why-can-t-we-extract-electricity-from-lightning-10162498.html) dell'Independent, un'idea ben sintetizzata dei costi necessari per mettere in piedi una simile tecnologia.

Veniamo adesso all'altra fetta di energia liberata dal fenomeno temporalesco: il vento.

Le pale eoliche hanno dei limiti massimi (e minimi) di velocità del vento per funzionare, oltre ai quali entrano in modalità di sicurezza, abbattendo le pale che smettono di fare portanza e quindi di creare la coppia necessaria alla movimentazione del rotore. Le migliori turbine riescono a lavorare fino a venti di 90 km/h, valore che corrisponde alla soglia dei *severe thunderstorm*, i temporali violenti, dato dalla National Weather Service statunitense. La stessa riporta che solo il 10% delle tempeste americane rientra in questa classificazione. Possiamo assumere che questi valori siano abbastanza omogenei su tutto il globo.

In buona parte dei casi, quindi, un impianto eolico colpito da un temporale può giovare dell'incremento della velocità media dei venti per produrre più energia.

Come abbiamo fatto per i fulmini, limitiamoci a "fantasticare" sull'energia massima estraibile dal fronte di vento del nostro temporale, senza considerazioni sull'efficienza dell'impianto eolico, il tipo di pale e rotori, etc. Prendendo 250 metri di altezza nell'area considerata, e applicando la potenza data [legge di Betz](https://it.wikipedia.org/wiki/Legge_di_Betz)

\[ P = \frac{1}{2}\, \rho\, S\, v^3 \]

con densità dell'aria \( \rho = 1.204\, \textrm{kg}/\textrm{m}^3 \), fronte d'aria di superficie \( S = 3 \times 0.25\, \textrm{km}^2 \) e velocità \( v = 60\, \textrm{km}/\textrm{h} \), per il tempo stimato, **otteniamo circa 1 TWh**.

Le nostre stime sono sicuramente molto grossolane e le ipotesi fatte molto "audaci", ma possiamo essere abbastanza fiduciosi sul fatto che **l'energia elettrostatica scaricata dai fulmini in un temporale sia enormemente più bassa di quella portata dal vento generato nello stesso contesto, di almeno 3 ordini di grandezza** (contrariamente a quanto l'intuizione iniziale ci suggeriva)**.**

<!--
  created 2024-07-06 11:55:16.03136 +0200 CEST m=+0.229710584
-->
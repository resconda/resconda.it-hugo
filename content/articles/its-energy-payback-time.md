---
title: It's (Energy) payback time
date: 2024-05-08
summary: |
  Anche un sistema di produzione di energia da fonte rinnovabile, come una turbina eolica, comporta un investimento energetico (quindi ha un impatto ambientale diretto). Ma in quanto tempo può ripagarlo?
cover_image: # optional
  src: assets/post-img/Turbina_Open_Image_po4t34
#   caption: "caption string"
classes:
  - GWh
tags:
  - Rinnovabili
  - Eolico
  - Turbine
  - Capacity Factor
---

Costruire una turbina eolica, come qualsiasi costruzione o oggetto - richiede energia: per estrarre e lavorare i materiali di cui è fatta, realizzare le componenti utilizzate, trasportare il tutto, nonché per il suo assemblaggio e manutenzione.

Nel caso della realizzazione di una turbina eolica l'obiettivo è ovviamente "spendere" meno energia di quella che l'impianto stesso è in grado di produrre nel corso della sua vita, ma soprattutto di cercare, grazie alla sua produzione, di "ripagare" l'energia spesa nella sua realizzazione nel più breve tempo possibile.

Esattamente come per i "normali" investimenti economici, **il cosiddetto *payback time* rappresenta il "*ritorno sull'investimento"*, che determina il *breakeven*, ovvero il momento in cui l'investimento è completamente ripagato e inizia "l'attivo"**.  
[*Uno*](https://www.mdpi.com/2071-1050/10/6/2022) dei numerosi paper scientifici che hanno affrontato la questione, quantifica in **poco più di 6 mesi il tempo medio di *payback.***

In questo post proviamo a fare un esercizio di calcolo di *payback* energetico di una turbina eolica da 2 MW di potenza nominale. Di seguito un inventario base dei materiali necessari per la sua costruzione.

{{< tablecaption caption="Inventario materiali di costruzione di una turbina eolica" >}}
| **Componente** | **Massa (kg)** | **Materiale** | **CED (MJ/kg)** | **CED (kWh/kg)** | **CED TOT (MWh)** |
| -------------- | -------------- | ------------- | --------------- | ---------------- | ----------------- |
| Rotore         | 40.000         | Composito     | 145,0           | 40,28            | 1.611             |
| Hub            | 8.000          | Rame          | 70,6            | 19,61            | 157               |
|                | 8.000          | Composito     | 145,0           | 40,28            | 322               |
|                | 64.000         | Acciaio       | 35,0            | 9,72             | 622               |
| Torre          | 200.000        | Acciaio       | 35,0            | 9,72             | 1.945             |
| Fondamenta     | 1.696.800      | Calcestruzzo  | 1,5             | 0,42             | 707               |
|                | 62.850         | Acciaio       | 35,0            | 9,72             | 611               |
{{</tablecaption>}}

Con le dovute approssimazioni possiamo quindi stimare in circa 2.000 le tonnellate dei materiali che, moltiplicate per i rispettivi valori di energia incorporata, hanno un costo energetico di 5.970 MWh. Aggiungendo gli e-costi di trasporto materiali, assemblaggio, O&M dell'impianto e smantellamento a fine vita, la CED della nostra turbina eolica arriva a ca. 8.800 MWh.

La turbina può produrre 2 MWh per ogni ora di funzionamento, in condizioni ideali (con un vento costante intorno ai 13 m/s, cioè circa 50 kmh di velocità)[^1]

Purtroppo, le condizioni ideali sono saltuarie e ciò che conta è **il cosiddetto C*apacity Factor (CF)*, cioè la percentuale di tempo in cui il sistema lavora alla potenza nominale**. Per l'eolico il CF può normalmente variare tra il 20 e il 45 per cento annuo, secondo il luogo in cui è posizionato.

[Qui](https://windeurope.org/about-wind/daily-wind/capacity-factors) un sito che raccoglie i dati di produzione quotidiana dell'eolico europeo.

Per semplicità di calcolo prendiamo un valore di CF del 26%, un valore standard per turbine eoliche posizionate in luoghi ventosi (è la media di CF delle turbine operanti nel Regno Unito...).\
In un anno ci sono 8760 ore, con un CF del 26% la nostra turbina da 2MW in un anno produce 4.555 MWh (2 \* 8760 \* 0,26).

**Il tempo di *payback* per questa tecnologia nel nostro caso è quindi 1,93 anni: dopo circa due anni di funzionamento, la turbina eolica ha restituito l'energia necessaria alla sua realizzazione.**

Questo modo di quantificare l'energia netta disponibile prodotta da un sistema di produzione di energia (quale esso sia), quindi la sua utilità ed impatto sulla società, il cd. "EROEI" (Energy Return on Energy Investment), è stato introdotto circa 40 anni fa da **Charles A.S. Hall che -- udite, udite! -- avremo ospite in videoconferenza** nell'ambito di un [evento](/articles/eventi-resconda-22-maggio-2024) organizzato da Resconda il 5 Giugno 2024 a Torino (non puoi mancare!)

I numeri sono più alti della stima fatta dai ricercatori citati sopra, ma non cambia la sostanza e soprattutto servono ad assolvere ad una delle mission di Resconda: impariamo a riconoscere gli ordini di grandezza e le problematiche in gioco e saremo già degli eruditi del mondo dell'energia.

[^1]: <https://it.wind-turbine-models.com/turbines/16-vestas-v90>
<!--
  created 2024-05-08 18:41:08.790909 +0200 CEST m=+0.065656542
-->
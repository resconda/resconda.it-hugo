---
## Important: If this is a draft, next line should NOT begin with #
title: La Pasta Alla Parisi
date: 2023-03-02
## below are user-defined parameters (lower case keys recommended)
summary: | # leave blank if no summary is provided
  Quanta energia serve a cucinare un piatto di pasta? E quanta se ne risparmia seguendo i suggerimenti del premio Nobel per la Fisica Giorgio Parisi?
cover_image: assets/post-img/cooking_pasta_vp5myd # optional
classes:
  - Wh
tags:
  - cucina
  - efficienza energetica
---

Vediamo in generale quanta energia serve a cucinare un piatto di pasta in modo tradizionale. Introduciamo poi i suggerimenti di Giorgio Parisi [Nobel per la fisica 2021](https://www.nobelprize.org/prizes/physics/2021/parisi/facts/) e vediamo quanto possiamo risparmiare.

In un prossimo post proveremo a passare dal classico fornello a gas a un piano a induzione, facendo anche qui le dovute considerazioni.

## La pasta: metodo tradizionale

Scomponiamo la creazione di un piatto di pasta in due fasi: bollitura dell’acqua (B) e cottura della pasta (C)

Per un piatto di pasta portiamo a bollore 2 litri di acqua. Per 80-100 g di pasta sono probabilmente sovrabbondanti, ma consideriamo che in molti casi le persone non prestano molta attenzione alla quantità di acqua versata in pentola e crediamo che sia molto spesso ben oltre il necessario (sarebbe interessante fare una stima).

Si potrebbe calcolare l’energia necessaria a scaldare questa massa d’acqua da 20 a 100 °C, ma sarebbe poi difficile stimare l’efficienza della fiamma del fornello nel trasferire il calore all’acqua rispetto a disperderlo nell’aria circostante.
Facciamo invece un conto a spanne, come piace a noi, basato sull'esperienza personale di alcuni rescondiani: abbiamo messo questa pentola da 2L su fornello grande, aperto al massimo, vedendo che ci mette circa 5 minuti per arrivare a bollore. Usando la buona [Wikipedia](https://en.wikipedia.org/wiki/Gas_stove) (ma anche altri siti danno dati analoghi), vediamo che il fornello grande consuma 6kW in termini di energia del gas (nel paragrafo “Burner heat” specifica _is directly based on the gas consumption rather than heat absorbed by pans_).

Quindi, l’energia di bollitura

{{< math >}}
E_{B} = P \Delta t = 6\ \textrm{kW}\ 1/12\ \textrm{h} = 0.5\ \textrm{kWh}
{{< /math >}}

Passiamo alla cottura.

Vogliamo essere ottimiste e pensare che tutti gli italiani fanno come noi e, dopo raggiunto il bollore, spostano la pentola sul fuoco piccolo messo al minimo e calano la pasta (con il fornello piccolo si puo' riuscire a tenere anche il coperchio senza che tracimi la schiuma di bollitura).  
Se cosi' fosse, passiamo a una potenza di _1 kW or less_ (sempre dalla pagina wiki). Ma forse questa potenza nominale non e' quella del getto minimo.  
Abbiamo cercato un confronto facendo una prova in casa: fornello piccolo al minimo, per un minuto, abbiamo visto il contatore fare uno “scatto” di 0.001 smc. Poiche' 1 smc → 10.69 kWh, significa che in un minuto abbiamo consumato 10.69 Wh, quindi potenza media {{< imath escape="true" >}}P = 10.69 Wh / 1/60 h = 641 W{{< /imath >}}. Valore che rispecchia il “un po' meno di 1kW. 
Possiamo tenere 650W come riferimento.

La pasta cuoce mediamente per 10 minuti, quindi

{{< math >}}
E_{C} = P \Delta t = 0.65\ \textrm{kW}\ 1/6\ \textrm{h} \simeq 0.11\ \textrm{kWh}
{{< /math >}}

Possiamo pertanto dire che: 
>**per cuocere un piatto di pasta in modo tradizionale su fornello a gas si consumano ALMENO 0.61 kWh**

## La rivoluzione Parisi

Abbiamo letto di questa sua trovata su molti giornali/siti: si tratta di calare la pasta e contemporaneamente spegnere il gas, facendola cuocere di solo calore residuo, ben chiusa con il coperchio.

Quindi, se prima abbiamo fatto i conti giusti: **andremmo a risparmiare quei 0.11 kWh della cottura, pari al 18% del totale dell’energia necessaria con il metodo “tradizionale”**

## E senza gas?

Come cambiano le grandezze energetiche in gioco quando al posto dei fornelli usiamo le piastre a induzione? Rimandiamo questi conti a un prossimo episodio, ma possiamo fare una piccola anticipazione su come cambia il bilancio quando entra in gioco l'elettrico. Riportiamo i dati misurati, tramite una presa con misurazione di potenza/energia, facendo bollire gli stessi 2 litri d'acqua dentro un bollitore: abbiamo osservato che sono necessari 0.192 kWh, abbondantemente meno della met&agrave; della stima che abbiamo fatto per il fornello a gas.

<!--
  created 2023-03-02 12:00:17.144801 +0100 CET m=+0.110160376
-->
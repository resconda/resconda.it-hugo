---
title: Vado a farmi una doccia calda
draft: false
date: 2022-11-03
## below are user-defined parameters (lower case keys recommended)
summary: |
  Quanta energia si usa per farsi una doccia calda? Diciamo che fa 3 kWh consumati, per farla breve. Anzi no, di più...
cover_image:
  src: assets/post-img/acqua-troppo-calda_t4hs1h
classes:
  - kWh
tags:
  - energia
  - fisica
---

Quanta energia si usa per farsi una doccia calda? Diciamo che fa 3 kWh consumati, per farla breve, anzi no, di più, perché nel calcolo è stata considerata solo l'energia spesa per scaldare l'acqua con il gas e non quella spesa per estrarlo, trasportarlo, portarlo fino a casa...e neppure quella per raccogliere e depurare l'acqua e portarla fino in bagno, per produrre e installare la rubinetteria, le piastrelle ed il box doccia...Insomma probabilmente anche parecchio di più! (quando avremo un dato più raffinato non mancheremo di postarlo...)

Se hai visto [questo filmato](https://youtu.be/ZzbHGSaMjH0) ti dico che ci vorrebbero 143 "Robert" per farti fare una doccia calda...

{{< details header="Abbiamo fatto i conti" >}}

Tranquilli, niente di pi&ugrave; di un po' di termodinamica del liceo.

Alcune stime sono molto soggettive (es. durata doccia, temperatura acqua alla fonte e di uscita, ...), ma &egrave; giusto per avere un ordine di grandezza:

- temperatura dell'acqua della doccia: {{< imath escape="true" >}}T_c = 42\ ^\circ C{{< /imath >}}
- temperatura dell'acqua da scaldare: {{< imath escape="true" >}}T_f = 10\ ^\circ C{{< /imath >}}
- flusso doccia: {{< imath escape="true" >}}\Phi = 10\ \textrm{L}/\textrm{min}{{< /imath >}}
- durata doccia: {{< imath escape="true" >}}\Theta = 5\ \textrm{min}{{< /imath >}}
- rendimento caldaia[^1]: {{< imath escape="true" >}}\rho = 65\%{{< /imath >}}
- potere calorifico inferiore del metano: {{< imath escape="true" >}}\delta = 50\ \textrm{MJ}/\textrm{kg}{{< /imath >}}

Da cui ricaviamo:
- volume da scaldare: {{< imath escape="true" >}}V = \Phi \ \Theta = 50\ \textrm{L}{{< /imath >}}
- massa da scaldare: {{< imath escape="true" >}}50\ \textrm{kg}{{< /imath >}}
- differenza di temperatura: {{< imath escape="true" >}}\Delta T = 32\ ^\circ C{{< /imath >}}

L'energia per scaldare una massa di materia
{{< math >}}
Q = m\ c_{sp}\ \Delta T.
{{< /math >}}

**L'energia spesa dalla caldaia** dipender&agrave; innanzitutto dalla sua efficienza (pi&ugrave; altre perdite che qui trascuriamo)
{{< math >}}
E = Q/\rho = 10.3 MJ \equiv 2.86\ \textrm{kWh}.
{{< /math >}}

Dal potere calorifico possiamo ricavare la **massa di metano** necessaria a produrre questa energia
{{< math >}}
m = E/\delta = 0.206\ \textrm{kg}.
{{< /math >}}

Per tradurla in una quantit&agrave; familiare a tutte, i metri cubi standard (*smc*), occorre passare al capitolo "legge dei gas"
{{< math >}}
p\ V = n\ R\ T
{{< /math >}}
dove:
- pressione standard: {{< imath escape="true" >}}p = 1.013\cdot 10^5\ \textrm{Pa}{{< /imath >}}
- temperatura standard: {{< imath escape="true" >}}T = 15\ ^\circ C \equiv 290\ K{{< /imath >}}
- costante dei gas: {{< imath escape="true" >}}R = 8.314\ \textrm{J}/\textrm{mol K}{{< /imath >}}
- massa molare metano: {{< imath escape="true" >}}M = 16.04\ \textrm{g}/\textrm{mol}{{< /imath >}}
- numero di moli: {{< imath escape="true" >}}n = m/M = 0.013\ \textrm{mol}{{< /imath >}}

che ci permette di ricavare inversamente il volume:
{{< math >}}
V = \frac{m\ R\ T}{p\ M} = 0.03265\ m^3 (\textit{smc})
{{< /math >}}


[^1]: stima presa da [FAQ](https://www.amphiro.com/en/faq) sito Amphiro (voce "How accurate is the displayed energy consumption")

{{< /details >}}
<!--
  created 2022-11-03 08:14:13.881798 +0100 CET m=+0.042941335
-->
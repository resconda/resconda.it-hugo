# ResConDA website

Sito creato con il [generatore statico Hugo](https://gohugo.io/)

## Creare nuovi articoli

Creare un nuovo file nella cartella `contents/articles`. 
Il nome del file **non deve contenere** spazi o caratteri speciali. L'ideale e solo lettere (minuscole), numeri, dash '-'.  
Il formato preferenziale e' [Markdown](https://github.com/markdown-it/markdown-it). Per una rapida guida alla sintassi, si veda l'esempio [markdown-experiments.md](content/articles/markdown-experiments.md).

In Hugo le pagine e gli articoli sono generate a partire da file con una sezione di intestazione, un header YAML, delimitate da '---'. Il contenuto del header e':
```
--- # tre trattini iniziali, importanti
# quello che c'e' dopo gli hash '#' viene ignorato, come commento

title: "titolo dell'articolo" # virgolette opzionali ma obbligatorie se il titolo contiene certi caratteri, ad es. ':'
subtitle: "opzionale"
date: aaaa-mm-gg
draft: true # per gli editor meno esperti, meglio mettere il valore true e far fare una revisione
tags: # e' in formato array (lista), quindi righe con un '- ' iniziale e un tag per ogni riga
  - tag1
  - tag2
  - tagN
cover_image: /path-to-image # opzionale
--- # tre trattini di chiusura
```

### Immagini

Si e' scelto di non versionare le immagini del sito qui sul repository Git, ma di utilizzare invece [Cloudinary](https://cloudinary.com/).  
Per inserire immagini negli articoli o nelle pagine del sito, occorre quindi prima caricarle su cloudinary, copiare il percorso relativo e usarlo come riferimento nel codice dell'articolo.

## Heroku deploy

istruzioni qui
Provo con Heroku-Hugo-buildpack di Joantolos
torno a ropherz
https://github.com/roperzh/heroku-buildpack-hugo#v0.23

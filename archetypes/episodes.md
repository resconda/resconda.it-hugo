---
author: Marcello Corongiu
title: "Titolo"
layout: episode
eptype: full
number: {{ .Name | strings.TrimLeft "0" }} # episode_number
duration: "[HH:]MM:SS" # episode duration
date: {{ .Date }} # when to publish
short_description: |
	Short blurb about this episode.
mp3:
    asset_link: "foodieflashback_XX.mp3" # cloudinary name of your MP3 file, 
    length: 112109285 # size in bytes, e.g. 
url: /episodes/NUMBER
tags: []
image: 
  url: images/image_name
  alt: "Logo ResConDA"
draft: true # (depending on whether it's ready to be published)
---

<Content/show notes/links>
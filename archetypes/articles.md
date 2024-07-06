---
## Important: If this is a draft, next line should NOT begin with #
# draft: true
title: {{ replace .Name "-" " " | title }}
date: {{ dateFormat "2006-01-02" .Date }}
## below are user-defined parameters (lower case keys recommended)
summary: |
  This will show in article list, as a preview
# cover_image: # optional
#   src: assets/post-img/img_name
#   caption: "caption string"
tags:
  - tag1
  - tag2
classes: # this is a list but one energy class should be set
  - kWh
  # - MWh
  # - GWh
  # - TWh
---


<!--
  created {{ now }}
-->
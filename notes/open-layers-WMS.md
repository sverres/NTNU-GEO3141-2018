# WMS-webkart med Open Layers

---

## Web Mercator

Enklest mulige WMS-kart med

- zoom-nivå 0 (hele verden)
- sentrumskoordinat satt til [0,0]

Tilpass dette kartet til din WMS-tjeneste på copernicus. Her er noen tips på veien:

- EPSG-koden for Web Mercator er "EPSG:3857". ESRI bruer en annen kode for Web Mercator - se i getcapabilities-dokumentet for å se denne (koden må ikke nødvendigvis oppgis noe sted, men det kan være greit å vite).
- For å finne riktig sentrumskoordinat for din WMS-tjeneste anbefaler nettstedet [epsg.io](https://epsg.io).
- WMS-tjeneste-url'en for din tjeneste finner du bak knappen OGC services i ArcGIS Server Manager.
- For å lage et getcapabilities-kall legger du til dette til slutt i din WMS-tjeneste-url: `?service=wms&request=getcapabilities`

```javascript
<!--
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="https://openlayers.org/en/v4.6.4/css/ol.css" type="text/css">
  <script src="https://openlayers.org/en/v4.6.4/build/ol-debug.js"></script>
  <style>
    #map {
      width: 800px;
      height: 500px;
      border: solid 1px;
    }
  </style>
</head>

<body>
  <div id="map"></div>
  <script>
    var topo3 = new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: 'http://openwms.statkart.no/skwms1/wms.topo3?',
        params: {
          'LAYERS': 'topo3_WMS',
          'STYLES': 'default'
        },
      })
    });

    var map = new ol.Map({
      layers: [topo3],
      target: 'map',
      view: new ol.View({
        center: [0,0],
        zoom: 0
      })
    });
  </script>
</body>

</html>
-->
```

## UTM sone 32

Lag et eget webkart for din WMS-tjeneste der du kartet vises i UTM-projeksjon.

Se websidene om Open Layers fra GEO3121 (link på ukeplanen) og legg inn data om:

- extent
- projeksjon
- senter-koordinater i UTM-projeksjon




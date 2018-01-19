# WMTS: arbeidsgang for webkart i Open Layers

---

- *(Oppdatert 19.01 med kode som samsvarer med eksemplet som ble vist på forelesning 18.01)*

## Forutsetninger

- WMTS-tjeneste er opprettet fra før.
- Metadata fra WMTS-tjenesten er hentet ut.

## Arbeidsoperasjoner

- Legge inn WMTS-verdier i javascript-mal:
  - url til tjeneste
  - projeksjon (hvis det er noe annet enn Web Mercator)
  - extent for tilematrix
  - resolutions - disse må beregnes ut fra ScaleDenominator
  - zoom-nivåer
  - lagnavn
- Legge til eventuelle WMS-lag


## WMTS-kommuner.js

```javascript
var urlarcgis= 'https://copernicus.hig.no:6443/arcgis/rest/services';
var folder = '/SverreSt';
var servicename = '/kommuner_oppland_v2';
var servicetype = '/MapServer/WMTS?';
var url = urlarcgis + folder + servicename + servicetype;

var layer = 'SverreSt_kommuner_oppland_v2';

var attribution = new ol.Attribution({
  html: 'Kartgrunnlag: <a href="http://kartverket.no">Kartverket</a>'
});

var extent = [
  413293.8390285599, 6667145.701779299, // lower left:  Easting, Northing
  617929.028165083, 6916352.912269401 // upper right: Easting, Northing
];

var extentKartverket = [-2000000, 3500000, 3545984, 9045984];

// Datum og projeksjon: EUREF89, UTM zone 32
var projection = new ol.proj.Projection({
  code: 'EPSG:25832',
  extent: extentKartverket
});

// Oppløsning pr. pixel i meter pr. tileMatrix (zoom-nivå)
var resolutions = [  // = ScaleDenominator * 0.00028
  13.229193125051252, // = 47247.118303754476 * 0.00028
  6.614596562525626, // = 23623.559151877238 * 0.00028
  3.307298281262813, // = 11811.779575938619 * 0.00028
  1.6536491406314064 // = 5905.8897879693095 * 0.00028
];

var matrixSet = 'default028mm'; // standard-verdi for ArcGIS
var matrixIds = [0, 1, 2, 3];

var center = [553040, 6772855]; // Easting, Northing
var zoom = 0;

var kommuner_oppland = new ol.layer.Tile({
  source: new ol.source.WMTS({
    attributions: [attribution],
    url: url,
    layer: layer,
    matrixSet: matrixSet,
    format: 'image/png',
    tileGrid: new ol.tilegrid.WMTS({
      extent: extent,
      resolutions: resolutions,
      matrixIds: matrixIds
    }),
    style: 'default',
  })
});

var topo4 = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'https://openwms.statkart.no/skwms1/wms.topo4.graatone',
    params: {
      'LAYERS': 'topo4graatone',
      'STYLES': 'default'
    },
  })
});

var map = new ol.Map({
  layers: [topo4, kommuner_oppland],
  target: 'map',
  view: new ol.View({
    extent: extent,
    projection: projection,
    center: center,
    resolutions: resolutions,
    zoom: zoom
  })
});
```

## WMTS-kommuner.html

```c
<!--
<!DOCTYPE html>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://openlayers.org/en/v4.6.4/css/ol.css" type="text/css">
  <style>
    #map {
      height: 500px;
      width: 100%;
      border: solid 1px;
    }
  </style>
  <title>Kommuner i Oppland</title>
</head>

<body>

  <div id="map"></div>

  <script src="https://openlayers.org/en/v4.6.4/build/ol-debug.js" type="text/javascript"></script>
  <script src="WMTS-kommuner.js" type="text/javascript"></script>

</body>

</html>
-->
```

## Hvis projeksjonen er noe annet enn Web Mercator

Informasjon om hvilken projeksjon som brukes må legges inn. Open Layers-API'et vil da erstatte standardverdien EPSG:3857 i WMS- og WMTS-kall med det som er lagt inn.


```javascript
// Datum og projeksjon: EUREF89, UTM zone 32
var projection = new ol.proj.Projection({
  code: 'EPSG:25832',
  extent: extentKartverket
});
```

Extent i denne sammenheng kan være en annen extent enn flislagenes extent. F.eks. så kan man bruke Kartverkets standardverdier.

```javascript
var extentKartverket = [-2000000, 3500000, 3545984, 9045984];
```

For at dette skal bli aktivert må projection-variabelen legges inn i det aktuelle view'et (kartvindu):

```javascript
var map = new ol.Map({
  layers: [topo2, fkb],
  target: 'map',
  view: new ol.View({
    projection: projection,   // her! Denne linjen
    center: center,
    resolutions: resolutions,
    zoom: zoom
  })
});
```

Komplett, levende kart med kartfliser fra copernicus:

[Kommuner i Oppland](docs/WMTS-kommuner.html)

# WMTS-eksempel for Lillehammer-kart i UTM sone 32-projeksjon

---

## WMTS.js

```javascript
var urlarcgis= 'http://copernicus.hig.no:6080/arcgis/rest/services';
var folder = '/sverrsti';
var servicename = '/Lillehammer';
var servicetype = '/MapServer/WMTS?';
var url = urlarcgis + folder + servicename + servicetype;

var layer = 'sverrsti_Lillehammer';

var attribution = new ol.Attribution({
  html: 'Kartgrunnlag: <a href="http://kartverket.no">Kartverket</a>'
});

var extentKartverket = [
  -2000000, 3500000, // lower left:  Easting, Northing
  3545984, 9045984 // upper right: Easting, Northing
];

var extentCopernicus = [
  556183.8200,  6766438.2000, // lower left:  Easting, Northing
  592522.8300,  6789942.02 // upper right: Easting, Northing
];

// Datum og projeksjon: EUREF89, UTM zone 32
var projection = new ol.proj.Projection({
  code: 'EPSG:25832',
  extent: extentKartverket
});

// Oppløsning pr. pixel i meter pr. tileMatrix (zoom-nivå)
var resolutions = [  // = ScaleDenominator * 0.00028
  6.614596562525626, // = 23623.559151877238 * 0.00028
  3.968757937515376, // = 14174.135491126344 * 0.00028
  2.6458386250102506, // = 9449.423660750896 * 0.00028
  1.3229193125051253, // = 4724.711830375448 * 0.00028
  0.6614596562525626 // = 2362.355915187724 * 0.00028
];

var matrixSet = 'default028mm'; // standard-verdi for ArcGIS
var matrixIds = [0, 1, 2, 3, 4];

var center = [579327, 6777430]; // Easting, Northing
var zoom = 0;

var fkb = new ol.layer.Tile({
  source: new ol.source.WMTS({
    attributions: [attribution],
    url: url,
    layer: layer,
    matrixSet: matrixSet,
    format: 'image/png',
    tileGrid: new ol.tilegrid.WMTS({
      extent: extentCopernicus,
      resolutions: resolutions,
      matrixIds: matrixIds
    }),
    style: 'default',
  })
});

var topo2 = new ol.layer.Tile({
  extent: extentCopernicus,  // denne linjen kan slettes
  source: new ol.source.TileWMS({
    url: 'http://openwms.statkart.no/skwms1/wms.topo2?',
    params: {
      'LAYERS': 'topo2_WMS',
      'STYLES': 'default'
    }
  })
});

var map = new ol.Map({
  layers: [topo2, fkb],
  target: 'map',
  view: new ol.View({
    projection: projection,
    //extent: extentCopernicus,  // denne linjen kan slettes
    center: center,
    resolutions: resolutions,
    zoom: zoom
  })
});
```

## WMTS.html

```c
<!--
<!DOCTYPE html>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://openlayers.org/en/v3.20.1/css/ol.css" type="text/css">
  <style>
    #map {
      height: 500px;
      width: 100%;
      border: solid 1px;
    }
  </style>
  <title>Lillehammer</title>
</head>

<body>

  <div id="map"></div>

  <script src="http://openlayers.org/en/v3.20.1/build/ol-debug.js" type="text/javascript"></script>
  <script src="wmts.js" type="text/javascript"></script>

</body>

</html>
-->
```
En komplett, og levende side finnes [her](http://sverres.net/GEO3141/Lillehammer/WMTS.html).  
Trykk på *Ctrl + U* for å se koden.

# Open Layers WMS-kart i Web Mercator-projeksjon

---

Eksempel på kart fra copernicus-serveren:

```javascript
<!--
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Kommuner i Oppland</title>
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
    var kommuner_oppland = new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: 'https://copernicus.hig.no:6443/arcgis/services/SverreSt/kommuner_oppland_v2/MapServer/WMSServer?',
        params: {
          'LAYERS': 'kommuner_oppland',
          'STYLES': 'default'
        },
      })
    });

    var map = new ol.Map({
      layers: [kommuner_oppland],
      target: 'map',
      view: new ol.View({
        center: [1111344,8645784],
        zoom: 7
      })
    });
  </script>
</body>

</html>
-->
```

[Fungerende webkart](docs/kommuner_oppland_v2.html) (krever VPN-forbindelse hvis du er utenfor campus).
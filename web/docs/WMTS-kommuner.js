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

// Oppløsning pr. pixel i meter pr. tileMatrix (zoom-niv�)
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
      'LAYERS': 'topo4graatone_WMS',
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
# WMTS: arbeidsgang ved oppretting av tjeneste på ArcGIS Server

---

## Forutsetninger

- WMS-tjeneste er opprettet fra før.

## Arbeidsoperasjoner

1. Hente ut metadata fra WMS-tjeneste
1. Bestemme zoom-nivåer
1. Opprette tjenesten i ArcGIS Manager
1. Administrere tjenesten fra ArcMap
1. Hente ut metadata fra WMTS-tjeneste


## Hente ut metadata fra WMS-tjeneste

- Finn url for tjenesten:

![Finn url for tjenesten](images/arcgis/serviceurl.png)

- Send getcapabilities-kall:

```ini
https://copernicus.hig.no:6443/arcgis/services/SverreSt/kommuner_oppland_v2/MapServer/WMSServer?
service=wms&
request=getcapabilities&
version=1.3
```

- Ferdige oppsatt getcapabilities-kall finnes også under *capabilities* på hver tjeneste (se *WMS*-link på menylinjen øverst):
  - [F.eks. for Kommuner i Oppland](https://copernicus.hig.no:6443/arcgis/rest/services/SverreSt/kommuner_oppland_v2/MapServer)
  - [WMS](https://copernicus.hig.no:6443/arcgis/services/SverreSt/kommuner_oppland_v2/MapServer/WMSServer?request=GetCapabilities&service=WMS)
  - [Samleside for alle tjenester](https://copernicus.hig.no:6443/arcgis/rest/services)


- Hent ut extent-informasjon for aktuelt koordinatsystem:

```xml
<BoundingBox CRS="EPSG:25832" minx="413293.839029" miny="6667145.701779" 
maxx="617929.028165" maxy="6916352.912269"/>
```

- Navn på aktuelle kartlag:

```xml
<Layer queryable="1">
  <Name>bygning</Name>
  ...
</Layer>
```

## Bestemme zoom-nivåer

Antall zoom-nivåer kan variere, men hvert ekstra zoom-nivå tar plass på serveren. Vi bruker derfor her maksimalt 5 zoom-nivåer.

En passende inndeling for fkb-data kan være målestokkene 25000, 15000, 10000, 5000, 2500. For andre typer data kan det være mer passende med mindre målestokker, f.eks. 50000 eller mindre.

## Opprette tjenesten i ArcGIS Manager

- Gå inn på Manage services og din mappe i ArcGIS Server Manager

![Finn url for tjenesten](images/arcgis/manageservices.png)

- Velg __caching__. Det skal se ca. slik ut:

![Finn url for tjenesten](images/arcgis/tilingscheme.png)

- Øverst på siden: velg __Using tiles from a cache__.
- Under __Tiling Scheme__, sett __Suggest__.
- Skriv inn hver målestokk-verdi og trykk __Add__.
- Minimum og maximum scale angir målstokk-området det skal lages kartfliser for. Angi passende verdi.
- Origin er øverste venstre hjørne for __tilematrix__. Sett inn verdier for dette fra metadataene for WMS-tjenesten.
- Trykk på __Save and Restart__. Legg merke til flis-symbolet som kommer opp til høyre for teksten (Map Service). Det viser at dette er en tjeneste med kartfliser.

![Finn url for tjenesten](images/arcgis/flissymbol.png)

## Administrere tjenesten fra ArcMap

Hvis du vil slette kartflisene hvs det kanskje ikke ble riktig i første forsøk, kan det gjøres fra ArcMap.
(Informasjon om dette kommer)

## Hente ut metadata fra WMTS-tjeneste

Url for WMTS-metadata hentes ut fra samme sted som WMS-metadata. Velg WMTS i dra-ned-menyen.

```ini
https://copernicus.hig.no:6443/arcgis/rest/services/sverrsti/Lillehammer/MapServer/WMTS/1.0.0/WMTSCapabilities.xml
```

Med denne url'en kan metadata hentes ut direkte - man trenger ikke å føye til de vanlige parametrene for getcapabilities-kall (men resultatet som kommer er likefullt basert på et getcapabilities-kall).

For å lage webkart trenger vi

- __ScaleDenominator__: målestokk-informasjon fra hvert flislag (tilematrix)
- __ows:Identifier__ for Layer: navn på kartlaget
- __ows:Identifier__ for TilematrixSet: fellesnavn for alle flislagene
- __ows:Identifier__ for Tilematrix: navn på flislaget (zoom-nivået)
- __ows:LowerCorner__: nedre venstre hjørne
- __ows:UpperCorner__: øvre høyre hjørne


```xml
<Contents>
<!-- Layer -->
  <Layer>
    <ows:Title>sverrsti_Lillehammer</ows:Title>
    <ows:Identifier>sverrsti_Lillehammer</ows:Identifier>
    <ows:BoundingBox crs="urn:ogc:def:crs:EPSG::25832">
      <ows:LowerCorner>556183.8200000003 6766438.199999999</ows:LowerCorner>
      <ows:UpperCorner>592522.8300000001 6789942.02</ows:UpperCorner>
    </ows:BoundingBox>
    ...
  </Layer>
  <TileMatrixSet>
    ...
    <ows:Identifier>default028mm</ows:Identifier>
    ...
    <TileMatrix>
      <ows:Identifier>0</ows:Identifier>
      <ScaleDenominator>23623.559151877238</ScaleDenominator>
      <TopLeftCorner>556183.82 6789942.02</TopLeftCorner>
      <TileWidth>256</TileWidth>
      <TileHeight>256</TileHeight>
      <MatrixWidth>22</MatrixWidth>
      <MatrixHeight>14</MatrixHeight>
    </TileMatrix>
    ...
  </TileMatrixSet>
</Contents>
```

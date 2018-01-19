# Strategier og teknikker ved utvikling av webkart med Open Layers API.

---

Dette dokumentet inneholder en del tips og teknikker som kan være til hjelp ved utvikling av webkart.

- Forutsetning: Vite hvordan WMS- og WMTS-tjenestene virker
- Forutsetning: Ha kontroll på metadataene for tjenestene som skal brukes
- Forutsetning: Ha kontroll på koordinatsystemene som skal brukes
- Forutsetning: Vite hvilke opplysninger som må inn i koden
- Strategi: Finne en passende mal å gå ut i fra
- Strategi: Gjør minst mulig forandring i malen i starten
- Teknikk: Finne feil i javascript-kode
- Teknikk: Finne feil i WMS/WMTS-kallene

## Forutsetning: Vite hvordan WMS- og WMTS-tjenestene virker

Det er viktig å vite hvordan et enkelt kall skal settes opp, hvilke parametre som er obligatoriske, hvilke som er frivillige og hva innholdet i hver av de skal være. Uten denne kunnskapen er det svært vanskelig å bedrive feilsøking.

## Forutsetning: Ha kontroll på metadataene for tjenestene som skal brukes

Dette betyr at man må kunne sende et getcapabilities-kall til tjenesten og kunne tolke resulatatet.

Url på egen tjeneste kan hentes ut fra menyvalget __OGC services__ i [ArcGIS Server Manager](https://copernicus.hig.no:6443/arcgis/manager/).

Lagnavn kan hente ut ved hjelp av getcapabilities-kall, f.eks. slik:

```ini
https://copernicus.hig.no:6443/arcgis/services/
SverreSt/kommuner_oppland_v2/MapServer/WMSServer?
request=GetCapabilities&
service=WMS&
version=1.3
```
Se også *Hente ut metadata fra WMS-tjeneste* [her](WMTS-opprette-tjeneste.html).

## Forutsetning: Ha kontroll på koordinatsystemene som skal brukes

Koordinatsystemene er oppgitt i metadataene for tjenesten, vanligvis som en *EPSG*-kode. Webkartet kan bare lages for de koordinatsystemene som tjenesten støtter. F.eks.

```xml
<CRS>CRS:84</CRS>
<CRS>EPSG:4326</CRS>
<CRS>EPSG:25832</CRS>
```

## Forutsetning: Vite hvilke opplysninger som må inn i koden

Det kan variere litt hvilke opplysninger som må settes inn i koden for eget webkart, men dette er det vanlig å ha med:

- koordinatsystem, herunder projeksjon
- senter-koordinater for kartet
- utstrekning - (extent) som brukes i ulike betydninger, se *Visningstjenester - om utstrekning - extent* [her](visningstjenester-utstrekning.html)
- url til tjenesten
- lagnavn

## Strategi: Finne en passende mal å gå ut i fra

- Open Layers har en del [eksempler](https://openlayers.org/en/latest/examples/) som er mulige kandidater. De fleste av disse bruker Web Merkator-projeksjonen. Hvis man skal bruke disse, må man legge til kode, slik som vist i *Hvis projeksjonen er noe annet enn Web Mercator* [her](WMTS-lage-web-kart.html).
- Skreddersydde eksempler for GEO3141:
  - fra [WMS-webkart med Open Layers](open-layers-WMS.html), med komplett eksempel [her](docs/kommuner_oppland_v3.html) (Web Mercator) og [her](docs/kommuner_oppland_v2_UTM32.html) (UTM sone 32).
  - fra [WMTS: arbeidsgang for webkart i Open Layers](WMTS-lage-web-kart.html), med komplett eksempel [her](docs/WMTS-kommuner.html) (UTM sone 32). Dette eksemplet inneholder også et WMS-lag som bakgrunnskart.

## Strategi: Gjør minst mulig forandring i malen

De ferdige malene er fungerende eksempler. Et første mål bør være å få til et fungerende eksempel med egen tjeneste før man eventuelt går videre og legger til ny funksjonalitet og egen stil. De skreddersydde malene er laget så enkle som mulig for at det skal være enklest mulig å forstå koden. Man bør derfor bruke tid på å forstå koden. Hvis noe er uklart - spør i timene eller på forumet.
Ta kopi av kode som virker før du legger inn noe nytt.

## Teknikk: Finne feil i javascript-kode

Vi anbefaler bruk av nettleseren Chrome under utvikling og uttesting av webkartet.
Chrome har *Developer Tools* som er en god hjelp i denne fasen.

Feil i javascript-kode vil ikke vises på en webside, men ved å trykke på *F12* startes *Developer Tools*. Under *Console*-fliken vil det komme opp eventuelle feilmeldinger fra javascript-motoren i nettleseren (etter at siden er lastet på nytt med *F5*-tasten.). Feilmeldingen vil angi hvor i koden feilen oppstår. Slike feilmeldinger kan være nøstet, slik at de peker langt inn i javascript-API'et, men de vil ofte vise til den kodelinjen i din kode som starter hele feilsituasjonen. Feilmeldingene kan noen ganger være vanskelige å forstå, men det kan ofte hjelpe å søke på Google med feilmeldingsteksten.

## Teknikk: Finne feil i WMS/WMTS-kallene

En annen type feil er mer logiske feil, eller feil som skyldes feil parametre i WMS/WMTS-kallene som Open Layers sender. For å finne de må man sjekke hvilke kall Open Layers faktisk sender, og det kan du finne under network-fliken.

Du kan f.eks. høyreklikke på kallet som sendes under Name-overskriften, kopiere linken og lime den inn i et nytt nettleservindu. Da kan du få ganske greie feilmeldinger hvis det mangler noe, eller feil navn på f.eks. kartlag.
Noe annet å gjøre på Network-fliken er å klikke på Headers-overskriften, rulle nederst i vinduet og se på "Query String Parameters". Her kan du sjekke parametrene i detalj, f.eks. koordinatsystem og lagnavn.

Legg merke til overskriftene Name, Status og Type nedenfor. Name viser kallet, Status viser HTTP-koden for resultatet av kallet, og type viser hva som ble returnert. Den siste skal normalt være et bildeformat, png eller jpg. Hvis det er text, så er det gjerne fordi det kom en feilmelding i retur.

![DevTools](images/tools/devtools.png)

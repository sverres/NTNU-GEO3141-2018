# Visningstjenester - om utstrekning - extent

---

Begrepet extent kommer opp i en del sammenhenger i forbindelse med WMS- og WMTS-tjenester og i Open Layers javascript-kode. Her kommer en oversikt over ulike definisjoner eller bruksområder for dette.

1. Kartprojeksjonens utstrekning
1. Kartverkets utstrekning
1. Datasettets utstrekning
1. ArcGIS-prosjektets dekningsområde
1. WMS-tjenestens utstrekning
1. WMTS-kartflisenes utstrekning
1. Utstrekning - extent-begrepet i Open Layers

Hver av disse er nærmere beskrevet nedenfor.

## Kartprojeksjonens utstrekning

Hver kartprojeksjon har et geografisk område hvor denne kartprojeksjonen er gyldig. Dette kan vi finne bl.a. på [EPSG.io](http://epsg.io). For EUREF89 UTM sone 32, med kode [EPSG:25832](http://epsg.io/25832), kan vi finne *Projected bounds* som

x |y
--|--
-1878007.03| 3932282.86
831544.53| 9437501.55

Dette er henholdsvis nedre venstre og øvre høyre hjørne med koordinater i denne projeksjonen. På samme side kan man også finne disse punktene oppgitt med geografiske koordinater.

## Kartverkets utstrekning

Kartverket har for sine visningstjenester definert et mindre/forskjøvet område for sine tjenester. F.eks. for UTM sone 32:

x |y
--|--
-2000000 |3500000
3545984	|9045984

Kilde: [Kartverkets API-er, WMS- og cache-tjenester](http://www.kartverket.no/data/api-og-wms/)

## Datasettets utstrekning

Dette kan være definert i metadataene for datasettet. Hvis datasettet ikke har metadata, vil gjerne GIS-programmer som ArcGIS kalkulere utstrekning. Dette finner vi i ArcGIS under Layer Properties/Source.

## ArcGIS-prosjektets utstrekning

ArcMap vil som standard kalkulere den samlede utstrekning for alle kartlagene, men dette kan overstyres under Data Frame Properties.

## WMS-tjenestens utstrekning

WMS-tjenester på ArcGIS Server blir definert ut fra et ArcMap prosjekt (mxd-fil), så det er rimelig å anta at WMS-tjenestens utstrekning er den samme som ArcGIS-prosjektets utstrekning. Dette må verifiseres.

## WMTS-kartflisenes utstrekning

I ArcGIS Server Manager settes det opp øvre venstre hjørne for *Tilematrix*, i denne dialogen (origin):

![tilingscheme](images/arcgis/tilingscheme.png)

Hvordan nedre høyre hjørne bestemmes er det ikke sagt noe om her, men det er vel rimelig å anta at det bestemmes av den underliggende WMS-tjenestens utstrekning. Her er det verd å nevne at det sannsynligvis er en feil i ArcGIS Server-programmet. Hvis du går inn igjen i denne dialogen på nytt vil du se at Y-verdien viser det samme som X-verdien. Det er selvsagt den opprinnelige Y-verdien som burde vært vist. Likevel, kartflisene blir opprettet med den verdien for Y som du legger inn.

## Utstrekning - extent-begrepet i Open Layers

Open Layers benytter seg av *extent* flere steder, og det er viktig å kjenne til forskjellen mellom disse.

- Kartprojeksjonens utstrekning legges inn i definisjonen av kartprojeksjonen hvis det brukes noe annet enn Web Mercator.
- WMTS-tjenester må kjenne til kartflisenes utstrekning, og dette legges inn under definisjonen av *tileGrid*.
- WMS-tjenester *kan ha* en utstrekning, og det kan være praktisk å legge inn dette. Open Layers-klienten vil ikke be om kartbilder for noe område utenfor den oppgitte utstrekningen. Fordelen med dette er at serveren ikke belastes med å lage tomme kartbilder for områder som ikke har data.
- Kartvinduet, *view'et*, *kan ha* en utstrekning. Det vil begrense hvor langt man kan bevege seg i kartet. Hvis det ikke er satt noen utstrekning vil man kunne bevege seg rundt i hele kartprojeksjonens utstrekning. Dette vil også begrense antallet kall som sendes til serveren.

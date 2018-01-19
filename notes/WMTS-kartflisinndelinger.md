# WMTS, kartflisinndelinger og koordinatsystemer

---

## Kartverkets dekningsområder (extent)

Kilde: [Kartverkets API-er og tjenester](https://kartverket.no/data/API-og-WMS/)

Koordinatsystem	|x	|y	|x	|y
--|--|--|--|--
UTM32	|-2000000	|3500000	|3545984	|9045984
UTM33	|-2500000	|3500000	|3045984	|9045984
UTM34	|-3000000	|3500000	|2545984	|9045984
UTM35	|-3500000	|3500000	|2045984	|9045984
UTM36	|-4000000	|3500000	|1545984	|9045984
Geografisk|-180	|-90	|180	|90
Mercator	|-20037508.34	|-20037508.34	|20037508.34	|20037508.34
ETRS-LCC	|2100000.2378	|820000.9292	|6300000.4541	|5021872.0731
ETRS-LAEA	|2426378.0132	|1528101.2618	|6293974.6215	|5446513.5222


## Mercator-utstrekningspolygon

```ini
x             y
-20037508.34  -20037508.34
-20037508.34   20037508.34
 20037508.34   20037508.34
 20037508.34  -20037508.34
 ```
## UTM 32-utstrekningspolygon

```ini
x         y
-2000000  3500000
-2000000  9045984
 3545984  9045984
 3545984  3500000
```

## UTM 33-utstrekningspolygon

```ini
x         y
-2500000  3500000
-2500000  9045984
 3045984  9045984
 3045984  3500000
```

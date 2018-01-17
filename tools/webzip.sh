#!/bin/bash
#
# zip all files in web folder and sub-folders.
# requires use of 7zip command line application
#
# sverre.stikbakke@ntnu.no 12.05.2017
#

webfolder='../web'
zipfile='web.zip'
outputfolder='..'

echo "compressing folder: ${webfolder}"

rm "${zipfile}" 2> /dev/null

./7za.exe a -r "${outputfolder}"/"${zipfile}" "${webfolder}"/*

ls -lh -tr -1 "${outputfolder}"/"${zipfile}"
echo ""
read -t 30 -n1 -r -p "Press any key to continue . . ."

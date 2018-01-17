#!/bin/bash
#
# Zip all files in web folder and sub-folders
# which are changed since last commit.
# Requires use of 7zip command line application.
#
# sverre.stikbakke@ntnu.no 15.05.2017
#

webfolder='../web'
changedfiles='../webdiff'
zipfile='webdiff.zip'
outputfolder='..'

echo "compressing changed files from: ${webfolder}"

rm "${outputfolder}"/"${zipfile}" 2> /dev/null
rm -rf "${changedfiles}"
mkdir "${changedfiles}"

for file in $(git ls-files --modified --others ${webfolder}/*); do
  cp "${file}" "${changedfiles}"
  echo "${file}"
done

./7za.exe a -r "${outputfolder}"/"${zipfile}" "${webfolder}"/*

ls -lh -tr -1 "${outputfolder}"/"${zipfile}"
echo ""
read -t 30 -n1 -r -p "Press any key to continue . . ."

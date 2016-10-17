#!/bin/bash

echo -e "Copy styleguide to theme"
rm -rf ${BASH_SOURCE%/*}/../web/themes/retraitespopulaires/build
cp -rfv ${BASH_SOURCE%/*}/../node_modules/@antistatique/retraitespopulaires-styleguide/build ${BASH_SOURCE%/*}/../web/themes/retraitespopulaires
echo -e "Finished"

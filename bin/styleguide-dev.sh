#!/bin/bash

echo -e "Build theme from siblings repo retraitespopulaires-styleguide"
${BASH_SOURCE%/*}/../../retraitespopulaires-styleguide/node_modules/.bin/gulp --gulpfile ${BASH_SOURCE%/*}/../../retraitespopulaires-styleguide/gulpfile.js
echo -e "Copy styleguide from siblings repo to theme"
rm -rf ${BASH_SOURCE%/*}/../web/themes/retraitespopulaires/build
cp -rfv ${BASH_SOURCE%/*}/../../retraitespopulaires-styleguide/build ${BASH_SOURCE%/*}/../web/themes/retraitespopulaires/
echo -e "Finished"

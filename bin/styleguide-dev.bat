#!/bin/bash

echo -e "Build theme from siblings repo retraitespopulaires-styleguide"
../retraitespopulaires-styleguide/node_modules/.bin/gulp --gulpfile ../retraitespopulaires-styleguide/gulpfile.js
echo -e "Copy styleguide from siblings repo to theme"
rm -rf web/themes/retraitespopulaires/build
cp -rfv ../retraitespopulaires-styleguide/build web/themes/retraitespopulaires/
echo -e "Finished"

#!/bin/bash

echo -e "Copy styleguide to theme"
cp -rfv node_modules/@antistatique/retraitespopulaires-styleguide/build web/themes/retraitespopulaires/
echo -e "Finished"

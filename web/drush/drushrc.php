<?php

# Ignoring Development Modules from Exporting and Importing Configuration
# See http://www.drush.org/en/master/config-exporting/#ignoring-development-modules

$command_specific['config-export']['skip-modules'] = array('devel');
$command_specific['cdrushonfig-import']['skip-modules'] = array('devel');

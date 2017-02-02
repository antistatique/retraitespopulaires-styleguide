# overwrite deploy_to
server '192.168.188.50', user: 'dplweb', roles: %w{app db web}
set :deploy_to, '/data/sites/www.retraitespopulaires.ch/'

# set a branch for this release
set :branch, 'master'

# set :slack_run, -> { true }

# Module that will be disabled by drush
set :disable_modules, ['devel']

before "styleguide:deploy_build", "styleguide:build_from_npm"

# Map composer and drush commands
# NOTE: If stage have different deploy_to
# you have to copy those line for each <stage_name>.rb
# See https://github.com/capistrano/composer/issues/22
SSHKit.config.command_map[:composer] = shared_path.join("composer.phar")
SSHKit.config.command_map[:drush] = shared_path.join("vendor/bin/drush")

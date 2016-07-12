# overwrite deploy_to
set :deploy_to, '/home/rp/www/retraitespopulaires.ch'

# set a branch for this release
set :branch, 'master'

# Used only if styleguide is external of the repository
# set :styleguide_branch, 'master'

set :slack_run, -> { true }

# Map composer and drush commands
# NOTE: If stage have different deploy_to
# you have to copy those line for each <stage_name>.rb
# See https://github.com/capistrano/composer/issues/22
SSHKit.config.command_map[:composer] = shared_path.join("composer.phar")
SSHKit.config.command_map[:drush] = shared_path.join("vendor/bin/drush")

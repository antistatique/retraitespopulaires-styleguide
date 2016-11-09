# overwrite deploy_to
server '192.168.188.51', user: 'dplweb', roles: %w{app db web}
set :deploy_to, '/data/sites/wwweti2.retraitespopulaires.ch/'
set :repo_url, 'dplmgr@192.168.188.51:/data/git/retraitespopulaires.git'

# set a branch for this release
set :branch, 'dev'

# Used only if styleguide is external of the repository
# set :styleguide_branch, 'dev'

# Module that will be disabled by drush
set :disable_modules, ['devel']

# Map composer and drush commands
# NOTE: If stage have different deploy_to
# you have to copy those line for each <stage_name>.rb
# See https://github.com/capistrano/composer/issues/22
SSHKit.config.command_map[:composer] = shared_path.join("composer.phar")
SSHKit.config.command_map[:drush] = shared_path.join("vendor/bin/drush")

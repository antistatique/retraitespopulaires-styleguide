# config valid only for current version of Capistrano
lock '3.5.0'

set :application, 'retraites-populaires'
set :repo_url, 'dplmgr@192.168.188.51:/data/git/retraitespopulaires.git'

# Used only if styleguide is external of the repository
set :styleguide_repo, 'git@github.com:antistatique/retraitespopulaires-styleguide.git'

set :app_path, "web"
set :styleguide_path, "node_modules/@antistatique/retraitespopulaires-styleguide"
set :theme_path, "themes/retraitespopulaires"
set :build_path, "build"

# Link file settings.php & drushcr.php
set :linked_files, fetch(:linked_files, []).push("#{fetch(:app_path)}/sites/default/settings.php", "#{fetch(:app_path)}/sites/default/drushrc.php")

# Link dirs files and private-files
set :linked_dirs, fetch(:linked_dirs, []).push("#{fetch(:app_path)}/sites/default/files")

# Default value for :scm is :git
set :scm, :git

# Default value for :pty is false
# set :pty, true

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
set :log_level, :debug


# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }


# Default value for keep_releases is 5
set :keep_releases, 3

set :slack_run, -> { false } # only enabled for production
set :slack_deploy_user, -> { ENV['CI_COMMITTER_NAME'] || ENV['USER'] || ENV['USERNAME'] }
set :slack_webhook, "https://hooks.slack.com/services/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"
set :slack_username, -> { 'Slackistrano' }
set :slack_run_updating, -> { false } # Set to false to disable deploy starting message.

# Used only if composer.json isn't on root
# set :composer_working_dir, -> { fetch(:release_path).join(fetch(:app_path)) }

# Remove default composer install task on deploy:updated
# Rake::Task['deploy:updated'].prerequisites.delete('composer:install')
# Rake::Task['deploy:updated'];

namespace :deploy do
  # before :starting, "drupal:backup"

  # Used only if styleguide is external of the repository
  after :updated, "styleguide:clone"

  # Used only if styleguide is internal of the repository
  # after :updated, "styleguide:build"

  after :updated, "styleguide:deploy_build"

  after :updated, "drupal:config:import"
  after :updated, "drupal:module:disable"
  after :updated, "drupal:updatedb"
  after :updated, "drupal:cache:clear"

  before :cleanup, :fix_permission do
    on roles(:app) do
      releases = capture(:ls, '-xtr', releases_path).split
      if releases.count >= fetch(:keep_releases)
        directories = (releases - releases.last(fetch(:keep_releases)))
        if directories.any?
          directories_str = directories.map do |release|
            releases_path.join(release).join("#{fetch(:app_path)}/sites/default")
          end.join(" ")
          execute :chmod, 'u+w', directories_str
        end
      end
    end
  end
end
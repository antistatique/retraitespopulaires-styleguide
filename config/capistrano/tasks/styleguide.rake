require 'fileutils'

namespace :styleguide do
  task :defaults do
    set :build_path, 'build'
    set :app_path, 'web'
    set :styleguide_path, ''
    set :styleguide_branch, 'master'
    set :styleguide_repo, ''
  end

  desc "Build assets locally from NPM"
  task :build_from_npm do
    run_locally do
      # Delete existing styleguide
      if File.exists?(fetch(:styleguide_path))
        FileUtils.rm_rf(fetch(:styleguide_path))
      end

      # Retrieve styleguide from npm
      # execute 'npm', '--no-spin', '--silent', 'install'
      execute 'yarn', 'install', '--no-progress', '--silent'

      # Build the styleguide localy
      execute './node_modules/.bin/gulp', 'build', '--production'
    end
  end

  desc "Build assets locally from Git"
  task :build_from_git do
    run_locally do
      # Delete existing styleguide (symlink on machines)
      if File.exists?(fetch(:styleguide_path))
        FileUtils.rm_rf(fetch(:styleguide_path))
      end

      # Retrieve styleguide from npm (needed to build the git styleguide)
      # execute 'npm', '--no-spin', '--silent', 'install'
      execute 'yarn', 'install', '--no-progress', '--silent'


      # Delete existing styleguide downloaded by npm
      if File.exists?(fetch(:styleguide_path))
        FileUtils.rm_rf(fetch(:styleguide_path))
      end

      # Retrieve styleguide from git
      execute :git, 'clone', '-b', fetch(:styleguide_branch), fetch(:styleguide_repo), fetch(:styleguide_path)

      # Build the dependencied styleguide localy
      within fetch(:styleguide_path) do
        execute 'yarn', 'install', '--no-progress', '--silent'
        # execute 'npm', '--no-spin', '--silent', 'install'
        execute './node_modules/.bin/gulp', 'build', '--production'
      end

      # Build the styleguide localy
      execute './node_modules/.bin/gulp', 'build', '--production'
    end
  end

  desc "Push build to server"
  task :deploy_build do
    on roles(:web) do
      from = fetch(:app_path) + '/' + fetch(:theme_path) +'/'+ fetch(:build_path)
      to = release_path.join(fetch(:app_path)).join(fetch(:theme_path)).join(fetch(:build_path))
      info "Upload from local: \e[35m#{from}\e[0m to remote \e[35m#{to}\e[0m"
      upload! from, to, recursive: true
    end
  end
end

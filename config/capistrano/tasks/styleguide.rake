namespace :styleguide do
  task :defaults do
    set :build_path, 'build'
    set :app_path, 'web'
  end

  # desc "Build assets locally"
  task :build do
    run_locally do
      execute 'npm', '--no-spin', '--silent', 'install'
      execute './node_modules/.bin/gulp', 'build', '--production'
    end
  end

  # Used only if styleguide is external of the repository
  # desc "Clone or update styleguide locally"
  # task :update do
  #   run_locally do
  #     if test("[ -d styleguide ]")
  #       execute "cd styleguide && git checkout", fetch(:styleguide_branch)
  #       execute "cd styleguide && git pull"
  #     else
  #       execute :git, 'clone', '-b', fetch(:styleguide_branch), fetch(:styleguide_repo), 'styleguide'
  #     end
  #
  #     within 'styleguide' do
  #       execute 'npm', '--no-spin', '--silent', '--production', 'install'
  #       execute 'gulp', 'build', '--silent', '--production'
  #     end
  #   end
  # end

  desc "Push build to server"
  task :deploy_build do
    on roles(:web) do
        upload! fetch(:styleguide_path) + '/' + fetch(:build_path), release_path.join(fetch(:app_path)).join(fetch(:theme_path)).join(fetch(:build_path)), recursive: true
    end
  end
end

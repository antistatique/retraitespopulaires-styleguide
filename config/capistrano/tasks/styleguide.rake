namespace :styleguide do
  task :defaults do
    set :build_path, 'build'
    set :app_path, 'web'
  end

  # desc "Build assets locally"
  task :build do
    run_locally do
      execute 'npm', '--no-spin', '--silent', 'update'
    end
  end

  desc "Push build to server"
  task :deploy_build do
    on roles(:web) do
      from = fetch(:styleguide_path) +'/'+ fetch(:build_path)
      to = release_path.join(fetch(:app_path)).join(fetch(:theme_path)).join(fetch(:build_path))
      info "Upload from local: \e[35m#{from}\e[0m to remote \e[35m#{to}\e[0m"
      upload! from, to, recursive: true
    end
  end
end

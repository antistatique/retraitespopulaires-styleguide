##
# HTTP Authentification deployment Recipe
# Add htaccess password protection when deploying, with the correct htpassword
# file for the passed users.
# @see https://gist.github.com/real34/2310728
##
namespace :load do
  task :defaults do
    set :app_app_path, fetch(:app_path, "drupal")
    set :http_auth_users, [
       [ "user", "hashedpassword" ]
    ]
  end
end

namespace :httpauth do
  desc <<-DESC
    Generates / updates .htaccess and .htpasswd files with the credentials passed in parameter
    Inspired from: https://gist.github.com/805879
  DESC
  task :protect do
    on roles(:app) do
      htpasswdFile = shared_path.join('.htpasswd')
      htaccessFile = release_path.join(fetch(:app_path)).join('.htaccess')

      htpasswdContent = fetch(:http_auth_users).inject("") { |content, user|
        content = content + user[0] + ":" + user[1] + "\n"
      }

      execute "echo '#{htpasswdContent.strip}' > #{htpasswdFile}"

      [
        '## added during deploy',
        'AuthType Basic',
        'AuthName "Restricted"',
        "AuthUserFile \"#{htpasswdFile}\"",
        'Require valid-user'
      ].each { |line| execute "echo '#{line}' >> #{htaccessFile}" }
    end
  end
end

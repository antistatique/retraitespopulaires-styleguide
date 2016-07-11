# RP - Retraites Populaires
Retraites Populaires website. Drupal 8 powered.

## Install

1. Setup your virtualhost (like `http://rp.dev`) to serve `/web`.

2. Install Drupal and dependencies using composer

  ```bash
  composer install
  ```

3. Go to http://rp.dev and follow install instruction
   Or run the following command:

  ```bash
  $ drush si standard --db-url=mysql://root:dbpassword@127.0.0.1/rp_dev --site-name="Retraites Populaires" --account-name=admin --account-pass=admin --account-mail=dev@antistatique.net
  ```

4. Use the same site UUID than your collegue:

```bash
$ drush config-set system.site uuid "178593ac-4188-4313-8826-c15c99d64cc4"
```

(This is certainly a bad idea, [follow this drupal issue](https://www.drupal.org/node/1613424)).

5. Update your  `sites/default/settings.php`:

  ```php
  $config_directories['sync'] = '../config/d8/sync';
  ```

6. Update your `sites/default/drushrc.php`:

  ```php
  $options['uri'] = "http://rp.dev";
  ```

7. Import the configuration

  ```bash
  $ drush cim
  ```

8. Rebuild the cache

  ```bash
  $ drush cr
  ```

## After a git pull/merge
    ```bash
    $ drush cim
    $ drush cr
    ```

## Build the theme

You first need to setup the work environment by running `$ npm install`.

To build the theme, you then need to clone the `retraitespopulaires-styleguide` repo and put it as a sibling of this repo in your local directory.

In the styleguide (once it is set up, cf its README file):

    # build all assets
    $ gulp build
    # or build all assets, serve the styleguide and watch changes
    $ gulp serve

In the drupal project:

    # copy all built files from the styleguide
    $ gulp build
    # or watch changes in styleguide build folder
    $ gulp watch

## Deploy
The deployment of branch `dev` and `master` is automatically managed by Codeship!


### First time

    # You need to have ruby & bundler installed
    $ bundle install
    $ npm install -g gulp

### Each times
We use Capistrano to deploy:

    $ bundle exec cap -T
    $ bundle exec cap staging deploy

## Troubleshootings

### How to disable the Drupal Cache for dev ?
The tricks is to add this two lines in your `settings.php`:

    // do this only after you have installed the drupal
    $settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';
    $settings['cache']['bins']['render'] = 'cache.backend.null';

A better way is to use the `example.settings.local.php` that do more for your dev environement (think about it like the `app_dev.php` front controller):

 1. Copy the example local file:

  ```bash
  $ cp sites/example.settings.local.xml sites/default/settings.local.php
  ```

 2. Uncomment the following line in your `settings.php`

  ```php
  if (file_exists(__DIR__ . '/settings.local.php')) {
    include __DIR__ . '/settings.local.php';
  }
  ```

 3. Clear the cache

  ```bash
  $ drush cr
  ```

### How to enable the Twig Debug for dev ?

 1. Copy the example local file:

  ```bash
  $ cp sites/default/default.services.yml sites/default/services.yml
  ```

 2. set the debug value of twig to `true`

  ```php
  twig.config:
    debug: true
  ```

 3. Clear the cache

  ```bash
  $ drush cr
  ```

[Read More about it](https://www.drupal.org/node/1903374)

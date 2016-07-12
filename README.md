# RP - Retraites Populaires
Retraites Populaires website. Drupal 8 powered.


## Prerequisites

First of all, you need to have the following tools installed globally on your environment:

  * composer
  * drush

### Tips

To run any drush command, you need to be on a hight bootstrapped drupal directory, such `/web`.

  ```bash
  $ cd /web
  ```

On common errors, see the Troubleshootings section.

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

5. Update your  `web/sites/default/settings.php`:

  ```bash
  $ vim web/sites/default/settings.php
  ```

  ```php
  $config_directories['sync'] = '../config/d8/sync';
  ```

6. Update your `web/sites/default/drushrc.php`:

  ```bash
  $ cp web/sites/default/default.drushrc.php web/sites/default/drushrc.php
  $ vim web/sites/default/drushrc.php
  ```

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


To build the theme, the styleguide is a npm dependecies of this package `@antistatique/retraitespopulaires-styleguide`.

You first need to setup the work environment by running `$ npm install`.

In the drupal project:

    # copy all built files from the styleguide
    $ ./sh/styleguide.sh

### Development process

To build the theme from the repository whitout publishing on `npm`, you then need to clone the `retraitespopulaires-styleguide` repo and put it as a sibling of this repo in your local directory.
Then, run the following command to build and copy the styleguide in your Drupal theme.

    $ ./sh/styleguide-dev.sh

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

### Error while importing config ?

```
The import failed due for the following reasons:                                                                                                   [error]
Entities exist of type <em class="placeholder">Shortcut link</em> and <em class="placeholder"></em> <em class="placeholder">Default</em>. These
entities need to be deleted before importing.
```

Solution: Delete all your shortcuts from the Drupal Admin on [admin/config/user-interface/shortcut/manage/default/customize](admin/config/user-interface/shortcut/manage/default/customize).

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

# RP - Retraites Populaires
Retraites Populaires website. Drupal 8 powered.

## 🔧 Prerequisites

First of all, you need to have the following tools installed globally on your environment:

  * composer
  * drush
  * npm

don't forget to add bins to your path such:

  * php
  * mysql

to use the search engine, add this tools to your path:

  * solr
  * tika

The git repository of Retraites Populaires is:

```
 $ git remote add rp dplmgr@192.168.188.51:/data/git/retraitespopulaires.git
```

Got an error ? Like:
```
ssh: connect to host 192.168.188.51 port 22: Operation timed out
fatal: Could not read from remote repository.
```

It's because you need to connect to the VPN. Open Firefox (and not Safari or Chrome, Java Applets Yeeahh!) and go to http://vpn.retraitespopulaires.ch/ and login.


### Tips

To run any drush command, you need to be on a hight bootstrapped drupal directory, such `/web`.

  ```bash
  $ cd /web
  ```

On common errors, see the Troubleshootings section.

## 🚛 Install

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

## 🎨 Build the theme

**Production workflow:**

The first solution is to retrieve *styleguide as `npm` dependency* .
To build the theme from vendor, `npm`, you should publish it. You then need to setup the work environment by running `$ npm install`.

**Development workflow:**

The second solution is to retrieve *styleguide from `git` repo*.
To build the theme from the repository whitout publishing on `npm`, you then need to clone the [`retraitespopulaires-styleguide`](https://github.com/antistatique/retraitespopulaires-styleguide) repo and put it as a sibling of this repo in your local directory.

### For windows

**Production workflow:**

    # copy all built files from the vendor styleguide
    $ ./bin/styleguide.bat

**Development workflow:**

    # copy all built files from the repo styleguide
    $ ./bin/styleguide-dev.bat

### For Unix

**Production workflow:**

    # copy all built files from the vendor styleguide
    $ ./bin/styleguide.sh

**Development workflow:**

    # create a symlink
    $ ln -s /path/to/retraitespopulaires-styleguide/build /web/themes/retraitespopulaires/build

    Or

    # copy all built files from the repo styleguide
    $ ./bin/styleguide-dev.sh

## 🚀 Deploy

### First time

    # You need to have ruby & bundler installed
    $ bundle install
    $ npm login
    # enter your npm credentials, ask Antistatique if you don't have one.
    $ npm install -g gulp

### Each times
We use Capistrano to deploy:

    $ bundle exec cap -T
    $ bundle exec cap rpeti deploy


## 🔍 Solr (6.1.0+) search Engine & Tika (1.13+) Extractor
We are using solr for search index.

Solr need to be configured for drupal. Follow the INSTALL.txt found in the `search_api_solr` module.

As a pre-requisite for running your own Solr server, you'll need Java 6 or higher.

### Installation

Install all prerequisites and configuration from `web/modules/contrib/search_api_solr/INSTALL.txt` then

### For windows

### For Unix

Start Solr with:
    $ bin/solr start

Create the new instance retraitespopulaires-website
    $ bin/solr create -c retraitespopulaires-website

The creation will generate a folder under `$SOLR_PATH/6.1.0/server/solr/retraitespopulaires-website`

Copy all the configs files from `web/modules/contrib/search_api_solr/solr-conf/6.x/*` into `$SOLR_PATH/6.1.0/server/solr/retraitespopulaires-website/conf`

    $ cp web/modules/contrib/search_api_solr/solr-conf/6.x/* $SOLR_PATH/6.1.0/server/solr/retraitespopulaires-website/conf

Restart Solr
    $ bin/solr restart

Check your Solr status with `solr status` and with `http://localhost:8983/solr/#/`

### Usage

Start Solr with:
    $ bin/solr start

### Drupal Configuration

Check the Solr configuration on `admin/config/search/search-api/server/solr/edit` and the Tika under `admin/config/search/search_api_attachments`


## 🏆 Tests

    $ phpunit

## 🚑 Troubleshootings

### Error while `npm install` ?

```
ERR! 404 Not Found: @antistatique/retraitespopulaires-stlyeguide
ERR! 404 '@antistatique/retraitespopulaires-styleguide' is not in the npm regitry.
```

Solution: Connect yourself to npm using `npm login` with your NPM credentials.

### Error while importing config ?

```
The import failed due for the following reasons:                                                                                                   [error]
Entities exist of type <em class="placeholder">Shortcut link</em> and <em class="placeholder"></em> <em class="placeholder">Default</em>. These
entities need to be deleted before importing.
```

Solution 1: Delete all your shortcuts from the Drupal Admin on [admin/config/user-interface/shortcut/manage/default/customize](admin/config/user-interface/shortcut/manage/default/customize).

Solution 2: Delete all your shortcuts with drush

```
drush ev '\Drupal::entityManager()->getStorage("shortcut_set")->load("default")->delete();'
```

### How to disable the Drupal Cache for dev ?
The tricks is to add this two lines in your `settings.php`:

    // do this only after you have installed the drupal
    $settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';
    $settings['cache']['bins']['render'] = 'cache.backend.null';

A better way is to use the `example.settings.local.php` that do more for your dev environement (think about it like the `app_dev.php` front controller):

 1. Copy the example local file:

  ```bash
  $ cp sites/example.settings.local.php sites/default/settings.local.php
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

## 💻 Drush Commands

### Solr index

 1. You must add every thing to be index with `drush search-api-reset-tracker`.
 2. Once done, reindex all with `drush search-api-index`.

### import_zip

To importe all zips and associate it with advisor, use the drush command `rp:contact:import_zip` and the option `file` as full csv file path that contain zips to be imported.

  ```bash
  $ drush rp:contact:import_zip --file=target
  ```

### import-rates

To importe all rates, use the drush command `rp:mortgage:import-rates` and the option `file` as full csv file path that contain rates to be imported and the optional option `institution` to only import rates concerning institution name-

  ```bash
  $ drush rp:mortgage:import-rates --file=target [--institution=institution]
  ```

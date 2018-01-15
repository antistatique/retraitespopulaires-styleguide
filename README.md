# RP - Retraites Populaires
Retraites Populaires website. Drupal 8 powered.

Check the Technical Documentation (French) that explain all development strategies: https://docs.google.com/a/antistatique.net/document/d/1SYNL7aYZC4tOP81cQ4st7kPsPEBrhm1q7IR1MMgwQMI/edit?usp=sharing

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

The main styleguide of Retraites Populaires is a `npm` dependency named `@antistatique/retraitespopulaires-styleguide`.
The Drupal theme use the builds of `@antistatique/retraitespopulaires-styleguide` as dependecies and add also his own files.

**No Frontend development workflow (styleguide build and run)**

Install @antistatique/retraitespopulaires-styleguide project with npm

  ```bash
    $ npm login
    # enter the dev@antistatique.net npm credentials, ask Antistatique if you don't have these. (they should normally be in 1Password)
    $ npm install
  ```

then, run the `$ gulp build --production` in the project root

**Frontend development workflow:**

As the styleguide is a separated repository, you should create a symlink between `node_modules/@antistatique/retraitespopulaires-styleguide` -> `[retraitespopulaires-styleguide-folder]`.

  $ npm install -g gulp

  ```bash
    $ ln -s [retraitespopulaires-styleguide-folder] [retraitespopulaires-website-folder]/node_modules/@antistatique/retraitespopulaires-styleguide
  ```

A simple script to execute on the root folder of Retraites Populaires

  ```bash
  $ ln -s `pwd`/../retraitespopulaires-styleguide `pwd`/node_modules/@antistatique/retraitespopulaires-styleguide
  ```

Each time you make a changes you then will run `$ gulp build` from **both** repository !

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

#### Deployment on staging

When you deploy on the staging environment, the styleguide used for deploy is the styleguide repo on the dev branch.
We use the repository on staging to avoid creating NPM version everytime we deploy on staging.

#### Deployment on production

When you deploy on the production environment, the styleguide used for deploy is the latest NPM version.

## 🔍 Solr (6.1.0+) search Engine & Tika (1.13+) Extractor

We are using solr for search index.

Solr need to be configured for drupal. Follow the INSTALL.txt found in the `search_api_solr` module.

As a pre-requisite for running your own Solr server, you'll need Java 6 or higher.

### Installation

Install all prerequisites and configuration from `web/modules/contrib/search_api_solr/INSTALL.txt` then

Start Solr with:
    $ bin/solr start

Create the new instance retraitespopulaires-website
    $ bin/solr create -c retraitespopulaires-website

The creation will generate a folder under `$SOLR_PATH/6.1.0/server/solr/retraitespopulaires-website`

Copy all the configs files from `web/modules/contrib/search_api_solr/solr-conf/6.x/*` into `$SOLR_PATH/6.1.0/server/solr/retraitespopulaires-website/conf`

    $ cp web/modules/contrib/search_api_solr/solr-conf/6.x/* $SOLR_PATH/6.1.0/server/solr/retraitespopulaires-website/conf

Restart Solr
    $ bin/solr restart

Reload the Solr configuration

To performe this operation you must be connected via SSH on the server.

  ```shell
  $ curl http://localhost:8983/solr/admin/cores?action=RELOAD\&core=retraitespopulaires-website
  ```

Check your Solr status with `solr status` and with `http://localhost:8983/solr/#/`

### Usage

Start Solr with:

  ```shell
  $ bin/solr start
  ```

Index all your content with:

  ```shell
  $ drush cron
  ```

Clean the index:

  ```shell
  $ drush sapi-c [index]
  ```

Index everything at once:

  ```shell
  $ drush sapi-i [index]
  ```

### Drupal Configuration

Check the Solr configuration on `admin/config/search/search-api/server/solr/edit` and the Tika under `admin/config/search/search_api_attachments`

### Add partial search

By default Solr don't match partial search, you should edit the *schema.xml*
file and add the following filters on the `fieldType name="text"`.

  ```xml
  <fieldType name="text" class="solr.TextField" positionIncrementGap="100">
  ```

  ```xml
  <filter class="solr.LowerCaseFilterFactory"/>
  <filter class="solr.EdgeNGramFilterFactory" minGramSize="2" maxGramSize="25" />
  ```

### Improved natural language search

You should improved the natural search by editing the *stopwords.txt* file.
Check stopwords on [stopwords-iso](https://github.com/stopwords-iso/)

Replace the default `SnowballPorterFilterFactory` from `language="English"`
to `language="French"`,

You should improved the natural search by editing the *synonyms.txt* file.
 - Check synonyms for english (~1500 words) from [Roget's Thesaurus](http://www.gutenberg.org/ebooks/10681)
 - Check synonyms (~143405 words) for french from [termsuite](https://github.com/termsuite/termsuite-core/blob/master/src/main/resources/fr/univnantes/termsuite/resources/fr/french-synonyms.txt)
 - Check synonyms for french (~326 words) from [kevinbouge](https://sites.google.com/site/kevinbouge/synonyms-lists)

### Maintenance on production

The Solr instance is located in `/data/solr/data/retraitespopulaires-website/`.

You can restart the server the following:

  ```bash
    $ service solr restart
  ```

### Solr browser access

Open a SSH Bridge with the following command, then browser with http://127.0.0.1:9983/solr/#/

Production:

  ```bash
  $ ssh -L 9983:127.0.0.1:8983 dplweb@192.168.188.50
  ```

ETI/Staging:

  ```bash
  $ ssh -L 9983:127.0.0.1:8983 web_rp@192.168.188.51
  ```

## Modulo iframe
The Modulo calculator is developed by Logismata and integrated as an iframe into the drupal.
The frontend application is stored into `/web/rpopulaires`.

The code to include on any Drupal page is:

```
<iframe height="1800px" id="calculationFrame" name="calculationFrame" scrolling="no" seamless="" src="/rpopulaires/app/index.html" style="overflow: hidden; border: none; padding: 0px; margin: 0px" width="100%"></iframe>
<script src="/rpopulaires/src/iframe-communication.js"></script>
```

To make it work, I patched the v1.0.0:

```diff
diff --git a/web/rpopulaires/app/src/model/runtime-environment-application-parameters.js b/web/rpopulaires/app/src/model/runtime-environment-application-parameters.js
index 15ae7d2..424aecb 100755
--- a/web/rpopulaires/app/src/model/runtime-environment-application-parameters.js
+++ b/web/rpopulaires/app/src/model/runtime-environment-application-parameters.js
@@ -13,8 +13,8 @@ define('runtime-environment-application-parameters', [], function() {
     "contactCustomizationUrl": "",
     "requirePaths": {},
     "authorizedContainers": [
-        "http://rp.dev",
-        "http://www.retraitespopulaires.ch",
+        "http://rp.localhost",
+        "https://www.retraitespopulaires.ch",
         "https://wwweti.retraitespopulaires.ch"
     ]
 };
diff --git a/web/rpopulaires/index.html b/web/rpopulaires/index.html
index e49ef41..689ea79 100755
--- a/web/rpopulaires/index.html
+++ b/web/rpopulaires/index.html
@@ -18,7 +18,7 @@
            It is also important to set the width to 768px, so the correct bootstrap rules apply.
       -->
       <iframe id="calculationFrame" style="overflow: hidden; border: 1px dashed blue; padding: 0px; margin: 0px" width="100%" height="1800px" scrolling="no" seamless=""
-name="calculationFrame" src="https://uat.logismata.ch/rpopulaires/app/"
+name="calculationFrame" src="/rpopulaires/app/index.html"
       ></iframe>
       <script src="/rpopulaires/src/iframe-communication.js"></script>
    </div>
diff --git a/web/rpopulaires/src/iframe-communication.js b/web/rpopulaires/src/iframe-communication.js
index 867bbbd..db806f6 100755
--- a/web/rpopulaires/src/iframe-communication.js
+++ b/web/rpopulaires/src/iframe-communication.js
@@ -1,4 +1,4 @@
-var authorizedOrigins = ["https://uat.logismata.ch"];
+var authorizedOrigins = ["https://wwweti.retraitespopulaires.ch", "https://www.retraitespopulaires.ch", "http://rp.localhost"];
 var sendOnIFrameScrollMessage = true;

 var iFrameMessageProcessor = {
@@ -16,7 +16,7 @@ var iFrameMessageProcessor = {
    },

    onDocumentTitleChanged: function(parameters) {
-      document.title = parameters;
+      // document.title = parameters;
    },

    onViewTitleChanged: function(parameters) {
@@ -27,7 +27,7 @@ var iFrameMessageProcessor = {
    },

    openContactUrl: function(parameters) {
-      console.log("received from openContactUrl %O", parameters);
+      window.location = '/contact/conseil-clients-prives';
    }
 };
```

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

### Error on Windows `no CSS styles or Javascript files shown` ?

Drupal need to create a lot of temporary files to work properly.
By default, with our installation running on UNIX, we use a temporary path as `/tmp`. A folder that not exist on Windows.

Solution 1: Change the default temporary folder for a Writable one using drush.

```
$ drush config-set system.file path.temporary /path/to/tmp
```

Solution 2: Forcing yours `settings.php` to use a specific temporary folder:

```php
$config['system.file']['path']['temporary'] = '/path/to/tmp';
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

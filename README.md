# RP - Retraites Populaires - Styleguide
Retraites Populaires Styleguide.

# Content

# User documentation

## Install CSS/JS dependencies with npm

  ````shell
    $ npm init
    $ npm login
    $ npm install --save @antistatique/retraitespopulaires-styleguide
  ````

### Link assets to your project
- Use any task runner (gulp/grunt/...) to move node_modules/@antistatique/retraitespopulaires-styleguide/build/ to your asset folder


## HTML template (quick and dirty, see complete [styleguide here](https://antistatique.github.io/retraitespopulaires-styleguide/))

  ````HTML
  <!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie10 lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie10 lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie10 lt-ie9"> <![endif]-->
<!--[if IE 9]>         <html class="no-js lt-ie10"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title></title>
  <meta name="description" content="">
  <meta name="keywords" content="HTML,CSS,XML,JavaScript">
  <meta name="viewport" content="width=device-width">

  <link rel="stylesheet" href="/build/css/vendors.min.css">
  <link rel="stylesheet" href="/build/css/main.css">

</head>
<body>

  <!-- bottom scripts -->
  <script src="//code.jquery.com/jquery-2.2.4.min.js" crossorigin="anonymous"></script>
  <script src="/build/js/vendors.min.js"></script>
  <script src="/build/js/bundle.js"></script>
</body>
</html>  
````


# Contributor documentation

## Prerequisites

First of all, you need to have the following tools installed globally on your environment:

* node
* npm
* gulp

## Install

````shell
$ npm install
$ gulp
````

## Development

First you have to launch Gulp to watch your files

````shell
$ gulp serve
````

## Deploy
The deployment of branch `dev` and `master` is managed yourself and publish on NPM!


### First time

````shell
# You need to create a new realease using git flow
$ git flow release start 0.0.1
# Make some last minutes changes and prepare your realease and edit CHANGELOG.md file!
$ git flow release finish -p 0.0.1
# Publish on NPM your last release
$ npm publish
````

# RP - Retraites Populaires - Styleguide
Retraites Populaires Styleguide.

# Content

# User documentation

## Install CSS/JS dependencies with npm & yarn

  ````shell
    $ npm init
    $ npm login
    $ yarn install --save @antistatique/retraitespopulaires-styleguide
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

  <!-- Include this script if you want to use the organic lines -->
  <script src="/build/js/MorphSVGPlugin.min.js"></script>

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
* yarn

## Install

````shell
$ yarn install
$ gulp build
````

You will need some global dependencies such as:

- metalsmith

````shell
$ npm install -g metalsmith
````

## Development

First you have to launch Gulp to watch your files

````shell
$ gulp serve
````

To then access the styleguide, go to [http://localhost:3000/retraitespopulaires-styleguide/](http://localhost:3000/retraitespopulaires-styleguide/) (`/retraitespopulaires-styleguide/` is added here because the styleguide is published on npm)

## Regression Testing

To test all components against what they should look like, we use [Gemini](https://github.com/gemini-testing/gemini), a utility for visual regression testing.

**Installation**

You have to install some modules globally

```bash
$ yarn add global gemini gemini-babel gemini-gui selenium-standalone
# then install selenium-standalone
$ selenium-standalone install
```

**Generate references**

Once a component has been updated and validated, you can regenerate the reference screenshot by running this in your project root:

```bash
# first start selenium-standalone
$ selenium-standalone start
# then update gemini tests ONLY for one component!
$ gemini update --grep [name-of-component]
```

If this is a new component, you have to add it to the `gemini-config.json` file first, or create a custom test suite in the `/gemini` directory.

We will be implementing interaction testing and responsive soon. The branch `feature/regression-testing` is used as a point of reference for the first draft. You must cherry-pick any changes you make elsewhere in the gemini config before updating the screenshots.

**Gemini GUI**

Gemini provides a useful UI that you can run in your project root with:

```bash
$ gemini-gui gemini
```

You can then run tests and approve them on the fly.


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

## Deploy on gh-pages

  ```shell
  $ gulp --ghpages && gulp deploy
  ```

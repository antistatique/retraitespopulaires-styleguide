# RP - Retraites Populaires - Styleguide
Retraites Populaires Styleguide.

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
    # Make some last minutes changes and prepare your realease
    $ git flow release finish -p 0.0.1
    # Publish on NPM your last release
    $ npm publish
  ````

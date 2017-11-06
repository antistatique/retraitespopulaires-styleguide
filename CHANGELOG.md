CHANGELOG
=========

## NEXT RELEASE
 - fix broken rp-bigmenu arrow outline color

## 3.1.8 (2017-11-03)
 - add selectize styles
 - add logos CPEV & Profelia for mails

## 3.1.7 (2017-11-01)
 - add selectize description
 - new mails template (light)

## 3.1.6 (2017-10-11)
 - update gulp-sass version
 - update styles for lang nav in push-menu on mobile
 - style search box in push-menu on mobile

## 3.1.5 (2017-10-04)
 - add new favicon portail d'actualité

## 3.1.4 (2017-09-12)
 - added 3rd level on the secondary-nav
 - removed margin-bottom to card-title in card-justify
 - add Fancytree
 - add border to header with helper class
 - fix active color in outline primary buttons
 - optimize SVG code for logos
 - avoid stylelint crashing the whole build on error
 - fix stylelint error

## 3.1.3 (2017-09-04)
 - add missing mandants logos
 - implement spacers from Bootstrap 4 inside styleguide
 - fix favicons cpev & cip
 - fix ie9-ie10 svg logo scaling
 - add new favicon portail ca
 - add helper text-break-all-always

## 3.1.2 (2017-08-04)
 - back-port header mandat in header component

## 3.1.1 (2017-07-04)
 - improved lists indentations when break line
 - added favicons portailca
 - added favicons mp

## 3.1.0 (2017-06-02)

  - added `.text-dimmed` helper
  - added new meta-box component
  - added `.table-middle` class to center cells vertically
  - added `.text-normal` helper (mainly for text-color on links)
  - added `.tablesaw-lite` class to table for a light version of responsive tables
  - added `.flex-space-between` helper class
  - added back version of input datepicker in an input-group (with button)
  - refactored header component with push-menu and swiper-menu ⚠️ **BREAKING**
  - refactored btn-outline component (it has to have `.btn-primary` or others to be colored correctly) ⚠️ **BREAKING**
  - refactored card component to remove base background-color, you need the `.card-white` class now ⚠️ **BREAKING**
  - updated label component look with js behaviour in list-inlines
  - updated navigation in new header (mandants)
  - updated table header when borderless
  - changed datepicker config to display on button click only
  - replace teaser-document-extranet component by Bootstrap Media component

## 3.0.1 (2017-05-18)

  - fix special grey waves on IE11

## 3.0.0 (2017-05-18)
Massive refactoring of Styleguide components to avoid legacy code.

### Added

  - added new component "Block Link"
  - added new component "Label"
  - added Boostrap documentation to some elements
  - added optional `.organic-wrapper` to Organic Lines
  - added optional `.tooltip-shift` to Tooltip
  - added card, card-result components to regroup all card-like components **Major refactoring of all card-like components**
  - added helpers: `.bg-special-waves`, `background-overflow`,

### Removed

  - removed all theme functionality from all components (use a `theme-[theme]` wrapper)
  - removed favicon component
  - removed major logic inside swig templates
  - removed shadow, hamburger-mandat, logo-management-contract, logo-retraitespopulaires, map-card, section-bloc, tag, account, conditions, connection, jobs, signup-validation, signup, portailca-categories, portailca-homepage, portailca-subcategory, flat-form, flat, flats, shops, cip-basicpage-prevoyance, cip-homepage, light-page-mandats, cip-news, breadcrumb-extranet, form, immo-heading, teaser-basicpage, teaser-contact-cta, teaser-contact-detail, teaser-contact-placeholder, teaser-contact, teaser-institution, teaser-news, teaser-offer, teaser-profil, teaser-rental, attachements, attachments-contact, attachments-job, attachments-last-news, attachments-offers, attachments-rentals, form-contact-advisor, form-hypotheque, form-immo-alert, form-immo-contact, form-immo-search, form-immobilier, form-job-add-file, form-job-contactinfo, form-job-signin, form-job-signup, form-job-skill, form-offer-bella-vita, form-simulateur-libre-passage, form-simulateur-retraite, header-extranet, header-mandats, advisor, assurance-vie, calculateur-hypotheque, famille, homepage, managementcontracts, news, offre-bella-vita, particuliers, rp-jeune, simulateur-libre-passage, simulateur-retraite components
  - removed cards, loaders examples

### Changed

  - `.btn` class has to have the `.btn-primary` to be green
  - `.btn-default` is now the gray button
  - grouped lists components together
  - changed to `.form-control-label` in form-group instead of `.label`
  - rewrote components Pagination, Breadcrumb - Bootstrap way
  - swapped `<i>` to `<span>` for icons
  - re-exported favicons
  - improved the whole theme coloring system
  - improved typography
  - rewrote arrow component to `.btn-circle`
  - improved look and feel of styleguide


## Version 2

* 2.2.2 (2047-05-12)
 - Fix webform table likert

* 2.2.1 (2017-04-21)
 - ignore gemini test directory

* 2.2.0 (2017-04-21)
 - setup gemini for regression testing
 - apply numerous small improvements to various components

* 2.1.2 (2017-04-04)
 - fix logo SVG

* 2.1.0 (2017-04-04)
 - fix logo width
 - fix padding in search form in header
 - add likert styles for webform
 - remove background-funky-waves
 - fix focus effect on pretty links
 - fix form readonly styles
 - increase rp logo size in footer
 - fix form-group margins
 - fix pretty-link applied to all parapgraph links
 - display mailchimp error in red
 - fix card-attachment links in body
 - fix news tiles size on IE
 - add an atom managed-by-link
 - add button in header of light header

* 2.0.1 (2017-20-03)
 - Removed shadow on well
 - Add the "tag" component
 - Add Light page for Mandats
 - Fixed footer Mandats using theme
 - Fixed scrolling on styleguide

* 2.0.0 (2017-03-09)
 - Massive update styleguide
 - Add font alternative as font-mandant on body

* 1.8.4 (2017-02-10)
 - Added gallery components
 - Minor improvements on layout

* 1.8.3 (2017-02-02)
 - Fix eslint and gulp-eslint version to avoid conflict with futur rules
 - Fix issue crash styleguide build when rules warning on production, do it in development instead

* 1.8.2 (2017-02-01)
 - Refactoring on styleguide for easy fonts alternatives
 - Rename `.text-frutiger` to `.text-primary`
 - Rename `.text-cocon` to `.text-secondary`

* 1.0.4 (2016-12-21)
 - Fix teaser detail contact/advisor page links color

* 1.0.3 (2016-11-25)
 - Improvments hovers
 - Improvments on BigMenu
 - Fix Inline images on CKEditor

* 1.0.2 (2016-11-21)
  - Improvment for Bella vita detail page
  - Fix Big menu responsivness

* 1.0.1 (2016-11-10)
  - Safari bug fixes

* 1.0.0 (2016-11-09)
  - Fix icon-text component
  - First release for production

* 0.1.7 (2016-10-28)
  - Fix `npm publish` process to always build the styleguide before publishing to NPM
  - Fix 0.1.6 release by add the missing `/build` folder

* 0.1.6 (2016-10-28)
  - [NEW] Progress Bar for Mortgage calculator #63
  - Updated SVG icons
  - small ajustement on logo position

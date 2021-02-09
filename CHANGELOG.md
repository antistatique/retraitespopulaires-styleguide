CHANGELOG
=========
## NEXT RELEASE
- MD-682: Add images for new mail template

## 3.5.6 (2021-01-20)
MD-666: Styleguide - Bugfix couleurs

## 3.5.5 (2020-12-10)
MD-665: Ribbon on building card

## 3.5.4 (2020-08-26)
- Changes to make new version of ckeditor-accordion compatible

## 3.5.3 (2020-07-23)
- MD-626: Fix banner stretching on IE.

## 3.5.2 (2020-06-24)
- MD-628 : Fix rp homepage title margin
- MD-572 : add text-smaller class for mp font

## 3.5.1 (2020-06-23)
- Forget to bump package.json version

## 3.5.0 (2020-06-23)
- Add new Bella vita pages

## 3.4.2 (2020-04-21)
- MD-612: Add gray shadow style for links
- MD-613: Add icon for connect button

## 3.4.1 (2020-04-07)
- MD-610: Popover on hover

## 3.4.0 (2020-03-12)
 - Improve slider JS component with labels
 - Improve "Documents utiles" filters style
 - Improve "Documents utiles" cards list style
 - Make navbar sticky
 - Improve box-shadow style
 - Truncate cards text
 - Improve secondary-nav style
 - Remove back button
 - Remove hero image
 - Improve rich-text content style
 - Add some variant components to rich-text content

## 3.3.2 (2019-11-18)
 - MD-524: adapted space before and after collapse button 
 - MD-513: made body-font and mandants-font proxima-nova

## 3.3.1 (2019-07-30)
 - MD-448: Adapt button color when menu collapse is open
 
## 3.3.0 (2019-07-01)
 - MD-493: Mandants themes for popin
 
## 3.2.13 (2019-07-01)
 - MD-492: Fix accordion display
 
## 3.2.12 (2019-01-23)
 - add Jenkinsfile - MD-440
 - correct title for popin in mobile mode - MD-443

## 3.2.11 (2019-01-16)
 - correct styleguide build order to build icon before

## 3.2.10 (2019-01-16)
 - correct cache problem when release new icons font - MD-437

## 3.2.9 (2019-01-09)
 - improve pop-in - MD-361
 - add pager icon for first/last - MD-424

## 3.2.8 (2018-11-26)
 - add display for accordion module - MD-411

## 3.2.7 (2018-11-14)
 - add class to center caption under pdf thumbnails - MD-373

## 3.2.6 (2018-07-02)
 - add components QuickWin - MD-359

## 3.2.5 (2018-03-20)
 - fix uppy integration to be builded

## 3.2.4 (2018-03-20)
 - add uppy as new dependency - needed for advanced file uploader

## 3.2.3 (2018-01-31)
 - add new icon `retraitespopulaires-icon-external-link`
 - update all favicons for extranets (portailca, mp, accueil, regies & courtiers)

## 3.2.2 (2018-01-31)
 - remove light page
 - update documentation header/footer/menu
 - remove unecessary 'theme' option(s)
 - update the footer component markup
 - improve cta-card container responsivness
 - fix card-results files variant

## 3.2.1 (2017-12-15)
 - fix large screen logo-offset
 - improve mobile menu item button alignments with hamburger menu
 - reduce spaces/navbar spaces  as requested by Nicole
 - remove link-only variant of hamburger menu
 - remove themes colors of professions (assurance, prevoyance, immobilier, hypotheque, institutionnel)
 - fix card as CTA variant
 - fix organic-lines doc
 - rewamp the mobile menu with better design
 - fix organic-wrapper to allow click
 - improve pop-in
 - add throbber as gif

## 3.2.0 (2017-11-23)
 - add a popin component
 - refactor the navigation component with a simpler mobile menu ⚠️ **BREAKING**
 - remove big-menu components
 - remove swiper components

## 3.1.10 (2017-11-13)
 - fix pretty-link for IE10+ using border-bottom
 - add ckeditor link as btn
 - improve header height when no cover
 - add helper .text-small-90
 - add card variante for CTA
 - add card variante for background hover
 - add helpers flex
 - add 1.5 size icon
 - add new card size .card-md

## 3.1.9 (2017-11-13)
 - fix broken rp-bigmenu arrow outline color
 - add card variation when added in funky-waves
 - improve footer & rework bubbles socials

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

CHANGELOG
---------

## NEXT NEXT RELEASE
 - remove this module from removed dir
   - kint
   - menu_breadcrumb
   - rp_modulo
   - twig_extender
   - rp_exchange_rates

## NEXT RELEASE
 - add & configure Template Whisperer module - MD-374
 - migrate dynamic page templating using Template Whisperer instead of Config/State. - MD-374
 - add locker to mortgage import rates command - MD-351
 - correct some triggered error on administration page
 - correct a bug with Modulo calculator token - MD-364
 - remove raise error for updatedb before config-import - MD-351
 - remove quickwin css to move in styleguide - MD-359
 - update Drupal core to 8.5 - MD-379
 - correct all phpcs error - MD-380
 - remove deprecated usage - MD-380
 - remove rp_exchange_rates module that have no file - MD-380
 - add mail to arc-en-ciel - MD-376
 - fix datepicker - MD-372

## 2.4.2 (2018-06-06)
 - add Bamboo Twig integration
 - add LDAP integration for backend authentication - MD-162
 - improve Bella Vita - MD-177
 - change logout redirection
 - fix Webform download issues & images generations by removing spaces before <?php on .modules files

## 2.4.1 (2018-04-26)
 - apply patch - Remote Code Execution - SA-CORE-2018-004

## 2.4.0 (2018-04-11)
 - improve Solr search with a customs configuration in `config/solr`
 - add documentation about Solr integration with our custom config
 - remove unecessary processors of Search API, which override our custom config
 - remove indexation of jpg & wma files which break Drupal postquery highlighter
 - New Feature: QuickWin Teaser Form (PR #209)

## 2.3.11 (2018-03-28)
 - apply Drupal Security Update Patch - https://www.drupal.org/sa-core-2018-002

## 2.3.10 (2018-03-14)
 - add name field to popin

## 2.3.9 (2018-02-27) 
 - fix GTM popin tracking with custom event - MD-304

## 2.3.8 (2018-02-26)
 - fix vimeo error console when no vimeo video are present in the page
 - fix popin contact with uniq ID to avoid ajax error

## 2.3.7 (2018-02-14)
 - add new module 'rp_modulo' to provide custom code of Logistima Iframe
 - improve popin contact with validations - MD-304

## 2.3.6 (2018-01-31)
 - MD-311 - fix vimeo player when used on Safari

## 2.3.5 (2018-01-31)
 - add #MD-176 - add & enable health check module
 - add #MD-309 - add .ics as allowed file
 - update to styleguide 3.2.2

## 2.3.4 (2018-01-16)
 - MD-308 - fix form node_content_width broken which prevent user to submit forms.

## 2.3.3 (2018-01-15)
 - add ssh documentation to access Solr browser on eti & production env.
 - update Webform from beta-16 to rc-1
 - update to latest dev version of Template Whisperer
 - install modulo iframe into `/web/rpopulaires` (v11.01.2018)

## 2.3.2 (2017-12-15)
 - add ckeditor link as btn
 - add ckeditor title colors
 - improve breadcrumb fontsize
 - improve breadcrum spacing
 - add option to enable/disable contact CTA
 - add option to enable/disable contact popin
 - add new popine in every page which enable it
 - refactorint the whole navigation
 - remove the profils
 - update to styleguide 3.2.1
 - fix secondary-side navigation title margin-bottom
 - add vimeo support of highlighted card homepage
 - add new maintenance page

## 2.3.1 (2017-11-29)
 - Duplicate Webforms to add conversion tracking

## 2.3.0 (2017-11-13)
 - move product into is own module
 - remove unused 'related products'
 - add new module entity_clone
 - add new module ddanother
 - improve admin UX when creating new documents. Redirect him on the Admin Content page instead of the newly document.
 - fix node & npm engine restriction
 - update to drupal 8.3.7
 - remove updates notifications
 - update to styleguide ^3.1.9
 - add entity-updates on deploy

## 2.2.7 (2017-08-15)
 - remove survey ad snippet

## 2.2.6 (2017-08-08)
 - fix JCMS redirections on .htaccess

## 2.2.5 (2017-07-28)
 - update survey ad snippet to another survey

## 2.2.4 (2017-07-24)
 - update survey ad snippet to be less intrusive (especially on mobile)

## 2.2.3 (2017-07-20)
 - update survey ad snippet to be more visible

## 2.2.2 (2017-07-17)
 - Add survey ad snippet

## 2.2.1 (2017-06-23)
 - Update to Drupal 8.3.4

## 2.2.0 (2017-06-20)
 - Improved search page with facets
 - Improved search page empty state
 - Fixed favicons on MSIE

## 2.1.5 (2017-06-15)
 - Fixed favicons build styleguide
 - Remove node access check on search results (fixes results not showing for anonymous users)

## 2.1.4 (2017-06-14)
 - Added Yarn lock to used the latest version of styleguide

## 2.1.3 (2017-06-14)
 - Use Yarn - still bugged

## 2.1.2 (2017-06-14)
 - Use Yarn instead of NPM for deploy styleguide

## 2.1.1 (2017-06-14)
 - Fix rates cache cleared by `rp:mortgage:import-rates`
 - Improved webforms by Retraites Populaires

## 2.1.0 (2017-06-02)
 - Apply new header
 - Fix component card
 - Fix btn-outline component

## 2.0.3 (2017-06-01)
 - Fix Removed "theme" state config that remove template for page (Promise of Template Whisperer)

## 2.0.2 (2017-05-23)
 - Change the Newsletter subscription message
 - Update webform config for form IMM

## 2.0.1 (2017-05-18)
 - Fix contact teaser cover image

## 2.0.0 (2017-05-18)
 - Implementation of Styleguide Retraites Populaires v3

## 1.3.3 (2017-05-16)
 - Fix radios buttons with fieldset legend before
 - Fix deploy permissions before cleanup

## 1.3.2 (2017-05-16)
 - finalize configurations for landing pages

## 1.3.1 (2017-05-15)
 - Fixed issue, attached files/news to news node doesn't appear on the bottom of the page

## 1.3.0 (2017-05-12)
 - Update to Drupal 8.3.1
 - Add Landing Pages
 - Add Webform
 - Massive refactoring layout
 - Prepare Layout Twig for version 2.0 - breaking changes everywhere (Styleguide 3.0)
 - For now fix version of Styleguide to ^2.0

## 1.2.5 (2017-02-21)
 - Added Gallery to Buildings content type
 - Added Feedback e-mail to every contact forms
 - Added Winner e-mail for Bella Vita

## 1.2.0 (2017-01-23)
 - Added Simulatore "Police de Libre Passage (PLP)"
 - Improved conjuction of Search API with OR
 - Added "Usefull document(s)" on News body
 - Improved Bella Vita admin & export

## 1.1.8 (2016-12-21))
 - Added ConversionForm (Demande de conversion d'un taux variable en taux fixe)
 - Added DepreciationForm (Demande de modification de l'amortissement du 1er rang)
 - Added TaxAttestationForm (Demande d'attestation d'intérêts)
 - Added LoanIncreaseForm (Demande d'augmentation de prêt)
 - Added BuildingForm (Demande de réservation d'un taux)
 - Fix issue on admin hen an Offer is deleted and already has subscribers
 - Improve cachability of list and purge of them

## 1.1.7 (2016-12-01)
 - Metatags og:image resized

## 1.1.6 (2016-12-01)
 - Remove kint from module dependencies

## 1.1.5 (2016-12-01)
 - Solr integration finalized
 - Metatags integration and configuration

## 1.1.3 (2016-12-01)
 - Fix rates imports dates
 - Improve cache of rates

## 1.1.2 (2016-12-01)
 - Update Drupal to 8.2.3

## 1.1.1 (2016-11-28)
 - Fix error when searching by NPA

## 1.1.0 (2016-11-25)
 - New ACL Bella vita
 - Query condition using timezone (News)
 - New Empty State Search by NPA
 - Solr integration
 - Attachments for every Content Types & Checkbox for random
 - Improvment  Mortgage tables
 - Open Graph
 - Fix breadcrumb color on Building
 - FAQ & Documents collection use color of selected filter profession
 - Fix filter products
 - Add Body to every Forms
 - Improvment Bella vita detail page

## 1.0.3 (2016-11-18)
 - Fix typo `Changement d'adresses` to `Changement d'adresse`

## 1.0.2 (2016-11-18)
 - Add body to mails `contact_address` and  `contact_documents`
 - Fix bug list attached FAQs even if unpublished

## 1.0.1 (2016-11-10)
 - Add link to contact page in contact attachments block
 - Open Google Search in a new windows
 - Fix Safari alignment on home

## 1.0.0 (2016-11-09)
 - Fix table rates theme colors
 - Fix tel: links
 - Fix icon-text components
 - Remove Advisor from body rates

## 0.9.0 (2016-11-09)
 - Initial release

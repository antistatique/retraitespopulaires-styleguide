<?php

define('DRUPAL_DIR', __DIR__ .'/..');

use Drupal\Core\DrupalKernel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;

$redirections = array(
    '/internet/c_5000/accueil'                                                                                                           => '',
    '/internet/c_5145/-particuliers'                                                                                                     => '/node/8',
    '/internet/pr1_10193/connexion-a-l-extranet'                                                                                         => '/node/90',
    '/internet/pr1_9903/ressources-humaines'                                                                                             => '/node/282',
    '/internet/pr1_32125/differents-espaces'                                                                                             => '/node/90',
    '/internet/pr1_32133/espace-intermediaires'                                                                                          => '/node/90',
    '/internet/pr1_15023/developpement-durable'                                                                                          => '/node/281',
    '/internet/pr1_32860/prix-du-patrimoine-vaudois'                                                                                     => '/node/274',
    '/internet/c_5149/-actualite'                                                                                                        => '/node/180',
    '/internet/pr1_11103/formulaires'                                                                                                    => '/node/299',
    '/internet/c_5038/calculateur-d-hypotheque'                                                                                          => '/node/86',
    '/internet/pr1_42285/hypotheque-et-credit'                                                                                           => '/node/208',
    '/internet/pr1_9922/contact'                                                                                                         => '/node/95',
    '/internet/pr1_32503/taux-pour-pret-aux-collectivites'                                                                               => '/node/270',
    '/internet/c_5075/emploi'                                                                                                            => '/node/249',
    '/internet/rp1_7623/preparer-l-avenir-de-mes-enfants'                                                                                => '/node/15',
    '/internet/pr1_70463/immobilier-pour-la-vie-des-vaudois-et-pour-les-entreprises'                                                     => '/node/47',
    '/internet/rp1_9245/bella-vita'                                                                                                      => '/node/180',
    '/internet/rp1_6860/constructions-terminees'                                                                                         => '/node/78',
    '/internet/pr1_9944/assurance-vie-et-prevoyance'                                                                                     => '/node/104',
    '/internet/rp1_8619/places-de-parc-a-louer'                                                                                          => '/node/70',
    '/internet/pr1_32895/constructions-en-cours'                                                                                         => '/node/78',
    '/internet/rp1_6076/clement'                                                                                                         => '/node/213',
    '/internet/c_5015/produits'                                                                                                          => '/node/54',
    '/internet/pr1_67048/les-balcons-du-mont'                                                                                            => '/node/101',
    '/internet/pr1_20357/prevoyance-professionnelle-pour-les-entreprises-vaudoises-et-leurs-employes'                                    => '/node/46',
    '/internet/pr1_50615/philippe-doffey-directeur-general'                                                                              => '/node/223',
    '/internet/rp1_7496/rp-refuge'                                                                                                       => '/node/112',
    '/internet/c_5030/questions-reponses'                                                                                                => '/node/199',
    '/internet/rp1_6446/questions-frequentes-avant-d-emmenager'                                                                          => '/node/199',
    '/internet/pr1_12874/contact'                                                                                                        => '/node/104',
    '/internet/pr1_15985/ou-puis-je-trouver-les-annonces-d-appartements-a-louer'                                                         => '/node/146',
    '/internet/c_5148/-entreprises'                                                                                                      => '/node/38',
    '/internet/pr1_12493/quelles-assurances-dois-je-conclure'                                                                            => '/node/148',
    '/internet/p_102577/conferences-accession-a-la-propriete-et-prevoyance-comment-prendre-les-bonnes-decisions'                         => '/node/209',
    '/internet/pr1_39123/3e-pilier-b'                                                                                                    => '/node/54',
    '/internet/pr1_9944/assurance-vie-pour-particuliers'                                                                                 => '/node/104',
    '/internet/pr1_40219/la-raison-sociale-retraites-populaires'                                                                         => '/node/228',
    '/internet/pr1_33076/culture'                                                                                                        => '/node/204',
    '/internet/pr1_67919/projets-professionnels'                                                                                         => '/node/18',
    '/internet/pr1_48535/formulaires-pour-employeurs'                                                                                    => '/node/299',
    '/internet/c_5047/mandats-de-gestion'                                                                                                => '/node/63',
    '/internet/rp1_7933/profelia'                                                                                                        => '/node/139',
    '/internet/pr1_9744/ethique-et-qualite'                                                                                              => '/node/279',
    '/internet/rp1_9279/rapports-annuels'                                                                                                => '/node/268',
    '/internet/pr1_23411/les-ramiers'                                                                                                    => '/node/168',
    '/internet/dp_5426/rp-epargne'                                                                                                       => '/node/107',
    '/internet/rp1_7591/rp-arc-en-ciel'                                                                                                  => '/node/169',
    '/internet/p_99559/les-balcons-du-mont-locaux-administratifs-et-commerciaux'                                                         => '/node/101',
    '/internet/pr1_18897/histoire-de-retraites-populaires'                                                                               => '/node/227',
    '/internet/rp1_8640/changement-de-situation-personnelle'                                                                             => '/node/75',
    '/internet/c_5065/revue-de-presse'                                                                                                   => '/node/180',
    '/internet/pr1_40225/identite-de-marque'                                                                                             => '/node/228',
    '/internet/p_98419/pour-que-vos-enfants-puissent-realiser-leurs-projets'                                                             => '/node/185',
    '/internet/rp1_8633/assistance-technique'                                                                                            => '/node/73',
    '/internet/p_96729/quel-taux-de-conversion-et-comment-s-applique-la-methode-du-splitting'                                            => '/node/170',
    '/internet/pr1_12625/baudry'                                                                                                         => '/node/94',
    '/internet/pr1_69864/le-conseil-d-etat-nomme-jean-robert-yersin-a-la-presidence-du-conseil-d-administration-de-retraites-populaires' => '/node/256',
    '/internet/pr1_32131/espace-regies'                                                                                                  => '/node/90',
    '/visitesvirtuelles/balconsdumont/3p5-141-502.html'                                                                                  => '/node/101',
    '/internet/rp1_6297/assurance-vie-retraites-populaires-pour-les-projets-de-vie-des-vaudois'                                          => '/node/45',
    '/internet/pr1_33362/prix-du-patrimoine-vaudois'                                                                                     => '/node/274',
    '/internet/pr1_20479/le-2e-pilier-de-votre-corps-de-metier'                                                                          => '/node/62',
    '/internet/mm_6098/faire-fructifier-son-patrimoine'                                                                                  => '/node/12',
    '/internet/rp1_7717/preparer-sa-retraite'                                                                                            => '/node/25',
    '/internet/rp1_7733/preparer-sa-succession'                                                                                          => '/node/17',
    '/internet/rp1_6158/profiter-de-la-retraite'                                                                                         => '/node/26',
    '/internet/rp1_7623/garantir-l-avenir-de-ses-enfants'                                                                                => '/node/15',
    '/internet/pr1_12492/a-combien-se-monte-la-garantie-que-je-dois-deposer-pour-mon-appartement'                                        => '/node/147',
    '/internet/rp1_6947/parc-immobilier-administre'                                                                                      => '/node/78',
    '/internet/pr1_10153/autre-sujet'                                                                                                    => '/node/245',
    '/internet/rp1_7717/preparer-ma-retraite'                                                                                            => '/node/25',
    '/internet/rp1_8716/vendez-vous-votre-bien-immobilier'                                                                               => '/node/81',
    '/internet/p_96323/oliveira'                                                                                                         => '/node/162',
    '/internet/pr1_17538/pour-de-l-immobilier-responsable'                                                                               => '/node/190',
    '/internet/mm_6235/plateforme-de-gestion-dinstitutions-de-prevoyance-autonomes-romandes'                                             => '/node/63',
    '/internet/pr1_87222/forum-de-la-prevoyance'                                                                                         => '/node/276',
    '/internet/pr1_32136/espace-employeurs'                                                                                              => '/node/90',
    '/internet/rp1_7246/hypotheque-et-credit-pour-construire-l-avenir-des-vaudois'                                                       => '/node/48',
    '/internet/pr1_10978/oyon'                                                                                                           => '/node/221',
    '/internet/rp1_7712/proteger-ses-proches'                                                                                            => '/node/16',
    '/internet/p_103715/accession-a-la-propriete-les-bonnes-decisions'                                                                   => '/node/184',
    '/internet/pr1_27567/mantero'                                                                                                        => '/node/163',
    '/internet/pr1_57078/rp-securifonds'                                                                                                 => '/node/113',
    '/internet/pr1_35933/agence-d-yverdon-les-bains'                                                                                     => '/node/219',
    '/internet/rp1_8263/qu-en-est-il-du-3e-pilier-en-cas-de-divorce'                                                                     => '/node/128',
    '/internet/c_5029/particuliers'                                                                                                      => '/node/8',
    '/internet/rp1_8237/quest-ce-quun-3e-pilier-a-ou-prevoyance-liee'                                                                    => '/node/129',
    '/internet/pr1_29576/comment-preparer-ma-candidature-a-la-location-d-un-appartement'                                                 => '/node/145',
    '/internet/rp1_5938/rp-rente-differee'                                                                                               => '/node/109',
    '/internet/pr1_32495/taux-hypothecaires'                                                                                             => '/node/87',
    '/internet/pr1_60154/organes'                                                                                                        => '/node/224',
    '/internet/pr1_35822/espace-du-locataire'                                                                                            => '/node/72',
    '/internet/rp1_8183/caisse-cantonale-dassurance-populaire-ccap'                                                                      => '/node/140',
    '/internet/pr1_12497/puis-je-avoir-un-animal-de-compagnie'                                                                           => '/node/149',
    '/internet/pr1_9845/site-internet'                                                                                                   => '/node/50',
    '/internet/pr1_42285/fr/pret-et-credit'                                                                                              => '/node/94',
    '/internet/rp1_6158/profiter-de-ma-retraite'                                                                                         => '/node/26',
    '/internet/rp1_7688/vivre-un-changement-professionnel'                                                                               => '/node/68',
    '/internet/rp1_8756/credit-de-construction'                                                                                          => '/node/83',
    '/internet/rp1_7688/transiter-entre-deux-emplois'                                                                                    => '/node/68',
    '/internet/c_5125/retraites-populaires-accueil'                                                                                      => '/node/?',
    '/internet/p_99772/borgeaud-7b'                                                                                                      => '/node/99',
    '/internet/pr1_9739/le-specialiste-vaudois-de-lassurance-vie-et-de-la-prevoyance-professionnelle'                                    => '/node/203',
    '/internet/pr1_40258/le-logo-retraites-populaires'                                                                                   => '/node/230',
    '/internet/pr1_11114/formulaires-de-prevoyance-professionnelle'                                                                      => '/node/?',
    '/internet/pr1_27698/rp-rente-immediate-certaine'                                                                                    => '/node/108',
    '/internet/pr1_95377/ladies-happy-hour'                                                                                              => '/node/167',
    '/internet/pr1_11330/schmid'                                                                                                         => '/node/132',
    '/internet/pr1_9932/location-appartements'                                                                                           => '/node/100',
    '/internet/pr1_9929/contact'                                                                                                         => '/node/100',
    '/internet/c_5064/infos-et-communiques'                                                                                              => '/node/180',
    '/internet/p_104044/un-nouveau-batiment-au-biopole-accueillera-des-2018-des-entreprises-actives-dans-les-sciences-de-la-vie'         => '/node/181',
    '/internet/p_103468/retraites-populaires-est-fermee-le-lundi-du-jeune'                                                               => '/node/183',
    '/internet/pr1_86838/small-is-beautiful-j-ai-gagne-en-qualite-de-vie'                                                                => '/node/186',
    '/internet/p_103911/bkw-et-sireso-saccordent-sur-leur-participation-dans-swissgrid'                                                  => '/node/182',
    '/internet/p_96000/formulaires-relatifs-aux-assurances-de-capitaux'                                                                  => '/node/199',
    '/internet/rp1_6054/caisse-de-pensions-de-l-etat-de-vaud-cpev'                                                                       => '/node/130',
    '/internet/p_100374/inscription-a-savoir-faire'                                                                                      => '/node/180',
    '/internet/pr1_20415/comment-racheter-des-annees-de-cotisations-de-mon-2e-pilier'                                                    => '/node/172',
    '/internet/rp1_6739/pellegri'                                                                                                        => '/node/161',
    '/internet/pr1_41302/savoir-faire'                                                                                                   => '/node/180',
    '/internet/pr1_60159/retraites-populaires-fondation-de-prevoyance-complementaire'                                                    => '/node/329',
    '/internet/c_5084/changement-d-adresse'                                                                                              => '/node/273',
    '/internet/hg_5481/glossaire'                                                                                                        => '/node/207',
    '/internet/pr1_95840/formulaires'                                                                                                    => '/node/120',
    '/internet/pr1_59654/viteos-orchestre-les-energies-a-neuchatel-avec-un-financement-de-retraites-populaires'                          => '/node/370',
    '/internet/pr1_76927/entrepreneurs-prevoyance-professionnelle-et-assurance-vie'                                                      => '/node/166',
    '/internet/pr1_20721/comment-fonctionne-une-rente-viagere-chez-retraites-populaires'                                                 => '/node/103',
    '/internet/rp1_8201/caisse-de-pensions-eca-rp'                                                                                       => '/node/142',
    '/internet/pr1_42016/rp-rente-immediate-certaine-un-produit-qui-complete-loffre-de-retraites-populaires'                             => '/node/108',
    '/internet/pr1_35177/tri-des-dechets'                                                                                                => '/node/77',
    '/internet/pr1_60791/prevoyance-pour-entreprises'                                                                                    => '/node/132',
    '/internet/pr1_20429/comment-acquerir-son-logement-grace-au-2e-pilier'                                                               => '/node/173',
    '/plugins/NewsletterPlugin/jsp/preview.jsp?id=p_97965&format=html'                                                                   => '/node/-',
    '/internet/pr1_57140/rp-jeune'                                                                                                       => '/node/106',
    '/internet/p_97924/rp-jeune-l-epargne-a-la-carte'                                                                                    => '/node/-',
    '/internet/rp1_7733/preparer-ma-succession'                                                                                          => '/node/17',
    '/internet/rp1_8753/pret-hypothecaire'                                                                                               => '/node/82',
    '/internet/rp1_8822/pret-aux-collectivites'                                                                                          => '/node/85',
    '/internet/pr1_73083/jean-christophe-van-tilborgh-directeur'                                                                         => '/node/265',
    '/internet/pr1_73084/alain-lapaire-directeur'                                                                                        => '/node/266',
    '/internet/pr1_73086/raphael-putallaz-directeur'                                                                                     => '/node/262',
    '/internet/pr1_66131/partenaire-de-vos-projets'                                                                                      => '/node/231',
    '/internet/pr1_73085/johnny-perera-directeur'                                                                                        => '/node/267',
    '/internet/rp1_8647/paiement-du-loyer'                                                                                               => '/node/74',
    '/internet/pr1_20307/le-2e-pilier-des-medecins-vaudois'                                                                              => '/node/340',
    '/internet/rp1_7532/rp-entreprise'                                                                                                   => '/node/216',
    '/internet/pr1_12783/conseillers-en-pret-et-credit'                                                                                  => '/node/96',
    '/internet/dp_5382/rp-duo-primes-periodiques'                                                                                        => '/node/110',
    '/internet/pr1_68097/contact'                                                                                                        => '/node/235',
    '/internet/hg_5426/acquerir-un-logement'                                                                                             => '/node/82',
    '/visitesvirtuelles/balconsdumont/4p5-137-401.html'                                                                                  => '/node/101',
    '/internet/pr1_42898/agence-de-nyon'                                                                                                 => '/node/143',
    '/internet/pr1_95865/commande-de-documents'                                                                                          => '/node/120',
    '/internet/rp1_7334/epargner-en-toute-securite'                                                                                      => '/node/10',
    '/internet/rp1_6898/location-d-objets-immobiliers-pour-la-vie-des-vaudois-et-pour-les-entreprises'                                   => '/node/69',
    '/internet/pr1_19389/partenariats-et-evenements'                                                                                     => '/node/204',
    '/internet/rp1_7339/rp-rente-immediate'                                                                                              => '/node/102',
    '/internet/pr1_14118/contactez-nous'                                                                                                 => '/node/50',
    '/internet/pr1_35929/agence-de-lausanne-et-siege'                                                                                    => '/node/218',
    '/internet/pr1_67652/organisation-de-l-activite-de-prevoyance-professionnelle'                                                       => '/node/317',
    '/internet/rp1_7943/caisse-de-pensions-du-personnel-communal-de-lausanne-cpcl'                                                       => '/node/141',
    '/internet/c_5028/questions-reponses'                                                                                                => '/node/199',
    '/internet/pr1_50264/reglements'                                                                                                     => '/node/299',
    '/internet/pr1_79190/foret-10'                                                                                                       => '/node/255',
    '/internet/rp1_7156/rp-duo-prime-unique'                                                                                             => '/node/111',
    '/internet/rp1_7004/conseil-d-administration'                                                                                        => '/node/225',
    '/internet/mm_6098/faire-fructifier-mon-patrimoine'                                                                                  => '/node/12',
    '/internet/p_103560/retraites-populaires-recoit-le-prix-de-l-immobilier-2016-pour-sa-tour-du-mont'                                   => '/node/164',
    '/internet/pr1_9701/rp-entreprise'                                                                                                   => '/node/216',
    '/internet/rp1_8146/contact-prevoyance-professionnelle'                                                                              => '/node/46',
    '/internet/pr1_67684/plans-complementaires'                                                                                          => '/node/61',
    '/internet/pr1_39122/3e-pilier-a'                                                                                                    => '/node/54',
    '/internet/pr1_42747/articles'                                                                                                       => '/node/180',
    '/internet/p_103477/accession-a-la-propriete-les-bonnes-decisions'                                                                   => '/node/184',
    '/internet/pr1_83566/racheter-des-annees-pour-optimiser-sa-prevoyance-professionnelle'                                               => '/node/180',
    '/internet/pr1_60157/retraites-populaires-fondation-de-prevoyance'                                                                   => '/node/215',
    '/internet/pr1_95267/ladies-happy-hour-debarque-en-2016-sur-la-tele-et-les-reseaux-sociaux-de-retraites-populaires'                  => '/node/167',
    '/internet/pr1_48493/appartements-a-louer'                                                                                           => '/node/29',
    '/internet/hg_5456/comite-de-direction'                                                                                              => '/node/226',
    '/internet/hg_5469/doffey'                                                                                                           => '/node/223',
    '/internet/rp1_7821/pret-sur-police'                                                                                                 => '/node/84',
    '/internet/rp1_9068/impressum'                                                                                                       => '/node/200',
    '/internet/rp1_7616/payer-moins-d-impots'                                                                                            => '/node/11',
    '/internet/pr1_70612/mentions-juridiques'                                                                                            => '/node/201',
    '/internet/pr1_73048/alain-pahud-directeur-general-adjoint'                                                                          => '/node/263',
    '/internet/pr1_70018/comment-lire-la-situation-de-sa-police-de-libre-passage-rp-arc-en-ciel'                                         => '/node/171',
    '/internet/pr1_73070/eric-niederhauser-directeur'                                                                                    => '/node/264',
    '/internet/rp1_7712/proteger-mes-proches'                                                                                            => '/node/16',
    '/internet/pr1_50266/documents'                                                                                                      => '/node/299',
    '/internet/pr1_30882/securite-de-l-appartement-pendant-les-vacances'                                                                 => '/node/76',
    '/internet/pr1_28347/campagnes-pub'                                                                                                  => '/node/231',
    '/internet/pr1_9933/entretien-appartements'                                                                                          => '/node/50',
    '/internet/pr1_40362/le-temps-de-construire-un-futur-a-sa-mesure'                                                                    => '/node/231',
    '/internet/pr1_40393/l-immobilier-est-aussi-notre-metier'                                                                            => '/node/231',
    '/internet/pr1_28363/les-memes-conditions-pour-tous-les-clients'                                                                     => '/node/231',
    '/internet/pr1_40415/l-assurance-vie-est-aussi-notre-metier'                                                                         => '/node/231',
    '/internet/pr1_40381/le-pret-hypothecaire-est-aussi-notre-metier'                                                                    => '/node/231',
    '/internet/pr1_40399/la-prevoyance-professionnelle-est-aussi-notre-metier'                                                           => '/node/231',
    '/internet/pr1_40352/le-temps-de-prevoir-un-futur-a-sa-mesure'                                                                       => '/node/231',
    '/internet/rp1_7926/caisse-intercommunale-de-pensions-cip'                                                                           => '/node/133',
    '/internet/pr1_28373/c-est-notre-difference'                                                                                         => '/node/231',
    '/internet/pr1_35799/siege-de-retraites-populaires-a-lausanne'                                                                       => '/node/218',
);

// Bootstrap Drupal 8
$autoloader = require_once DRUPAL_DIR . '/autoload.php';
$request = Request::createFromGlobals();
$kernel = DrupalKernel::createFromRequest($request, $autoloader, 'prod');
$kernel->boot();

$request_uri = $request->getRequestUri();

if (isset($redirections[$request_uri])) {
    $response = new RedirectResponse($redirections[$request_uri]);
} else {
    $response = new RedirectResponse('/');
}
$response->send();

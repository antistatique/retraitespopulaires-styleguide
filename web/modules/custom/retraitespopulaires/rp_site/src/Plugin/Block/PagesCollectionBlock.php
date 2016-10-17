<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\PagesCollectionBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\State\StateInterface;
use \Drupal\Core\Menu\MenuLinkTreeInterface;

/**
* Provides a 'Pages Collection' Block
*
* @Block(
*   id = "rp_site_pages_collection_block",
*   admin_label = @Translation("Pages Collection block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_pages_collection_block')
* </code>
*/
class PagesCollectionBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
    * entity_query to query Node's Contest
    * @var QueryFactory
    */
    private $entity_query;

    /**
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    private $state;

    /**
    * Defines for loading, transforming and rendering menu link trees.
    * @var MenuLinkTreeInterface
    */
    private $menu_tree;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, StateInterface $state, MenuLinkTreeInterface $menu_tree) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->state           = $state;
        $this->menu_tree       = $menu_tree;
    }

    /**
    * {@inheritdoc}
    */
    public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
        // Instantiates this form class.
        return new static(
            // Load the service required to construct this class.
            $configuration,
            $plugin_id,
            $plugin_definition,
            // Load customs services used in this class.
            $container->get('state'),
            $container->get('menu.link_tree')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array('pages' => []);

        $parameters = $this->menu_tree->getCurrentRouteMenuTreeParameters('profil');
        $parameters->onlyEnabledLinks();
        $parameters->expandedParents = array();

        // Transform the tree using the manipulators you want.
        $manipulators = array(
            // Use the default sorting of menu links.
            array('callable' => 'menu.default_tree_manipulators:generateIndexAndSort'),
        );

        if ($params['node']->nid->value == $this->state->get('rp_site.settings.profils.individual')['nid']) {
            $parameters->setRoot($this->state->get('rp_site.settings.profils.individual')['menu']);
            $tree = $this->menu_tree->load('profil', $parameters);

            $manipulators_project = $manipulators;
            $manipulators_project['project'] = array('callable' => 'rp_site.menu_transformers:getIndividualProjectOnly');
            $variables['profil'][] = array(
                'title' => t('Vous avez un nouveau projet ?'),
                'menu'  => $this->menu_tree->transform($tree, $manipulators_project),
            );

            $tree = $this->menu_tree->load('profil', $parameters);
            $manipulators_client = $manipulators;
            $manipulators_client['client'] = array('callable' => 'rp_site.menu_transformers:getIndividualClientOnly');
            $variables['profil'][] = array(
                'title' => t('Déja assuré ?'),
                'menu'  => $this->menu_tree->transform($tree, $manipulators_client),
            );
        }

        if ($params['node']->nid->value == $this->state->get('rp_site.settings.profils.company')['nid']) {
            $parameters->setRoot($this->state->get('rp_site.settings.profils.company')['menu']);
            $tree = $this->menu_tree->load('profil', $parameters);
            $variables['profil'][] = array(
                'title' => t('Vous êtes une entreprise ?'),
                'menu'  => $this->menu_tree->transform($tree, $manipulators),
            );
        }

        if ($params['node']->nid->value == $this->state->get('rp_site.settings.profils.public')['nid']) {
            $parameters->setRoot($this->state->get('rp_site.settings.profils.public')['menu']);
            $tree = $this->menu_tree->load('profil', $parameters);
            $variables['profil'][] = array(
                'title' => t('Vous êtes une collectivités publiques ?'),
                'menu'  => $this->menu_tree->transform($tree, $manipulators),
            );
        }

        return [
            '#theme'     => 'rp_site_pages_collection_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path',
                    'url.query_args'
                ],
            ]
        ];
    }
}

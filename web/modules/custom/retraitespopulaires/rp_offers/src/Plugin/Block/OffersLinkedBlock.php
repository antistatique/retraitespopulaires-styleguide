<?php

/**
* @file
* Contains \Drupal\rp_offers\Plugin\Block\OffersLinkedBlock.
*/

namespace Drupal\rp_offers\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\rp_site\Service\Profession;

/**
* Provides a 'Linked Offers' Block
*
* @Block(
*   id = "rp_offers_linked_block",
*   admin_label = @Translation("Linked Offers block"),
* )
*
* Inline example:
* <code>
* load_block('rp_offers_linked_block')
* </code>
*/
class OffersLinkedBlock extends BlockBase implements ContainerFactoryPluginInterface {
    /**
    * entity_query to query Node's Contest
    * @var QueryFactory
    */
    private $entity_query;

    /**
    * EntityTypeManagerInterface to load Request Offer
    * @var EntityTypeManagerInterface
    */
    private $entity_offer;

    /**
    * Current Route
    * @var CurrentRouteMatch
    */
    private $route;

    /**
     * Profession Service
     * @var Profession
     */
    private $profession;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, QueryFactory $query, CurrentRouteMatch $route, Profession $profession) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_offer = $entity->getStorage('node');
        $this->entity_query = $query;
        $this->route        = $route;
        $this->profession   = $profession;

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
            $container->get('entity_type.manager'),
            $container->get('entity.query'),
            $container->get('current_route_match'),
            $container->get('rp_site.profession')
        );
    }

    /**
     * {@inheritdoc}
     */
    public function build($params = array()) {
        $variables = array('offers' => []);
        $node = $this->route->getParameter('node');
        if (!empty($node) && $node->getType() == 'news') {
            $offers = array();
            foreach ($node->field_offer as $offer) {
                $offers[] = $offer->target_id;
            }

            if (!empty($offers)) {

                $query = $this->entity_query->get('node')
                    ->condition('type', 'offer')
                    ->condition('status', 1)
                    ->condition('nid', $offers, 'IN')
                    ->sort('field_date_end', 'DESC')
                ;

                $nids = $query->execute();
                $variables['offers'] = $this->entity_offer->loadMultiple($nids);
            }
        }

        return [
            '#theme'     => 'rp_offers_linked_block',
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

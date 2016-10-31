<?php
/**
* @file
* Contains \Drupal\rp_contact\Controller\SearchZipController.
*/

namespace Drupal\rp_contact\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Render\Renderer;
use Drupal\Core\Database\Connection;

/**
* SearchZipController.
*/
class SearchZipController extends ControllerBase {

    /**
    * EntityTypeManagerInterface to load Nodes
    * @var EntityTypeManagerInterface
    */
    private $entity_node;

    /**
    * Turns a render array into a HTML string
    * @var Renderer
    */
    private $renderer;

    /**
    * The current active database's master connection
    * @var Connection
    */
    private $database;

    /**
    * Class constructor.
    */
    public function __construct(EntityTypeManagerInterface $entity, Renderer $renderer, Connection $database) {
        $this->entity_node = $entity->getStorage('node');
        $this->renderer    = $renderer;
        $this->database    = $database;
    }

    /**
    * {@inheritdoc}
    */
    public static function create(ContainerInterface $container) {
        // Instantiates this form class.
        return new static(
            // Load customs services used in this class.
            $container->get('entity_type.manager'),
            $container->get('renderer'),
            $container->get('database')
        );
    }

    /**
    * Ajax Advisors (Conseillers) search by NPA.
    */
    public function advisors($zip) {
        $variables = array();

        // Retrieve all matched terms with the searched link
        $query = $this->database->select('node_field_data', 'n');
        $query->join('node__field_zip_codes', 'zip', 'zip.entity_id = n.nid');
        $query->join('taxonomy_term__field_zip_code', 't', 't.entity_id = zip.field_zip_codes_target_id');
        $query->fields('n')
            ->condition('n.status', 1)
            ->condition('n.type', 'advisor')
            ->condition('t.field_zip_code_value', $zip)
            ->orderBy('n.title', 'DESC');
        ;
        $result = $query->execute();

        // List of nodes
        $nids = array();
        foreach ($result as $node) {
            $nids[$node->nid] = $node->nid;
        }

        $variables['advisors'] = $this->entity_node->loadMultiple($nids);

        // Ajax - renderrender the view whitout all the template
        $params = [
            '#theme'     => 'rp_contact_search_zip_page',
            '#variables' => $variables,
        ];
        echo $this->renderer->render($params);
        die();
    }



}

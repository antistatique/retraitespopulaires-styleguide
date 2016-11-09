<?php
/**
* @file
* Contains \Drupal\rp_offers\Form\AdminFilterRequestsForm.
*/

namespace Drupal\rp_offers\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;

class AdminFilterRequestsForm extends FormBase {

    /**
    * EntityTypeManagerInterface to load Nodes
    * @var EntityTypeManagerInterface
    */
    private $entity_node;

    /**
    * entity_query to query Node's Request
    * @var QueryFactory
    */
    private $entity_query;

    /**
     * Class constructor.
     */
    public function __construct(EntityTypeManagerInterface $entity, QueryFactory $query) {
        $this->entity_node  = $entity->getStorage('node');
        $this->entity_query = $query;
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container) {
      // Instantiates this form class.
      return new static(
        // Load the service required to construct this class.
        $container->get('entity_type.manager'),
        $container->get('entity.query')
      );
    }

    /**
    * {@inheritdoc}.
    */
    public function getFormId() {
        return 'rp_offers_admin_filter_requests_form';
    }

    /**
    * {@inheritdoc}
    */
    public function buildForm(array $form, FormStateInterface $form_state, $extra = NULL) {
        $form['#method'] = 'GET';

        $options = array();
        $query = $this->entity_query->get('node')
            ->condition('type', 'offer')
            ->condition('status', 1)
        ;
        $nids = $query->execute();
        $offers = $this->entity_node->loadMultiple($nids);
        foreach ($offers as $offer) {
            $options[$offer->nid->value] = $offer->title->value;
        }

        $form['filter'] = array(
            '#type'   => 'select',
            '#title'  => 'Filtrer par coupon',
            '#options' => $options
        );

        $form['actions']['submit'] = array(
            '#type'        => 'submit',
            '#value'       => t('Filtrer'),
            '#prefix'      => '<div class="form-actions">',
            '#suffix'      => '</div>'
        );

        return $form;
    }

    /**
    * {@inheritdoc}
    */
    public function submitForm(array &$form, FormStateInterface $form_state) { }
}

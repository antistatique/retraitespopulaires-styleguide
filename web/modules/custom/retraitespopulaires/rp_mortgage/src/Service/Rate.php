<?php
namespace Drupal\rp_mortgage\Service;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;

class Rate
{
    /**
     * @var \Drupal\Core\Entity\Query\QueryFactory
     */
    private $entityQuery;

    /**
     * @var \Drupal\Core\Entity\EntityStorageInterface
     */
    private $entity_rate;

    /**
     * Rate constructor.
     *
     * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity
     * @param \Drupal\Core\Entity\Query\QueryFactory         $entityQuery
     */
    public function __construct(EntityTypeManagerInterface $entity, QueryFactory $entityQuery) {
        $this->entity_rate = $entity->getStorage('rp_mortgage_rate');
        $this->entity_query = $entityQuery;
    }

    /**
     * @param string $type
     *
     * @return \Drupal\Core\Entity\EntityInterface[]
     */
    public function getRates($type) {
        $query = $this->entity_query->get('rp_mortgage_rate')
            ->condition('type', $type)
            ->sort('year', 'ASC')
        ;

        $ids = $query->execute();
        $rates = $this->entity_rate->loadMultiple($ids);

        return $rates;
    }
}

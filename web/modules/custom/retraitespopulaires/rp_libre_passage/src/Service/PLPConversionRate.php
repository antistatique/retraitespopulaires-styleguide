<?php
namespace Drupal\rp_libre_passage\Service;

use \DateTime;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;

class PLPConversionRate {
    /**
     * @var \Drupal\Core\Entity\Query\QueryFactory
     */
    private $entityQuery;

    /**
     * @var \Drupal\Core\Entity\EntityStorageInterface
     */
    private $entity_conversion_rate;

    /**
     * PLPConversionRate constructor.
     *
     * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity
     * @param \Drupal\Core\Entity\Query\QueryFactory         $entityQuery
     */
    public function __construct(EntityTypeManagerInterface $entity, QueryFactory $entityQuery) {
        $this->entity_conversion_rate = $entity->getStorage('plp_conversion_rate');
        $this->entity_query = $entityQuery;
    }

    /**
     * Retrieve the conversion rate according the given attributes
     * (Taux de conversion)
     * @return \Drupal\Core\Entity\EntityInterface[]
     */
    public function getRate($gender, $age, $percent) {
        $id = $this->entity_query
            ->get('plp_conversion_rate')
            ->condition('gender', $gender)
            ->condition('age', $age, '<=')
            ->sort('age', 'DESC')
            ->range(0, 1)
            ->execute()
        ;

        // Fetch the result
        $id = reset($id);
        if (!empty($id)) {
            $rate = $this->entity_conversion_rate->load($id);
        }

        if (!$rate) {
            return null;
        }

        return $rate->getRate($percent);
    }
}

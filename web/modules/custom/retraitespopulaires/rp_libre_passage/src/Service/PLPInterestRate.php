<?php
namespace Drupal\rp_libre_passage\Service;

use \DateTime;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;

class PLPInterestRate {
    /**
     * @var \Drupal\Core\Entity\Query\QueryFactory
     */
    private $entityQuery;

    /**
     * @var \Drupal\Core\Entity\EntityStorageInterface
     */
    private $entity_interest_rate;

    /**
     * PLPInterestRate constructor.
     *
     * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity
     * @param \Drupal\Core\Entity\Query\QueryFactory         $entityQuery
     */
    public function __construct(EntityTypeManagerInterface $entity, QueryFactory $entityQuery) {
        $this->entity_interest_rate = $entity->getStorage('plp_interest_rate');
        $this->entity_query = $entityQuery;
    }

    /**
     * Retrieve the rate according the given year
     * (Taux d'intérêt selon l'année)
     * @return \Drupal\Core\Entity\EntityInterface[]
     */
    public function getRate($year) {
        $id = $this->entity_query
            ->get('plp_interest_rate')
            ->condition('start_year', $year, '<=')
            ->condition('end_year', $year, '>=')
            ->sort('start_year', 'ASC')
            ->range(0, 1)
            ->execute()
        ;

        // Fetch the result
        $id = reset($id);
        $rate = $this->entity_interest_rate->load($id);

        if (!$rate) {
            return null;
        }

        return array(
            'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-'.$rate->start_year->value.' 00:00:00'),
            'end' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-'.$rate->end_year->value.' 00:00:00'),
            'rate' => $rate->rate->value
        );
    }
}

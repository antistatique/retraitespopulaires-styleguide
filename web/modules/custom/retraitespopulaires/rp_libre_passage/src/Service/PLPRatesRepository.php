<?php
namespace Drupal\rp_libre_passage\Service;

use \DateTime;

use Drupal\Core\State\StateInterface;

class PLPRatesRepository {

    /*
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    protected $state;

    /**
     * PLPRatesRepository constructor.
     *
     * @param \Drupal\Core\State\StateInterface $state
     */
    public function __construct(StateInterface $state) {
        $this->state = $state;
    }

    /**
     * Return the accoding rate by the given year
     * @method getRate
     * @param  integer  $year   A year formatted YYYY, Eg. 2016
     * @return float            Rate for the given year
     */
    public function getRate($year) {
        if (!is_int($year)) {
            throw new \InvalidArgumentException('year must be an integer');
        }

        // TODO: add this on the drupal admin
        $rates = array(
            1900 => [
                'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-1900 00:00:00'),
                'end'   => DateTime::createFromFormat('m-d-Y h:i:s', '12-31-2011 00:00:00'),
                'rate'  => 2,
            ],
            2012 => [
                'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-2012 00:00:00'),
                'end'   => DateTime::createFromFormat('m-d-Y h:i:s', '12-31-9999 00:00:00'),
                'rate'  => 1.5,
            ],
        );

        $according_rate = null;
        foreach ($rates as $rate) {
            if ($year >= $rate['start']->format('Y') && $year <= $rate['end']->format('Y')) {
                return $rate['rate'];
            }
        }

        throw new \InvalidArgumentException('year isn\'t in the repository');
    }
}

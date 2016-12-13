<?php
namespace Drupal\rp_libre_passage\Service;

use \DateTime;

class PLPRatesRepository {

    /**
     * Tableau Homme - des taux de conversion  des PLP à 3% (valable dès le 1.01.2012)
     * @var array
     */
    const PLPConversionRatesMen = array(
        60 => array(0 => 5.958, 40 => 5.298, 60 => 5.021, 75 => 4.831, 80 => 4.770, 100 => 4.544),
        61 => array(0 => 6.095, 40 => 5.404, 60 => 5.114, 75 => 4.917, 80 => 4.854, 100 => 4.619),
        62 => array(0 => 6.239, 40 => 5.516, 60 => 5.213, 75 => 5.007, 80 => 4.942, 100 => 4.698),
        63 => array(0 => 6.391, 40 => 5.633, 60 => 5.318, 75 => 5.103, 80 => 5.036, 100 => 4.782),
        64 => array(0 => 6.552, 40 => 5.757, 60 => 5.428, 75 => 5.205, 80 => 5.134, 100 => 4.871),
        65 => array(0 => 6.721, 40 => 5.888, 60 => 5.545, 75 => 5.312, 80 => 5.239, 100 => 4.965),
        66 => array(0 => 6.902, 40 => 6.028, 60 => 5.669, 75 => 5.427, 80 => 5.351, 100 => 5.066),
        67 => array(0 => 7.094, 40 => 6.177, 60 => 5.801, 75 => 5.549, 80 => 5.469, 100 => 5.173),
        68 => array(0 => 7.299, 40 => 6.335, 60 => 5.942, 75 => 5.678, 80 => 5.596, 100 => 5.287),
        69 => array(0 => 7.516, 40 => 6.503, 60 => 6.092, 75 => 5.817, 80 => 5.730, 100 => 5.409),
        70 => array(0 => 7.748, 40 => 6.682, 60 => 6.252, 75 => 5.964, 80 => 5.874, 100 => 5.539),
    );

    /**
     * Tableau Femme - des taux de conversion  des PLP à 3% (valable dès le 1.01.2012)
     * @var array
     */
    const PLPConversionRatesWomen = array(
        57 => array(0 => 4.700, 40 => 4.640, 60 => 4.611, 75 => 4.589, 80 => 4.582, 100 => 4.553),
        58 => array(0 => 4.777, 40 => 4.716, 60 => 4.687, 75 => 4.665, 80 => 4.658, 100 => 4.629),
        59 => array(0 => 4.858, 40 => 4.797, 60 => 4.767, 75 => 4.745, 80 => 4.737, 100 => 4.708),
        60 => array(0 => 4.944, 40 => 4.882, 60 => 4.852, 75 => 4.829, 80 => 4.822, 100 => 4.792),
        61 => array(0 => 5.035, 40 => 4.972, 60 => 4.942, 75 => 4.919, 80 => 4.911, 100 => 4.881),
        62 => array(0 => 5.131, 40 => 5.068, 60 => 5.037, 75 => 5.013, 80 => 5.006, 100 => 4.975),
        63 => array(0 => 5.233, 40 => 5.169, 60 => 5.137, 75 => 5.114, 80 => 5.106, 100 => 5.075),
        64 => array(0 => 5.341, 40 => 5.276, 60 => 5.244, 75 => 5.221, 80 => 5.213, 100 => 5.182),
        65 => array(0 => 5.456, 40 => 5.390, 60 => 5.358, 75 => 5.334, 80 => 5.326, 100 => 5.294),
        66 => array(0 => 5.578, 40 => 5.511, 60 => 5.478, 75 => 5.454, 80 => 5.446, 100 => 5.414),
        67 => array(0 => 5.706, 40 => 5.639, 60 => 5.606, 75 => 5.581, 80 => 5.573, 100 => 5.541),
        68 => array(0 => 5.842, 40 => 5.774, 60 => 5.741, 75 => 5.716, 80 => 5.708, 100 => 5.675),
        69 => array(0 => 5.985, 40 => 5.917, 60 => 5.884, 75 => 5.859, 80 => 5.851, 100 => 5.818),
    );

    /**
     * @var \Drupal\rp_libre_passage\Service\PLPInterestRate
     */
    private $plp_interest_rate;

    /**
     * PLPRatesRepository constructor.
     *
     * @param \Drupal\rp_libre_passage\Service\PLPInterestRate $plp_interest_rate
     */
    public function __construct(PLPInterestRate $plp_interest_rate) {
        $this->plp_interest_rate = $plp_interest_rate;
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

        $rate = $this->plp_interest_rate->getRate($year);

        if (!empty($rate['rate'])) {
            return $rate['rate'];
        }

        throw new \InvalidArgumentException('year isn\'t in the repository');
    }

    /**
     * [getConversionRate description]
     * @method getConversionRate
     * @param  String            $gender  [description]
     * @param  Integer           $age     [description]
     * @param  Numeric           $percent [description]
     * @return Float                      the corresponding rate
     */
    public function getConversionRate($gender, $age, $percent) {
        if ($gender != 'man' && $gender != 'woman') {
            throw new \InvalidArgumentException('gender must be string of "man" or "woman"');
        }

        if (!is_int($age)) {
            throw new \InvalidArgumentException('age must be an integer');
        }

        if (!is_numeric($percent)) {
            throw new \InvalidArgumentException('percent must be numeric');
        }

        // Select the correspondig conversion rates table
        switch ($gender) {
            case 'man':
                $rates = self::PLPConversionRatesMen;
                break;

            case 'woman':
                $rates = self::PLPConversionRatesWomen;
                break;
        }

        // Check we have the minimum age
        reset($rates);
        $first_age = key($rates);

        if ($age < $first_age) {
            throw new \InvalidArgumentException('age is not enought');
        } else {
            // Get the corresponding age or the maximum one possible
            if (!key_exists($age, $rates)) {
                end($rates);
                $age = key($rates);
            }
        }

        if (!key_exists($percent, $rates[$age])) {
            throw new \InvalidArgumentException('percent is invalid');
        }

        return $rates[$age][$percent];
    }
}

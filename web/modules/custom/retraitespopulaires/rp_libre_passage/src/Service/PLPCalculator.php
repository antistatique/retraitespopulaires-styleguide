<?php
namespace Drupal\rp_libre_passage\Service;

use Drupal\rp_libre_passage\Service\PLPRatesRepository;
use \DateTime;

class PLPCalculator {

    /**
    * @var PLPRatesRepository
    */
    private $ratesRepo;

    /**
     * PLPCalculator constructor.
     *
     */
    public function __construct(PLPRatesRepository $ratesRepo) {
        $this->ratesRepo = $ratesRepo;
    }

    /**
     * Calculate the deadline (date d'échéance)
     * Addition the birthdate with the payment age and modifiy it
     * for the last day of month
     *
     * @method getDeadline
     * @param  DateTime      $birthdate Birthdate (Date de naissance)]
     * @param  Integer   $payementAge Âge souhaité pour le versement des prestations]
     * @return DateTime      The deadline, at the end of the month
     */
    public function getDeadline(DateTime $birthdate, $payementAge) {
        $today = new DateTime('today');
        $deadline = clone $birthdate;

        if ($birthdate > $today) {
            throw new \InvalidArgumentException('birthdate must be greater than today');
        }

        $age   = $birthdate->diff($today)->y;
        $rest  = $payementAge - $age;

        // Assert $payementAge is integer and positive
        if (!is_int($payementAge) || $rest <= 0 ) {
            throw new \InvalidArgumentException('paymentAge must be a numbmer and greater than today - birthdate');
        }

        $deadline->add(new \DateInterval('P'.$payementAge.'Y'));
        $deadline->modify('last day of this month');

        return $deadline;
    }

    /**
     * [calcCapital description]
     * @method calcCapital
     * @param  DateTime    $payementDate  The date of payment (Date de versement), at the beginig of the month
     * @param  DateTime    $deadline      The deadline date, at the end of the month
     * @param  [type]      $amount       [description]
     * @return [type]                    [description]
     */
    public function calcCapital(DateTime $payementDate, DateTime $deadline, $amount) {
        $today = new DateTime('today');

        // Assert $payementDate is positive
        // if ($payementDate <= $today) {
        //     throw new \InvalidArgumentException('payementDate must be greater or equal as today');
        // }

        // Assert $deadline is greater than today
        if ($deadline <= $today) {
            throw new \InvalidArgumentException('deadline must be greater or equal as today');
        }

        // Assert $deadline is greater than $payementDate
        if ($payementDate > $deadline) {
            throw new \InvalidArgumentException('deadline must be greater than payementDate');
        }

        // Assert $amount is positive
        if ($amount <= 0) {
            throw new \InvalidArgumentException('amount must be a positive');
        }

        $curr_date  = clone $payementDate;
        $end_date   = clone $deadline;

        $end_date->modify('last day of this month');

        // Total of interests
        // $interest = 0;
        $total = $amount;

        while ($curr_date <= $end_date) {
            // Check if the end is the current year or not
            $end = $end_date;
            if ($curr_date->format('y') < $end_date->format('y')) {
                $end = clone $curr_date;
                $end->modify('last day of december');
            }

            // var_dump($curr_date);
            // var_dump($end);

            // Numbers of days based on convention “30E/360”
            $days = $this->days360($curr_date, $end);

            // $this->repoRates->getRate($year);

            // Special Retraites Populaires, if not the first payment year, add 1 day
            if($curr_date->format('y') > $payementDate->format('y')) {
                $days++;
            }

            try {
                // Retreive the rate for the current year
                $rate = $this->ratesRepo->getRate((int)$curr_date->format('Y'));

                // Calculate the interest according of total + days in this year (based 360-days)
                $interest_raw = ($total * $rate/100 * $days) / 360;

                // Round the interest to the nearest 0.05
                $interest = $this->formatCents($interest_raw);

                // Remnant sale (Solde de fin) for the current year
                $total += $interest;
            } catch (\Exception $e) {

            }

            // Loop to the next year
            $curr_date->modify('1st January Next Year');
        }

        return $total;
    }

    /**
     * Rounding number nearest 0.05
     * @method formatCents
     * @param  float      $number  A float number
     * @return float               The given number rounder to 0.05
     */
    public function formatCents($number) {
        return ((int)round($number*20))/20;
    }

    /**
    * Returns the number of days between two dates
    * based on twelve 30-day months and a 360-day year
    * using the European 30/360 also known as “30E/360”.
    * @method days360
    * @param  DateTime    $from   Start date
    * @param  DateTime    $to     End date
    * @return Integer             Days between dates
    */
    public function days360(DateTime $from, DateTime $to) {
        // Assert $to is greater than $from
        if ($to <= $from) {
            throw new \InvalidArgumentException('to must be greater than from');
        }

        // Get days diff between curr_date & the end of range's rate
        // $days = $from->diff($to)->format('%a');
        // // Rebase the number of days on 30 day - https://en.wikipedia.org/wiki/360-day_calendar
        // $account_months += ($days - ($days % 30)) / 30;

        // European convention also known as “30E/360”, transform +31 to 30
        $day_from = min(30, $from->format('d'));
        $day_to = min(30, $to->format('d'));

        $month_from = $from->format('m');
        $month_to = $to->format('m');

        $year_from = $from->format('y');
        $year_to = $to->format('y');

        return 360*($year_to - $year_from) + 30*($month_to - $month_from) + ($day_to - $day_from);
    }
}

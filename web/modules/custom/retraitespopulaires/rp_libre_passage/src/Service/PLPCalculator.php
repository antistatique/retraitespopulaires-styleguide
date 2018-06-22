<?php

namespace Drupal\rp_libre_passage\Service;

use DateTime;

/**
 * PLP Calculator class.
 */
class PLPCalculator {

  /**
   * Rates repository.
   *
   * @var \Drupal\rp_libre_passage\Service\PLPRatesRepository
   */
  private $ratesRepo;

  /**
   * PLPCalculator constructor.
   */
  public function __construct(PLPRatesRepository $ratesRepo) {
    $this->ratesRepo = $ratesRepo;
  }

  /**
   * Calculate the deadline (date d'échéance).
   *
   * Addition the birthdate with the payment age and modifiy it
   * for the last day of month.
   *
   * @param \DateTime $birthdate
   *   Birthdate (Date de naissance).
   * @param int $payementAge
   *   Âge souhaité pour le versement des prestations.
   *
   * @return \DateTime
   *   The deadline, at the end of the month
   *
   * @throws \Exception
   */
  public function getDeadline(DateTime $birthdate, $payementAge) {
    $today = new DateTime('today');
    $deadline = clone $birthdate;

    if ($birthdate > $today) {
      throw new \InvalidArgumentException('birthdate must be greater than today');
    }

    $age = $birthdate->diff($today)->y;

    // Assert $payementAge is integer and positive.
    if (!is_int($payementAge) || $payementAge - $age <= 0) {
      throw new \InvalidArgumentException('paymentAge must be numeric and greater than today - birthdate');
    }

    $deadline->add(new \DateInterval('P' . $payementAge . 'Y'));
    $deadline->modify('last day of this month');

    return $deadline;
  }

  /**
   * Calc of Capital since the payementDate to the deadline.
   *
   * (Capital à l’échéance depuis la date de versement jusqu'à la date
   * d'échéance)
   *
   * @param \DateTime $payementDate
   *   The date of payment (Date de versement), at the beginig of the month.
   * @param \DateTime $deadline
   *   The deadline date, at the end of the month.
   * @param int $amount
   *   Amount.
   *
   * @return float
   *   Capital since the payment date.
   *
   * @throws \Exception
   */
  public function calcCapital(DateTime $payementDate, DateTime $deadline, $amount) {
    $today = new DateTime('today');

    // Assert $deadline is greater than today.
    if ($deadline <= $today) {
      throw new \InvalidArgumentException('deadline must be greater or equal as today');
    }

    // Assert $deadline is greater than $payementDate.
    if ($payementDate > $deadline) {
      throw new \InvalidArgumentException('deadline must be greater than payementDate');
    }

    // Assert $amount is positive.
    if ($amount <= 0) {
      throw new \InvalidArgumentException('amount must be unsigned');
    }

    $curr_date = clone $payementDate;
    $end_date = clone $deadline;

    $end_date->modify('last day of this month');

    // Total of interests
    // $interest = 0;.
    $total = $amount;

    while ($curr_date <= $end_date) {
      // Check if the end is the current year or not.
      $end = $end_date;
      if ($curr_date->format('y') < $end_date->format('y')) {
        $end = clone $curr_date;
        $end->modify('last day of december');
      }

      // Numbers of days based on convention “30E/360”.
      $days = $this->days360($curr_date, $end);

      // Special Retraites Populaires, if not the first payment year, add 1 day.
      if ($curr_date->format('y') > $payementDate->format('y')) {
        $days++;
      }

      try {
        // Retreive the rate for the current year.
        $rate = $this->ratesRepo->getRate((int) $curr_date->format('Y'));

        // Calculate the interest according
        // of total + days in this year (based 360-days).
        $interest_raw = ($total * $rate / 100 * $days) / 360;

        // Round the interest to the nearest 0.05.
        $interest = $this->formatCents($interest_raw);

        // Remnant sale (Solde de fin) for the current year.
        $total += $interest;
      }
      catch (\Exception $e) {
        throw new \Exception($e->getMessage());
      }

      // Loop to the next year.
      $curr_date->modify('1st January Next Year');
    }

    return $total;
  }

  /**
   * Calc the Annual Pension Single (Calcul de la rente annuel simple)
   *
   * @param int|string $capital
   *   The capital given by the method calcCapital.
   * @param string $gender
   *   The gender, man or woman.
   * @param int $age
   *   The age.
   *
   * @return float
   *   The annual pension (Rente annuel simple)
   */
  public function calcAnnualPensionSingle($capital, $gender, $age) {
    if (!is_numeric($capital)) {
      throw new \InvalidArgumentException('capital must be numeric');
    }

    if ($gender != 'man' && $gender != 'woman') {
      throw new \InvalidArgumentException('gender must be string of "man" or "woman"');
    }

    if (!is_int($age)) {
      throw new \InvalidArgumentException('age must be an integer');
    }

    // Rate1Head - According gender (man/woman) and the age
    // (Taux de rente 1 tête, en fonction du genre (homme/femme) et de l'age)
    $rate1_head = $this->ratesRepo->getConversionRate($gender, $age, 0);

    // We divide by 12 (months) here and multiply after the percent format
    // to gain somes centimes by months.
    $annual_pension_raw = (($capital * $rate1_head) / 100) / 12;
    return $this->formatCents($annual_pension_raw) * 12;
  }

  /**
   * Calc the Annual Pension Couple (Calcul de la rente annuel couple).
   *
   * @param int|string $capital
   *   The capital given by the method calcCapital.
   * @param string $gender
   *   The gender, man or woman.
   * @param int $age
   *   The age.
   * @param int|string $percent
   *   The desired percent.
   *
   * @return float
   *   The annual pension (Rente annuel simple)
   */
  public function calcAnnualPensionCouple($capital, $gender, $age, $percent) {
    if (!is_numeric($capital)) {
      throw new \InvalidArgumentException('capital must be numeric');
    }

    if ($gender != 'man' && $gender != 'woman') {
      throw new \InvalidArgumentException('gender must be string of "man" or "woman"');
    }

    if (!is_int($age)) {
      throw new \InvalidArgumentException('age must be an integer');
    }

    if (!is_int($percent)) {
      throw new \InvalidArgumentException('percent must be numeric');
    }

    // Rate1Head - According gender (man/woman) and the age
    // (Taux de rente 2 tête, en fonction du genre (homme/femme),
    // de l'âge et du pourcentage souhaité de la rente annuelle)
    $rate2_head = $this->ratesRepo->getConversionRate($gender, $age, $percent);

    // We divide by 12 (months) here and multiply after the percent format
    // to gain somes centimes by months.
    $annual_pension_raw = (($capital * $rate2_head) / 100) / 12;
    return $this->formatCents($annual_pension_raw) * 12;
  }

  /**
   * Calc the Survivor Pension (Calcul de la rente survivant)
   *
   * @param int|string $annual_pension_couple
   *   The annual pension couple given by the method calcAnnualPensionCouple.
   * @param int|string $percent
   *   The desired percent.
   *
   * @return float
   *   The survivor pension (Rente survivant)
   */
  public function calcSurvivorPension($annual_pension_couple, $percent) {
    if (!is_numeric($annual_pension_couple)) {
      throw new \InvalidArgumentException('capital must be numeric');
    }

    if (!is_int($percent)) {
      throw new \InvalidArgumentException('percent must be numeric');
    }

    $pension_raw = ($annual_pension_couple * $percent / 100 / 12);
    return $this->formatCents($pension_raw) * 12;
  }

  /**
   * Rounding number nearest 0.05.
   *
   * @param float $number
   *   A float number.
   *
   * @return float
   *   The given number rounder to 0.05.
   */
  public function formatCents($number) {
    return ((int) round($number * 20)) / 20;
  }

  /**
   * Number of days between dates.
   *
   * Returns the number of days between two dates
   * based on twelve 30-day months and a 360-day year
   * using the European 30/360 also known as “30E/360”.
   *
   * @param \DateTime $from
   *   Start date.
   * @param \DateTime $to
   *   End date.
   *
   * @return int
   *   Days between dates
   */
  public function days360(DateTime $from, DateTime $to) {
    // Assert $to is greater than $from.
    if ($to < $from) {
      throw new \InvalidArgumentException('to must be greater than from');
    }

    // Get days diff between curr_date & the end of range's rate
    // $days = $from->diff($to)->format('%a');
    // Rebase the number of days on 30 day
    // https://en.wikipedia.org/wiki/360-day_calendar
    // $account_months += ($days - ($days % 30)) / 30;.
    // European convention also known as “30E/360”, transform +31 to 30.
    $day_from = min(30, $from->format('d'));
    $day_to = min(30, $to->format('d'));

    $month_from = $from->format('m');
    $month_to = $to->format('m');

    $year_from = $from->format('y');
    $year_to = $to->format('y');

    return 360 * ($year_to - $year_from) + 30 * ($month_to - $month_from) + ($day_to - $day_from);
  }

}

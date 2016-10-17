<?php
namespace Drupal\rp_mortgage\Calculator;

class MortgageCalculator
{
    /**
     * @var float
     */
    private $firstRateMax;
    /**
     * @var float
     */
    private $theoricalCostFirstRate;
    /**
     * @var float
     */
    private $secondRateMax;
    /**
     * @var float
     */
    private $theoricalCostSecondRate;
    /**
     * @var float
     */
    private $ratioCostIncomeMax;
    /**
     * @var int
     */
    private $maintenanceFees;
    /**
     * @var float
     */
    private $equityCapitalMinRate;
    /**
     * @var float
     */
    private $avgRate;
    /**
     * @var float
     */
    private $advanceRateMax;
    /**
     * @var float
     */
    private $notaryRateFee;

    /**
     * MortgageCalculator constructor.
     *
     * @param float $notaryRateFee            Droit de mutation et frais de notaire (en %)
     * @param float $firstRateMax             Prêt max. en 1er rang par rapport au prix d'achat (en %)
     * @param float $theoricalCostFirstRate   Charges théoriques du prêt en 1er rang (en %)
     * @param float $secondRateMax            Prêt max. en 2ème rang par rapport au prix d'achat (en %)
     * @param float $theoricalCostSecondRate  Charges théoriques du prêt en 2ème rang (en %)
     * @param float $ratioCostIncomeMax       Rapport charges-revenus max. (en %)
     * @param int   $maintenanceFees          Frais d'entretien
     * @param float $equityCapitalMinRate     Pourcentage min. des fonds propres
     * @param float $avgRate                  Taux moyen (1er + 2ème rang) de charges du prêt total (en %)
     * @param float $advanceRateMax           Taux d'avance max. (en %)
     */
    public function __construct(
        $notaryRateFee = 0.05,
        $firstRateMax = 0.70,
        $theoricalCostFirstRate = 0.05,
        $secondRateMax = 0.10,
        $theoricalCostSecondRate = 0.07,
        $ratioCostIncomeMax = 0.33,
        $maintenanceFees = 6000,
        $equityCapitalMinRate = 0.25,
        $avgRate = 0.0525,
        $advanceRateMax = 0.80
    ) {

        $this->firstRateMax = $firstRateMax;
        $this->theoricalCostFirstRate = $theoricalCostFirstRate;
        $this->secondRateMax = $secondRateMax;
        $this->theoricalCostSecondRate = $theoricalCostSecondRate;
        $this->ratioCostIncomeMax = $ratioCostIncomeMax;
        $this->maintenanceFees = $maintenanceFees;
        $this->equityCapitalMinRate = $equityCapitalMinRate;
        $this->avgRate = $avgRate;
        $this->advanceRateMax = $advanceRateMax;
        $this->notaryRateFee = $notaryRateFee;
    }

    /**
     * @param int   $buyPrice
     * @param int   $equityCapital
     * @param int   $income
     * @param float $firstRate
     */
    public function calculate($buyPrice, $equityCapital, $income, $firstRate)
    {
        $buyPrice = (int) $buyPrice;
        $equityCapital = (int) $equityCapital;
        $income = (int) $income;
        $firstRate = (float) $firstRate;

        $priceWithNotaryFee = $this->getPriceWithNotaryFee($buyPrice);
        $priceMinimalAnnualIncome = $this->getMinimalAnnualIncome($buyPrice);
        $priceMinimalEquityCapital = $this->getMinimalEquityCapital($buyPrice);

        $equityBuyPriceMax = $this->getMaximumBuyPriceFromEquityCapital($equityCapital);
        $equityMinialAnnualIncome = $this->getMinimalAnnualIncomeFromEquityCapital($equityCapital);

        $incomeBuyPriceMax = $this->getMaximumBuyPriceFromIncome($income);
        $incomeMinimalAnnualIncome = $this->getMinimalAnnualIncomeFromIncome($income);

        $firstLoan = $this->calculateLoan($priceWithNotaryFee, $buyPrice, $equityCapital, $this->firstRateMax);
        $secondLoan = $this->calculateLoan($priceWithNotaryFee, $buyPrice, $firstRate, $this->secondRateMax); // @TODO: Double check this one with RP!

        // @TODO return a Result Object
        return $firstLoan;
    }

    protected function calculateLoan($priceWithNotaryFee, $price, $equityCapital, $rate)
    {
        $target = max(($priceWithNotaryFee - $equityCapital), 0);
        $maxLoan = floor($price * $rate);

        return min($target, $maxLoan);
    }

    /**
     * @param integer $price
     *
     * @return float
     */
    public function getPriceWithNotaryFee($price)
    {
        return $price + ($price * $this->notaryRateFee);
    }

    /**
     * @param integer|float $price
     *
     * @return float
     */
    public function getMinimalAnnualIncome($price)
    {
        $minimalIncome = (($this->firstRateMax * ($price * $this->theoricalCostFirstRate)) + ($this->secondRateMax * ($price * $this->theoricalCostSecondRate)) + $this->maintenanceFees) / $this->ratioCostIncomeMax;

        return round($minimalIncome, 0);
    }

    /**
     * @param integer|float $price
     *
     * @return float
     */
    public function getMinimalEquityCapital($price)
    {
        return $price * $this->equityCapitalMinRate;
    }

    /**
     * @param integer|float $equityCapital
     *
     * @return float
     */
    public function getMaximumBuyPriceFromEquityCapital($equityCapital)
    {
        return $equityCapital / $this->equityCapitalMinRate;
    }

    /**
     * @param integer|float $equityCapital
     *
     * @return float
     */
    public function getMinimalAnnualIncomeFromEquityCapital($equityCapital)
    {
        return $this->getMinimalAnnualIncome($equityCapital);
    }

    /**
     * @param integer|float $income
     *
     * @return float
     */
    public function getMaximumBuyPriceFromIncome($income)
    {
        $maxBuyPrice = ((($income / 10.0 * $this->ratioCostIncomeMax) - $this->maintenanceFees) / $this->avgRate) / $this->advanceRateMax;

        return $maxBuyPrice;
    }

    /**
     * @param float|integer $income
     *
     * @return float
     */
    public function getMinimalAnnualIncomeFromIncome($income)
    {
        $buyPriceMax = $this->getMaximumBuyPriceFromIncome($income);

        return $buyPriceMax * $this->equityCapitalMinRate;
    }
}

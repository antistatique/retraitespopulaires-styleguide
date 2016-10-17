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
     * MortgageCalculator constructor.
     *
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
        $firstRateMax = 0.70,
        $theoricalCostFirstRate = 0.5,
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
    }

    /**
     * @param int   $buyPrice
     * @param int   $equityCapital
     * @param int   $income
     * @param float $firstRate
     */
    public function calculate($buyPrice, $equityCapital, $income, $firstRate)
    {
        // @TODO
        return 42;
    }
}

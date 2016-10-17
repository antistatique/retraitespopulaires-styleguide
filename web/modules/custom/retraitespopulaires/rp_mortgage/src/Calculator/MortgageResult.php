<?php
namespace Drupal\rp_mortgage\Calculator;

class MortgageResult
{
    /**
     * @var float
     */
    private $firstLoan;
    /**
     * @var float
     */
    private $secondLoan;
    /**
     * @var float
     */
    private $totalLoan;

    /**
     * @var float
     */
    private $firstRate;

    /**
     * @var float
     */
    private $secondRate;
    /**
     * @var float
     */
    private $deptRatio;
    /**
     * @var float
     */
    private $costIncomeRatio;

    /**
     * @var float
     */
    private $interestFirstRate;

    /**
     * @var float
     */
    private $interestSecondRate;

    /**
     * @var float
     */
    private $maintenanceFees;

    /**
     * @var float
     */
    private $firstAmortisation;

    /**
     * @var float
     */
    private $secondAmortisation;

    /**
     * @var float
     */
    private $totalLivingCostPerYear;

    /**
     * @var float
     */
    private $totalLivingCostPerMonth;

    public function __construct($firstLoan = null, $secondLoan = null, $totalLoan = null, $firstRate = null, $secondRate = null, $deptRatio = null, $costIncomeRatio = null)
    {
        $this->firstLoan = $firstLoan;
        $this->secondLoan = $secondLoan;
        $this->totalLoan = $totalLoan;
        $this->firstRate = $firstRate;
        $this->secondRate = $secondRate;
        $this->deptRatio = $deptRatio;
        $this->costIncomeRatio = $costIncomeRatio;
    }

    /**
     * @return float
     */
    public function getFirstLoan()
    {
        return $this->firstLoan;
    }

    /**
     * @return float
     */
    public function getSecondLoan()
    {
        return $this->secondLoan;
    }

    /**
     * @return float
     */
    public function getTotalLoan()
    {
        return $this->totalLoan;
    }

    /**
     * @return float
     */
    public function getFirstRate()
    {
        return $this->firstRate;
    }

    /**
     * @param float $firstRate
     */
    public function setFirstRate($firstRate)
    {
        $this->firstRate = $firstRate;
    }

    /**
     * @return float
     */
    public function getSecondRate()
    {
        return $this->secondRate;
    }

    /**
     * @param float $secondRate
     */
    public function setSecondRate($secondRate)
    {
        $this->secondRate = $secondRate;
    }

    /**
     * @param float $firstLoan
     */
    public function setFirstLoan($firstLoan)
    {
        $this->firstLoan = $firstLoan;
    }

    /**
     * @param float $secondLoan
     */
    public function setSecondLoan($secondLoan)
    {
        $this->secondLoan = $secondLoan;
    }

    /**
     * @param float $totalLoan
     */
    public function setTotalLoan($totalLoan)
    {
        $this->totalLoan = $totalLoan;
    }

    /**
     * @return float
     */
    public function getDeptRatio()
    {
        return $this->deptRatio;
    }

    /**
     * @param float $deptRatio
     */
    public function setDeptRatio($deptRatio)
    {
        $this->deptRatio = $deptRatio;
    }

    /**
     * @return float
     */
    public function getCostIncomeRatio()
    {
        return $this->costIncomeRatio;
    }

    /**
     * @param float $costIncomeRatio
     */
    public function setCostIncomeRatio($costIncomeRatio)
    {
        $this->costIncomeRatio = $costIncomeRatio;
    }

    /**
     * @return float
     */
    public function getInterestFirstRate()
    {
        return $this->interestFirstRate;
    }

    /**
     * @param float $interestFirstRate
     */
    public function setInterestFirstRate($interestFirstRate)
    {
        $this->interestFirstRate = $interestFirstRate;
    }

    /**
     * @return float
     */
    public function getInterestSecondRate()
    {
        return $this->interestSecondRate;
    }

    /**
     * @param float $interestSecondRate
     */
    public function setInterestSecondRate($interestSecondRate)
    {
        $this->interestSecondRate = $interestSecondRate;
    }

    /**
     * @return float
     */
    public function getMaintenanceFees()
    {
        return $this->maintenanceFees;
    }

    /**
     * @param float $maintenanceFees
     */
    public function setMaintenanceFees($maintenanceFees)
    {
        $this->maintenanceFees = $maintenanceFees;
    }

    /**
     * @return float
     */
    public function getFirstAmortisation()
    {
        return $this->firstAmortisation;
    }

    /**
     * @param float $firstAmortisation
     */
    public function setFirstAmortisation($firstAmortisation)
    {
        $this->firstAmortisation = $firstAmortisation;
    }

    /**
     * @return float
     */
    public function getSecondAmortisation()
    {
        return $this->secondAmortisation;
    }

    /**
     * @param float $secondAmortisation
     */
    public function setSecondAmortisation($secondAmortisation)
    {
        $this->secondAmortisation = $secondAmortisation;
    }

    /**
     * @return float
     */
    public function getTotalLivingCostPerYear()
    {
        return $this->totalLivingCostPerYear;
    }

    /**
     * @param float $totalLivingCostPerYear
     */
    public function setTotalLivingCostPerYear($totalLivingCostPerYear)
    {
        $this->totalLivingCostPerYear = $totalLivingCostPerYear;
    }

    /**
     * @return float
     */
    public function getTotalLivingCostPerMonth()
    {
        return $this->totalLivingCostPerMonth;
    }

    /**
     * @param float $totalLivingCostPerMonth
     */
    public function setTotalLivingCostPerMonth($totalLivingCostPerMonth)
    {
        $this->totalLivingCostPerMonth = $totalLivingCostPerMonth;
    }
}

<?php

namespace Drupal\rp_mortgage\tests\Calculator;

use Drupal\rp_mortgage\Calculator\MortgageCalculator;
use Drupal\rp_mortgage\Calculator\MortgageResult;
use PHPUnit_Framework_TestCase;

class MortgageCalculatorTest extends PHPUnit_Framework_TestCase
{
    /**
     * @var MortgageCalculator
     */
    private $calculator;

    public function setUp()
    {
        $this->calculator = new MortgageCalculator(0.05, 0.70, 0.05, 0.10, 0.07, 0.30, 4800.0, 0.25, 0.0525, 0.80, 0.01, 0.02);
    }

    public function testCalculate()
    {
        $expectedResult = new MortgageResult();
        $expectedResult->setFirstRate(1.35);
        $expectedResult->setSecondRate(1.75);
        $expectedResult->setFirstLoan(168000.0);
        $expectedResult->setSecondLoan(34000.0);
        $expectedResult->setTotalLoan(202000.0);
        $expectedResult->setDeptRatio(0.85);
        $expectedResult->setCostIncomeRatio(0.12);
        $expectedResult->setInterestFirstRate(2269.0);
        $expectedResult->setInterestSecondRate(595.0);
        $expectedResult->setFirstAmortisation(1680.0);
        $expectedResult->setSecondAmortisation(680.0);
        $expectedResult->setMaintenanceFees(4800.0);
        $expectedResult->setTotalLivingCostPerMonth(836.0);
        $expectedResult->setTotalLivingCostPerYear(10024.0);

        $result = $this->calculator->calculate(240000, 50000, 140000, 0.0135, 0.0175);

        $this->assertEquals($expectedResult->getFirstLoan(), $result->getFirstLoan(), 'should correctly calculate first loan', 0.1);
        $this->assertEquals($expectedResult->getSecondLoan(), $result->getSecondLoan(), 'should correctly calculate second loan', 0.1);
        $this->assertEquals($expectedResult->getTotalLoan(), $result->getTotalLoan(), 'should correctly calculate total loan', 0.1);
        $this->assertEquals($expectedResult->getDeptRatio(), $result->getDeptRatio(), 'should correctly calculate dept ratio', 0.1);
        $this->assertEquals($expectedResult->getCostIncomeRatio(), $result->getCostIncomeRatio(), 'should correctly calculate cost/income ratio', 0.1);
        $this->assertEquals($expectedResult->getInterestFirstRate(), $result->getInterestFirstRate(), 'should correctly calculate first interest', 0.1);
        $this->assertEquals($expectedResult->getInterestSecondRate(), $result->getInterestSecondRate(), 'should correctly calculate second interest', 0.1);
        $this->assertEquals($expectedResult->getFirstAmortisation(), $result->getFirstAmortisation(), 'should correctly calculate first amortisation', 0.1);
        $this->assertEquals($expectedResult->getSecondAmortisation(), $result->getSecondAmortisation(), 'should correctly calculate second amortisation', 0.1);
        $this->assertEquals($expectedResult->getMaintenanceFees(), $result->getMaintenanceFees(), 'should correctly report maintenance or additional fees', 0.1);
        $this->assertEquals($expectedResult->getTotalLivingCostPerYear(), $result->getTotalLivingCostPerYear(), 'should correctly total living cost per year', 0.1);
        $this->assertEquals($expectedResult->getTotalLivingCostPerMonth(), $result->getTotalLivingCostPerMonth(), 'should correctly total living cost per month', 0.1);
        $this->assertEquals($expectedResult->getTotalLivingCostPerYear() / 12, $result->getTotalLivingCostPerMonth(), 'should correctly total living cost per month', 0.1);

        $this->assertEquals($expectedResult, $result);
    }

    public function testGetPriceWithNotaryFee()
    {
        $this->assertEquals(252000.0, $this->calculator->getPriceWithNotaryFee(240000));
        $this->assertEquals(0, $this->calculator->getPriceWithNotaryFee(0));
    }

    public function testGetMinimalAnnualIncome()
    {
        $this->assertEquals(49600.0, $this->calculator->getMinimalAnnualIncome(240000));
        $this->assertEquals(16000.0, $this->calculator->getMinimalAnnualIncome(0));
    }

    public function testGetMinimalEquityCapital()
    {
        $this->assertEquals(60000, $this->calculator->getMinimalEquityCapital(240000));
        $this->assertEquals(0, $this->calculator->getMinimalEquityCapital(0));
    }


    public function testGetMaximumBuyPriceFromEquityCapital()
    {
        $this->assertEquals(200000, $this->calculator->getMaximumBuyPriceFromEquityCapital(50000));
    }

    public function testGetMaximumBuyPriceFromIncome()
    {
        $this->assertEquals(885714, $this->calculator->getMaximumBuyPriceFromIncome(140000));
    }

    public function testGetMinimalEquityCapitalFromIncome()
    {
        $this->assertEquals(221429, $this->calculator->getMinimalEquityCapitalFromIncome(140000));
    }
}

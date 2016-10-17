<?php

namespace Drupal\rp_mortgage\tests\Calculator;

use Drupal\rp_mortgage\Calculator\MortgageCalculator;
use PHPUnit_Framework_TestCase;

class MortgageCalculatorTest extends PHPUnit_Framework_TestCase
{
    /**
     * @var MortgageCalculator
     */
    private $calculator;

    public function setUp()
    {
        $this->calculator = new MortgageCalculator(0.05, 0.70, 0.05, 0.10, 0.07, 0.30, 4800, 0.25, 0.0525, 0.80);
    }

    public function testCalculate()
    {
        $this->assertEquals(168000.0, $this->calculator->calculate(240000, 50000, 140000, 1.35));
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

    public function testGetMinimumAnnualIncome()
    {
        $this->assertEquals(44000, $this->calculator->getMinimalAnnualIncomeFromEquityCapital(50000));
    }
}

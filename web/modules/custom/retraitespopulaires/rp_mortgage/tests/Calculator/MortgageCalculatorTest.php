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
        $this->calculator = new MortgageCalculator(0.70, 0.5, 0.10, 0.07, 0.33, 6000, 0.25, 0.0525, 0.80);
    }

    public function testCalculate()
    {
        $this->assertEquals(800000, $this->calculator->calculate(240000, 60000, 140000, 0.0205));
    }
}

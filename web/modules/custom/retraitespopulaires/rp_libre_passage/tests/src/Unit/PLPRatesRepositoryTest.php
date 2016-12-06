<?php

namespace Drupal\rp_libre_passage\tests\src\Unit;

use Drupal\rp_libre_passage\Service\PLPRatesRepository;
use PHPUnit_Framework_TestCase;

class PLPRatesRepositoryTest extends PHPUnit_Framework_TestCase {
    /**
    * @var PLPRatesRepository
    */
    private $ratesRepo;

    public function setUp() {
        $state = $this->getMockBuilder('\Drupal\Core\State\StateInterface')
            ->disableOriginalConstructor()
            ->getMock()
        ;
        $this->ratesRepo = new PLPRatesRepository($state);
    }

    /**
     * @dataProvider getRateProvider
     */
    public function testGetRate($year, $expected) {
        $this->assertEquals($expected, $this->ratesRepo->getRate($year));
    }

    public function getRateProvider() {
        return [
            [1900, 2],
            [1990, 2],
            [2000, 2],
            [2011, 2],
            [2012, 1.5],
            [2013, 1.5],
            [2100, 1.5],
            [3000, 1.5],
        ];
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage year isn't in the repository
    */
    public function testGetRateInvalidYear() {
        $this->ratesRepo->getRate(100);
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage year must be an integer
    */
    public function testGetRateNotIntYear() {
        $this->ratesRepo->getRate('2000');
    }

    /**
     * @dataProvider getConversionRateProvider
     */
    public function testGetConversionRate($gender, $age, $percent, $expected) {
        $this->assertEquals($expected, $this->ratesRepo->getConversionRate($gender, $age, $percent));
    }

    public function getConversionRateProvider() {
        return [
            ['woman', 60, 0, 4.944],
            ['man', 60, 0, 5.958],
            ['man', 60, 60, 5.021],
            ['man', 65, 0, 6.721],
            ['man', 65, 80, 5.239],
            ['woman', 65, 0, 5.456],
            ['woman', 65, 80, 5.326],
            ['man', 90, 0, 7.748],
            ['woman', 90, 0, 5.985],
        ];
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage gender must be string of "man" or "woman"
    */
    public function testGetConversionRateInvalidGender() {
        $this->ratesRepo->getConversionRate('G', 60, 0);
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage age must be an integer
    */
    public function testGetConversionRateNotIntAge() {
        $this->ratesRepo->getConversionRate('man', '60', 0);
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage percent must be numeric
    */
    public function testGetConversionRateNotNumericPercent() {
        $this->ratesRepo->getConversionRate('man', 60, 'abcdf');
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage age is not enought
    */
    public function testGetConversionRateYoungAge() {
        $this->ratesRepo->getConversionRate('man', 20, '0');
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage percent is invalid
    */
    public function testGetConversionRateInvalidPercent() {
        $this->ratesRepo->getConversionRate('man', 60, 2000);
    }

}

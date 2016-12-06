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
}

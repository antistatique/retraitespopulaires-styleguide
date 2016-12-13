<?php

namespace Drupal\rp_libre_passage\tests\src\Unit;

use Drupal\rp_libre_passage\Service\PLPRatesRepository;
use PHPUnit_Framework_TestCase;
use \DateTime;

class PLPRatesRepositoryTest extends PHPUnit_Framework_TestCase {
    /**
    * @var PLPRatesRepository
    */
    private $ratesRepo;

    public function setUp() {
        $PLPInterestRate = $this->createMock('Drupal\rp_libre_passage\Service\PLPInterestRate');

        $PLPInterestRate
            ->method('getRate')
            ->will(
                $this->returnValueMap([
                    [1900,[
                        'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-1900 00:00:00'),
                        'end'   => DateTime::createFromFormat('m-d-Y h:i:s', '12-31-2011 00:00:00'),
                        'rate'  => 2,
                    ]],
                    [1990,[
                        'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-1900 00:00:00'),
                        'end'   => DateTime::createFromFormat('m-d-Y h:i:s', '12-31-2011 00:00:00'),
                        'rate'  => 2,
                    ]],
                    [2000,[
                        'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-1900 00:00:00'),
                        'end'   => DateTime::createFromFormat('m-d-Y h:i:s', '12-31-2011 00:00:00'),
                        'rate'  => 2,
                    ]],
                    [2011,[
                        'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-1900 00:00:00'),
                        'end'   => DateTime::createFromFormat('m-d-Y h:i:s', '12-31-2011 00:00:00'),
                        'rate'  => 2,
                    ]],
                    [2012,[
                        'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-2012 00:00:00'),
                        'end'   => DateTime::createFromFormat('m-d-Y h:i:s', '12-31-9999 00:00:00'),
                        'rate'  => 1.5,
                    ]],
                    [2013,[
                        'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-2012 00:00:00'),
                        'end'   => DateTime::createFromFormat('m-d-Y h:i:s', '12-31-9999 00:00:00'),
                        'rate'  => 1.5,
                    ]],
                    [2100,[
                        'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-2012 00:00:00'),
                        'end'   => DateTime::createFromFormat('m-d-Y h:i:s', '12-31-9999 00:00:00'),
                        'rate'  => 1.5,
                    ]],
                    [3000,[
                        'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-2012 00:00:00'),
                        'end'   => DateTime::createFromFormat('m-d-Y h:i:s', '12-31-9999 00:00:00'),
                        'rate'  => 1.5,
                    ]],
                ])
            )
        ;

        $PLPConversionRate = $this->createMock('Drupal\rp_libre_passage\Service\PLPConversionRate');

        $PLPConversionRate
            ->method('getRate')
            ->will(
                $this->returnValueMap([
                    ['man', 60, 0, 5.958],
                    ['man', 90, 0, 7.748],
                    ['woman', 60, 0, 4.944],
                    ['woman', 90, 0, 5.985],
                    ['man', 60, 75, 4.831],
                    ['man', 90, 80, 5.874],
                    ['woman', 60, 75, 4.829],
                    ['woman', 90, 80, 5.851],
                    ['man', 60, 60, 5.021],
                    ['man', 65, 0, 6.721],
                    ['man', 65, 80, 5.239],
                    ['woman', 65, 0, 5.456],
                    ['woman', 65, 80, 5.326],
                ])
            )
        ;

        $this->ratesRepo = new PLPRatesRepository($PLPInterestRate, $PLPConversionRate);
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
    */
    public function testGetConversionRateInvalidPercent() {
        $this->ratesRepo->getConversionRate('man', 60, 2000);
    }

}

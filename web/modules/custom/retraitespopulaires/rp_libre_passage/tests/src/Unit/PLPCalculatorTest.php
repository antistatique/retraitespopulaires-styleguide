<?php

namespace Drupal\rp_libre_passage\tests\src\Unit;

use Drupal\rp_libre_passage\Service\PLPCalculator;
use PHPUnit_Framework_TestCase;
use \DateTime;

class PLPCalculatorTest extends PHPUnit_Framework_TestCase {
    /**
    * @var PLPCalculator
    */
    private $calculator;

    public function setUp() {
        $PLPRatesRepositoryMock = $this->createMock('Drupal\rp_libre_passage\Service\PLPRatesRepository');

        // Mock getRate
        $PLPRatesRepositoryMock
            ->method('getRate')
            ->will(
                $this->returnValueMap([
                    [2012, 1.5],
                    [2013, 1.5],
                    [2014, 1.5],
                    [2015, 1.5],
                    [2016, 1.5],
                    [2017, 1.5],
                    [2018, 1.5],
                    [2019, 1.5],
                    [2020, 1.5],
                    [2021, 1.5],
                    [2022, 1.5],
                    [2023, 1.5],
                    [2024, 1.5],
                    [2025, 1.5],
                    [2026, 1.5],
                    [2027, 1.5],
                    [2028, 1.5],
                    [2029, 1.5],
                    [2030, 1.5],
                    [2031, 1.5],
                    [2032, 1.5],
                    [2033, 1.5],
                    [2034, 1.5],
                    [2035, 1.5],
                    [2036, 1.5],
                    [2037, 1.5],
                    [2038, 1.5],
                    [2039, 1.5],
                    [2040, 1.5],
                    [2041, 1.5],
                    [2042, 1.5],
                    [2043, 1.5],
                    [2044, 1.5],
                    [2045, 1.5],
                    [2046, 1.5],
                    [2047, 1.5],
                    [2048, 1.5],
                    [2049, 1.5],
                    [2050, 1.5],
                    [2051, 1.5],
                    [2052, 1.5],
                    [2053, 1.5],
                    [2054, 1.5],
                ])
            )
        ;

        // Mock getRate
        $PLPRatesRepositoryMock
            ->method('getConversionRate')
            ->will(
                $this->returnValueMap([
                    ['man', 60, 0, 5.958],
                    ['man', 90, 0, 7.748],
                    ['woman', 60, 0, 4.944],
                    ['woman', 90, 0, 5.985],
                ])
            )
        ;

        $this->calculator = new PLPCalculator($PLPRatesRepositoryMock);
    }

    public function testDeadline() {
        $birthdate = DateTime::createFromFormat('d/m/Y h:i:s', '25/03/1994 00:00:00');
        $age = 60;
        $expected = DateTime::createFromFormat('d/m/Y h:i:s', '31/03/2054 00:00:00');

        $result = $this->calculator->getDeadline($birthdate, $age);
        $this->assertInstanceOf(DateTime::class, $result);
        $this->assertEquals($expected->getTimestamp(), $result->getTimestamp());
    }

    public function testDeadlineNotDateTimeBirthdate() {
        try {
            $this->calculator->getDeadline(null, 60);
        } catch (\Exception $e) {
            $this->assertContains('must be an instance of DateTime', $e->getMessage());
        }
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage birthdate must be greater than today
    */
    public function testDeadlineFuturBirthdate() {
        $birthdate = DateTime::createFromFormat('d/m/Y h:i:s', '25/03/3000 00:00:00');
        $this->calculator->getDeadline($birthdate, 60);
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage paymentAge must be a numbmer and greater than today - birthdate
    */
    public function testDeadlineNotIntegerAge() {
        $birthdate = DateTime::createFromFormat('d/m/Y h:i:s', '25/03/1994 00:00:00');
        $this->calculator->getDeadline($birthdate, 'fail');
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage paymentAge must be a numbmer and greater than today - birthdate
    */
    public function testDeadlineNegativeAge() {
        $birthdate = DateTime::createFromFormat('d/m/Y h:i:s', '25/03/1994 00:00:00');
        $this->calculator->getDeadline($birthdate, -1);
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage paymentAge must be a numbmer and greater than today - birthdate
    */
    public function testDeadlineOverlappedAge() {
        $birthdate = DateTime::createFromFormat('d/m/Y h:i:s', '25/03/1994 00:00:00');
        $this->calculator->getDeadline($birthdate, 1);
    }

    /**
     * @dataProvider calcCapitalProvider
     */
    public function testCalcCapital($payementDate, $deadline, $amount, $expected) {
        $raw = $this->calculator->calcCapital($payementDate, $deadline, $amount);
        $formatted = $this->calculator->formatCents($raw);
        $this->assertEquals($expected, $formatted);
    }

    public function calcCapitalProvider() {
        return [
            [
                DateTime::createFromFormat('d/m/Y h:i:s', '22/11/2012 00:00:00'),
                DateTime::createFromFormat('d/m/Y h:i:s', '31/03/2054 00:00:00'),
                12345.12,
                22851.50
            ],
        ];
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage paymentAge must be a numbmer and greater than today - birthdate
    */
    // public function testCalcCapitalNotDateTimePayementDate() {}

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage paymentAge must be a numbmer and greater than today - birthdate
    */
    // public function testCalcCapitalNotDateTimeDeadline() {}

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage paymentAge must be a numbmer and greater than today - birthdate
    */
    // public function testCalcCapitalPastPayementDate() {}

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage paymentAge must be a numbmer and greater than today - birthdate
    */
    // public function testCalcCapitalPastDeadlineDate() {}

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage paymentAge must be a numbmer and greater than today - birthdate
    */
    // public function testCalcCapitalOverlappedPaymentDateAndDeadline() {}

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage paymentAge must be a numbmer and greater than today - birthdate
    */
    // public function testCalcCapitalNegativeAmount() {}

    /**
     * @dataProvider calcAnnualPensionSimpleProvider
     */
    public function testCalcAnnualPensionSimple($capital, $gender, $age, $expected) {
        $raw = $this->calculator->calcAnnualPensionSimple($capital, $gender, $age);
        $formatted = $this->calculator->formatCents($raw);
        $this->assertEquals($expected, $formatted);
    }

    public function calcAnnualPensionSimpleProvider() {
        return [
            [22850.84, 'man', 60, 1361.40],
            [22851.50, 'man', 90, 1770.60],
            [22850.84, 'woman', 60, 1129.80],
            [22851.50, 'woman', 90, 1367.40],
        ];
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage capital must be numeric
    */
    public function testCalcAnnualPensionSimpleNotNumericCapital() {
        $this->calculator->calcAnnualPensionSimple('abcd', 'man', 90);
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage gender must be string of "man" or "woman"
    */
    public function testCalcAnnualPensionSimpleInvalidGender() {
        $this->calculator->calcAnnualPensionSimple(22851.50, 'G', 90);
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage age must be an integer
    */
    public function testCalcAnnualPensionSimpleNotIntAge() {
        $this->calculator->calcAnnualPensionSimple(22851.50, 'man', '90');
    }

    /**
     * @dataProvider days360Provider
     */
    public function testdays360($from, $to, $expected) {
        $this->assertEquals($expected, $this->calculator->days360($from, $to));
    }

    public function days360Provider() {
        return [
            [
                DateTime::createFromFormat('d/m/Y h:i:s', '30/11/2012 00:00:00'),
                DateTime::createFromFormat('d/m/Y h:i:s', '01/12/2012 00:00:00'),
                1,
            ],
            [
                DateTime::createFromFormat('d/m/Y h:i:s', '30/11/2012 00:00:00'),
                DateTime::createFromFormat('d/m/Y h:i:s', '06/12/2012 00:00:00'),
                6,
            ],
            [
                DateTime::createFromFormat('d/m/Y h:i:s', '22/11/2012 00:00:00'),
                DateTime::createFromFormat('d/m/Y h:i:s', '31/12/2012 00:00:00'),
                38,
            ],
            [
                DateTime::createFromFormat('d/m/Y h:i:s', '01/01/2013 00:00:00'),
                DateTime::createFromFormat('d/m/Y h:i:s', '31/12/2013 00:00:00'),
                359,
            ],
            [
                DateTime::createFromFormat('d/m/Y h:i:s', '01/01/2013 00:00:00'),
                DateTime::createFromFormat('d/m/Y h:i:s', '05/01/2016 00:00:00'),
                1084,
            ],
        ];
    }

    public function testdays360NotDateFrom() {
        try {
            $from = '22/11/2012';
            $to = DateTime::createFromFormat('d/m/Y h:i:s', '31/12/2012 00:00:00');
            $this->calculator->days360($from, $to);
        } catch (\Exception $e) {
            $this->assertContains('must be an instance of DateTime', $e->getMessage());
        }

    }

    public function testdays360NotDateTo() {
        try {
            $from = DateTime::createFromFormat('d/m/Y h:i:s', '22/11/2012 00:00:00');
            $to = '31/12/2012';
            $this->calculator->days360($from, $to);
        } catch (\Exception $e) {
            $this->assertContains('must be an instance of DateTime', $e->getMessage());
        }
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage to must be greater than from
    */
    public function testdays360FromGreaterThanTo() {
        $to = DateTime::createFromFormat('d/m/Y h:i:s', '22/11/2012 00:00:00');
        $from = DateTime::createFromFormat('d/m/Y h:i:s', '31/12/2012 00:00:00');
        $this->calculator->days360($from, $to);
    }
}

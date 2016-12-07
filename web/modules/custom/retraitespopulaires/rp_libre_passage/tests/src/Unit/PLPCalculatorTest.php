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
                    ['man', 60, 75, 4.831],
                    ['man', 90, 80, 5.874],
                    ['woman', 60, 75, 4.829],
                    ['woman', 90, 80, 5.851],
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
        } catch (\Throwable $t) {
            // Executed only in PHP 7, will not match in PHP 5.x
            $this->assertContains('must be an instance of DateTime', $t->getMessage());
        } catch (\Exception $e) {
            // Executed only in PHP 5.x, will not be reached in PHP 7
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
    * @expectedExceptionMessage paymentAge must be numeric and greater than today - birthdate
    */
    public function testDeadlineNotIntegerAge() {
        $birthdate = DateTime::createFromFormat('d/m/Y h:i:s', '25/03/1994 00:00:00');
        $this->calculator->getDeadline($birthdate, 'fail');
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage paymentAge must be numeric and greater than today - birthdate
    */
    public function testDeadlineNegativeAge() {
        $birthdate = DateTime::createFromFormat('d/m/Y h:i:s', '25/03/1994 00:00:00');
        $this->calculator->getDeadline($birthdate, -1);
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage paymentAge must be numeric and greater than today - birthdate
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

    public function testCalcCapitalNotDateTimePayementDate() {
        try {
            $payementDate = '22/11/2012';
            $deadline = new DateTime();
            $amount = 12345.12;

            $raw = $this->calculator->calcCapital($payementDate, $deadline, $amount);
        } catch (\Throwable $t) {
            // Executed only in PHP 7, will not match in PHP 5.x
            $this->assertContains('must be an instance of DateTime', $t->getMessage());
        } catch (\Exception $e) {
            // Executed only in PHP 5.x, will not be reached in PHP 7
            $this->assertContains('must be an instance of DateTime', $e->getMessage());
        }
    }

    public function testCalcCapitalNotDateTimeDeadline() {
        try {
            $payementDate = new DateTime();
            $deadline = '22/11/2012';
            $amount = 12345.12;

            $raw = $this->calculator->calcCapital($payementDate, $deadline, $amount);
        } catch (\Throwable $t) {
            // Executed only in PHP 7, will not match in PHP 5.x
            $this->assertContains('must be an instance of DateTime', $t->getMessage());
        } catch (\Exception $e) {
            // Executed only in PHP 5.x, will not be reached in PHP 7
            $this->assertContains('must be an instance of DateTime', $e->getMessage());
        }
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage deadline must be greater or equal as today
    */
    public function testCalcCapitalPastDeadlineDate() {
        $payementDate = new DateTime();
        $deadline = new DateTime();
        $deadline->modify('-1 month');
        $amount = 12345.12;
        $raw = $this->calculator->calcCapital($payementDate, $deadline, $amount);
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage deadline must be greater than payementDate
    */
    public function testCalcCapitalOverlappedPaymentDateAndDeadline() {
        $payementDate = new DateTime();
        $payementDate->modify('+2 months');
        $deadline = new DateTime();
        $deadline->modify('+1 month');
        $amount = 12345.12;
        $raw = $this->calculator->calcCapital($payementDate, $deadline, $amount);
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage amount must be unsigned
    */
    public function testCalcCapitalNegativeAmount() {
        $payementDate = new DateTime();
        $payementDate->modify('+1 months');
        $deadline = new DateTime();
        $deadline->modify('+2 month');
        $amount = -5;
        $raw = $this->calculator->calcCapital($payementDate, $deadline, $amount);
    }

    /**
     * @dataProvider calcAnnualPensionSingleProvider
     */
    public function testCalcAnnualPensionSingle($capital, $gender, $age, $expected) {
        $raw = $this->calculator->calcAnnualPensionSingle($capital, $gender, $age);
        $formatted = $this->calculator->formatCents($raw);
        $this->assertEquals($expected, $formatted);
    }

    public function calcAnnualPensionSingleProvider() {
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
    public function testCalcAnnualPensionSingleNotNumericCapital() {
        $this->calculator->calcAnnualPensionSingle('abcd', 'man', 90);
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage gender must be string of "man" or "woman"
    */
    public function testCalcAnnualPensionSingleInvalidGender() {
        $this->calculator->calcAnnualPensionSingle(22851.50, 'G', 90);
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage age must be an integer
    */
    public function testCalcAnnualPensionSingleNotIntAge() {
        $this->calculator->calcAnnualPensionSingle(22851.50, 'man', '90');
    }

    /**
     * @dataProvider calcAnnualPensionCoupleProvider
     */
    public function testCalcAnnualPensionCouple($capital, $gender, $age, $percent, $expected) {
        $raw = $this->calculator->calcAnnualPensionCouple($capital, $gender, $age, $percent);
        $formatted = $this->calculator->formatCents($raw);
        $this->assertEquals($expected, $formatted);
    }

    public function calcAnnualPensionCoupleProvider() {
        return [
            [22850.84, 'man', 60, 75, 1104.00],
            [22850.84, 'man', 90, 80, 1342.20],
            [22850.84, 'woman', 60, 75, 1103.40],
            [22850.84, 'woman', 90, 80, 1336.80],
        ];
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage capital must be numeric
    */
    public function testCalcAnnualPensionCoupleNotNumericCapital() {
        $this->calculator->calcAnnualPensionCouple('abcd', 'man', 90, 75);
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage gender must be string of "man" or "woman"
    */
    public function testCalcAnnualPensionCoupleInvalidGender() {
        $this->calculator->calcAnnualPensionCouple(22851.50, 'G', 90, 75);
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage age must be an integer
    */
    public function testCalcAnnualPensionCoupleNotIntAge() {
        $this->calculator->calcAnnualPensionCouple(22851.50, 'man', '90', 75);
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage percent must be numeric
    */
    public function testCalcAnnualPensionCoupleNotNumericPercent() {
        $this->calculator->calcAnnualPensionCouple(22851.50, 'man', 90, 'abcd');
    }

    /**
     * @dataProvider calcSurvivorPensionProvider
     */
    public function testCalcSurvivorPension($annual_pension_couple, $percent, $expected) {
        $raw = $this->calculator->calcSurvivorPension($annual_pension_couple, $percent);
        $formatted = $this->calculator->formatCents($raw);
        $this->assertEquals($expected, $formatted);
    }

    public function calcSurvivorPensionProvider() {
        return [
            [1103.40, 40, 441.60],
            [1103.40, 60, 661.80],
            [1103.40, 75, 827.40],
            [1103.40, 80, 882.60],
            [1103.40, 100, 1103.40],
        ];
    }

    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage capital must be numeric
    */
    public function testCalcSurvivorPensionNotNumericCapital() {
        $this->calculator->calcSurvivorPension('abcd', 75);
    }
    /**
    * @expectedException \InvalidArgumentException
    * @expectedExceptionMessage percent must be numeric
    */
    public function testCalcSurvivorPensionNotNumericPercent() {
        $this->calculator->calcSurvivorPension(1103.40, 'abcd');
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
        } catch (\Throwable $t) {
            // Executed only in PHP 7, will not match in PHP 5.x
            $this->assertContains('must be an instance of DateTime', $t->getMessage());
        } catch (\Exception $e) {
            // Executed only in PHP 5.x, will not be reached in PHP 7
            $this->assertContains('must be an instance of DateTime', $e->getMessage());
        }

    }

    public function testdays360NotDateTo() {
        try {
            $from = DateTime::createFromFormat('d/m/Y h:i:s', '22/11/2012 00:00:00');
            $to = '31/12/2012';
            $this->calculator->days360($from, $to);
        } catch (\Throwable $t) {
            // Executed only in PHP 7, will not match in PHP 5.x
            $this->assertContains('must be an instance of DateTime', $t->getMessage());
        } catch (\Exception $e) {
            // Executed only in PHP 5.x, will not be reached in PHP 7
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

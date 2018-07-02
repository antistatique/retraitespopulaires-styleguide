<?php

namespace Drupal\rp_libre_passage\tests\src\Unit;

use Drupal\rp_libre_passage\Service\PLPCalculator;
use PHPUnit_Framework_TestCase;
use DateTime;

/**
 * PLP Calculator test class.
 */
class PLPCalculatorTest extends PHPUnit_Framework_TestCase {
  /**
   * PLP Calculator service.
   *
   * @var \Drupal\rp_libre_passage\Service\PLPCalculator
   */
  private $calculator;

  /**
   * Set up test.
   */
  public function setUp() {
    $plpRatesRepositoryMock = $this->createMock('Drupal\rp_libre_passage\Service\PLPRatesRepository');

    // Mock getRate.
    $plpRatesRepositoryMock
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
        );

    // Mock getRate.
    $plpRatesRepositoryMock
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
        );

    $this->calculator = new PLPCalculator($plpRatesRepositoryMock);
  }

  /**
   * Test dead line.
   */
  public function testDeadline() {
    $birthdate = DateTime::createFromFormat('d/m/Y h:i:s', '25/03/1994 00:00:00');
    $age = 60;
    $expected = DateTime::createFromFormat('d/m/Y h:i:s', '31/03/2054 00:00:00');

    $result = $this->calculator->getDeadline($birthdate, $age);
    $this->assertInstanceOf(DateTime::class, $result);
    $this->assertEquals($expected->getTimestamp(), $result->getTimestamp());
  }

  /**
   * Test deadline not date time birthday error.
   */
  public function testDeadlineNotDateTimeBirthdate() {
    try {
      $this->calculator->getDeadline(NULL, 60);
    }
    catch (\Throwable $t) {
      // Executed only in PHP 7, will not match in PHP 5.x.
      $this->assertContains('must be an instance of DateTime', $t->getMessage());
    }
    catch (\Exception $e) {
      // Executed only in PHP 5.x, will not be reached in PHP 7.
      $this->assertContains('must be an instance of DateTime', $e->getMessage());
    }
  }

  /**
   * Test deadline birthday in future error.
   */
  public function testDeadlineFuturBirthdate() {
    $birthdate = DateTime::createFromFormat('d/m/Y h:i:s', '25/03/3000 00:00:00');

    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('birthdate must be greater than today');
    $this->calculator->getDeadline($birthdate, 60);
  }

  /**
   * Test deadline not int age error.
   */
  public function testDeadlineNotIntegerAge() {
    $birthdate = DateTime::createFromFormat('d/m/Y h:i:s', '25/03/1994 00:00:00');

    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('paymentAge must be numeric and greater than today - birthdate');
    $this->calculator->getDeadline($birthdate, 'fail');
  }

  /**
   * Test dateline negative age error.
   */
  public function testDeadlineNegativeAge() {
    $birthdate = DateTime::createFromFormat('d/m/Y h:i:s', '25/03/1994 00:00:00');

    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('paymentAge must be numeric and greater than today - birthdate');
    $this->calculator->getDeadline($birthdate, -1);
  }

  /**
   * Test deadline overlapped error.
   */
  public function testDeadlineOverlappedAge() {
    $birthdate = DateTime::createFromFormat('d/m/Y h:i:s', '25/03/1994 00:00:00');

    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('paymentAge must be numeric and greater than today - birthdate');
    $this->calculator->getDeadline($birthdate, 1);
  }

  /**
   * Test capital calc.
   *
   * @dataProvider calcCapitalProvider
   */
  public function testCalcCapital($payementDate, $deadline, $amount, $expected) {
    $raw = $this->calculator->calcCapital($payementDate, $deadline, $amount);
    $formatted = $this->calculator->formatCents($raw);
    $this->assertEquals($expected, $formatted);
  }

  /**
   * Some capital calc.
   */
  public function calcCapitalProvider() {
    return [
            [
              DateTime::createFromFormat('d/m/Y h:i:s', '22/11/2012 00:00:00'),
              DateTime::createFromFormat('d/m/Y h:i:s', '31/03/2054 00:00:00'),
              12345.12,
              22851.50,
            ],
    ];
  }

  /**
   * Test capital not datetime payement error.
   */
  public function testCalcCapitalNotDateTimePayementDate() {
    try {
      $payementDate = '22/11/2012';
      $deadline = new DateTime();
      $amount = 12345.12;

      $this->calculator->calcCapital($payementDate, $deadline, $amount);
    }
    catch (\Throwable $t) {
      // Executed only in PHP 7, will not match in PHP 5.x.
      $this->assertContains('must be an instance of DateTime', $t->getMessage());
    }
    catch (\Exception $e) {
      // Executed only in PHP 5.x, will not be reached in PHP 7.
      $this->assertContains('must be an instance of DateTime', $e->getMessage());
    }
  }

  /**
   * Test capital not datetime deadline error.
   */
  public function testCalcCapitalNotDateTimeDeadline() {
    try {
      $payementDate = new DateTime();
      $deadline = '22/11/2012';
      $amount = 12345.12;

      $this->calculator->calcCapital($payementDate, $deadline, $amount);
    }
    catch (\Throwable $t) {
      // Executed only in PHP 7, will not match in PHP 5.x.
      $this->assertContains('must be an instance of DateTime', $t->getMessage());
    }
    catch (\Exception $e) {
      // Executed only in PHP 5.x, will not be reached in PHP 7.
      $this->assertContains('must be an instance of DateTime', $e->getMessage());
    }
  }

  /**
   * Test Capital deadline in paste error.
   */
  public function testCalcCapitalPastDeadlineDate() {
    $payementDate = new DateTime();
    $deadline = new DateTime();
    $deadline->modify('-1 month');
    $amount = 12345.12;

    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('deadline must be greater or equal as today');
    $this->calculator->calcCapital($payementDate, $deadline, $amount);
  }

  /**
   * Test capital overlapped payement date error.
   */
  public function testCalcCapitalOverlappedPaymentDateAndDeadline() {
    $payementDate = new DateTime();
    $payementDate->modify('+2 months');
    $deadline = new DateTime();
    $deadline->modify('+1 month');
    $amount = 12345.12;

    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('deadline must be greater than payementDate');
    $this->calculator->calcCapital($payementDate, $deadline, $amount);
  }

  /**
   * Test negative amount capital error.
   */
  public function testCalcCapitalNegativeAmount() {
    $payementDate = new DateTime();
    $payementDate->modify('+1 months');
    $deadline = new DateTime();
    $deadline->modify('+2 month');
    $amount = -5;

    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('amount must be unsigned');
    $this->calculator->calcCapital($payementDate, $deadline, $amount);
  }

  /**
   * Test annual pension single calc.
   *
   * @dataProvider calcAnnualPensionSingleProvider
   */
  public function testCalcAnnualPensionSingle($capital, $gender, $age, $expected) {
    $raw = $this->calculator->calcAnnualPensionSingle($capital, $gender, $age);
    $formatted = $this->calculator->formatCents($raw);
    $this->assertEquals($expected, $formatted);
  }

  /**
   * Some annual pension single.
   */
  public function calcAnnualPensionSingleProvider() {
    return [
            [22850.84, 'man', 60, 1361.40],
            [22851.50, 'man', 90, 1770.60],
            [22850.84, 'woman', 60, 1129.80],
            [22851.50, 'woman', 90, 1367.40],
    ];
  }

  /**
   * Test annual pension single nut numeric capital error.
   */
  public function testCalcAnnualPensionSingleNotNumericCapital() {
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('capital must be numeric');
    $this->calculator->calcAnnualPensionSingle('abcd', 'man', 90);
  }

  /**
   * Test annual pension single invalid gender error.
   */
  public function testCalcAnnualPensionSingleInvalidGender() {
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('gender must be string of "man" or "woman"');
    $this->calculator->calcAnnualPensionSingle(22851.50, 'G', 90);
  }

  /**
   * Test annual pension single not int age error.
   */
  public function testCalcAnnualPensionSingleNotIntAge() {
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('age must be an integer');
    $this->calculator->calcAnnualPensionSingle(22851.50, 'man', '90');
  }

  /**
   * Test annual pension couple.
   *
   * @dataProvider calcAnnualPensionCoupleProvider
   */
  public function testCalcAnnualPensionCouple($capital, $gender, $age, $percent, $expected) {
    $raw = $this->calculator->calcAnnualPensionCouple($capital, $gender, $age, $percent);
    $formatted = $this->calculator->formatCents($raw);
    $this->assertEquals($expected, $formatted);
  }

  /**
   * Some annual pension couple data.
   */
  public function calcAnnualPensionCoupleProvider() {
    return [
            [22850.84, 'man', 60, 75, 1104.00],
            [22850.84, 'man', 90, 80, 1342.20],
            [22850.84, 'woman', 60, 75, 1103.40],
            [22850.84, 'woman', 90, 80, 1336.80],
    ];
  }

  /**
   * Test annual pension couple not numeric error.
   */
  public function testCalcAnnualPensionCoupleNotNumericCapital() {
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('capital must be numeric');
    $this->calculator->calcAnnualPensionCouple('abcd', 'man', 90, 75);
  }

  /**
   * Test annual pension couple invalid Gender error.
   */
  public function testCalcAnnualPensionCoupleInvalidGender() {
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('gender must be string of "man" or "woman"');
    $this->calculator->calcAnnualPensionCouple(22851.50, 'G', 90, 75);
  }

  /**
   * Test annual pension couple not int age error.
   */
  public function testCalcAnnualPensionCoupleNotIntAge() {
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('age must be an integer');
    $this->calculator->calcAnnualPensionCouple(22851.50, 'man', '90', 75);
  }

  /**
   * Test annual pension couple not numeric percent error.
   */
  public function testCalcAnnualPensionCoupleNotNumericPercent() {
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('percent must be numeric');
    $this->calculator->calcAnnualPensionCouple(22851.50, 'man', 90, 'abcd');
  }

  /**
   * Test survivor pension calc.
   *
   * @dataProvider calcSurvivorPensionProvider
   */
  public function testCalcSurvivorPension($annual_pension_couple, $percent, $expected) {
    $raw = $this->calculator->calcSurvivorPension($annual_pension_couple, $percent);
    $formatted = $this->calculator->formatCents($raw);
    $this->assertEquals($expected, $formatted);
  }

  /**
   * Some survivor pension data.
   */
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
   * Test survivor pension not numeric error.
   */
  public function testCalcSurvivorPensionNotNumericCapital() {
    $this->calculator->calcSurvivorPension('abcd', 75);
  }

  /**
   * Test survivor pension not numeric percent error.
   */
  public function testCalcSurvivorPensionNotNumericPercent() {
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('percent must be numeric');
    $this->calculator->calcSurvivorPension(1103.40, 'abcd');
  }

  /**
   * Test 360 days calc.
   *
   * @dataProvider days360Provider
   */
  public function testdays360($from, $to, $expected) {
    $this->assertEquals($expected, $this->calculator->days360($from, $to));
  }

  /**
   * Some 360 days data.
   */
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

  /**
   * Test 360 not date from error.
   */
  public function testdays360NotDateFrom() {
    try {
      $from = '22/11/2012';
      $to = DateTime::createFromFormat('d/m/Y h:i:s', '31/12/2012 00:00:00');
      $this->calculator->days360($from, $to);
    }
    catch (\Throwable $t) {
      // Executed only in PHP 7, will not match in PHP 5.x.
      $this->assertContains('must be an instance of DateTime', $t->getMessage());
    }
    catch (\Exception $e) {
      // Executed only in PHP 5.x, will not be reached in PHP 7.
      $this->assertContains('must be an instance of DateTime', $e->getMessage());
    }

  }

  /**
   * Test 360 not date to error.
   */
  public function testdays360NotDateTo() {
    try {
      $from = DateTime::createFromFormat('d/m/Y h:i:s', '22/11/2012 00:00:00');
      $to = '31/12/2012';
      $this->calculator->days360($from, $to);
    }
    catch (\Throwable $t) {
      // Executed only in PHP 7, will not match in PHP 5.x.
      $this->assertContains('must be an instance of DateTime', $t->getMessage());
    }
    catch (\Exception $e) {
      // Executed only in PHP 5.x, will not be reached in PHP 7.
      $this->assertContains('must be an instance of DateTime', $e->getMessage());
    }
  }

  /**
   * Test 360 from greater than to error.
   */
  public function testdays360FromGreaterThanTo() {
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('to must be greater than from');
    $to = DateTime::createFromFormat('d/m/Y h:i:s', '22/11/2012 00:00:00');
    $from = DateTime::createFromFormat('d/m/Y h:i:s', '31/12/2012 00:00:00');
    $this->calculator->days360($from, $to);
  }

}

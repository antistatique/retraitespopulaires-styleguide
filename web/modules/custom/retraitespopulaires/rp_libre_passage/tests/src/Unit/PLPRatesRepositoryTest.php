<?php

namespace Drupal\rp_libre_passage\tests\src\Unit;

use Drupal\rp_libre_passage\Service\PLPRatesRepository;
use PHPUnit_Framework_TestCase;
use DateTime;

/**
 * PLP Rate test class.
 */
class PLPRatesRepositoryTest extends PHPUnit_Framework_TestCase {
  /**
   * Rates rapository.
   *
   * @var \Drupal\rp_libre_passage\Service\PLPRatesRepository
   */
  private $ratesRepo;

  /**
   * Set up test.
   */
  public function setUp() {
    $plpInterestRate = $this->createMock('Drupal\rp_libre_passage\Service\PLPInterestRate');

    $plpInterestRate
      ->method('getRate')
      ->will(
            $this->returnValueMap([
                [1900, [
                  'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-1900 00:00:00'),
                  'end'   => DateTime::createFromFormat('m-d-Y h:i:s', '12-31-2011 00:00:00'),
                  'rate'  => 2,
                ],
                ],
                [1990, [
                  'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-1900 00:00:00'),
                  'end'   => DateTime::createFromFormat('m-d-Y h:i:s', '12-31-2011 00:00:00'),
                  'rate'  => 2,
                ],
                ],
                [2000, [
                  'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-1900 00:00:00'),
                  'end'   => DateTime::createFromFormat('m-d-Y h:i:s', '12-31-2011 00:00:00'),
                  'rate'  => 2,
                ],
                ],
                [2011, [
                  'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-1900 00:00:00'),
                  'end'   => DateTime::createFromFormat('m-d-Y h:i:s', '12-31-2011 00:00:00'),
                  'rate'  => 2,
                ],
                ],
                [2012, [
                  'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-2012 00:00:00'),
                  'end'   => DateTime::createFromFormat('m-d-Y h:i:s', '12-31-9999 00:00:00'),
                  'rate'  => 1.5,
                ],
                ],
                [2013, [
                  'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-2012 00:00:00'),
                  'end'   => DateTime::createFromFormat('m-d-Y h:i:s', '12-31-9999 00:00:00'),
                  'rate'  => 1.5,
                ],
                ],
                [2100, [
                  'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-2012 00:00:00'),
                  'end'   => DateTime::createFromFormat('m-d-Y h:i:s', '12-31-9999 00:00:00'),
                  'rate'  => 1.5,
                ],
                ],
                [3000, [
                  'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-2012 00:00:00'),
                  'end'   => DateTime::createFromFormat('m-d-Y h:i:s', '12-31-9999 00:00:00'),
                  'rate'  => 1.5,
                ],
                ],
            ])
        );

    $plpConversionRate = $this->createMock('Drupal\rp_libre_passage\Service\PLPConversionRate');

    $plpConversionRate
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
        );

    $this->ratesRepo = new PLPRatesRepository($plpInterestRate, $plpConversionRate);
  }

  /**
   * Test get rate function.
   *
   * @dataProvider getRateProvider
   */
  public function testGetRate($year, $expected) {
    $this->assertEquals($expected, $this->ratesRepo->getRate($year));
  }

  /**
   * Get some rates.
   */
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
   * Test invalide year error.
   */
  public function testGetRateInvalidYear() {
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage("year isn't in the repository");
    $this->ratesRepo->getRate(100);
  }

  /**
   * Test not int year error.
   */
  public function testGetRateNotIntYear() {
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('year must be an integer');
    $this->ratesRepo->getRate('2000');
  }

  /**
   * Test rate conversion.
   *
   * @dataProvider getConversionRateProvider
   */
  public function testGetConversionRate($gender, $age, $percent, $expected) {
    $this->assertEquals($expected, $this->ratesRepo->getConversionRate($gender, $age, $percent));
  }

  /**
   * Get some rates conversion.
   */
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
   * Test conversion invalid gender error.
   */
  public function testGetConversionRateInvalidGender() {
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('gender must be string of "man" or "woman"');
    $this->ratesRepo->getConversionRate('G', 60, 0);
  }

  /**
   * Test not int rate age error.
   */
  public function testGetConversionRateNotIntAge() {
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('age must be an integer');
    $this->ratesRepo->getConversionRate('man', '60', 0);
  }

  /**
   * Test not numeric percentage error.
   */
  public function testGetConversionRateNotNumericPercent() {
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('percent must be numeric');
    $this->ratesRepo->getConversionRate('man', 60, 'abcdf');
  }

  /**
   * Test conversion rate too young error.
   */
  public function testGetConversionRateYoungAge() {
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('age is not enought');
    $this->ratesRepo->getConversionRate('man', 20, '0');
  }

  /**
   * Test conversion rate invalid percent error.
   */
  public function testGetConversionRateInvalidPercent() {
    $this->expectException(\InvalidArgumentException::class);
    $this->ratesRepo->getConversionRate('man', 60, 2000);
  }

}

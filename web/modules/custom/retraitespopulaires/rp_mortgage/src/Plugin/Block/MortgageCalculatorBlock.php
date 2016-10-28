<?php
namespace Drupal\rp_mortgage\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\rp_mortgage\Service\Rate;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides the 'Mortgage Calculator' Block
 *
 * @Block(
 *   id = "rp_mortgage_calculator_block",
 *   admin_label = @Translation("Mortgage Calculator block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_mortgage_calculator_block')
 * </code>
 */
class MortgageCalculatorBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
     * @var Rate
     */
    private $rateService;

    /**
     * Mortgage Calculator constructor.
     *
     * @param array                            $configuration
     * @param string                           $plugin_id
     * @param mixed                            $plugin_definition
     * @param \Drupal\rp_mortgage\Service\Rate $rateService
     */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, Rate $rateService) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->rateService = $rateService;
    }

    /**
     * @param \Symfony\Component\DependencyInjection\ContainerInterface $container
     * @param array                                                     $configuration
     * @param string                                                    $plugin_id
     * @param mixed                                                     $plugin_definition
     *
     * @return \Drupal\rp_mortgage\Plugin\Block\TableRateBlock
     */
    public static function create(ContainerInterface $container,
        array $configuration,
        $plugin_id,
        $plugin_definition
    ) {
        return new self($configuration, $plugin_id, $plugin_definition, $container->get('rp_mortgage.rate'));
    }


    /**
     * {@inheritdoc}
     */
    public function build($params = array()) {
        $variables = [];
        $rateType = 'Prêts hypothécaires formulaire'; // 'Prêts hypothécaires standard' ?
        $variables['rates'] = $this->rateService->getRates($rateType);

        return [
            '#theme'     => 'rp_mortgage_calculator_block',
            '#variables' => $variables,
        ];
    }
}

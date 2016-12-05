<?php
namespace Drupal\rp_libre_passage\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;

use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides the 'PLP Calculator' Block
 *
 * @Block(
 *   id = "rp_libre_passage_plp_calculator_block",
 *   admin_label = @Translation("PLP Calculator block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_libre_passage_plp_calculator_block')
 * </code>
 */
class PLPCalculatorBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
     * PLP Calculator constructor.
     *
     * @param array     $configuration
     * @param string    $plugin_id
     * @param mixed     $plugin_definition
     */
    public function __construct(array $configuration, $plugin_id, $plugin_definition) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
    }

    /**
     * @param \Symfony\Component\DependencyInjection\ContainerInterface $container
     * @param array                                                     $configuration
     * @param string                                                    $plugin_id
     * @param mixed                                                     $plugin_definition
     *
     * @return \Drupal\rp_libre_passage\Plugin\Block\TableRateBlock
     */
    public static function create(ContainerInterface $container,
        array $configuration,
        $plugin_id,
        $plugin_definition
    ) {
        return new self($configuration, $plugin_id, $plugin_definition);
    }


    /**
     * {@inheritdoc}
     */
    public function build($params = array()) {
        $variables = [];

        return [
            '#theme'     => 'rp_libre_passage_plp_calculator_block',
            '#variables' => $variables,
        ];
    }
}

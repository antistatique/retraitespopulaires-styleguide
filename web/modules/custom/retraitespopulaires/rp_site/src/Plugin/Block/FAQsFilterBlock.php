<?php

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\rp_site\Service\Profession;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Provides a 'FAQs Filter' Block.
 *
 * @Block(
 *   id = "rp_site_faqs_filter_block",
 *   admin_label = @Translation("FAQs Filter block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_site_faqs_filter_block')
 * </code>
 */
class FAQsFilterBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * EntityTypeManagerInterface to load Taxonomy.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityTaxonomy;

  /**
   * AliasManagerInterface Service.
   *
   * @var \Drupal\Core\Path\AliasManagerInterface
   */
  private $aliasManager;

  /**
   * Profession Service.
   *
   * @var \Drupal\rp_site\Service\Profession
   */
  private $profession;

  /**
   * The request.
   *
   * @var \Symfony\Component\HttpFoundation\Request
   */
  private $request;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, AliasManagerInterface $alias_manager, Profession $profession, RequestStack $requestStack) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityTaxonomy = $entity->getStorage('taxonomy_term');
    $this->aliasManager   = $alias_manager;
    $this->profession     = $profession;
    $this->request        = $requestStack->getCurrentRequest();
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    // Instantiates this form class.
    return new static(
      // Load the service required to construct this class.
      $configuration,
      $plugin_id,
      $plugin_definition,
      // Load customs services used in this class.
      $container->get('entity_type.manager'),
      $container->get('path.alias_manager'),
      $container->get('rp_site.profession'),
      $container->get('request_stack')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = ['categories' => []];

    $taxonomy_term_alias = $this->request->query->get('profession_alias');
    $variables['current_aliases'] = $taxonomy_term_alias;

    // Professions.
    $professions = $this->entityTaxonomy->loadTree('profession');

    // Only interested by alias of Profession taxonomy.
    foreach ($professions as $profession) {
      $alias = $this->aliasManager->getAliasByPath('/taxonomy/term/' . $profession->tid);
      if (!empty($alias)) {
        $alias = str_replace('/metier/', '', $alias);
        $variables['categories'][] = [
          'term'  => $profession,
          'alias' => $alias,
        ];

        if ($alias == $taxonomy_term_alias) {
          $variables['selected'] = $this->entityTaxonomy->load($profession->tid);
        }
      }
    }

    return [
      '#theme'     => 'rp_site_faqs_filter_block',
      '#variables' => $variables,
    ];
  }

}

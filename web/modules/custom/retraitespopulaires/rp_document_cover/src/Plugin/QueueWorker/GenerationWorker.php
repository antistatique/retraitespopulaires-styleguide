<?php

namespace Drupal\rp_document_cover\Plugin\QueueWorker;

use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Queue\QueueWorkerBase;
use Drupal\rp_document_cover\Service\Generation;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Used to process document cover generation.
 *
 * @QueueWorker(
 *  id = "rp_document_cover_generation",
 *  title = @Translation("Generates document cover"),
 *  cron = {"time" = 5},
 * )
 */
class GenerationWorker extends QueueWorkerBase implements ContainerFactoryPluginInterface {

  /**
   * The cover generation service.
   *
   * @var \Drupal\rp_document_cover\Service\Generation
   */
  protected $generation;

  /**
   * Creates a new Worker.
   */
  public function __construct(Generation $generation) {
    $this->generation = $generation;
  }

  /**
   * Inject cover generation service.
   *
   * @inheritdoc
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $container->get('rp_document_cover.generation')
    );
  }

  /**
   * Process nod in queue.
   *
   * @inheritdoc
   */
  public function processItem($entity) {

    $file = $entity->get('field_file_document')->entity;
    $dest_uri = 'public://covers/';
    file_prepare_directory($dest_uri, FILE_CREATE_DIRECTORY);

    $image = $this->generation->generateImage($file, $dest_uri);

    if ($image) {
      $this->generation->saveImage($entity, $image);
    }
  }

}

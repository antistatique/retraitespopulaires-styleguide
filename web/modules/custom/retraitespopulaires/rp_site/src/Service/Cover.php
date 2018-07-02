<?php

namespace Drupal\rp_site\Service;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\image\Entity\ImageStyle;
use Drupal\Core\File\FileSystemInterface;
use Drupal\node\Entity\Node;

/**
 * Cover.
 */
class Cover {
  /**
   * EntityTypeManagerInterface to load Files.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityFile;

  /**
   * Provides helpers to operate on files and stream wrappers.
   *
   * @var \Drupal\Core\File\FileSystemInterface
   */
  private $fso;

  /**
   * Class constructor.
   */
  public function __construct(EntityTypeManagerInterface $entity, FileSystemInterface $fso) {
    $this->entityFile = $entity->getStorage('file');
    $this->fso        = $fso;
  }

  /**
   * Generate Image Style, with responsive format.
   *
   * @param \Drupal\node\Entity\Node $node
   *   Node to retreive cover and derivate it.
   * @param array $styles
   *   Styles to be derivated.
   *
   * @return array
   *   Derivated link of styles.
   */
  public function fromNode(Node $node, array $styles) {
    $build = [];

    // Retreive node.
    $cover_fid = '';

    if (isset($node->field_cover) && $node->field_cover->entity) {
      $cover_fid = $node->field_cover->entity->id();
    }

    if ($cover_fid) {
      $build = $this->derivate($cover_fid, $styles);
    }

    return $build;
  }

  /**
   * Generate Image Style, with responsive format.
   *
   * @param int $fid
   *   File id to derivate.
   * @param array $styles
   *   Styles to be derivated.
   *
   * @return array
   *   Derivated link of styles.
   */
  public function fromFile($fid, array $styles) {
    $build = [];

    $image = $this->entityFile->load($fid);

    if ($image) {
      $build = $this->derivate($fid, $styles);
    }

    return $build;
  }

  /**
   * Generate Image Style, with responsive format.
   *
   * .@Gido think is dirty to do it this way - but Drupal seems bugy when
   * generating & serving first time an image style - The problematic, sometimes
   * browser keep the first trial in cache and keep no image in his local cache.
   * Issue Github: #111
   *
   * @param int $fid
   *   File id to derivate.
   * @param array $styles
   *   Styles to be derivated.
   *
   * @return array
   *   Derivated link of styles.
   */
  private function derivate($fid, array $styles) {
    $build = [];

    $image = $this->entityFile->load($fid);

    // Check the image exist on the file system.
    $image_path = $this->fso->realpath($image->getFileUri());
    if (!file_exists($image_path)) {
      return $build;
    }

    foreach ($styles as $media => $style) {
      $img_style = ImageStyle::load($style);

      if ($img_style) {
        $destination_uri = $img_style->buildUri($image->getFileUri());
        $destination_url = $img_style->buildUrl($image->getFileUri());

        // Avoid generating image style already existing.
        $file = $this->fso->realpath($destination_uri);
        if (file_exists($file)) {
          $build[$media] = $destination_url;
          continue;
        }

        // Create the new image derivative.
        $img_style->createDerivative($image->getFileUri(), $destination_uri);
        $build[$media] = $destination_url;
      }
    }

    return $build;
  }

}

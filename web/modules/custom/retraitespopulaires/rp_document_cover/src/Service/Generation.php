<?php

namespace Drupal\rp_document_cover\Service;

use Drupal\Core\File\FileSystemInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\file\Entity\File;

/**
 * Class Generation.
 */
class Generation {

  /**
   * Drupal\Core\File\FileSystemInterface definition.
   *
   * @var \Drupal\Core\File\FileSystemInterface
   */
  protected $fileSystem;

  /**
   * Constructs a new Generation object.
   */
  public function __construct(FileSystemInterface $file_system) {
    $this->fileSystem = $file_system;
  }

  /**
   * Creates an image from a given file at the given destination.
   *
   * @param \Drupal\file\Entity\File $file
   *   PDF to generate the cover from.
   * @param string $dest_uri
   *   The location of the generated image.
   *
   * @return array
   *   Array containing image infos.
   */
  public function generateImage(File $file, $dest_uri) {

    $file_name = $file->getFilename();
    $source_uri = $file->getFileUri();
    $source_path = $this->fileSystem->realpath($source_uri);
    $dest_path = $this->fileSystem->realpath($dest_uri);
    $image_path = $dest_path . '/' . $file_name . '.jpg';

    try {
      $imgk = new \Imagick();
      $imgk->setResolution(300, 300);
      $imgk->setColorspace(\Imagick::COLORSPACE_RGB);
      $imgk->setInterlaceScheme(\Imagick::INTERLACE_PLANE);
      $imgk->setBackgroundColor('white');
      $imgk->readimage($source_path . '[0]');
      $imgk->setImageFormat('jpg');

      $imgk_width = $imgk->getImageWidth();
      $imgk_height = $imgk->getImageHeight();

      if ($imgk_width < $imgk_height) {
        $imgk->thumbnailImage(0, 300);
      }
      else {
        $imgk->thumbnailImage(300, 0);
      }

      $imgk->writeImage($image_path);
      $imgk->clear();
      $imgk->destroy();

    }
    catch (\ImagickException $imagickException) {

      \Drupal::logger('rp_document_cover')
        ->error('imagickException: @message. Generation aborted',
          [
            '@message' => $imagickException->getMessage(),
          ]);

      return FALSE;
    }
    $image = [
      'data' => file_get_contents($image_path),
      'uri' => $dest_uri . $file_name . '.jpg',
    ];

    return $image;
  }

  /**
   * Saves the generated image in the field_doc_cover field.
   *
   * @param Drupal\Core\Entity\EntityInterface $entity
   *   The document node.
   * @param array $image
   *   The image infos.
   */
  public function saveImage(EntityInterface $entity, array $image) {

    $file = file_save_data($image['data'], $image['uri'], FILE_EXISTS_REPLACE);

    if ($file) {
      $fid = $file->id();
      $entity->set('field_doc_cover', $fid);
      $entity->save();

      \Drupal::logger('rp_document_cover')
        ->info('Cover generated for @title',
          [
            '@title' => $entity->get('title')->value,
          ]);
    }
    else {
      \Drupal::logger('rp_document_cover')
        ->error('Cover could not be generated for @title',
          [
            '@title' => $entity->get('title')->value,
          ]);
    }
  }

}

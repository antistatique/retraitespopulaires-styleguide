<?php

namespace Drupal\rp_ckeditor\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;
use Drupal\ckeditor\CKEditorPluginInterface;
use Drupal\ckeditor\CKEditorPluginButtonsInterface;

/**
* Defines the "NBSP" plugin.
*
* @CKEditorPlugin(
*   id = "nbsp",
*   label = @Translation("Non-breaking space"),
*   module = "rp_ckeditor"
* )
*/
class Nbsp extends CKEditorPluginBase implements CKEditorPluginInterface, CKEditorPluginButtonsInterface {
    /**
    * {@inheritdoc}
    */
    public function getDependencies(Editor $editor) {
        return array();
    }

    /**
    * {@inheritdoc}
    */
    function isInternal() {
        return FALSE;
    }

    /**
    * {@inheritdoc}
    */
    public function getConfig(Editor $editor) {
        return array();
    }

    /**
    * {@inheritdoc}
    */
    public function getFile() {
        return drupal_get_path('module', 'rp_ckeditor') . '/plugins/' . $this->getPluginId() . '/plugin.js';
    }


    /**
    * {@inheritdoc}
    */
    public function getButtons() {
        return array(
            'DrupalNbsp' => array(
                'label' => t('Non-breaking space'),
                'image' => drupal_get_path('module', 'rp_ckeditor') . '/plugins/' . $this->getPluginId() . '/icons/' . $this->getPluginId() . '.png',
            ),
        );
    }
}

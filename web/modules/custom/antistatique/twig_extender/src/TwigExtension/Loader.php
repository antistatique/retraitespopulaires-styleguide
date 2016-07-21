<?php
namespace Drupal\twig_extender\TwigExtension;

class Loader extends \Twig_Extension {

    /**
    * List of all Twig functions
    */
    public function getFunctions() {
        return [
            new \Twig_SimpleFunction('load_node', array($this, 'loadNode'), array('is_safe' => array('html'))),
            new \Twig_SimpleFunction('load_block', array($this, 'loadBlock'), array('is_safe' => array('html'))),
        ];
    }

    /**
    * Unique identifier for this Twig extension
    */
    public function getName() {
        return 'twig_extender.twig.loader';
    }

    /**
    * Load a given block
    * with or whitout parameters
    */
    public static function loadBlock($block_id, $params = array()) {
        $instance = \Drupal::service('plugin.manager.block')
            ->createInstance($block_id, $params);
        return $instance->build($params);
    }

    /**
     * Load a given node
     * with or whitout parameters
     */
     public static function loadNode($node_id, $params) {
         $node =  Node::load($node_id);
         return $node;
     }

}

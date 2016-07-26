<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\ProductsFilterBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Url;

use Drupal\Core\Entity\EntityTypeManager;
use Drupal\Core\Path\AliasManager;

/**
* Provides a 'ProductsFilter' Block
*
* @Block(
*   id = "rp_site_products_filter",
*   admin_label = @Translation("Products Filter block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_products_filter_block')
* </code>
*/
class ProductsFilterBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
    * EntityTypeManager to load Taxonomy
    * @var EntityTypeManager
    */
    private $entity_taxonomy;

    /**
     * AliasManager Service
     * @var AliasManager
     */
    private $alias_manager;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManager $entity,  AliasManager $alias_manager) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_taxonomy = $entity->getStorage('taxonomy_term');
        $this->alias_manager   = $alias_manager;
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
            $container->get('path.alias_manager')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array('categories' => array());

        // Products Plans
        $categories = $this->entity_taxonomy->loadTree('products_plan');
        foreach ($categories as $category) {
            $alias = $this->alias_manager->getAliasByPath('/taxonomy/term/'.$category->tid);
            if( !empty($alias) ){
                $term = array(
                    'term' => $category,
                    'alias' => str_replace('/plans/', '', $alias),
                );
                if ($category->parents[0] == '0') {
                    $term['children'] = array();
                    $variables['categories'][$category->tid] = $term;
                } elseif (isset($variables['categories'][$category->parents[0]]['children'])) {
                    $variables['categories'][$category->parents[0]]['children'][] = $term;
                }
            }
        }

        return [
            '#theme'     => 'rp_site_products_filter_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
            ]
        ];
    }
}


    function var_debug($variable,$strlen=100,$width=25,$depth=10,$i=0,&$objects = array())
    {
      $search = array("\0", "\a", "\b", "\f", "\n", "\r", "\t", "\v");
      $replace = array('\0', '\a', '\b', '\f', '\n', '\r', '\t', '\v');

      $string = '';

      switch(gettype($variable)) {
        case 'boolean':      $string.= $variable?'true':'false'; break;
        case 'integer':      $string.= $variable;                break;
        case 'double':       $string.= $variable;                break;
        case 'resource':     $string.= '[resource]';             break;
        case 'NULL':         $string.= "null";                   break;
        case 'unknown type': $string.= '???';                    break;
        case 'string':
          $len = strlen($variable);
          $variable = str_replace($search,$replace,substr($variable,0,$strlen),$count);
          $variable = substr($variable,0,$strlen);
          if ($len<$strlen) $string.= '"'.$variable.'"';
          else $string.= 'string('.$len.'): "'.$variable.'"...';
          break;
        case 'array':
          $len = count($variable);
          if ($i==$depth) $string.= 'array('.$len.') {...}';
          elseif(!$len) $string.= 'array(0) {}';
          else {
            $keys = array_keys($variable);
            $spaces = str_repeat(' ',$i*2);
            $string.= "array($len)\n".$spaces.'{';
            $count=0;
            foreach($keys as $key) {
              if ($count==$width) {
                $string.= "\n".$spaces."  ...";
                break;
              }
              $string.= "\n".$spaces."  [$key] => ";
              $string.= var_debug($variable[$key],$strlen,$width,$depth,$i+1,$objects);
              $count++;
            }
            $string.="\n".$spaces.'}';
          }
          break;
        case 'object':
          $id = array_search($variable,$objects,true);
          if ($id!==false)
            $string.=get_class($variable).'#'.($id+1).' {...}';
          else if($i==$depth)
            $string.=get_class($variable).' {...}';
          else {
            $id = array_push($objects,$variable);
            $array = (array)$variable;
            $spaces = str_repeat(' ',$i*2);
            $string.= get_class($variable)."#$id\n".$spaces.'{';
            $properties = array_keys($array);
            foreach($properties as $property) {
              $name = str_replace("\0",':',trim($property));
              $string.= "\n".$spaces."  [$name] => ";
              $string.= var_debug($array[$property],$strlen,$width,$depth,$i+1,$objects);
            }
            $string.= "\n".$spaces.'}';
          }
          break;
      }

      if ($i>0) return $string;

      $backtrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
      do $caller = array_shift($backtrace); while ($caller && !isset($caller['file']));
      if ($caller) $string = $caller['file'].':'.$caller['line']."\n".$string;

      echo $string;
    }

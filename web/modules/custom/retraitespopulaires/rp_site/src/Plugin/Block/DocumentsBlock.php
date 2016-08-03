<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\DocumentsBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Url;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\rp_site\Service\Profession;
use Drupal\Core\Entity\Query\QueryFactory;

/**
* Provides a 'Useful Documents' Block
*
* @Block(
*   id = "rp_site_documents",
*   admin_label = @Translation("Useful Documents block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_documents_block')
* </code>
*/
class DocumentsBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
    * EntityTypeManagerInterface to load Nodes
    * @var EntityTypeManagerInterface
    */
    private $entity_node;

    /**
    * Current Route
    * @var CurrentRouteMatch
    */
    private $route;

    /**
     * AliasManagerInterface Service
     * @var AliasManagerInterface
     */
    private $alias_manager;

    /**
     * Profession Service
     * @var Profession
     */
    private $profession;

    /**
    * QueryFactory to execute query
    * @var QueryFactory
    */
    private $entity_query;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, CurrentRouteMatch $route, AliasManagerInterface $alias_manager, Profession $profession, QueryFactory $query) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_node   = $entity->getStorage('node');
        $this->route         = $route;
        $this->alias_manager = $alias_manager;
        $this->profession    = $profession;
        $this->entity_query  = $query;
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
            $container->get('current_route_match'),
            $container->get('path.alias_manager'),
            $container->get('rp_site.profession'),
            $container->get('entity.query')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array('documents' => array());
        //Load the current node's field_document
        $documents_nids = array();
        if ($node = $this->route->getParameter('node')) {

            if( isset($node->field_document) && !$node->field_document->isEmpty() ){
                // Retrieve specified documents
                foreach ($node->field_document as $key => $doc) {
                    $documents_nids[] = $doc->target_id;
                }
                $variables['documents'] = $this->entity_node->loadMultiple($documents_nids);
            } else {
                // Retrieve random documents
                $query = $this->entity_query->get('node')
                    ->condition('type', 'document')
                    ->condition('status', 1)
                    ->condition('field_profession', $node->field_profession->target_id)
                    ->addTag('random')
                    ->range(0, 3);

                $nids = $query->execute();
                $variables['documents'] = $this->entity_node->loadMultiple($nids);
            }

            // Generate the collection link
            $alias = $this->alias_manager->getAliasByPath('/taxonomy/term/'.$node->field_profession->target_id);
            if( !empty($alias) ){
                $alias = str_replace('/', '', $alias);
            }

            $variables['collection'] = array(
                'name' => $this->profession->name($node->field_profession->target_id),
                'link' => Url::fromRoute('rp_site.documents.collection', array('taxonomy_term_alias' => $alias))
            );
        }

        return [
            '#theme'     => 'rp_site_documents_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
            ]
        ];
    }
}

function var_debug($variable, $depth=10, $strlen=100, $width=25, $i=0, &$objects = array()) {
$search = array("", "a", "", "", "
", "
", "	", "");
$replace = array('', 'a', '', '', '
', '
', '	', '');

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
      $string.= "array($len)
".$spaces.'{';
      $count=0;
      foreach($keys as $key) {
        if ($count==$width) {
          $string.= "
".$spaces."  ...";
          break;
        }
        $string.= "
".$spaces."  [$key] => ";
        $string.= var_debug($variable[$key],$strlen,$width,$depth,$i+1,$objects);
        $count++;
      }
      $string.="
".$spaces.'}';
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
      $string.= get_class($variable)."#$id
".$spaces.'{';
      $properties = array_keys($array);
      foreach($properties as $property) {
        $name = str_replace("",':',trim($property));
        $string.= "
".$spaces."  [$name] => ";
        $string.= var_debug($array[$property],$strlen,$width,$depth,$i+1,$objects);
      }
      $string.= "
".$spaces.'}';
    }
    break;
}

if ($i>0) return $string;

$backtrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
do $caller = array_shift($backtrace); while ($caller && !isset($caller['file']));
if ($caller) $string = $caller['file'].':'.$caller['line']."
".$string;

echo $string;
}

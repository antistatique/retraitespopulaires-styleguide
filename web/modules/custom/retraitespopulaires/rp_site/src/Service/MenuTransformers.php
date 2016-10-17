<?php
/**
* @file
* Contains \Drupal\rp_site\Service\MenuTransformers
*/

namespace Drupal\rp_site\Service;

use Drupal\Core\State\StateInterface;

/**
* MenuTransformers
*/
class MenuTransformers {

    /**
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    protected $state;

    /**
    * Class constructor.
    */
    public function __construct(StateInterface $state) {
        $this->state = $state;
    }

    /**
     * Retreive Only the Project links based on state configuration.
     *
     * @param \Drupal\Core\Menu\MenuLinkTreeElement[] $tree
     *   The menu link tree to manipulate.
     *
     * @return \Drupal\Core\Menu\MenuLinkTreeElement[]
     *   The manipulated menu link tree.
     */
    public function getIndividualProjectOnly(array $tree) {
        $menu = array();
        $scope = $this->state->get('rp_site.settings.profils.individual')['menu_project'];

        // Get active item
        foreach ($tree as $leaf) {
            if($leaf->hasChildren) {
                foreach ($leaf->subtree as $key => $subtree) {
                    if(!in_array($subtree->link->getPluginId(), $scope)) {
                        unset($leaf->subtree[$key]);
                    }
                }
            }
        }

        // Return the tree.
        return $tree;
    }

    /**
     * Retreive Only the Client links based on state configuration.
     *
     * @param \Drupal\Core\Menu\MenuLinkTreeElement[] $tree
     *   The menu link tree to manipulate.
     *
     * @return \Drupal\Core\Menu\MenuLinkTreeElement[]
     *   The manipulated menu link tree.
     */
    public function getIndividualClientOnly(array $tree) {
        $menu = array();
        $scope = $this->state->get('rp_site.settings.profils.individual')['menu_client'];

        // Get active item
        foreach ($tree as $leaf) {
            if($leaf->hasChildren) {
                foreach ($leaf->subtree as $key => $subtree) {
                    if(!in_array($subtree->link->getPluginId(), $scope)) {
                        unset($leaf->subtree[$key]);
                    }
                }
            }
        }

        // Return the tree.
        return $tree;
    }

}

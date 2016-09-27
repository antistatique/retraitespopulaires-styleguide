<?php
/**
* @file
* Contains \Drupal\rp_layout\Service\MenuTransformers
*/

namespace Drupal\rp_layout\Service;

/**
* MenuTransformers
*/
class MenuTransformers {
    /**
     * Retreive the top link parent trails of the active trail.
     *
     * For a menu such as:
     * Parent 1
     *  - Child 1
     *  -- Child 2
     *  -- Child 3
     *  -- Child 4
     *  - Child 5
     * Parent 2
     *  - Child 6
     * with current page being Child 3, Parent 1 would be returned.
     *
     * @param \Drupal\Core\Menu\MenuLinkTreeElement[] $tree
     *   The menu link tree to manipulate.
     *
     * @return \Drupal\Core\Menu\MenuLinkTreeElement[]
     *   The manipulated menu link tree.
     */
    public function getTopParentActiveTrail(array $tree) {
      // Get the current item's parent ID
      $current_item_top_parent = MenuTransformers::getTopParent($tree);

      if (!empty($current_item_top_parent)) {
        $tree = $current_item_top_parent;
      }

      // Return the tree.
      return $tree;
    }

    /**
     * Get the top parent of the current active menu link, or return himself if the
     * current active menu link is a top-level link.
     *
     * @param \Drupal\Core\Menu\MenuLinkTreeElement[] $tree
     *   The tree to pull the parent link out of.
     * @param \Drupal\Core\Menu\MenuLinkTreeElement|null $prev_parent
     *   The previous parent's parent, or NULL if no previous parent exists.
     * @param \Drupal\Core\Menu\MenuLinkTreeElement|null $parent
     *   The parent of the current active link, or NULL if not parent exists.
     *
     * @return \Drupal\Core\Menu\MenuLinkTreeElement|null
     *   The parent of the current active menu link, or NULL if no parent exists.
     */
    private function getTopParent($tree, $prev_parent = NULL, $parent = NULL) {
      // Get active item
      foreach ($tree as $leaf) {
        if ($leaf->inActiveTrail) {
          return $leaf;
          break;
        }
      }
    }

}

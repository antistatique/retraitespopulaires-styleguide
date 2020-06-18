import $ from 'jquery';

export function bv_gallery () {

  $('.gallery--bellavita').each(function(){
    let $this = $(this),
        $currentKey = 0,
        $items = $this.find('.gallery__items').children(),
        bv_gallery_add_items_classes = function(){
          $items.removeClass().addClass('gallery__item')
          for(let i = 0;i < $items.length;i++){
            switch(i){
              case ($currentKey - 2):
                $($items[i]).addClass('first')
                break
              case ($currentKey - 1):
                $($items[i]).addClass('prev')
                break
              case $currentKey:
                $($items[i]).addClass('active')
                break
              case ($currentKey + 1):
                $($items[i]).addClass('next')
                break
              case ($currentKey + 2):
                $($items[i]).addClass('last')
                break
            }
          }
        },
        bv_gallery_move = function(direction){
          if(direction == 'prev'){
            $currentKey = ($currentKey == 0)? ($items.length - 1) : ($currentKey - 1 )
          }else{
            $currentKey = ($currentKey < ($items.length - 1) )? ($currentKey + 1) : 0
          }
          bv_gallery_add_items_classes()
        },
        bv_append_nav = function(){
          let nav = '<div class="gallery__nav"> <div data-direction="prev"> <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-arrow-thin retraitespopulaires-icon-rotate-180deg"></i> </div> <div data-direction="next"> <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-arrow-thin"></i> </div> </div>'

          $this.append(nav)
          $this.find('.gallery__nav div').click(function(){
            bv_gallery_move($(this).data('direction'), $items)
          })
        }

    bv_append_nav()
    bv_gallery_add_items_classes()

  })

}

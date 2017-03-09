import $ from 'jquery';

export function gallery () {

  // Define click event on gallery item
  $('.gallery').on('click', 'a', function(event){

    // Prevent location change
    event.preventDefault();

    // Generate the tree
    const container = [];
    $('.gallery [itemprop="associatedMedia"]').each(function(){
      let $this = $(this);
      container.push({
        src: $this.find('a').attr('href'),
        w: $this.find('a').data('width'),
        h: $this.find('a').data('height')
      });
    });

    // Define object and gallery options
    let $pswp = $('.pswp')[0],
        options = {
          index: $(this).data('index'),
          bgOpacity: 0.85,
          showHideOpacity: true,
          shareEl: true,
          shareButtons: [{id: 'download', label: 'Download', url:'{{raw_image_url}}', download:true}]
        };

    // Initialize PhotoSwipe
    let gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, container, options);
    gallery.init();
  });
}

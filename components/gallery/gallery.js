(function CsGovGallery(Drupal, once) {
  Drupal.behaviors.CsGovGallery = {
    attach: function (context) {

      const galleries = once('js-gallery', '.gallery', context);
      if (!galleries.length > 0) {
        return;
      }

      galleries.forEach((gallery) => {
        const lightbox = GLightbox();
      });
    },
  };
}(Drupal, once));

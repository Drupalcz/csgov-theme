(function (Drupal, once) {
  Drupal.behaviors.documentDownloadClickableItem = {
    attach: function (context, settings) {
      once('clickable-item', '.document-download', context).forEach(function () {
        // Example settings for initialization
        const clickableItemSettings = {
          selector: '.document-download', // This is your item selector
          linkSelector: '.document-download__title > a' // This is your link selector inside the item
        };

        // Initialize the ClickableItemWrapper with the settings
        new ClickableItemWrapper(clickableItemSettings);
      });
    }
  };
})(Drupal, once);
